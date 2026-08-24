import { r as createServerFn } from "./server-BIpwqx2E.mjs";
import { n as toAuthPassword, r as usernameToEmail, t as onlyDigits } from "./auth-shared-BUm6BA6z.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-CZuJi3q-.mjs";
import { t as createServerRpc } from "./createServerRpc-BsnX6euA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/users.functions-BQUt4s-Q.js
var resolveLoginEmail_createServerFn_handler = createServerRpc({
	id: "cdfba0c434b3604a82f29b6a675fd78a7f750ea9a0e2988b6478dc92a482ba97",
	name: "resolveLoginEmail",
	filename: "src/lib/users.functions.ts"
}, (opts) => resolveLoginEmail.__executeServer(opts));
var resolveLoginEmail = createServerFn({ method: "POST" }).inputValidator((data) => data).handler(resolveLoginEmail_createServerFn_handler, async ({ data }) => {
	const identifier = data.identifier.trim().toLowerCase();
	const digits = onlyDigits(data.identifier);
	let rows = null;
	try {
		const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
		rows = (await supabaseAdmin.from("profiles").select("username, phone, is_active, is_archived")).data ?? null;
	} catch {
		rows = null;
	}
	if (!rows) {
		if (!identifier || identifier === digits) return {
			email: null,
			active: false
		};
		return {
			email: usernameToEmail(identifier),
			active: true
		};
	}
	const found = rows.find((r) => r.username.trim().toLowerCase() === identifier || !!digits && onlyDigits(r.phone ?? "") === digits);
	if (!found) return {
		email: null,
		active: false
	};
	return {
		email: usernameToEmail(found.username),
		active: !!found.is_active && !found.is_archived
	};
});
var saveTeamUser_createServerFn_handler = createServerRpc({
	id: "fe7b9ac6ac8b6476cdcc257069e250764d4c6197917e430fcb55df35bca1c962",
	name: "saveTeamUser",
	filename: "src/lib/users.functions.ts"
}, (opts) => saveTeamUser.__executeServer(opts));
var saveTeamUser = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => data).handler(saveTeamUser_createServerFn_handler, async ({ data, context }) => {
	const { data: allowed } = await context.supabase.rpc("is_org_owner", { _user_id: context.userId });
	if (!allowed) throw new Error("فقط پشتیبان می‌تواند کاربران و دسترسی‌ها را مدیریت کند.");
	const isSelf = !!data.id && data.id === context.userId;
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const profile = {
		full_name: data.fullName.trim(),
		username: data.username.trim(),
		phone: data.phone.trim(),
		title: data.title.trim(),
		is_worker: data.isWorker,
		is_active: data.isActive,
		is_archived: !!data.isArchived,
		custom_role: data.customRole?.trim() || null,
		bio: data.bio?.trim() ?? "",
		permissions: data.permissions ?? {}
	};
	if (data.id) {
		const writable = isSelf ? {
			full_name: profile.full_name,
			username: profile.username,
			phone: profile.phone,
			bio: profile.bio
		} : profile;
		const { error } = await supabaseAdmin.from("profiles").update(writable).eq("id", data.id);
		if (error) throw new Error(error.message);
		if (!isSelf) {
			await supabaseAdmin.from("user_roles").delete().eq("user_id", data.id);
			await supabaseAdmin.from("user_roles").insert({
				user_id: data.id,
				role: data.role
			});
		}
		const updates = { email: usernameToEmail(profile.username) };
		if (data.password?.trim()) updates.password = toAuthPassword(data.password);
		await supabaseAdmin.auth.admin.updateUserById(data.id, updates);
		return { id: data.id };
	}
	if (!data.password?.trim()) throw new Error("رمز عبور برای کاربر جدید لازم است.");
	const { data: created, error: authError } = await supabaseAdmin.auth.admin.createUser({
		email: usernameToEmail(profile.username),
		password: toAuthPassword(data.password),
		email_confirm: true
	});
	if (authError || !created.user) throw new Error(authError?.message ?? "ساخت کاربر ناموفق بود.");
	const { error } = await supabaseAdmin.from("profiles").insert({
		id: created.user.id,
		...profile
	});
	if (error) throw new Error(error.message);
	await supabaseAdmin.from("user_roles").insert({
		user_id: created.user.id,
		role: data.role
	});
	return { id: created.user.id };
});
//#endregion
export { resolveLoginEmail_createServerFn_handler, saveTeamUser_createServerFn_handler };
