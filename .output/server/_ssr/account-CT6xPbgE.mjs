import { r as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { u as supabase } from "./server-BIpwqx2E.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { Mt as Bell, Ot as Camera, R as Palette, V as Moon, Y as LoaderCircle, b as ShieldCheck, g as Sun, m as Trash2, s as User } from "../_libs/lucide-react.mjs";
import { i as AvatarImage, n as Avatar, r as AvatarFallback, t as AppShell, u as PageHeader } from "./ui-kit-B64qXDLa.mjs";
import { D as cn, Y as useStore, x as ROLE_LABEL } from "./router-DkR-Q5N6.mjs";
import { t as compressImage } from "./images-B5GrQKOY.mjs";
import { t as Switch } from "./switch-DG9Pr8pj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-CT6xPbgE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Read-only lookup of the signed-in user's organization role.
* Roles are organization-scoped; no role management happens here.
*/
function useOrgRole() {
	const [role, setRole] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		(async () => {
			try {
				const { data: auth } = await supabase.auth.getUser();
				const userId = auth.user?.id;
				if (!userId) return;
				const { data: member } = await supabase.from("organization_members").select("organization_id, role_id").eq("user_id", userId).order("created_at", { ascending: true }).limit(1).maybeSingle();
				if (cancelled || !member?.role_id) return;
				const [{ data: roleRow }, { data: org }] = await Promise.all([supabase.from("roles").select("name, description").eq("id", member.role_id).maybeSingle(), supabase.from("organizations").select("name").eq("id", member.organization_id).maybeSingle()]);
				if (cancelled || !roleRow) return;
				setRole({
					organizationName: org?.name ?? "",
					roleName: roleRow.name,
					roleDescription: roleRow.description
				});
			} finally {
				if (!cancelled) setLoading(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, []);
	return {
		role,
		loading
	};
}
var DEFAULT_USER_PREFS = {
	push: false,
	inApp: true,
	sound: true,
	vibrate: true
};
function prefsKey(userId) {
	return `dar-rekab-prefs:${userId}`;
}
function useUserPrefs(userId) {
	const [prefs, setPrefs] = (0, import_react.useState)(DEFAULT_USER_PREFS);
	(0, import_react.useEffect)(() => {
		if (!userId) return;
		try {
			const raw = localStorage.getItem(prefsKey(userId));
			setPrefs(raw ? {
				...DEFAULT_USER_PREFS,
				...JSON.parse(raw)
			} : DEFAULT_USER_PREFS);
		} catch {
			setPrefs(DEFAULT_USER_PREFS);
		}
	}, [userId]);
	return {
		prefs,
		update: (0, import_react.useCallback)((patch) => {
			setPrefs((p) => {
				const next = {
					...p,
					...patch
				};
				if (userId) localStorage.setItem(prefsKey(userId), JSON.stringify(next));
				return next;
			});
		}, [userId])
	};
}
var TABS = [
	{
		key: "profile",
		label: "پروفایل"
	},
	{
		key: "appearance",
		label: "ظاهر"
	},
	{
		key: "notifications",
		label: "اعلان‌ها"
	}
];
function AccountSettingsPage() {
	const { user, state, setState, setTheme } = useStore();
	const [tab, setTab] = (0, import_react.useState)("profile");
	const { prefs, update } = useUserPrefs(user?.id ?? null);
	const { role: orgRole, loading: orgRoleLoading } = useOrgRole();
	const photoInput = (0, import_react.useRef)(null);
	const [savingPhoto, setSavingPhoto] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		fullName: user?.fullName ?? "",
		phone: user?.phone ?? "",
		title: user?.title ?? ""
	});
	if (!user) return null;
	function setAvatar(avatarUrl) {
		if (!user) return;
		setState((s) => ({
			...s,
			users: s.users.map((u) => {
				if (u.id !== user.id) return u;
				const { avatarUrl: _prev, ...rest } = u;
				return avatarUrl ? {
					...rest,
					avatarUrl
				} : rest;
			})
		}));
	}
	async function pickPhoto(file) {
		if (!file) return;
		setSavingPhoto(true);
		try {
			setAvatar(await compressImage(file, 512, .75));
			toast.success("عکس پروفایل شما به‌روزرسانی شد");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "انتخاب عکس انجام نشد.");
		} finally {
			setSavingPhoto(false);
		}
	}
	function saveProfile() {
		if (!user) return;
		if (!form.fullName.trim()) {
			toast.error("نام و نام خانوادگی را وارد کنید.");
			return;
		}
		setState((s) => ({
			...s,
			users: s.users.map((u) => u.id === user.id ? {
				...u,
				fullName: form.fullName.trim(),
				phone: form.phone.trim(),
				title: form.title.trim()
			} : u)
		}));
		toast.success("پروفایل شما ذخیره شد");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "تنظیمات کاربری",
			subtitle: `${user.fullName} · ${ROLE_LABEL[user.role]} · فقط برای حساب شما`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 grid grid-cols-3 gap-2",
			children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-pressed": tab === t.key,
				onClick: () => setTab(t.key),
				className: cn("h-12 rounded-xl text-sm font-bold transition-colors", tab === t.key ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"),
				children: t.label
			}, t.key))
		}),
		tab === "profile" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "app-card p-4 sm:p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mb-4 flex items-center gap-2 font-extrabold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-5 text-primary" }), " پروفایل من"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-3 rounded-2xl bg-muted/50 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "size-24 border-2 border-primary/40",
								children: [user.avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
									src: user.avatarUrl,
									alt: user.fullName
								}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
									className: "bg-primary-soft text-2xl font-bold text-primary",
									children: user.fullName.slice(0, 1)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: photoInput,
								type: "file",
								accept: "image/*",
								hidden: true,
								onChange: (e) => {
									pickPhoto(e.target.files?.[0]);
									e.target.value = "";
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									disabled: savingPhoto,
									onClick: () => photoInput.current?.click(),
									className: "inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground disabled:opacity-60",
									children: [savingPhoto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-4" }), user.avatarUrl ? "تغییر عکس پروفایل" : "انتخاب عکس پروفایل"]
								}), user.avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										setAvatar(void 0);
										toast.success("عکس پروفایل حذف شد");
									},
									className: "inline-flex h-11 items-center gap-2 rounded-xl bg-secondary px-4 text-sm font-bold text-secondary-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), " حذف عکس"]
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "عکس پروفایل فقط برای حساب شماست و هر زمان قابل تغییر است."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "acc-name",
							className: "block text-sm font-bold",
							children: "نام و نام خانوادگی"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "acc-name",
							value: form.fullName,
							onChange: (e) => setForm((f) => ({
								...f,
								fullName: e.target.value
							})),
							className: "h-12 w-full rounded-xl border bg-card px-3 text-sm font-bold outline-none focus:ring-2 focus:ring-ring"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "acc-phone",
							className: "block text-sm font-bold",
							children: "شماره تماس"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "acc-phone",
							inputMode: "tel",
							value: form.phone,
							onChange: (e) => setForm((f) => ({
								...f,
								phone: e.target.value
							})),
							className: "num h-12 w-full rounded-xl border bg-card px-3 text-sm font-bold outline-none focus:ring-2 focus:ring-ring"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "acc-title",
							className: "block text-sm font-bold",
							children: "عنوان شغلی"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "acc-title",
							value: form.title,
							onChange: (e) => setForm((f) => ({
								...f,
								title: e.target.value
							})),
							className: "h-12 w-full rounded-xl border bg-card px-3 text-sm font-bold outline-none focus:ring-2 focus:ring-ring"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-bold",
							children: "نام کاربری"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-xl bg-muted px-3 py-3 text-sm font-bold text-muted-foreground",
							children: user.username
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm font-bold",
								children: "نقش سازمانی من"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-xl bg-muted px-3 py-3 text-sm font-bold text-muted-foreground",
								children: orgRoleLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), " در حال دریافت…"]
								}) : orgRole ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-2 py-1 text-primary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4" }), orgRole.roleName]
									}), orgRole.organizationName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs",
										children: ["در ", orgRole.organizationName]
									}) : null]
								}) : "نقشی برای شما ثبت نشده است."
							}),
							orgRole?.roleDescription ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: orgRole.roleDescription
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: saveProfile,
						className: "h-12 w-full rounded-xl bg-primary text-sm font-bold text-primary-foreground",
						children: "ذخیره پروفایل"
					})
				]
			})]
		}) : null,
		tab === "appearance" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "app-card p-4 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mb-4 flex items-center gap-2 font-extrabold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, { className: "size-5 text-primary" }), " ظاهر برنامه"]
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
						type: "button",
						onClick: () => {
							setTheme(value);
							toast.success(`${label} فعال شد`);
						},
						"aria-pressed": state.theme === value,
						className: cn("flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-2 text-xs font-bold", state.theme === value ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" }),
							" ",
							label
						]
					}, value))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs leading-6 text-muted-foreground",
					children: "انتخاب تم فقط روی حساب شما اثر می‌گذارد و ظاهر سایر کاربران تغییری نمی‌کند."
				})
			]
		}) : null,
		tab === "notifications" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "app-card p-4 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mb-1 flex items-center gap-2 font-extrabold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-5 text-primary" }), " اعلان‌های من"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-xs leading-6 text-muted-foreground",
					children: "این تنظیمات شخصی است و فقط اعلان‌های حساب شما را کنترل می‌کند."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center justify-between gap-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-bold",
						children: "نوتیفیکیشن مرورگر (Push)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: prefs.push,
						onCheckedChange: async (v) => {
							if (v && typeof Notification !== "undefined") {
								if (await Notification.requestPermission() !== "granted") {
									toast.error("اجازه نوتیفیکیشن داده نشد.");
									return;
								}
							}
							update({ push: v });
						}
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center justify-between gap-3 border-t py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-bold",
						children: "اعلان‌های داخل برنامه"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: prefs.inApp,
						onCheckedChange: (v) => update({ inApp: v })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center justify-between gap-3 border-t py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-bold",
						children: "صدای اعلان"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: prefs.sound,
						onCheckedChange: (v) => update({ sound: v })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center justify-between gap-3 border-t py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-bold",
						children: "ویبره اعلان"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: prefs.vibrate,
						onCheckedChange: (v) => update({ vibrate: v })
					})]
				})
			]
		}) : null
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountSettingsPage, {}) });
//#endregion
export { SplitComponent as component };
