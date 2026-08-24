import { r as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as History, Dt as ChartColumn, Lt as Archive, Mt as Bell, S as Settings, W as MessageCircle, b as ShieldCheck, c as UserPlus, gt as ClipboardList, i as Wallet, o as Users } from "../_libs/lucide-react.mjs";
import { T as toFa, _ as faDateTime, h as StatCard, o as EmptyState, t as AppShell, u as PageHeader } from "./ui-kit-B64qXDLa.mjs";
import { T as can, Y as useStore, l as ENTITY_LABEL, q as roleTitle } from "./router-DkR-Q5N6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-Cno-dc_g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SECTIONS = [
	{
		to: "/users",
		key: "users",
		label: "کاربران، نقش‌ها و دسترسی‌ها",
		description: "افزودن، ویرایش، غیرفعال‌سازی و آرشیو افراد؛ تعریف نقش دلخواه",
		icon: ShieldCheck
	},
	{
		to: "/people",
		key: "users",
		label: "معرفی اشخاص",
		description: "ساخت نام کاربری و رمز عبور، ثبت سمت، شماره تماس، توضیحات و سطح کاربر",
		icon: UserPlus
	},
	{
		to: "/permissions",
		key: "users",
		label: "تغییر دسترسی کاربران",
		description: "دیدن و تغییر دسترسی هر شخص؛ هر دسترسی تا تغییر بعدی پشتیبان پایدار می‌ماند",
		icon: ShieldCheck
	},
	{
		to: "/tasks",
		key: "tasks",
		label: "وظایف کارمندان",
		description: "ساخت، ویرایش، آرشیو و پیگیری وضعیت وظایف",
		icon: ClipboardList
	},
	{
		to: "/earnings",
		key: "earnings",
		label: "دستمزد، پاداش و جریمه",
		description: "تأیید یا رد دستمزد، ثبت پاداش و جریمه و خالص دریافتی هر کارمند",
		icon: Wallet
	},
	{
		to: "/notifications",
		key: "notifications",
		label: "آلارم‌ها و اعلان‌ها",
		description: "ارسال اعلان و پیگیری آلارم‌های تحویل‌شده",
		icon: Bell
	},
	{
		to: "/messages",
		key: "messages",
		label: "گروه‌های گفتگو",
		description: "گروه‌های تیمی و گفتگوی خصوصی با پرسنل",
		icon: MessageCircle
	},
	{
		to: "/reports",
		key: "reports",
		label: "گزارش‌ها و تاریخچه فعالیت",
		description: "تحلیل عملکرد و سابقهٔ همهٔ تغییرات",
		icon: ChartColumn
	},
	{
		to: "/audit",
		key: "users",
		label: "تاریخچه و بازگردانی",
		description: "سابقهٔ تغییرناپذیر تغییرات، بازیابی بایگانی و بازگردانی وضعیت به مرحلهٔ قبل",
		icon: History
	},
	{
		to: "/settings",
		key: "settings",
		label: "تنظیمات عمومی",
		description: "واحد پول، بازهٔ آلارم، پوستهٔ برنامه و پشتیبان‌گیری",
		icon: Settings
	}
];
function AdminPage() {
	const { state, user } = useStore();
	const stats = (0, import_react.useMemo)(() => {
		return {
			active: state.users.filter((u) => u.isActive && !u.isArchived),
			archived: state.users.filter((u) => u.isArchived),
			pendingWages: state.tasks.filter((t) => t.status === "SUBMITTED").length,
			openTasks: state.tasks.filter((t) => t.status === "PENDING" || t.status === "IN_PROGRESS").length
		};
	}, [state.users, state.tasks]);
	const recent = (0, import_react.useMemo)(() => [...state.activity ?? []].slice(-8).reverse(), [state.activity]);
	if (!can(user, "users")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-6" }),
		title: "دسترسی ندارید",
		description: "پنل پشتیبان فقط برای پشتیبان و افراد دارای دسترسی مدیریت کاربران باز است."
	});
	const sections = SECTIONS.filter((s) => can(user, s.key));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "پنل پشتیبان",
			subtitle: "مدیریت کامل تیم، دسترسی‌ها و عملکرد تعمیرگاه"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-5" }),
					label: "پرسنل فعال",
					value: toFa(stats.active.length),
					tone: "success",
					to: "/users"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { className: "size-5" }),
					label: "آرشیو شده",
					value: toFa(stats.archived.length),
					tone: "info",
					to: "/users"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "size-5" }),
					label: "وظایف در جریان",
					value: toFa(stats.openTasks),
					tone: "warning",
					to: "/tasks"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-5" }),
					label: "دستمزد در انتظار تأیید",
					value: toFa(stats.pendingWages),
					tone: "danger",
					to: "/earnings"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-6 mb-3 text-base font-extrabold",
			children: "بخش‌های مدیریتی"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-3 sm:grid-cols-2",
			children: sections.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: s.to,
				className: "app-card flex items-center gap-3 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-11 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "size-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-extrabold",
						children: s.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-xs leading-5 text-muted-foreground",
						children: s.description
					})]
				})]
			}) }, s.to))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-6 mb-3 text-base font-extrabold",
			children: "پرسنل و نقش‌ها"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "app-card divide-y",
			children: stats.active.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-3 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block truncate font-extrabold",
						children: u.fullName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block truncate text-xs text-muted-foreground",
						children: u.title || u.username
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground",
					children: roleTitle(u)
				})]
			}, u.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-6 mb-3 text-base font-extrabold",
			children: "آخرین فعالیت‌ها"
		}),
		recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "هنوز فعالیتی ثبت نشده است."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "app-card divide-y",
			children: recent.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-bold",
						children: [
							ENTITY_LABEL[a.entity],
							" — ",
							a.action
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: [
							state.users.find((u) => u.id === a.userId)?.fullName ?? "کاربر حذف‌شده",
							" ·",
							" ",
							faDateTime(a.createdAt)
						]
					}),
					a.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: a.note
					}) : null
				]
			}, a.id))
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPage, {}) });
//#endregion
export { SplitComponent as component };
