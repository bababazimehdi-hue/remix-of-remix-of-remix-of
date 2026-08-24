import { r as __toESM } from "./_runtime.mjs";
import { N as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, y as useParams } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { It as ArrowRight, dt as Copy, f as TrendingUp, p as TrendingDown, xt as CircleCheck, yt as CircleX } from "./_libs/lucide-react.mjs";
import { S as money, T as toFa, a as Chip, o as EmptyState, t as AppShell, u as PageHeader, v as faDateTimeLong } from "./_ssr/ui-kit-B64qXDLa.mjs";
import { a as InfoRow, r as Field, t as AmountField } from "./_ssr/fields-ESZmE-g5.mjs";
import { T as can, Y as useStore, f as INVOICE_STATUS_LABEL } from "./_ssr/router-DkR-Q5N6.mjs";
import { t as RecordActions } from "./_ssr/RecordActions-Bo88K8vu.mjs";
import { t as ItemPhotoField } from "./_ssr/ItemPhotoField-CJndVPk0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-CbW1xNN1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function InvoiceDetail() {
	const { id } = useParams({ from: "/purchase-invoices/$id" });
	const { state, setState, user, notify } = useStore();
	const navigate = useNavigate();
	const [accRef, setAccRef] = (0, import_react.useState)("");
	const inv = state.invoices.find((i) => i.id === id);
	if (!inv || !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-6" }),
		title: "فاکتور یافت نشد",
		description: "این فاکتور حذف شده یا دسترسی ندارید."
	});
	const editable = can(user, "invoices") && inv.status !== "SYNCED_TO_ACCOUNTING";
	const totalProbable = inv.items.reduce((s, i) => s + i.probableQty * i.probableUnitPrice, 0);
	const totalFinal = inv.items.reduce((s, i) => s + (i.finalQty ?? i.probableQty) * (i.finalUnitPrice ?? i.probableUnitPrice), 0);
	const diff = totalFinal - totalProbable;
	function patchItem(itemId, p) {
		setState((s) => ({
			...s,
			invoices: s.invoices.map((i) => i.id === id ? {
				...i,
				items: i.items.map((it) => it.id === itemId ? {
					...it,
					...p
				} : it)
			} : i)
		}));
	}
	function setStatus(status, accountingRef) {
		setState((s) => ({
			...s,
			invoices: s.invoices.map((i) => i.id === id ? {
				...i,
				status,
				...accountingRef ? { accountingRef } : {}
			} : i)
		}));
	}
	function copyAll() {
		inv.items.forEach((it) => patchItem(it.id, {
			finalQty: it.probableQty,
			finalUnitPrice: it.probableUnitPrice
		}));
		toast.success("مقادیر اولیه در فیلدهای نهایی کپی شد");
	}
	function finalize() {
		if (inv.items.some((i) => !i.finalUnitPrice || !i.finalQty)) {
			toast.error("برای همه آیتم‌ها تعداد و قیمت نهایی را ثبت کنید.");
			return;
		}
		setStatus("FINALIZED");
		notify({
			userRole: ["ADMIN"],
			title: "فاکتور خرید نهایی شد",
			body: "فاکتور خرید نهایی شد و باید در حسابداری ثبت شود.",
			url: "/purchase-invoices",
			type: "invoice",
			priority: "URGENT"
		});
		toast.success("فاکتور نهایی شد و به مدیر اطلاع داده شد");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => navigate({ to: "/purchase-invoices" }),
			className: "mb-3 flex items-center gap-1 text-sm font-bold text-primary",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" }), " بازگشت به فاکتورها"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: `فاکتور خرید #${inv.invoiceNumber}`,
			subtitle: INVOICE_STATUS_LABEL[inv.status],
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					tone: inv.status === "FINALIZED" ? "success" : "info",
					children: INVOICE_STATUS_LABEL[inv.status]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordActions, {
					kind: "invoice",
					id: inv.id,
					title: `فاکتور #${inv.invoiceNumber}`,
					status: inv.status,
					onDone: () => void navigate({ to: "/purchase-invoices" })
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "app-card divide-y p-4 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
					label: "تأمین‌کننده",
					children: inv.supplier || "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
					label: "تاریخ ثبت",
					children: faDateTimeLong(inv.date)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
					label: "توضیحات",
					children: inv.notes || "—"
				}),
				inv.accountingRef ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
					label: "شماره سند",
					children: inv.accountingRef
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-4 space-y-3",
			children: [editable && inv.status !== "FINALIZED" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: copyAll,
				className: "flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), " کپی از مقادیر اولیه (بدون تغییر)"]
			}) : null, inv.items.map((it) => {
				const finalTotal = (it.finalQty ?? 0) * (it.finalUnitPrice ?? 0);
				const probTotal = it.probableQty * it.probableUnitPrice;
				const d = it.finalUnitPrice ? finalTotal - probTotal : 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "app-card space-y-3 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-extrabold",
							children: it.productName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground",
								children: "تخمینی"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "num font-bold",
								children: [
									toFa(it.probableQty),
									" × ",
									money(it.probableUnitPrice, state.currency)
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground",
									children: "نهایی"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "num font-bold",
									children: it.finalQty ? `${toFa(it.finalQty)} × ${money(it.finalUnitPrice ?? 0, state.currency)}` : "ثبت نشده"
								})]
							})]
						}),
						d !== 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold ${d > 0 ? "bg-destructive/10 text-destructive" : "bg-primary-soft text-primary"}`,
							children: [d > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "num",
								children: [
									"تفاوت: ",
									d > 0 ? "+" : "−",
									money(Math.abs(d), state.currency)
								]
							})]
						}) : null,
						editable || it.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemPhotoField, {
							id: it.id,
							value: it.photo,
							disabled: !editable,
							onChange: (photo) => patchItem(it.id, { photo })
						}) : null,
						editable && inv.status !== "FINALIZED" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: `fq-${it.id}`,
								label: "تعداد نهایی",
								type: "number",
								value: String(it.finalQty ?? ""),
								onChange: (v) => patchItem(it.id, { finalQty: Number(v) || 0 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmountField, {
								id: `fp-${it.id}`,
								label: "قیمت واحد نهایی",
								value: it.finalUnitPrice ?? 0,
								onChange: (v) => patchItem(it.id, { finalUnitPrice: v }),
								currency: state.currency
							})]
						}) : null
					]
				}, it.id);
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-4 rounded-2xl bg-accent p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-lg font-extrabold",
				children: "خلاصه مالی"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "divide-y divide-border/60",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
						label: "جمع قیمت تخمینی",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "num",
							children: money(totalProbable, state.currency)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
						label: "جمع قیمت نهایی",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "num",
							children: money(totalFinal, state.currency)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
						label: "تفاوت کل",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `num ${diff > 0 ? "text-destructive" : "text-primary"}`,
							children: [diff > 0 ? "+" : diff < 0 ? "−" : "", money(Math.abs(diff), state.currency)]
						})
					})
				]
			})]
		}),
		editable && inv.status !== "FINALIZED" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: finalize,
			className: "mt-4 flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary font-extrabold text-primary-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5" }), " نهایی‌سازی فاکتور"]
		}) : null,
		can(user, "syncAccounting") && inv.status === "FINALIZED" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "app-card mt-4 space-y-3 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-bold",
					children: "ثبت در حسابداری"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: accRef,
					onChange: (e) => setAccRef(e.target.value),
					placeholder: "شماره سند حسابداری",
					"aria-label": "شماره سند حسابداری",
					className: "h-12 w-full rounded-xl border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						if (!accRef.trim()) {
							toast.error("شماره سند را وارد کنید.");
							return;
						}
						setStatus("SYNCED_TO_ACCOUNTING", accRef);
						toast.success("فاکتور به‌عنوان ثبت‌شده در حسابداری علامت‌گذاری شد");
					},
					className: "min-h-12 w-full rounded-xl bg-primary font-bold text-primary-foreground",
					children: "علامت‌گذاری به‌عنوان منتقل‌شده"
				})
			]
		}) : null
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoiceDetail, {}) });
//#endregion
export { SplitComponent as component };
