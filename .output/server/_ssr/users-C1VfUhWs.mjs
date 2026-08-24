import { r as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as RotateCcw, F as Pencil, Lt as Archive, N as Plus, Rt as ArchiveRestore, b as ShieldCheck, m as Trash2, o as Users } from "../_libs/lucide-react.mjs";
import { a as Chip, c as FilterChips, d as Sheet, f as SheetContent, m as SheetTitle, n as Avatar, o as EmptyState, p as SheetHeader, r as AvatarFallback, t as AppShell, u as PageHeader } from "./ui-kit-B64qXDLa.mjs";
import { r as Field, s as SelectField } from "./fields-ESZmE-g5.mjs";
import { J as uid, T as can, Y as useStore, _ as PERMISSION_KEYS, q as roleTitle, s as CAN, v as PERMISSION_LABEL, x as ROLE_LABEL, y as POSITIONS } from "./router-DkR-Q5N6.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-BCB6ZIl6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/users-C1VfUhWs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
/** Toggle row used for both user overrides and custom role definitions. */
function PermissionToggle({ label, allowed, onToggle, onReset }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-bold",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex shrink-0 items-center gap-2",
			children: [onReset ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onReset,
				className: "text-xs font-bold text-muted-foreground underline",
				children: "پیش‌فرض نقش"
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				role: "switch",
				"aria-checked": allowed,
				"aria-label": label,
				onClick: onToggle,
				className: `h-7 w-12 rounded-full p-1 transition-colors ${allowed ? "bg-primary" : "bg-muted"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `block size-5 rounded-full bg-card transition-transform ${allowed ? "-translate-x-5" : ""}` })
			})]
		})]
	});
}
function UsersPage() {
	const { state, setState, user, log } = useStore();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [rolesOpen, setRolesOpen] = (0, import_react.useState)(false);
	const [editId, setEditId] = (0, import_react.useState)(null);
	const [deleteId, setDeleteId] = (0, import_react.useState)(null);
	const [archiveId, setArchiveId] = (0, import_react.useState)(null);
	const [filter, setFilter] = (0, import_react.useState)("ACTIVE");
	const [form, setForm] = (0, import_react.useState)({
		fullName: "",
		username: "",
		phone: "",
		password: "",
		role: "EMPLOYEE",
		customRole: "",
		title: "",
		bio: "",
		permissions: {}
	});
	const customRoles = state.customRoles ?? [];
	const visible = (0, import_react.useMemo)(() => state.users.filter((u) => filter === "ALL" ? true : filter === "ARCHIVED" ? u.isArchived : filter === "INACTIVE" ? !u.isArchived && !u.isActive : !u.isArchived && u.isActive), [state.users, filter]);
	if (!can(user, "users")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-6" }),
		title: "دسترسی ندارید",
		description: "این بخش فقط برای مدیر اصلی در دسترس است."
	});
	function openNew() {
		setEditId(null);
		setForm({
			fullName: "",
			username: "",
			phone: "",
			password: "",
			role: "EMPLOYEE",
			customRole: "",
			title: "",
			bio: "",
			permissions: {}
		});
		setOpen(true);
	}
	function openEdit(id) {
		const u = state.users.find((x) => x.id === id);
		setEditId(id);
		setForm({
			fullName: u.fullName,
			username: u.username,
			phone: u.phone,
			password: "",
			role: u.role,
			customRole: u.customRole ?? "",
			title: u.title,
			bio: u.bio ?? "",
			permissions: { ...u.permissions ?? {} }
		});
		setOpen(true);
	}
	/** Applies a custom role: its access map is copied onto the person and stays until changed. */
	function pickRole(value) {
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
			customRole: role.name,
			permissions: { ...role.permissions }
		}));
	}
	function save(e) {
		e.preventDefault();
		if (!form.fullName.trim() || !form.username.trim()) {
			toast.error("نام و نام کاربری اجباری هستند.");
			return;
		}
		const username = form.username.trim();
		if (state.users.some((u) => u.username.toLowerCase() === username.toLowerCase() && u.id !== editId)) {
			toast.error("این نام کاربری قبلاً استفاده شده است.");
			return;
		}
		if (!editId && form.password.trim().length < 4) {
			toast.error("رمز عبور باید حداقل ۴ کاراکتر باشد.");
			return;
		}
		if (editId && form.password.trim() && form.password.trim().length < 4) {
			toast.error("رمز عبور جدید باید حداقل ۴ کاراکتر باشد.");
			return;
		}
		const newId = uid("u");
		setState((s) => ({
			...s,
			users: editId ? s.users.map((u) => u.id === editId ? {
				...u,
				fullName: form.fullName.trim(),
				username,
				phone: form.phone.trim(),
				title: form.title.trim(),
				bio: form.bio.trim(),
				role: form.role,
				...form.customRole.trim() ? { customRole: form.customRole.trim() } : {},
				isWorker: form.role === "MECHANIC",
				permissions: { ...form.permissions },
				...form.password.trim() ? { password: form.password.trim() } : {}
			} : u) : [...s.users, {
				id: newId,
				fullName: form.fullName.trim(),
				username,
				phone: form.phone.trim(),
				password: form.password.trim(),
				title: form.title.trim(),
				bio: form.bio.trim(),
				role: form.role,
				...form.customRole.trim() ? { customRole: form.customRole.trim() } : {},
				isActive: true,
				isArchived: false,
				isWorker: form.role === "MECHANIC",
				permissions: { ...form.permissions }
			}]
		}));
		log({
			entity: "user",
			recordId: editId ?? newId,
			action: editId ? "ویرایش کاربر و دسترسی‌ها" : "ساخت کاربر جدید",
			note: `${form.fullName.trim()} — ${form.customRole.trim() || ROLE_LABEL[form.role]}`
		});
		setOpen(false);
		toast.success(editId ? "کاربر ویرایش شد" : "کاربر جدید افزوده شد");
	}
	const roleOptions = [...POSITIONS.map((r) => ({
		value: r,
		label: ROLE_LABEL[r]
	})), ...customRoles.map((r) => ({
		value: `custom:${r.name}`,
		label: `${r.name} (دلخواه)`
	}))];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "مدیریت کاربران",
			subtitle: "کاربران، نقش‌ها و دسترسی‌های پرسنل تعمیرگاه",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: openNew,
				className: "flex items-center gap-1 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " افزودن کاربر"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setRolesOpen(true),
			className: "app-card mb-4 flex w-full items-center gap-3 p-4 text-start",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-10 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-extrabold",
						children: "نقش‌ها و دسترسی‌ها"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-xs text-muted-foreground",
						children: "تعریف نقش دلخواه با دسترسی مشخص و اختصاص آن به افراد"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					tone: "neutral",
					children: customRoles.length ? `${customRoles.length} نقش دلخواه` : "پیش‌فرض"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChips, {
				value: filter,
				onChange: setFilter,
				options: FILTERS
			})
		}),
		visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-6" }),
			title: "کاربری در این وضعیت نیست",
			description: "وضعیت دیگری را انتخاب کنید یا کاربر جدیدی بسازید."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-4 sm:grid-cols-2",
			children: visible.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: `app-card overflow-hidden border-e-4 p-4 ${u.isArchived ? "border-e-muted" : u.isActive ? "border-e-primary" : "border-e-destructive"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
							className: "size-12",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
								className: "bg-accent font-bold text-accent-foreground",
								children: u.fullName.slice(0, 1)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `truncate font-extrabold ${!u.isActive || u.isArchived ? "line-through opacity-70" : ""}`,
								children: u.fullName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm text-muted-foreground",
								children: u.title || u.username
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							tone: u.role === "ADMIN" ? "success" : "neutral",
							children: roleTitle(u)
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center justify-between border-t pt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: `flex items-center gap-1.5 text-sm font-bold ${u.isArchived ? "text-muted-foreground" : u.isActive ? "text-primary" : "text-destructive"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-2 rounded-full ${u.isArchived ? "bg-muted-foreground" : u.isActive ? "bg-primary" : "bg-destructive"}` }), u.isArchived ? "آرشیو شده" : u.isActive ? "فعال" : "غیرفعال"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => openEdit(u.id),
								"aria-label": `ویرایش ${u.fullName}`,
								className: "grid size-10 place-items-center rounded-lg hover:bg-accent",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-5" })
							}),
							u.isActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setDeleteId(u.id),
								disabled: u.id === user?.id,
								"aria-label": `غیرفعال‌سازی ${u.fullName}`,
								className: "grid size-10 place-items-center rounded-lg text-destructive hover:bg-destructive/10 disabled:opacity-40",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-5" })
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setState((s) => ({
										...s,
										users: s.users.map((x) => x.id === u.id ? {
											...x,
											isActive: true,
											isArchived: false
										} : x)
									}));
									toast.success("کاربر فعال شد");
								},
								"aria-label": `فعال‌سازی ${u.fullName}`,
								className: "grid size-10 place-items-center rounded-lg text-primary hover:bg-accent",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-5" })
							}),
							u.isArchived ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setState((s) => ({
										...s,
										users: s.users.map((x) => x.id === u.id ? {
											...x,
											isArchived: false
										} : x)
									}));
									log({
										entity: "user",
										recordId: u.id,
										action: "بازگردانی از آرشیو"
									});
									toast.success("کاربر از آرشیو خارج شد");
								},
								"aria-label": `بازگردانی ${u.fullName}`,
								className: "grid size-10 place-items-center rounded-lg text-primary hover:bg-accent",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchiveRestore, { className: "size-5" })
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setArchiveId(u.id),
								disabled: u.id === user?.id,
								"aria-label": `آرشیو ${u.fullName}`,
								className: "grid size-10 place-items-center rounded-lg text-muted-foreground hover:bg-accent disabled:opacity-40",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { className: "size-5" })
							})
						]
					})]
				})]
			}, u.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
				side: "bottom",
				className: "safe-bottom max-h-[92vh] overflow-y-auto rounded-t-3xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
					className: "text-start",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: editId ? "ویرایش کاربر" : "افزودن کاربر جدید" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: save,
					className: "space-y-4 p-4",
					noValidate: true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "fullName",
							label: "نام و نام خانوادگی",
							required: true,
							value: form.fullName,
							onChange: (v) => setForm({
								...form,
								fullName: v
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "username",
							label: "نام کاربری",
							required: true,
							value: form.username,
							onChange: (v) => setForm({
								...form,
								username: v
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "phone",
							label: "شماره موبایل",
							value: form.phone,
							onChange: (v) => setForm({
								...form,
								phone: v
							}),
							placeholder: "09XXXXXXXXX"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "title",
							label: "سمت",
							value: form.title,
							onChange: (v) => setForm({
								...form,
								title: v
							}),
							placeholder: "مثلاً مکانیک ارشد"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "bio",
								className: "block text-sm font-bold",
								children: "اطلاعاتی راجع به کاربر (اختیاری)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "bio",
								rows: 3,
								value: form.bio,
								onChange: (e) => setForm({
									...form,
									bio: e.target.value
								}),
								className: "w-full rounded-xl border bg-card p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
							id: "role",
							label: "نقش",
							required: true,
							value: form.customRole ? `custom:${form.customRole}` : form.role,
							onChange: pickRole,
							options: roleOptions
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "password",
							label: editId ? "رمز عبور جدید (اختیاری)" : "رمز عبور",
							required: !editId,
							type: "password",
							value: form.password,
							onChange: (v) => setForm({
								...form,
								password: v
							}),
							placeholder: editId ? "برای تغییر رمز، وارد کنید" : "حداقل ۴ کاراکتر"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-extrabold",
									children: "دسترسی‌های این شخص"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: "دسترسی‌ها از روی نقش تعیین می‌شوند. هر دسترسی که اینجا تغییر دهید، تا زمانی که خودتان آن را عوض کنید برای این شخص فعال می‌ماند."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-3 space-y-2",
									children: PERMISSION_KEYS.map((key) => {
										const override = form.permissions[key];
										const allowed = typeof override === "boolean" ? override : CAN[key]?.includes(form.role) ?? false;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissionToggle, {
											label: PERMISSION_LABEL[key] ?? key,
											allowed,
											onToggle: () => setForm({
												...form,
												permissions: {
													...form.permissions,
													[key]: !allowed
												}
											}),
											onReset: typeof override === "boolean" ? () => {
												const next = { ...form.permissions };
												delete next[key];
												setForm({
													...form,
													permissions: next
												});
											} : void 0
										}, key);
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "min-h-13 w-full rounded-xl bg-primary py-3.5 font-extrabold text-primary-foreground",
							children: "ذخیره"
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RolesSheet, {
			open: rolesOpen,
			onOpenChange: setRolesOpen
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
			open: !!deleteId,
			onOpenChange: (o) => !o && setDeleteId(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
				dir: "rtl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "غیرفعال‌سازی کاربر" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "کاربر غیرفعال می‌شود و امکان ورود نخواهد داشت. این کار قابل بازگشت است." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "انصراف" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: () => {
						setState((s) => ({
							...s,
							users: s.users.map((u) => u.id === deleteId ? {
								...u,
								isActive: false
							} : u)
						}));
						if (deleteId) log({
							entity: "user",
							recordId: deleteId,
							action: "غیرفعال‌سازی کاربر"
						});
						setDeleteId(null);
						toast.success("کاربر غیرفعال شد");
					},
					children: "غیرفعال کن"
				})] })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
			open: !!archiveId,
			onOpenChange: (o) => !o && setArchiveId(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
				dir: "rtl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "آرشیو کاربر" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "کاربر آرشیو می‌شود، از فهرست‌های روزمره حذف می‌شود و امکان ورود ندارد؛ اما سابقهٔ وظایف، دستمزدها و ثبت‌های او حفظ می‌شود. هر زمان بخواهید می‌توانید او را بازگردانید." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "انصراف" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: () => {
						setState((s) => ({
							...s,
							users: s.users.map((u) => u.id === archiveId ? {
								...u,
								isArchived: true,
								isActive: false
							} : u)
						}));
						if (archiveId) log({
							entity: "user",
							recordId: archiveId,
							action: "آرشیو کاربر"
						});
						setArchiveId(null);
						toast.success("کاربر آرشیو شد");
					},
					children: "آرشیو کن"
				})] })]
			})
		})
	] });
}
/** Definition of the admin's own roles, each with a fixed access map. */
function RolesSheet({ open, onOpenChange }) {
	const { state, setState, log } = useStore();
	const customRoles = state.customRoles ?? [];
	const [draft, setDraft] = (0, import_react.useState)({
		name: "",
		baseRole: "EMPLOYEE",
		permissions: {}
	});
	function saveRole(e) {
		e.preventDefault();
		const name = draft.name.trim();
		if (!name) {
			toast.error("نام نقش را وارد کنید.");
			return;
		}
		setState((s) => {
			const rest = (s.customRoles ?? []).filter((r) => r.name !== name);
			return {
				...s,
				customRoles: [...rest, {
					...draft,
					name
				}]
			};
		});
		log({
			entity: "user",
			recordId: name,
			action: "تعریف یا ویرایش نقش دلخواه",
			note: name
		});
		setDraft({
			name: "",
			baseRole: "EMPLOYEE",
			permissions: {}
		});
		toast.success("نقش ذخیره شد");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "bottom",
			className: "safe-bottom max-h-[92vh] overflow-y-auto rounded-t-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
				className: "text-start",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "نقش‌ها و دسترسی‌ها" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs leading-6 text-muted-foreground",
						children: [
							"نقش‌های پیش‌فرض سامانه: ",
							Object.keys(ROLE_LABEL).map((r) => ROLE_LABEL[r]).join("، "),
							". می‌توانید نقش دلخواه خودتان را با دسترسی مشخص بسازید و آن را به هر شخص بدهید؛ آن دسترسی تا زمانی که خودتان تغییرش دهید فعال می‌ماند."
						]
					}),
					customRoles.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "app-card divide-y",
						children: customRoles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate font-extrabold",
										children: r.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "truncate text-xs text-muted-foreground",
										children: [
											"پایه: ",
											ROLE_LABEL[r.baseRole],
											" ·",
											" ",
											Object.values(r.permissions).filter(Boolean).length,
											" دسترسی فعال"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setDraft({
										...r,
										permissions: { ...r.permissions }
									}),
									className: "rounded-lg px-3 py-2 text-xs font-bold text-primary hover:bg-accent",
									children: "ویرایش"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setState((s) => ({
											...s,
											customRoles: (s.customRoles ?? []).filter((x) => x.name !== r.name)
										}));
										toast.success("نقش حذف شد");
									},
									className: "rounded-lg px-3 py-2 text-xs font-bold text-destructive hover:bg-destructive/10",
									children: "حذف"
								})
							]
						}, r.name))
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: saveRole,
						className: "space-y-4 rounded-2xl border p-4",
						noValidate: true,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-extrabold",
								children: "نقش دلخواه جدید"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: "role-name",
								label: "نام نقش",
								required: true,
								value: draft.name,
								onChange: (v) => setDraft({
									...draft,
									name: v
								}),
								placeholder: "مثلاً سرپرست تعمیرگاه"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
								id: "role-base",
								label: "نقش پایه (برای قوانین امنیتی)",
								required: true,
								value: draft.baseRole,
								onChange: (v) => setDraft({
									...draft,
									baseRole: v
								}),
								options: Object.keys(ROLE_LABEL).map((r) => ({
									value: r,
									label: ROLE_LABEL[r]
								}))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-2",
								children: PERMISSION_KEYS.map((key) => {
									const allowed = draft.permissions[key] ?? CAN[key]?.includes(draft.baseRole) ?? false;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PermissionToggle, {
										label: PERMISSION_LABEL[key] ?? key,
										allowed,
										onToggle: () => setDraft({
											...draft,
											permissions: {
												...draft.permissions,
												[key]: !allowed
											}
										})
									}, key);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "min-h-13 w-full rounded-xl bg-primary py-3.5 font-extrabold text-primary-foreground",
								children: "ذخیره نقش"
							})
						]
					})
				]
			})]
		})
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersPage, {}) });
//#endregion
export { SplitComponent as component };
