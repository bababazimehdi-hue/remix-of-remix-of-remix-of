import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Plus, LogOut, Loader2, Menu, Search } from "lucide-react";
import { NotificationBell } from "@/components/layout/NotificationBell";
import { Logo } from "@/components/brand/Logo";
import { can, isForUser, ROLE_LABEL, useStore, type Role } from "@/lib/store";
import { useIsOwner } from "@/lib/use-is-owner";
import { cn } from "@/lib/utils";
import loginBanner from "@/assets/login-banner.jpg";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import icHome from "@/assets/icons/home.png";
import icPurchases from "@/assets/icons/purchases.png";
import icInventory from "@/assets/icons/inventory.png";
import icExpenses from "@/assets/icons/expenses.png";
import icTasks from "@/assets/icons/tasks.png";
import icMessages from "@/assets/icons/messages.png";
import icNotifications from "@/assets/icons/notifications.png";
import icInvoices from "@/assets/icons/invoices.png";
import icReports from "@/assets/icons/reports.png";
import icEarnings from "@/assets/icons/earnings.png";
import icExports from "@/assets/icons/exports.png";
import icShield from "@/assets/icons/shield.png";
import icUsers from "@/assets/icons/users.png";
import icSettings from "@/assets/icons/settings.png";
import { SyncStatusIndicator } from "@/lib/use-sync-engine";

type NavItem = {
  to: string;
  label: string;
  img: string;
  key: string;
  /** Items shown under the «بخش مدیریتی» heading of the main menu. */
  management?: boolean;
  /** Visible only for the OWNER / main support account (first system owner). */
  ownerOnly?: boolean;
};

function NavIcon({ src, className }: { src: string; className?: string }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      loading="lazy"
      width={24}
      height={24}
      className={cn("size-6 shrink-0 object-contain", className)}
    />
  );
}

const ALL_NAV: NavItem[] = [
  { to: "/dashboard", label: "خانه", img: icHome, key: "dashboard" },
  { to: "/bicycle-purchases", label: "خریدها", img: icPurchases, key: "purchases" },
  { to: "/inventory", label: "دوچرخه‌ها", img: icInventory, key: "inventory" },
  { to: "/expenses", label: "هزینه‌ها", img: icExpenses, key: "expenses" },
  { to: "/tasks", label: "وظایف", img: icTasks, key: "tasks" },
  { to: "/messages", label: "پیام‌ها", img: icMessages, key: "messages" },
];

const DESKTOP_EXTRA: NavItem[] = [
  { to: "/repaired-bikes", label: "دوچرخه‌های تعمیر شده", img: icInventory, key: "inventory" },
  { to: "/notifications", label: "اعلان‌ها", img: icNotifications, key: "notifications" },
  { to: "/purchase-invoices", label: "فاکتورهای خرید", img: icInvoices, key: "invoices" },
  { to: "/reports", label: "گزارش و تحلیل", img: icReports, key: "reports" },
  { to: "/daily-reports", label: "گزارش روزانه کارکنان", img: icReports, key: "reports" },
  { to: "/earnings", label: "دستمزد و پاداش", img: icEarnings, key: "earnings" },
  { to: "/exports", label: "خروجی حسابداری", img: icExports, key: "exports" },
  { to: "/account", label: "تنظیمات کاربری", img: icSettings, key: "account" },
  { to: "/admin", label: "پنل پشتیبان", img: icShield, key: "users", management: true },
  { to: "/users", label: "مدیریت کاربران", img: icUsers, key: "users", management: true },
  {
    to: "/permissions",
    label: "تغییر دسترسی کاربران",
    img: icShield,
    key: "users",
    management: true,
  },
  {
    to: "/settings",
    label: "تنظیمات",
    img: icSettings,
    key: "settings",
    management: true,
    ownerOnly: true,
  },
];


function navFor(user: { role: Role; permissions?: Record<string, boolean> }): NavItem[] {
  if (user.role === "MECHANIC")
    return [
      { to: "/tasks", label: "وظایف من", img: icTasks, key: "tasks" },
      { to: "/earnings", label: "دستمزد من", img: icEarnings, key: "earnings" },
      { to: "/messages", label: "پیام‌ها", img: icMessages, key: "messages" },
    ].filter((n) => can(user as never, n.key));
  return ALL_NAV.filter((n) => can(user as never, n.key));
}

function SideNavLink({
  item,
  path,
  unread,
}: {
  item: NavItem;
  path: string;
  unread: number;
}) {
  const active = path === item.to || path.startsWith(item.to + "/");
  return (
    <Link
      to={item.to}
      data-selected={active ? "true" : undefined}
      className={cn(
        "pressable flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold",
        active ? "bg-primary text-primary-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent",
      )}
    >
      <NavIcon src={item.img} className={active ? "brightness-0 invert" : ""} />
      <span className="truncate">{item.label}</span>
      {item.key === "notifications" && unread > 0 ? (
        <span className="ms-auto rounded-full bg-destructive px-2 text-xs font-bold text-destructive-foreground">
          {unread}
        </span>
      ) : null}
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { user, state, logout, loading } = useStore();
  const { isOwner } = useIsOwner();

  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [fabOpen, setFabOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expenseMenu, setExpenseMenu] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  // The signed-in person only becomes known once the first cloud load lands;
  // until then this is a loading screen, never a "please sign in" screen.
  if (!user && loading) {
    return (
      <div className="grid min-h-dvh place-items-center px-6 text-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="size-5 animate-spin" />
          <span className="text-sm font-bold">در حال بارگذاری اطلاعات…</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="grid min-h-dvh place-items-center px-6 text-center">
        <div className="space-y-4">
          <p className="text-muted-foreground">برای ادامه ابتدا وارد حساب خود شوید.</p>
          <Link
            to="/"
            className="inline-flex rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground"
          >
            ورود به حساب
          </Link>
        </div>
      </div>
    );
  }



  const mobileNav = navFor(user);
  const isSupport = isOwner || user.role === "ADMIN";
  const visibleExtra = DESKTOP_EXTRA.filter(
    (n) => (n.key === "account" || can(user, n.key)) && (!n.ownerOnly || isSupport),
  );

  const sideNav = [...navFor(user), ...visibleExtra.filter((n) => !n.management)].filter(
    (item, i, list) => list.findIndex((x) => x.to === item.to) === i,
  );
  const manageNav = visibleExtra.filter(
    (n) => n.management && !sideNav.some((x) => x.to === n.to),
  );

  const unread = state.notifications.filter(
    (n) => !n.isRead && isForUser(n, user),
  ).length;

  const showFab = user.role !== "MECHANIC";

  const fabActions: { label: string; onClick: () => void }[] = [];
  if (user.role !== "MECHANIC")
    fabActions.push({ label: "ثبت خرید دوچرخه", onClick: () => go("/bicycle-purchases/new") });
  if (can(user, "invoices"))
    fabActions.push({ label: "ثبت پیش‌فاکتور خرید", onClick: () => go("/purchase-invoices/new") });
  if (can(user, "approve"))
    fabActions.push({ label: "ثبت وظیفه جدید", onClick: () => go("/tasks?new=1") });

  function go(to: string) {
    setFabOpen(false);
    setExpenseMenu(false);
    void navigate({ to });
  }

  return (
    <div className="min-h-dvh lg:flex">
      {/* Desktop sidebar */}
      <aside className="no-print safe-top sticky top-0 hidden h-screen w-72 shrink-0 overflow-y-auto border-l bg-sidebar p-4 lg:flex lg:flex-col">
        <div className="flex items-center gap-2 px-2 py-3">
          <Logo className="size-10 shadow-[var(--shadow-glow)]" />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg text-primary">مدیریت هوشمند</span>
            <span className="text-[11px] font-bold text-muted-foreground">شهر دوچرخه دز رکاب</span>
          </span>
        </div>

        <nav className="mt-4 flex-1 space-y-1">
          {sideNav.map((item) => (
            <SideNavLink key={item.to} item={item} path={path} unread={unread} />
          ))}

          {manageNav.length > 0 ? (
            <>
              <div className="mt-4 px-3 pb-1 pt-3 text-[11px] font-extrabold text-muted-foreground">
                بخش مدیریتی
              </div>
              {manageNav.map((item) => (
                <SideNavLink key={item.to} item={item} path={path} unread={unread} />
              ))}
            </>
          ) : null}
        </nav>

        <button
          onClick={() => {
            logout();
            void navigate({ to: "/" });
          }}
          className="flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-bold text-destructive hover:bg-destructive/10"
        >
          <LogOut className="size-5" /> خروج از حساب
        </button>
      </aside>

      <div className="flex min-h-dvh w-full min-w-0 flex-col">
        {/* Header */}
        <header className="no-print safe-top safe-x sticky top-0 z-30 bg-background px-3 pb-2 pt-3">
          <div className="panel-card relative mx-auto grid w-full max-w-5xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-4">
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="منوی کامل"
                className="grid size-11 place-items-center rounded-full bg-secondary text-foreground transition-colors hover:bg-accent lg:hidden"
              >
                <Menu className="size-5" />
              </button>
              <Link
                to="/inventory"
                aria-label="جست‌وجو در دوچرخه‌ها"
                className="grid size-11 place-items-center rounded-full bg-secondary text-foreground transition-colors hover:bg-accent"
              >
                <Search className="size-5" />
              </Link>
            </div>

            <div className="flex min-w-0 flex-col items-center justify-center text-center">
              <span className="flex max-w-full items-center gap-1.5 truncate font-display text-base tracking-tight sm:text-lg">
                سلام {user.fullName.split(" ")[0]} <span aria-hidden>👋</span>
              </span>
              <span className="truncate text-[11px] font-bold text-muted-foreground">
                شهر دوچرخه دز رکاب
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <SyncStatusIndicator />
              <NotificationBell user={user} />

              <Link to="/account" aria-label="تنظیمات کاربری" className="relative shrink-0">
                <Avatar className="size-11 border-2 border-border">
                  {user.avatarUrl ? <AvatarImage src={user.avatarUrl} alt={user.fullName} /> : null}
                  <AvatarFallback className="bg-secondary text-sm font-bold">
                    {user.fullName.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute -bottom-0.5 -end-0.5 size-3 rounded-full border-2 border-card bg-success" />
              </Link>
            </div>
          </div>
        </header>



        <main className="safe-x mx-auto w-full min-w-0 max-w-5xl flex-1 px-4 pb-32 pt-4 sm:pt-5 lg:pb-12">{children}</main>

        {/* FAB */}
        {showFab ? (
          <button
            onClick={() => setFabOpen(true)}
            aria-label="ثبت مورد جدید"
            className="no-print fixed bottom-[calc(6rem+env(safe-area-inset-bottom))] start-4 z-40 grid size-14 place-items-center sm:size-16 rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-float)] transition-transform active:scale-95 lg:bottom-8"
          >
            <Plus className="size-8" />
          </button>
        ) : null}

        <Sheet
          open={fabOpen}
          onOpenChange={(o) => {
            setFabOpen(o);
            if (!o) setExpenseMenu(false);
          }}
        >
          <SheetContent side="bottom" className="safe-bottom rounded-t-3xl">
            <SheetHeader className="text-start">
              <SheetTitle>{expenseMenu ? "دسته هزینه را انتخاب کنید" : "ثبت مورد جدید"}</SheetTitle>
            </SheetHeader>
            <div className="space-y-2 p-4">
              {expenseMenu ? (
                <>
                  {[
                    ["MISCELLANEOUS", "هزینه"],
                    ["SALARY", "حقوق"],
                    ["BONUS", "پاداش"],
                    ["PENALTY", "جریمه"],
                    ...(can(user, "personalWithdrawal")
                      ? [["PERSONAL_WITHDRAWAL", "برداشت شخصی"]]
                      : []),
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() => go(`/expenses/new?category=${value}`)}
                      className="w-full rounded-xl bg-secondary px-4 py-4 text-start text-sm font-bold hover:bg-accent"
                    >
                      {label}
                    </button>
                  ))}
                  <button
                    onClick={() => setExpenseMenu(false)}
                    className="w-full rounded-xl px-4 py-3 text-sm font-bold text-muted-foreground"
                  >
                    بازگشت
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setExpenseMenu(true)}
                    className="w-full rounded-xl bg-primary px-4 py-4 text-start text-sm font-bold text-primary-foreground"
                  >
                    ثبت هزینه
                  </button>
                  {fabActions.map((a) => (
                    <button
                      key={a.label}
                      onClick={a.onClick}
                      className="w-full rounded-xl bg-secondary px-4 py-4 text-start text-sm font-bold hover:bg-accent"
                    >
                      {a.label}
                    </button>
                  ))}
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>

        {/* Full menu (mobile) */}
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetContent side="right" className="safe-top safe-bottom w-[86vw] max-w-sm overflow-y-auto p-0">
            <SheetHeader className="border-b p-4 text-start">
              <SheetTitle className="flex items-center gap-2">
                <Logo className="size-8 rounded-lg" />
                منوی کامل
              </SheetTitle>
            </SheetHeader>
            <nav className="space-y-1 p-3">
              {sideNav.map((item) => (
                <SideNavLink key={item.to} item={item} path={path} unread={unread} />
              ))}

              {manageNav.length > 0 ? (
                <>
                  <div className="mt-4 px-3 pb-1 pt-3 text-[11px] font-extrabold text-muted-foreground">
                    بخش مدیریتی
                  </div>
                  {manageNav.map((item) => (
                    <SideNavLink key={item.to} item={item} path={path} unread={unread} />
                  ))}
                </>
              ) : null}

              <button
                onClick={() => {
                  setMenuOpen(false);
                  logout();
                  void navigate({ to: "/" });
                }}
                className="mt-3 flex w-full items-center gap-2 rounded-xl px-3 py-3 text-sm font-bold text-destructive hover:bg-destructive/10"
              >
                <LogOut className="size-5" /> خروج از حساب
              </button>
            </nav>
          </SheetContent>
        </Sheet>



        {/* Bottom nav (mobile) */}
        <nav className="no-print safe-bottom safe-x fixed inset-x-0 bottom-0 z-30 border-t bg-card lg:hidden">
          <ul className="mx-auto flex max-w-lg items-stretch justify-between px-1 sm:px-2">
            {mobileNav.map((item) => {
              const active = path === item.to || path.startsWith(item.to + "/");
              return (
                <li key={item.to} className="flex-1">
                  <Link
                    to={item.to}
                    data-selected={active ? "true" : undefined}
                    className={cn(
                      "pressable flex min-h-16 w-full min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-0.5 py-2 text-[10px] font-extrabold leading-tight sm:px-1 sm:text-[11px]",
                      active
                        ? "bg-primary/15 text-primary shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--primary)_35%,transparent)]"
                        : "text-muted-foreground",
                    )}
                  >
                    <span className="relative">
                      <NavIcon src={item.img} className={active ? "" : "opacity-60 grayscale"} />
                      {item.key === "notifications" && unread > 0 ? (
                        <span className="absolute -end-1 -top-1 size-2 rounded-full bg-destructive" />
                      ) : null}
                    </span>
                    <span className="w-full truncate text-center">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export function RoleBadge({ role }: { role: Role }) {
  return (
    <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
      {ROLE_LABEL[role]}
    </span>
  );
}
