import { r as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as supabase } from "./server-BIpwqx2E.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { F as Pencil, Lt as Archive, M as Power, Rt as ArchiveRestore, b as ShieldCheck, c as UserPlus, o as Users, wt as ChevronLeft } from "../_libs/lucide-react.mjs";
import { a as Chip, c as FilterChips, d as Sheet, f as SheetContent, m as SheetTitle, o as EmptyState, p as SheetHeader, t as AppShell, u as PageHeader } from "./ui-kit-B64qXDLa.mjs";
import { c as TextArea, r as Field, s as SelectField } from "./fields-ESZmE-g5.mjs";
import { J as uid, T as can, Y as useStore, q as roleTitle, x as ROLE_LABEL, y as POSITIONS } from "./router-DkR-Q5N6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/people.index-CiauxU4e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Read/write helper for the organization a person belongs to.
*
* Frontend-only: it uses the existing `organizations` / `organization_members`
* tables through the browser client, so RLS stays the single source of truth.
* If the database refuses a write, the caller surfaces the message as-is.
*/
function useOrganizations() {
	const [orgs, setOrgs] = (0, import_react.useState)([]);
	const [membership, setMembership] = (0, import_react.useState)({});
	const [loading, setLoading] = (0, import_react.useState)(true);
	const load = (0, import_react.useCallback)(async () => {
		const [{ data: orgRows }, { data: memberRows }] = await Promise.all([supabase.from("organizations").select("id, name").order("created_at", { ascending: true }), supabase.from("organization_members").select("user_id, organization_id")]);
		setOrgs((orgRows ?? []).map((o) => ({
			id: o.id,
			name: o.name
		})));
		const map = {};
		for (const m of memberRows ?? []) map[m.user_id] = m.organization_id;
		setMembership(map);
		setLoading(false);
	}, []);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	return {
		orgs,
		membership,
		loading,
		reload: load,
		assign: (0, import_react.useCallback)(async (userId, organizationId) => {
			if (!organizationId) return null;
			if (membership[userId] === organizationId) return null;
			await supabase.from("organization_members").delete().eq("user_id", userId);
			const { error } = await supabase.from("organization_members").insert({
				user_id: userId,
				organization_id: organizationId
			});
			if (error) return error.message;
			setMembership((m) => ({
				...m,
				[userId]: organizationId
			}));
			return null;
		}, [membership])
	};
}
var FILTERS = [
	{
		value: "ACTIVE",
		label: "فعال"
	},
	{
		value: "INACTIVE",
		label: "غیرفعال"
	},
	{
		value: "ARCHIVED",
		label: "آرشیو"
	},
	{
		value: "ALL",
		label: "همه"
	}
];
var NEW_POST = "__new__";
var EMPTY_FORM = {
	fullName: "",
	username: "",
	password: "",
	role: "EMPLOYEE",
	customRole: "",
	newPostName: "",
	bio: "",
	status: "ACTIVE",
	organizationId: ""
};
function PeopleManager() {
	const { state, setState, user, log } = useStore();
	const { orgs, membership, assign } = useOrganizations();
	const [filter, setFilter] = (0, import_react.useState)("ACTIVE");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editId, setEditId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(EMPTY_FORM);
	const customRoles = state.customRoles ?? [];
	const postOptions = (0, import_react.useMemo)(() => [
		...POSITIONS.map((r) => ({
			value: r,
			label: ROLE_LABEL[r]
		})),
		...customRoles.map((r) => ({
			value: `custom:${r.name}`,
			label: `${r.name} (سفارشی)`
		})),
		{
			value: NEW_POST,
			label: "ساخت پست سفارشی جدید…"
		}
	], [customRoles]);
	const people = (0, import_react.useMemo)(() => state.users.filter((u) => filter === "ALL" ? true : filter === "ARCHIVED" ? u.isArchived : filter === "INACTIVE" ? !u.isArchived && !u.isActive : !u.isArchived && u.isActive).sort((a, b) => a.fullName.localeCompare(b.fullName, "fa")), [state.users, filter]);
	if (!can(user, "users")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-6" }),
		title: "دسترسی ندارید",
		description: "مدیریت اشخاص فقط برای پشتیبان (OWNER) در دسترس است."
	});
	function openNew() {
		setEditId(null);
		setForm({
			...EMPTY_FORM,
			organizationId: orgs[0]?.id ?? ""
		});
		setOpen(true);
	}
	function openEdit(u) {
		setEditId(u.id);
		setForm({
			fullName: u.fullName,
			username: u.username,
			password: "",
			role: u.role,
			customRole: u.customRole ?? "",
			newPostName: "",
			bio: u.bio ?? "",
			status: u.isArchived ? "ARCHIVED" : u.isActive ? "ACTIVE" : "INACTIVE",
			organizationId: membership[u.id] ?? orgs[0]?.id ?? ""
		});
		setOpen(true);
	}
	function pickPost(value) {
		if (value === NEW_POST) {
			setForm((f) => ({
				...f,
				customRole: NEW_POST
			}));
			return;
		}
		if (!value.startsWith("custom:")) {
			setForm((f) => ({
				...f,
				role: value,
				customRole: "",
				newPostName: ""
			}));
			return;
		}
		const name = value.slice(7);
		const role = customRoles.find((r) => r.name === name);
		if (!role) return;
		setForm((f) => ({
			...f,
			role: role.baseRole,
			customRole: role.name,
			newPostName: ""
		}));
	}
	/** Persists the person; manual permissions are never overwritten by the post. */
	function submit(e) {
		e.preventDefault();
		const username = form.username.trim().toLowerCase();
		const fullName = form.fullName.trim();
		const password = form.password.trim();
		const creatingPost = form.customRole === NEW_POST;
		const postName = creatingPost ? form.newPostName.trim() : form.customRole;
		if (!fullName) return void toast.error("نام کامل اجباری است.");
		if (!username) return void toast.error("نام کاربری اجباری است.");
		if (state.users.some((u) => u.username.trim().toLowerCase() === username && u.id !== editId)) return void toast.error("این نام کاربری قبلاً استفاده شده است.");
		if (!editId && password.length < 4) return void toast.error("رمز عبور باید حداقل ۴ کاراکتر باشد.");
		if (editId && password && password.length < 4) return void toast.error("رمز عبور جدید باید حداقل ۴ کاراکتر باشد.");
		if (creatingPost && !postName) return void toast.error("نام پست سفارشی را وارد کنید.");
		const existing = editId ? state.users.find((u) => u.id === editId) : void 0;
		const permissions = {
			...postName ? customRoles.find((r) => r.name === postName)?.permissions ?? {} : {},
			...existing?.permissions ?? {}
		};
		const id = editId ?? uid("u");
		const person = {
			...existing ?? {},
			id,
			fullName,
			username,
			phone: existing?.phone ?? "",
			title: postName || ROLE_LABEL[form.role],
			bio: form.bio.trim(),
			role: form.role,
			...postName ? { customRole: postName } : { customRole: "" },
			isActive: form.status === "ACTIVE",
			isArchived: form.status === "ARCHIVED",
			isWorker: form.role === "MECHANIC",
			permissions,
			...password ? { password } : {}
		};
		setState((s) => ({
			...s,
			customRoles: creatingPost && !customRoles.some((r) => r.name === postName) ? [...customRoles, {
				name: postName,
				baseRole: form.role,
				permissions: {}
			}] : customRoles,
			users: editId ? s.users.map((u) => u.id === editId ? person : u) : [...s.users, person]
		}));
		log({
			entity: "user",
			recordId: id,
			action: editId ? "ویرایش شخص" : "معرفی شخص جدید و ساخت حساب کاربری",
			note: `${fullName} — ${postName || ROLE_LABEL[form.role]}`
		});
		if (editId && form.organizationId) assign(id, form.organizationId).then((err) => {
			if (err) toast.error(`ثبت سازمان انجام نشد: ${err}`);
		});
		setOpen(false);
		setForm(EMPTY_FORM);
		toast.success(editId ? "اطلاعات شخص به‌روزرسانی شد." : "شخص ساخته شد؛ می‌تواند با همین نام کاربری و رمز عبور وارد شود.");
	}
	function patch(u, changes, action) {
		setState((s) => ({
			...s,
			users: s.users.map((x) => x.id === u.id ? {
				...x,
				...changes
			} : x)
		}));
		log({
			entity: "user",
			recordId: u.id,
			action,
			note: u.fullName
		});
	}
	const postValue = form.customRole ? form.customRole === NEW_POST ? NEW_POST : `custom:${form.customRole}` : form.role;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: openNew,
				className: "flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-4" }), " افزودن شخص"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/permissions",
				className: "flex h-11 items-center gap-2 rounded-xl border px-4 text-sm font-bold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4" }), " مدیریت دسترسی‌ها"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChips, {
			value: filter,
			onChange: setFilter,
			options: FILTERS
		}),
		people.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-6" }),
			title: "شخصی در این وضعیت نیست",
			description: "با دکمهٔ «افزودن شخص» یک حساب کاربری جدید بسازید."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 grid gap-3",
			children: people.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "app-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/people/$id",
							params: { id: u.id },
							className: "min-w-0 flex-1",
							"aria-label": `جزئیات ${u.fullName}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-1 truncate font-extrabold",
								children: [u.fullName, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4 shrink-0 text-muted-foreground" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: [
									u.username,
									" — ",
									u.title || roleTitle(u)
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							tone: u.isArchived ? "neutral" : u.isActive ? "success" : "warning",
							children: u.isArchived ? "آرشیو" : u.isActive ? "فعال" : "غیرفعال"
						})]
					}),
					u.bio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: u.bio
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => openEdit(u),
								className: "flex items-center gap-1 rounded-full border px-3 py-2 text-xs font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), " ویرایش"]
							}),
							!u.isArchived ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => patch(u, { isActive: !u.isActive }, u.isActive ? "غیرفعال‌سازی شخص" : "فعال‌سازی شخص"),
								className: "flex items-center gap-1 rounded-full border px-3 py-2 text-xs font-bold",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Power, { className: "size-4" }),
									" ",
									u.isActive ? "غیرفعال‌سازی" : "فعال‌سازی"
								]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => patch(u, u.isArchived ? {
									isArchived: false,
									isActive: true
								} : {
									isArchived: true,
									isActive: false
								}, u.isArchived ? "بازگردانی شخص از آرشیو" : "آرشیو شخص"),
								className: "flex items-center gap-1 rounded-full border px-3 py-2 text-xs font-bold",
								children: u.isArchived ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchiveRestore, { className: "size-4" }), " بازگردانی"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { className: "size-4" }), " آرشیو"] })
							})
						]
					})
				]
			}, u.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
				side: "bottom",
				className: "max-h-[92dvh] overflow-y-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: editId ? "ویرایش شخص" : "افزودن شخص" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "grid gap-4 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "pm-fullname",
							label: "نام کامل",
							required: true,
							value: form.fullName,
							onChange: (v) => setForm((f) => ({
								...f,
								fullName: v
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "pm-username",
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
							id: "pm-password",
							label: editId ? "رمز عبور جدید (اختیاری)" : "رمز عبور",
							required: !editId,
							type: "password",
							value: form.password,
							onChange: (v) => setForm((f) => ({
								...f,
								password: v
							})),
							placeholder: "حداقل ۴ کاراکتر"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
							id: "pm-post",
							label: "پست",
							required: true,
							value: postValue,
							onChange: pickPost,
							options: postOptions
						}),
						form.customRole === NEW_POST ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "pm-newpost",
							label: "نام پست سفارشی",
							required: true,
							value: form.newPostName,
							onChange: (v) => setForm((f) => ({
								...f,
								newPostName: v
							})),
							placeholder: "مثال: سرپرست انبار"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
							id: "pm-basepost",
							label: "پست پایه برای دسترسی‌ها",
							value: form.role,
							onChange: (v) => setForm((f) => ({
								...f,
								role: v
							})),
							options: POSITIONS.map((r) => ({
								value: r,
								label: ROLE_LABEL[r]
							}))
						})] }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
							id: "pm-bio",
							label: "توضیحات",
							value: form.bio,
							onChange: (v) => setForm((f) => ({
								...f,
								bio: v
							})),
							placeholder: "توضیح دلخواه دربارهٔ این شخص"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
							id: "pm-status",
							label: "وضعیت",
							value: form.status,
							onChange: (v) => setForm((f) => ({
								...f,
								status: v
							})),
							options: [
								{
									value: "ACTIVE",
									label: "فعال"
								},
								{
									value: "INACTIVE",
									label: "غیرفعال"
								},
								{
									value: "ARCHIVED",
									label: "آرشیو"
								}
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
							id: "pm-org",
							label: "سازمان",
							value: form.organizationId,
							onChange: (v) => setForm((f) => ({
								...f,
								organizationId: v
							})),
							options: orgs.length ? orgs.map((o) => ({
								value: o.id,
								label: o.name
							})) : [{
								value: "",
								label: "سازمانی ثبت نشده است"
							}]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-xl bg-accent p-3 text-xs font-bold text-accent-foreground",
							children: "رمز عبور فقط برای ساخت حساب ورود به سرور فرستاده می‌شود و در برنامه ذخیره نمی‌ماند. دسترسی‌های دستی را از بخش «دسترسی‌ها» اضافه کنید؛ آن‌ها به پست اضافه می‌شوند."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "h-12 rounded-xl bg-primary text-sm font-bold text-primary-foreground",
							children: editId ? "ذخیره تغییرات" : "ثبت و ساخت حساب"
						})
					]
				})]
			})
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
	title: "معرفی اشخاص",
	subtitle: "ساخت و مدیریت حساب اشخاص؛ ورود با نام کاربری و رمز عبور از هر موبایلی"
}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PeopleManager, {})] });
//#endregion
export { SplitComponent as component };
