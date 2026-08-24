import { r as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Nt as Banknote, et as Gift, f as TrendingUp, n as Wrench, pt as Coffee, x as ShieldAlert } from "../_libs/lucide-react.mjs";
import { S as money, T as toFa, a as Chip, c as FilterChips, l as ListSkeleton, o as EmptyState, t as AppShell, u as PageHeader, v as faDateTimeLong } from "./ui-kit-B64qXDLa.mjs";
import { T as can, Y as useStore, u as EXPENSE_LABEL } from "./router-DkR-Q5N6.mjs";
import { i as Route$8, n as RANGE_OPTIONS } from "./router-DkR-Q5N62.mjs";
import { t as RecordActions } from "./RecordActions-Bo88K8vu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/expenses-BZUC23nj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function inRange(iso, range) {
	if (range === "ALL") return true;
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return false;
	const now = /* @__PURE__ */ new Date();
	if (range === "TODAY") return d.toDateString() === now.toDateString();
	const days = range === "WEEK" ? 7 : range === "MONTH" ? 30 : 365;
	return now.getTime() - d.getTime() <= days * 864e5;
}
var ICONS = {
	SALARY: Banknote,
	BONUS: Gift,
	PENALTY: ShieldAlert,
	PERSONAL_WITHDRAWAL: Wrench,
	MISCELLANEOUS: Coffee
};
function ExpensesPage() {
	const { state, user, loading } = useStore();
	const search = Route$8.useSearch();
	const navigate = Route$8.useNavigate();
	const range = search.range;
	const [filter, setFilter] = (0, import_react.useState)("ALL");
	const list = (0, import_react.useMemo)(() => {
		if (!user) return [];
		const isManager = can(user, "approve");
		return state.expenses.filter((e) => isManager || e.createdBy === user.id).filter((e) => inRange(e.date, range)).filter((e) => filter === "ALL" || e.category === filter);
	}, [
		state.expenses,
		filter,
		user,
		range
	]);
	const total = list.reduce((s, e) => s + e.amount, 0);
	const rangeLabel = RANGE_OPTIONS.find((r) => r.value === range)?.label ?? "همه";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "مدیریت هزینه‌ها",
			subtitle: "ثبت، بررسی و تأیید هزینه‌های مجموعه"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl bg-gradient-to-l from-accent to-primary-soft p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						"مجموع هزینه‌ها (",
						rangeLabel,
						")"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "num mt-2 text-3xl font-extrabold",
					children: money(total, state.currency)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 flex items-center gap-1 text-sm font-bold text-primary",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-4" }),
						" ",
						toFa(list.length),
						" مورد ثبت‌شده"
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChips, {
				value: range,
				onChange: (v) => void navigate({
					search: { range: v },
					replace: true
				}),
				options: RANGE_OPTIONS
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChips, {
				value: filter,
				onChange: setFilter,
				options: [
					{
						value: "ALL",
						label: "همه"
					},
					{
						value: "MISCELLANEOUS",
						label: "هزینه"
					},
					{
						value: "SALARY",
						label: "حقوق"
					},
					{
						value: "BONUS",
						label: "پاداش"
					},
					{
						value: "PENALTY",
						label: "جریمه"
					},
					{
						value: "PERSONAL_WITHDRAWAL",
						label: "شخصی"
					}
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, {}) : list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banknote, { className: "size-6" }),
				title: "هزینه‌ای ثبت نشده",
				description: "با دکمه + هزینه جدیدی ثبت کنید.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/expenses/new",
					className: "rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground",
					children: "ثبت هزینه"
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: list.map((e) => {
					const Icon = ICONS[e.category];
					const creator = state.users.find((u) => u.id === e.createdBy);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "app-card flex items-center gap-3 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-12 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-6" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "truncate font-extrabold",
									children: e.name || e.description || EXPENSE_LABEL[e.category]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: faDateTimeLong(e.date)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "shrink-0 text-end",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "num text-sm font-extrabold",
										children: money(e.amount, state.currency)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: ["ثبت: ", creator?.fullName ?? "—"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
										className: "mt-1",
										tone: e.status === "APPROVED" ? "success" : e.status === "REJECTED" ? "danger" : e.status === "SYNCED_TO_ACCOUNTING" ? "info" : "warning",
										children: e.status === "APPROVED" ? "تایید شده" : e.status === "REJECTED" ? "رد شده" : e.status === "SYNCED_TO_ACCOUNTING" ? "حسابداری" : "در انتظار"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordActions, {
								kind: "expense",
								id: e.id,
								title: e.name || e.description || EXPENSE_LABEL[e.category],
								status: e.status
							})
						]
					}, e.id);
				})
			})
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpensesPage, {}) });
//#endregion
export { SplitComponent as component, inRange };
