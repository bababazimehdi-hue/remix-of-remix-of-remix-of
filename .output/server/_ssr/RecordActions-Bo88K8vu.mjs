import { r as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { Ct as ChevronRight, D as RotateCcw, F as Pencil, N as Plus, Tt as Check, ct as EllipsisVertical, m as Trash2, u as Undo2, vt as Circle } from "../_libs/lucide-react.mjs";
import { a as Label2, c as Root2, d as SubTrigger2, f as Trigger, i as ItemIndicator2, l as Separator2, n as Content2, o as Portal2, r as Item2, s as RadioItem2, t as CheckboxItem2, u as SubContent2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { d as Sheet, f as SheetContent, m as SheetTitle, p as SheetHeader } from "./ui-kit-B64qXDLa.mjs";
import { c as TextArea, n as DateField, r as Field, s as SelectField, t as AmountField } from "./fields-ESZmE-g5.mjs";
import { a as previousStage, n as TABLE_LABEL, o as restoreArchived } from "./audit-ylIk0p1F.mjs";
import { C as TASK_STATUS_LABEL, D as cn, J as uid, U as nowISO, Y as useStore, b as PRIORITY_LABEL, d as EXPENSE_ORDER, f as INVOICE_STATUS_LABEL, o as BIKE_TYPE_LABEL, u as EXPENSE_LABEL } from "./router-DkR-Q5N6.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-BCB6ZIl6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/RecordActions-Bo88K8vu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
/**
* فرم «اصلاح» رکوردها برای حساب پشتیبان.
*
* پشتیبان در تمام مراحل — حتی رکوردهای نهایی‌شده یا ثبت‌شده در حسابداری —
* می‌تواند همهٔ فیلدهای مجاز را اصلاح کند. ذخیره از همان مسیر موجود
* (`setState` → `pushChanges`) انجام می‌شود و تغییر با `log()` در تاریخچه ثبت
* می‌گردد.
*/
var ENTITY = {
	expense: "expense",
	purchase: "user",
	task: "task",
	invoice: "user",
	message: "message",
	dailyReport: "user"
};
var dateOnly = (v) => v ? v.slice(0, 10) : "";
var PURCHASE_STATUS = [
	"PENDING",
	"APPROVED",
	"REJECTED",
	"SYNCED_TO_ACCOUNTING"
];
var PURCHASE_STATUS_LABEL = {
	PENDING: "در انتظار تأیید",
	APPROVED: "تأیید شده",
	REJECTED: "رد شده",
	SYNCED_TO_ACCOUNTING: "ثبت در حسابداری"
};
function RecordEditForm({ kind, id, note, onClose }) {
	const { state, setState, log } = useStore();
	const original = (0, import_react.useMemo)(() => {
		switch (kind) {
			case "expense": return state.expenses.find((x) => x.id === id) ?? null;
			case "purchase": return state.purchases.find((x) => x.id === id) ?? null;
			case "task": return state.tasks.find((x) => x.id === id) ?? null;
			case "invoice": return state.invoices.find((x) => x.id === id) ?? null;
			case "message": return state.messages.find((x) => x.id === id) ?? null;
			default: return null;
		}
	}, [
		kind,
		id,
		state.expenses,
		state.purchases,
		state.tasks,
		state.invoices,
		state.messages
	]);
	const [draft, setDraft] = (0, import_react.useState)(() => ({ ...original ?? {} }));
	if (!original) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-4 text-sm text-muted-foreground",
		children: "این ثبت دیگر در دسترس نیست."
	});
	const set = (patch) => setDraft((d) => ({
		...d,
		...patch
	}));
	const str = (k) => String(draft[k] ?? "");
	const numv = (k) => Number(draft[k] ?? 0);
	function commit(next) {
		setState((s) => {
			switch (kind) {
				case "expense": return {
					...s,
					expenses: s.expenses.map((x) => x.id === id ? next : x)
				};
				case "purchase": return {
					...s,
					purchases: s.purchases.map((x) => x.id === id ? next : x)
				};
				case "task": return {
					...s,
					tasks: s.tasks.map((x) => x.id === id ? next : x)
				};
				case "invoice": return {
					...s,
					invoices: s.invoices.map((x) => x.id === id ? next : x)
				};
				case "message": return {
					...s,
					messages: s.messages.map((x) => x.id === id ? next : x)
				};
				default: return s;
			}
		});
		log({
			entity: ENTITY[kind],
			recordId: id,
			action: "اصلاح ثبت توسط پشتیبان",
			before: original,
			after: next,
			note
		});
		toast.success("تغییرات ذخیره شد.");
		onClose();
	}
	/**
	* فیلدهای اختیاری با مقدار خالی باید حذف شوند (نه `undefined` شوند)
	* تا با تنظیم سخت‌گیرانهٔ TypeScript سازگار بماند.
	*/
	function withOptional(base, optional) {
		const out = { ...base };
		for (const [key, value] of Object.entries(optional)) if (value === void 0 || value === "" || value === 0) delete out[key];
		else out[key] = value;
		return out;
	}
	function submit(e) {
		e.preventDefault();
		if (kind === "expense") {
			const o = original;
			if (numv("amount") <= 0) {
				toast.error("مبلغ باید بزرگ‌تر از صفر باشد.");
				return;
			}
			commit(withOptional({
				...o,
				category: str("category"),
				name: str("name"),
				amount: numv("amount"),
				date: str("date") || o.date,
				description: str("description"),
				status: str("status") || o.status
			}, {
				relatedUserId: str("relatedUserId"),
				reviewNote: str("reviewNote")
			}));
			return;
		}
		if (kind === "purchase") {
			const o = original;
			if (!str("brand").trim()) {
				toast.error("برند اجباری است.");
				return;
			}
			commit(withOptional({
				...o,
				brand: str("brand"),
				color: str("color"),
				size: str("size"),
				bikeType: str("bikeType") || o.bikeType,
				purchasePrice: numv("purchasePrice"),
				description: str("description"),
				status: str("status") || o.status
			}, { reviewNote: str("reviewNote") }));
			return;
		}
		if (kind === "task") {
			const o = original;
			if (!str("title").trim()) {
				toast.error("عنوان وظیفه اجباری است.");
				return;
			}
			commit(withOptional({
				...o,
				title: str("title"),
				description: str("description"),
				workerId: str("workerId"),
				priority: str("priority") || o.priority,
				wage: numv("wage"),
				status: str("status") || o.status,
				updatedAt: nowISO()
			}, {
				dueDate: str("dueDate") ? new Date(str("dueDate")).toISOString() : "",
				finalWage: numv("finalWage"),
				wageNote: str("wageNote"),
				completedNote: str("completedNote"),
				rejectReason: str("rejectReason")
			}));
			return;
		}
		if (kind === "invoice") {
			const o = original;
			commit({
				...o,
				invoiceNumber: str("invoiceNumber"),
				supplier: str("supplier"),
				date: str("date") || o.date,
				notes: str("notes"),
				status: str("status") || o.status,
				items: draft["items"] ?? o.items
			});
			return;
		}
		if (kind === "message") commit({
			...original,
			text: str("text"),
			editedAt: nowISO()
		});
	}
	const items = draft["items"] ?? [];
	const people = state.users.filter((u) => !u.isArchived);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "space-y-4 p-4",
		noValidate: true,
		children: [
			kind === "expense" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
					id: "rec-category",
					label: "نوع هزینه",
					value: str("category"),
					onChange: (v) => set({ category: v }),
					options: EXPENSE_ORDER.map((c) => ({
						value: c,
						label: EXPENSE_LABEL[c]
					}))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "rec-name",
					label: "عنوان",
					value: str("name"),
					onChange: (v) => set({ name: v })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmountField, {
					id: "rec-amount",
					label: "مبلغ",
					value: numv("amount"),
					onChange: (v) => set({ amount: v }),
					currency: state.currency
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateField, {
					id: "rec-date",
					label: "تاریخ",
					value: dateOnly(str("date")),
					onChange: (v) => set({ date: v })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
					id: "rec-related",
					label: "مربوط به کارمند",
					value: str("relatedUserId"),
					onChange: (v) => set({ relatedUserId: v }),
					options: [{
						value: "",
						label: "—"
					}, ...people.map((u) => ({
						value: u.id,
						label: u.fullName
					}))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					id: "rec-desc",
					label: "توضیحات",
					value: str("description"),
					onChange: (v) => set({ description: v })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
					id: "rec-status",
					label: "وضعیت",
					value: str("status"),
					onChange: (v) => set({ status: v }),
					options: PURCHASE_STATUS.map((s) => ({
						value: s,
						label: PURCHASE_STATUS_LABEL[s]
					}))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					id: "rec-review",
					label: "یادداشت بررسی",
					value: str("reviewNote"),
					onChange: (v) => set({ reviewNote: v })
				})
			] }) : null,
			kind === "purchase" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "rec-brand",
					label: "برند",
					value: str("brand"),
					onChange: (v) => set({ brand: v })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "rec-color",
					label: "رنگ",
					value: str("color"),
					onChange: (v) => set({ color: v })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "rec-size",
					label: "سایز",
					value: str("size"),
					onChange: (v) => set({ size: v })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
					id: "rec-biketype",
					label: "نوع دوچرخه",
					value: str("bikeType"),
					onChange: (v) => set({ bikeType: v }),
					options: Object.keys(BIKE_TYPE_LABEL).map((b) => ({
						value: b,
						label: BIKE_TYPE_LABEL[b]
					}))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmountField, {
					id: "rec-price",
					label: "قیمت خرید",
					value: numv("purchasePrice"),
					onChange: (v) => set({ purchasePrice: v }),
					currency: state.currency
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					id: "rec-desc",
					label: "توضیحات",
					value: str("description"),
					onChange: (v) => set({ description: v })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
					id: "rec-status",
					label: "وضعیت",
					value: str("status"),
					onChange: (v) => set({ status: v }),
					options: PURCHASE_STATUS.map((s) => ({
						value: s,
						label: PURCHASE_STATUS_LABEL[s]
					}))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					id: "rec-review",
					label: "یادداشت بررسی",
					value: str("reviewNote"),
					onChange: (v) => set({ reviewNote: v })
				})
			] }) : null,
			kind === "task" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "rec-title",
					label: "عنوان وظیفه",
					value: str("title"),
					onChange: (v) => set({ title: v })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					id: "rec-desc",
					label: "توضیحات",
					value: str("description"),
					onChange: (v) => set({ description: v })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
					id: "rec-worker",
					label: "تعمیرکار",
					value: str("workerId"),
					onChange: (v) => set({ workerId: v }),
					options: [{
						value: "",
						label: "بدون تخصیص"
					}, ...people.map((u) => ({
						value: u.id,
						label: u.fullName
					}))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
					id: "rec-priority",
					label: "اولویت",
					value: str("priority"),
					onChange: (v) => set({ priority: v }),
					options: Object.keys(PRIORITY_LABEL).map((p) => ({
						value: p,
						label: PRIORITY_LABEL[p]
					}))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateField, {
					id: "rec-due",
					label: "تاریخ سررسید",
					value: dateOnly(str("dueDate")),
					onChange: (v) => set({ dueDate: v })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmountField, {
					id: "rec-wage",
					label: "دستمزد",
					value: numv("wage"),
					onChange: (v) => set({ wage: v }),
					currency: state.currency
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmountField, {
					id: "rec-finalwage",
					label: "دستمزد نهایی",
					value: numv("finalWage"),
					onChange: (v) => set({ finalWage: v }),
					currency: state.currency
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
					id: "rec-status",
					label: "وضعیت",
					value: str("status"),
					onChange: (v) => set({ status: v }),
					options: Object.keys(TASK_STATUS_LABEL).map((s) => ({
						value: s,
						label: TASK_STATUS_LABEL[s]
					}))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					id: "rec-wagenote",
					label: "یادداشت دستمزد",
					value: str("wageNote"),
					onChange: (v) => set({ wageNote: v })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					id: "rec-cnote",
					label: "گزارش انجام کار",
					value: str("completedNote"),
					onChange: (v) => set({ completedNote: v })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					id: "rec-reject",
					label: "دلیل رد",
					value: str("rejectReason"),
					onChange: (v) => set({ rejectReason: v })
				})
			] }) : null,
			kind === "invoice" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "rec-invnum",
					label: "شماره فاکتور",
					value: str("invoiceNumber"),
					onChange: (v) => set({ invoiceNumber: v })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "rec-supplier",
					label: "تأمین‌کننده",
					value: str("supplier"),
					onChange: (v) => set({ supplier: v })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateField, {
					id: "rec-date",
					label: "تاریخ",
					value: dateOnly(str("date")),
					onChange: (v) => set({ date: v })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
					id: "rec-status",
					label: "وضعیت",
					value: str("status"),
					onChange: (v) => set({ status: v }),
					options: Object.keys(INVOICE_STATUS_LABEL).map((s) => ({
						value: s,
						label: INVOICE_STATUS_LABEL[s]
					}))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					id: "rec-notes",
					label: "یادداشت",
					value: str("notes"),
					onChange: (v) => set({ notes: v })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-extrabold",
							children: "اقلام فاکتور"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => set({ items: [...items, {
								id: uid("ii"),
								productName: "",
								probableQty: 1,
								probableUnitPrice: 0
							}] }),
							className: "flex items-center gap-1 rounded-full bg-accent px-3 py-2 text-xs font-bold text-accent-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " افزودن قلم"]
						})]
					}), items.map((it, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 rounded-2xl border p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-bold text-muted-foreground",
									children: ["قلم ", index + 1]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "حذف قلم",
									onClick: () => set({ items: items.filter((x) => x.id !== it.id) }),
									className: "text-destructive",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: `rec-item-name-${it.id}`,
								label: "نام کالا",
								value: it.productName,
								onChange: (v) => set({ items: items.map((x) => x.id === it.id ? {
									...x,
									productName: v
								} : x) })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										id: `rec-item-pq-${it.id}`,
										label: "تعداد احتمالی",
										type: "number",
										value: String(it.probableQty),
										onChange: (v) => set({ items: items.map((x) => x.id === it.id ? {
											...x,
											probableQty: Number(v) || 0
										} : x) })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmountField, {
										id: `rec-item-pp-${it.id}`,
										label: "قیمت واحد احتمالی",
										value: it.probableUnitPrice,
										currency: state.currency,
										onChange: (v) => set({ items: items.map((x) => x.id === it.id ? {
											...x,
											probableUnitPrice: v
										} : x) })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										id: `rec-item-fq-${it.id}`,
										label: "تعداد نهایی",
										type: "number",
										value: it.finalQty == null ? "" : String(it.finalQty),
										onChange: (v) => set({ items: items.map((x) => x.id === it.id ? {
											...x,
											finalQty: v === "" ? void 0 : Number(v) || 0
										} : x) })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmountField, {
										id: `rec-item-fp-${it.id}`,
										label: "قیمت واحد نهایی",
										value: it.finalUnitPrice ?? 0,
										currency: state.currency,
										onChange: (v) => set({ items: items.map((x) => x.id === it.id ? {
											...x,
											finalUnitPrice: v
										} : x) })
									})
								]
							})
						]
					}, it.id))]
				})
			] }) : null,
			kind === "message" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
				id: "rec-text",
				label: "متن پیام",
				value: str("text"),
				onChange: (v) => set({ text: v })
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "min-h-13 flex-1 rounded-xl bg-primary py-3.5 font-extrabold text-primary-foreground",
					children: "ذخیره تغییرات"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "min-h-13 rounded-xl border px-5 font-bold",
					children: "انصراف"
				})]
			})
		]
	});
}
/**
* منوی «عملیات» رکوردها برای حساب پشتیبان (OWNER).
*
* چهار عملیات استاندارد روی هر ثبت: اصلاح، حذف (Soft-delete موجود)،
* بازگردانی از بایگانی و برگشت به مرحلهٔ قبل.
*
* این لایه فقط Frontend است: نوشتن‌ها از همان مسیرهای موجود
* (`setState` → `pushChanges`، `soft_delete_record`، `restoreRecord`) انجام
* می‌شود و هر عملیات با `log()` در تاریخچه/Audit ثبت می‌گردد. هیچ بررسی
* امنیتی سمت سرور دور زده نمی‌شود؛ اگر پایگاه‌داده اجازه ندهد، خطا نمایش
* داده می‌شود.
*/
var RECORD_TABLE = {
	expense: "expenses",
	purchase: "bicycle_purchases",
	task: "tasks",
	invoice: "purchase_invoices",
	message: "messages",
	dailyReport: "daily_reports"
};
var RECORD_ENTITY = {
	expense: "expense",
	purchase: "user",
	task: "task",
	invoice: "user",
	message: "message",
	dailyReport: "user"
};
var STATUS_LABEL = {
	...TASK_STATUS_LABEL,
	...INVOICE_STATUS_LABEL,
	PENDING: "در انتظار",
	APPROVED: "تأیید شده",
	REJECTED: "رد شده",
	SYNCED_TO_ACCOUNTING: "ثبت در حسابداری"
};
var statusLabel = (s) => s ? STATUS_LABEL[s] ?? s : "—";
/**
* فقط حساب پشتیبان/OWNER کنترل‌های کامل رکورد را می‌بیند.
* (پایگاه‌داده هم همین سطح را جداگانه بررسی می‌کند.)
*/
function isRecordSupervisor(user) {
	if (!user) return false;
	if (!user.isActive || user.isArchived) return false;
	return user.role === "ADMIN";
}
var DELETE_CONFIRM_TEXT = "آیا مطمئن هستید که می‌خواهید این ثبت را حذف کنید؟";
/** حذف رکورد از استور؛ مسیر موجود آن را Soft-delete می‌کند. */
function removeFromState(kind, id) {
	return (s) => {
		switch (kind) {
			case "expense": return {
				...s,
				expenses: s.expenses.filter((x) => x.id !== id)
			};
			case "purchase": return {
				...s,
				purchases: s.purchases.filter((x) => x.id !== id)
			};
			case "task": return {
				...s,
				tasks: s.tasks.filter((x) => x.id !== id)
			};
			case "invoice": return {
				...s,
				invoices: s.invoices.filter((x) => x.id !== id)
			};
			case "message": return {
				...s,
				messages: s.messages.filter((x) => x.id !== id)
			};
			default: return s;
		}
	};
}
/** تغییر وضعیت رکورد به مرحلهٔ قبل، بدون دست‌زدن به سایر فیلدها. */
function setStatusInState(kind, id, status) {
	return (s) => {
		const apply = (list) => list.map((r) => r.id === id ? {
			...r,
			status
		} : r);
		switch (kind) {
			case "expense": return {
				...s,
				expenses: apply(s.expenses)
			};
			case "purchase": return {
				...s,
				purchases: apply(s.purchases)
			};
			case "task": return {
				...s,
				tasks: apply(s.tasks)
			};
			case "invoice": return {
				...s,
				invoices: apply(s.invoices)
			};
			default: return s;
		}
	};
}
function RecordActions({ kind, id, title, status, archived = false, onEdit, onDelete, onDone, className, tone = "default" }) {
	const { state, setState, user, log } = useStore();
	const [editOpen, setEditOpen] = (0, import_react.useState)(false);
	const [confirmOpen, setConfirmOpen] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const table = RECORD_TABLE[kind];
	const target = (0, import_react.useMemo)(() => previousStage(table, status ?? null), [table, status]);
	const editable = kind !== "dailyReport" || !!onEdit;
	if (!isRecordSupervisor(user)) return null;
	const note = `${TABLE_LABEL[table] ?? table} — ${title}`;
	function record(list) {
		return list.find((x) => x.id === id);
	}
	function snapshot() {
		switch (kind) {
			case "expense": return record(state.expenses);
			case "purchase": return record(state.purchases);
			case "task": return record(state.tasks);
			case "invoice": return record(state.invoices);
			case "message": return record(state.messages);
			default: return;
		}
	}
	async function doDelete() {
		setBusy(true);
		try {
			const before = snapshot();
			if (onDelete) await onDelete();
			else setState(removeFromState(kind, id));
			log({
				entity: RECORD_ENTITY[kind],
				recordId: id,
				action: "حذف ثبت (بایگانی)",
				...before ? { before } : {},
				note
			});
			toast.success("ثبت حذف (بایگانی) شد.");
			onDone?.();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "حذف ناموفق بود.");
		} finally {
			setBusy(false);
			setConfirmOpen(false);
		}
	}
	async function doRestore() {
		setBusy(true);
		try {
			await restoreArchived(table, id);
			log({
				entity: RECORD_ENTITY[kind],
				recordId: id,
				action: "بازگردانی ثبت از بایگانی",
				note
			});
			toast.success("ثبت بازگردانی شد.");
			onDone?.();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "بازگردانی ناموفق بود.");
		} finally {
			setBusy(false);
		}
	}
	/** برگشت مستقیم و بدون واسطه به مرحلهٔ قبل. */
	function doReverse() {
		if (!target || !status) return;
		const before = snapshot();
		setState(setStatusInState(kind, id, target));
		log({
			entity: RECORD_ENTITY[kind],
			recordId: id,
			action: "برگشت به مرحلهٔ قبل",
			...before ? { before } : {},
			after: { status: target },
			note: `${note}: ${statusLabel(status)} ← ${statusLabel(target)}`
		});
		toast.success(`به مرحلهٔ «${statusLabel(target)}» بازگشت.`);
		onDone?.();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
			"aria-label": "عملیات روی این ثبت",
			disabled: busy,
			onClick: (e) => {
				e.preventDefault();
				e.stopPropagation();
			},
			className: cn("inline-grid size-9 shrink-0 place-items-center rounded-full transition-colors", tone === "onHero" ? "text-on-hero hover:bg-on-hero/10" : "text-muted-foreground hover:bg-muted", className),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "size-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
			align: "start",
			className: "w-56 text-start",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, {
					className: "text-start text-xs text-muted-foreground",
					children: "عملیات پشتیبان"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					disabled: !editable,
					onSelect: (e) => {
						e.preventDefault();
						if (onEdit) onEdit();
						else setEditOpen(true);
					},
					className: "gap-2 font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), " اصلاح"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					disabled: !target,
					onSelect: (e) => {
						e.preventDefault();
						doReverse();
					},
					className: "gap-2 font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, { className: "size-4" }), target ? `برگشت به «${statusLabel(target)}»` : "برگشت به مرحله قبل"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					disabled: !archived,
					onSelect: (e) => {
						e.preventDefault();
						doRestore();
					},
					className: "gap-2 font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), " بازگردانی"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
					onSelect: (e) => {
						e.preventDefault();
						setConfirmOpen(true);
					},
					className: "gap-2 font-bold text-destructive focus:text-destructive",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), " حذف"]
				})
			]
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
			open: confirmOpen,
			onOpenChange: setConfirmOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
				dir: "rtl",
				className: "text-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
					className: "text-start",
					children: DELETE_CONFIRM_TEXT
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, {
					className: "text-start",
					children: note
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "انصراف" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: (e) => {
						e.preventDefault();
						doDelete();
					},
					className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
					children: "حذف"
				})] })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
			open: editOpen,
			onOpenChange: setEditOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
				side: "bottom",
				dir: "rtl",
				className: "safe-bottom max-h-[92vh] overflow-y-auto rounded-t-3xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
					className: "text-start",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, { children: ["اصلاح ثبت — ", title] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordEditForm, {
					kind,
					id,
					note,
					onClose: () => {
						setEditOpen(false);
						onDone?.();
					}
				})]
			})
		})
	] });
}
//#endregion
export { RecordActions as t };
