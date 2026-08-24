import { r as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { jt as Bike, k as Receipt, w as Search, z as Package } from "../_libs/lucide-react.mjs";
import { S as money, _ as faDateTime, a as Chip, c as FilterChips, l as ListSkeleton, o as EmptyState, t as AppShell, u as PageHeader } from "./ui-kit-B64qXDLa.mjs";
import { Y as useStore, f as INVOICE_STATUS_LABEL } from "./router-DkR-Q5N6.mjs";
import { t as RecordActions } from "./RecordActions-Bo88K8vu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/purchase-invoices-i6Q9epvB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tone = (s) => s === "FINALIZED" ? "success" : s === "PRE_INVOICE" ? "info" : s === "PURCHASED" ? "primary" : "neutral";
function InvoicesPage() {
	const { state, loading } = useStore();
	const [q, setQ] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("ALL");
	const list = state.invoices.filter((i) => filter === "ALL" || i.status === filter).filter((i) => q ? (i.invoiceNumber + i.supplier).includes(q) : true);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "خریدها و فاکتورها",
			subtitle: "مدیریت پیش‌فاکتور تا نهایی‌سازی",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/purchase-invoices/new",
				className: "rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground",
				children: "پیش‌فاکتور جدید"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center gap-2 rounded-2xl border bg-card px-4 focus-within:ring-2 focus-within:ring-ring",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "جستجو در فاکتورها، تامین‌کننده...",
				"aria-label": "جستجوی فاکتور",
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
					value: "PRE_INVOICE",
					label: "پیش‌فاکتور"
				},
				{
					value: "PURCHASED",
					label: "خرید شده"
				},
				{
					value: "FINALIZED",
					label: "نهایی شده"
				},
				{
					value: "SYNCED_TO_ACCOUNTING",
					label: "حسابداری"
				}
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, {}) : list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "size-6" }),
				title: "فاکتوری یافت نشد",
				description: "یک پیش‌فاکتور خرید جدید بسازید تا اینجا نمایش داده شود.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/purchase-invoices/new",
					className: "rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground",
					children: "ایجاد پیش‌فاکتور"
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-4 sm:grid-cols-2",
				children: list.map((inv) => {
					const total = inv.items.reduce((s, it) => s + (it.finalQty ?? it.probableQty) * (it.finalUnitPrice ?? it.probableUnitPrice), 0);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordActions, {
							kind: "invoice",
							id: inv.id,
							title: `فاکتور #${inv.invoiceNumber}`,
							status: inv.status,
							className: "absolute start-2 top-2 z-10 bg-card/80 backdrop-blur"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/purchase-invoices/$id",
							params: { id: inv.id },
							className: "app-card block border-e-4 border-e-primary p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
										tone: tone(inv.status),
										children: INVOICE_STATUS_LABEL[inv.status]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-end",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "شماره فاکتور"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "num text-lg font-extrabold",
											children: inv.invoiceNumber
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex items-center justify-end gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 text-end",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "تأمین‌کننده"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate font-bold",
											children: inv.supplier || "—"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid size-10 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground",
										children: inv.items.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bike, { className: "size-5" })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex items-end justify-between border-t pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "تاریخ ثبت"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "num text-sm font-bold",
										children: faDateTime(inv.date)
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-end",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "مبلغ کل"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "num text-lg font-extrabold text-primary",
											children: money(total, state.currency)
										})]
									})]
								})
							]
						})]
					}, inv.id);
				})
			})
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoicesPage, {}) });
//#endregion
export { SplitComponent as component };
