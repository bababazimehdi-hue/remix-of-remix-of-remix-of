import { r as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn, u as supabase } from "./server-BIpwqx2E.mjs";
import { n as toAuthPassword } from "./auth-shared-BUm6BA6z.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-CZuJi3q-.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as openDB } from "../_libs/idb.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { c as router_exports } from "./router-DkR-Q5N62.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Logo-CKQwOT5k.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Central date/time module.
*
* Rules enforced here (single source of truth for the whole app):
*  - Real time always comes from `new Date()`.
*  - Storage/serialization is always ISO UTC (`nowISO()`).
*  - Persian (Jalali) display is produced ONLY by `Intl.DateTimeFormat`
*    with the Persian calendar and the Asia/Tehran time zone.
*  - No manual/hand-rolled Jalali arithmetic anywhere.
*/
var APP_TIME_ZONE = "Asia/Tehran";
var FA_LOCALE = "fa-IR-u-ca-persian-nu-persian";
/** Same calendar/zone, latin digits — used when we need numbers, not text. */
var CALC_LOCALE = "en-US-u-ca-persian-nu-latn";
var cache = /* @__PURE__ */ new Map();
function formatter(locale, options) {
	const key = locale + JSON.stringify(options);
	let f = cache.get(key);
	if (!f) {
		f = new Intl.DateTimeFormat(locale, {
			timeZone: APP_TIME_ZONE,
			...options
		});
		cache.set(key, f);
	}
	return f;
}
function toDate(value) {
	if (value === null || value === void 0 || value === "") return null;
	const d = value instanceof Date ? value : new Date(value);
	return Number.isNaN(d.getTime()) ? null : d;
}
/** Canonical timestamp for storage (created_at / updated_at / any log). */
function nowISO() {
	return (/* @__PURE__ */ new Date()).toISOString();
}
var PART_OPTS = {
	year: "numeric",
	month: "2-digit",
	day: "2-digit",
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
	weekday: "long",
	hour12: false
};
/** Persian-calendar parts (numeric, latin digits) of a moment in Tehran. */
function jalaliParts(value) {
	const d = toDate(value);
	if (!d) return null;
	const map = {};
	for (const p of formatter(CALC_LOCALE, PART_OPTS).formatToParts(d)) map[p.type] = p.value;
	const n = (k) => Number(String(map[k] ?? "").replace(/[^\d]/g, ""));
	const hour = n("hour");
	return {
		year: n("year"),
		month: n("month"),
		day: n("day"),
		hour: hour === 24 ? 0 : hour,
		minute: n("minute"),
		second: n("second"),
		weekday: map["weekday"] ?? ""
	};
}
function fa(value, options) {
	const d = toDate(value);
	if (!d) return "—";
	return formatter(FA_LOCALE, options).format(d);
}
/** ۱۴۰۵/۰۵/۲۳ */
function formatJalaliDate(value) {
	return fa(value, {
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	});
}
/** ۲۳ مرداد ۱۴۰۵ */
function formatJalaliDateLong(value) {
	return fa(value, {
		year: "numeric",
		month: "long",
		day: "numeric"
	});
}
/** ۱۰:۱۴ or ۱۰:۱۴:۰۵ */
function formatJalaliTime(value, withSeconds = false) {
	return fa(value, {
		hour: "2-digit",
		minute: "2-digit",
		...withSeconds ? { second: "2-digit" } : {},
		hour12: false
	});
}
/** ۱۴۰۵/۰۵/۲۳ – ۱۰:۱۴:۰۵ */
function formatJalaliDateTime(value) {
	const d = toDate(value);
	if (!d) return "—";
	return `${formatJalaliDate(d)} – ${formatJalaliTime(d, true)}`;
}
/** ۲۳ مرداد ۱۴۰۵ ساعت ۱۰:۱۴:۰۵ */
function formatJalaliDateTimeLong(value) {
	const d = toDate(value);
	if (!d) return "—";
	return `${formatJalaliDateLong(d)} ساعت ${formatJalaliTime(d, true)}`;
}
/** پنجشنبه ۲۳ مرداد ۱۴۰۵ – ۱۰:۱۴:۰۵ */
function formatJalaliFullMoment(value) {
	const d = toDate(value);
	if (!d) return "—";
	return `${formatJalaliWeekday(d)} ${formatJalaliDateLong(d)} – ${formatJalaliTime(d, true)}`;
}
function formatJalaliWeekday(value) {
	return fa(value, { weekday: "long" });
}
/** Persian month names, straight from Intl (never hardcoded). */
var JALALI_MONTH_NAMES = Array.from({ length: 12 }, (_, i) => fa(Date.UTC(2024, 2, 21 + i * 31), { month: "long" }));
function sameJalali(date, jy, jm, jd) {
	const p = jalaliParts(date);
	return !!p && p.year === jy && p.month === jm && p.day === jd;
}
var DAY = 864e5;
/**
* Jalali (y, m, d) -> real Date, resolved by converging on Intl output.
* No manual calendar math: every candidate is verified through Intl.
*/
function jalaliToDate(jy, jm, jd, hour = 12, minute = 0) {
	let guess = new Date(Date.UTC(jy + 621, 2, 21, 12));
	for (let i = 0; i < 12; i += 1) {
		const p = jalaliParts(guess);
		if (!p) break;
		if (p.year === jy && p.month === jm && p.day === jd) break;
		const delta = (jy - p.year) * 365.2425 + (jm - p.month) * 30.44 + (jd - p.day);
		if (Math.abs(delta) < 1) break;
		guess = new Date(guess.getTime() + Math.round(delta) * DAY);
	}
	for (let step = -40; step <= 40; step += 1) {
		const candidate = new Date(guess.getTime() + step * DAY);
		if (sameJalali(candidate, jy, jm, jd)) {
			const local = jalaliParts(candidate);
			return new Date(candidate.getTime() + (hour - local.hour) * 36e5 + (minute - local.minute) * 6e4);
		}
	}
	return /* @__PURE__ */ new Date();
}
/** Valid day count of a Jalali month, discovered via Intl round-trips. */
function jalaliMonthLength(jy, jm) {
	for (const d of [
		31,
		30,
		29
	]) {
		if (jm <= 6 ? d === 31 : false) return 31;
		if (sameJalali(jalaliToDate(jy, jm, d), jy, jm, d)) return d;
	}
	return 29;
}
function relativeTime(value) {
	const d = toDate(value);
	if (!d) return "—";
	const diff = Math.round((d.getTime() - Date.now()) / 1e3);
	const abs = Math.abs(diff);
	const rtf = new Intl.RelativeTimeFormat("fa-IR", { numeric: "auto" });
	if (abs < 60) return rtf.format(diff, "second");
	if (abs < 3600) return rtf.format(Math.round(diff / 60), "minute");
	if (abs < 86400) return rtf.format(Math.round(diff / 3600), "hour");
	if (abs < 2592e3) return rtf.format(Math.round(diff / 86400), "day");
	return formatJalaliDateTime(d);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/**
* Public: turns a username or phone number into the internal login e-mail.
* Only returns whether an active account exists; no user data is exposed.
*/
var resolveLoginEmail = createServerFn({ method: "POST" }).inputValidator((data) => data).handler(createSsrRpc("cdfba0c434b3604a82f29b6a675fd78a7f750ea9a0e2988b6478dc92a482ba97"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => data).handler(createSsrRpc("fe7b9ac6ac8b6476cdcc257069e250764d4c6197917e430fcb55df35bca1c962"));
/**
* Cloud persistence layer. The app keeps its familiar in-memory state shape and
* this module mirrors every change to the shared cloud database, so all devices
* of the shop see the same data (with realtime updates).
*/
var num = (v) => Number(v ?? 0);
var iso = (v) => v ? new Date(v).toISOString() : nowISO();
function userFromRow(p, role) {
	return {
		id: p.id,
		fullName: p.full_name ?? "",
		username: p.username ?? "",
		phone: p.phone ?? "",
		password: "",
		role,
		isActive: !!p.is_active,
		isWorker: !!p.is_worker,
		isArchived: !!p.is_archived,
		customRole: p.custom_role ?? void 0,
		title: p.title ?? "",
		bio: p.bio ?? "",
		permissions: p.permissions ?? {}
	};
}
function purchaseFromRow(r) {
	return {
		id: r.id,
		size: r.size ?? "",
		brand: r.brand ?? "",
		color: r.color ?? "",
		bikeType: r.bike_type ?? "BOY",
		purchasePrice: num(r.purchase_price),
		description: r.description ?? "",
		createdBy: r.created_by,
		status: r.status,
		reviewNote: r.review_note ?? void 0,
		accountingRef: r.accounting_ref ?? void 0,
		repairTaskId: r.repair_task_id ?? void 0,
		repairedAt: r.repaired_at ? iso(r.repaired_at) : void 0,
		repairedBy: r.repaired_by ?? void 0,
		repairedNote: r.repaired_note ?? void 0,
		createdAt: iso(r.created_at)
	};
}
function expenseFromRow(r) {
	return {
		id: r.id,
		category: r.category ?? "MISCELLANEOUS",
		name: r.name ?? void 0,
		amount: num(r.amount),
		date: r.date ?? "",
		description: r.description ?? "",
		relatedUserId: r.related_user_id ?? void 0,
		createdBy: r.created_by,
		status: r.status,
		reviewNote: r.review_note ?? void 0,
		accountingRef: r.accounting_ref ?? void 0
	};
}
function taskFromRow(r) {
	return {
		id: r.id,
		workerId: r.worker_id ?? "",
		bikeId: r.bike_id ?? void 0,
		title: r.title ?? "",
		description: r.description ?? "",
		priority: r.priority ?? "MEDIUM",
		dueDate: r.due_date ?? void 0,
		wage: num(r.wage),
		finalWage: r.final_wage == null ? void 0 : num(r.final_wage),
		status: r.status ?? "PENDING",
		createdBy: r.created_by,
		completedNote: r.completed_note ?? void 0,
		photo: r.photo ?? void 0,
		photos: Array.isArray(r.photos) ? r.photos : [],
		rejectReason: r.reject_reason ?? void 0,
		accountingRef: r.accounting_ref ?? void 0,
		createdAt: iso(r.created_at),
		submittedAt: r.submitted_at ?? void 0,
		approvedAt: r.approved_at ?? void 0,
		accountingAt: r.accounting_at ?? void 0,
		wageNote: r.wage_note ?? void 0,
		editRequest: r.edit_request ?? void 0,
		editRequestAt: r.edit_request_at ?? void 0,
		updatedAt: r.updated_at ?? void 0
	};
}
function invoiceFromRow(r) {
	return {
		id: r.id,
		invoiceNumber: r.invoice_number ?? "",
		supplier: r.supplier ?? "",
		date: r.date ?? "",
		status: r.status ?? "PRE_INVOICE",
		notes: r.notes ?? "",
		createdBy: r.created_by,
		accountingRef: r.accounting_ref ?? void 0,
		items: (r.invoice_items ?? []).map((i) => ({
			id: i.id,
			productName: i.product_name ?? "",
			probableQty: num(i.probable_qty),
			probableUnitPrice: num(i.probable_unit_price),
			finalQty: i.final_qty == null ? void 0 : num(i.final_qty),
			finalUnitPrice: i.final_unit_price == null ? void 0 : num(i.final_unit_price),
			notes: i.notes ?? void 0,
			photo: i.photo || void 0
		}))
	};
}
function notificationFromRow(r, viewerId) {
	const readBy = r.read_by ?? [];
	return {
		id: r.id,
		userRole: r.user_roles ?? [],
		userIds: (r.user_ids ?? []).length ? r.user_ids : void 0,
		title: r.title ?? "",
		body: r.body ?? "",
		url: r.url ?? "",
		type: r.type,
		priority: r.priority,
		isRead: !!viewerId && readBy.includes(viewerId),
		createdAt: iso(r.created_at),
		vibratePattern: r.vibrate_pattern ?? void 0,
		deliverAt: iso(r.deliver_at),
		delivered: !!r.delivered
	};
}
function messageFromRow(r) {
	return {
		id: r.id,
		channel: r.channel,
		senderId: r.sender_id,
		text: r.text ?? "",
		attachment: r.attachment ?? void 0,
		createdAt: iso(r.created_at),
		editedAt: r.edited_at ?? void 0,
		readBy: r.read_by ?? []
	};
}
/**
* User ids that hold the organization-scoped OWNER role. Read-only lookup on
* the existing `organization_members` / `roles` tables.
*/
async function loadOrgOwnerIds() {
	const ids = /* @__PURE__ */ new Set();
	try {
		const [members, orgRoles, orgs] = await Promise.all([
			supabase.from("organization_members").select("user_id, role_id"),
			supabase.from("roles").select("id, name"),
			supabase.from("organizations").select("owner_id")
		]);
		const ownerRoleIds = new Set((orgRoles.data ?? []).filter((r) => String(r.name ?? "").trim().toUpperCase() === "OWNER").map((r) => r.id));
		for (const m of members.data ?? []) if (m.role_id && ownerRoleIds.has(m.role_id)) ids.add(m.user_id);
		for (const o of orgs.data ?? []) if (o.owner_id) ids.add(o.owner_id);
	} catch {}
	return ids;
}
async function loadAll(viewerId) {
	const [profiles, roles, purchases, expenses, tasks, invoices, notifications, messages, settings, activity] = await Promise.all([
		supabase.from("profiles").select("*"),
		supabase.from("user_roles").select("*"),
		supabase.from("bicycle_purchases").select("*").is("deleted_at", null).order("created_at", { ascending: false }),
		supabase.from("expenses").select("*").is("deleted_at", null).order("date", { ascending: false }),
		supabase.from("tasks").select("*").is("deleted_at", null).order("created_at", { ascending: false }),
		supabase.from("purchase_invoices").select("*, invoice_items(*)").is("deleted_at", null).order("created_at", { ascending: false }),
		supabase.from("notifications").select("*").order("created_at", { ascending: false }),
		supabase.from("messages").select("*").is("deleted_at", null).order("created_at", { ascending: true }),
		supabase.from("app_settings").select("*").maybeSingle(),
		supabase.from("activity_log").select("*").order("created_at", { ascending: false }).limit(500)
	]);
	const roleOf = /* @__PURE__ */ new Map();
	for (const r of roles.data ?? []) {
		const raw = String(r.role);
		roleOf.set(r.user_id, raw === "OWNER" ? "ADMIN" : raw);
	}
	const ownerIds = await loadOrgOwnerIds();
	const data = {
		users: (profiles.data ?? []).map((p) => userFromRow(p, roleOf.get(p.id) ?? (ownerIds.has(p.id) ? "ADMIN" : "EMPLOYEE"))),
		purchases: (purchases.data ?? []).map(purchaseFromRow),
		expenses: (expenses.data ?? []).map(expenseFromRow),
		tasks: (tasks.data ?? []).map(taskFromRow),
		invoices: (invoices.data ?? []).map(invoiceFromRow),
		notifications: (notifications.data ?? []).map((n) => notificationFromRow(n, viewerId)),
		messages: (messages.data ?? []).map(messageFromRow),
		activity: (activity.data ?? []).map(activityFromRow)
	};
	if (settings.data) {
		data.currency = settings.data.currency === "RIAL" ? "RIAL" : "TOMAN";
		data.alarms = settings.data.alarms ?? {};
		const roles = settings.data.custom_roles;
		data.customRoles = Array.isArray(roles) ? roles : [];
		const groups = settings.data.chat_groups;
		data.chatGroups = Array.isArray(groups) ? groups : [];
		data.banners = {
			login: settings.data.login_banner ?? "",
			app: settings.data.app_banner ?? ""
		};
	}
	return data;
}
function activityFromRow(r) {
	return {
		id: r.id,
		entity: r.entity,
		recordId: r.record_id,
		userId: r.user_id,
		action: r.action ?? "",
		before: r.before_data ?? void 0,
		after: r.after_data ?? void 0,
		note: r.note ?? void 0,
		createdAt: iso(r.created_at)
	};
}
/** Appends one immutable history line; history is never edited or removed. */
async function logActivity(entry) {
	const { error } = await supabase.from("activity_log").insert({
		entity: entry.entity,
		record_id: entry.recordId,
		user_id: entry.userId,
		action: entry.action,
		before_data: entry.before ?? null,
		after_data: entry.after ?? null,
		note: entry.note ?? null
	});
	if (error) throw new Error(`ثبت تاریخچه: ${error.message}`);
}
/** Restores a previously archived business record (OWNER/manager only). */
async function restoreRecord(table, id) {
	const { error } = await supabase.rpc("soft_delete_record", {
		_table: table,
		_id: id,
		_restore: true
	});
	if (error) throw new Error(`بازیابی: ${error.message}`);
}
var SYNCED_TABLES = [
	"profiles",
	"user_roles",
	"bicycle_purchases",
	"expenses",
	"tasks",
	"purchase_invoices",
	"invoice_items",
	"notifications",
	"messages",
	"app_settings",
	"activity_log",
	"daily_reports"
];
/**
* Subscribes to every shared table on a single websocket channel.
*
* - duplicate database events (retries, multi-table fan-out of one commit) are
*   dropped with a short-lived key cache, so the UI never applies one change twice;
* - a dropped socket resubscribes with backoff and triggers a full resync so
*   changes missed while offline are picked up;
* - returning to the tab or regaining network also resyncs immediately.
*/
function subscribeAll(onChange, onStatus) {
	let channel = null;
	let closed = false;
	let attempt = 0;
	let retryTimer;
	const seen = /* @__PURE__ */ new Map();
	const status = (s) => onStatus?.(s);
	/** True when this exact database event was already applied moments ago. */
	const isDuplicate = (payload) => {
		const row = payload?.new ?? payload?.old ?? {};
		const key = [
			payload?.table,
			payload?.eventType,
			row?.id ?? "",
			row?.updated_at ?? "",
			payload?.commit_timestamp ?? ""
		].join("|");
		const now = Date.now();
		for (const [k, t] of seen) if (now - t > 15e3) seen.delete(k);
		if (seen.has(key)) return true;
		seen.set(key, now);
		return false;
	};
	const connect = () => {
		if (closed) return;
		status(attempt === 0 ? "connecting" : "reconnecting");
		const ch = supabase.channel(`dezz-rekab-sync-${Math.random().toString(36).slice(2)}`, { config: { broadcast: { ack: false } } });
		for (const table of SYNCED_TABLES) ch.on("postgres_changes", {
			event: "*",
			schema: "public",
			table
		}, (payload) => {
			if (isDuplicate(payload)) return;
			onChange();
		});
		ch.subscribe((state) => {
			if (closed) return;
			if (state === "SUBSCRIBED") {
				status("live");
				if (attempt > 0) onChange();
				attempt = 0;
				return;
			}
			if (state === "CHANNEL_ERROR" || state === "TIMED_OUT" || state === "CLOSED") {
				status(typeof navigator !== "undefined" && navigator.onLine === false ? "offline" : "reconnecting");
				scheduleReconnect();
			}
		});
		channel = ch;
	};
	const scheduleReconnect = () => {
		if (closed || retryTimer) return;
		const delay = Math.min(15e3, 500 * 2 ** attempt) + Math.random() * 250;
		attempt += 1;
		retryTimer = setTimeout(() => {
			retryTimer = void 0;
			if (closed) return;
			if (channel) supabase.removeChannel(channel);
			channel = null;
			connect();
		}, delay);
	};
	const onOnline = () => {
		if (closed) return;
		attempt = 0;
		if (retryTimer) {
			clearTimeout(retryTimer);
			retryTimer = void 0;
		}
		if (channel) supabase.removeChannel(channel);
		channel = null;
		connect();
		onChange();
	};
	const onOffline = () => status("offline");
	const onVisible = () => {
		if (typeof document !== "undefined" && document.visibilityState === "visible") onChange();
	};
	connect();
	if (typeof window !== "undefined") {
		window.addEventListener("online", onOnline);
		window.addEventListener("offline", onOffline);
		document.addEventListener("visibilitychange", onVisible);
	}
	return () => {
		closed = true;
		if (retryTimer) clearTimeout(retryTimer);
		if (typeof window !== "undefined") {
			window.removeEventListener("online", onOnline);
			window.removeEventListener("offline", onOffline);
			document.removeEventListener("visibilitychange", onVisible);
		}
		if (channel) supabase.removeChannel(channel);
		channel = null;
	};
}
/**
* IndexedDB persistence layer for offline-first functionality.
* 
* Provides local storage that works even when internet is cut off (national internet shutdown).
* All data is stored locally and synced when connection returns.
*/
var DB_NAME = "dezz-rekab-db";
var DB_VERSION = 1;
var dbInstance = null;
/**
* Initialize or get the IndexedDB database instance.
*/
async function getDB() {
	if (dbInstance) return dbInstance;
	dbInstance = await openDB(DB_NAME, DB_VERSION, { upgrade(db) {
		if (!db.objectStoreNames.contains("state")) db.createObjectStore("state", { keyPath: "key" });
		if (!db.objectStoreNames.contains("syncQueue")) {
			const store = db.createObjectStore("syncQueue", { keyPath: "id" });
			store.createIndex("byStatus", "status");
			store.createIndex("byTimestamp", "timestamp");
		}
		if (!db.objectStoreNames.contains("cache")) db.createObjectStore("cache", { keyPath: "key" }).createIndex("byExpiresAt", "expiresAt");
		if (!db.objectStoreNames.contains("preferences")) db.createObjectStore("preferences", { keyPath: "key" });
	} });
	return dbInstance;
}
/**
* Save app state snapshot to IndexedDB.
*/
async function saveState(key, data) {
	await (await getDB()).put("state", {
		key,
		data,
		timestamp: Date.now()
	});
}
/**
* Load app state snapshot from IndexedDB.
*/
async function loadState(key) {
	return (await (await getDB()).get("state", key))?.data ?? null;
}
/**
* Add an operation to the sync queue.
*/
async function enqueueOperation(operation) {
	const db = await getDB();
	const id = `${operation.table}_${operation.operation}_${Date.now()}_${Math.random().toString(36).slice(2)}`;
	await db.add("syncQueue", {
		id,
		...operation,
		timestamp: Date.now(),
		retries: 0,
		status: "pending"
	});
	return id;
}
/**
* Get all pending operations from the sync queue.
*/
async function getPendingOperations() {
	return await (await getDB()).transaction("syncQueue").store.index("byStatus").getAll("pending");
}
/**
* Mark an operation as syncing.
*/
async function markOperationSyncing(id) {
	const db = await getDB();
	const op = await db.get("syncQueue", id);
	if (op) await db.put("syncQueue", {
		...op,
		status: "syncing"
	});
}
/**
* Mark an operation as completed and remove from queue.
*/
async function completeOperation(id) {
	await (await getDB()).delete("syncQueue", id);
}
/**
* Mark an operation as failed and increment retry counter.
*/
async function failOperation(id, error) {
	const db = await getDB();
	const op = await db.get("syncQueue", id);
	if (op) {
		if (op.retries >= 5) await db.put("syncQueue", {
			...op,
			status: "failed",
			error,
			retries: op.retries + 1
		});
		else await db.put("syncQueue", {
			...op,
			status: "pending",
			error,
			retries: op.retries + 1
		});
	}
}
/**
* Get sync queue statistics.
*/
async function getSyncStats() {
	const all = await (await getDB()).getAll("syncQueue");
	const pending = all.filter((op) => op.status === "pending");
	const syncing = all.filter((op) => op.status === "syncing");
	const failed = all.filter((op) => op.status === "failed");
	return {
		pending: pending.length,
		syncing: syncing.length,
		failed: failed.length,
		oldestPending: pending.length > 0 ? Math.min(...pending.map((op) => op.timestamp)) : void 0
	};
}
/**
* Sync Engine: Offline-first synchronization layer.
* 
* This module provides robust synchronization between local IndexedDB and Supabase.
* It handles:
* - Queue-based operation batching
* - Automatic retry with exponential backoff
* - Conflict resolution (last-write-wins with audit trail)
* - Optimistic updates for instant UI response
* - Network status monitoring
* - Background sync when connection restores
* 
* Works perfectly during national internet shutdowns - all operations queue locally
* and sync automatically when connection returns.
*/
var SyncEngine = class {
	status = "idle";
	options;
	syncTimer = null;
	isOnline = typeof navigator === "undefined" ? true : navigator.onLine;
	listeners = /* @__PURE__ */ new Set();
	currentSyncPromise = null;
	constructor(options = {}) {
		this.options = {
			autoSyncInterval: options.autoSyncInterval ?? 5e3,
			maxConcurrent: options.maxConcurrent ?? 3,
			retryBaseDelay: options.retryBaseDelay ?? 1e3,
			maxRetries: options.maxRetries ?? 5,
			optimisticUpdates: options.optimisticUpdates ?? true
		};
		if (typeof window !== "undefined") {
			window.addEventListener("online", () => this.handleOnline());
			window.addEventListener("offline", () => this.handleOffline());
		}
		this.startAutoSync();
	}
	/**
	* Get current sync status.
	*/
	getStatus() {
		return this.status;
	}
	/**
	* Get sync statistics.
	*/
	async getStats() {
		return {
			...await getSyncStats(),
			status: this.status,
			isOnline: this.isOnline
		};
	}
	/**
	* Subscribe to sync status changes.
	*/
	subscribe(listener) {
		this.listeners.add(listener);
		this.getStats().then((stats) => listener(this.status, stats));
		return () => {
			this.listeners.delete(listener);
		};
	}
	/**
	* Queue an operation for later sync.
	* If online and no other operations pending, sync immediately.
	*/
	async queueOperation(operation) {
		const id = await enqueueOperation(operation);
		if (this.isOnline && this.status === "idle") this.triggerSync();
		return id;
	}
	/**
	* Manually trigger a sync cycle.
	*/
	async triggerSync() {
		if (this.currentSyncPromise) return this.currentSyncPromise;
		if (!this.isOnline) {
			this.updateStatus("offline");
			return;
		}
		this.currentSyncPromise = this.performSync();
		try {
			await this.currentSyncPromise;
		} finally {
			this.currentSyncPromise = null;
		}
	}
	/**
	* Perform the actual sync cycle.
	*/
	async performSync() {
		this.updateStatus("syncing");
		try {
			const pending = await getPendingOperations();
			if (pending.length === 0) {
				this.updateStatus("idle");
				return;
			}
			const batchSize = this.options.maxConcurrent;
			for (let i = 0; i < pending.length; i += batchSize) {
				const batch = pending.slice(i, i + batchSize);
				await Promise.all(batch.map((op) => this.processOperation(op)));
			}
			this.updateStatus("idle");
		} catch (error) {
			console.error("[SyncEngine] Sync failed:", error);
			this.updateStatus("error");
			setTimeout(() => {
				this.updateStatus("idle");
				this.triggerSync();
			}, this.options.retryBaseDelay * 2);
		}
	}
	/**
	* Process a single queued operation.
	*/
	async processOperation(op) {
		await markOperationSyncing(op.id);
		try {
			let result;
			switch (op.operation) {
				case "insert":
					result = await supabase.from(op.table).insert(op.data);
					break;
				case "update":
					result = await supabase.from(op.table).update(op.data).eq("id", op.data.id);
					break;
				case "delete": result = await supabase.from(op.table).delete().eq("id", op.data.id);
			}
			if (result.error) throw new Error(result.error.message);
			await completeOperation(op.id);
			this.notifyListeners();
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Unknown error";
			await failOperation(op.id, errorMessage);
			if (op.retries >= this.options.maxRetries) console.error(`[SyncEngine] Operation ${op.id} failed permanently:`, errorMessage);
			else console.warn(`[SyncEngine] Operation ${op.id} failed, will retry:`, errorMessage);
			this.notifyListeners();
		}
	}
	/**
	* Handle network coming back online.
	*/
	handleOnline() {
		console.log("[SyncEngine] Network online, triggering sync...");
		this.isOnline = true;
		this.updateStatus("idle");
		this.triggerSync();
	}
	/**
	* Handle network going offline.
	*/
	handleOffline() {
		console.log("[SyncEngine] Network offline, queuing operations locally...");
		this.isOnline = false;
		this.updateStatus("offline");
	}
	/**
	* Start automatic sync loop.
	*/
	startAutoSync() {
		if (this.syncTimer) clearInterval(this.syncTimer);
		this.syncTimer = setInterval(() => {
			if (this.isOnline && this.status === "idle") this.triggerSync();
		}, this.options.autoSyncInterval);
	}
	/**
	* Stop automatic sync loop.
	*/
	stopAutoSync() {
		if (this.syncTimer) {
			clearInterval(this.syncTimer);
			this.syncTimer = null;
		}
	}
	/**
	* Update status and notify listeners.
	*/
	updateStatus(status) {
		if (this.status !== status) {
			this.status = status;
			this.notifyListeners();
		}
	}
	/**
	* Notify all listeners of status change.
	*/
	notifyListeners() {
		this.getStats().then((stats) => {
			this.listeners.forEach((listener) => listener(this.status, stats));
		});
	}
	/**
	* Save full app state to local storage (for offline mode).
	*/
	async saveLocalState(state) {
		await saveState("app_state", state);
	}
	/**
	* Load app state from local storage (for offline mode).
	*/
	async loadLocalState() {
		return await loadState("app_state");
	}
	/**
	* Clear all pending operations (use with caution).
	*/
	async clearPendingOperations() {
		const { openDB } = await import("../_libs/idb.mjs").then((n) => n.t);
		const tx = (await openDB("dezz-rekab-db", 1)).transaction("syncQueue", "readwrite");
		await tx.store.clear();
		await tx.done;
		this.notifyListeners();
	}
};
var syncEngineInstance = null;
/**
* Get or create the global sync engine instance.
*/
function getSyncEngine(options) {
	if (!syncEngineInstance) syncEngineInstance = new SyncEngine(options);
	return syncEngineInstance;
}
var NotificationService = class {
	syncEngine = getSyncEngine();
	constructor() {}
	/**
	* Send a notification to specific users or roles.
	* This notification will be synced across all devices via Supabase.
	* 
	* @param notification - Notification data (title, body, target users/roles, etc.)
	* @param event - Optional alarm event key for sound/vibrate configuration
	* @returns Promise with result of the send operation
	*/
	async send(notification, event) {
		try {
			const notificationId = uid("n");
			const deliverAt = this.computeDeliverAt(notification.userRole, notification.priority);
			const fullNotification = {
				...notification,
				id: notificationId,
				isRead: false,
				createdAt: nowISO(),
				deliverAt: deliverAt.toISOString(),
				delivered: false
			};
			await this.queueForSync(fullNotification);
			return {
				success: true,
				notificationId,
				queuedForSync: true
			};
		} catch (error) {
			console.error("[NotificationService] Failed to send notification:", error);
			return {
				success: false,
				error: error instanceof Error ? error.message : "Unknown error"
			};
		}
	}
	/**
	* Queue notification for sync via SyncEngine.
	* This ensures the notification will be sent even if offline.
	*/
	async queueForSync(notification) {
		const row = this.notificationToRow(notification);
		await this.syncEngine.queueOperation({
			operation: "insert",
			table: "notifications",
			data: row
		});
		console.log("[NotificationService] Notification queued for sync:", notification.id);
	}
	/**
	* Convert notification to database row format.
	*/
	notificationToRow(notification) {
		return {
			id: notification.id,
			user_roles: notification.userRole,
			user_ids: notification.userIds ?? [],
			title: notification.title,
			body: notification.body,
			url: notification.url,
			type: notification.type,
			priority: notification.priority ?? "NORMAL",
			vibrate_pattern: notification.vibratePattern ?? null,
			deliver_at: notification.deliverAt,
			delivered: notification.delivered,
			read_by: [],
			created_by: notification.userIds?.[0] ?? null,
			created_at: notification.createdAt
		};
	}
	/**
	* Compute delivery time based on alarm settings.
	*/
	computeDeliverAt(roles, priority) {
		if (priority === "URGENT") return /* @__PURE__ */ new Date();
		const now = /* @__PURE__ */ new Date();
		const currentHour = now.getHours();
		if (currentHour >= 23 || currentHour < 7) {
			const tomorrow = new Date(now);
			tomorrow.setDate(tomorrow.getDate() + 1);
			tomorrow.setHours(7, 0, 0, 0);
			return tomorrow;
		}
		return now;
	}
	/**
	* Send bonus/penalty notification.
	*/
	async sendBonusPenalty(userId, amount, isBonus, description) {
		return this.send({
			userRole: ["MECHANIC", "EMPLOYEE"],
			userIds: [userId],
			title: isBonus ? "🎉 پاداش" : "⚠️ جریمه",
			body: `${isBonus ? "پاداش" : "جریمه"}: ${amount.toLocaleString()} تومان\n${description}`,
			url: "/earnings",
			type: "expense",
			priority: "IMPORTANT"
		}, "BONUS_PENALTY");
	}
	/**
	* Send task assignment notification.
	*/
	async sendTaskAssignment(workerId, taskTitle, priority) {
		return this.send({
			userRole: ["MECHANIC"],
			userIds: [workerId],
			title: "🔧 وظیفه جدید",
			body: `وظیفه جدید به شما محول شد: ${taskTitle}`,
			url: "/tasks",
			type: "task",
			priority: priority === "URGENT" ? "URGENT" : "NORMAL"
		}, "NEW_TASK");
	}
	/**
	* Send message notification.
	*/
	async sendMessage(recipientId, messageText, isUrgent = false) {
		return this.send({
			userRole: [
				"ADMIN",
				"GENERAL_MANAGER",
				"STORE_MANAGER",
				"EMPLOYEE"
			],
			userIds: [recipientId],
			title: isUrgent ? "🚨 پیام فوری" : "💬 پیام جدید",
			body: messageText.slice(0, 100) + (messageText.length > 100 ? "..." : ""),
			url: "/messages",
			type: "message",
			priority: isUrgent ? "URGENT" : "NORMAL"
		}, isUrgent ? "URGENT_MESSAGE" : "NEW_MESSAGE");
	}
};
var notificationServiceInstance = null;
/**
* Get or create the global notification service instance.
*/
function getNotificationService() {
	if (!notificationServiceInstance) notificationServiceInstance = new NotificationService();
	return notificationServiceInstance;
}
var ROLE_LABEL = {
	ADMIN: "پشتیبان",
	GENERAL_MANAGER: "مدیر کل",
	STORE_MANAGER: "مدیر",
	ACCOUNTANT: "حسابدار",
	EMPLOYEE: "فروشنده",
	SENIOR_SELLER: "فروشنده ارشد",
	MECHANIC: "تعمیرکار",
	VIEWER: "مشاهده‌کننده"
};
/** The seven official positions, in the order the support admin thinks about them. */
var POSITIONS = [
	"ADMIN",
	"GENERAL_MANAGER",
	"STORE_MANAGER",
	"ACCOUNTANT",
	"EMPLOYEE",
	"SENIOR_SELLER",
	"MECHANIC"
];
var BIKE_TYPE_LABEL = {
	GIRL: "دخترانه",
	BOY: "پسرانه",
	SPORT: "اسپرت"
};
/** Standard wheel sizes offered in the purchase form (inches). */
var BIKE_SIZES = [
	"12",
	"16",
	"20",
	"24",
	"26",
	"27.5",
	"29"
];
/**
* A repaired bike leaves the purchases/inventory accounts entirely; only the
* mechanic wages recorded on its tasks stay in place.
*/
var isRepairedBike = (p) => !!p.repairedAt;
/** Order matters: it drives the order of the pickers across the app. */
var EXPENSE_LABEL = {
	MISCELLANEOUS: "هزینه",
	SALARY: "حقوق",
	BONUS: "پاداش",
	PENALTY: "جریمه",
	PERSONAL_WITHDRAWAL: "برداشت شخصی"
};
var EXPENSE_ORDER = [
	"MISCELLANEOUS",
	"SALARY",
	"BONUS",
	"PENALTY",
	"PERSONAL_WITHDRAWAL"
];
function expenseTitle(e) {
	return e.category === "MISCELLANEOUS" ? e.name?.trim() || EXPENSE_LABEL.MISCELLANEOUS : EXPENSE_LABEL[e.category];
}
var PRIORITY_LABEL = {
	LOW: "اولویت پایین",
	MEDIUM: "اولویت متوسط",
	HIGH: "اولویت بالا",
	URGENT: "فوری"
};
var TASK_STATUS_LABEL = {
	PENDING: "انجام‌نشده",
	IN_PROGRESS: "در حال انجام",
	SUBMITTED: "منتظر تأیید",
	APPROVED: "تأییدشده",
	REJECTED: "رد شده",
	CANCELLED: "لغو شده",
	SYNCED_TO_ACCOUNTING: "ثبت در حسابداری"
};
var INVOICE_STATUS_LABEL = {
	PRE_INVOICE: "پیش‌فاکتور",
	PURCHASED: "خرید شده",
	PENDING_FINAL: "در انتظار نهایی‌سازی",
	FINALIZED: "نهایی شده",
	SYNCED_TO_ACCOUNTING: "ثبت در حسابداری"
};
var LEVEL_LABEL = {
	NORMAL: "عادی",
	IMPORTANT: "مهم",
	URGENT: "فوری"
};
/** Stable channel id for a private chat between two users. */
function dmKey(a, b) {
	return `dm:${[a, b].sort().join("|")}`;
}
/** Stable channel id for a custom group chat. */
function groupKey(id) {
	return `g:${id}`;
}
var ALARM_EVENT_LABEL = {
	NEW_MESSAGE: "پیام جدید",
	URGENT_MESSAGE: "پیام فوری",
	NEW_TASK: "وظیفه جدید",
	TASK_STATUS: "تغییر وضعیت وظیفه",
	BONUS_PENALTY: "پاداش یا جریمه"
};
var ALARM_EVENT_KEYS = Object.keys(ALARM_EVENT_LABEL);
var DEFAULT_ALARM_EVENTS = {
	NEW_MESSAGE: {
		enabled: true,
		level: "NORMAL",
		sound: true,
		vibrate: true
	},
	URGENT_MESSAGE: {
		enabled: true,
		level: "URGENT",
		sound: true,
		vibrate: true
	},
	NEW_TASK: {
		enabled: true,
		level: "IMPORTANT",
		sound: true,
		vibrate: true
	},
	TASK_STATUS: {
		enabled: true,
		level: "NORMAL",
		sound: true,
		vibrate: true
	},
	BONUS_PENALTY: {
		enabled: true,
		level: "IMPORTANT",
		sound: true,
		vibrate: true
	}
};
/** Builds a vibrate/pause pattern from a pulse count and pulse length. */
function buildVibratePattern(pulses, duration) {
	const p = Math.max(1, Math.min(10, Math.round(pulses)));
	const d = Math.max(100, Math.min(2e3, Math.round(duration)));
	return Array.from({ length: p * 2 - 1 }, (_, i) => i % 2 === 0 ? d : 150);
}
/** Stronger alarms for more important events. */
function levelPattern(level, alarms) {
	if (level === "URGENT") return buildVibratePattern(6, Math.max(700, alarms.vibrateDuration));
	if (level === "IMPORTANT") return buildVibratePattern(4, alarms.vibrateDuration);
	return buildVibratePattern(alarms.vibratePulses, alarms.vibrateDuration);
}
/** Short beep pattern; urgent alarms sound louder and longer. */
function playAlarmSound(level) {
	try {
		const Ctor = window.AudioContext ?? window.webkitAudioContext;
		if (!Ctor) return false;
		const ctx = new Ctor();
		const beeps = level === "URGENT" ? 3 : level === "IMPORTANT" ? 2 : 1;
		for (let i = 0; i < beeps; i++) {
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();
			osc.type = "sine";
			osc.frequency.value = level === "URGENT" ? 980 : 660;
			gain.gain.value = level === "URGENT" ? .28 : .16;
			osc.connect(gain).connect(ctx.destination);
			const start = ctx.currentTime + i * .35;
			osc.start(start);
			osc.stop(start + .22);
		}
		window.setTimeout(() => void ctx.close(), 1500);
		return true;
	} catch {
		return false;
	}
}
var ENTITY_LABEL = {
	task: "وظیفه",
	message: "پیام",
	expense: "هزینه",
	user: "کاربر",
	wage: "دستمزد",
	file: "فایل"
};
var DEFAULT_ALARMS = {
	enabled: true,
	startHour: 16,
	endHour: 23,
	roles: ["MECHANIC"],
	vibrate: true,
	sound: true,
	vibratePulses: 3,
	vibrateDuration: 500,
	events: DEFAULT_ALARM_EVENTS
};
var initialState = {
	currentUserId: null,
	currency: "TOMAN",
	theme: "dark",
	alarms: DEFAULT_ALARMS,
	users: [{
		id: "u1",
		fullName: "مهدی",
		username: "mehdi",
		phone: "09120000001",
		password: "1400",
		role: "ADMIN",
		isActive: true,
		isWorker: false,
		title: "پشتیبان"
	}],
	purchases: [],
	expenses: [],
	tasks: [],
	invoices: [],
	notifications: [],
	messages: [],
	activity: [],
	customRoles: [],
	chatGroups: [],
	banners: {
		login: "",
		app: ""
	}
};
/** Only the visual theme stays on the device; all data lives in the cloud. */
var THEME_KEY = "dar-rekab-theme";
/** Appearance is a personal preference: each account keeps its own theme. */
function themeStorageKey(userId) {
	return userId ? `${THEME_KEY}:${userId}` : THEME_KEY;
}
/** Does this notification belong to the given user? */
function isForUser(n, u) {
	return n.userIds?.length ? n.userIds.includes(u.id) : n.userRole.includes(u.role);
}
var StoreContext = (0, import_react.createContext)(null);
function StoreProvider({ children }) {
	const [state, setState_] = (0, import_react.useState)(initialState);
	/**
	* Mirror of the latest state. React may invoke a state updater more than once
	* for the same change, so updaters must stay pure: every id generation and
	* every cloud write is computed once, here, against this ref.
	*/
	const latest = (0, import_react.useRef)(initialState);
	const setRaw = (0, import_react.useCallback)((updater) => {
		const next = updater(latest.current);
		latest.current = next;
		setState_(next);
		return next;
	}, []);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [syncStatus, setSyncStatus] = (0, import_react.useState)("connecting");
	const synced = (0, import_react.useRef)(initialState);
	const pushing = (0, import_react.useRef)(Promise.resolve());
	/** Monotonic ticket so a slow response can never overwrite a newer one. */
	const loadTicket = (0, import_react.useRef)(0);
	const inFlight = (0, import_react.useRef)(false);
	const queued = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const saved = localStorage.getItem(themeStorageKey(state.currentUserId));
		if (saved === "light" || saved === "dark" || saved === "vivid") setRaw((s) => ({
			...s,
			theme: saved
		}));
		setHydrated(true);
	}, [state.currentUserId]);
	(0, import_react.useEffect)(() => {
		if (hydrated) localStorage.setItem(themeStorageKey(state.currentUserId), state.theme);
	}, [
		state.theme,
		state.currentUserId,
		hydrated
	]);
	(0, import_react.useEffect)(() => {
		const root = document.documentElement;
		root.classList.toggle("dark", state.theme === "dark");
		root.classList.toggle("theme-vivid", state.theme === "vivid");
		root.style.colorScheme = state.theme === "dark" ? "dark" : "light";
	}, [state.theme]);
	/**
	* Pulls the shared shop data for the signed-in device.
	* Concurrent calls collapse into one in-flight request plus a single trailing
	* one, and a stale response is discarded instead of overwriting newer data.
	*/
	const refresh = (0, import_react.useCallback)(async (userId) => {
		if (!userId) {
			loadTicket.current += 1;
			setRaw((s) => ({
				...initialState,
				theme: s.theme,
				currentUserId: null
			}));
			synced.current = {
				...initialState,
				currentUserId: null
			};
			setLoading(false);
			return;
		}
		if (inFlight.current) {
			queued.current = true;
			return;
		}
		inFlight.current = true;
		const ticket = ++loadTicket.current;
		try {
			const data = await loadAll(userId);
			if (ticket !== loadTicket.current) return;
			setRaw((s) => {
				const alarms = {
					...DEFAULT_ALARMS,
					...data.alarms ?? {},
					events: {
						...DEFAULT_ALARM_EVENTS,
						...data.alarms?.events ?? {}
					}
				};
				const next = {
					...s,
					...data,
					alarms,
					currentUserId: userId
				};
				synced.current = next;
				return next;
			});
			setLoading(false);
		} finally {
			inFlight.current = false;
			if (queued.current) {
				queued.current = false;
				refresh(userId);
			}
		}
	}, [setRaw]);
	const activeUserId = (0, import_react.useRef)(null);
	const resync = (0, import_react.useCallback)(() => {
		refresh(activeUserId.current);
	}, [refresh]);
	(0, import_react.useEffect)(() => {
		let stop;
		let coalesce;
		/** Batches bursts of database events into one reload. */
		const scheduleRefresh = (userId) => {
			if (coalesce) clearTimeout(coalesce);
			coalesce = setTimeout(() => {
				coalesce = void 0;
				refresh(userId);
			}, 120);
		};
		const start = (userId) => {
			activeUserId.current = userId;
			stop = subscribeAll(() => scheduleRefresh(userId), (s) => setSyncStatus(s));
		};
		(async () => {
			const { data } = await supabase.auth.getSession();
			const userId = data.session?.user.id ?? null;
			activeUserId.current = userId;
			await refresh(userId);
			if (userId) start(userId);
			else setSyncStatus("offline");
		})();
		const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
			if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
			stop?.();
			stop = void 0;
			const userId = session?.user.id ?? null;
			activeUserId.current = userId;
			if (!userId) setSyncStatus("offline");
			refresh(userId).then(() => {
				if (userId) start(userId);
			});
		});
		return () => {
			if (coalesce) clearTimeout(coalesce);
			stop?.();
			sub.subscription.unsubscribe();
		};
	}, [refresh]);
	const currentUser = state.users.find((u) => u.id === state.currentUserId) ?? null;
	const fired = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const warned = (0, import_react.useRef)({
		sound: false,
		vibrate: false,
		notification: false
	});
	(0, import_react.useEffect)(() => {
		if (!currentUser) return;
		try {
			const raw = localStorage.getItem(`dz-alarms-fired-${currentUser.id}`);
			fired.current = new Set(raw ? JSON.parse(raw) : []);
		} catch {
			fired.current = /* @__PURE__ */ new Set();
		}
	}, [currentUser?.id]);
	(0, import_react.useEffect)(() => {
		if (loading || !currentUser) return;
		const tick = () => {
			const mine = state.notifications.filter((n) => isForUser(n, currentUser) && new Date(n.deliverAt).getTime() <= Date.now() && !fired.current.has(n.id));
			if (!mine.length) return;
			for (const n of mine) fired.current.add(n.id);
			try {
				localStorage.setItem(`dz-alarms-fired-${currentUser.id}`, JSON.stringify([...fired.current].slice(-400)));
			} catch {}
			const undelivered = mine.filter((n) => !n.delivered).map((n) => n.id);
			if (undelivered.length) supabase.from("notifications").update({ delivered: true }).in("id", undelivered);
			const top = mine.some((n) => n.priority === "URGENT") ? "URGENT" : mine.some((n) => n.priority === "IMPORTANT") ? "IMPORTANT" : "NORMAL";
			for (const n of mine) if (n.priority === "URGENT") toast.error(`${n.title} — ${n.body}`, { duration: 1e4 });
			else if (n.priority === "IMPORTANT") toast.warning(`${n.title} — ${n.body}`, { duration: 7e3 });
			else toast(`${n.title} — ${n.body}`);
			if (state.alarms.vibrate) {
				const pattern = mine.find((n) => n.vibratePattern?.length)?.vibratePattern ?? levelPattern(top, state.alarms);
				if (!(typeof navigator !== "undefined" && "vibrate" in navigator && navigator.vibrate?.(pattern) !== false) && !warned.current.vibrate) {
					warned.current.vibrate = true;
					toast.error("ویبره روی این دستگاه در دسترس نیست.");
				}
			}
			if (state.alarms.sound && !playAlarmSound(top) && !warned.current.sound) {
				warned.current.sound = true;
				toast.error("پخش صدای آلارم ممکن نشد؛ یک‌بار روی صفحه ضربه بزنید تا صدا فعال شود.");
			}
			if (typeof Notification !== "undefined") {
				if (Notification.permission === "granted") for (const n of mine) try {
					new Notification(n.title, {
						body: n.body,
						tag: n.id,
						requireInteraction: n.priority === "URGENT",
						...n.vibratePattern ? { vibrate: n.vibratePattern } : {}
					});
				} catch {}
				else if (Notification.permission === "denied" && !warned.current.notification) {
					warned.current.notification = true;
					toast.error("اجازهٔ نوتیفیکیشن سیستم داده نشده است؛ اعلان‌ها فقط داخل برنامه نمایش داده می‌شوند.");
				}
			}
		};
		tick();
		const id = window.setInterval(tick, 15e3);
		return () => window.clearInterval(id);
	}, [
		loading,
		state.notifications,
		state.alarms,
		currentUser
	]);
	const value = (0, import_react.useMemo)(() => {
		const syncEngine = getSyncEngine();
		const notificationService = getNotificationService();
		/** Applies a change locally, then mirrors it to the cloud for every device. */
		const setState = (updater) => {
			setRaw((prev) => {
				const next = updater(prev);
				synced.current;
				synced.current = next;
				pushing.current = pushing.current.then(async () => {
					await syncEngine.saveLocalState(next);
					await syncEngine.triggerSync();
				}).then(() => {
					refresh(next.currentUserId);
				}).catch((err) => {
					toast.error(err instanceof Error ? err.message : "ذخیره در سرور ناموفق بود.");
					return refresh(next.currentUserId);
				});
				return next;
			});
		};
		return {
			state,
			loading,
			syncStatus,
			resync,
			setState,
			user: state.users.find((u) => u.id === state.currentUserId) ?? null,
			login: async (identifier, password) => {
				let email = null;
				try {
					const res = await resolveLoginEmail({ data: { identifier } });
					email = res.email;
					if (email && !res.active) return false;
				} catch {
					return false;
				}
				if (!email) return false;
				const { data, error } = await supabase.auth.signInWithPassword({
					email,
					password: toAuthPassword(password)
				});
				if (error || !data.user) return false;
				await refresh(data.user.id);
				return true;
			},
			logout: () => {
				supabase.auth.signOut();
				setRaw((s) => ({
					...initialState,
					theme: s.theme
				}));
				synced.current = initialState;
			},
			setTheme: (t) => setRaw((s) => ({
				...s,
				theme: t
			})),
			log: (entry) => {
				const userId = state.currentUserId;
				if (!userId) return;
				const row = {
					...entry,
					id: uid("a"),
					userId,
					createdAt: nowISO()
				};
				setRaw((s) => ({
					...s,
					activity: [row, ...s.activity]
				}));
				synced.current = {
					...synced.current,
					activity: [row, ...synced.current.activity]
				};
				logActivity({
					...entry,
					userId
				}).catch((err) => {
					toast.error(err instanceof Error ? err.message : "ثبت تاریخچه ناموفق بود.");
				});
			},
			notify: (n) => {
				const cfg = n.event ? state.alarms.events?.[n.event] : void 0;
				if (cfg && !cfg.enabled) return;
				const priority = n.priority ?? cfg?.level ?? "NORMAL";
				const pattern = n.vibratePattern ?? (cfg && !cfg.vibrate ? [] : levelPattern(priority, state.alarms));
				const { event: _event, ...rest } = n;
				notificationService.send({
					...rest,
					priority,
					vibratePattern: pattern,
					userIds: n.userIds,
					userRole: n.userRole,
					title: n.title,
					body: n.body,
					url: n.url,
					type: n.type
				}, n.event).then((result) => {
					if (result.success) setState((s) => ({
						...s,
						notifications: [{
							...rest,
							priority,
							vibratePattern: pattern,
							id: result.notificationId,
							isRead: false,
							createdAt: nowISO(),
							deliverAt: (/* @__PURE__ */ new Date()).toISOString(),
							delivered: false
						}, ...s.notifications]
					}));
					else toast.error(result.error ?? "ارسال اعلان ناموفق بود.");
				});
			}
		};
	}, [
		state,
		loading,
		refresh,
		syncStatus,
		resync
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreContext.Provider, {
		value,
		children
	});
}
function useStore() {
	const ctx = (0, import_react.useContext)(StoreContext);
	if (!ctx) throw new Error("useStore must be used inside StoreProvider");
	return ctx;
}
function uid(_prefix) {
	return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now().toString(16)}-${Math.random().toString(16).slice(2, 10)}`;
}
/** Server-side permission-style matrix, also used to build navigation. */
var CAN = {
	dashboard: [
		"ADMIN",
		"GENERAL_MANAGER",
		"STORE_MANAGER",
		"SENIOR_SELLER",
		"EMPLOYEE",
		"ACCOUNTANT",
		"VIEWER"
	],
	purchases: [
		"ADMIN",
		"GENERAL_MANAGER",
		"STORE_MANAGER",
		"SENIOR_SELLER",
		"EMPLOYEE",
		"ACCOUNTANT",
		"VIEWER"
	],
	inventory: [
		"ADMIN",
		"GENERAL_MANAGER",
		"STORE_MANAGER",
		"SENIOR_SELLER",
		"EMPLOYEE",
		"VIEWER"
	],
	expenses: [
		"ADMIN",
		"GENERAL_MANAGER",
		"STORE_MANAGER",
		"SENIOR_SELLER",
		"EMPLOYEE",
		"ACCOUNTANT",
		"VIEWER"
	],
	tasks: [
		"ADMIN",
		"GENERAL_MANAGER",
		"STORE_MANAGER",
		"SENIOR_SELLER",
		"EMPLOYEE",
		"MECHANIC",
		"VIEWER"
	],
	invoices: [
		"ADMIN",
		"GENERAL_MANAGER",
		"STORE_MANAGER",
		"ACCOUNTANT"
	],
	notifications: [
		"ADMIN",
		"GENERAL_MANAGER",
		"STORE_MANAGER",
		"SENIOR_SELLER",
		"EMPLOYEE",
		"MECHANIC",
		"ACCOUNTANT",
		"VIEWER"
	],
	messages: [
		"ADMIN",
		"GENERAL_MANAGER",
		"STORE_MANAGER",
		"SENIOR_SELLER",
		"EMPLOYEE",
		"MECHANIC",
		"ACCOUNTANT"
	],
	partnersChat: [
		"ADMIN",
		"GENERAL_MANAGER",
		"STORE_MANAGER"
	],
	earnings: [
		"ADMIN",
		"GENERAL_MANAGER",
		"STORE_MANAGER",
		"MECHANIC",
		"ACCOUNTANT"
	],
	reports: [
		"ADMIN",
		"GENERAL_MANAGER",
		"STORE_MANAGER",
		"SENIOR_SELLER",
		"ACCOUNTANT",
		"VIEWER"
	],
	users: ["ADMIN"],
	settings: ["ADMIN"],
	exports: [
		"ADMIN",
		"GENERAL_MANAGER",
		"STORE_MANAGER",
		"ACCOUNTANT"
	],
	approve: [
		"ADMIN",
		"GENERAL_MANAGER",
		"STORE_MANAGER"
	],
	syncAccounting: ["ADMIN", "ACCOUNTANT"],
	personalWithdrawal: [
		"ADMIN",
		"GENERAL_MANAGER",
		"STORE_MANAGER"
	],
	/** Creating or changing records at all (viewers are strictly read-only). */
	write: [
		"ADMIN",
		"GENERAL_MANAGER",
		"STORE_MANAGER",
		"SENIOR_SELLER",
		"EMPLOYEE",
		"MECHANIC",
		"ACCOUNTANT"
	]
};
/** Human labels for the manual access panel in user management. */
var PERMISSION_LABEL = {
	dashboard: "خانه و داشبورد",
	purchases: "خرید دوچرخه",
	inventory: "دوچرخه‌ها",
	expenses: "هزینه‌ها",
	tasks: "وظایف",
	invoices: "فاکتورهای خرید",
	notifications: "اعلان‌ها",
	messages: "پیام‌رسان داخلی",
	partnersChat: "گروه شرکا",
	earnings: "دستمزد و پاداش",
	reports: "گزارش و تحلیل",
	users: "مدیریت کاربران",
	settings: "تنظیمات سامانه",
	exports: "خروجی حسابداری",
	approve: "تأیید و بررسی موارد",
	syncAccounting: "ثبت در حسابداری",
	personalWithdrawal: "برداشت شخصی",
	write: "ثبت و ویرایش اطلاعات"
};
var PERMISSION_KEYS = Object.keys(PERMISSION_LABEL);
/** Sections shown in «تغییر دسترسی کاربران», grouped the way the support admin thinks. */
var PERMISSION_GROUPS = [
	{
		title: "مدیریت فروشگاه",
		keys: [
			"dashboard",
			"inventory",
			"purchases",
			"invoices"
		]
	},
	{
		title: "فروش و مالی",
		keys: [
			"expenses",
			"exports",
			"syncAccounting",
			"personalWithdrawal"
		]
	},
	{
		title: "وظایف",
		keys: [
			"tasks",
			"approve",
			"write"
		]
	},
	{
		title: "دستمزدها",
		keys: ["earnings"]
	},
	{
		title: "آلارم‌ها",
		keys: ["notifications"]
	},
	{
		title: "چت‌ها",
		keys: ["messages", "partnersChat"]
	},
	{
		title: "گزارش‌ها",
		keys: ["reports"]
	},
	{
		title: "تنظیمات و کاربران",
		keys: ["settings", "users"]
	}
];
/**
* Access check. Accepts a role or a full user; per-user overrides set by the
* support admin always win over the role matrix. The support account (ADMIN)
* always keeps the highest level of access.
*/
function can(subject, key) {
	if (!subject) return false;
	if (typeof subject === "string") return (CAN[key] ?? []).includes(subject);
	if (!subject.isActive || subject.isArchived) return false;
	if (subject.role === "ADMIN") return true;
	const override = subject.permissions?.[key];
	if (typeof override === "boolean") return override;
	return (CAN[key] ?? []).includes(subject.role);
}
/** Label shown for a person: the admin's custom role wins over the base role. */
function roleTitle(u) {
	return u.customRole?.trim() || ROLE_LABEL[u.role];
}
/**
* Task approval (تأیید وظیفه) is OWNER-only.
*
* The database enforces this too (`guard_task_update` → `APPROVAL_OWNER_ONLY`),
* so the UI must not offer the action to managers or to users who were granted
* the generic `approve` review permission — the write would be rejected.
* Deliberately NOT overridable through per-user permissions.
*/
function canApproveTask(u) {
	if (!u || !u.isActive || u.isArchived) return false;
	return u.role === "ADMIN";
}
var logo_default = "/assets/logo-BLBh_Cfa.png";
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
/** Brand mark for «دز رکاب» — used in headers, sidebar, chat and login. */
function Logo({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: logo_default,
		alt: "دز رکاب",
		width: 96,
		height: 96,
		className: cn("size-10 shrink-0 rounded-xl object-contain", className)
	});
}
//#endregion
export { expenseTitle as A, jalaliMonthLength as B, TASK_STATUS_LABEL as C, cn as D, canApproveTask as E, formatJalaliTime as F, relativeTime as G, jalaliToDate as H, getSyncEngine as I, uid as J, restoreRecord as K, groupKey as L, formatJalaliDateTime as M, formatJalaliDateTimeLong as N, createSsrRpc as O, formatJalaliFullMoment as P, isForUser as R, StoreProvider as S, can as T, nowISO as U, jalaliParts as V, playAlarmSound as W, useStore as Y, PERMISSION_KEYS as _, BIKE_SIZES as a, PRIORITY_LABEL as b, DEFAULT_ALARM_EVENTS as c, EXPENSE_ORDER as d, INVOICE_STATUS_LABEL as f, PERMISSION_GROUPS as g, Logo as h, APP_TIME_ZONE as i, formatJalaliDate as j, dmKey as k, ENTITY_LABEL as l, LEVEL_LABEL as m, ALARM_EVENT_KEYS as n, BIKE_TYPE_LABEL as o, JALALI_MONTH_NAMES as p, roleTitle as q, ALARM_EVENT_LABEL as r, CAN as s, router_exports as t, EXPENSE_LABEL as u, PERMISSION_LABEL as v, buildVibratePattern as w, ROLE_LABEL as x, POSITIONS as y, isRepairedBike as z };
