import { r as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as RotateCcw, T as Save, b as ShieldCheck } from "../_libs/lucide-react.mjs";
import { D as useNow, o as EmptyState, u as PageHeader, y as faFullMoment } from "./ui-kit-B64qXDLa.mjs";
import { T as can, Y as useStore, g as PERMISSION_GROUPS, q as roleTitle, s as CAN, v as PERMISSION_LABEL } from "./router-DkR-Q5N6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PermissionsManager-DNziI0vH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Toggle({ label, allowed, isOverride, onToggle, onReset }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex items-center justify-between gap-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0 text-sm font-bold",
			children: [label, isOverride ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ms-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground",
				children: "تعیین‌شده توسط پشتیبان"
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex shrink-0 items-center gap-2",
			children: [isOverride ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
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
function PermissionsManager({ compact = false }) {
	const { state, setState, user, log } = useStore();
	const now = useNow(1e3);
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const [draft, setDraft] = (0, import_react.useState)({});
	const people = (0, import_react.useMemo)(() => state.users.filter((u) => !u.isArchived).sort((a, b) => a.fullName.localeCompare(b.fullName, "fa")), [state.users]);
	if (!can(user, "users")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-6" }),
		title: "دسترسی ندارید",
		description: "بخش تغییر دسترسی کاربران فقط برای پشتیبان باز است."
	});
	const selected = people.find((u) => u.id === selectedId) ?? null;
	function select(u) {
		setSelectedId(u.id);
		setDraft({ ...u.permissions ?? {} });
	}
	function roleDefault(u, key) {
		return CAN[key]?.includes(u.role) ?? false;
	}
	function save() {
		if (!selected) return;
		const changed = Object.keys({
			...selected.permissions ?? {},
			...draft
		}).filter((k) => (selected.permissions ?? {})[k] !== draft[k]);
		setState((s) => ({
			...s,
			users: s.users.map((u) => u.id === selected.id ? {
				...u,
				permissions: { ...draft }
			} : u)
		}));
		log({
			entity: "user",
			recordId: selected.id,
			action: "تغییر دسترسی‌ها توسط پشتیبان",
			note: `${selected.fullName} — ${changed.length ? changed.map((k) => `${PERMISSION_LABEL[k] ?? k}: ${draft[k] ? "فعال" : "غیرفعال"}`).join("، ") : "بدون تغییر"}`
		});
		toast.success("دسترسی‌ها ذخیره شد و تا تغییر بعدی پشتیبان پایدار می‌ماند.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		compact ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "تغییر دسترسی کاربران",
			subtitle: "پشتیبان بالاترین دسترسی را دارد و می‌تواند دسترسی هر شخص را فعال یا غیرفعال کند"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-4 text-xs font-bold text-muted-foreground",
			children: ["اکنون: ", faFullMoment(now)]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-2 text-base font-extrabold",
			children: compact ? "روی هر کاربر بزنید تا دسترسی‌هایش را تغییر دهید" : "انتخاب شخص"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "app-card mb-5 divide-y",
			children: people.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => select(u),
				className: `flex w-full items-center gap-3 p-4 text-start ${selectedId === u.id ? "bg-accent/60" : ""}`,
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
			}) }, u.id))
		}),
		!selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "برای دیدن و تغییر دسترسی‌ها یک شخص را انتخاب کنید."
		}) : selected.role === "ADMIN" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "app-card p-4 text-sm font-bold",
			children: [selected.fullName, " پشتیبان است و همیشه بالاترین دسترسی را دارد؛ دسترسی‌های پشتیبان قابل محدودسازی نیست."]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "text-base font-extrabold",
				children: ["دسترسی‌های ", selected.fullName]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setDraft({}),
					className: "flex items-center gap-1 rounded-full border px-3 py-2 text-xs font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), " بازگشت به پیش‌فرض نقش"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: save,
					className: "flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), " ذخیره"]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children: PERMISSION_GROUPS.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "app-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-1 font-extrabold",
					children: group.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y",
					children: group.keys.map((key) => {
						const override = draft[key];
						const allowed = typeof override === "boolean" ? override : roleDefault(selected, key);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
							label: PERMISSION_LABEL[key] ?? key,
							allowed,
							isOverride: typeof override === "boolean",
							onToggle: () => setDraft({
								...draft,
								[key]: !allowed
							}),
							onReset: () => {
								const next = { ...draft };
								delete next[key];
								setDraft(next);
							}
						}, key);
					})
				})]
			}, group.title))
		})] })
	] });
}
//#endregion
export { PermissionsManager as t };
