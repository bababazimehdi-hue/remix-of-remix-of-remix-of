import { useEffect, useState } from "react";

import { supabase } from "@/integrations/supabase/client";

/**
 * True only for the OWNER / main support account (the first owner of the
 * system). Resolved against the database (`is_org_owner`), never from
 * client-side storage, so the flag cannot be forged in the browser.
 */
export function useIsOwner() {
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const { data: auth } = await supabase.auth.getUser();
        const userId = auth.user?.id;
        if (!userId) return;
        // The generated types are empty until the database schema is in place;
        // the RPC itself is unchanged and still resolved server-side.
        const rpc = supabase.rpc as unknown as (
          fn: string,
          args: Record<string, unknown>,
        ) => Promise<{ data: unknown }>;
        const { data } = await rpc("is_org_owner", { _user_id: userId });
        if (data === true) {
          if (!cancelled) setIsOwner(true);
          return;
        }

        // Fallbacks — still server-side data, never client storage: an explicit
        // OWNER/ADMIN role row, or being the organization owner.
        const [roleRows, orgRows] = await Promise.all([
          supabase.from("user_roles").select("role").eq("user_id", userId),
          supabase.from("organizations").select("owner_id").eq("owner_id", userId),
        ]);
        const hasOwnerRole = (roleRows.data ?? []).some((r) =>
          ["OWNER", "ADMIN"].includes(String((r as { role?: unknown }).role ?? "").toUpperCase()),
        );
        const ownsOrg = (orgRows.data ?? []).length > 0;
        if (!cancelled) setIsOwner(hasOwnerRole || ownsOrg);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);


  return { isOwner, loading };
}
