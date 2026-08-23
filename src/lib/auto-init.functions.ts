import { createServerFn } from "@tanstack/react-start";
import type { Database } from "@/integrations/supabase/types";

import { toAuthPassword, usernameToEmail } from "./auth-shared";
import { INITIAL_OWNER_SUGGESTION } from "./initial-owner";

/**
 * One-time, server-side setup of the default owner account.
 *
 * This replaces the visible first-run OWNER registration form. The default
 * credentials are defined in `initial-owner.ts` and are the same as the legacy
 * hardcoded local fallback user. After this runs, the login page is the only
 * public entry point and users are created by the owner from inside the app.
 */
export const ensureDefaultOwner = createServerFn({ method: "POST" }).handler(
  async () => {
    console.log("[ensureDefaultOwner] started");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { createClient } = await import("@supabase/supabase-js");

    const { data: init } = await supabaseAdmin
      .from("system_initialization")
      .select("is_initialized")
      .maybeSingle();
    console.log("[ensureDefaultOwner] init check:", init);
    if (init?.is_initialized) return { ok: true, created: false };

    const { data: profiles } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .limit(1);
    console.log("[ensureDefaultOwner] profiles check:", profiles);
    if (profiles && profiles.length > 0) {
      // A profile exists but initialization wasn't finalized. Sign in as the
      // first profile and call initialize_system so auth.uid() resolves.
      const { data: firstProfile } = await supabaseAdmin
        .from("profiles")
        .select("username")
        .limit(1)
        .single();
      const username = String((firstProfile as { username?: string })?.username ?? INITIAL_OWNER_SUGGESTION.username);
      const email = usernameToEmail(username);
      const authClient = createClient<Database>(
        process.env['SUPABASE_URL']!,
        process.env['SUPABASE_PUBLISHABLE_KEY']!,
        {
          auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
        },
      );
      const { data: signInData, error: signInError } = await authClient.auth.signInWithPassword({
        email,
        password: toAuthPassword(INITIAL_OWNER_SUGGESTION.password),
      });
      if (signInError || !signInData.session) {
        throw new Error(signInError?.message ?? "ورود به حساب صاحب سیستم ناموفق بود.");
      }
      const { error: initError } = await authClient.rpc("initialize_system");
      if (initError) throw new Error(initError.message);
      return { ok: true, created: false };
    }

    const { fullName, username, password } = INITIAL_OWNER_SUGGESTION;
    const normalizedUsername = username.toLowerCase();
    const email = usernameToEmail(username);

    console.log("[ensureDefaultOwner] creating auth user:", email);
    const { data: created, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: toAuthPassword(password),
      email_confirm: true,
      user_metadata: {
        username: normalizedUsername,
        full_name: fullName,
      },
    });
    console.log("[ensureDefaultOwner] createUser result:", { created, authError });
    if (authError || !created.user) {
      throw new Error(authError?.message ?? "ساخت کاربر صاحب سیستم ناموفق بود.");
    }

    const userId = created.user.id;

    const { error: profileError } = await supabaseAdmin.from("profiles").insert({
      id: userId,
      full_name: fullName,
      username: normalizedUsername,
    });
    console.log("[ensureDefaultOwner] profile insert result:", profileError);
    if (profileError) throw new Error(profileError.message);

    const { data: org, error: orgError } = await supabaseAdmin
      .from("organizations")
      .insert({ name: fullName, owner_id: userId })
      .select("id")
      .single();
    console.log("[ensureDefaultOwner] org insert result:", { org, orgError });
    if (orgError || !org) throw new Error(orgError?.message ?? "ثبت سازمان ناموفق بود.");

    const { error: memberError } = await supabaseAdmin.from("organization_members").insert({
      organization_id: org.id,
      user_id: userId,
    });
    console.log("[ensureDefaultOwner] member insert result:", memberError);
    if (memberError) throw new Error(memberError.message);

    // initialize_system reads auth.uid(), so we sign in as the new owner first.
    console.log("[ensureDefaultOwner] signing in as owner to initialize system");
    const authClient = createClient<Database>(
      process.env['SUPABASE_URL']!,
      process.env['SUPABASE_PUBLISHABLE_KEY']!,
      {
        auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
      },
    );
    const { data: signInData, error: signInError } = await authClient.auth.signInWithPassword({
      email,
      password: toAuthPassword(password),
    });
    console.log("[ensureDefaultOwner] signIn result:", { signInData, signInError });
    if (signInError || !signInData.session) {
      throw new Error(signInError?.message ?? "ورود به حساب صاحب سیستم ناموفق بود.");
    }
    const { error: initError } = await authClient.rpc("initialize_system");
    console.log("[ensureDefaultOwner] initialize_system result:", initError);
    if (initError) throw new Error(initError.message);

    return { ok: true, created: true, userId };
  },
);

