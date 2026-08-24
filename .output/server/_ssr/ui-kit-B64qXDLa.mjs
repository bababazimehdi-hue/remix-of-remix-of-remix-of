import { r as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime, d as DialogContent, f as DialogDescription, h as DialogTitle, l as Dialog, m as DialogPortal, p as DialogOverlay, u as DialogClose } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as supabase } from "./server-BIpwqx2E.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { Et as CheckCheck, G as Menu, K as LogOut, Mt as Bell, N as Plus, Nt as Banknote, O as RefreshCw, W as MessageCircle, Y as LoaderCircle, n as Wrench, r as WifiOff, t as X, w as Search, y as ShoppingCart } from "../_libs/lucide-react.mjs";
import { n as AvatarFallback$1, r as AvatarImage$1, t as Avatar$1 } from "../_libs/radix-ui__react-avatar.mjs";
import { i as Trigger, n as Portal, r as Root2, t as Content2 } from "../_libs/radix-ui__react-popover.mjs";
import { D as cn, F as formatJalaliTime, G as relativeTime$1, I as getSyncEngine, M as formatJalaliDateTime, N as formatJalaliDateTimeLong, P as formatJalaliFullMoment, R as isForUser, T as can, Y as useStore, h as Logo, j as formatJalaliDate } from "./router-DkR-Q5N6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-kit-B64qXDLa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Avatar = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar$1, {
	ref,
	className: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
	...props
}));
Avatar.displayName = Avatar$1.displayName;
var AvatarImage = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage$1, {
	ref,
	className: cn("aspect-square h-full w-full", className),
	...props
}));
AvatarImage.displayName = AvatarImage$1.displayName;
var AvatarFallback = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback$1, {
	ref,
	className: cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className),
	...props
}));
AvatarFallback.displayName = AvatarFallback$1.displayName;
var Popover = Root2;
var PopoverTrigger = Trigger;
var PopoverContent = import_react.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)", className),
	...props
}) }));
PopoverContent.displayName = Content2.displayName;
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("animate-pulse rounded-md bg-primary/10", className),
		...props
	});
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
function toFa(value) {
	return String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);
}
function groupDigits(value) {
	const n = typeof value === "number" ? value : Number(String(value).replace(/[^\d.-]/g, ""));
	if (!Number.isFinite(n)) return "";
	return n.toLocaleString("en-US");
}
function money(amount, currency = "TOMAN") {
	return `${toFa(groupDigits(currency === "RIAL" ? amount * 10 : amount))} ${currency === "RIAL" ? "ریال" : "تومان"}`;
}
/** All date/time display goes through the central Intl-based module. */
var faDate = formatJalaliDate;
var faDateTime = formatJalaliDateTime;
var faDateTimeLong = formatJalaliDateTimeLong;
var faFullMoment = formatJalaliFullMoment;
function faTime(value, withSeconds = false) {
	return formatJalaliTime(value, withSeconds);
}
var relativeTime = relativeTime$1;
/** Turns an input value into a grouped, Persian-digit amount for display. */
function formatAmountInput(raw) {
	const digits = raw.replace(/[^\d۰-۹]/g, "").replace(/[۰-۹]/g, (d) => String(FA_DIGITS.indexOf(d)));
	if (!digits) return "";
	return toFa(groupDigits(Number(digits)));
}
function parseAmountInput(raw) {
	const digits = raw.replace(/[۰-۹]/g, (d) => String(FA_DIGITS.indexOf(d))).replace(/[^\d]/g, "");
	return digits ? Number(digits) : 0;
}
/** Live ticking clock; re-renders every `intervalMs` so timestamps stay exact. */
function useNow(intervalMs = 1e3) {
	const [now, setNow] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => setNow(/* @__PURE__ */ new Date()), intervalMs);
		return () => window.clearInterval(id);
	}, [intervalMs]);
	return now;
}
var ICONS = {
	purchase: ShoppingCart,
	invoice: ShoppingCart,
	expense: Banknote,
	task: Wrench,
	accounting: CheckCheck,
	message: MessageCircle
};
/**
* Header notification centre: unread badge, live panel and read tracking.
* Only notifications the signed-in person is allowed to see are listed, and
* queued alarms stay hidden until their delivery window opens.
*/
function NotificationBell({ user }) {
	const { state, setState, loading, syncStatus, resync } = useStore();
	const [open, setOpen] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const now = useNow(15e3);
	const visible = (0, import_react.useMemo)(() => {
		const seen = /* @__PURE__ */ new Set();
		return state.notifications.filter((n) => {
			if (seen.has(n.id)) return false;
			if (!isForUser(n, user)) return false;
			if (new Date(n.deliverAt).getTime() > now.getTime()) return false;
			seen.add(n.id);
			return true;
		});
	}, [
		state.notifications,
		user,
		now
	]);
	const unread = visible.filter((n) => !n.isRead).length;
	const recent = visible.slice(0, 12);
	const offline = syncStatus === "offline";
	const reconnecting = syncStatus === "reconnecting";
	function markOne(id) {
		setState((s) => ({
			...s,
			notifications: s.notifications.map((n) => n.id === id ? {
				...n,
				isRead: true
			} : n)
		}));
	}
	function markAll() {
		if (!unread) return;
		setState((s) => ({
			...s,
			notifications: s.notifications.map((n) => isForUser(n, user) && !n.isRead ? {
				...n,
				isRead: true
			} : n)
		}));
	}
	function openItem(n) {
		if (!n.isRead) markOne(n.id);
		setOpen(false);
		if (n.url) navigate({ to: n.url }).catch(() => navigate({ to: "/notifications" }));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"aria-label": unread ? `اعلان‌ها، ${unread} خوانده‌نشده` : "اعلان‌ها",
				className: "relative grid size-11 min-h-11 place-items-center rounded-full border border-on-hero/25 bg-on-hero/10 backdrop-blur transition-colors hover:bg-on-hero/20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-5 text-on-hero" }),
					unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute -end-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-destructive px-1 text-[10px] font-extrabold leading-5 text-destructive-foreground",
						children: toFa(unread > 99 ? 99 : unread)
					}) : null,
					offline || reconnecting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute -bottom-0.5 -start-0.5 grid size-4 place-items-center rounded-full bg-card text-muted-foreground",
						children: reconnecting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, { className: "size-3" })
					}) : null
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
			align: "start",
			sideOffset: 10,
			dir: "rtl",
			className: "safe-bottom w-[min(22rem,calc(100vw-1.5rem))] p-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2 border-b px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-extrabold",
						children: "اعلان‌ها"
					}), unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: markAll,
						className: "flex min-h-9 items-center gap-1 rounded-full bg-accent px-3 text-xs font-bold text-accent-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "size-4" }), " خواندن همه"]
					}) : null]
				}),
				offline || reconnecting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2 border-b bg-muted/60 px-4 py-2 text-xs font-bold text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: reconnecting ? "در حال اتصال دوباره…" : "اتصال برقرار نیست" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: resync,
						className: "flex min-h-8 items-center gap-1 rounded-full bg-secondary px-3 text-xs font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3.5" }), " تلاش دوباره"]
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-h-[60vh] overflow-y-auto overscroll-contain",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3 p-4",
						children: [
							0,
							1,
							2
						].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "size-10 shrink-0 rounded-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-2/3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-full" })]
							})]
						}, i))
					}) : recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid place-items-center gap-2 px-6 py-10 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-6 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-bold",
								children: "اعلانی وجود ندارد"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs leading-6 text-muted-foreground",
								children: "رویدادهای مرتبط با نقش شما اینجا نمایش داده می‌شود."
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y",
						children: recent.map((n) => {
							const Icon = ICONS[n.type] ?? Bell;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => openItem(n),
								className: cn("flex w-full min-h-16 items-start gap-3 p-4 text-start transition-colors hover:bg-accent/60", !n.isRead && "bg-primary-soft/40"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-10 shrink-0 place-items-center rounded-full bg-primary-soft text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate text-sm font-bold",
												children: n.title
											}), !n.isRead ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 shrink-0 rounded-full bg-primary" }) : null]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-1 block break-words text-xs leading-6 text-muted-foreground line-clamp-3",
											children: n.body
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-1 block text-[11px] text-muted-foreground",
											children: relativeTime(n.createdAt)
										})
									]
								})]
							}) }, n.id);
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						setOpen(false);
						navigate({ to: "/notifications" });
					},
					className: "w-full border-t px-4 py-3 text-center text-sm font-bold text-primary",
					children: "مشاهده همه اعلان‌ها"
				})
			]
		})]
	});
}
/**
* True only for the OWNER / main support account (the first owner of the
* system). Resolved against the database (`is_org_owner`), never from
* client-side storage, so the flag cannot be forged in the browser.
*/
function useIsOwner() {
	const [isOwner, setIsOwner] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		(async () => {
			try {
				const { data: auth } = await supabase.auth.getUser();
				const userId = auth.user?.id;
				if (!userId) return;
				const rpc = supabase.rpc;
				const { data } = await rpc("is_org_owner", { _user_id: userId });
				if (data === true) {
					if (!cancelled) setIsOwner(true);
					return;
				}
				const [roleRows, orgRows] = await Promise.all([supabase.from("user_roles").select("role").eq("user_id", userId), supabase.from("organizations").select("owner_id").eq("owner_id", userId)]);
				const hasOwnerRole = (roleRows.data ?? []).some((r) => ["OWNER", "ADMIN"].includes(String(r.role ?? "").toUpperCase()));
				const ownsOrg = (orgRows.data ?? []).length > 0;
				if (!cancelled) setIsOwner(hasOwnerRole || ownsOrg);
			} finally {
				if (!cancelled) setLoading(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, []);
	return {
		isOwner,
		loading
	};
}
var Sheet = Dialog;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-4 shadow-lg sm:p-6 transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 max-h-[92svh] overflow-y-auto border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 max-h-[92svh] overflow-y-auto border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-[85%] overflow-y-auto border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-[85%] overflow-y-auto border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute end-4 top-4 grid size-8 place-items-center rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-start", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
var home_default = "/assets/home-DDjJczyk.png";
var purchases_default = "/assets/purchases-MWoGNJMu.png";
var inventory_default = "/assets/inventory-BZ23KCWH.png";
var expenses_default = "/assets/expenses-BPAcKO1A.png";
var tasks_default = "/assets/tasks-B3oQ8xrZ.png";
var messages_default = "/assets/messages-96fDhSmy.png";
var notifications_default = "/assets/notifications-BMACoHBr.png";
var invoices_default = "/assets/invoices-C_7ynItR.png";
var reports_default = "/assets/reports-CI4zVq6y.png";
var earnings_default = "/assets/earnings-Gqgq4owF.png";
var exports_default = "/assets/exports-jyb2k9sj.png";
var shield_default = "/assets/shield-ClH9F5lg.png";
var users_default = "/assets/users-YmUS8wse.png";
var settings_default = "/assets/settings-D-looumG.png";
/**
* React hook for sync status monitoring.
* 
* Provides real-time sync status and statistics to UI components.
*/
/**
* Hook to monitor and control the sync engine.
*/
function useSyncEngine() {
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [stats, setStats] = (0, import_react.useState)(null);
	const syncEngine = getSyncEngine();
	(0, import_react.useEffect)(() => {
		const unsubscribe = syncEngine.subscribe((newStatus, newStats) => {
			setStatus(newStatus);
			setStats(newStats);
		});
		return () => {
			unsubscribe();
		};
	}, [syncEngine]);
	const triggerSync = (0, import_react.useCallback)(async () => {
		await syncEngine.triggerSync();
	}, [syncEngine]);
	const clearPending = (0, import_react.useCallback)(async () => {
		await syncEngine.clearPendingOperations();
	}, [syncEngine]);
	return {
		status,
		stats,
		isSyncing: status === "syncing",
		isOffline: stats?.isOnline === false,
		hasFailed: (stats?.failed ?? 0) > 0,
		pendingCount: stats?.pending ?? 0,
		triggerSync,
		clearPending
	};
}
/**
* Simple component to display sync status indicator.
*/
function SyncStatusIndicator() {
	const { status, isOffline, pendingCount, hasFailed } = useSyncEngine();
	if (typeof window === "undefined") return null;
	const getStatusColor = () => {
		if (isOffline) return "bg-yellow-500";
		if (hasFailed) return "bg-red-500";
		if (status === "syncing") return "bg-blue-500 animate-pulse";
		if (status === "idle" && pendingCount === 0) return "bg-green-500";
		return "bg-gray-500";
	};
	const getStatusText = () => {
		if (isOffline) return "آفلاین";
		if (hasFailed) return "خطا در سینک";
		if (status === "syncing") return "در حال سینک...";
		if (pendingCount > 0) return `${pendingCount} عملیات در صف`;
		return "همگام‌سازی شده";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `w-2 h-2 rounded-full ${getStatusColor()}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: getStatusText()
		})]
	});
}
function NavIcon({ src, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt: "",
		"aria-hidden": true,
		loading: "lazy",
		width: 24,
		height: 24,
		className: cn("size-6 shrink-0 object-contain", className)
	});
}
var ALL_NAV = [
	{
		to: "/dashboard",
		label: "خانه",
		img: home_default,
		key: "dashboard"
	},
	{
		to: "/bicycle-purchases",
		label: "خریدها",
		img: purchases_default,
		key: "purchases"
	},
	{
		to: "/inventory",
		label: "دوچرخه‌ها",
		img: inventory_default,
		key: "inventory"
	},
	{
		to: "/expenses",
		label: "هزینه‌ها",
		img: expenses_default,
		key: "expenses"
	},
	{
		to: "/tasks",
		label: "وظایف",
		img: tasks_default,
		key: "tasks"
	},
	{
		to: "/messages",
		label: "پیام‌ها",
		img: messages_default,
		key: "messages"
	}
];
var DESKTOP_EXTRA = [
	{
		to: "/repaired-bikes",
		label: "دوچرخه‌های تعمیر شده",
		img: inventory_default,
		key: "inventory"
	},
	{
		to: "/notifications",
		label: "اعلان‌ها",
		img: notifications_default,
		key: "notifications"
	},
	{
		to: "/purchase-invoices",
		label: "فاکتورهای خرید",
		img: invoices_default,
		key: "invoices"
	},
	{
		to: "/reports",
		label: "گزارش و تحلیل",
		img: reports_default,
		key: "reports"
	},
	{
		to: "/daily-reports",
		label: "گزارش روزانه کارکنان",
		img: reports_default,
		key: "reports"
	},
	{
		to: "/earnings",
		label: "دستمزد و پاداش",
		img: earnings_default,
		key: "earnings"
	},
	{
		to: "/exports",
		label: "خروجی حسابداری",
		img: exports_default,
		key: "exports"
	},
	{
		to: "/account",
		label: "تنظیمات کاربری",
		img: settings_default,
		key: "account"
	},
	{
		to: "/admin",
		label: "پنل پشتیبان",
		img: shield_default,
		key: "users",
		management: true
	},
	{
		to: "/users",
		label: "مدیریت کاربران",
		img: users_default,
		key: "users",
		management: true
	},
	{
		to: "/permissions",
		label: "تغییر دسترسی کاربران",
		img: shield_default,
		key: "users",
		management: true
	},
	{
		to: "/settings",
		label: "تنظیمات",
		img: settings_default,
		key: "settings",
		management: true,
		ownerOnly: true
	}
];
function navFor(user) {
	if (user.role === "MECHANIC") return [
		{
			to: "/tasks",
			label: "وظایف من",
			img: tasks_default,
			key: "tasks"
		},
		{
			to: "/earnings",
			label: "دستمزد من",
			img: earnings_default,
			key: "earnings"
		},
		{
			to: "/messages",
			label: "پیام‌ها",
			img: messages_default,
			key: "messages"
		}
	].filter((n) => can(user, n.key));
	return ALL_NAV.filter((n) => can(user, n.key));
}
function SideNavLink({ item, path, unread }) {
	const active = path === item.to || path.startsWith(item.to + "/");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: item.to,
		className: cn("flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition-colors", active ? "bg-primary text-primary-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavIcon, {
				src: item.img,
				className: active ? "brightness-0 invert" : ""
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate",
				children: item.label
			}),
			item.key === "notifications" && unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ms-auto rounded-full bg-destructive px-2 text-xs font-bold text-destructive-foreground",
				children: unread
			}) : null
		]
	});
}
function AppShell({ children }) {
	const { user, state, logout, loading } = useStore();
	const { isOwner } = useIsOwner();
	const navigate = useNavigate();
	const path = useRouterState({ select: (s) => s.location.pathname });
	const [fabOpen, setFabOpen] = (0, import_react.useState)(false);
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const [expenseMenu, setExpenseMenu] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMenuOpen(false);
	}, [path]);
	if (!user && loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center px-6 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-bold",
				children: "در حال بارگذاری اطلاعات…"
			})]
		})
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center px-6 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "برای ادامه ابتدا وارد حساب خود شوید."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "inline-flex rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground",
				children: "ورود به حساب"
			})]
		})
	});
	const mobileNav = navFor(user);
	const isSupport = isOwner || user.role === "ADMIN";
	const visibleExtra = DESKTOP_EXTRA.filter((n) => (n.key === "account" || can(user, n.key)) && (!n.ownerOnly || isSupport));
	const sideNav = [...navFor(user), ...visibleExtra.filter((n) => !n.management)].filter((item, i, list) => list.findIndex((x) => x.to === item.to) === i);
	const manageNav = visibleExtra.filter((n) => n.management && !sideNav.some((x) => x.to === n.to));
	const unread = state.notifications.filter((n) => !n.isRead && isForUser(n, user)).length;
	const showFab = user.role !== "MECHANIC";
	const fabActions = [];
	if (user.role !== "MECHANIC") fabActions.push({
		label: "ثبت خرید دوچرخه",
		onClick: () => go("/bicycle-purchases/new")
	});
	if (can(user, "invoices")) fabActions.push({
		label: "ثبت پیش‌فاکتور خرید",
		onClick: () => go("/purchase-invoices/new")
	});
	if (can(user, "approve")) fabActions.push({
		label: "ثبت وظیفه جدید",
		onClick: () => go("/tasks?new=1")
	});
	function go(to) {
		setFabOpen(false);
		setExpenseMenu(false);
		navigate({ to });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh lg:flex",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "no-print safe-top sticky top-0 hidden h-screen w-72 shrink-0 overflow-y-auto border-l bg-sidebar p-4 lg:flex lg:flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 px-2 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "size-10 shadow-[var(--shadow-glow)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex flex-col leading-tight",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg text-primary",
							children: "مدیریت هوشمند"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-bold text-muted-foreground",
							children: "شهر دوچرخه دز رکاب"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "mt-4 flex-1 space-y-1",
					children: [sideNav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideNavLink, {
						item,
						path,
						unread
					}, item.to)), manageNav.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 px-3 pb-1 pt-3 text-[11px] font-extrabold text-muted-foreground",
						children: "بخش مدیریتی"
					}), manageNav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideNavLink, {
						item,
						path,
						unread
					}, item.to))] }) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						logout();
						navigate({ to: "/" });
					},
					className: "flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-bold text-destructive hover:bg-destructive/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-5" }), " خروج از حساب"]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-dvh w-full min-w-0 flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "no-print safe-top safe-x sticky top-0 z-30 bg-background px-3 pb-2 pt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-card relative mx-auto grid w-full max-w-5xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex shrink-0 items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setMenuOpen(true),
									"aria-label": "منوی کامل",
									className: "grid size-11 place-items-center rounded-full bg-secondary text-foreground transition-colors hover:bg-accent lg:hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/inventory",
									"aria-label": "جست‌وجو در دوچرخه‌ها",
									className: "grid size-11 place-items-center rounded-full bg-secondary text-foreground transition-colors hover:bg-accent",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 flex-col items-center justify-center text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex max-w-full items-center gap-1.5 truncate font-display text-base tracking-tight sm:text-lg",
									children: [
										"سلام ",
										user.fullName.split(" ")[0],
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"aria-hidden": true,
											children: "👋"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-[11px] font-bold text-muted-foreground",
									children: "شهر دوچرخه دز رکاب"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex shrink-0 items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SyncStatusIndicator, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationBell, { user }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/account",
										"aria-label": "تنظیمات کاربری",
										className: "relative shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
											className: "size-11 border-2 border-border",
											children: [user.avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
												src: user.avatarUrl,
												alt: user.fullName
											}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
												className: "bg-secondary text-sm font-bold",
												children: user.fullName.slice(0, 1)
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -bottom-0.5 -end-0.5 size-3 rounded-full border-2 border-card bg-success" })]
									})
								]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "safe-x mx-auto w-full min-w-0 max-w-5xl flex-1 px-4 pb-32 pt-4 sm:pt-5 lg:pb-12",
					children
				}),
				showFab ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setFabOpen(true),
					"aria-label": "ثبت مورد جدید",
					className: "no-print fixed bottom-[calc(6rem+env(safe-area-inset-bottom))] start-4 z-40 grid size-14 place-items-center sm:size-16 rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-float)] transition-transform active:scale-95 lg:bottom-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-8" })
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
					open: fabOpen,
					onOpenChange: (o) => {
						setFabOpen(o);
						if (!o) setExpenseMenu(false);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
						side: "bottom",
						className: "safe-bottom rounded-t-3xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
							className: "text-start",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: expenseMenu ? "دسته هزینه را انتخاب کنید" : "ثبت مورد جدید" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2 p-4",
							children: expenseMenu ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [[
								["MISCELLANEOUS", "هزینه"],
								["SALARY", "حقوق"],
								["BONUS", "پاداش"],
								["PENALTY", "جریمه"],
								...can(user, "personalWithdrawal") ? [["PERSONAL_WITHDRAWAL", "برداشت شخصی"]] : []
							].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => go(`/expenses/new?category=${value}`),
								className: "w-full rounded-xl bg-secondary px-4 py-4 text-start text-sm font-bold hover:bg-accent",
								children: label
							}, value)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setExpenseMenu(false),
								className: "w-full rounded-xl px-4 py-3 text-sm font-bold text-muted-foreground",
								children: "بازگشت"
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setExpenseMenu(true),
								className: "w-full rounded-xl bg-primary px-4 py-4 text-start text-sm font-bold text-primary-foreground",
								children: "ثبت هزینه"
							}), fabActions.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: a.onClick,
								className: "w-full rounded-xl bg-secondary px-4 py-4 text-start text-sm font-bold hover:bg-accent",
								children: a.label
							}, a.label))] })
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
					open: menuOpen,
					onOpenChange: setMenuOpen,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
						side: "right",
						className: "safe-top safe-bottom w-[86vw] max-w-sm overflow-y-auto p-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
							className: "border-b p-4 text-start",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "size-8 rounded-lg" }), "منوی کامل"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "space-y-1 p-3",
							children: [
								sideNav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideNavLink, {
									item,
									path,
									unread
								}, item.to)),
								manageNav.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 px-3 pb-1 pt-3 text-[11px] font-extrabold text-muted-foreground",
									children: "بخش مدیریتی"
								}), manageNav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideNavLink, {
									item,
									path,
									unread
								}, item.to))] }) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setMenuOpen(false);
										logout();
										navigate({ to: "/" });
									},
									className: "mt-3 flex w-full items-center gap-2 rounded-xl px-3 py-3 text-sm font-bold text-destructive hover:bg-destructive/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-5" }), " خروج از حساب"]
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "no-print safe-bottom safe-x fixed inset-x-0 bottom-0 z-30 border-t bg-card lg:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mx-auto flex max-w-lg items-stretch justify-between px-1 sm:px-2",
						children: mobileNav.map((item) => {
							const active = path === item.to || path.startsWith(item.to + "/");
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "flex-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: item.to,
									className: cn("flex min-h-16 w-full min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-0.5 py-2 text-[10px] font-extrabold leading-tight transition-colors sm:px-1 sm:text-[11px]", active ? "bg-primary/15 text-primary shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--primary)_35%,transparent)]" : "text-muted-foreground"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavIcon, {
											src: item.img,
											className: active ? "" : "opacity-60 grayscale"
										}), item.key === "notifications" && unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -end-1 -top-1 size-2 rounded-full bg-destructive" }) : null]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-full truncate text-center",
										children: item.label
									})]
								})
							}, item.to);
						})
					})
				})
			]
		})]
	});
}
function PageHeader({ title, subtitle, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex flex-wrap items-end justify-between gap-x-3 gap-y-2 pb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-extrabold tracking-tight sm:text-3xl",
				children: title
			}), subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: subtitle
			}) : null]
		}), action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shrink-0",
			children: action
		}) : null]
	});
}
var toneClass = {
	success: "bg-primary-soft text-primary",
	warning: "bg-warning/20 text-warning-foreground",
	danger: "bg-destructive/12 text-destructive",
	info: "bg-accent text-accent-foreground",
	neutral: "bg-muted text-muted-foreground",
	primary: "bg-primary text-primary-foreground"
};
function Chip({ children, tone = "neutral", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold", toneClass[tone], className),
		children
	});
}
function EmptyState({ icon, title, description, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "app-card flex flex-col items-center gap-3 px-6 py-12 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid size-14 place-items-center rounded-2xl bg-accent text-accent-foreground",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-base font-bold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-sm text-sm text-muted-foreground",
				children: description
			}),
			action
		]
	});
}
function ListSkeleton({ rows = 3 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children: Array.from({ length: rows }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "app-card space-y-3 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-20 rounded-full" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-2/3" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-1/3" })
			]
		}, i))
	});
}
function ErrorState({ message, onRetry }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "alert",
		className: "app-card flex flex-col items-center gap-3 border-destructive/30 px-6 py-10 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-base font-bold text-destructive",
				children: "خطا در دریافت اطلاعات"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: message
			}),
			onRetry ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onRetry,
				className: "rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground",
				children: "تلاش دوباره"
			}) : null
		]
	});
}
function FilterChips({ value, onChange, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "scroll-x -mx-4 flex gap-2 px-4 pb-1 [scrollbar-width:none]",
		children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange(o.value),
			"aria-pressed": value === o.value,
			className: cn("shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-colors", value === o.value ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground hover:bg-accent/70"),
			children: o.label
		}, o.value))
	});
}
var toneColor = {
	success: "var(--success)",
	warning: "var(--warning)",
	danger: "var(--destructive)",
	info: "var(--info)",
	neutral: "var(--muted-foreground)",
	primary: "var(--primary)"
};
/** Sparkline decoration used along the bottom edge of the stat cards. */
function ToneSparkline() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 200 40",
		preserveAspectRatio: "none",
		"aria-hidden": "true",
		className: "pointer-events-none absolute inset-x-0 bottom-0 h-10 w-full opacity-60",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M0 34 C 22 34, 30 22, 48 24 S 78 34, 96 26 118 8, 140 14 168 30, 200 18",
			fill: "none",
			stroke: "var(--tone)",
			strokeWidth: "2",
			strokeLinecap: "round"
		})
	});
}
/** Splits «۲۴,۵۶۰,۰۰۰ تومان» into the number and its trailing unit word. */
function splitUnit(value) {
	const m = /^(.*?)\s+([^\s\d,،.]+)$/.exec(value.trim());
	if (m && m[1] && m[2]) return {
		num: m[1],
		unit: m[2]
	};
	return { num: value };
}
function StatCard({ icon, image, label, value, unit, tone = "info", to, search, hint }) {
	const parsed = unit ? {
		num: value,
		unit
	} : splitUnit(value);
	const body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: image,
			alt: "",
			"aria-hidden": "true",
			loading: "lazy",
			width: 512,
			height: 512,
			className: "pointer-events-none absolute -bottom-6 -start-6 size-52 object-contain opacity-[0.08] blur-[0.3px] sm:size-64"
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "tone-tile grid size-24 shrink-0 place-items-center rounded-[1.75rem] p-3 sm:size-28",
				children: image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: image,
					alt: "",
					"aria-hidden": "true",
					loading: "lazy",
					width: 512,
					height: 512,
					className: "size-full object-contain drop-shadow-md"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-on-hero",
					children: icon
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1 pt-0.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-sm font-bold text-muted-foreground sm:text-base",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1.5 flex flex-wrap items-baseline gap-x-1.5 leading-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "num text-[1.75rem] font-black tracking-tight break-words sm:text-[2.25rem]",
						children: parsed.num
					}), parsed.unit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-bold text-muted-foreground sm:text-sm",
						children: parsed.unit
					}) : null]
				})]
			})]
		}),
		hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "relative mt-4 truncate text-sm font-extrabold",
			style: { color: "var(--tone)" },
			children: hint
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 h-5" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToneSparkline, {})
	] });
	const style = { "--tone": toneColor[tone] };
	if (to) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		...search ? { search } : {},
		className: "tone-card block min-w-0 p-4 transition-transform active:scale-[0.98] sm:p-5",
		style,
		children: body
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "tone-card min-w-0 p-4 sm:p-5",
		style,
		children: body
	});
}
//#endregion
export { parseAmountInput as C, useNow as D, useIsOwner as E, money as S, toFa as T, faDateTime as _, Chip as a, faTime as b, FilterChips as c, Sheet as d, SheetContent as f, faDate as g, StatCard as h, AvatarImage as i, ListSkeleton as l, SheetTitle as m, Avatar as n, EmptyState as o, SheetHeader as p, AvatarFallback as r, ErrorState as s, AppShell as t, PageHeader as u, faDateTimeLong as v, relativeTime as w, formatAmountInput as x, faFullMoment as y };
