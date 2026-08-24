import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as PackageCheck, Nt as Banknote, St as CircleAlert, _t as ClipboardCheck, f as TrendingUp, n as Wrench, nt as FileText, y as ShoppingCart } from "../_libs/lucide-react.mjs";
import { S as money, T as toFa, _ as faDateTime, a as Chip, h as StatCard, o as EmptyState, t as AppShell, u as PageHeader } from "./ui-kit-B64qXDLa.mjs";
import { C as TASK_STATUS_LABEL, Y as useStore, z as isRepairedBike } from "./router-DkR-Q5N6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-kZrDyx4k.js
var import_jsx_runtime = require_jsx_runtime();
var card_expenses_today_default = "/assets/card-expenses-today-C3IjMywK.png";
var card_expenses_total_default = "/assets/card-expenses-total-8PY5_ggM.png";
var card_purchases_default = "/assets/card-purchases-Ce5M2759.png";
var card_invoices_default = "/assets/card-invoices-B6fwy6Pn.png";
var card_tasks_default = "/assets/card-tasks-dbNNeWJf.png";
var card_bikes_default = "/assets/card-bikes-jur5FGz4.png";
function Dashboard() {
	const { state, user } = useStore();
	if (!user) return null;
	const isManager = user.role === "ADMIN" || user.role === "STORE_MANAGER";
	const myTasks = state.tasks.filter((t) => t.workerId === user.id);
	if (user.role === "MECHANIC") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: `خوش آمدید، ${user.fullName}`,
		subtitle: "وظایف امروز شما"
	}), myTasks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-6" }),
		title: "وظیفه‌ای ثبت نشده",
		description: "در حال حاضر هیچ وظیفه‌ای برای شما ثبت نشده است."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-3",
		children: myTasks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/tasks/$id",
			params: { id: t.id },
			className: "app-card block p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "min-w-0 font-bold",
					children: t.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					tone: "info",
					children: TASK_STATUS_LABEL[t.status]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "num mt-2 text-sm text-muted-foreground",
				children: money(t.wage, state.currency)
			})]
		}) }, t.id))
	})] });
	const isToday = (iso) => new Date(iso).toDateString() === (/* @__PURE__ */ new Date()).toDateString();
	const todayExpenses = state.expenses.filter((e) => isToday(e.date)).reduce((s, e) => s + e.amount, 0);
	const allExpenses = state.expenses.reduce((s, e) => s + e.amount, 0);
	const pendingInvoices = state.invoices.filter((i) => i.status !== "SYNCED_TO_ACCOUNTING").length;
	const activeTasks = state.tasks.filter((t) => t.status === "IN_PROGRESS" || t.status === "PENDING").length;
	const activePurchases = state.purchases.filter((p) => !isRepairedBike(p));
	const visiblePurchases = isManager ? activePurchases : activePurchases.filter((p) => p.createdBy === user.id);
	const todayPurchases = visiblePurchases.filter((p) => isToday(p.createdAt)).length;
	const needsAction = activePurchases.filter((p) => p.status === "PENDING");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: `خوش آمدید، ${user.fullName.split(" ")[0]} عزیز`,
			subtitle: "نمای کلی از وضعیت امروز فروشگاه و تعمیرگاه"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banknote, { className: "size-6" }),
					image: card_expenses_today_default,
					label: "هزینه‌های امروز",
					value: money(todayExpenses, state.currency),
					hint: "مشاهده هزینه‌های امروز",
					tone: "danger",
					to: "/expenses",
					search: { range: "TODAY" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-6" }),
					image: card_expenses_total_default,
					label: "مجموع هزینه‌ها",
					value: money(allExpenses, state.currency),
					hint: "تحلیل هفته، ماه و سال",
					tone: "warning",
					to: "/reports"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "size-6" }),
					image: card_purchases_default,
					label: "خریدها",
					value: toFa(visiblePurchases.length),
					unit: "مورد",
					hint: `امروز: ${toFa(todayPurchases)} مورد`,
					tone: "info",
					to: "/bicycle-purchases"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-6" }),
					image: card_invoices_default,
					label: "فاکتورهای معلق",
					value: toFa(pendingInvoices),
					unit: "مورد",
					hint: "نیاز به بررسی",
					tone: "warning",
					to: "/purchase-invoices"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-6" }),
					image: card_tasks_default,
					label: "وظایف فعال",
					value: toFa(activeTasks),
					unit: "مورد",
					hint: "در جریان کار",
					tone: "success",
					to: "/tasks"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageCheck, { className: "size-6" }),
					image: card_bikes_default,
					label: "دوچرخه‌ها",
					value: toFa(activePurchases.filter((p) => p.status !== "REJECTED").length),
					unit: "عدد",
					hint: "موجودی ثبت‌شده",
					tone: "info",
					to: "/inventory"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel-card mt-6 p-3 sm:p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between gap-3 px-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-extrabold",
					children: "نیاز به اقدام"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
					tone: "primary",
					className: "num shrink-0",
					children: [toFa(needsAction.length), " مورد"]
				})]
			}), needsAction.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageCheck, { className: "size-6" }),
				title: "همه چیز بررسی شده",
				description: "در حال حاضر موردی در انتظار بررسی شما نیست."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: needsAction.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl bg-secondary/70 p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-11 shrink-0 place-items-center rounded-2xl bg-destructive/15 text-destructive",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-sm font-extrabold sm:text-base",
								children: ["تأیید خرید ", p.brand]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-xs text-muted-foreground sm:text-sm",
								children: [
									"درخواست توسط:",
									" ",
									state.users.find((u) => u.id === p.createdBy)?.fullName ?? "نامشخص"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/bicycle-purchases/$id",
							params: { id: p.id },
							className: "shrink-0 rounded-full bg-primary px-4 py-2 text-xs font-extrabold text-primary-foreground sm:text-sm",
							children: "بررسی کنید"
						})
					]
				}, p.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel-card mt-4 p-3 sm:p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 px-1 text-lg font-extrabold",
				children: "فعالیت‌های اخیر"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: state.expenses.slice(0, 4).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-3 rounded-2xl bg-secondary/70 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCheck, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-extrabold sm:text-base",
							children: e.description || "هزینه ثبت‌شده"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "num truncate text-xs text-muted-foreground sm:text-sm",
							children: [
								money(e.amount, state.currency),
								" · ",
								faDateTime(e.date)
							]
						})]
					})]
				}, e.id))
			})]
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {}) });
//#endregion
export { SplitComponent as component };
