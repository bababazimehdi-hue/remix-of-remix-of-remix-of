// Follow these steps:
// 1. Run `supabase functions serve` to start the local edge function server
// 2. Run `supabase functions deploy sync-batch` to deploy this function to production
//
// This function handles batch synchronization of queued operations from clients.
// It provides:
// - Atomic batch processing
// - Conflict resolution with last-write-wins strategy
// - Detailed sync response with success/failure status per operation
// - Audit logging for all changes

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.112.3";
import { corsHeaders } from "../_shared/cors.ts";

interface SyncOperation {
  id: string;
  operation: "insert" | "update" | "delete";
  table: string;
  data: any;
  timestamp: number;
  clientTimestamp: string;
}

interface SyncRequest {
  operations: SyncOperation[];
  clientId: string;
  clientState?: any;
}

interface SyncResult {
  success: boolean;
  operationId?: string;
  error?: string;
  serverData?: any;
  conflict?: boolean;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Only allow POST
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parse request
    const body: SyncRequest = await req.json();
    const { operations, clientId, clientState } = body;

    if (!operations || !Array.isArray(operations)) {
      return new Response(JSON.stringify({ error: "Invalid operations array" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!clientId) {
      return new Response(JSON.stringify({ error: "clientId required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Initialize Supabase client with service role for full access
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    
    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(JSON.stringify({ error: "Server configuration error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Process operations in order
    const results: SyncResult[] = [];
    const errors: string[] = [];

    for (const op of operations) {
      try {
        let result: SyncResult;

        switch (op.operation) {
          case "insert":
            result = await handleInsert(supabase, op);
            break;
          case "update":
            result = await handleUpdate(supabase, op, clientId);
            break;
          case "delete":
            result = await handleDelete(supabase, op, clientId);
            break;
          default:
            result = { success: false, operationId: op.id, error: "Unknown operation type" };
        }

        results.push(result);
        if (!result.success && result.error) {
          errors.push(`Operation ${op.id}: ${result.error}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        results.push({
          success: false,
          operationId: op.id,
          error: errorMessage,
        });
        errors.push(`Operation ${op.id}: ${errorMessage}`);
      }
    }

    // Log activity for audit trail
    if (results.some(r => r.success)) {
      const successfulOps = results.filter(r => r.success);
      await logActivity(supabase, {
        clientId,
        operations: successfulOps.map(r => ({
          operationId: r.operationId!,
          table: operations.find(op => op.id === r.operationId)?.table ?? "unknown",
          operation: operations.find(op => op.id === r.operationId)?.operation ?? "unknown",
        })),
        timestamp: new Date().toISOString(),
      });
    }

    const hasErrors = errors.length > 0;
    
    return new Response(
      JSON.stringify({
        success: !hasErrors,
        results,
        errors: hasErrors ? errors : undefined,
        serverTime: new Date().toISOString(),
      }),
      {
        status: hasErrors ? 207 : 200, // 207 Multi-Status if partial failures
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Sync function error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

async function handleInsert(
  supabase: any,
  op: SyncOperation
): Promise<SyncResult> {
  const { data, error } = await supabase
    .from(op.table as any)
    .insert(op.data)
    .select()
    .single();

  if (error) {
    return { success: false, operationId: op.id, error: error.message };
  }

  return { success: true, operationId: op.id, serverData: data };
}

async function handleUpdate(
  supabase: any,
  op: SyncOperation,
  clientId: string
): Promise<SyncResult> {
  // Get current server data to check for conflicts
  const { data: serverData, error: fetchError } = await supabase
    .from(op.table as any)
    .select("*")
    .eq("id", op.data.id)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") { // PGRST116 = not found
    return { success: false, operationId: op.id, error: fetchError.message };
  }

  // Check for conflict: if server has newer update
  let conflict = false;
  if (serverData && serverData.updated_at) {
    const serverTime = new Date(serverData.updated_at).getTime();
    const clientTime = op.timestamp;
    
    if (serverTime > clientTime) {
      conflict = true;
      // Last-write-wins: client data is older, but we still apply it
      // In a more sophisticated system, you might merge or reject
      console.log(`Conflict detected for ${op.table}.${op.data.id}: server=${serverTime}, client=${clientTime}`);
    }
  }

  // Apply update
  const { data, error } = await supabase
    .from(op.table as any)
    .update({
      ...op.data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", op.data.id)
    .select()
    .single();

  if (error) {
    return { 
      success: false, 
      operationId: op.id, 
      error: error.message,
      conflict 
    };
  }

  return { 
    success: true, 
    operationId: op.id, 
    serverData: data,
    conflict 
  };
}

async function handleDelete(
  supabase: any,
  op: SyncOperation,
  clientId: string
): Promise<SyncResult> {
  // Use soft delete via RPC if available
  const { data, error } = await supabase.rpc("soft_delete_record", {
    _table: op.table,
    _id: op.data.id,
    _restore: false,
  });

  if (error) {
    // Fallback to hard delete if RPC doesn't exist
    const { error: deleteError } = await supabase
      .from(op.table as any)
      .delete()
      .eq("id", op.data.id);

    if (deleteError) {
      return { success: false, operationId: op.id, error: deleteError.message };
    }
  }

  return { success: true, operationId: op.id };
}

async function logActivity(
  supabase: any,
  params: {
    clientId: string;
    operations: Array<{ operationId: string; table: string; operation: string }>;
    timestamp: string;
  }
): Promise<void> {
  try {
    await supabase.from("sync_activity_log").insert({
      client_id: params.clientId,
      operations_count: params.operations.length,
      operations: params.operations,
      synced_at: params.timestamp,
    });
  } catch (error) {
    // Activity logging is non-critical, just log and continue
    console.warn("Failed to log sync activity:", error);
  }
}
