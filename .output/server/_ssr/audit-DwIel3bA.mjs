import { r as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as History, D as RotateCcw, b as ShieldCheck, u as Undo2 } from "../_libs/lucide-react.mjs";
import { _ as faDateTime, c as FilterChips, l as ListSkeleton, o as EmptyState, s as ErrorState, t as AppShell, u as PageHeader } from "./ui-kit-B64qXDLa.mjs";
import { a as previousStage, i as fetchAuditHistory, n as TABLE_LABEL, o as restoreArchived, r as fetchArchived, t as OPERATION_LABEL } from "./audit-ylIk0p1F.mjs";
import { C as TASK_STATUS_LABEL, T as can, Y as useStore, f as INVOICE_STATUS_LABEL } from "./router-DkR-Q5N6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/audit-DwIel3bA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUS_LABEL = {
	...TASK_STATUS_LABEL,
	...INVOICE_STATUS_LABEL
};
var statusLabel = (s) => s ? STATUS_LABEL[s] ?? s : "—";
/** Field-level differences between the before/after snapshots of one change. */
function changedFields(row) {
	const before = row.before ?? {};
	const after = row.after ?? {};
	return [.../* @__PURE__ */ new Set([...Object.keys(before), ...Object.keys(after)])].filter((k) => k !== "updated_at" && JSON.stringify(before[k]) !== JSON.stringify(after[k])).slice(0, 6).map((k) => ({
		key: k,
		from: before[k],
		to: after[k]
	}));
}
var short = (v) => {
	if (v === null || v === void 0 || v === "") return "—";
	const text = typeof v === "object" ? JSON.stringify(v) : String(v);
	return text.length > 40 ? `${text.slice(0, 40)}…` : text;
};
function reversibleRecords(state) {
	const out = [];
	const push = (table, id, title, status) => {
		const target = previousStage(table, status);
		if (target) out.push({
			table,
			id,
			title,
			status,
			target
		});
	};
	for (const p of state.purchases) push("bicycle_purchases", p.id, `${p.brand} ${p.color}`.trim(), p.status);
	for (const e of state.expenses) push("expenses", e.id, e.name?.trim() || e.category, e.status);
	for (const t of state.tasks) push("tasks", t.id, t.title, t.status);
	for (const i of state.invoices) push("purchase_invoices", i.id, `${i.invoiceNumber} — ${i.supplier}`, i.status);
	return out;
}
function AuditHistory() {
	const { state, setState, user, log } = useStore();
	const [tab, setTab] = (0, import_react.useState)("history");
	const [rows, setRows] = (0, import_react.useState)(null);
	const [archived, setArchived] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const allowed = can(user, "users");
	const load = (0, import_react.useCallback)(async () => {
		setError(null);
		try {
			const [history, archive] = await Promise.all([fetchAuditHistory({ limit: 150 }), fetchArchived()]);
			setRows(history);
			setArchived(archive);
		} catch (err) {
			setError(err instanceof Error ? err.message : "دریافت تاریخچه ناموفق بود.");
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (allowed) load();
	}, [allowed, load]);
	const reversible = (0, import_react.useMemo)(() => reversibleRecords(state), [state]);
	const nameOf = (0, import_react.useCallback)((id) => id && state.users.find((u) => u.id === id)?.fullName || "کاربر نامشخص", [state.users]);
	if (!allowed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-6" }),
		title: "دسترسی ندارید",
		description: "تاریخچهٔ تغییرات و بازگردانی رکوردها فقط برای پشتیبان و مدیران باز است."
	});
	async function restore(row) {
		if (!window.confirm(`«${row.title}» از بایگانی بازگردانی شود؟`)) return;
		try {
			await restoreArchived(row.table, row.id);
			log({
				entity: "user",
				recordId: row.id,
				action: "بازیابی رکورد بایگانی‌شده",
				note: `${TABLE_LABEL[row.table] ?? row.table} — ${row.title}`
			});
			toast.success("رکورد بازیابی شد.");
			await load();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "بازیابی ناموفق بود.");
		}
	}
	function reverse(item) {
		if (!window.confirm(`«${item.title}» از «${statusLabel(item.status)}» به «${statusLabel(item.target)}» بازگردانده شود؟`)) return;
		setState((s) => {
			const apply = (list) => list.map((r) => r.id === item.id ? {
				...r,
				status: item.target
			} : r);
			if (item.table === "bicycle_purchases") return {
				...s,
				purchases: apply(s.purchases)
			};
			if (item.table === "expenses") return {
				...s,
				expenses: apply(s.expenses)
			};
			if (item.table === "tasks") return {
				...s,
				tasks: apply(s.tasks)
			};
			return {
				...s,
				invoices: apply(s.invoices)
			};
		});
		log({
			entity: "user",
			recordId: item.id,
			action: "بازگردانی وضعیت به مرحلهٔ قبل",
			note: `${TABLE_LABEL[item.table] ?? item.table} — ${item.title}: ${statusLabel(item.status)} ← ${statusLabel(item.target)}`
		});
		toast.success("وضعیت به مرحلهٔ قبل بازگشت.");
		load();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChips, {
			value: tab,
			onChange: setTab,
			options: [
				{
					value: "history",
					label: "تاریخچهٔ تغییرات"
				},
				{
					value: "archive",
					label: "بایگانی و بازیابی"
				},
				{
					value: "reverse",
					label: "بازگردانی مرحله"
				}
			]
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
			message: error,
			onRetry: () => void load()
		}) : null,
		tab === "history" ? rows === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { rows: 4 }) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-6" }),
			title: "تاریخچه‌ای ثبت نشده",
			description: "هر ایجاد، ویرایش، تأیید یا بایگانی از این پس اینجا ثبت می‌شود."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "app-card mt-3 divide-y",
			children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-extrabold",
						children: [
							TABLE_LABEL[r.tableName] ?? r.tableName,
							" — ",
							OPERATION_LABEL[r.operation] ?? r.operation
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: [
							nameOf(r.actorId),
							" · ",
							faDateTime(r.createdAt)
						]
					}),
					changedFields(r).length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-1",
						children: changedFields(r).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold",
									children: c.key
								}),
								": ",
								short(c.from),
								" ← ",
								short(c.to)
							]
						}, c.key))
					}) : null
				]
			}, r.id))
		}) : null,
		tab === "archive" ? archived === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { rows: 3 }) : archived.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-6" }),
			title: "بایگانی خالی است",
			description: "رکوردهای حذف‌شده بایگانی می‌شوند و هرگز برای همیشه پاک نمی‌شوند."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "app-card mt-3 divide-y",
			children: archived.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-3 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block truncate font-extrabold",
						children: row.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "block truncate text-xs text-muted-foreground",
						children: [
							TABLE_LABEL[row.table] ?? row.table,
							" · ",
							nameOf(row.deletedBy),
							" ·",
							" ",
							faDateTime(row.deletedAt)
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => void restore(row),
					className: "flex shrink-0 items-center gap-1 rounded-full bg-primary px-3 py-2 text-xs font-bold text-primary-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), " بازیابی"]
				})]
			}, `${row.table}-${row.id}`))
		}) : null,
		tab === "reverse" ? reversible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, { className: "size-6" }),
			title: "رکورد قابل بازگردانی نیست",
			description: "فقط رکوردهایی که از مرحلهٔ اول عبور کرده‌اند قابل بازگردانی هستند."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "app-card mt-3 divide-y",
			children: reversible.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-3 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block truncate font-extrabold",
						children: item.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "block truncate text-xs text-muted-foreground",
						children: [
							TABLE_LABEL[item.table] ?? item.table,
							" · ",
							statusLabel(item.status),
							" ←",
							" ",
							statusLabel(item.target)
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => reverse(item),
					className: "flex shrink-0 items-center gap-1 rounded-full border px-3 py-2 text-xs font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, { className: "size-4" }), " مرحلهٔ قبل"]
				})]
			}, `${item.table}-${item.id}`))
		}) : null
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
	title: "تاریخچه و بازگردانی",
	subtitle: "سابقهٔ تغییرناپذیر تغییرات، بازیابی رکوردهای بایگانی‌شده و بازگردانی وضعیت"
}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuditHistory, {})] });
//#endregion
export { SplitComponent as component };
