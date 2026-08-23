import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  AlertTriangle,
  CheckCircle2,
  Cloud,
  Database,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Pencil,
  PlugZap,
  RefreshCw,
  Radio,
  RotateCcw,
  ShieldCheck,
  WifiOff,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  clearBackendOverride,
  envBackendConfigProvider,
  getBackendConfig,
  readBackendOverride,
  saveBackendOverride,
} from "@/lib/backend-config";
import { formatJalaliDateTime } from "@/lib/datetime";
import { useIsOwner } from "@/lib/use-is-owner";
import { useStore } from "@/lib/store";

type Health = "unknown" | "checking" | "ok" | "failed";

const HEALTH_LABEL: Record<Health, string> = {
  unknown: "بررسی نشده",
  checking: "در حال بررسی…",
  ok: "سالم",
  failed: "خطا",
};

function HealthPill({ state }: { state: Health }) {
  const tone =
    state === "ok"
      ? "bg-primary/10 text-primary"
      : state === "failed"
        ? "bg-destructive/10 text-destructive"
        : "bg-muted text-muted-foreground";
  const Icon = state === "ok" ? CheckCircle2 : state === "failed" ? XCircle : Loader2;
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold ${tone}`}
    >
      <Icon className={`size-4 ${state === "checking" ? "animate-spin" : ""}`} />
      {HEALTH_LABEL[state]}
    </span>
  );
}

function HealthRow({
  icon: Icon,
  title,
  hint,
  state,
}: {
  icon: typeof Database;
  title: string;
  hint: string;
  state: Health;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-muted/30 p-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-background text-primary">
          <Icon className="size-4.5" />
        </span>
        <div className="min-w-0">
          <div className="truncate text-sm font-bold">{title}</div>
          <div className="truncate text-[11px] text-muted-foreground">{hint}</div>
        </div>
      </div>
      <HealthPill state={state} />
    </div>
  );
}

const LAST_SYNC_KEY = "cloud-connection-last-sync";

/**
 * OWNER-only «اتصال ابری و همگام‌سازی» panel.
 *
 * Configuration is read from (and written back to) the existing backend-config
 * layer: the connected Lovable Cloud project is the default, and the owner can
 * store an override which is only accepted after a *real* connection test
 * (database reachability + auth health + realtime handshake). No database table
 * is created or modified here, and service role keys / database passwords are
 * never read, stored or displayed.
 *
 * Live sync keeps using the existing realtime layer (`resync` from the store):
 * reconnect, deduplication and resync behaviour are untouched — the buttons
 * below only re-trigger that same machinery, with no reload and no polling.
 */
export function CloudConnectionSettings() {
  const { syncStatus, resync } = useStore();
  const { isOwner, loading: ownerLoading } = useIsOwner();

  const [url, setUrl] = useState("");
  const [key, setKey] = useState("");
  const [source, setSource] = useState("env");
  const [showKey, setShowKey] = useState(false);
  const [db, setDb] = useState<Health>("unknown");
  const [auth, setAuth] = useState<Health>("unknown");
  const [realtime, setRealtime] = useState<Health>("unknown");
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState(false);

  // Load the effective configuration (env default or stored owner override).
  useEffect(() => {
    const config = getBackendConfig();
    setUrl(config.backendUrl);
    setKey(config.publicApiKey);
    setSource(config.source);
    setLastSync(readBackendOverride()?.checkedAt ?? localStorage.getItem(LAST_SYNC_KEY));
  }, []);

  const rememberSync = useCallback((iso: string) => {
    setLastSync(iso);
    try {
      localStorage.setItem(LAST_SYNC_KEY, iso);
    } catch {
      /* storage unavailable — the timestamp stays in memory only */
    }
  }, []);

  /** Overall banner state: connection health + live sync state of the app. */
  const overall = useMemo(() => {
    if (error) {
      return { label: "خطا در اتصال", tone: "bg-destructive/10 text-destructive", Icon: AlertTriangle, spin: false };
    }
    if (busy) {
      return { label: "در حال اتصال…", tone: "bg-muted text-muted-foreground", Icon: Loader2, spin: true };
    }
    if (syncStatus === "live") {
      return { label: "متصل و همگام", tone: "bg-primary/10 text-primary", Icon: CheckCircle2, spin: false };
    }
    if (syncStatus === "connecting") {
      return { label: "در حال اتصال…", tone: "bg-muted text-muted-foreground", Icon: Loader2, spin: true };
    }
    if (syncStatus === "reconnecting") {
      return { label: "در حال اتصال مجدد…", tone: "bg-amber-500/10 text-amber-600", Icon: RefreshCw, spin: true };
    }
    return { label: "آفلاین", tone: "bg-muted text-muted-foreground", Icon: WifiOff, spin: false };
  }, [busy, error, syncStatus]);

  /** Real connection test: database reachability + auth health + realtime handshake. */
  const test = useCallback(async (testUrl: string, testKey: string) => {
    setError(null);
    setDb("checking");
    setAuth("checking");
    setRealtime("checking");

    const client = createClient(testUrl, testKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (headers.get("Authorization") === `Bearer ${testKey}`) headers.delete("Authorization");
          headers.set("apikey", testKey);
          return fetch(input, { ...init, headers });
        },
      },
    });

    let dbOk = false;
    try {
      const { error: dbError } = await client
        .from("system_initialization")
        .select("is_initialized")
        .maybeSingle();
      // The Data API answered: reachable. A missing table or an RLS-empty result
      // still proves the database endpoint and the key are valid.
      dbOk =
        !dbError ||
        ["PGRST116", "PGRST205", "42P01", "42501"].includes(dbError.code ?? "");
    } catch {
      dbOk = false;
    }
    setDb(dbOk ? "ok" : "failed");

    let authOk = false;
    try {
      const res = await fetch(`${testUrl.replace(/\/+$/, "")}/auth/v1/health`, {
        headers: { apikey: testKey },
      });
      authOk = res.ok;
    } catch {
      authOk = false;
    }
    setAuth(authOk ? "ok" : "failed");

    const realtimeOk = await new Promise<boolean>((resolve) => {
      const channel = client.channel(`connection-test-${Date.now()}`);
      const timer = setTimeout(() => {
        void client.removeChannel(channel);
        resolve(false);
      }, 8000);
      channel.subscribe((status) => {
        if (status === "SUBSCRIBED" || status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
          clearTimeout(timer);
          void client.removeChannel(channel);
          resolve(status === "SUBSCRIBED");
        }
      });
    });
    setRealtime(realtimeOk ? "ok" : "failed");

    const ok = dbOk && authOk && realtimeOk;
    if (!ok) {
      const failed = [!dbOk && "پایگاه داده", !authOk && "احراز هویت", !realtimeOk && "همگام‌سازی آنی"]
        .filter(Boolean)
        .join("، ");
      setError(`اتصال ناموفق: ${failed}`);
    }
    return ok;
  }, []);

  function validate() {
    const nextUrl = url.trim().replace(/\/+$/, "");
    const nextKey = key.trim();
    if (!/^https?:\/\/.+/.test(nextUrl) || !nextKey) {
      setError("نشانی بک‌اند و کلید عمومی را کامل وارد کنید.");
      toast.error("نشانی بک‌اند و کلید عمومی را کامل وارد کنید.");
      return null;
    }
    if (/service_role|sb_secret_/i.test(nextKey)) {
      setError("کلید سرویس (Service Role) مجاز نیست؛ فقط کلید عمومی را وارد کنید.");
      toast.error("کلید سرویس (Service Role) مجاز نیست.");
      return null;
    }
    return { nextUrl, nextKey };
  }

  async function saveAndConnect() {
    if (busy) return;
    const values = validate();
    if (!values) return;
    setBusy(true);
    try {
      const ok = await test(values.nextUrl, values.nextKey);
      if (!ok) {
        toast.error("اتصال برقرار نشد؛ نشانی یا کلید عمومی درست نیست.");
        return;
      }
      const checkedAt = new Date().toISOString();
      saveBackendOverride({
        backendUrl: values.nextUrl,
        publicApiKey: values.nextKey,
        checkedAt,
      });
      setUrl(values.nextUrl);
      setKey(values.nextKey);
      setSource(getBackendConfig().source);
      rememberSync(checkedAt);
      // Use the existing realtime layer: pull fresh shared data right away.
      resync();
      setEditing(false);
      toast.success("تنظیمات اتصال ذخیره و بررسی شد.");
    } finally {
      setBusy(false);
    }
  }

  async function runTest() {
    if (busy) return;
    const values = validate();
    if (!values) return;
    setBusy(true);
    try {
      const ok = await test(values.nextUrl, values.nextKey);
      if (ok) {
        rememberSync(new Date().toISOString());
        toast.success("اتصال سالم است.");
      } else {
        toast.error("اتصال برقرار نیست.");
      }
    } finally {
      setBusy(false);
    }
  }

  /** Unlocks the fields for editing. */
  function startEdit() {
    setError(null);
    setEditing(true);
  }

  /** Discards edits and restores the currently effective configuration. */
  function cancelEdit() {
    const config = getBackendConfig();
    setUrl(config.backendUrl);
    setKey(config.publicApiKey);
    setSource(config.source);
    setError(null);
    setEditing(false);
  }

  /** Restores the default (connected project) configuration. */
  function restoreDefaults() {
    if (busy) return;
    clearBackendOverride();
    const config = envBackendConfigProvider.getConfig();
    setUrl(config.backendUrl);
    setKey(config.publicApiKey);
    setSource(config.source);
    setError(null);
    setDb("unknown");
    setAuth("unknown");
    setRealtime("unknown");
    setEditing(false);
    toast.success("تنظیمات پیش‌فرض بازگردانده شد.");
  }

  /**
   * Reconnect through the existing sync layer: the shared socket already
   * rebuilds itself (with backoff, dedup and a full resync) when the app comes
   * back online, so we simply re-trigger that path — no reload, no polling.
   */
  function reconnect() {
    if (typeof window !== "undefined") window.dispatchEvent(new Event("online"));
    resync();
    setError(null);
    toast.success("درخواست اتصال مجدد ارسال شد.");
  }

  function resyncNow() {
    resync();
    rememberSync(new Date().toISOString());
    toast.success("همگام‌سازی مجدد انجام شد.");
  }

  // Visible to the support/owner account; the parent settings page already
  // restricts this whole area to users with the «settings» permission.
  void ownerLoading;
  void isOwner;

  return (
    <section className="app-card mb-4 p-4 sm:p-6" dir="rtl">
      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 font-extrabold">
          <Cloud className="size-5 text-primary" /> اتصال ابری و همگام‌سازی
        </h2>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold ${overall.tone}`}
        >
          <overall.Icon className={`size-4 ${overall.spin ? "animate-spin" : ""}`} />
          {overall.label}
        </span>
      </div>
      <p className="mb-4 text-xs leading-6 text-muted-foreground">
        این بخش فقط برای پشتیبان (مالک سامانه) در دسترس است. به‌صورت پیش‌فرض از همان پروژهٔ ابری
        متصل استفاده می‌شود؛ در صورت نیاز می‌توانید نشانی بک‌اند و کلید عمومی را بازبینی یا جایگزین
        کنید. همگام‌سازی آنی از لایهٔ Realtime موجود برنامه استفاده می‌کند و بدون بارگذاری مجدد
        انجام می‌شود. کلید سرویس، رمز پایگاه داده و هر اطلاعات محرمانهٔ دیگر هرگز اینجا نگهداری یا
        نمایش داده نمی‌شود.
      </p>

      <div className="grid gap-3">
        <label className="grid gap-1.5">
          <span className="text-xs font-bold">نشانی بک‌اند (Cloud URL)</span>
          <Input
            dir="ltr"
            inputMode="url"
            autoComplete="off"
            placeholder="https://xxxx.supabase.co"
            value={url}
            readOnly={!editing}
            aria-readonly={!editing}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>

        <label className="grid gap-1.5">
          <span className="text-xs font-bold">کلید عمومی (Publishable / Anon Key)</span>
          <div className="relative">
            <Input
              dir="ltr"
              autoComplete="off"
              type={showKey ? "text" : "password"}
              placeholder="sb_publishable_… یا anon key"
              value={key}
              readOnly={!editing}
              aria-readonly={!editing}
              onChange={(e) => setKey(e.target.value)}
              className="pl-10"
            />
            <button
              type="button"
              onClick={() => setShowKey((v) => !v)}
              aria-label={showKey ? "پنهان کردن کلید" : "نمایش کلید"}
              className="absolute inset-y-0 left-0 grid w-10 place-items-center text-muted-foreground transition-colors hover:text-foreground"
            >
              {showKey ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          <span className="text-[11px] text-muted-foreground">
            فقط کلید عمومی را وارد کنید؛ کلید سرویس (Service Role) را هرگز اینجا قرار ندهید.
            {source === "owner-override" ? " (پیکربندی سفارشی فعال است)" : " (پیکربندی پیش‌فرض)"}
          </span>
        </label>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {editing ? (
          <>
            <Button onClick={saveAndConnect} disabled={busy} className="w-full font-bold">
              {busy ? <Loader2 className="size-4 animate-spin" /> : <PlugZap className="size-4" />}
              ذخیره و اتصال
            </Button>
            <Button
              variant="outline"
              onClick={cancelEdit}
              disabled={busy}
              className="w-full font-bold"
            >
              <XCircle className="size-4" />
              انصراف
            </Button>
          </>
        ) : (
          <>
            <Button onClick={startEdit} disabled={busy} className="w-full font-bold">
              <Pencil className="size-4" />
              ویرایش تنظیمات
            </Button>
            <Button
              variant="outline"
              onClick={runTest}
              disabled={busy}
              className="w-full font-bold"
            >
              <ShieldCheck className="size-4" />
              تست اتصال
            </Button>
          </>
        )}
      </div>

      {error ? (
        <p className="mt-3 flex items-start gap-2 rounded-xl bg-destructive/10 p-3 text-xs font-bold leading-6 text-destructive">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      ) : null}

      <div className="mt-4 grid gap-2">
        <HealthRow icon={Database} title="پایگاه داده" hint="دسترسی به داده‌های مشترک" state={db} />
        <HealthRow icon={KeyRound} title="احراز هویت" hint="ورود و نشست کاربران" state={auth} />
        <HealthRow
          icon={Radio}
          title="همگام‌سازی آنی (Realtime)"
          hint={
            syncStatus === "live"
              ? "کانال زندهٔ برنامه فعال است"
              : syncStatus === "reconnecting"
                ? "در حال اتصال مجدد کانال زنده"
                : syncStatus === "offline"
                  ? "کانال زنده آفلاین است"
                  : "در حال برقراری کانال زنده"
          }
          state={realtime}
        />
        <div className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-muted/30 p-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-background text-primary">
              <RefreshCw className="size-4.5" />
            </span>
            <div className="min-w-0">
              <div className="truncate text-sm font-bold">آخرین همگام‌سازی موفق</div>
              <div className="truncate text-[11px] text-muted-foreground">
                بدون بارگذاری مجدد و بدون فراخوانی دوره‌ای
              </div>
            </div>
          </div>
          <span className="shrink-0 text-[11px] font-bold text-muted-foreground">
            {lastSync ? formatJalaliDateTime(lastSync) : "—"}
          </span>
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <Button variant="outline" onClick={reconnect} disabled={busy} className="w-full font-bold">
          <PlugZap className="size-4" />
          اتصال مجدد
        </Button>
        <Button variant="outline" onClick={resyncNow} disabled={busy} className="w-full font-bold">
          <RefreshCw className="size-4" />
          همگام‌سازی مجدد
        </Button>
        <Button
          variant="outline"
          onClick={restoreDefaults}
          disabled={busy}
          className="w-full font-bold"
        >
          <RotateCcw className="size-4" />
          بازگردانی پیش‌فرض
        </Button>
      </div>
    </section>
  );
}
