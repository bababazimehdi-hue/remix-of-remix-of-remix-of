import { r as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, v as useSearch } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as AppShell, u as PageHeader } from "./ui-kit-B64qXDLa.mjs";
import { c as TextArea, i as FormActions, n as DateField, r as Field, s as SelectField, t as AmountField } from "./fields-ESZmE-g5.mjs";
import { J as uid, T as can, U as nowISO, Y as useStore, u as EXPENSE_LABEL } from "./router-DkR-Q5N6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/new-CACRhMgg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewExpense() {
	const { category } = useSearch({ from: "/expenses/new" });
	const { state, setState, user, notify } = useStore();
	const navigate = useNavigate();
	const [cat, setCat] = (0, import_react.useState)(category ?? "MISCELLANEOUS");
	const [name, setName] = (0, import_react.useState)("");
	const [amount, setAmount] = (0, import_react.useState)(0);
	const [date, setDate] = (0, import_react.useState)(nowISO().slice(0, 10));
	const [description, setDescription] = (0, import_react.useState)("");
	const [relatedUserId, setRelatedUserId] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [nameError, setNameError] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const allowedCats = Object.keys(EXPENSE_LABEL).filter((c) => c !== "PERSONAL_WITHDRAWAL" || can(user, "personalWithdrawal"));
	function submit(e) {
		e.preventDefault();
		if (saving) return;
		setError("");
		setNameError("");
		if (cat === "MISCELLANEOUS" && !name.trim()) {
			setNameError("نام هزینه را وارد کنید.");
			return;
		}
		if (amount <= 0) {
			setError("مبلغ هزینه را وارد کنید.");
			return;
		}
		if (!user) return;
		setSaving(true);
		setState((s) => ({
			...s,
			expenses: [{
				id: uid("e"),
				category: cat,
				amount,
				date: (/* @__PURE__ */ new Date(`${date}T${(/* @__PURE__ */ new Date()).toTimeString().slice(0, 8)}`)).toISOString(),
				description,
				...cat === "MISCELLANEOUS" && name.trim() ? { name: name.trim() } : {},
				...relatedUserId ? { relatedUserId } : {},
				createdBy: user.id,
				status: "PENDING"
			}, ...s.expenses]
		}));
		notify({
			userRole: [
				"SALARY",
				"BONUS",
				"PENALTY"
			].includes(cat) ? ["ADMIN", "STORE_MANAGER"] : ["ADMIN"],
			title: "هزینه جدید ثبت شد",
			body: `${cat === "MISCELLANEOUS" && name.trim() ? name.trim() : EXPENSE_LABEL[cat]} به مبلغ ثبت‌شده نیاز به بررسی دارد.`,
			url: "/expenses",
			type: "expense",
			priority: "NORMAL"
		});
		toast.success("هزینه با موفقیت ثبت شد");
		navigate({
			to: "/expenses",
			search: { range: "ALL" }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "ثبت هزینه",
		subtitle: "اطلاعات هزینه را وارد کنید"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "app-card space-y-4 p-4 sm:p-6",
		noValidate: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
				id: "category",
				label: "دسته هزینه",
				required: true,
				value: cat,
				onChange: (v) => setCat(v),
				options: allowedCats.map((c) => ({
					value: c,
					label: EXPENSE_LABEL[c]
				}))
			}),
			cat === "MISCELLANEOUS" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "expense-name",
				label: "نام هزینه",
				required: true,
				value: name,
				onChange: setName,
				error: nameError || void 0,
				placeholder: "مثلاً خرید لوازم مصرفی"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmountField, {
				id: "amount",
				label: "مبلغ",
				required: true,
				value: amount,
				onChange: setAmount,
				error: error || void 0,
				currency: state.currency
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateField, {
				id: "date",
				label: "تاریخ",
				value: date,
				onChange: setDate
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
				id: "relatedUser",
				label: "کاربر مرتبط (اختیاری)",
				value: relatedUserId,
				onChange: setRelatedUserId,
				options: [{
					value: "",
					label: "بدون کاربر"
				}, ...state.users.map((u) => ({
					value: u.id,
					label: u.fullName
				}))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
				id: "description",
				label: "توضیحات",
				value: description,
				onChange: setDescription,
				placeholder: "اختیاری"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormActions, {
				saving,
				onCancel: () => navigate({
					to: "/expenses",
					search: { range: "ALL" }
				}),
				submitLabel: "ثبت هزینه"
			})
		]
	})] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewExpense, {}) });
//#endregion
export { SplitComponent as component };
