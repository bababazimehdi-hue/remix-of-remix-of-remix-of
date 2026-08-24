import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as Link, y as useParams } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as ShieldCheck, o as Users } from "../_libs/lucide-react.mjs";
import { a as Chip, o as EmptyState, t as AppShell, u as PageHeader } from "./ui-kit-B64qXDLa.mjs";
import { T as can, Y as useStore, g as PERMISSION_GROUPS, q as roleTitle, s as CAN, v as PERMISSION_LABEL, x as ROLE_LABEL } from "./router-DkR-Q5N6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/people._id-D0KBpjfR.js
var import_jsx_runtime = require_jsx_runtime();
function PersonPage() {
	const { id } = useParams({ from: "/people/$id" });
	const { state, user } = useStore();
	const person = state.users.find((u) => u.id === id) ?? null;
	if (!can(user, "users")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-6" }),
		title: "دسترسی ندارید",
		description: "پروندهٔ اشخاص فقط برای پشتیبان (OWNER) در دسترس است."
	}) });
	if (!person) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-6" }),
		title: "شخص پیدا نشد",
		description: "این شخص حذف شده یا هنوز همگام‌سازی نشده است."
	}) });
	const isAdmin = person.role === "ADMIN";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: person.fullName,
			subtitle: `${person.username} — ${roleTitle(person)}`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "app-card grid gap-2 p-4 text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "پست پایه",
					value: ROLE_LABEL[person.role]
				}),
				person.customRole ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "پست سفارشی",
					value: person.customRole
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "عنوان شغلی",
					value: person.title || "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "وضعیت"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						tone: person.isArchived ? "neutral" : person.isActive ? "success" : "warning",
						children: person.isArchived ? "آرشیو" : person.isActive ? "فعال" : "غیرفعال"
					})]
				}),
				person.bio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "توضیحات",
					value: person.bio
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-base font-extrabold",
				children: "دسترسی‌های نهایی"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/permissions",
				className: "flex items-center gap-1 rounded-full border px-3 py-2 text-xs font-bold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4" }), " تغییر دسترسی‌ها"]
			})]
		}),
		isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "app-card mt-3 p-4 text-sm font-bold",
			children: "این شخص پشتیبان است و همیشه بالاترین سطح دسترسی را دارد."
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 space-y-4",
			children: PERMISSION_GROUPS.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "app-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-1 font-extrabold",
					children: group.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y",
					children: group.keys.map((key) => {
						const manual = person.permissions?.[key];
						const fromPost = (CAN[key] ?? []).includes(person.role);
						const allowed = can(person, key);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 text-sm font-bold",
								children: [PERMISSION_LABEL[key] ?? key, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ms-2 text-[10px] font-bold text-muted-foreground",
									children: typeof manual === "boolean" ? "دستی (افزوده به پست)" : fromPost ? "از پست" : "بدون دسترسی پست"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								tone: allowed ? "success" : "neutral",
								children: allowed ? "فعال" : "غیرفعال"
							})]
						}, key);
					})
				})]
			}, group.title))
		})
	] });
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "shrink-0 text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "min-w-0 text-end font-bold",
			children: value
		})]
	});
}
//#endregion
export { PersonPage as component };
