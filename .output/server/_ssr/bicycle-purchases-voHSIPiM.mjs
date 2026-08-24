import { r as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Ruler, ht as Clock, kt as Calendar, w as Search, xt as CircleCheck, y as ShoppingCart, yt as CircleX } from "../_libs/lucide-react.mjs";
import { S as money, _ as faDateTime, a as Chip, c as FilterChips, l as ListSkeleton, o as EmptyState, t as AppShell, u as PageHeader } from "./ui-kit-B64qXDLa.mjs";
import { Y as useStore, o as BIKE_TYPE_LABEL, z as isRepairedBike } from "./router-DkR-Q5N6.mjs";
import { t as RecordActions } from "./RecordActions-Bo88K8vu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bicycle-purchases-voHSIPiM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUS_META = {
	APPROVED: {
		label: "تایید شده",
		tone: "success"
	},
	PENDING: {
		label: "در انتظار تایید",
		tone: "warning"
	},
	REJECTED: {
		label: "رد شده",
		tone: "danger"
	},
	SYNCED_TO_ACCOUNTING: {
		label: "همگام‌سازی شده",
		tone: "info"
	}
};
function PurchasesPage() {
	const { state, user, loading } = useStore();
	const [q, setQ] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("ALL");
	const list = (0, import_react.useMemo)(() => {
		if (!user) return [];
		const isManager = user.role === "ADMIN" || user.role === "STORE_MANAGER";
		return state.purchases.filter((p) => !isRepairedBike(p)).filter((p) => isManager || p.createdBy === user.id).filter((p) => filter === "ALL" || p.status === filter).filter((p) => q ? (p.brand + p.color + p.size).includes(q) : true);
	}, [
		state.purchases,
		user,
		filter,
		q
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "لیست خریدهای دوچرخه",
			subtitle: "ثبت، بررسی و تأیید خریدها"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center gap-2 rounded-2xl border bg-card px-4 focus-within:ring-2 focus-within:ring-ring",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "جستجو بر اساس برند یا کد...",
				"aria-label": "جستجوی خرید دوچرخه",
				className: "h-12 w-full bg-transparent text-sm outline-none"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChips, {
			value: filter,
			onChange: setFilter,
			options: [
				{
					value: "ALL",
					label: "همه"
				},
				{
					value: "PENDING",
					label: "در انتظار تایید"
				},
				{
					value: "APPROVED",
					label: "تایید شده"
				},
				{
					value: "SYNCED_TO_ACCOUNTING",
					label: "همگام‌ساز"
				}
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, {}) : list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "size-6" }),
				title: "خریدی یافت نشد",
				description: "با دکمه + یک خرید دوچرخه جدید ثبت کنید یا فیلترها را تغییر دهید.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/bicycle-purchases/new",
					className: "rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground",
					children: "ثبت خرید جدید"
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-4 sm:grid-cols-2",
				children: list.map((p) => {
					const meta = STATUS_META[p.status];
					const Icon = p.status === "APPROVED" ? CircleCheck : p.status === "PENDING" ? Clock : p.status === "REJECTED" ? CircleX : CircleCheck;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordActions, {
							kind: "purchase",
							id: p.id,
							title: p.brand,
							status: p.status,
							className: "absolute start-2 top-2 z-10 bg-card/80 backdrop-blur"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/bicycle-purchases/$id",
							params: { id: p.id },
							className: "app-card block overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2 bg-secondary px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
									tone: meta.tone,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }),
										" ",
										meta.label
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-muted-foreground",
									children: BIKE_TYPE_LABEL[p.bikeType]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-lg font-extrabold",
										children: p.brand
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 flex items-center gap-1 text-sm text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ruler, { className: "size-4" }),
											" سایز: ",
											p.size,
											" · رنگ: ",
											p.color
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 flex items-end justify-between gap-3 border-t pt-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1 rounded-lg bg-accent px-2 py-1 text-xs font-bold text-accent-foreground",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-3.5" }),
												" ",
												faDateTime(p.createdAt)
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-end",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: "قیمت خرید"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "num text-lg font-extrabold",
												children: money(p.purchasePrice, state.currency)
											})]
										})]
									})
								]
							})]
						})]
					}, p.id);
				})
			})
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PurchasesPage, {}) });
//#endregion
export { SplitComponent as component };
