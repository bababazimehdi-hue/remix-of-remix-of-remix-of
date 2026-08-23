/**
 * Backend configuration layer.
 *
 * Single reusable interface for backend connection settings.
 * No backend is connected yet, no credentials are hardcoded, and no secrets are stored here.
 * Implementations can be swapped later (e.g. env-based, connector-based, or admin-configured).
 */

export interface BackendConfig {
  /** Human-readable name of the configuration source (e.g. "env", "local-stub"). */
  readonly source: string;
  /** Base URL of the backend API. Empty string means not configured. */
  readonly backendUrl: string;
  /** Public API key for the backend. Empty string means not configured. */
  readonly publicApiKey: string;
  /** Whether both required values are present. */
  readonly isConfigured: boolean;
}

export interface BackendConfigProvider {
  /** Returns the current backend configuration. */
  getConfig(): BackendConfig;
}

export class BackendConfigMissingError extends Error {
  constructor() {
    super("تنظیمات بک‌اند هنوز پیکربندی نشده است.");
    this.name = "BackendConfigMissingError";
  }
}

/** Default stub: no backend URL or public API key, ready for future configuration sources. */
export const stubBackendConfigProvider: BackendConfigProvider = {
  getConfig() {
    return {
      source: "local-stub",
      backendUrl: "",
      publicApiKey: "",
      isConfigured: false,
    };
  },
};

/**
 * Env-based provider: reads Vite public env vars (no credentials in code).
 * Falls back to SSR-only vars when the VITE_* ones are absent.
 */
export const envBackendConfigProvider: BackendConfigProvider = {
  getConfig() {
    const env = import.meta.env as Record<string, string | undefined>;
    const backendUrl =
      env['VITE_SUPABASE_URL'] ??
      (typeof process !== "undefined" ? process.env?.['SUPABASE_URL'] : undefined) ??
      "";
    const publicApiKey =
      env['VITE_SUPABASE_PUBLISHABLE_KEY'] ??
      (typeof process !== "undefined" ? process.env?.['SUPABASE_PUBLISHABLE_KEY'] : undefined) ??
      "";

    return {
      source: "env",
      backendUrl,
      publicApiKey,
      isConfigured: Boolean(backendUrl && publicApiKey),
    };
  },
};

let currentProvider: BackendConfigProvider = envBackendConfigProvider;

/** Swap the provider later (e.g. env reader, connector, or admin panel). */
export function setBackendConfigProvider(provider: BackendConfigProvider) {
  currentProvider = provider;
}

export function getBackendConfigProvider(): BackendConfigProvider {
  return currentProvider;
}

export function getBackendConfig(): BackendConfig {
  return getBackendConfigProvider().getConfig();
}

/* ------------------------------------------------------------------ *
 * Owner-configurable override (browser only).
 *
 * The OWNER settings panel can point the app at a different backend URL /
 * publishable key. The override lives in browser storage only: no database
 * table is required and no secret is ever persisted (publishable keys only).
 * On the server (SSR / server functions) the env configuration is always used.
 * ------------------------------------------------------------------ */

const OVERRIDE_KEY = "cloud-connection-override";

export type BackendOverride = {
  backendUrl: string;
  publicApiKey: string;
  /** ISO timestamp of the last successful connection test. */
  checkedAt: string | null;
};

export function readBackendOverride(): BackendOverride | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(OVERRIDE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<BackendOverride>;
    if (!parsed.backendUrl || !parsed.publicApiKey) return null;
    return {
      backendUrl: parsed.backendUrl,
      publicApiKey: parsed.publicApiKey,
      checkedAt: parsed.checkedAt ?? null,
    };
  } catch {
    return null;
  }
}

export function saveBackendOverride(value: BackendOverride) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(OVERRIDE_KEY, JSON.stringify(value));
}

export function clearBackendOverride() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(OVERRIDE_KEY);
}

/** Env configuration, plus the owner override when one is stored. */
export const overrideAwareBackendConfigProvider: BackendConfigProvider = {
  getConfig() {
    const override = readBackendOverride();
    if (!override) return envBackendConfigProvider.getConfig();
    return {
      source: "owner-override",
      backendUrl: override.backendUrl,
      publicApiKey: override.publicApiKey,
      isConfigured: Boolean(override.backendUrl && override.publicApiKey),
    };
  },
};

setBackendConfigProvider(overrideAwareBackendConfigProvider);
