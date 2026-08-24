import { r as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { Pt as BadgeCheck, R as Palette, n as Wrench, w as Search } from "../_libs/lucide-react.mjs";
import { S as money, T as toFa, _ as faDateTime, a as Chip, c as FilterChips, l as ListSkeleton, o as EmptyState, t as AppShell, u as PageHeader } from "./ui-kit-B64qXDLa.mjs";
import { Y as useStore, o as BIKE_TYPE_LABEL, z as isRepairedBike } from "./router-DkR-Q5N6.mjs";
import { t as bikeWageTotal } from "./repaired-bikes-lNJenpJy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/repaired-bikes-Dg9niJgH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RepairedBikesPage() {
	const { state, user, loading } = useStore();
	const [q, setQ] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("ALL");
	const bikes = (0, import_react.useMemo)(() => state.purchases.filter(isRepairedBike), [state.purchases]);
	const list = (0, import_react.useMemo)(() => bikes.filter((b) => type === "ALL" || b.bikeType === type).filter((b) => q ? (b.brand + b.color + b.size).includes(q.trim()) : true).sort((a, b) => a.repairedAt < b.repairedAt ? 1 : -1), [
		bikes,
		type,
		q
	]);
	const totalWage = (0, import_react.useMemo)(() => bikes.reduce((s, b) => s + bikeWageTotal(state.tasks, b.id), 0), [bikes, state.tasks]);
	const totalPrice = (0, import_react.useMemo)(() => bikes.reduce((s, b) => s + b.purchasePrice, 0), [bikes]);
	if (!user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "دوچرخه‌های تعمیر شده",
			subtitle: "این دوچرخه‌ها از حساب خریدها و موجودی خارج شده‌اند"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "app-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "تعداد"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "num mt-1 text-2xl font-extrabold text-primary",
						children: toFa(bikes.length)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "app-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "مجموع قیمت خرید (منتقل‌شده)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "num mt-1 text-xl font-extrabold",
						children: money(totalPrice, state.currency)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "app-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "مجموع دستمزد تعمیرکاران"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "num mt-1 text-xl font-extrabold",
						children: money(totalWage, state.currency)
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center gap-2 rounded-2xl border bg-card px-4 focus-within:ring-2 focus-within:ring-ring",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "جستجو بر اساس برند، رنگ یا سایز...",
				"aria-label": "جستجوی دوچرخه تعمیر شده",
				className: "h-12 w-full bg-transparent text-sm outline-none"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChips, {
			value: type,
			onChange: setType,
			options: [{
				value: "ALL",
				label: "همه دسته‌ها"
			}, ...Object.keys(BIKE_TYPE_LABEL).map((t) => ({
				value: t,
				label: BIKE_TYPE_LABEL[t]
			}))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, {}) : list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "size-6" }),
				title: "هنوز دوچرخه تعمیرشده‌ای ثبت نشده",
				description: "با نهایی شدن تعمیر یا انتقال دستی از بخش دوچرخه‌ها، دوچرخه‌ها اینجا نمایش داده می‌شوند."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-3 sm:grid-cols-2",
				children: list.map((b) => {
					const wage = bikeWageTotal(state.tasks, b.id);
					const movedBy = state.users.find((u) => u.id === b.repairedBy);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "app-card overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2 bg-secondary px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
								tone: "success",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "size-3.5" }), " تعمیر شده"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs font-bold text-muted-foreground",
								children: [
									BIKE_TYPE_LABEL[b.bikeType],
									" · سایز ",
									toFa(b.size)
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-extrabold",
									children: b.brand
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 flex items-center gap-1 text-sm text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, { className: "size-4" }),
										" رنگ: ",
										b.color,
										" · انتقال:",
										" ",
										faDateTime(b.repairedAt)
									]
								}),
								movedBy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: ["منتقل‌شده توسط ", movedBy.fullName]
								}) : null,
								b.repairedNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 rounded-xl bg-accent p-2 text-xs text-accent-foreground",
									children: b.repairedNote
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 grid grid-cols-2 gap-2 border-t pt-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "قیمت خرید (منتقل‌شده)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "num font-extrabold",
										children: money(b.purchasePrice, state.currency)
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-end",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "flex items-center justify-end gap-1 text-xs text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-3.5" }), " دستمزد تعمیرکار"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "num font-extrabold text-primary",
											children: money(wage, state.currency)
										})]
									})]
								})
							]
						})]
					}, b.id);
				})
			})
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RepairedBikesPage, {}) });
//#endregion
export { SplitComponent as component };
