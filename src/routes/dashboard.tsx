import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertCircle,
  Banknote,
  ClipboardCheck,
  ShoppingCart,
  Wrench,
  FileText,
  PackageCheck,
  TrendingUp,

} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, StatCard, Chip, EmptyState } from "@/components/ui-kit";
import { useStore, TASK_STATUS_LABEL, isRepairedBike } from "@/lib/store";
import { faDateTime, money, toFa } from "@/lib/format";
import cardExpensesToday from "@/assets/card-expenses-today.png";
import cardExpensesTotal from "@/assets/card-expenses-total.png";
import cardPurchases from "@/assets/card-purchases.png";
import cardInvoices from "@/assets/card-invoices.png";
import cardTasks from "@/assets/card-tasks.png";
import cardBikes from "@/assets/card-bikes.png";


export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "داشبورد | مدیریت تعمیرگاه دوچرخه" },
      {
        name: "description",
        content: "نمای کلی امروز فروشگاه و تعمیرگاه: هزینه‌ها، خریدها، فاکتورها و وظایف فعال.",
      },
      { property: "og:title", content: "داشبورد مدیریت تعمیرگاه دوچرخه" },
      { property: "og:description", content: "خلاصه وضعیت روزانه فروشگاه و تعمیرگاه دوچرخه." },
    ],
  }),
  component: () => (
    <AppShell>
      <Dashboard />
    </AppShell>
  ),
});

function Dashboard() {
  const { state, user } = useStore();
  if (!user) return null;

  const isManager = user.role === "ADMIN" || user.role === "STORE_MANAGER";
  const myTasks = state.tasks.filter((t) => t.workerId === user.id);

  if (user.role === "MECHANIC") {
    return (
      <>
        <PageHeader title={`خوش آمدید، ${user.fullName}`} subtitle="وظایف امروز شما" />
        {myTasks.length === 0 ? (
          <EmptyState
            icon={<Wrench className="size-6" />}
            title="وظیفه‌ای ثبت نشده"
            description="در حال حاضر هیچ وظیفه‌ای برای شما ثبت نشده است."
          />
        ) : (
          <ul className="space-y-3">
            {myTasks.map((t) => (
              <li key={t.id}>
                <Link to="/tasks/$id" params={{ id: t.id }} className="app-card block p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="min-w-0 font-bold">{t.title}</h3>
                    <Chip tone="info">{TASK_STATUS_LABEL[t.status]}</Chip>
                  </div>
                  <p className="num mt-2 text-sm text-muted-foreground">{money(t.wage, state.currency)}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }

  const isToday = (iso: string) => new Date(iso).toDateString() === new Date().toDateString();
  const todayExpenses = state.expenses
    .filter((e) => isToday(e.date))
    .reduce((s, e) => s + e.amount, 0);
  const allExpenses = state.expenses.reduce((s, e) => s + e.amount, 0);
  const pendingInvoices = state.invoices.filter((i) => i.status !== "SYNCED_TO_ACCOUNTING").length;
  const activeTasks = state.tasks.filter(
    (t) => t.status === "IN_PROGRESS" || t.status === "PENDING",
  ).length;
  // Repaired bikes are moved out of the purchases / inventory accounts.
  const activePurchases = state.purchases.filter((p) => !isRepairedBike(p));
  const visiblePurchases = isManager
    ? activePurchases
    : activePurchases.filter((p) => p.createdBy === user.id);
  const todayPurchases = visiblePurchases.filter((p) => isToday(p.createdAt)).length;
  const needsAction = activePurchases.filter((p) => p.status === "PENDING");

  return (
    <>
      <PageHeader
        title={`خوش آمدید، ${user.fullName.split(" ")[0]} عزیز`}
        subtitle="نمای کلی از وضعیت امروز فروشگاه و تعمیرگاه"
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        <StatCard
          icon={<Banknote className="size-6" />}
          image={cardExpensesToday}
          label="هزینه‌های امروز"
          value={money(todayExpenses, state.currency)}
          hint="مشاهده هزینه‌های امروز"
          tone="danger"
          to="/expenses"
          search={{ range: "TODAY" }}
        />
        <StatCard
          icon={<TrendingUp className="size-6" />}
          image={cardExpensesTotal}
          label="مجموع هزینه‌ها"
          value={money(allExpenses, state.currency)}
          hint="تحلیل هفته، ماه و سال"
          tone="warning"
          to="/reports"
        />
        <StatCard
          icon={<ShoppingCart className="size-6" />}
          image={cardPurchases}
          label="خریدها"
          value={toFa(visiblePurchases.length)}
          unit="مورد"
          hint={`امروز: ${toFa(todayPurchases)} مورد`}
          tone="info"
          to="/bicycle-purchases"
        />
        <StatCard
          icon={<FileText className="size-6" />}
          image={cardInvoices}
          label="فاکتورهای معلق"
          value={toFa(pendingInvoices)}
          unit="مورد"
          hint="نیاز به بررسی"
          tone="warning"
          to="/purchase-invoices"
        />
        <StatCard
          icon={<Wrench className="size-6" />}
          image={cardTasks}
          label="وظایف فعال"
          value={toFa(activeTasks)}
          unit="مورد"
          hint="در جریان کار"
          tone="success"
          to="/tasks"
        />
        <StatCard
          icon={<PackageCheck className="size-6" />}
          image={cardBikes}
          label="دوچرخه‌ها"
          value={toFa(activePurchases.filter((p) => p.status !== "REJECTED").length)}
          unit="عدد"
          hint="موجودی ثبت‌شده"
          tone="info"
          to="/inventory"
        />
      </div>

      <section className="panel-card mt-6 p-3 sm:p-4">
        <div className="mb-3 flex items-center justify-between gap-3 px-1">
          <h2 className="text-lg font-extrabold">نیاز به اقدام</h2>
          <Chip tone="primary" className="num shrink-0">
            {toFa(needsAction.length)} مورد
          </Chip>
        </div>
        {needsAction.length === 0 ? (
          <EmptyState
            icon={<PackageCheck className="size-6" />}
            title="همه چیز بررسی شده"
            description="در حال حاضر موردی در انتظار بررسی شما نیست."
          />
        ) : (
          <ul className="space-y-2">
            {needsAction.map((p) => (
              <li
                key={p.id}
                className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl bg-secondary/70 p-3"
              >
                <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-destructive/15 text-destructive">
                  <AlertCircle className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-extrabold sm:text-base">
                    تأیید خرید {p.brand}
                  </p>
                  <p className="truncate text-xs text-muted-foreground sm:text-sm">
                    درخواست توسط:{" "}
                    {state.users.find((u) => u.id === p.createdBy)?.fullName ?? "نامشخص"}
                  </p>
                </div>
                <Link
                  to="/bicycle-purchases/$id"
                  params={{ id: p.id }}
                  className="shrink-0 rounded-full bg-primary px-4 py-2 text-xs font-extrabold text-primary-foreground sm:text-sm"
                >
                  بررسی کنید
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="panel-card mt-4 p-3 sm:p-4">
        <h2 className="mb-3 px-1 text-lg font-extrabold">فعالیت‌های اخیر</h2>
        <ul className="space-y-2">
          {state.expenses.slice(0, 4).map((e) => (
            <li key={e.id} className="flex items-center gap-3 rounded-2xl bg-secondary/70 p-3">
              <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary">
                <ClipboardCheck className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-extrabold sm:text-base">
                  {e.description || "هزینه ثبت‌شده"}
                </p>
                <p className="num truncate text-xs text-muted-foreground sm:text-sm">
                  {money(e.amount, state.currency)} · {faDateTime(e.date)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
