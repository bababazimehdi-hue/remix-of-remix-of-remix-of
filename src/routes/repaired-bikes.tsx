import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BadgeCheck, Palette, Search, Wrench } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Chip, EmptyState, FilterChips, ListSkeleton, PageHeader } from "@/components/ui-kit";
import { BIKE_TYPE_LABEL, isRepairedBike, useStore, type BikeType } from "@/lib/store";
import { bikeWageTotal } from "@/lib/repaired-bikes";
import { faDateTime, money, toFa } from "@/lib/format";

export const Route = createFileRoute("/repaired-bikes")({
  head: () => ({
    meta: [
      { title: "دوچرخه‌های تعمیر شده | مدیریت تعمیرگاه" },
      {
        name: "description",
        content:
          "فهرست دوچرخه‌هایی که تعمیرشان نهایی شده و از حساب دوچرخه‌های خریداری‌شده خارج شده‌اند.",
      },
      { property: "og:title", content: "دوچرخه‌های تعمیر شده" },
      {
        property: "og:description",
        content: "دوچرخه‌های تعمیرشده به همراه دستمزد ثبت‌شده تعمیرکار.",
      },
    ],
  }),
  component: () => (
    <AppShell>
      <RepairedBikesPage />
    </AppShell>
  ),
});

function RepairedBikesPage() {
  const { state, user, loading } = useStore();
  const [q, setQ] = useState("");
  const [type, setType] = useState<"ALL" | BikeType>("ALL");

  const bikes = useMemo(() => state.purchases.filter(isRepairedBike), [state.purchases]);

  const list = useMemo(
    () =>
      bikes
        .filter((b) => type === "ALL" || b.bikeType === type)
        .filter((b) => (q ? (b.brand + b.color + b.size).includes(q.trim()) : true))
        .sort((a, b) => (a.repairedAt! < b.repairedAt! ? 1 : -1)),
    [bikes, type, q],
  );

  const totalWage = useMemo(
    () => bikes.reduce((s, b) => s + bikeWageTotal(state.tasks, b.id), 0),
    [bikes, state.tasks],
  );
  const totalPrice = useMemo(() => bikes.reduce((s, b) => s + b.purchasePrice, 0), [bikes]);

  if (!user) return null;

  return (
    <>
      <PageHeader
        title="دوچرخه‌های تعمیر شده"
        subtitle="این دوچرخه‌ها از حساب خریدها و موجودی خارج شده‌اند"
      />

      <section className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="app-card p-4">
          <p className="text-xs text-muted-foreground">تعداد</p>
          <p className="num mt-1 text-2xl font-extrabold text-primary">{toFa(bikes.length)}</p>
        </div>
        <div className="app-card p-4">
          <p className="text-xs text-muted-foreground">مجموع قیمت خرید (منتقل‌شده)</p>
          <p className="num mt-1 text-xl font-extrabold">{money(totalPrice, state.currency)}</p>
        </div>
        <div className="app-card p-4">
          <p className="text-xs text-muted-foreground">مجموع دستمزد تعمیرکاران</p>
          <p className="num mt-1 text-xl font-extrabold">{money(totalWage, state.currency)}</p>
        </div>
      </section>

      <div className="mb-3 flex items-center gap-2 rounded-2xl border bg-card px-4 focus-within:ring-2 focus-within:ring-ring">
        <Search className="size-5 shrink-0 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="جستجو بر اساس برند، رنگ یا سایز..."
          aria-label="جستجوی دوچرخه تعمیر شده"
          className="h-12 w-full bg-transparent text-sm outline-none"
        />
      </div>

      <FilterChips
        value={type}
        onChange={setType}
        options={[
          { value: "ALL", label: "همه دسته‌ها" },
          ...(Object.keys(BIKE_TYPE_LABEL) as BikeType[]).map((t) => ({
            value: t,
            label: BIKE_TYPE_LABEL[t],
          })),
        ]}
      />

      <div className="mt-4">
        {loading ? (
          <ListSkeleton />
        ) : list.length === 0 ? (
          <EmptyState
            icon={<BadgeCheck className="size-6" />}
            title="هنوز دوچرخه تعمیرشده‌ای ثبت نشده"
            description="با نهایی شدن تعمیر یا انتقال دستی از بخش دوچرخه‌ها، دوچرخه‌ها اینجا نمایش داده می‌شوند."
          />
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {list.map((b) => {
              const wage = bikeWageTotal(state.tasks, b.id);
              const movedBy = state.users.find((u) => u.id === b.repairedBy);
              return (
                <li key={b.id} className="app-card overflow-hidden">
                  <div className="flex items-center justify-between gap-2 bg-secondary px-4 py-3">
                    <Chip tone="success">
                      <BadgeCheck className="size-3.5" /> تعمیر شده
                    </Chip>
                    <span className="text-xs font-bold text-muted-foreground">
                      {BIKE_TYPE_LABEL[b.bikeType]} · سایز {toFa(b.size)}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-extrabold">{b.brand}</h3>
                    <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                      <Palette className="size-4" /> رنگ: {b.color} · انتقال:{" "}
                      {faDateTime(b.repairedAt!)}
                    </p>
                    {movedBy ? (
                      <p className="mt-1 text-xs text-muted-foreground">
                        منتقل‌شده توسط {movedBy.fullName}
                      </p>
                    ) : null}
                    {b.repairedNote ? (
                      <p className="mt-2 rounded-xl bg-accent p-2 text-xs text-accent-foreground">
                        {b.repairedNote}
                      </p>
                    ) : null}
                    <div className="mt-3 grid grid-cols-2 gap-2 border-t pt-3 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">قیمت خرید (منتقل‌شده)</p>
                        <p className="num font-extrabold">
                          {money(b.purchasePrice, state.currency)}
                        </p>
                      </div>
                      <div className="text-end">
                        <p className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                          <Wrench className="size-3.5" /> دستمزد تعمیرکار
                        </p>
                        <p className="num font-extrabold text-primary">
                          {money(wage, state.currency)}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
