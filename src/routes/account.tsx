import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Bell, Camera, Loader2, Moon, Palette, ShieldCheck, Sun, Trash2, User as UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { compressImage } from "@/lib/images";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui-kit";
import { Switch } from "@/components/ui/switch";
import { ROLE_LABEL, useStore } from "@/lib/store";
import { useOrgRole } from "@/lib/use-org-role";
import { useUserPrefs } from "@/lib/user-prefs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "تنظیمات کاربری | دز رکاب" },
      {
        name: "description",
        content: "تنظیمات شخصی حساب: پروفایل، ظاهر برنامه و اعلان‌های شما.",
      },
      { property: "og:title", content: "تنظیمات کاربری دز رکاب" },
      {
        property: "og:description",
        content: "پروفایل، ظاهر و اعلان‌های شخصی خود را مدیریت کنید.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <AppShell>
      <AccountSettingsPage />
    </AppShell>
  ),
});

type TabKey = "profile" | "appearance" | "notifications";

const TABS: { key: TabKey; label: string }[] = [
  { key: "profile", label: "پروفایل" },
  { key: "appearance", label: "ظاهر" },
  { key: "notifications", label: "اعلان‌ها" },
];

function AccountSettingsPage() {
  const { user, state, setState, setTheme } = useStore();
  const [tab, setTab] = useState<TabKey>("profile");
  const { prefs, update } = useUserPrefs(user?.id ?? null);
  const { role: orgRole, loading: orgRoleLoading } = useOrgRole();
  const photoInput = useRef<HTMLInputElement>(null);
  const [savingPhoto, setSavingPhoto] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.fullName ?? "",
    phone: user?.phone ?? "",
    title: user?.title ?? "",
  });

  if (!user) return null;

  function setAvatar(avatarUrl: string | undefined) {
    if (!user) return;
    setState((s) => ({
      ...s,
      users: s.users.map((u) => {
        if (u.id !== user.id) return u;
        const { avatarUrl: _prev, ...rest } = u;
        return avatarUrl ? { ...rest, avatarUrl } : rest;
      }),
    }));
  }


  async function pickPhoto(file: File | undefined) {
    if (!file) return;
    setSavingPhoto(true);
    try {
      const dataUrl = await compressImage(file, 512, 0.75);
      setAvatar(dataUrl);
      toast.success("عکس پروفایل شما به‌روزرسانی شد");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "انتخاب عکس انجام نشد.");
    } finally {
      setSavingPhoto(false);
    }
  }

  function saveProfile() {
    if (!user) return;
    if (!form.fullName.trim()) {
      toast.error("نام و نام خانوادگی را وارد کنید.");
      return;
    }
    setState((s) => ({
      ...s,
      users: s.users.map((u) =>
        u.id === user.id
          ? {
              ...u,
              fullName: form.fullName.trim(),
              phone: form.phone.trim(),
              title: form.title.trim(),
            }
          : u,
      ),
    }));
    toast.success("پروفایل شما ذخیره شد");
  }

  return (
    <>
      <PageHeader
        title="تنظیمات کاربری"
        subtitle={`${user.fullName} · ${ROLE_LABEL[user.role]} · فقط برای حساب شما`}
      />

      <div className="mb-4 grid grid-cols-3 gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            aria-pressed={tab === t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "h-12 rounded-xl text-sm font-bold transition-colors",
              tab === t.key
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "profile" ? (
        <section className="app-card p-4 sm:p-6">
          <h2 className="mb-4 flex items-center gap-2 font-extrabold">
            <UserIcon className="size-5 text-primary" /> پروفایل من
          </h2>
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-muted/50 p-4">
              <Avatar className="size-24 border-2 border-primary/40">
                {user.avatarUrl ? <AvatarImage src={user.avatarUrl} alt={user.fullName} /> : null}
                <AvatarFallback className="bg-primary-soft text-2xl font-bold text-primary">
                  {user.fullName.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <input
                ref={photoInput}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  void pickPhoto(e.target.files?.[0]);
                  e.target.value = "";
                }}
              />
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={savingPhoto}
                  onClick={() => photoInput.current?.click()}
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground disabled:opacity-60"
                >
                  {savingPhoto ? <Loader2 className="size-4 animate-spin" /> : <Camera className="size-4" />}
                  {user.avatarUrl ? "تغییر عکس پروفایل" : "انتخاب عکس پروفایل"}
                </button>
                {user.avatarUrl ? (
                  <button
                    type="button"
                    onClick={() => {
                      setAvatar(undefined);
                      toast.success("عکس پروفایل حذف شد");
                    }}
                    className="inline-flex h-11 items-center gap-2 rounded-xl bg-secondary px-4 text-sm font-bold text-secondary-foreground"
                  >
                    <Trash2 className="size-4" /> حذف عکس
                  </button>
                ) : null}
              </div>
              <p className="text-xs text-muted-foreground">عکس پروفایل فقط برای حساب شماست و هر زمان قابل تغییر است.</p>
            </div>
            <div className="space-y-2">
              <label htmlFor="acc-name" className="block text-sm font-bold">
                نام و نام خانوادگی
              </label>
              <input
                id="acc-name"
                value={form.fullName}
                onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                className="h-12 w-full rounded-xl border bg-card px-3 text-sm font-bold outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="acc-phone" className="block text-sm font-bold">
                شماره تماس
              </label>
              <input
                id="acc-phone"
                inputMode="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="num h-12 w-full rounded-xl border bg-card px-3 text-sm font-bold outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="acc-title" className="block text-sm font-bold">
                عنوان شغلی
              </label>
              <input
                id="acc-title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="h-12 w-full rounded-xl border bg-card px-3 text-sm font-bold outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="space-y-2">
              <span className="block text-sm font-bold">نام کاربری</span>
              <p className="rounded-xl bg-muted px-3 py-3 text-sm font-bold text-muted-foreground">
                {user.username}
              </p>
            </div>
            <div className="space-y-2">
              <span className="block text-sm font-bold">نقش سازمانی من</span>
              <div className="rounded-xl bg-muted px-3 py-3 text-sm font-bold text-muted-foreground">
                {orgRoleLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" /> در حال دریافت…
                  </span>
                ) : orgRole ? (
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-2 py-1 text-primary">
                      <ShieldCheck className="size-4" />
                      {orgRole.roleName}
                    </span>
                    {orgRole.organizationName ? (
                      <span className="text-xs">در {orgRole.organizationName}</span>
                    ) : null}
                  </span>
                ) : (
                  "نقشی برای شما ثبت نشده است."
                )}
              </div>
              {orgRole?.roleDescription ? (
                <p className="text-xs text-muted-foreground">{orgRole.roleDescription}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={saveProfile}
              className="h-12 w-full rounded-xl bg-primary text-sm font-bold text-primary-foreground"
            >
              ذخیره پروفایل
            </button>
          </div>
        </section>
      ) : null}

      {tab === "appearance" ? (
        <section className="app-card p-4 sm:p-6">
          <h2 className="mb-4 flex items-center gap-2 font-extrabold">
            <Palette className="size-5 text-primary" /> ظاهر برنامه
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                ["light", "حالت روز", Sun],
                ["dark", "حالت شب", Moon],
                ["vivid", "طرح ویژه", Palette],
              ] as const
            ).map(([value, label, Icon]) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setTheme(value);
                  toast.success(`${label} فعال شد`);
                }}
                aria-pressed={state.theme === value}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-2 text-xs font-bold",
                  state.theme === value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground",
                )}
              >
                <Icon className="size-5" /> {label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs leading-6 text-muted-foreground">
            انتخاب تم فقط روی حساب شما اثر می‌گذارد و ظاهر سایر کاربران تغییری نمی‌کند.
          </p>
        </section>
      ) : null}

      {tab === "notifications" ? (
        <section className="app-card p-4 sm:p-6">
          <h2 className="mb-1 flex items-center gap-2 font-extrabold">
            <Bell className="size-5 text-primary" /> اعلان‌های من
          </h2>
          <p className="mb-3 text-xs leading-6 text-muted-foreground">
            این تنظیمات شخصی است و فقط اعلان‌های حساب شما را کنترل می‌کند.
          </p>
          <label className="flex items-center justify-between gap-3 py-3">
            <span className="text-sm font-bold">نوتیفیکیشن مرورگر (Push)</span>
            <Switch
              checked={prefs.push}
              onCheckedChange={async (v) => {
                if (v && typeof Notification !== "undefined") {
                  const perm = await Notification.requestPermission();
                  if (perm !== "granted") {
                    toast.error("اجازه نوتیفیکیشن داده نشد.");
                    return;
                  }
                }
                update({ push: v });
              }}
            />
          </label>
          <label className="flex items-center justify-between gap-3 border-t py-3">
            <span className="text-sm font-bold">اعلان‌های داخل برنامه</span>
            <Switch checked={prefs.inApp} onCheckedChange={(v) => update({ inApp: v })} />
          </label>
          <label className="flex items-center justify-between gap-3 border-t py-3">
            <span className="text-sm font-bold">صدای اعلان</span>
            <Switch checked={prefs.sound} onCheckedChange={(v) => update({ sound: v })} />
          </label>
          <label className="flex items-center justify-between gap-3 border-t py-3">
            <span className="text-sm font-bold">ویبره اعلان</span>
            <Switch checked={prefs.vibrate} onCheckedChange={(v) => update({ vibrate: v })} />
          </label>
        </section>
      ) : null}
    </>
  );
}