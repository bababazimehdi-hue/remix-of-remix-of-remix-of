import { r as createServerFn } from "./server-BIpwqx2E.mjs";
import { n as toAuthPassword, r as usernameToEmail } from "./auth-shared-BUm6BA6z.mjs";
import { t as createServerRpc } from "./createServerRpc-BsnX6euA.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/auto-init.functions-gDX4918i.js
/**
* Suggested credentials for the very first system owner.
*
* These values are ONLY prefilled defaults for the first-run setup form. They
* are editable, they grant no privilege by themselves, and no part of the app
* checks for this username: the OWNER role is granted by the one-time
* `initialize_system()` database function to whoever completes setup.
*/
var INITIAL_OWNER_SUGGESTION = {
	fullName: "مهدی",
	username: "mehdi",
	password: "1400"
};
/**
* One-time, server-side setup of the default owner account.
*
* This replaces the visible first-run OWNER registration form. The default
* credentials are defined in `initial-owner.ts` and are the same as the legacy
* hardcoded local fallback user. After this runs, the login page is the only
* public entry point and users are created by the owner from inside the app.
*/
var ensureDefaultOwner_createServerFn_handler = createServerRpc({
	id: "4ff13ba3940d11ea30e9d4f28a53f04e9ac96a0467ab1e34930865b95e2faea4",
	name: "ensureDefaultOwner",
	filename: "src/lib/auto-init.functions.ts"
}, (opts) => ensureDefaultOwner.__executeServer(opts));
var ensureDefaultOwner = createServerFn({ method: "POST" }).handler(ensureDefaultOwner_createServerFn_handler, async () => {
	console.log("[ensureDefaultOwner] started");
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const { createClient } = await import("../_libs/supabase__supabase-js.mjs").then((n) => n.n);
	const { data: init } = await supabaseAdmin.from("system_initialization").select("is_initialized").maybeSingle();
	console.log("[ensureDefaultOwner] init check:", init);
	if (init?.is_initialized) return {
		ok: true,
		created: false
	};
	const { data: profiles } = await supabaseAdmin.from("profiles").select("id").limit(1);
	console.log("[ensureDefaultOwner] profiles check:", profiles);
	if (profiles && profiles.length > 0) {
		const { data: firstProfile } = await supabaseAdmin.from("profiles").select("username").limit(1).single();
		const username = String(firstProfile?.username ?? INITIAL_OWNER_SUGGESTION.username);
		const email = usernameToEmail(username);
		const authClient = createClient(processModule.env["SUPABASE_URL"], processModule.env["SUPABASE_PUBLISHABLE_KEY"], { auth: {
			storage: void 0,
			persistSession: false,
			autoRefreshToken: false
		} });
		const { data: signInData, error: signInError } = await authClient.auth.signInWithPassword({
			email,
			password: toAuthPassword(INITIAL_OWNER_SUGGESTION.password)
		});
		if (signInError || !signInData.session) throw new Error(signInError?.message ?? "ورود به حساب صاحب سیستم ناموفق بود.");
		const { error: initError } = await authClient.rpc("initialize_system");
		if (initError) throw new Error(initError.message);
		return {
			ok: true,
			created: false
		};
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
			full_name: fullName
		}
	});
	console.log("[ensureDefaultOwner] createUser result:", {
		created,
		authError
	});
	if (authError || !created.user) throw new Error(authError?.message ?? "ساخت کاربر صاحب سیستم ناموفق بود.");
	const userId = created.user.id;
	const { error: profileError } = await supabaseAdmin.from("profiles").insert({
		id: userId,
		full_name: fullName,
		username: normalizedUsername
	});
	console.log("[ensureDefaultOwner] profile insert result:", profileError);
	if (profileError) throw new Error(profileError.message);
	const { data: org, error: orgError } = await supabaseAdmin.from("organizations").insert({
		name: fullName,
		owner_id: userId
	}).select("id").single();
	console.log("[ensureDefaultOwner] org insert result:", {
		org,
		orgError
	});
	if (orgError || !org) throw new Error(orgError?.message ?? "ثبت سازمان ناموفق بود.");
	const { error: memberError } = await supabaseAdmin.from("organization_members").insert({
		organization_id: org.id,
		user_id: userId
	});
	console.log("[ensureDefaultOwner] member insert result:", memberError);
	if (memberError) throw new Error(memberError.message);
	console.log("[ensureDefaultOwner] signing in as owner to initialize system");
	const authClient = createClient(processModule.env["SUPABASE_URL"], processModule.env["SUPABASE_PUBLISHABLE_KEY"], { auth: {
		storage: void 0,
		persistSession: false,
		autoRefreshToken: false
	} });
	const { data: signInData, error: signInError } = await authClient.auth.signInWithPassword({
		email,
		password: toAuthPassword(password)
	});
	console.log("[ensureDefaultOwner] signIn result:", {
		signInData,
		signInError
	});
	if (signInError || !signInData.session) throw new Error(signInError?.message ?? "ورود به حساب صاحب سیستم ناموفق بود.");
	const { error: initError } = await authClient.rpc("initialize_system");
	console.log("[ensureDefaultOwner] initialize_system result:", initError);
	if (initError) throw new Error(initError.message);
	return {
		ok: true,
		created: true,
		userId
	};
});
//#endregion
export { ensureDefaultOwner_createServerFn_handler };
