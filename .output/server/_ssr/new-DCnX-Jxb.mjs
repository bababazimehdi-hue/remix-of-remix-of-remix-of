import { r as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { T as toFa, t as AppShell, u as PageHeader } from "./ui-kit-B64qXDLa.mjs";
import { c as TextArea, i as FormActions, o as OptionGroup, r as Field, t as AmountField } from "./fields-ESZmE-g5.mjs";
import { J as uid, U as nowISO, Y as useStore, a as BIKE_SIZES, o as BIKE_TYPE_LABEL } from "./router-DkR-Q5N6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/new-DCnX-Jxb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewPurchase() {
	const { setState, user, notify, state } = useStore();
	const navigate = useNavigate();
	const [form, setForm] = (0, import_react.useState)({
		size: "",
		brand: "",
		color: "",
		bikeType: "SPORT",
		price: 0,
		description: ""
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [saving, setSaving] = (0, import_react.useState)(false);
	function submit(e) {
		e.preventDefault();
		const err = {};
		if (!form.size.trim()) err["size"] = "سایز دوچرخه اجباری است.";
		if (!form.brand.trim()) err["brand"] = "برند اجباری است.";
		if (!form.color.trim()) err["color"] = "رنگ اجباری است.";
		if (form.price <= 0) err["price"] = "قیمت خرید را وارد کنید.";
		setErrors(err);
		if (Object.keys(err).length || !user) return;
		setSaving(true);
		setState((s) => ({
			...s,
			purchases: [{
				id: uid("b"),
				size: form.size,
				brand: form.brand,
				color: form.color,
				bikeType: form.bikeType,
				purchasePrice: form.price,
				description: form.description,
				createdBy: user.id,
				status: "PENDING",
				createdAt: nowISO()
			}, ...s.purchases]
		}));
		notify({
			userRole: ["ADMIN", "STORE_MANAGER"],
			title: "خرید دوچرخه جدید",
			body: "خرید دوچرخه جدید ثبت شد و نیاز به بررسی دارد.",
			url: "/bicycle-purchases",
			type: "purchase",
			priority: "NORMAL"
		});
		toast.success("خرید دوچرخه ثبت شد و برای بررسی ارسال گردید.");
		navigate({ to: "/bicycle-purchases" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "ثبت خرید دوچرخه",
		subtitle: "فیلدهای ستاره‌دار اجباری هستند"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "app-card space-y-4 p-4 sm:p-6",
		noValidate: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "brand",
				label: "برند",
				required: true,
				value: form.brand,
				onChange: (v) => setForm({
					...form,
					brand: v
				}),
				error: errors["brand"],
				placeholder: "مثلاً Giant Talon 2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionGroup, {
				label: "سایز دوچرخه",
				required: true,
				value: form.size,
				onChange: (v) => setForm({
					...form,
					size: v
				}),
				error: errors["size"],
				options: BIKE_SIZES.map((s) => ({
					value: s,
					label: toFa(s)
				}))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "color",
					label: "رنگ",
					required: true,
					value: form.color,
					onChange: (v) => setForm({
						...form,
						color: v
					}),
					error: errors["color"],
					placeholder: "آبی"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-sm font-bold",
					children: "نوع دوچرخه"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-2",
					children: Object.keys(BIKE_TYPE_LABEL).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setForm({
							...form,
							bikeType: t
						}),
						"aria-pressed": form.bikeType === t,
						className: `min-h-12 rounded-xl text-sm font-bold ${form.bikeType === t ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`,
						children: BIKE_TYPE_LABEL[t]
					}, t))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmountField, {
				id: "price",
				label: "قیمت خرید",
				required: true,
				value: form.price,
				onChange: (v) => setForm({
					...form,
					price: v
				}),
				error: errors["price"],
				currency: state.currency
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
				id: "description",
				label: "توضیحات",
				value: form.description,
				onChange: (v) => setForm({
					...form,
					description: v
				}),
				placeholder: "اختیاری"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormActions, {
				saving,
				onCancel: () => navigate({ to: "/bicycle-purchases" })
			})
		]
	})] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewPurchase, {}) });
//#endregion
export { SplitComponent as component };
