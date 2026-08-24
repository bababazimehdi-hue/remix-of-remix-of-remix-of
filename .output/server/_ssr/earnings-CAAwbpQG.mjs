import { r as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { Ft as Award, et as Gift, i as Wallet, n as Wrench, x as ShieldAlert } from "../_libs/lucide-react.mjs";
import { S as money, T as toFa, a as Chip, h as StatCard, o as EmptyState, t as AppShell, u as PageHeader, v as faDateTimeLong } from "./ui-kit-B64qXDLa.mjs";
import { s as SelectField } from "./fields-ESZmE-g5.mjs";
import { C as TASK_STATUS_LABEL, T as can, Y as useStore } from "./router-DkR-Q5N6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/earnings-CAAwbpQG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EarningsPage() {
	const { state, user } = useStore();
	const isManager = can(user, "approve");
	const [targetId, setTargetId] = (0, import_react.useState)(user?.id ?? "");
	const viewedId = (isManager ? targetId || user?.id : user?.id) ?? "";
	const viewed = state.users.find((u) => u.id === viewedId);
	const tasks = (0, import_react.useMemo)(() => state.tasks.filter((t) => t.workerId === viewedId).filter((t) => [
		"SUBMITTED",
		"APPROVED",
		"SYNCED_TO_ACCOUNTING"
	].includes(t.status)).sort((a, b) => (b.submittedAt ?? b.createdAt).localeCompare(a.submittedAt ?? a.createdAt)), [state.tasks, viewedId]);
	const related = state.expenses.filter((e) => e.relatedUserId === viewedId);
	const bonuses = related.filter((e) => e.category === "BONUS");
	const penalties = related.filter((e) => e.category === "PENALTY");
	const wageTotal = tasks.reduce((s, t) => s + (t.finalWage ?? t.wage), 0);
	const bonusTotal = bonuses.reduce((s, e) => s + e.amount, 0);
	const penaltyTotal = penalties.reduce((s, e) => s + e.amount, 0);
	const net = wageTotal + bonusTotal - penaltyTotal;
	if (!user || !can(user, "earnings")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-6" }),
		title: "دسترسی ندارید",
		description: "این بخش برای شما فعال نشده است."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: isManager ? "دستمزد و پاداش پرسنل" : "دستمزد من",
			subtitle: "گزارش فقط‌خواندنی از دستمزدها، پاداش‌ها و جریمه‌ها"
		}),
		isManager ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
				id: "worker",
				label: "انتخاب کارمند",
				value: viewedId,
				onChange: setTargetId,
				options: state.users.map((u) => ({
					value: u.id,
					label: u.fullName
				}))
			})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-5" }),
					label: "مجموع دستمزد",
					value: money(wageTotal, state.currency),
					tone: "success"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "size-5" }),
					label: "مجموع پاداش",
					value: money(bonusTotal, state.currency),
					tone: "info"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-5" }),
					label: "مجموع جریمه",
					value: money(penaltyTotal, state.currency),
					tone: "danger"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "size-5" }),
					label: "خالص قابل پرداخت",
					value: money(net, state.currency),
					tone: "primary"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mb-3 text-lg font-extrabold",
				children: ["وظایف ثبت‌شده ", viewed ? `— ${viewed.fullName}` : ""]
			}), tasks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-6" }),
				title: "هنوز دستمزدی ثبت نشده",
				description: "پس از ثبت انجام وظیفه، دستمزد آن با تاریخ و ساعت دقیق اینجا نمایش داده می‌شود."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: tasks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "app-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "min-w-0 font-extrabold",
								children: t.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								tone: t.status === "SYNCED_TO_ACCOUNTING" ? "info" : t.status === "APPROVED" ? "success" : "warning",
								children: TASK_STATUS_LABEL[t.status]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "num mt-2 text-sm font-extrabold",
							children: money(t.finalWage ?? t.wage, state.currency)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: ["ثبت انجام: ", faDateTimeLong(t.submittedAt ?? t.createdAt)]
						}),
						t.approvedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 text-xs text-muted-foreground",
							children: ["تأیید مدیر: ", faDateTimeLong(t.approvedAt)]
						}) : null,
						t.wageNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs leading-6",
							children: ["توضیح مدیر: ", t.wageNote]
						}) : null,
						t.finalWage != null && t.finalWage !== t.wage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "num mt-1 text-xs text-muted-foreground",
							children: ["دستمزد اولیه: ", money(t.wage, state.currency)]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: [
								"وضعیت حسابداری:",
								" ",
								t.accountingRef ? `ثبت‌شده (${t.accountingRef})` : t.status === "SYNCED_TO_ACCOUNTING" ? "ثبت‌شده" : "در انتظار ثبت"
							]
						})
					]
				}, t.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-lg font-extrabold",
				children: "پاداش‌ها و جریمه‌ها"
			}), related.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "size-6" }),
				title: "موردی ثبت نشده",
				description: "پاداش یا جریمه‌ای برای این کاربر ثبت نشده است."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "app-card divide-y",
				children: related.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-3 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `grid size-10 shrink-0 place-items-center rounded-full ${e.category === "PENALTY" ? "bg-destructive/12 text-destructive" : "bg-accent text-accent-foreground"}`,
							children: e.category === "PENALTY" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate font-bold",
								children: [e.category === "PENALTY" ? "جریمه" : "پاداش", e.description ? ` — ${e.description}` : ""]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: faDateTimeLong(e.date)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "num shrink-0 text-sm font-extrabold",
							children: money(e.amount, state.currency)
						})
					]
				}, e.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-6 text-center text-xs text-muted-foreground",
			children: [
				"این گزارش فقط‌خواندنی است و ",
				toFa(tasks.length + related.length),
				" رکورد را نشان می‌دهد."
			]
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EarningsPage, {}) });
//#endregion
export { SplitComponent as component };
