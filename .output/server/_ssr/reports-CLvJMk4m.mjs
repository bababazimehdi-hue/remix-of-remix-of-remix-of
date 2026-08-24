import { r as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { Dt as ChartColumn, Nt as Banknote, n as Wrench, y as ShoppingCart } from "../_libs/lucide-react.mjs";
import { S as money, T as toFa, c as FilterChips, h as StatCard, o as EmptyState, t as AppShell, u as PageHeader, v as faDateTimeLong } from "./ui-kit-B64qXDLa.mjs";
import { A as expenseTitle, T as can, Y as useStore, u as EXPENSE_LABEL, z as isRepairedBike } from "./router-DkR-Q5N6.mjs";
import { n as RANGE_OPTIONS, s as inRange } from "./router-DkR-Q5N62.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-CLvJMk4m.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReportsPage() {
	const { state, user } = useStore();
	const [range, setRange] = (0, import_react.useState)("MONTH");
	const expenses = (0, import_react.useMemo)(() => state.expenses.filter((e) => inRange(e.date, range)), [state.expenses, range]);
	const purchases = (0, import_react.useMemo)(() => state.purchases.filter((p) => !isRepairedBike(p) && inRange(p.createdAt, range)), [state.purchases, range]);
	const wages = (0, import_react.useMemo)(() => state.tasks.filter((t) => ["APPROVED", "SYNCED_TO_ACCOUNTING"].includes(t.status)).filter((t) => inRange(t.submittedAt ?? t.createdAt, range)), [state.tasks, range]);
	if (!can(user, "reports")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "size-6" }),
		title: "دسترسی ندارید",
		description: "گزارش‌های تحلیلی فقط برای مدیران فعال است."
	});
	const total = expenses.reduce((s, e) => s + e.amount, 0);
	const byCategory = Object.keys(EXPENSE_LABEL).map((c) => ({
		category: c,
		amount: expenses.filter((e) => e.category === c).reduce((s, e) => s + e.amount, 0)
	})).filter((r) => r.amount > 0).sort((a, b) => b.amount - a.amount);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "گزارش و تحلیل",
			subtitle: "بررسی هزینه‌ها و فعالیت‌ها در بازه‌های زمانی"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChips, {
			value: range,
			onChange: setRange,
			options: RANGE_OPTIONS
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banknote, { className: "size-5" }),
					label: "مجموع هزینه‌ها",
					value: money(total, state.currency),
					tone: "danger"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "size-5" }),
					label: "خریدهای ثبت‌شده",
					value: toFa(purchases.length),
					tone: "info",
					to: "/bicycle-purchases"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-5" }),
					label: "دستمزد وظایف",
					value: money(wages.reduce((s, t) => s + (t.finalWage ?? t.wage), 0), state.currency),
					tone: "success",
					to: "/earnings"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "size-5" }),
					label: "تعداد رکوردها",
					value: toFa(expenses.length + purchases.length + wages.length),
					tone: "warning"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-lg font-extrabold",
				children: "سهم هر دسته از هزینه‌ها"
			}), byCategory.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banknote, { className: "size-6" }),
				title: "داده‌ای در این بازه نیست",
				description: "بازه دیگری را انتخاب کنید یا هزینه‌ای ثبت کنید."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "app-card space-y-4 p-4",
				children: byCategory.map((row) => {
					const pct = total ? Math.round(row.amount / total * 100) : 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3 text-sm font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: EXPENSE_LABEL[row.category] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "num",
								children: money(row.amount, state.currency)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 h-2.5 overflow-hidden rounded-full bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-primary",
								style: { width: `${pct}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "num mt-1 text-xs text-muted-foreground",
							children: [toFa(pct), "٪ از کل"]
						})
					] }, row.category);
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-lg font-extrabold",
				children: "آخرین هزینه‌های این بازه"
			}), expenses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banknote, { className: "size-6" }),
				title: "هزینه‌ای ثبت نشده",
				description: "در این بازه زمانی هزینه‌ای ثبت نشده است."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "app-card divide-y",
				children: expenses.slice(0, 10).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-3 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate font-bold",
							children: expenseTitle(e)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-muted-foreground",
							children: faDateTimeLong(e.date)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "num shrink-0 text-sm font-extrabold",
						children: money(e.amount, state.currency)
					})]
				}, e.id))
			})]
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportsPage, {}) });
//#endregion
export { SplitComponent as component };
