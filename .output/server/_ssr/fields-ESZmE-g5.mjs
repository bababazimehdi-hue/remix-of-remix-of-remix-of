import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { C as parseAmountInput, T as toFa, x as formatAmountInput } from "./ui-kit-B64qXDLa.mjs";
import { B as jalaliMonthLength, H as jalaliToDate, V as jalaliParts, p as JALALI_MONTH_NAMES } from "./router-DkR-Q5N6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fields-ESZmE-g5.js
var import_jsx_runtime = require_jsx_runtime();
function Field({ id, label, value, onChange, error, required, placeholder, type = "text" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				htmlFor: id,
				className: "block text-sm font-bold",
				children: [
					label,
					" ",
					required ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-destructive",
						children: "*"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id,
				type,
				value,
				placeholder,
				"aria-invalid": !!error,
				onChange: (e) => onChange(e.target.value),
				className: "h-12 w-full rounded-xl border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring aria-[invalid=true]:border-destructive"
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "text-xs font-bold text-destructive",
				children: error
			}) : null
		]
	});
}
function AmountField({ id, label, value, onChange, error, required, currency = "TOMAN" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				htmlFor: id,
				className: "block text-sm font-bold",
				children: [
					label,
					" ",
					required ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-destructive",
						children: "*"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 rounded-xl border bg-card px-3 focus-within:ring-2 focus-within:ring-ring",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id,
					inputMode: "numeric",
					value: value ? formatAmountInput(String(value)) : "",
					"aria-invalid": !!error,
					onChange: (e) => onChange(parseAmountInput(e.target.value)),
					placeholder: "۰",
					className: "num h-12 w-full bg-transparent text-base font-bold outline-none"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0 text-sm text-muted-foreground",
					children: currency === "RIAL" ? "ریال" : "تومان"
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "text-xs font-bold text-destructive",
				children: error
			}) : null
		]
	});
}
function TextArea({ id, label, value, onChange, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			htmlFor: id,
			className: "block text-sm font-bold",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			id,
			rows: 3,
			value,
			placeholder,
			onChange: (e) => onChange(e.target.value),
			className: "w-full rounded-xl border bg-card p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
		})]
	});
}
function SelectField({ id, label, value, onChange, options, required }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			htmlFor: id,
			className: "block text-sm font-bold",
			children: [
				label,
				" ",
				required ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-destructive",
					children: "*"
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			id,
			value,
			onChange: (e) => onChange(e.target.value),
			className: "h-12 w-full rounded-xl border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring",
			children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: o.value,
				children: o.label
			}, o.value))
		})]
	});
}
/**
* Shamsi (Jalali) date picker. `value` stays an ISO `YYYY-MM-DD` string so the
* rest of the app keeps working, but the user only ever sees Persian dates.
*/
function DateField({ id, label, value, onChange }) {
	const base = value ? /* @__PURE__ */ new Date(`${value}T00:00:00`) : /* @__PURE__ */ new Date();
	const safe = Number.isNaN(base.getTime()) ? /* @__PURE__ */ new Date() : base;
	const parts = jalaliParts(safe);
	const jy = parts.year;
	const jm = parts.month;
	const jd = parts.day;
	const thisYear = jalaliParts(/* @__PURE__ */ new Date()).year;
	const years = Array.from({ length: 11 }, (_, i) => thisYear - 5 + i);
	function set(nextY, nextM, nextD) {
		const maxD = jalaliMonthLength(nextY, nextM);
		const d = jalaliToDate(nextY, nextM, Math.min(nextD, maxD));
		onChange(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`);
	}
	const selectCls = "h-12 w-full rounded-xl border bg-card px-2 text-sm font-bold outline-none focus:ring-2 focus:ring-ring";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				id: `${id}-label`,
				className: "block text-sm font-bold",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-2",
				role: "group",
				"aria-labelledby": `${id}-label`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						id,
						"aria-label": "روز",
						value: jd,
						onChange: (e) => set(jy, jm, Number(e.target.value)),
						className: selectCls,
						children: Array.from({ length: jalaliMonthLength(jy, jm) }, (_, i) => i + 1).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: d,
							children: toFa(d)
						}, d))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						"aria-label": "ماه",
						value: jm,
						onChange: (e) => set(jy, Number(e.target.value), jd),
						className: selectCls,
						children: JALALI_MONTH_NAMES.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: i + 1,
							children: m
						}, m))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						"aria-label": "سال",
						value: jy,
						onChange: (e) => set(Number(e.target.value), jm, jd),
						className: selectCls,
						children: years.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: y,
							children: toFa(y)
						}, y))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [
					"تاریخ انتخاب‌شده: ",
					toFa(jd),
					" ",
					JALALI_MONTH_NAMES[jm - 1],
					" ",
					toFa(jy)
				]
			})
		]
	});
}
/** Compact single-choice picker rendered as pressable chips. */
function OptionGroup({ label, value, onChange, options, required, error, columns = 4 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "block text-sm font-bold",
				children: [
					label,
					" ",
					required ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-destructive",
						children: "*"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2",
				style: { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` },
				children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onChange(o.value),
					"aria-pressed": value === o.value,
					className: `min-h-12 rounded-xl text-sm font-bold ${value === o.value ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`,
					children: o.label
				}, o.value))
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "text-xs font-bold text-destructive",
				children: error
			}) : null
		]
	});
}
function FormActions({ saving, onCancel, submitLabel = "ثبت" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex gap-3 pt-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "submit",
			disabled: saving,
			className: "h-13 min-h-13 flex-1 rounded-xl bg-primary px-5 py-3.5 text-sm font-extrabold text-primary-foreground disabled:opacity-60",
			children: saving ? "در حال ثبت..." : submitLabel
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: onCancel,
			className: "min-h-13 rounded-xl bg-secondary px-5 py-3.5 text-sm font-bold text-secondary-foreground",
			children: "انصراف"
		})]
	});
}
function InfoRow({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start justify-between gap-3 py-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "shrink-0 text-sm text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "min-w-0 text-end text-sm font-bold",
			children
		})]
	});
}
//#endregion
export { InfoRow as a, TextArea as c, FormActions as i, DateField as n, OptionGroup as o, Field as r, SelectField as s, AmountField as t };
