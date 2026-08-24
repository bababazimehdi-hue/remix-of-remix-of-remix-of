import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { Et as CheckCheck, Mt as Bell, Nt as Banknote, W as MessageCircle, ht as Clock, n as Wrench, y as ShoppingCart } from "../_libs/lucide-react.mjs";
import { D as useNow, T as toFa, l as ListSkeleton, o as EmptyState, t as AppShell, u as PageHeader, v as faDateTimeLong, w as relativeTime } from "./ui-kit-B64qXDLa.mjs";
import { D as cn, R as isForUser, Y as useStore } from "./router-DkR-Q5N6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications-BuzAKE9F.js
var import_jsx_runtime = require_jsx_runtime();
var ICONS = {
	purchase: ShoppingCart,
	invoice: ShoppingCart,
	expense: Banknote,
	task: Wrench,
	accounting: CheckCheck,
	message: MessageCircle
};
function Notifications() {
	const { state, setState, user, loading } = useStore();
	const now = useNow(15e3);
	if (!user) return null;
	const seen = /* @__PURE__ */ new Set();
	const mine = state.notifications.filter((n) => {
		if (seen.has(n.id) || !isForUser(n, user)) return false;
		seen.add(n.id);
		return true;
	});
	const items = mine.filter((n) => new Date(n.deliverAt).getTime() <= now.getTime());
	const queued = mine.filter((n) => new Date(n.deliverAt).getTime() > now.getTime());
	const today = items.filter((n) => Date.now() - new Date(n.createdAt).getTime() < 864e5);
	const older = items.filter((n) => Date.now() - new Date(n.createdAt).getTime() >= 864e5);
	function markAll() {
		if (!items.some((n) => !n.isRead)) {
			toast("اعلان خوانده‌نشده‌ای وجود ندارد");
			return;
		}
		setState((s) => ({
			...s,
			notifications: s.notifications.map((n) => isForUser(n, user) && !n.isRead ? {
				...n,
				isRead: true
			} : n)
		}));
		toast.success("همه اعلان‌ها خوانده شد");
	}
	function markOne(id) {
		const target = state.notifications.find((n) => n.id === id);
		if (!target || target.isRead) return;
		setState((s) => ({
			...s,
			notifications: s.notifications.map((n) => n.id === id ? {
				...n,
				isRead: true
			} : n)
		}));
	}
	const group = (title, list) => list.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 border-b pb-2 text-base font-extrabold text-muted-foreground",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-3",
			children: list.map((n) => {
				const Icon = ICONS[n.type] ?? Bell;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: n.url,
					onClick: () => markOne(n.id),
					className: cn("app-card flex items-start gap-3 p-4", !n.isRead && "border-e-4 border-e-primary"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-12 shrink-0 place-items-center rounded-full bg-primary-soft text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "truncate font-bold",
									children: n.title
								}), !n.isRead ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-primary" }) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-6 text-muted-foreground",
								children: n.body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: relativeTime(n.createdAt)
							})
						]
					})]
				}) }, n.id);
			})
		})]
	}) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "مرکز نوتیفیکیشن‌ها",
			subtitle: "رویدادهای مرتبط با نقش شما",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: markAll,
				className: "flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "size-4" }), " خواندن همه"]
			})
		}),
		queued.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "app-card mb-2 flex items-start gap-3 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "mt-0.5 size-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm leading-6",
				children: [
					toFa(queued.length),
					" اعلان در صف است و در بازهٔ مجاز آلارم ارسال می‌شود",
					queued[0] ? ` (اولین ارسال: ${faDateTimeLong(queued[0].deliverAt)})` : "",
					"."
				]
			})]
		}) : null,
		loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, {})
		}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-6" }),
			title: "اعلانی وجود ندارد",
			description: "هر رویداد مرتبط با نقش شما اینجا نمایش داده می‌شود."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [group("امروز", today), group("قبل‌تر", older)] })
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notifications, {}) });
//#endregion
export { SplitComponent as component };
