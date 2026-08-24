import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/backend-config-BpvzyDUj.js
/**
* Env-based provider: reads Vite public env vars (no credentials in code).
* Falls back to SSR-only vars when the VITE_* ones are absent.
*/
var envBackendConfigProvider = { getConfig() {
	const env = {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_SUPABASE_PROJECT_ID": "ajmxytmqlnsvwtvyldrt",
		"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_KSJSOgyB9L-3G3qfFrWOfg_oHVmekdN",
		"VITE_SUPABASE_URL": "https://ajmxytmqlnsvwtvyldrt.supabase.co"
	};
	const backendUrl = env["VITE_SUPABASE_URL"] ?? (typeof processModule !== "undefined" ? processModule.env?.["SUPABASE_URL"] : void 0) ?? "";
	const publicApiKey = env["VITE_SUPABASE_PUBLISHABLE_KEY"] ?? (typeof processModule !== "undefined" ? processModule.env?.["SUPABASE_PUBLISHABLE_KEY"] : void 0) ?? "";
	return {
		source: "env",
		backendUrl,
		publicApiKey,
		isConfigured: Boolean(backendUrl && publicApiKey)
	};
} };
var currentProvider = envBackendConfigProvider;
/** Swap the provider later (e.g. env reader, connector, or admin panel). */
function setBackendConfigProvider(provider) {
	currentProvider = provider;
}
function getBackendConfigProvider() {
	return currentProvider;
}
function getBackendConfig() {
	return getBackendConfigProvider().getConfig();
}
var OVERRIDE_KEY = "cloud-connection-override";
function readBackendOverride() {
	if (typeof window === "undefined") return null;
	try {
		const raw = window.localStorage.getItem(OVERRIDE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!parsed.backendUrl || !parsed.publicApiKey) return null;
		return {
			backendUrl: parsed.backendUrl,
			publicApiKey: parsed.publicApiKey,
			checkedAt: parsed.checkedAt ?? null
		};
	} catch {
		return null;
	}
}
function saveBackendOverride(value) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(OVERRIDE_KEY, JSON.stringify(value));
}
function clearBackendOverride() {
	if (typeof window === "undefined") return;
	window.localStorage.removeItem(OVERRIDE_KEY);
}
setBackendConfigProvider({ getConfig() {
	const override = readBackendOverride();
	if (!override) return envBackendConfigProvider.getConfig();
	return {
		source: "owner-override",
		backendUrl: override.backendUrl,
		publicApiKey: override.publicApiKey,
		isConfigured: Boolean(override.backendUrl && override.publicApiKey)
	};
} });
//#endregion
export { saveBackendOverride as a, readBackendOverride as i, envBackendConfigProvider as n, getBackendConfig as r, clearBackendOverride as t };
