import { r as __toESM } from "../_runtime.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as Radio, D as RotateCcw, F as Pencil, K as LogOut, Mt as Bell, O as RefreshCw, P as PlugZap, R as Palette, S as Settings, V as Moon, X as KeyRound, Y as LoaderCircle, Z as Image, b as ShieldCheck, c as UserPlus, d as TriangleAlert, dt as Copy, ft as Coins, g as Sun, h as TableProperties, l as Upload, mt as Cloud, o as Users, ot as Eye, r as WifiOff, st as EyeOff, ut as Database, xt as CircleCheck, yt as CircleX, zt as AlarmClock } from "../_libs/lucide-react.mjs";
import { E as useIsOwner, T as toFa, _ as faDateTime, a as Chip, o as EmptyState, t as AppShell, u as PageHeader } from "./ui-kit-B64qXDLa.mjs";
import { r as Field, s as SelectField } from "./fields-ESZmE-g5.mjs";
import { D as cn, J as uid, M as formatJalaliDateTime, T as can, W as playAlarmSound, Y as useStore, c as DEFAULT_ALARM_EVENTS, m as LEVEL_LABEL, n as ALARM_EVENT_KEYS, q as roleTitle, r as ALARM_EVENT_LABEL, w as buildVibratePattern, x as ROLE_LABEL, y as POSITIONS } from "./router-DkR-Q5N6.mjs";
import { t as Button } from "./router-DkR-Q5N62.mjs";
import { t as compressImage } from "./images-B5GrQKOY.mjs";
import { t as Switch } from "./switch-DG9Pr8pj.mjs";
import { a as saveBackendOverride, i as readBackendOverride, n as envBackendConfigProvider, r as getBackendConfig, t as clearBackendOverride } from "./backend-config-BpvzyDUj.mjs";
import { t as PermissionsManager } from "./PermissionsManager-DNziI0vH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-BDVw43qQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMPTY = {
	fullName: "",
	username: "",
	password: "",
	title: "",
	phone: "",
	bio: "",
	role: "EMPLOYEE",
	customRole: ""
};
function PeopleIntroSection() {
	const { state, setState, user, log } = useStore();
	const [form, setForm] = (0, import_react.useState)(EMPTY);
	const customRoles = state.customRoles ?? [];
	const levelOptions = (0, import_react.useMemo)(() => [...POSITIONS.map((r) => ({
		value: r,
		label: ROLE_LABEL[r]
	})), ...customRoles.map((r) => ({
		value: `custom:${r.name}`,
		label: `${r.name} (دلخواه)`
	}))], [customRoles]);
	const recent = (0, import_react.useMemo)(() => [...state.users].slice(-6).reverse(), [state.users]);
	if (!can(user, "users")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-6" }),
		title: "دسترسی ندارید",
		description: "بخش معرفی اشخاص فقط برای پشتیبان در دسترس است."
	});
	function pickLevel(value) {
		if (!value.startsWith("custom:")) {
			setForm((f) => ({
				...f,
				role: value,
				customRole: ""
			}));
			return;
		}
		const name = value.slice(7);
		const role = customRoles.find((r) => r.name === name);
		if (!role) return;
		setForm((f) => ({
			...f,
			role: role.baseRole,
			customRole: role.name
		}));
	}
	function submit(e) {
		e.preventDefault();
		const username = form.username.trim();
		const password = form.password.trim();
		if (!username) {
			toast.error("نام کاربری اجباری است.");
			return;
		}
		if (password.length < 4) {
			toast.error("رمز عبور باید حداقل ۴ کاراکتر باشد.");
			return;
		}
		if (!form.title.trim()) {
			toast.error("سمت شخص را وارد کنید.");
			return;
		}
		if (state.users.some((u) => u.username.trim().toLowerCase() === username.toLowerCase())) {
			toast.error("این نام کاربری قبلاً استفاده شده است.");
			return;
		}
		const permissions = form.customRole ? { ...customRoles.find((r) => r.name === form.customRole)?.permissions ?? {} } : {};
		const id = uid("u");
		setState((s) => ({
			...s,
			users: [...s.users, {
				id,
				fullName: form.fullName.trim() || username,
				username,
				password,
				phone: form.phone.trim(),
				title: form.title.trim(),
				bio: form.bio.trim(),
				role: form.role,
				...form.customRole ? { customRole: form.customRole } : {},
				isActive: true,
				isArchived: false,
				isWorker: form.role === "MECHANIC",
				permissions
			}]
		}));
		log({
			entity: "user",
			recordId: id,
			action: "معرفی شخص جدید و ساخت حساب کاربری",
			note: `${form.fullName.trim() || username} — ${form.customRole || ROLE_LABEL[form.role]}`
		});
		setForm(EMPTY);
		toast.success("شخص معرفی شد؛ می‌تواند با همین نام کاربری و رمز عبور وارد شود.");
	}
	const levelValue = form.customRole ? `custom:${form.customRole}` : form.role;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "app-card grid gap-4 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "p-username",
					label: "نام کاربری",
					required: true,
					value: form.username,
					onChange: (v) => setForm((f) => ({
						...f,
						username: v
					})),
					placeholder: "مثال: reza"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "p-password",
					label: "رمز عبور",
					required: true,
					value: form.password,
					onChange: (v) => setForm((f) => ({
						...f,
						password: v
					})),
					placeholder: "حداقل ۴ کاراکتر"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "p-fullname",
					label: "نام و نام خانوادگی (اختیاری)",
					value: form.fullName,
					onChange: (v) => setForm((f) => ({
						...f,
						fullName: v
					}))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "p-title",
					label: "پست یا سمت",
					required: true,
					value: form.title,
					onChange: (v) => setForm((f) => ({
						...f,
						title: v
					})),
					placeholder: "مثال: مسئول فروش"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "p-phone",
					label: "شماره تماس (اختیاری)",
					type: "tel",
					value: form.phone,
					onChange: (v) => setForm((f) => ({
						...f,
						phone: v
					})),
					placeholder: "۰۹۱۲۳۴۵۶۷۸۹"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "p-bio",
						className: "block text-sm font-bold",
						children: "اطلاعاتی راجع به کاربر (اختیاری)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						id: "p-bio",
						rows: 3,
						value: form.bio,
						onChange: (e) => setForm((f) => ({
							...f,
							bio: e.target.value
						})),
						placeholder: "توضیح دلخواه دربارهٔ این شخص",
						className: "w-full rounded-xl border bg-card p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
					id: "p-level",
					label: "سطح کاربر",
					required: true,
					value: levelValue,
					onChange: pickLevel,
					options: levelOptions
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-start gap-2 rounded-xl bg-accent p-3 text-xs font-bold text-accent-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "mt-0.5 size-4 shrink-0" }), "دسترسی‌های دقیق این شخص را بعد از ساخت حساب، از بخش «تغییر دسترسی کاربران» تنظیم کنید."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "submit",
					className: "flex h-12 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-primary-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-4" }), " ثبت و ساخت حساب"]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 mt-6 text-sm font-extrabold text-muted-foreground",
			children: "آخرین اشخاص معرفی‌شده"
		}),
		recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-6" }),
			title: "هنوز شخصی معرفی نشده",
			description: "با فرم بالا اولین حساب کاربری را بسازید."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-3 sm:grid-cols-2",
			children: recent.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "app-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "min-w-0 flex-1 truncate font-extrabold",
							children: u.fullName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							tone: u.role === "ADMIN" ? "success" : "neutral",
							children: roleTitle(u)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 truncate text-xs text-muted-foreground",
						children: [
							u.title || "بدون سمت",
							" — ",
							u.username
						]
					}),
					u.bio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: u.bio
					}) : null
				]
			}, u.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 text-center text-xs text-muted-foreground",
			children: ["آخرین بروزرسانی: ", faDateTime(/* @__PURE__ */ new Date())]
		})
	] });
}
var LABEL = {
	login: "بنر صفحهٔ ورود",
	app: "بنر بالای صفحات داخل برنامه"
};
/** Lets the main admin replace both banner pictures of the app. */
function BannerSettings() {
	const { state, setState } = useStore();
	const banners = state.banners ?? {
		login: "",
		app: ""
	};
	const [busy, setBusy] = (0, import_react.useState)(null);
	const inputs = {
		login: (0, import_react.useRef)(null),
		app: (0, import_react.useRef)(null)
	};
	function update(slot, value) {
		setState((s) => ({
			...s,
			banners: {
				...s.banners ?? {
					login: "",
					app: ""
				},
				[slot]: value
			}
		}));
	}
	async function pick(slot, file) {
		if (!file) return;
		setBusy(slot);
		try {
			update(slot, await compressImage(file, 1600, .8));
			toast.success(`${LABEL[slot]} تغییر کرد`);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "تغییر تصویر ممکن نشد.");
		} finally {
			setBusy(null);
			if (inputs[slot].current) inputs[slot].current.value = "";
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "app-card mb-4 p-4 sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mb-1 flex items-center gap-2 font-extrabold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-5 text-primary" }), " تصاویر بنر برنامه"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 text-xs leading-6 text-muted-foreground",
				children: "هر دو بنر (صفحهٔ ورود و بالای صفحات داخل برنامه) را می‌توانید با عکس دلخواه خود عوض کنید؛ تصویر برای همهٔ کاربران روی همهٔ دستگاه‌ها ذخیره می‌شود."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: ["login", "app"].map((slot) => {
					const current = banners[slot] || (slot === "app" ? banners.login : "") || "/assets/login-banner-C34myJHx.jpg";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm font-bold",
								children: LABEL[slot]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative aspect-[2/1] w-full overflow-hidden rounded-xl border bg-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: current,
									alt: LABEL[slot],
									className: "absolute inset-0 size-full object-cover"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: inputs[slot],
								type: "file",
								accept: "image/*",
								className: "hidden",
								onChange: (e) => void pick(slot, e.target.files?.[0] ?? null)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										disabled: busy === slot,
										onClick: () => inputs[slot].current?.click(),
										className: "flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground disabled:opacity-60",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), busy === slot ? "در حال آماده‌سازی..." : "انتخاب عکس"]
									}),
									slot === "app" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											update("app", banners.login || "");
											toast.success("بنر داخل برنامه مانند بنر ورود شد");
										},
										className: "flex items-center gap-1 rounded-full border px-4 py-2 text-xs font-bold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), " مانند بنر ورود"]
									}) : null,
									banners[slot] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											update(slot, "");
											toast.success("تصویر پیش‌فرض بازگردانده شد");
										},
										className: "flex items-center gap-1 rounded-full border px-4 py-2 text-xs font-bold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), " تصویر پیش‌فرض"]
									}) : null
								]
							})
						]
					}, slot);
				})
			})
		]
	});
}
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var HEALTH_LABEL = {
	unknown: "بررسی نشده",
	checking: "در حال بررسی…",
	ok: "سالم",
	failed: "خطا"
};
function HealthPill({ state }) {
	const tone = state === "ok" ? "bg-primary/10 text-primary" : state === "failed" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground";
	const Icon = state === "ok" ? CircleCheck : state === "failed" ? CircleX : LoaderCircle;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold ${tone}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `size-4 ${state === "checking" ? "animate-spin" : ""}` }), HEALTH_LABEL[state]]
	});
}
function HealthRow({ icon: Icon, title, hint, state }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-muted/30 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 items-center gap-2.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-9 shrink-0 place-items-center rounded-lg bg-background text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4.5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "truncate text-sm font-bold",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "truncate text-[11px] text-muted-foreground",
					children: hint
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthPill, { state })]
	});
}
var LAST_SYNC_KEY = "cloud-connection-last-sync";
/**
* OWNER-only «اتصال ابری و همگام‌سازی» panel.
*
* Configuration is read from (and written back to) the existing backend-config
* layer: the connected Lovable Cloud project is the default, and the owner can
* store an override which is only accepted after a *real* connection test
* (database reachability + auth health + realtime handshake). No database table
* is created or modified here, and service role keys / database passwords are
* never read, stored or displayed.
*
* Live sync keeps using the existing realtime layer (`resync` from the store):
* reconnect, deduplication and resync behaviour are untouched — the buttons
* below only re-trigger that same machinery, with no reload and no polling.
*/
function CloudConnectionSettings() {
	const { syncStatus, resync } = useStore();
	const { isOwner, loading: ownerLoading } = useIsOwner();
	const [url, setUrl] = (0, import_react.useState)("");
	const [key, setKey] = (0, import_react.useState)("");
	const [source, setSource] = (0, import_react.useState)("env");
	const [showKey, setShowKey] = (0, import_react.useState)(false);
	const [db, setDb] = (0, import_react.useState)("unknown");
	const [auth, setAuth] = (0, import_react.useState)("unknown");
	const [realtime, setRealtime] = (0, import_react.useState)("unknown");
	const [lastSync, setLastSync] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const config = getBackendConfig();
		setUrl(config.backendUrl);
		setKey(config.publicApiKey);
		setSource(config.source);
		setLastSync(readBackendOverride()?.checkedAt ?? localStorage.getItem(LAST_SYNC_KEY));
	}, []);
	const rememberSync = (0, import_react.useCallback)((iso) => {
		setLastSync(iso);
		try {
			localStorage.setItem(LAST_SYNC_KEY, iso);
		} catch {}
	}, []);
	/** Overall banner state: connection health + live sync state of the app. */
	const overall = (0, import_react.useMemo)(() => {
		if (error) return {
			label: "خطا در اتصال",
			tone: "bg-destructive/10 text-destructive",
			Icon: TriangleAlert,
			spin: false
		};
		if (busy) return {
			label: "در حال اتصال…",
			tone: "bg-muted text-muted-foreground",
			Icon: LoaderCircle,
			spin: true
		};
		if (syncStatus === "live") return {
			label: "متصل و همگام",
			tone: "bg-primary/10 text-primary",
			Icon: CircleCheck,
			spin: false
		};
		if (syncStatus === "connecting") return {
			label: "در حال اتصال…",
			tone: "bg-muted text-muted-foreground",
			Icon: LoaderCircle,
			spin: true
		};
		if (syncStatus === "reconnecting") return {
			label: "در حال اتصال مجدد…",
			tone: "bg-amber-500/10 text-amber-600",
			Icon: RefreshCw,
			spin: true
		};
		return {
			label: "آفلاین",
			tone: "bg-muted text-muted-foreground",
			Icon: WifiOff,
			spin: false
		};
	}, [
		busy,
		error,
		syncStatus
	]);
	/** Real connection test: database reachability + auth health + realtime handshake. */
	const test = (0, import_react.useCallback)(async (testUrl, testKey) => {
		setError(null);
		setDb("checking");
		setAuth("checking");
		setRealtime("checking");
		const client = createClient(testUrl, testKey, {
			auth: {
				persistSession: false,
				autoRefreshToken: false
			},
			global: { fetch: (input, init) => {
				const headers = new Headers(init?.headers);
				if (headers.get("Authorization") === `Bearer ${testKey}`) headers.delete("Authorization");
				headers.set("apikey", testKey);
				return fetch(input, {
					...init,
					headers
				});
			} }
		});
		let dbOk = false;
		try {
			const { error: dbError } = await client.from("system_initialization").select("is_initialized").maybeSingle();
			dbOk = !dbError || [
				"PGRST116",
				"PGRST205",
				"42P01",
				"42501"
			].includes(dbError.code ?? "");
		} catch {
			dbOk = false;
		}
		setDb(dbOk ? "ok" : "failed");
		let authOk = false;
		try {
			authOk = (await fetch(`${testUrl.replace(/\/+$/, "")}/auth/v1/health`, { headers: { apikey: testKey } })).ok;
		} catch {
			authOk = false;
		}
		setAuth(authOk ? "ok" : "failed");
		const realtimeOk = await new Promise((resolve) => {
			const channel = client.channel(`connection-test-${Date.now()}`);
			const timer = setTimeout(() => {
				client.removeChannel(channel);
				resolve(false);
			}, 8e3);
			channel.subscribe((status) => {
				if (status === "SUBSCRIBED" || status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
					clearTimeout(timer);
					client.removeChannel(channel);
					resolve(status === "SUBSCRIBED");
				}
			});
		});
		setRealtime(realtimeOk ? "ok" : "failed");
		const ok = dbOk && authOk && realtimeOk;
		if (!ok) {
			const failed = [
				!dbOk && "پایگاه داده",
				!authOk && "احراز هویت",
				!realtimeOk && "همگام‌سازی آنی"
			].filter(Boolean).join("، ");
			setError(`اتصال ناموفق: ${failed}`);
		}
		return ok;
	}, []);
	function validate() {
		const nextUrl = url.trim().replace(/\/+$/, "");
		const nextKey = key.trim();
		if (!/^https?:\/\/.+/.test(nextUrl) || !nextKey) {
			setError("نشانی بک‌اند و کلید عمومی را کامل وارد کنید.");
			toast.error("نشانی بک‌اند و کلید عمومی را کامل وارد کنید.");
			return null;
		}
		if (/service_role|sb_secret_/i.test(nextKey)) {
			setError("کلید سرویس (Service Role) مجاز نیست؛ فقط کلید عمومی را وارد کنید.");
			toast.error("کلید سرویس (Service Role) مجاز نیست.");
			return null;
		}
		return {
			nextUrl,
			nextKey
		};
	}
	async function saveAndConnect() {
		if (busy) return;
		const values = validate();
		if (!values) return;
		setBusy(true);
		try {
			if (!await test(values.nextUrl, values.nextKey)) {
				toast.error("اتصال برقرار نشد؛ نشانی یا کلید عمومی درست نیست.");
				return;
			}
			const checkedAt = (/* @__PURE__ */ new Date()).toISOString();
			saveBackendOverride({
				backendUrl: values.nextUrl,
				publicApiKey: values.nextKey,
				checkedAt
			});
			setUrl(values.nextUrl);
			setKey(values.nextKey);
			setSource(getBackendConfig().source);
			rememberSync(checkedAt);
			resync();
			setEditing(false);
			toast.success("تنظیمات اتصال ذخیره و بررسی شد.");
		} finally {
			setBusy(false);
		}
	}
	async function runTest() {
		if (busy) return;
		const values = validate();
		if (!values) return;
		setBusy(true);
		try {
			if (await test(values.nextUrl, values.nextKey)) {
				rememberSync((/* @__PURE__ */ new Date()).toISOString());
				toast.success("اتصال سالم است.");
			} else toast.error("اتصال برقرار نیست.");
		} finally {
			setBusy(false);
		}
	}
	/** Unlocks the fields for editing. */
	function startEdit() {
		setError(null);
		setEditing(true);
	}
	/** Discards edits and restores the currently effective configuration. */
	function cancelEdit() {
		const config = getBackendConfig();
		setUrl(config.backendUrl);
		setKey(config.publicApiKey);
		setSource(config.source);
		setError(null);
		setEditing(false);
	}
	/** Restores the default (connected project) configuration. */
	function restoreDefaults() {
		if (busy) return;
		clearBackendOverride();
		const config = envBackendConfigProvider.getConfig();
		setUrl(config.backendUrl);
		setKey(config.publicApiKey);
		setSource(config.source);
		setError(null);
		setDb("unknown");
		setAuth("unknown");
		setRealtime("unknown");
		setEditing(false);
		toast.success("تنظیمات پیش‌فرض بازگردانده شد.");
	}
	/**
	* Reconnect through the existing sync layer: the shared socket already
	* rebuilds itself (with backoff, dedup and a full resync) when the app comes
	* back online, so we simply re-trigger that path — no reload, no polling.
	*/
	function reconnect() {
		if (typeof window !== "undefined") window.dispatchEvent(new Event("online"));
		resync();
		setError(null);
		toast.success("درخواست اتصال مجدد ارسال شد.");
	}
	function resyncNow() {
		resync();
		rememberSync((/* @__PURE__ */ new Date()).toISOString());
		toast.success("همگام‌سازی مجدد انجام شد.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "app-card mb-4 p-4 sm:p-6",
		dir: "rtl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-1 flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-2 font-extrabold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cloud, { className: "size-5 text-primary" }), " اتصال ابری و همگام‌سازی"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold ${overall.tone}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(overall.Icon, { className: `size-4 ${overall.spin ? "animate-spin" : ""}` }), overall.label]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 text-xs leading-6 text-muted-foreground",
				children: "این بخش فقط برای پشتیبان (مالک سامانه) در دسترس است. به‌صورت پیش‌فرض از همان پروژهٔ ابری متصل استفاده می‌شود؛ در صورت نیاز می‌توانید نشانی بک‌اند و کلید عمومی را بازبینی یا جایگزین کنید. همگام‌سازی آنی از لایهٔ Realtime موجود برنامه استفاده می‌کند و بدون بارگذاری مجدد انجام می‌شود. کلید سرویس، رمز پایگاه داده و هر اطلاعات محرمانهٔ دیگر هرگز اینجا نگهداری یا نمایش داده نمی‌شود."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-bold",
						children: "نشانی بک‌اند (Cloud URL)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						dir: "ltr",
						inputMode: "url",
						autoComplete: "off",
						placeholder: "https://xxxx.supabase.co",
						value: url,
						readOnly: !editing,
						"aria-readonly": !editing,
						onChange: (e) => setUrl(e.target.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold",
							children: "کلید عمومی (Publishable / Anon Key)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								dir: "ltr",
								autoComplete: "off",
								type: showKey ? "text" : "password",
								placeholder: "sb_publishable_… یا anon key",
								value: key,
								readOnly: !editing,
								"aria-readonly": !editing,
								onChange: (e) => setKey(e.target.value),
								className: "pl-10"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowKey((v) => !v),
								"aria-label": showKey ? "پنهان کردن کلید" : "نمایش کلید",
								className: "absolute inset-y-0 left-0 grid w-10 place-items-center text-muted-foreground transition-colors hover:text-foreground",
								children: showKey ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[11px] text-muted-foreground",
							children: ["فقط کلید عمومی را وارد کنید؛ کلید سرویس (Service Role) را هرگز اینجا قرار ندهید.", source === "owner-override" ? " (پیکربندی سفارشی فعال است)" : " (پیکربندی پیش‌فرض)"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-2 sm:grid-cols-2",
				children: editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: saveAndConnect,
					disabled: busy,
					className: "w-full font-bold",
					children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlugZap, { className: "size-4" }), "ذخیره و اتصال"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: cancelEdit,
					disabled: busy,
					className: "w-full font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-4" }), "انصراف"]
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: startEdit,
					disabled: busy,
					className: "w-full font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), "ویرایش تنظیمات"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: runTest,
					disabled: busy,
					className: "w-full font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4" }), "تست اتصال"]
				})] })
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 flex items-start gap-2 rounded-xl bg-destructive/10 p-3 text-xs font-bold leading-6 text-destructive",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 size-4 shrink-0" }), error]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthRow, {
						icon: Database,
						title: "پایگاه داده",
						hint: "دسترسی به داده‌های مشترک",
						state: db
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthRow, {
						icon: KeyRound,
						title: "احراز هویت",
						hint: "ورود و نشست کاربران",
						state: auth
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealthRow, {
						icon: Radio,
						title: "همگام‌سازی آنی (Realtime)",
						hint: syncStatus === "live" ? "کانال زندهٔ برنامه فعال است" : syncStatus === "reconnecting" ? "در حال اتصال مجدد کانال زنده" : syncStatus === "offline" ? "کانال زنده آفلاین است" : "در حال برقراری کانال زنده",
						state: realtime
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-muted/30 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-9 shrink-0 place-items-center rounded-lg bg-background text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-4.5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-sm font-bold",
									children: "آخرین همگام‌سازی موفق"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-[11px] text-muted-foreground",
									children: "بدون بارگذاری مجدد و بدون فراخوانی دوره‌ای"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 text-[11px] font-bold text-muted-foreground",
							children: lastSync ? formatJalaliDateTime(lastSync) : "—"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-2 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: reconnect,
						disabled: busy,
						className: "w-full font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlugZap, { className: "size-4" }), "اتصال مجدد"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: resyncNow,
						disabled: busy,
						className: "w-full font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-4" }), "همگام‌سازی مجدد"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: restoreDefaults,
						disabled: busy,
						className: "w-full font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "بازگردانی پیش‌فرض"]
					})
				]
			})
		]
	});
}
var HOURS = Array.from({ length: 24 }, (_, i) => i);
function SettingsPage() {
	const { state, setState, user, logout, setTheme, notify } = useStore();
	const { isOwner, loading: ownerLoading } = useIsOwner();
	const navigate = useNavigate();
	const [push, setPush] = (0, import_react.useState)(false);
	const [emailAlerts, setEmailAlerts] = (0, import_react.useState)(true);
	const [alarmMsg, setAlarmMsg] = (0, import_react.useState)({
		userIds: [],
		title: "",
		body: "",
		urgent: false,
		pulses: 3,
		duration: 500
	});
	const [mapping, setMapping] = (0, import_react.useState)({
		date: "تاریخ",
		amount: "مبلغ",
		ref: "شماره سند"
	});
	if (!user) return null;
	const isSupport = isOwner || user.role === "ADMIN";
	if (ownerLoading && !isSupport) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-[50vh] place-items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-bold text-muted-foreground",
			children: "در حال بررسی دسترسی…"
		})
	});
	if (!isSupport) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "تنظیمات",
		subtitle: "دسترسی محدود"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-6" }),
		title: "این بخش فقط برای پشتیبان اصلی است",
		description: "تنظیمات سامانه و اتصال ابری تنها برای مالک/پشتیبان اصلی سامانه قابل مشاهده است."
	})] });
	const isAdmin = can(user, "settings");
	const alarms = state.alarms;
	const updateAlarms = (patch) => setState((s) => ({
		...s,
		alarms: {
			...s.alarms,
			...patch
		}
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "تنظیمات",
			subtitle: `${user.fullName} · ${ROLE_LABEL[user.role]}`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "app-card mb-4 p-4 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mb-4 flex items-center gap-2 font-extrabold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-5 text-primary" }), " نمایش و تم"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 gap-2",
					children: [
						[
							"light",
							"حالت روز",
							Sun
						],
						[
							"dark",
							"حالت شب",
							Moon
						],
						[
							"vivid",
							"طرح ویژه",
							Palette
						]
					].map(([value, label, Icon]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							setTheme(value);
							toast.success(`${label} فعال شد`);
						},
						"aria-pressed": state.theme === value,
						className: `flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-2 text-xs font-bold ${state.theme === value ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" }),
							" ",
							label
						]
					}, value))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs text-muted-foreground",
					children: "«طرح ویژه» بر اساس الگوی نارنجی ارسالی شما ساخته شده است: کارت‌های سفید، گوشه‌های نرم و تأکید نارنجی."
				})
			]
		}),
		isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BannerSettings, {}) : null,
		isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudConnectionSettings, {}) : null,
		can(user, "users") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "app-card mb-4 p-4 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mb-1 flex items-center gap-2 font-extrabold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5 text-primary" }), " دسترسی کاربران"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 text-xs leading-6 text-muted-foreground",
					children: "روی نام هر کاربر بزنید و دسترسی‌هایش را کم یا زیاد کنید؛ تغییرات پس از ذخیره برای همیشه پایدار می‌ماند."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissionsManager, { compact: true })
			]
		}) : null,
		can(user, "users") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mb-3 flex items-center gap-2 font-extrabold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-5 text-primary" }), " معرفی اشخاص"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PeopleIntroSection, {})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "app-card mb-4 p-4 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mb-4 flex items-center gap-2 font-extrabold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-5 text-primary" }), " اعلان‌ها"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center justify-between gap-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-bold",
						children: "دریافت نوتیفیکیشن مرورگر (Push)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: push,
						onCheckedChange: async (v) => {
							if (v && typeof Notification !== "undefined") {
								if (await Notification.requestPermission() !== "granted") {
									toast.error("اجازه نوتیفیکیشن داده نشد؛ فقط اعلان داخل برنامه فعال است.");
									return;
								}
							}
							setPush(v);
							toast.success(v ? "نوتیفیکیشن مرورگر فعال شد" : "نوتیفیکیشن مرورگر غیرفعال شد");
						}
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center justify-between gap-3 border-t py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-bold",
						children: "اعلان رویدادهای مهم داخل برنامه"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: emailAlerts,
						onCheckedChange: setEmailAlerts
					})]
				})
			]
		}),
		isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "app-card mb-4 p-4 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mb-1 flex items-center gap-2 font-extrabold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlarmClock, { className: "size-5 text-primary" }), " بازهٔ آلارم کاربران"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 text-xs leading-6 text-muted-foreground",
					children: "اعلان‌های ثبت‌شده خارج از این بازه جمع می‌شوند و در ابتدای بازه یکجا با صدا و ویبره برای کاربران هدف ارسال می‌شوند. اعلان‌های فوری بلافاصله ارسال می‌شوند."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center justify-between gap-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-bold",
						children: "فعال بودن بازهٔ آلارم"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: alarms.enabled,
						onCheckedChange: (v) => updateAlarms({ enabled: v })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3 border-t py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "alarm-start",
							className: "block text-sm font-bold",
							children: "از ساعت"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "alarm-start",
							value: alarms.startHour,
							onChange: (e) => updateAlarms({ startHour: Number(e.target.value) }),
							className: "h-12 w-full rounded-xl border bg-card px-3 text-sm font-bold outline-none focus:ring-2 focus:ring-ring",
							children: HOURS.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: h,
								children: [toFa(String(h).padStart(2, "0")), ":۰۰"]
							}, h))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "alarm-end",
							className: "block text-sm font-bold",
							children: "تا ساعت"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "alarm-end",
							value: alarms.endHour,
							onChange: (e) => updateAlarms({ endHour: Number(e.target.value) }),
							className: "h-12 w-full rounded-xl border bg-card px-3 text-sm font-bold outline-none focus:ring-2 focus:ring-ring",
							children: HOURS.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: h,
								children: [toFa(String(h).padStart(2, "0")), ":۰۰"]
							}, h))
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-2 block text-sm font-bold",
						children: "نقش‌های مشمول بازهٔ آلارم"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: Object.keys(ROLE_LABEL).map((r) => {
							const active = alarms.roles.includes(r);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": active,
								onClick: () => updateAlarms({ roles: active ? alarms.roles.filter((x) => x !== r) : [...alarms.roles, r] }),
								className: `rounded-full px-4 py-2 text-sm font-bold ${active ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`,
								children: ROLE_LABEL[r]
							}, r);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center justify-between gap-3 border-t py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-bold",
						children: "ویبره هنگام دریافت آلارم"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: alarms.vibrate,
						onCheckedChange: (v) => updateAlarms({ vibrate: v })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3 border-t py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "alarm-pulses",
							className: "block text-sm font-bold",
							children: "تعداد ویبره هر آلارم"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "alarm-pulses",
							value: alarms.vibratePulses,
							onChange: (e) => updateAlarms({ vibratePulses: Number(e.target.value) }),
							className: "h-12 w-full rounded-xl border bg-card px-3 text-sm font-bold outline-none focus:ring-2 focus:ring-ring",
							children: [
								1,
								2,
								3,
								4,
								5,
								6,
								8,
								10
							].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: n,
								children: [toFa(n), " بار"]
							}, n))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "alarm-duration",
							className: "block text-sm font-bold",
							children: "شدت / طول هر ویبره"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							id: "alarm-duration",
							value: alarms.vibrateDuration,
							onChange: (e) => updateAlarms({ vibrateDuration: Number(e.target.value) }),
							className: "h-12 w-full rounded-xl border bg-card px-3 text-sm font-bold outline-none focus:ring-2 focus:ring-ring",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: 250,
									children: "سبک"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: 500,
									children: "متوسط"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: 900,
									children: "سنگین"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: 1500,
									children: "خیلی سنگین"
								})
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						const pattern = buildVibratePattern(alarms.vibratePulses, alarms.vibrateDuration);
						if (typeof navigator !== "undefined" && "vibrate" in navigator) {
							navigator.vibrate?.(pattern);
							toast.success("ویبره آزمایشی اجرا شد");
						} else toast.error("این دستگاه از ویبره پشتیبانی نمی‌کند.");
					},
					className: "mb-1 h-12 w-full rounded-xl bg-secondary text-sm font-bold",
					children: "تست ویبره"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center justify-between gap-3 border-t py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-bold",
						children: "صدای آلارم"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: alarms.sound,
						onCheckedChange: (v) => updateAlarms({ sound: v })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						if (playAlarmSound("IMPORTANT")) toast.success("صدای آزمایشی پخش شد");
						else toast.error("پخش صدا ممکن نشد؛ یک‌بار روی صفحه ضربه بزنید و دوباره امتحان کنید.");
					},
					className: "h-12 w-full rounded-xl bg-secondary text-sm font-bold",
					children: "تست صدا"
				})
			]
		}) : null,
		isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "app-card mb-4 p-4 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mb-1 flex items-center gap-2 font-extrabold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-5 text-primary" }), " قوانین اعلان برای هر رویداد"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 text-xs leading-6 text-muted-foreground",
					children: "برای هر رویداد مشخص کنید اعلان فعال باشد، با چه درجهٔ اهمیتی ارسال شود و صدا یا ویبره داشته باشد. اعلان‌های «فوری» بدون توجه به بازهٔ زمانی بلافاصله ارسال می‌شوند."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: ALARM_EVENT_KEYS.map((key) => {
						const cfg = alarms.events?.[key] ?? DEFAULT_ALARM_EVENTS[key];
						const patch = (p) => updateAlarms({ events: {
							...DEFAULT_ALARM_EVENTS,
							...alarms.events,
							[key]: {
								...cfg,
								...p
							}
						} });
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-bold",
									children: ALARM_EVENT_LABEL[key]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: cfg.enabled,
									onCheckedChange: (v) => patch({ enabled: v })
								})]
							}), cfg.enabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-2",
									children: [
										"NORMAL",
										"IMPORTANT",
										"URGENT"
									].map((lv) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-pressed": cfg.level === lv,
										onClick: () => patch({ level: lv }),
										className: `h-9 rounded-lg px-3 text-xs font-bold ${cfg.level === lv ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`,
										children: LEVEL_LABEL[lv]
									}, lv))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center gap-2 text-xs font-bold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
											checked: cfg.sound,
											onCheckedChange: (v) => patch({ sound: v })
										}), "صدا"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center gap-2 text-xs font-bold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
											checked: cfg.vibrate,
											onCheckedChange: (v) => patch({ vibrate: v })
										}), "ویبره"]
									})]
								})]
							}) : null]
						}, key);
					})
				})
			]
		}) : null,
		isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "app-card mb-4 p-4 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mb-1 flex items-center gap-2 font-extrabold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlarmClock, { className: "size-5 text-primary" }), " ارسال آلارم دستی"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 text-xs leading-6 text-muted-foreground",
					children: "یک پیام با ویبره‌ی دلخواه برای کاربران انتخاب‌شده بفرستید. آلارم فوری بلافاصله و آلارم عادی در ابتدای بازهٔ مجاز ارسال می‌شود."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-2 block text-sm font-bold",
					children: "گیرندگان"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-3 flex flex-wrap gap-2",
					children: state.users.filter((u) => u.isActive && u.id !== user.id).map((u) => {
						const active = alarmMsg.userIds.includes(u.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": active,
							onClick: () => setAlarmMsg((m) => ({
								...m,
								userIds: active ? m.userIds.filter((x) => x !== u.id) : [...m.userIds, u.id]
							})),
							className: `rounded-full px-4 py-2 text-sm font-bold ${active ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`,
							children: u.fullName
						}, u.id);
					})
				}),
				state.users.filter((u) => u.isActive && u.id !== user.id).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-xs font-bold text-muted-foreground",
					children: "هنوز کاربری ساخته نشده است."
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "alarm-title",
								className: "block text-sm font-bold",
								children: "عنوان آلارم"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "alarm-title",
								value: alarmMsg.title,
								onChange: (e) => setAlarmMsg((m) => ({
									...m,
									title: e.target.value
								})),
								className: "h-12 w-full rounded-xl border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "alarm-body",
								className: "block text-sm font-bold",
								children: "متن پیام"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "alarm-body",
								rows: 3,
								value: alarmMsg.body,
								onChange: (e) => setAlarmMsg((m) => ({
									...m,
									body: e.target.value
								})),
								className: "w-full rounded-xl border bg-card p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "msg-pulses",
									className: "block text-sm font-bold",
									children: "تعداد ویبره"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									id: "msg-pulses",
									value: alarmMsg.pulses,
									onChange: (e) => setAlarmMsg((m) => ({
										...m,
										pulses: Number(e.target.value)
									})),
									className: "h-12 w-full rounded-xl border bg-card px-3 text-sm font-bold outline-none focus:ring-2 focus:ring-ring",
									children: [
										1,
										2,
										3,
										4,
										5,
										6,
										8,
										10
									].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: n,
										children: [toFa(n), " بار"]
									}, n))
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "msg-duration",
									className: "block text-sm font-bold",
									children: "شدت ویبره"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "msg-duration",
									value: alarmMsg.duration,
									onChange: (e) => setAlarmMsg((m) => ({
										...m,
										duration: Number(e.target.value)
									})),
									className: "h-12 w-full rounded-xl border bg-card px-3 text-sm font-bold outline-none focus:ring-2 focus:ring-ring",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 250,
											children: "سبک"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 500,
											children: "متوسط"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 900,
											children: "سنگین"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 1500,
											children: "خیلی سنگین"
										})
									]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center justify-between gap-3 py-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-bold",
								children: "ارسال فوری (بدون رعایت بازهٔ آلارم)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: alarmMsg.urgent,
								onCheckedChange: (v) => setAlarmMsg((m) => ({
									...m,
									urgent: v
								}))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								if (!alarmMsg.userIds.length) {
									toast.error("حداقل یک گیرنده انتخاب کنید.");
									return;
								}
								if (!alarmMsg.title.trim() || !alarmMsg.body.trim()) {
									toast.error("عنوان و متن پیام را وارد کنید.");
									return;
								}
								notify({
									userRole: [],
									userIds: alarmMsg.userIds,
									title: alarmMsg.title.trim(),
									body: alarmMsg.body.trim(),
									url: "/notifications",
									type: "task",
									priority: alarmMsg.urgent ? "URGENT" : "NORMAL",
									vibratePattern: buildVibratePattern(alarmMsg.pulses, alarmMsg.duration)
								});
								setAlarmMsg((m) => ({
									...m,
									title: "",
									body: "",
									userIds: []
								}));
								toast.success("آلارم ثبت شد");
							},
							className: "h-14 w-full rounded-xl bg-primary text-base font-extrabold text-primary-foreground",
							children: "ارسال آلارم"
						})
					]
				})
			]
		}) : null,
		isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "app-card mb-4 p-4 sm:p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mb-4 flex items-center gap-2 font-extrabold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coins, { className: "size-5 text-primary" }), " واحد پول"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2",
				children: ["TOMAN", "RIAL"].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						setState((s) => ({
							...s,
							currency: c
						}));
						toast.success(`واحد پول به ${c === "TOMAN" ? "تومان" : "ریال"} تغییر کرد`);
					},
					"aria-pressed": state.currency === c,
					className: `min-h-12 rounded-xl font-bold ${state.currency === c ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`,
					children: c === "TOMAN" ? "تومان" : "ریال"
				}, c))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "app-card mb-4 p-4 sm:p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mb-4 flex items-center gap-2 font-extrabold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableProperties, { className: "size-5 text-primary" }), " نگاشت ستون‌های خروجی حسابداری"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [[
					["date", "نام ستون تاریخ"],
					["amount", "نام ستون مبلغ"],
					["ref", "نام ستون شماره سند"]
				].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: key,
						className: "block text-sm font-bold",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: key,
						value: mapping[key],
						onChange: (e) => setMapping({
							...mapping,
							[key]: e.target.value
						}),
						className: "h-12 w-full rounded-xl border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
					})]
				}, key)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => toast.success("نگاشت ستون‌ها ذخیره شد"),
					className: "min-h-12 w-full rounded-xl bg-primary font-bold text-primary-foreground",
					children: "ذخیره نگاشت"
				})]
			})]
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-6" }),
			title: "تنظیمات سیستمی محدود است",
			description: "تنظیمات واحد پول و حسابداری فقط برای مدیر اصلی در دسترس است."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => {
				logout();
				navigate({ to: "/" });
			},
			className: "mt-4 flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-destructive/10 font-bold text-destructive",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-5" }), " خروج از حساب"]
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPage, {}) });
//#endregion
export { SplitComponent as component };
