import { u as supabase } from "./server-BIpwqx2E.mjs";
import { K as restoreRecord } from "./router-DkR-Q5N6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/audit-ylIk0p1F.js
/**
* Read-only access to the immutable database audit history, plus the
* OWNER/manager controls that act on it: restoring an archived record and
* reversing a record to its previous workflow stage.
*
* History itself is never written from here: `public.audit_log` is filled by
* database triggers and blocked against UPDATE/DELETE.
*/
var TABLE_LABEL = {
	bicycle_purchases: "خرید دوچرخه",
	expenses: "هزینه‌ها",
	tasks: "وظایف",
	purchase_invoices: "فاکتورهای خرید",
	invoice_items: "اقلام فاکتور",
	daily_reports: "گزارش روزانه",
	messages: "پیام‌ها",
	profiles: "کاربران",
	user_roles: "نقش‌ها",
	organization_members: "اعضای مجموعه"
};
var OPERATION_LABEL = {
	INSERT: "ایجاد",
	UPDATE: "ویرایش",
	DELETE: "حذف"
};
/** Tables whose archived rows the manager-only routine can restore. */
var RESTORABLE_TABLES = [
	"bicycle_purchases",
	"expenses",
	"tasks",
	"purchase_invoices",
	"daily_reports",
	"messages"
];
/** Ordered workflow stages per table; reversal moves one step back. */
var WORKFLOW_STAGES = {
	bicycle_purchases: [
		"PENDING",
		"APPROVED",
		"SYNCED_TO_ACCOUNTING"
	],
	expenses: [
		"PENDING",
		"APPROVED",
		"SYNCED_TO_ACCOUNTING"
	],
	tasks: [
		"PENDING",
		"IN_PROGRESS",
		"SUBMITTED",
		"APPROVED",
		"SYNCED_TO_ACCOUNTING"
	],
	purchase_invoices: [
		"PRE_INVOICE",
		"PURCHASED",
		"PENDING_FINAL",
		"FINALIZED",
		"SYNCED_TO_ACCOUNTING"
	]
};
function previousStage(table, status) {
	const stages = WORKFLOW_STAGES[table];
	if (!stages || !status) return null;
	const index = stages.indexOf(status);
	if (index <= 0) return null;
	return stages[index - 1] ?? null;
}
function auditFromRow(r) {
	return {
		id: Number(r["id"]),
		tableName: String(r["table_name"] ?? ""),
		recordId: String(r["record_id"] ?? ""),
		operation: String(r["operation"] ?? ""),
		actorId: r["actor_id"] ?? null,
		before: r["before_data"] ?? null,
		after: r["after_data"] ?? null,
		businessDate: String(r["business_date"] ?? ""),
		createdAt: String(r["created_at"] ?? "")
	};
}
/** Latest audit lines, newest first. Managers/OWNER only (enforced by RLS). */
async function fetchAuditHistory(options) {
	let query = supabase.from("audit_log").select("*").order("created_at", { ascending: false }).limit(options?.limit ?? 200);
	if (options?.table) query = query.eq("table_name", options.table);
	if (options?.recordId) query = query.eq("record_id", options.recordId);
	const { data, error } = await query;
	if (error) throw new Error(error.message);
	return (data ?? []).map(auditFromRow);
}
var ARCHIVE_SELECT = {
	bicycle_purchases: {
		columns: "id, brand, color, status, deleted_at, deleted_by",
		title: (r) => [r["brand"], r["color"]].filter(Boolean).join(" ") || "دوچرخه"
	},
	expenses: {
		columns: "id, name, category, amount, status, deleted_at, deleted_by",
		title: (r) => String(r["name"] ?? r["category"] ?? "هزینه")
	},
	tasks: {
		columns: "id, title, status, deleted_at, deleted_by",
		title: (r) => String(r["title"] ?? "وظیفه")
	},
	purchase_invoices: {
		columns: "id, invoice_number, supplier, status, deleted_at, deleted_by",
		title: (r) => `${r["invoice_number"] ?? ""} — ${r["supplier"] ?? ""}`.trim()
	},
	daily_reports: {
		columns: "id, business_date, deleted_at, deleted_by",
		title: (r) => `گزارش ${r["business_date"] ?? ""}`
	},
	messages: {
		columns: "id, text, deleted_at, deleted_by",
		title: (r) => String(r["text"] ?? "پیام").slice(0, 60) || "پیام"
	}
};
/** Every archived (soft-deleted) business record the viewer may see. */
async function fetchArchived() {
	return (await Promise.all(RESTORABLE_TABLES.map(async (table) => {
		const spec = ARCHIVE_SELECT[table];
		const { data, error } = await supabase.from(table).select(spec.columns).not("deleted_at", "is", null).order("deleted_at", { ascending: false }).limit(100);
		if (error) return [];
		return (data ?? []).map((r) => ({
			table,
			id: String(r["id"]),
			title: spec.title(r),
			status: r["status"] ?? null,
			deletedAt: String(r["deleted_at"] ?? ""),
			deletedBy: r["deleted_by"] ?? null
		}));
	}))).flat().sort((a, b) => a.deletedAt < b.deletedAt ? 1 : -1);
}
/** Restores an archived record. Manager/OWNER only (enforced in the database). */
async function restoreArchived(table, id) {
	await restoreRecord(table, id);
}
//#endregion
export { previousStage as a, fetchAuditHistory as i, TABLE_LABEL as n, restoreArchived as o, fetchArchived as r, OPERATION_LABEL as t };
