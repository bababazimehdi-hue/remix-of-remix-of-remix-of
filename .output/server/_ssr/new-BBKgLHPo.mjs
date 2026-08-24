import { r as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { N as Plus, m as Trash2 } from "../_libs/lucide-react.mjs";
import { S as money, t as AppShell, u as PageHeader } from "./ui-kit-B64qXDLa.mjs";
import { c as TextArea, i as FormActions, n as DateField, r as Field, t as AmountField } from "./fields-ESZmE-g5.mjs";
import { J as uid, U as nowISO, Y as useStore } from "./router-DkR-Q5N6.mjs";
import { t as ItemPhotoField } from "./ItemPhotoField-CJndVPk0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/new-BBKgLHPo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewInvoice() {
	const { state, setState, user, notify } = useStore();
	const navigate = useNavigate();
	const [number, setNumber] = (0, import_react.useState)(`INV-${(/* @__PURE__ */ new Date()).getFullYear()}-${Math.floor(Math.random() * 900 + 100)}`);
	const [supplier, setSupplier] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)(nowISO().slice(0, 10));
	const [notes, setNotes] = (0, import_react.useState)("");
	const [items, setItems] = (0, import_react.useState)([{
		id: uid("it"),
		productName: "",
		probableQty: 1,
		probableUnitPrice: 0
	}]);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const total = items.reduce((s, i) => s + i.probableQty * i.probableUnitPrice, 0);
	function patchItem(id, p) {
		setItems((list) => list.map((i) => i.id === id ? {
			...i,
			...p
		} : i));
	}
	function submit(e) {
		e.preventDefault();
		if (saving) return;
		if (!user) return;
		if (!number.trim() || items.some((i) => !i.productName.trim() || i.probableUnitPrice <= 0)) {
			toast.error("شماره فاکتور و اطلاعات همه آیتم‌ها را کامل کنید.");
			return;
		}
		setSaving(true);
		setState((s) => ({
			...s,
			invoices: [{
				id: uid("i"),
				invoiceNumber: number,
				supplier,
				date: new Date(date).toISOString(),
				status: "PRE_INVOICE",
				notes,
				createdBy: user.id,
				items
			}, ...s.invoices]
		}));
		notify({
			userRole: ["ADMIN", "STORE_MANAGER"],
			title: "پیش‌فاکتور خرید جدید",
			body: "پیش‌فاکتور خرید جدید ثبت شد.",
			url: "/purchase-invoices",
			type: "invoice",
			priority: "NORMAL"
		});
		toast.success("پیش‌فاکتور ثبت شد");
		navigate({ to: "/purchase-invoices" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "ایجاد پیش‌فاکتور خرید",
		subtitle: "اقلام و قیمت‌های احتمالی را وارد کنید"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "space-y-4",
		noValidate: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "app-card space-y-4 p-4 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "number",
						label: "شماره پیش‌فاکتور",
						required: true,
						value: number,
						onChange: setNumber
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "supplier",
						label: "تأمین‌کننده",
						value: supplier,
						onChange: setSupplier,
						placeholder: "اختیاری"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateField, {
						id: "date",
						label: "تاریخ",
						value: date,
						onChange: setDate
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
						id: "notes",
						label: "توضیحات",
						value: notes,
						onChange: setNotes
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "app-card space-y-4 p-4 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-extrabold",
							children: "اقلام فاکتور"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setItems((l) => [...l, {
								id: uid("it"),
								productName: "",
								probableQty: 1,
								probableUnitPrice: 0
							}]),
							className: "flex items-center gap-1 rounded-full bg-accent px-3 py-2 text-sm font-bold text-accent-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " افزودن آیتم"]
						})]
					}),
					items.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 rounded-2xl bg-secondary p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm font-bold text-muted-foreground",
									children: ["آیتم ", idx + 1]
								}), items.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "حذف آیتم",
									onClick: () => setItems((l) => l.filter((i) => i.id !== item.id)),
									className: "grid size-9 place-items-center rounded-lg text-destructive hover:bg-destructive/10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: `name-${item.id}`,
								label: "نام محصول",
								required: true,
								value: item.productName,
								onChange: (v) => patchItem(item.id, { productName: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									id: `qty-${item.id}`,
									label: "تعداد احتمالی",
									required: true,
									type: "number",
									value: String(item.probableQty),
									onChange: (v) => patchItem(item.id, { probableQty: Number(v) || 0 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmountField, {
									id: `price-${item.id}`,
									label: "قیمت واحد احتمالی",
									required: true,
									value: item.probableUnitPrice,
									onChange: (v) => patchItem(item.id, { probableUnitPrice: v }),
									currency: state.currency
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemPhotoField, {
								id: item.id,
								value: item.photo,
								onChange: (photo) => patchItem(item.id, { photo })
							})
						]
					}, item.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-t pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold",
							children: "جمع کل احتمالی"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "num text-xl font-extrabold text-primary",
							children: money(total, state.currency)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormActions, {
				saving,
				onCancel: () => navigate({ to: "/purchase-invoices" }),
				submitLabel: "ثبت پیش‌فاکتور"
			})
		]
	})] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewInvoice, {}) });
//#endregion
export { SplitComponent as component };
