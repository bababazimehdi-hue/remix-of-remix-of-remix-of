import { r as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { at as FileBraces, j as Printer, kt as Calendar, lt as Download, rt as FileSpreadsheet, tt as Funnel } from "../_libs/lucide-react.mjs";
import { T as toFa, a as Chip, g as faDate, o as EmptyState, t as AppShell, u as PageHeader } from "./ui-kit-B64qXDLa.mjs";
import { T as can, Y as useStore } from "./router-DkR-Q5N6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/exports-CeJyRegX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ExportsPage() {
	const { state, user } = useStore();
	const [from, setFrom] = (0, import_react.useState)("");
	const [to, setTo] = (0, import_react.useState)("");
	const [types, setTypes] = (0, import_react.useState)({
		purchases: true,
		expenses: true,
		wages: false,
		invoices: true
	});
	const [selected, setSelected] = (0, import_react.useState)([]);
	const rows = (0, import_react.useMemo)(() => {
		const out = [];
		if (types.purchases) state.purchases.forEach((p, i) => out.push({
			id: p.id,
			recordType: "bicycle_purchase",
			typeLabel: "فروش دوچرخه",
			tone: "success",
			date: p.createdAt,
			amount: p.purchasePrice,
			ref: p.accountingRef ?? `ACC-1402-${90 + i}`
		}));
		if (types.expenses) state.expenses.forEach((e, i) => out.push({
			id: e.id,
			recordType: "expense",
			typeLabel: "هزینه قطعات",
			tone: "danger",
			date: e.date,
			amount: e.amount,
			ref: e.accountingRef ?? `ACC-1402-${80 + i}`
		}));
		if (types.wages) state.tasks.filter((t) => t.status === "APPROVED").forEach((t, i) => out.push({
			id: t.id,
			recordType: "task_wage",
			typeLabel: "دستمزد تعمیرات",
			tone: "neutral",
			date: t.createdAt,
			amount: t.finalWage ?? t.wage,
			ref: t.accountingRef ?? `ACC-1402-${70 + i}`
		}));
		if (types.invoices) state.invoices.filter((inv) => inv.status === "FINALIZED" || inv.status === "SYNCED_TO_ACCOUNTING").forEach((inv, i) => out.push({
			id: inv.id,
			recordType: "purchase_invoice_final",
			typeLabel: "فاکتور نهایی",
			tone: "success",
			date: inv.date,
			amount: inv.items.reduce((s, it) => s + (it.finalQty ?? it.probableQty) * (it.finalUnitPrice ?? it.probableUnitPrice), 0),
			ref: inv.accountingRef ?? `ACC-1402-${60 + i}`
		}));
		return out.filter((r) => from ? new Date(r.date) >= new Date(from) : true).filter((r) => to ? new Date(r.date) <= new Date(to) : true);
	}, [
		state,
		types,
		from,
		to
	]);
	if (!can(user, "exports")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "size-6" }),
		title: "دسترسی ندارید",
		description: "خروجی حسابداری فقط برای مدیر اصلی و مدیر فروشگاه در دسترس است."
	});
	const chosen = rows.filter((r) => selected.includes(r.id));
	const payload = (chosen.length ? chosen : rows).map((r) => ({
		record_type: r.recordType,
		record_id: r.id,
		jalali_date: faDate(r.date),
		iso_date: new Date(r.date).toISOString(),
		amount: r.amount,
		accounting_ref: r.ref
	}));
	function download(name, content, mime) {
		const blob = new Blob([content], { type: mime });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = name;
		a.click();
		URL.revokeObjectURL(url);
		toast.success("فایل خروجی دانلود شد");
	}
	function exportCsv() {
		const head = Object.keys(payload[0] ?? { record_type: "" }).join(",");
		const body = payload.map((r) => Object.values(r).join(",")).join("\n");
		download(`export-${faDate(/* @__PURE__ */ new Date())}.csv`, "﻿" + head + "\n" + body, "text/csv;charset=utf-8");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "خروجی‌های حسابداری",
			subtitle: "تهیه و انتقال فایل‌های گزارش مالی برای سیستم حسابداری"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "app-card mb-4 p-4 sm:p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mb-4 flex items-center gap-2 font-extrabold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-5 text-primary" }), " بازه زمانی (شمسی)"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "from",
						className: "block text-sm font-bold",
						children: "از تاریخ"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "from",
						type: "date",
						value: from,
						onChange: (e) => setFrom(e.target.value),
						className: "h-12 w-full rounded-xl border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "to",
						className: "block text-sm font-bold",
						children: "تا تاریخ"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "to",
						type: "date",
						value: to,
						onChange: (e) => setTo(e.target.value),
						className: "h-12 w-full rounded-xl border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
					})]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "app-card mb-4 p-4 sm:p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mb-4 flex items-center gap-2 font-extrabold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "size-5 text-primary" }), " نوع داده"]
			}), [
				["purchases", "خرید دوچرخه (فروش)"],
				["expenses", "هزینه‌های تعمیرگاه"],
				["wages", "وظایف و دستمزد"],
				["invoices", "فاکتورهای خرید نهایی"]
			].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-3 py-2.5 text-sm font-bold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: types[key],
					onChange: (e) => setTypes({
						...types,
						[key]: e.target.checked
					}),
					className: "size-5 accent-[var(--primary)]"
				}), label]
			}, key))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "app-card mb-4 space-y-3 p-4 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => download(`export-${faDate(/* @__PURE__ */ new Date())}.xls`, `﻿<table><tr>${Object.keys(payload[0] ?? {}).map((k) => `<th>${k}</th>`).join("")}</tr>${payload.map((r) => `<tr>${Object.values(r).map((v) => `<td>${v}</td>`).join("")}</tr>`).join("")}</table>`, "application/vnd.ms-excel"),
					className: "flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-primary font-extrabold text-primary-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-5" }), " دانلود Excel"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: exportCsv,
					className: "flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-accent font-bold text-accent-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "size-5" }), " دانلود CSV"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => download(`export-${faDate(/* @__PURE__ */ new Date())}.json`, JSON.stringify(payload, null, 2), "application/json"),
					className: "flex min-h-13 w-full items-center justify-center gap-2 rounded-xl border bg-card font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileBraces, { className: "size-5" }), " دانلود JSON"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => window.print(),
					className: "flex min-h-13 w-full items-center justify-center gap-2 rounded-xl border bg-card font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-5" }), " پرینت / PDF"]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "app-card overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-extrabold",
						children: "رکوردهای آماده انتقال"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setSelected(selected.length === rows.length ? [] : rows.map((r) => r.id)),
						className: "rounded-xl border px-3 py-2 text-xs font-bold",
						children: "علامت‌گذاری همه"
					})]
				}),
				rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "size-6" }),
						title: "رکوردی در این بازه نیست",
						description: "بازه تاریخ یا نوع داده را تغییر دهید."
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "scroll-x -mx-4 px-4 sm:mx-0 sm:px-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[520px] text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-foreground text-background",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3 text-start font-bold",
									children: "انتخاب"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3 text-start font-bold",
									children: "شناسه سند"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3 text-start font-bold",
									children: "تاریخ"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "p-3 text-start font-bold",
									children: "نوع عملیات"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y",
							children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										"aria-label": `انتخاب ${r.ref}`,
										checked: selected.includes(r.id),
										onChange: (e) => setSelected((s) => e.target.checked ? [...s, r.id] : s.filter((x) => x !== r.id)),
										className: "size-5 accent-[var(--primary)]"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "num p-3 font-bold",
									children: r.ref
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "num p-3",
									children: faDate(r.date)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
										tone: r.tone,
										children: r.typeLabel
									})
								})
							] }, r.id))
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "border-t p-4 text-xs text-muted-foreground",
					children: [
						"نمایش ",
						toFa(rows.length),
						" رکورد · ",
						toFa(selected.length),
						" مورد انتخاب شده"
					]
				})
			]
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportsPage, {}) });
//#endregion
export { SplitComponent as component };
