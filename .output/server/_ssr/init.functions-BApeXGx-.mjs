import { r as createServerFn } from "./server-BIpwqx2E.mjs";
import { t as createServerRpc } from "./createServerRpc-BsnX6euA.mjs";
import { r as getBackendConfig } from "./backend-config-BpvzyDUj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/init.functions-BApeXGx-.js
var readSystemInitialization_createServerFn_handler = createServerRpc({
	id: "9e707a87e386ea86baaeb2893a0cfa65aa3ce3ab19f1d5b0530cc9aea86fba55",
	name: "readSystemInitialization",
	filename: "src/lib/init.functions.ts"
}, (opts) => readSystemInitialization.__executeServer(opts));
var readSystemInitialization = createServerFn({ method: "GET" }).handler(readSystemInitialization_createServerFn_handler, async () => {
	const config = getBackendConfig();
	if (!config.isConfigured) throw new Error("تنظیمات بک‌اند هنوز پیکربندی نشده است.");
	const { createClient } = await import("../_libs/supabase__supabase-js.mjs").then((n) => n.n);
	const { data, error } = await createClient(config.backendUrl, config.publicApiKey, { auth: {
		storage: void 0,
		persistSession: false,
		autoRefreshToken: false
	} }).from("system_initialization").select("is_initialized, initialized_at").maybeSingle();
	if (error) {
		if (error.code === "42P01" || error.code === "PGRST205" || /does not exist|could not find the table/i.test(error.message ?? "")) return {
			initialized: false,
			details: {
				source: config.source,
				missingTable: true
			}
		};
		throw new Error(`خطا در خواندن وضعیت راه‌اندازی: ${error.message}`);
	}
	return {
		initialized: Boolean(data && data.is_initialized),
		details: {
			source: config.source,
			hasRow: Boolean(data)
		}
	};
});
//#endregion
export { readSystemInitialization_createServerFn_handler };
