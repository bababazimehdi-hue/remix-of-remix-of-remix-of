import { r as __toESM } from "../_runtime.mjs";
import { D as Slot, N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as useRouter, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as __exportAll, r as createServerFn } from "./server-BIpwqx2E.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { Y as LoaderCircle, d as TriangleAlert } from "../_libs/lucide-react.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { D as cn, O as createSsrRpc, S as StoreProvider, h as Logo } from "./router-DkR-Q5N6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DkR-Q5N6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-c9HqhXgH.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
/**
* Public server function: reads the single `system_initialization` row.
* No authentication required — the table has a public SELECT policy.
*/
var readSystemInitialization = createServerFn({ method: "GET" }).handler(createSsrRpc("9e707a87e386ea86baaeb2893a0cfa65aa3ce3ab19f1d5b0530cc9aea86fba55"));
var currentService = {
	name: "cloud",
	async checkInitialization() {
		return await readSystemInitialization();
	},
	async initialize() {
		const { supabase } = await import("../_libs/_.mjs").then((n) => n.t);
		const { data, error } = await supabase.rpc("initialize_system");
		if (error) throw new Error(/ALREADY_INITIALIZED/i.test(error.message) ? "سامانه قبلاً راه‌اندازی شده است." : `نهایی‌سازی راه‌اندازی سامانه انجام نشد: ${error.message}`);
		return {
			initialized: Boolean(data),
			details: { source: "cloud" }
		};
	}
};
function getInitializationService() {
	return currentService;
}
var SystemInitContext = (0, import_react.createContext)(null);
function SystemInitProvider({ children, initialStatus = "CHECKING_INITIALIZATION" }) {
	const [status, setStatusState] = (0, import_react.useState)(initialStatus);
	const [error, setError] = (0, import_react.useState)(null);
	const setStatus = (0, import_react.useCallback)((next, nextError = null) => {
		setStatusState(next);
		setError(next === "INITIALIZATION_FAILED" ? nextError : null);
	}, []);
	const runCheck = (0, import_react.useCallback)(async (check) => {
		setStatus("CHECKING_INITIALIZATION");
		try {
			const initialized = check ? await check() : (await getInitializationService().checkInitialization()).initialized;
			setStatus(initialized ? "INITIALIZED" : "NOT_INITIALIZED");
		} catch (e) {
			setStatus("INITIALIZATION_FAILED", e instanceof Error ? e.message : "خطای نامشخص");
		}
	}, [setStatus]);
	const reset = (0, import_react.useCallback)(() => setStatus("CHECKING_INITIALIZATION"), [setStatus]);
	const value = (0, import_react.useMemo)(() => ({
		status,
		error,
		isChecking: status === "CHECKING_INITIALIZATION",
		isInitialized: status === "INITIALIZED",
		needsInitialization: status === "NOT_INITIALIZED",
		hasFailed: status === "INITIALIZATION_FAILED",
		setStatus,
		runCheck,
		reset
	}), [
		status,
		error,
		setStatus,
		runCheck,
		reset
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemInitContext.Provider, {
		value,
		children
	});
}
function useSystemInit() {
	const ctx = (0, import_react.useContext)(SystemInitContext);
	if (!ctx) throw new Error("useSystemInit must be used inside SystemInitProvider");
	return ctx;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
/**
* One-time, server-side setup of the default owner account.
*
* This replaces the visible first-run OWNER registration form. The default
* credentials are defined in `initial-owner.ts` and are the same as the legacy
* hardcoded local fallback user. After this runs, the login page is the only
* public entry point and users are created by the owner from inside the app.
*/
var ensureDefaultOwner = createServerFn({ method: "POST" }).handler(createSsrRpc("4ff13ba3940d11ea30e9d4f28a53f04e9ac96a0467ab1e34930865b95e2faea4"));
/**
* Renders the application only when the system is INITIALIZED.
*
* - CHECKING_INITIALIZATION: full-screen loading state
* - NOT_INITIALIZED: automatically seeds the default owner; no visible registration
* - INITIALIZATION_FAILED: error state with retry
* - INITIALIZED: children (the existing app)
*/
function SystemInitGate({ children }) {
	const { status, error, runCheck } = useSystemInit();
	const [autoInitRunning, setAutoInitRunning] = (0, import_react.useState)(false);
	const autoInitAttempted = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		console.log("[SystemInitGate] status changed:", status, "autoInitAttempted:", autoInitAttempted.current);
		if (status === "NOT_INITIALIZED" && !autoInitAttempted.current) {
			autoInitAttempted.current = true;
			setAutoInitRunning(true);
			console.log("[SystemInitGate] starting auto-init");
			ensureDefaultOwner().then((result) => {
				console.log("[SystemInitGate] auto-init succeeded:", result);
				return runCheck();
			}).catch((err) => {
				console.error("[SystemInitGate] auto-init failed:", err);
				return runCheck();
			}).finally(() => setAutoInitRunning(false));
		}
	}, [status, runCheck]);
	(0, import_react.useEffect)(() => {
		runCheck();
	}, [runCheck]);
	if (status === "CHECKING_INITIALIZATION" || autoInitRunning) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "safe-top safe-bottom flex min-h-dvh flex-col items-center justify-center gap-4 px-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "size-16 animate-pulse rounded-2xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-sm text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), "در حال آماده‌سازی سامانه…"]
		})]
	});
	if (status === "INITIALIZATION_FAILED") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "safe-top safe-bottom flex min-h-dvh flex-col items-center justify-center gap-4 px-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex size-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-8" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-md text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-xl",
					children: "خطا در بررسی سامانه"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: error ?? "امکان بررسی وضعیت راه‌اندازی سامانه وجود ندارد."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => void runCheck(),
					children: "تلاش دوباره"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => window.location.reload(),
					children: "بارگذاری مجدد"
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
/** Pages that behave as the app "home": pressing back there asks to exit. */
var HOME_PATHS = [
	"/",
	"/dashboard",
	"/tasks"
];
function isHome(pathname) {
	return HOME_PATHS.includes(pathname.replace(/\/+$/, "") || "/");
}
/**
* Makes the Android hardware back button behave like the in-app back button:
* it walks one step back in the app, and only leaves the app after the user
* confirms with a second press.
*/
function useBackButton() {
	const router = useRouter();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const pathRef = (0, import_react.useRef)(pathname);
	pathRef.current = pathname;
	const armedRef = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		let disposed = false;
		let removeNative = null;
		function askExit(exit) {
			const now = Date.now();
			if (now - armedRef.current < 2500) {
				armedRef.current = 0;
				exit();
				return;
			}
			armedRef.current = now;
			toast("برای خروج از برنامه، دوباره دکمه بازگشت را بزنید", {
				description: "یک بار دیگر بازگشت = خروج",
				duration: 2400
			});
		}
		(async () => {
			try {
				const mod = await import("../_libs/@capacitor/app+[...].mjs").then((n) => n.t);
				const { Capacitor } = await import("../_libs/@capacitor/app+[...].mjs").then((n) => n.n);
				if (disposed || !Capacitor.isNativePlatform()) return;
				const handle = await mod.App.addListener("backButton", () => {
					if (isHome(pathRef.current)) askExit(() => void mod.App.exitApp());
					else router.history.back();
				});
				if (disposed) handle.remove();
				else removeNative = () => void handle.remove();
			} catch {}
		})();
		if (typeof window !== "undefined") {
			window.history.pushState({ __exitGuard: true }, "");
			const onPop = () => {
				if (!isHome(pathRef.current)) return;
				window.history.pushState({ __exitGuard: true }, "");
				askExit(() => {
					window.history.go(-2);
				});
			};
			window.addEventListener("popstate", onPop);
			return () => {
				disposed = true;
				removeNative?.();
				window.removeEventListener("popstate", onPop);
			};
		}
		return () => {
			disposed = true;
			removeNative?.();
		};
	}, [router]);
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "۴۰۴"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold",
					children: "صفحه پیدا نشد"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "صفحه‌ای که دنبال آن هستید وجود ندارد یا جابه‌جا شده است."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "بازگشت به خانه"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight",
					children: "این صفحه بارگذاری نشد"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "مشکلی رخ داده است. می‌توانید دوباره تلاش کنید یا به خانه بازگردید."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
						children: "تلاش دوباره"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium",
						children: "بازگشت به خانه"
					})]
				})
			]
		})
	});
}
var Route$28 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{
				name: "theme-color",
				content: "#f5822a"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "default"
			},
			{
				name: "apple-mobile-web-app-title",
				content: "مدیریت تعمیرگاه"
			},
			{ title: "سامانه مدیریت فروشگاه و تعمیرگاه دوچرخه" },
			{
				name: "description",
				content: "ثبت خرید دوچرخه، هزینه‌ها، وظایف تعمیرکاران و فاکتورهای خرید با خروجی حسابداری و اعلان‌های آنی."
			},
			{
				property: "og:title",
				content: "سامانه مدیریت فروشگاه و تعمیرگاه دوچرخه"
			},
			{
				property: "og:description",
				content: "مدیریت هوشمند فروشگاه و تعمیرگاه دوچرخه، کاملاً فارسی و موبایل‌فرست."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700;800;900&family=Lalezar&display=swap"
			},
			{
				rel: "manifest",
				href: "/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/icons/icon-192.png"
			},
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "fa",
		dir: "rtl",
		className: "dark",
		style: { colorScheme: "dark" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$28.useRouteContext();
	useBackButton();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemInitProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemInitGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StoreProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			position: "top-center",
			dir: "rtl",
			richColors: true
		})] }) }) })
	});
}
var $$splitComponentImporter$27 = () => import("./routes-BggYrmAO.mjs");
var Route$27 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "ورود | سامانه مدیریت فروشگاه و تعمیرگاه دوچرخه" },
		{
			name: "description",
			content: "ورود کارکنان به سامانه مدیریت فروشگاه و تعمیرگاه دوچرخه با نام کاربری و رمز عبور."
		},
		{
			property: "og:title",
			content: "ورود به سامانه مدیریت تعمیرگاه دوچرخه"
		},
		{
			property: "og:description",
			content: "مدیریت هوشمند فروشگاه و تعمیرگاه دوچرخه، فارسی و موبایل‌فرست."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./account-CT6xPbgE.mjs");
var Route$26 = createFileRoute("/account")({
	head: () => ({ meta: [
		{ title: "تنظیمات کاربری | دز رکاب" },
		{
			name: "description",
			content: "تنظیمات شخصی حساب: پروفایل، ظاهر برنامه و اعلان‌های شما."
		},
		{
			property: "og:title",
			content: "تنظیمات کاربری دز رکاب"
		},
		{
			property: "og:description",
			content: "پروفایل، ظاهر و اعلان‌های شخصی خود را مدیریت کنید."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("./admin-Cno-dc_g.mjs");
var Route$25 = createFileRoute("/admin")({
	head: () => ({ meta: [
		{ title: "پنل پشتیبان | مدیریت تعمیرگاه دوچرخه" },
		{
			name: "description",
			content: "مرکز مدیریت کاربران، نقش‌ها، دسترسی‌ها، وظایف، دستمزدها، آلارم‌ها، گروه‌های گفتگو و تاریخچه فعالیت‌ها."
		},
		{
			property: "og:title",
			content: "پنل پشتیبان تعمیرگاه دوچرخه"
		},
		{
			property: "og:description",
			content: "کنترل کامل کاربران، دسترسی‌ها، دستمزدها و گزارش‌های تعمیرگاه در یک صفحه."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("./audit-DwIel3bA.mjs");
var Route$24 = createFileRoute("/audit")({
	head: () => ({ meta: [
		{ title: "تاریخچه و بازگردانی | مدیریت تعمیرگاه دوچرخه" },
		{
			name: "description",
			content: "تاریخچهٔ تغییرناپذیر همهٔ ثبت‌ها، ویرایش‌ها، تأییدها و بایگانی‌ها همراه با بازیابی رکوردها و بازگردانی وضعیت به مرحلهٔ قبل."
		},
		{
			property: "og:title",
			content: "تاریخچهٔ تغییرات و بازگردانی رکوردها"
		},
		{
			property: "og:description",
			content: "مشاهدهٔ کاربر، زمان تهران و مقدار قبل و بعد هر تغییر؛ بازیابی رکوردهای بایگانی‌شده."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./daily-reports-SanS6zek.mjs");
var Route$23 = createFileRoute("/daily-reports")({
	head: () => ({ meta: [
		{ title: "گزارش روزانه کارکنان | مدیریت تعمیرگاه دوچرخه" },
		{
			name: "description",
			content: "ثبت و مرور گزارش روزانه کارکنان و تکنسین‌ها: حقوق روزانه، پاداش، جریمه، عملکرد و یادداشت بر پایه تقویم تهران."
		},
		{
			property: "og:title",
			content: "گزارش روزانه کارکنان"
		},
		{
			property: "og:description",
			content: "گزارش روزانه، خلاصه تاریخی و جمع بازه زمانی برای کارکنان و تکنسین‌ها."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./dashboard-kZrDyx4k.mjs");
var Route$22 = createFileRoute("/dashboard")({
	head: () => ({ meta: [
		{ title: "داشبورد | مدیریت تعمیرگاه دوچرخه" },
		{
			name: "description",
			content: "نمای کلی امروز فروشگاه و تعمیرگاه: هزینه‌ها، خریدها، فاکتورها و وظایف فعال."
		},
		{
			property: "og:title",
			content: "داشبورد مدیریت تعمیرگاه دوچرخه"
		},
		{
			property: "og:description",
			content: "خلاصه وضعیت روزانه فروشگاه و تعمیرگاه دوچرخه."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./earnings-CAAwbpQG.mjs");
var Route$21 = createFileRoute("/earnings")({
	head: () => ({ meta: [
		{ title: "دستمزد و پاداش | مدیریت تعمیرگاه دوچرخه" },
		{
			name: "description",
			content: "گزارش دستمزد وظایف انجام‌شده، پاداش‌ها، جریمه‌ها و مجموع درآمد هر کارمند."
		},
		{
			property: "og:title",
			content: "دستمزد و پاداش کارمندان تعمیرگاه"
		},
		{
			property: "og:description",
			content: "مشاهده دقیق دستمزد، پاداش و جریمه با تاریخ و ساعت شمسی."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./exports-CeJyRegX.mjs");
var Route$20 = createFileRoute("/exports")({
	head: () => ({ meta: [
		{ title: "خروجی حسابداری | مدیریت تعمیرگاه" },
		{
			name: "description",
			content: "تهیه خروجی CSV، Excel و JSON از خریدها، هزینه‌ها، دستمزدها و فاکتورهای نهایی."
		},
		{
			property: "og:title",
			content: "خروجی‌های حسابداری تعمیرگاه"
		},
		{
			property: "og:description",
			content: "انتقال داده‌های مالی به نرم‌افزار حسابداری اصلی."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./inventory-BbVJYKjP.mjs");
var Route$19 = createFileRoute("/inventory")({
	head: () => ({ meta: [
		{ title: "دوچرخه‌ها | مدیریت تعمیرگاه" },
		{
			name: "description",
			content: "مشاهده همه دوچرخه‌های خریداری‌شده به تفکیک سایز و دسته‌بندی و ارسال هر دوچرخه برای تعمیر."
		},
		{
			property: "og:title",
			content: "دوچرخه‌ها"
		},
		{
			property: "og:description",
			content: "تعداد، سایز و دسته‌بندی دوچرخه‌ها و ارجاع آن‌ها به تعمیرکار."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./messages-58Ff5KR4.mjs");
var Route$18 = createFileRoute("/messages")({
	head: () => ({ meta: [
		{ title: "پیام‌رسان داخلی | مدیریت تعمیرگاه دوچرخه" },
		{
			name: "description",
			content: "گفت‌وگوی گروهی و خصوصی کارکنان فروشگاه و تعمیرگاه با ارسال عکس، ویدیو، فایل و ویس."
		},
		{
			property: "og:title",
			content: "پیام‌رسان داخلی تعمیرگاه دوچرخه"
		},
		{
			property: "og:description",
			content: "ارتباط سریع تیم فروشگاه و تعمیرگاه در یک پیام‌رسان امن."
		}
	] }),
	validateSearch: (s) => ({ c: typeof s["c"] === "string" ? s["c"] : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./notifications-BuzAKE9F.mjs");
var Route$17 = createFileRoute("/notifications")({
	head: () => ({ meta: [
		{ title: "مرکز اعلان‌ها | مدیریت تعمیرگاه دوچرخه" },
		{
			name: "description",
			content: "اعلان‌های خرید، هزینه، وظایف و فاکتورها با امکان خواندن و مراجعه به صفحه مرتبط."
		},
		{
			property: "og:title",
			content: "مرکز اعلان‌های تعمیرگاه دوچرخه"
		},
		{
			property: "og:description",
			content: "پیگیری آنی رویدادهای فروشگاه و تعمیرگاه."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./permissions-D4Ia6TtP.mjs");
var Route$16 = createFileRoute("/permissions")({
	head: () => ({ meta: [
		{ title: "تغییر دسترسی کاربران | مدیریت تعمیرگاه دوچرخه" },
		{
			name: "description",
			content: "پشتیبان می‌تواند دسترسی هر شخص به مدیریت فروشگاه، فروش، وظایف، دستمزدها، آلارم‌ها، چت‌ها، گزارش‌ها و تنظیمات را فعال یا غیرفعال کند."
		},
		{
			property: "og:title",
			content: "تغییر دسترسی کاربران تعمیرگاه دوچرخه"
		},
		{
			property: "og:description",
			content: "کنترل دقیق دسترسی هر پرسنل توسط پشتیبان، با ثبت لحظه‌ای تاریخ و ساعت شمسی."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./repaired-bikes-Dg9niJgH.mjs");
var Route$15 = createFileRoute("/repaired-bikes")({
	head: () => ({ meta: [
		{ title: "دوچرخه‌های تعمیر شده | مدیریت تعمیرگاه" },
		{
			name: "description",
			content: "فهرست دوچرخه‌هایی که تعمیرشان نهایی شده و از حساب دوچرخه‌های خریداری‌شده خارج شده‌اند."
		},
		{
			property: "og:title",
			content: "دوچرخه‌های تعمیر شده"
		},
		{
			property: "og:description",
			content: "دوچرخه‌های تعمیرشده به همراه دستمزد ثبت‌شده تعمیرکار."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./reports-CLvJMk4m.mjs");
var Route$14 = createFileRoute("/reports")({
	head: () => ({ meta: [
		{ title: "گزارش و تحلیل | مدیریت تعمیرگاه دوچرخه" },
		{
			name: "description",
			content: "تحلیل هزینه‌ها، خریدها و دستمزدها در بازه امروز، هفته، ماه و سال گذشته."
		},
		{
			property: "og:title",
			content: "گزارش و تحلیل فروشگاه و تعمیرگاه دوچرخه"
		},
		{
			property: "og:description",
			content: "نمودار سهم هر دسته هزینه با تاریخ شمسی دقیق."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./settings-BDVw43qQ.mjs");
var Route$13 = createFileRoute("/settings")({
	head: () => ({ meta: [
		{ title: "تنظیمات سامانه | مدیریت تعمیرگاه" },
		{
			name: "description",
			content: "تنظیم تم روز و شب، بازهٔ آلارم، واحد پول و خروجی حسابداری."
		},
		{
			property: "og:title",
			content: "تنظیمات سامانه تعمیرگاه دوچرخه"
		},
		{
			property: "og:description",
			content: "پیکربندی تم، آلارم‌ها، واحد پول و خروجی حسابداری."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./users-C1VfUhWs.mjs");
var Route$12 = createFileRoute("/users")({
	head: () => ({ meta: [
		{ title: "مدیریت کاربران و نقش‌ها | مدیریت تعمیرگاه" },
		{
			name: "description",
			content: "افزودن، ویرایش، غیرفعال‌سازی و آرشیو کاربران همراه با تعریف نقش‌ها و دسترسی‌های دلخواه."
		},
		{
			property: "og:title",
			content: "مدیریت کاربران و دسترسی‌های تعمیرگاه دوچرخه"
		},
		{
			property: "og:description",
			content: "کنترل کامل نقش‌ها، دسترسی‌ها و وضعیت هر کاربر توسط پشتیبان."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
/** Toggle row used for both user overrides and custom role definitions. */
/** Definition of the admin's own roles, each with a fixed access map. */
var $$splitComponentImporter$11 = () => import("./bicycle-purchases-voHSIPiM.mjs");
var Route$11 = createFileRoute("/bicycle-purchases/")({
	head: () => ({ meta: [
		{ title: "خریدهای دوچرخه | مدیریت تعمیرگاه" },
		{
			name: "description",
			content: "لیست خریدهای دوچرخه با جستجو، فیلتر وضعیت و جزئیات کامل هر خرید."
		},
		{
			property: "og:title",
			content: "لیست خریدهای دوچرخه"
		},
		{
			property: "og:description",
			content: "پیگیری خریدهای ثبت‌شده و وضعیت تأیید آن‌ها."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("../_id-qVxKu3hE.mjs");
var Route$10 = createFileRoute("/bicycle-purchases/$id")({
	head: () => ({ meta: [
		{ title: "جزئیات خرید دوچرخه | مدیریت تعمیرگاه" },
		{
			name: "description",
			content: "مشاهده جزئیات، تأیید، رد و ثبت حسابداری خرید دوچرخه."
		},
		{
			property: "og:title",
			content: "جزئیات خرید دوچرخه"
		},
		{
			property: "og:description",
			content: "وضعیت، ثبت‌کننده و اقدامات مدیریتی خرید دوچرخه."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
/** Repair history for one bike: service, mechanic, wage, status and date. */
var $$splitComponentImporter$9 = () => import("./new-DCnX-Jxb.mjs");
var Route$9 = createFileRoute("/bicycle-purchases/new")({
	head: () => ({ meta: [
		{ title: "ثبت خرید دوچرخه | مدیریت تعمیرگاه" },
		{
			name: "description",
			content: "فرم ثبت خرید دوچرخه شامل برند، سایز، رنگ، نوع و قیمت خرید."
		},
		{
			property: "og:title",
			content: "ثبت خرید دوچرخه جدید"
		},
		{
			property: "og:description",
			content: "ثبت سریع خرید دوچرخه در سامانه تعمیرگاه."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./expenses-BZUC23nj.mjs");
var RANGE_OPTIONS = [
	{
		value: "TODAY",
		label: "امروز"
	},
	{
		value: "WEEK",
		label: "هفته گذشته"
	},
	{
		value: "MONTH",
		label: "ماه گذشته"
	},
	{
		value: "YEAR",
		label: "امسال"
	},
	{
		value: "ALL",
		label: "همه"
	}
];
function inRange(iso, range) {
	if (range === "ALL") return true;
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return false;
	const now = /* @__PURE__ */ new Date();
	if (range === "TODAY") return d.toDateString() === now.toDateString();
	const days = range === "WEEK" ? 7 : range === "MONTH" ? 30 : 365;
	return now.getTime() - d.getTime() <= days * 864e5;
}
var Route$8 = createFileRoute("/expenses/")({
	validateSearch: (s) => ({ range: [
		"TODAY",
		"WEEK",
		"MONTH",
		"YEAR",
		"ALL"
	].includes(s["range"]) ? s["range"] : "ALL" }),
	head: () => ({ meta: [
		{ title: "مدیریت هزینه‌ها | مدیریت تعمیرگاه" },
		{
			name: "description",
			content: "ثبت و پیگیری هزینه‌ها، حقوق، پاداش، جریمه و برداشت شخصی."
		},
		{
			property: "og:title",
			content: "مدیریت هزینه‌های تعمیرگاه دوچرخه"
		},
		{
			property: "og:description",
			content: "خلاصه ماهانه و لیست کامل هزینه‌های ثبت‌شده."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./new-CACRhMgg.mjs");
var Route$7 = createFileRoute("/expenses/new")({
	validateSearch: (search) => ({ category: search["category"] || void 0 }),
	head: () => ({ meta: [
		{ title: "ثبت هزینه | مدیریت تعمیرگاه" },
		{
			name: "description",
			content: "فرم ثبت هزینه با دسته‌بندی، مبلغ، تاریخ شمسی و توضیحات."
		},
		{
			property: "og:title",
			content: "ثبت هزینه جدید"
		},
		{
			property: "og:description",
			content: "ثبت سریع هزینه‌های فروشگاه و تعمیرگاه دوچرخه."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./people.index-CiauxU4e.mjs");
var Route$6 = createFileRoute("/people/")({
	head: () => ({ meta: [
		{ title: "معرفی اشخاص | پنل پشتیبان تعمیرگاه" },
		{
			name: "description",
			content: "ساخت حساب کاربری برای هر شخص با نام کاربری، رمز عبور، پست، توضیحات، وضعیت و سازمان؛ ویرایش، غیرفعال‌سازی، آرشیو و بازگردانی."
		},
		{
			property: "og:title",
			content: "معرفی اشخاص و ساخت حساب کاربری"
		},
		{
			property: "og:description",
			content: "پشتیبان برای هر شخص نام کاربری و رمز عبور می‌سازد و پست و دسترسی او را تعیین می‌کند."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./people._id-D0KBpjfR.mjs");
var Route$5 = createFileRoute("/people/$id")({
	head: () => ({ meta: [
		{ title: "پروندهٔ شخص | معرفی اشخاص" },
		{
			name: "description",
			content: "نمایش پست پایه، وضعیت، سازمان و تمام دسترسی‌های نهایی یک شخص در سامانه."
		},
		{
			property: "og:title",
			content: "پروندهٔ شخص و دسترسی‌های نهایی"
		},
		{
			property: "og:description",
			content: "پست پایه به‌همراه دسترسی‌های دستی افزوده‌شده، در یک نگاه."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./purchase-invoices-i6Q9epvB.mjs");
var Route$4 = createFileRoute("/purchase-invoices/")({
	head: () => ({ meta: [
		{ title: "فاکتورهای خرید | مدیریت تعمیرگاه" },
		{
			name: "description",
			content: "پیش‌فاکتورها و فاکتورهای خرید با وضعیت خرید، نهایی‌سازی و ثبت حسابداری."
		},
		{
			property: "og:title",
			content: "فاکتورهای خرید تعمیرگاه دوچرخه"
		},
		{
			property: "og:description",
			content: "پیگیری پیش‌فاکتور تا ثبت نهایی در حسابداری."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("../_id-CbW1xNN1.mjs");
var Route$3 = createFileRoute("/purchase-invoices/$id")({
	head: () => ({ meta: [
		{ title: "جزئیات فاکتور خرید | مدیریت تعمیرگاه" },
		{
			name: "description",
			content: "ثبت تعداد و قیمت نهایی اقلام، مشاهده تفاوت قیمت و نهایی‌سازی فاکتور خرید."
		},
		{
			property: "og:title",
			content: "جزئیات فاکتور خرید"
		},
		{
			property: "og:description",
			content: "خلاصه مالی و نهایی‌سازی فاکتور خرید تعمیرگاه."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./new-BBKgLHPo.mjs");
var Route$2 = createFileRoute("/purchase-invoices/new")({
	head: () => ({ meta: [
		{ title: "ایجاد پیش‌فاکتور خرید | مدیریت تعمیرگاه" },
		{
			name: "description",
			content: "ثبت پیش‌فاکتور خرید با چند آیتم، تعداد و قیمت احتمالی."
		},
		{
			property: "og:title",
			content: "ایجاد پیش‌فاکتور خرید"
		},
		{
			property: "og:description",
			content: "ثبت اقلام خرید پیش از خرید واقعی."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./tasks-Zz_0oJw4.mjs");
var Route$1 = createFileRoute("/tasks/")({
	head: () => ({ meta: [
		{ title: "وظایف تعمیرکاران | مدیریت تعمیرگاه" },
		{
			name: "description",
			content: "تعریف وظیفه برای تعمیرکاران، پیگیری وضعیت، دستمزد و تأیید کارهای انجام‌شده."
		},
		{
			property: "og:title",
			content: "مدیریت وظایف تعمیرکاران"
		},
		{
			property: "og:description",
			content: "کارهای در حال انجام و محول‌شده تعمیرگاه دوچرخه."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_id-GI3--VjD.mjs");
var Route = createFileRoute("/tasks/$id")({
	head: () => ({ meta: [
		{ title: "جزئیات وظیفه | مدیریت تعمیرگاه" },
		{
			name: "description",
			content: "تغییر وضعیت وظیفه، ثبت انجام کار با عکس، تأیید یا رد توسط مدیر."
		},
		{
			property: "og:title",
			content: "جزئیات وظیفه تعمیرکار"
		},
		{
			property: "og:description",
			content: "پیگیری کامل یک وظیفه تعمیرگاه دوچرخه."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$27.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$28
});
var AccountRoute = Route$26.update({
	id: "/account",
	path: "/account",
	getParentRoute: () => Route$28
});
var AdminRoute = Route$25.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$28
});
var AuditRoute = Route$24.update({
	id: "/audit",
	path: "/audit",
	getParentRoute: () => Route$28
});
var DailyReportsRoute = Route$23.update({
	id: "/daily-reports",
	path: "/daily-reports",
	getParentRoute: () => Route$28
});
var DashboardRoute = Route$22.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$28
});
var EarningsRoute = Route$21.update({
	id: "/earnings",
	path: "/earnings",
	getParentRoute: () => Route$28
});
var ExportsRoute = Route$20.update({
	id: "/exports",
	path: "/exports",
	getParentRoute: () => Route$28
});
var InventoryRoute = Route$19.update({
	id: "/inventory",
	path: "/inventory",
	getParentRoute: () => Route$28
});
var MessagesRoute = Route$18.update({
	id: "/messages",
	path: "/messages",
	getParentRoute: () => Route$28
});
var NotificationsRoute = Route$17.update({
	id: "/notifications",
	path: "/notifications",
	getParentRoute: () => Route$28
});
var PermissionsRoute = Route$16.update({
	id: "/permissions",
	path: "/permissions",
	getParentRoute: () => Route$28
});
var RepairedBikesRoute = Route$15.update({
	id: "/repaired-bikes",
	path: "/repaired-bikes",
	getParentRoute: () => Route$28
});
var ReportsRoute = Route$14.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => Route$28
});
var SettingsRoute = Route$13.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => Route$28
});
var UsersRoute = Route$12.update({
	id: "/users",
	path: "/users",
	getParentRoute: () => Route$28
});
var BicyclePurchasesIndexRoute = Route$11.update({
	id: "/bicycle-purchases/",
	path: "/bicycle-purchases/",
	getParentRoute: () => Route$28
});
var BicyclePurchasesIdRoute = Route$10.update({
	id: "/bicycle-purchases/$id",
	path: "/bicycle-purchases/$id",
	getParentRoute: () => Route$28
});
var BicyclePurchasesNewRoute = Route$9.update({
	id: "/bicycle-purchases/new",
	path: "/bicycle-purchases/new",
	getParentRoute: () => Route$28
});
var ExpensesIndexRoute = Route$8.update({
	id: "/expenses/",
	path: "/expenses/",
	getParentRoute: () => Route$28
});
var ExpensesNewRoute = Route$7.update({
	id: "/expenses/new",
	path: "/expenses/new",
	getParentRoute: () => Route$28
});
var PeopleIndexRoute = Route$6.update({
	id: "/people/",
	path: "/people/",
	getParentRoute: () => Route$28
});
var PeopleIdRoute = Route$5.update({
	id: "/people/$id",
	path: "/people/$id",
	getParentRoute: () => Route$28
});
var PurchaseInvoicesIndexRoute = Route$4.update({
	id: "/purchase-invoices/",
	path: "/purchase-invoices/",
	getParentRoute: () => Route$28
});
var PurchaseInvoicesIdRoute = Route$3.update({
	id: "/purchase-invoices/$id",
	path: "/purchase-invoices/$id",
	getParentRoute: () => Route$28
});
var PurchaseInvoicesNewRoute = Route$2.update({
	id: "/purchase-invoices/new",
	path: "/purchase-invoices/new",
	getParentRoute: () => Route$28
});
var TasksIndexRoute = Route$1.update({
	id: "/tasks/",
	path: "/tasks/",
	getParentRoute: () => Route$28
});
var rootRouteChildren = {
	IndexRoute,
	AccountRoute,
	AdminRoute,
	AuditRoute,
	DailyReportsRoute,
	DashboardRoute,
	EarningsRoute,
	ExportsRoute,
	InventoryRoute,
	MessagesRoute,
	NotificationsRoute,
	PermissionsRoute,
	RepairedBikesRoute,
	ReportsRoute,
	SettingsRoute,
	UsersRoute,
	BicyclePurchasesIdRoute,
	BicyclePurchasesNewRoute,
	ExpensesNewRoute,
	PeopleIdRoute,
	PurchaseInvoicesIdRoute,
	PurchaseInvoicesNewRoute,
	TasksIdRoute: Route.update({
		id: "/tasks/$id",
		path: "/tasks/$id",
		getParentRoute: () => Route$28
	}),
	BicyclePurchasesIndexRoute,
	ExpensesIndexRoute,
	PeopleIndexRoute,
	PurchaseInvoicesIndexRoute,
	TasksIndexRoute
};
var routeTree = Route$28._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { buttonVariants as a, router_exports as c, Route$8 as i, RANGE_OPTIONS as n, getRouter as o, Route$18 as r, inRange as s, Button as t };
