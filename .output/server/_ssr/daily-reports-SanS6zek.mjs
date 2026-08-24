import { r as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { u as supabase } from "./server-BIpwqx2E.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { At as CalendarDays, Ct as ChevronRight, H as Minus, et as Gift, gt as ClipboardList, i as Wallet, wt as ChevronLeft } from "../_libs/lucide-react.mjs";
import { S as money, T as toFa, a as Chip, h as StatCard, o as EmptyState, t as AppShell, u as PageHeader } from "./ui-kit-B64qXDLa.mjs";
import { c as TextArea, t as AmountField } from "./fields-ESZmE-g5.mjs";
import { B as jalaliMonthLength, D as cn, H as jalaliToDate, T as can, V as jalaliParts, Y as useStore, i as APP_TIME_ZONE, p as JALALI_MONTH_NAMES, q as roleTitle } from "./router-DkR-Q5N6.mjs";
import { t as RecordActions } from "./RecordActions-Bo88K8vu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/daily-reports-SanS6zek.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Business-day helpers for the daily employee report module.
*
* The business timezone is Asia/Tehran and a new business day starts at
* 00:00 Tehran time. Every day is identified by its Jalali (Persian) date,
* serialized as `YYYY-MM-DD` (latin digits) so it can be stored, sorted and
* compared as a plain string once a backend is added.
*/
var DAY_MS = 864e5;
function pad(n) {
	return String(n).padStart(2, "0");
}
function makeBusinessDay(jy, jm, jd) {
	const day = Math.min(Math.max(jd, 1), jalaliMonthLength(jy, jm));
	return {
		jy,
		jm,
		jd: day,
		key: `${jy}-${pad(jm)}-${pad(day)}`
	};
}
/** The business day a real moment belongs to (Tehran, day starts at 00:00). */
function businessDayOf(value = /* @__PURE__ */ new Date()) {
	const p = jalaliParts(value);
	if (!p) return todayBusinessDay();
	return makeBusinessDay(p.year, p.month, p.day);
}
function todayBusinessDay() {
	const p = jalaliParts(/* @__PURE__ */ new Date());
	return makeBusinessDay(p.year, p.month, p.day);
}
function parseBusinessDayKey(key) {
	const [y, m, d] = key.split("-").map((n) => Number(n));
	if (!y || !m || !d) return todayBusinessDay();
	return makeBusinessDay(y, m, d);
}
/** Real moment (noon Tehran) that sits inside a business day — used for math. */
function businessDayAnchor(day) {
	return jalaliToDate(day.jy, day.jm, day.jd, 12, 0);
}
/** Move a business day forward/backward by whole days. */
function shiftBusinessDay(day, delta) {
	return businessDayOf(new Date(businessDayAnchor(day).getTime() + delta * DAY_MS));
}
function compareBusinessDays(a, b) {
	return a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
}
function isSameBusinessDay(a, b) {
	return a.key === b.key;
}
function isFutureBusinessDay(day) {
	return compareBusinessDays(day, todayBusinessDay()) > 0;
}
/** Inclusive list of business days between two days (auto-ordered, capped). */
function listBusinessDays(from, to, maxDays = 400) {
	const [start, end] = compareBusinessDays(from, to) <= 0 ? [from, to] : [to, from];
	const out = [];
	let cursor = start;
	for (let i = 0; i < maxDays; i += 1) {
		out.push(cursor);
		if (isSameBusinessDay(cursor, end)) break;
		cursor = shiftBusinessDay(cursor, 1);
	}
	return out;
}
/** The last `count` business days, ending with `end` (oldest first). */
function lastBusinessDays(count, end = todayBusinessDay()) {
	return listBusinessDays(shiftBusinessDay(end, -(count - 1)), end);
}
/** ۲۳ مرداد ۱۴۰۵ */
function formatBusinessDay(day) {
	return `${faNum(day.jd)} ${JALALI_MONTH_NAMES[day.jm - 1]} ${faNum(day.jy)}`;
}
/** ۱۴۰۵/۰۵/۲۳ */
function formatBusinessDayShort(day) {
	return faNum(`${day.jy}/${pad(day.jm)}/${pad(day.jd)}`);
}
function businessDayWeekday(day) {
	return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
		timeZone: APP_TIME_ZONE,
		weekday: "long"
	}).format(businessDayAnchor(day));
}
var FA_DIGITS = [
	"۰",
	"۱",
	"۲",
	"۳",
	"۴",
	"۵",
	"۶",
	"۷",
	"۸",
	"۹"
];
function faNum(value) {
	return String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);
}
var selectCls = "h-12 w-full rounded-xl border bg-card px-2 text-sm font-bold outline-none focus:ring-2 focus:ring-ring";
/** Jalali day / month / year picker working directly on business days. */
function BusinessDayPicker({ id, label, value, onChange }) {
	const thisYear = todayBusinessDay().jy;
	const years = Array.from({ length: 11 }, (_, i) => thisYear - 5 + i);
	const set = (jy, jm, jd) => onChange(makeBusinessDay(jy, jm, jd));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			id: `${id}-label`,
			className: "block text-sm font-bold",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-3 gap-2",
			role: "group",
			"aria-labelledby": `${id}-label`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					id,
					"aria-label": "روز",
					value: value.jd,
					onChange: (e) => set(value.jy, value.jm, Number(e.target.value)),
					className: selectCls,
					children: Array.from({ length: jalaliMonthLength(value.jy, value.jm) }, (_, i) => i + 1).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: d,
						children: toFa(d)
					}, d))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					"aria-label": "ماه",
					value: value.jm,
					onChange: (e) => set(value.jy, Number(e.target.value), value.jd),
					className: selectCls,
					children: JALALI_MONTH_NAMES.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: i + 1,
						children: m
					}, m))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					"aria-label": "سال",
					value: value.jy,
					onChange: (e) => set(Number(e.target.value), value.jm, value.jd),
					className: selectCls,
					children: years.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: y,
						children: toFa(y)
					}, y))
				})
			]
		})]
	});
}
/**
* Cloud-backed implementation of `DailyReportService`.
*
* Records live in `public.daily_reports`, one row per subject per Tehran
* business day. Reads exclude archived rows, removal is a soft delete through
* the manager-only `soft_delete_record` routine, and every change is captured
* by the database audit trigger.
*/
var amount = (value) => {
	const n = Number(value ?? 0);
	return Number.isFinite(n) && n > 0 ? Math.round(n) : 0;
};
function fromRow(r) {
	return {
		id: r.id,
		...r.organization_id ? { organizationId: r.organization_id } : {},
		subjectId: r.subject_id,
		date: r.business_date,
		salary: amount(r.salary),
		bonus: amount(r.bonus),
		penalty: amount(r.penalty),
		performance: r.performance ?? null,
		notes: r.notes ?? "",
		createdBy: r.created_by,
		createdAt: r.created_at,
		updatedAt: r.updated_at
	};
}
var listeners = /* @__PURE__ */ new Set();
var channel = null;
function emit() {
	for (const l of listeners) l();
}
function ensureChannel() {
	if (channel) return;
	channel = supabase.channel("daily-reports-sync").on("postgres_changes", {
		event: "*",
		schema: "public",
		table: "daily_reports"
	}, () => emit());
	channel.subscribe();
}
var cloudDailyReportService = {
	async getDay(subjectId, date) {
		const { data, error } = await supabase.from("daily_reports").select("*").eq("subject_id", subjectId).eq("business_date", date).is("deleted_at", null).maybeSingle();
		if (error) throw new Error(`گزارش روزانه: ${error.message}`);
		return data ? fromRow(data) : null;
	},
	async listRange({ subjectId, from, to }) {
		const { data, error } = await supabase.from("daily_reports").select("*").eq("subject_id", subjectId).gte("business_date", from).lte("business_date", to).is("deleted_at", null).order("business_date", { ascending: true });
		if (error) throw new Error(`گزارش روزانه: ${error.message}`);
		return (data ?? []).map(fromRow);
	},
	async saveDay(input, actorId) {
		const existing = await this.getDay(input.subjectId, input.date);
		const payload = {
			subject_id: input.subjectId,
			business_date: input.date,
			salary: amount(input.salary),
			bonus: amount(input.bonus),
			penalty: amount(input.penalty),
			performance: input.performance,
			notes: input.notes.trim(),
			created_by: existing?.createdBy ?? actorId
		};
		const { data, error } = await (existing ? supabase.from("daily_reports").update(payload).eq("id", existing.id) : supabase.from("daily_reports").insert(payload)).select("*").single();
		if (error) throw new Error(`ثبت گزارش روزانه: ${error.message}`);
		emit();
		return fromRow(data);
	},
	async removeDay(subjectId, date) {
		const existing = await this.getDay(subjectId, date);
		if (!existing) return;
		const { error } = await supabase.rpc("soft_delete_record", {
			_table: "daily_reports",
			_id: existing.id,
			_restore: false
		});
		if (error) throw new Error(`بایگانی گزارش روزانه: ${error.message}`);
		emit();
	},
	subscribe(listener) {
		ensureChannel();
		listeners.add(listener);
		return () => {
			listeners.delete(listener);
		};
	}
};
var PERFORMANCE_LABEL = {
	VERY_GOOD: "خیلی خوب",
	GOOD: "خوب",
	BAD: "بد",
	VERY_BAD: "خیلی بد"
};
var PERFORMANCE_ORDER = [
	"VERY_GOOD",
	"GOOD",
	"BAD",
	"VERY_BAD"
];
/** Numeric weight used only for averages/summaries, never for money. */
var PERFORMANCE_SCORE = {
	VERY_GOOD: 4,
	GOOD: 3,
	BAD: 2,
	VERY_BAD: 1
};
/** Shown wherever a day has no record at all. */
var NO_RECORD_LABEL = "بدون رکورد";
/**
* Daily report service — cloud-backed implementation.
*
* Records are persisted in `public.daily_reports` (organization-scoped, RLS
* enforced, audited). The UI only ever talks to the `DailyReportService`
* contract, so the backing store can be swapped without touching screens.
*/
/** Active implementation: persisted in the shared cloud database. */
var dailyReportService = cloudDailyReportService;
/** Builds the day-by-day slots of a range; missing days keep a null report. */
function buildSlots(from, to, reports) {
	const byDate = new Map(reports.map((r) => [r.date, r]));
	return listBusinessDays(parseBusinessDayKey(from), parseBusinessDayKey(to)).map((d) => ({
		date: d.key,
		report: byDate.get(d.key) ?? null
	}));
}
/** Range totals. Missing days never contribute zeros to the averages. */
function summarize(from, to, reports) {
	const slots = buildSlots(from, to, reports);
	const recorded = slots.filter((s) => s.report).map((s) => s.report);
	const performanceCounts = Object.fromEntries(PERFORMANCE_ORDER.map((p) => [p, 0]));
	let scoreSum = 0;
	let scored = 0;
	for (const r of recorded) if (r.performance) {
		performanceCounts[r.performance] += 1;
		scoreSum += PERFORMANCE_SCORE[r.performance];
		scored += 1;
	}
	const totalSalary = recorded.reduce((s, r) => s + r.salary, 0);
	const totalBonus = recorded.reduce((s, r) => s + r.bonus, 0);
	const totalPenalty = recorded.reduce((s, r) => s + r.penalty, 0);
	return {
		from,
		to,
		days: slots.length,
		recordedDays: recorded.length,
		missingDays: slots.length - recorded.length,
		totalSalary,
		totalBonus,
		totalPenalty,
		netTotal: totalSalary + totalBonus - totalPenalty,
		performanceCounts,
		averagePerformanceScore: scored ? scoreSum / scored : null
	};
}
/** Nearest rating label for an average score (used in historical summaries). */
function scoreToRating(score) {
	if (score === null) return null;
	let best = PERFORMANCE_ORDER[0];
	let bestDiff = Infinity;
	for (const p of PERFORMANCE_ORDER) {
		const diff = Math.abs(PERFORMANCE_SCORE[p] - score);
		if (diff < bestDiff) {
			bestDiff = diff;
			best = p;
		}
	}
	return best;
}
var performanceTone = {
	VERY_GOOD: "success",
	GOOD: "info",
	BAD: "warning",
	VERY_BAD: "danger"
};
function DailyReportsPage() {
	const { state, user } = useStore();
	const currency = state.currency;
	const subjects = (0, import_react.useMemo)(() => state.users.filter((u) => !u.isArchived).filter((u) => u.isWorker || u.role === "EMPLOYEE" || u.role === "MECHANIC").map((u) => ({
		id: u.id,
		fullName: u.fullName,
		roleTitle: roleTitle(u)
	})), [state.users]);
	const canSeeEveryone = can(user, "reports") || can(user, "approve");
	const visibleSubjects = (0, import_react.useMemo)(() => canSeeEveryone ? subjects : subjects.filter((s) => s.id === user?.id), [
		canSeeEveryone,
		subjects,
		user?.id
	]);
	const canEdit = can(user, "approve") && can(user, "write");
	const [subjectId, setSubjectId] = (0, import_react.useState)("");
	const [day, setDay] = (0, import_react.useState)(() => todayBusinessDay());
	const [rangeFrom, setRangeFrom] = (0, import_react.useState)(() => shiftBusinessDay(todayBusinessDay(), -6));
	const [rangeTo, setRangeTo] = (0, import_react.useState)(() => todayBusinessDay());
	const [version, setVersion] = (0, import_react.useState)(0);
	const [records, setRecords] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (!subjectId && visibleSubjects[0]) setSubjectId(visibleSubjects[0].id);
	}, [subjectId, visibleSubjects]);
	(0, import_react.useEffect)(() => dailyReportService.subscribe(() => setVersion((v) => v + 1)), []);
	const windowDays = (0, import_react.useMemo)(() => {
		const sorted = [...[
			day,
			rangeFrom,
			rangeTo,
			shiftBusinessDay(todayBusinessDay(), -6),
			todayBusinessDay()
		]].sort(compareBusinessDays);
		return {
			from: sorted[0],
			to: sorted[sorted.length - 1]
		};
	}, [
		day,
		rangeFrom,
		rangeTo
	]);
	(0, import_react.useEffect)(() => {
		if (!subjectId) {
			setRecords([]);
			return;
		}
		let cancelled = false;
		dailyReportService.listRange({
			subjectId,
			from: windowDays.from.key,
			to: windowDays.to.key
		}).then((rows) => {
			if (!cancelled) setRecords(rows);
		});
		return () => {
			cancelled = true;
		};
	}, [
		subjectId,
		windowDays,
		version
	]);
	const dayReport = (0, import_react.useMemo)(() => records.find((r) => r.date === day.key) ?? null, [records, day.key]);
	const rangeSummary = (0, import_react.useMemo)(() => summarize(rangeFrom.key, rangeTo.key, records), [
		rangeFrom.key,
		rangeTo.key,
		records
	]);
	const rangeSlots = (0, import_react.useMemo)(() => buildSlots(rangeFrom.key, rangeTo.key, records).slice().reverse(), [
		rangeFrom.key,
		rangeTo.key,
		records
	]);
	const history = (0, import_react.useMemo)(() => {
		const days = lastBusinessDays(7);
		return {
			slots: buildSlots(days[0].key, days[days.length - 1].key, records).slice().reverse(),
			summary: summarize(days[0].key, days[days.length - 1].key, records)
		};
	}, [records]);
	const save = (0, import_react.useCallback)(async (values) => {
		if (!subjectId || !user) return;
		await dailyReportService.saveDay({
			subjectId,
			date: day.key,
			...values
		}, user.id);
		toast.success("گزارش روز ذخیره شد.");
	}, [
		subjectId,
		day.key,
		user
	]);
	const clearDay = (0, import_react.useCallback)(async () => {
		if (!subjectId) return;
		await dailyReportService.removeDay(subjectId, day.key);
		toast.success("رکورد این روز حذف شد.");
	}, [subjectId, day.key]);
	if (!can(user, "tasks") && !canSeeEveryone) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "size-6" }),
		title: "دسترسی ندارید",
		description: "گزارش روزانه کارکنان برای حساب شما فعال نیست."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "گزارش روزانه کارکنان",
		subtitle: "حقوق روزانه، پاداش، جریمه، عملکرد و یادداشت برای کارکنان و تکنسین‌ها (به وقت تهران)"
	}), visibleSubjects.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "size-6" }),
		title: "کارمندی ثبت نشده",
		description: "ابتدا کارکنان یا تکنسین‌ها را در بخش کاربران اضافه کنید."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "app-card space-y-4 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "subject",
						className: "block text-sm font-bold",
						children: "انتخاب کارمند / تکنسین"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						id: "subject",
						value: subjectId,
						onChange: (e) => setSubjectId(e.target.value),
						className: "h-12 w-full rounded-xl border bg-card px-3 text-sm font-bold outline-none focus:ring-2 focus:ring-ring",
						children: visibleSubjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: s.id,
							children: [
								s.fullName,
								" — ",
								s.roleTitle
							]
						}, s.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayNavigator, {
						day,
						onChange: setDay
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BusinessDayPicker, {
						id: "day",
						label: "انتخاب تاریخ",
						value: day,
						onChange: setDay
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DaySection, {
				day,
				report: dayReport,
				currency,
				canEdit,
				onSave: save,
				onClear: clearDay
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-lg font-extrabold",
					children: "خلاصه هفت روز گذشته"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-5" }),
							label: "جمع حقوق",
							value: money(history.summary.totalSalary, currency),
							tone: "success"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "size-5" }),
							label: "جمع پاداش",
							value: money(history.summary.totalBonus, currency),
							tone: "info"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-5" }),
							label: "جمع جریمه",
							value: money(history.summary.totalPenalty, currency),
							tone: "danger"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-5" }),
							label: "روزهای بدون رکورد",
							value: toFa(history.summary.missingDays),
							tone: "warning"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotList, {
					slots: history.slots,
					currency,
					onPick: setDay
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-lg font-extrabold",
					children: "گزارش بازه زمانی"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "app-card grid gap-4 p-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BusinessDayPicker, {
						id: "from",
						label: "از تاریخ",
						value: rangeFrom,
						onChange: setRangeFrom
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BusinessDayPicker, {
						id: "to",
						label: "تا تاریخ",
						value: rangeTo,
						onChange: setRangeTo
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-5" }),
							label: "جمع حقوق بازه",
							value: money(rangeSummary.totalSalary, currency),
							tone: "success"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "size-5" }),
							label: "جمع پاداش بازه",
							value: money(rangeSummary.totalBonus, currency),
							tone: "info"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-5" }),
							label: "جمع جریمه بازه",
							value: money(rangeSummary.totalPenalty, currency),
							tone: "danger"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "size-5" }),
							label: "خالص بازه",
							value: money(rangeSummary.netTotal, currency),
							tone: "primary"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "app-card mt-4 space-y-3 p-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold",
								children: [
									formatBusinessDayShort(rangeFrom),
									" تا ",
									formatBusinessDayShort(rangeTo)
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "num text-muted-foreground",
								children: [
									toFa(rangeSummary.recordedDays),
									" روز دارای رکورد از ",
									toFa(rangeSummary.days),
									" روز"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [PERFORMANCE_ORDER.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
								tone: performanceTone[p],
								children: [
									PERFORMANCE_LABEL[p],
									": ",
									toFa(rangeSummary.performanceCounts[p])
								]
							}, p)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
								tone: "neutral",
								children: [
									NO_RECORD_LABEL,
									": ",
									toFa(rangeSummary.missingDays)
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"میانگین عملکرد:",
								" ",
								rangeSummary.averagePerformanceScore === null ? NO_RECORD_LABEL : `${PERFORMANCE_LABEL[scoreToRating(rangeSummary.averagePerformanceScore)]} (${toFa(rangeSummary.averagePerformanceScore.toFixed(1))})`
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotList, {
					slots: rangeSlots,
					currency,
					onPick: setDay
				})
			] })
		]
	})] });
}
function DayNavigator({ day, onChange }) {
	const today = todayBusinessDay();
	const isToday = isSameBusinessDay(day, today);
	const nextDisabled = isFutureBusinessDay(shiftBusinessDay(day, 1));
	const btn = "inline-flex h-11 items-center justify-center gap-1 rounded-xl border bg-card px-3 text-sm font-bold disabled:opacity-40";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center justify-between gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: btn,
				onClick: () => onChange(shiftBusinessDay(day, -1)),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" }), "روز قبل"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-extrabold",
					children: formatBusinessDay(day)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [businessDayWeekday(day), isToday ? " — امروز" : ""]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: btn,
					onClick: () => onChange(today),
					disabled: isToday,
					children: "امروز"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: btn,
					onClick: () => onChange(shiftBusinessDay(day, 1)),
					disabled: nextDisabled,
					children: ["روز بعد", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })]
				})]
			})
		]
	});
}
function DaySection({ day, report, currency, canEdit, onSave, onClear }) {
	const [salary, setSalary] = (0, import_react.useState)(0);
	const [bonus, setBonus] = (0, import_react.useState)(0);
	const [penalty, setPenalty] = (0, import_react.useState)(0);
	const [performance, setPerformance] = (0, import_react.useState)(null);
	const [notes, setNotes] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		setSalary(report?.salary ?? 0);
		setBonus(report?.bonus ?? 0);
		setPenalty(report?.penalty ?? 0);
		setPerformance(report?.performance ?? null);
		setNotes(report?.notes ?? "");
	}, [report, day.key]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-lg font-extrabold",
					children: ["گزارش ", formatBusinessDay(day)]
				}), report ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						tone: report.performance ? performanceTone[report.performance] : "neutral",
						children: report.performance ? PERFORMANCE_LABEL[report.performance] : "عملکرد ثبت نشده"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordActions, {
						kind: "dailyReport",
						id: report.id,
						title: `گزارش ${formatBusinessDay(day)}`,
						onEdit: () => document.getElementById("day-report-form")?.scrollIntoView({
							behavior: "smooth",
							block: "center"
						}),
						onDelete: onClear
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					tone: "neutral",
					children: NO_RECORD_LABEL
				})]
			}),
			report ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-5" }),
						label: "حقوق روزانه",
						value: money(report.salary, currency),
						tone: "success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "size-5" }),
						label: "پاداش",
						value: money(report.bonus, currency),
						tone: "info"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-5" }),
						label: "جریمه",
						value: money(report.penalty, currency),
						tone: "danger"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "size-5" }),
						label: "خالص روز",
						value: money(report.salary + report.bonus - report.penalty, currency),
						tone: "primary"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-6" }),
				title: NO_RECORD_LABEL,
				description: "برای این روز هیچ گزارشی ثبت نشده است. نبود رکورد به معنی صفر بودن مبالغ یا عملکرد بد نیست."
			}),
			report?.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "app-card p-4 text-sm leading-6",
				children: report.notes
			}) : null,
			canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				id: "day-report-form",
				className: "app-card space-y-4 p-4",
				onSubmit: (e) => {
					e.preventDefault();
					onSave({
						salary,
						bonus,
						penalty,
						performance,
						notes
					});
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-extrabold",
						children: report ? "ویرایش گزارش این روز" : "ثبت گزارش این روز"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmountField, {
								id: "salary",
								label: "حقوق روزانه",
								value: salary,
								onChange: setSalary,
								currency
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmountField, {
								id: "bonus",
								label: "پاداش",
								value: bonus,
								onChange: setBonus,
								currency
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmountField, {
								id: "penalty",
								label: "جریمه",
								value: penalty,
								onChange: setPenalty,
								currency
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-bold",
							children: "عملکرد"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: PERFORMANCE_ORDER.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": performance === p,
								onClick: () => setPerformance(performance === p ? null : p),
								className: cn("rounded-full px-4 py-2 text-sm font-bold transition-colors", performance === p ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground hover:bg-accent/70"),
								children: PERFORMANCE_LABEL[p]
							}, p))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
						id: "notes",
						label: "یادداشت",
						value: notes,
						onChange: setNotes,
						placeholder: "توضیح کوتاه درباره عملکرد یا اتفاقات این روز"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "h-11 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground",
							children: "ذخیره گزارش روز"
						})
					})
				]
			}) : null
		]
	});
}
function SlotList({ slots, currency, onPick }) {
	if (slots.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "app-card mt-4 divide-y",
		children: slots.map((slot) => {
			const day = parseBusinessDayKey(slot.date);
			const r = slot.report;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onPick(day),
				className: "flex w-full items-center gap-3 p-4 text-right",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-sm font-bold",
						children: formatBusinessDay(day)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-xs text-muted-foreground",
						children: r ? `${money(r.salary, currency)} حقوق • ${money(r.bonus, currency)} پاداش • ${money(r.penalty, currency)} جریمه` : NO_RECORD_LABEL
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					tone: r?.performance ? performanceTone[r.performance] : "neutral",
					children: r ? r.performance ? PERFORMANCE_LABEL[r.performance] : "بدون عملکرد" : NO_RECORD_LABEL
				})]
			}) }, slot.date);
		})
	});
}
/** Kept for future use by other screens that need the same day window. */
function businessDayWindow(from, to) {
	return listBusinessDays(from, to);
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DailyReportsPage, {}) });
//#endregion
export { businessDayWindow, SplitComponent as component };
