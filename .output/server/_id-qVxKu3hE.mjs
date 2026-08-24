import { r as __toESM } from "./_runtime.mjs";
import { N as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, g as Link, y as useParams } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { It as ArrowRight, N as Plus, it as FileCheckCorner, m as Trash2, n as Wrench, xt as CircleCheck, yt as CircleX } from "./_libs/lucide-react.mjs";
import { S as money, a as Chip, d as Sheet, f as SheetContent, g as faDate, m as SheetTitle, o as EmptyState, p as SheetHeader, t as AppShell, u as PageHeader, v as faDateTimeLong } from "./_ssr/ui-kit-B64qXDLa.mjs";
import { a as InfoRow, c as TextArea, r as Field, s as SelectField, t as AmountField } from "./_ssr/fields-ESZmE-g5.mjs";
import { C as TASK_STATUS_LABEL, J as uid, T as can, U as nowISO, Y as useStore, o as BIKE_TYPE_LABEL } from "./_ssr/router-DkR-Q5N6.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./_ssr/alert-dialog-BCB6ZIl6.mjs";
import { t as RecordActions } from "./_ssr/RecordActions-Bo88K8vu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-qVxKu3hE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PRESETS = [
	"پنچرگیری",
	"تنظیم باد",
	"سرویس کامل",
	"تعویض قطعه",
	"تنظیم ترمز",
	"تعمیر دلخواه"
];
var emptyLine = (workerId) => ({
	id: uid("line"),
	title: "",
	workerId,
	wage: 0,
	description: ""
});
/**
* Bottom sheet that registers one or more repair services for a single bike.
* Every service becomes a task (with wage) assigned to the chosen mechanic and
* stays linked to the bike through `bikeId`.
*/
function RepairSheet({ bike, open, onOpenChange }) {
	const { state, setState, user, notify } = useStore();
	const workers = state.users.filter((u) => u.isActive && !u.isArchived && (u.isWorker || u.role === "MECHANIC"));
	const [lines, setLines] = (0, import_react.useState)([emptyLine("")]);
	function reset() {
		setLines([emptyLine(workers[0]?.id ?? "")]);
	}
	function patch(id, p) {
		setLines((ls) => ls.map((l) => l.id === id ? {
			...l,
			...p
		} : l));
	}
	function submit(e) {
		e.preventDefault();
		if (!bike || !user) return;
		for (const l of lines) {
			if (!l.title.trim()) {
				toast.error("نام خدمت را برای همه تعمیرها وارد کنید.");
				return;
			}
			if (!l.workerId) {
				toast.error("برای هر تعمیر یک تعمیرکار انتخاب کنید.");
				return;
			}
			if (!(l.wage > 0)) {
				toast.error("مبلغ دستمزد باید بیشتر از صفر باشد.");
				return;
			}
		}
		const now = nowISO();
		const created = lines.map((l) => ({
			id: uid("t"),
			workerId: l.workerId,
			bikeId: bike.id,
			title: l.title.trim(),
			description: l.description.trim() || `${bike.brand} · سایز ${bike.size} · ${BIKE_TYPE_LABEL[bike.bikeType]}`,
			priority: "MEDIUM",
			wage: l.wage,
			status: "PENDING",
			createdBy: user.id,
			createdAt: now
		}));
		setState((s) => ({
			...s,
			tasks: [...created, ...s.tasks],
			purchases: s.purchases.map((p) => p.id === bike.id && !p.repairTaskId ? {
				...p,
				repairTaskId: created[0].id
			} : p)
		}));
		notify({
			userRole: ["MECHANIC"],
			userIds: [...new Set(created.map((t) => t.workerId))],
			title: "دوچرخه برای تعمیر ارسال شد",
			body: `${bike.brand} سایز ${bike.size} – ${created.map((t) => t.title).join("، ")}`,
			url: "/tasks",
			type: "task",
			event: "NEW_TASK"
		});
		reset();
		onOpenChange(false);
		toast.success(`${created.length} تعمیر برای این دوچرخه ثبت شد`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange: (o) => {
			if (o) reset();
			onOpenChange(o);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "bottom",
			className: "safe-bottom max-h-[92vh] overflow-y-auto rounded-t-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
				className: "text-start",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-5 text-primary" }),
						" ارسال برای تعمیر",
						bike ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-bold text-muted-foreground",
							children: bike.brand
						}) : null
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "space-y-4 p-4",
				noValidate: true,
				children: [
					lines.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "app-card space-y-3 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm font-extrabold",
									children: ["تعمیر ", i + 1]
								}), lines.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "حذف این تعمیر",
									onClick: () => setLines((ls) => ls.filter((x) => x.id !== l.id)),
									className: "flex size-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => patch(l.id, { title: p }),
									"aria-pressed": l.title === p,
									className: `min-h-10 rounded-full px-3 text-xs font-bold ${l.title === p ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`,
									children: p
								}, p))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: `repair-title-${l.id}`,
								label: "نام خدمت",
								required: true,
								value: l.title,
								onChange: (v) => patch(l.id, { title: v }),
								placeholder: "مثلاً پنچرگیری چرخ عقب"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
								id: `repair-worker-${l.id}`,
								label: "تعمیرکار",
								required: true,
								value: l.workerId,
								onChange: (v) => patch(l.id, { workerId: v }),
								options: [{
									value: "",
									label: "انتخاب کنید"
								}, ...workers.map((w) => ({
									value: w.id,
									label: `${w.fullName} – ${w.title}`
								}))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmountField, {
								id: `repair-wage-${l.id}`,
								label: "دستمزد",
								required: true,
								currency: state.currency,
								value: l.wage,
								onChange: (v) => patch(l.id, { wage: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
								id: `repair-desc-${l.id}`,
								label: "توضیحات (اختیاری)",
								value: l.description,
								onChange: (v) => patch(l.id, { description: v })
							})
						]
					}, l.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setLines((ls) => [...ls, emptyLine(workers[0]?.id ?? "")]),
						className: "flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-secondary text-sm font-extrabold text-secondary-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " افزودن تعمیر دیگر"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "min-h-13 w-full rounded-xl bg-primary py-3.5 text-base font-extrabold text-primary-foreground",
						children: "ثبت و ارسال به تعمیرکار"
					})
				]
			})]
		})
	});
}
function PurchaseDetail() {
	const { id } = useParams({ from: "/bicycle-purchases/$id" });
	const { state, setState, user, notify } = useStore();
	const navigate = useNavigate();
	const [rejectOpen, setRejectOpen] = (0, import_react.useState)(false);
	const [reason, setReason] = (0, import_react.useState)("");
	const [accRef, setAccRef] = (0, import_react.useState)("");
	const [repairOpen, setRepairOpen] = (0, import_react.useState)(false);
	const item = state.purchases.find((p) => p.id === id);
	if (!item || !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-6" }),
		title: "خرید یافت نشد",
		description: "این رکورد حذف شده یا دسترسی به آن ندارید."
	});
	const creator = state.users.find((u) => u.id === item.createdBy);
	function update(patch) {
		setState((s) => ({
			...s,
			purchases: s.purchases.map((p) => p.id === id ? {
				...p,
				...patch
			} : p)
		}));
	}
	function approve() {
		update({ status: "APPROVED" });
		notify({
			userRole: ["EMPLOYEE", "STORE_MANAGER"],
			title: "خرید دوچرخه تأیید شد",
			body: `خرید ${item.brand} تأیید شد.`,
			url: "/bicycle-purchases",
			type: "purchase",
			priority: "NORMAL"
		});
		toast.success("خرید تأیید شد");
	}
	function reject() {
		if (!reason.trim()) {
			toast.error("دلیل رد کردن اجباری است.");
			return;
		}
		update({
			status: "REJECTED",
			reviewNote: reason
		});
		notify({
			userRole: ["EMPLOYEE"],
			title: "خرید دوچرخه رد شد",
			body: `دلیل: ${reason}`,
			url: "/bicycle-purchases",
			type: "purchase",
			priority: "NORMAL"
		});
		setRejectOpen(false);
		toast.success("خرید رد شد");
	}
	function sync() {
		if (!accRef.trim()) {
			toast.error("شماره سند حسابداری را وارد کنید.");
			return;
		}
		update({
			status: "SYNCED_TO_ACCOUNTING",
			accountingRef: accRef
		});
		toast.success("به‌عنوان ثبت‌شده در حسابداری علامت‌گذاری شد");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => navigate({ to: "/bicycle-purchases" }),
			className: "mb-3 flex items-center gap-1 text-sm font-bold text-primary",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" }), " بازگشت به لیست"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: item.brand,
			subtitle: `ثبت‌شده توسط ${creator?.fullName ?? "نامشخص"}`,
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					tone: {
						PENDING: "warning",
						APPROVED: "success",
						REJECTED: "danger",
						SYNCED_TO_ACCOUNTING: "info"
					}[item.status],
					children: {
						PENDING: "در انتظار تایید",
						APPROVED: "تایید شده",
						REJECTED: "رد شده",
						SYNCED_TO_ACCOUNTING: "ثبت‌شده در حسابداری"
					}[item.status]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordActions, {
					kind: "purchase",
					id: item.id,
					title: item.brand,
					status: item.status,
					onDone: () => void navigate({ to: "/bicycle-purchases" })
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "app-card divide-y p-4 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
					label: "سایز",
					children: item.size
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
					label: "رنگ",
					children: item.color
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
					label: "نوع دوچرخه",
					children: BIKE_TYPE_LABEL[item.bikeType]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
					label: "قیمت خرید",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "num",
						children: money(item.purchasePrice, state.currency)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
					label: "تاریخ ثبت",
					children: faDateTimeLong(item.createdAt)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
					label: "توضیحات",
					children: item.description || "—"
				}),
				item.reviewNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
					label: "دلیل رد",
					children: item.reviewNote
				}) : null,
				item.accountingRef ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
					label: "شماره سند",
					children: item.accountingRef
				}) : null
			]
		}),
		can(user, "write") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setRepairOpen(true),
			className: "mt-4 flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-base font-extrabold text-primary-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-5" }), " ارسال برای تعمیر"]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RepairHistory, { bikeId: item.id }),
		can(user, "approve") && item.status === "PENDING" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: approve,
				className: "flex min-h-13 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 font-extrabold text-primary-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5" }), " تأیید خرید"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setRejectOpen(true),
				className: "flex min-h-13 items-center justify-center gap-2 rounded-xl bg-destructive/10 px-4 py-3.5 font-bold text-destructive",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-5" }), " رد کردن"]
			})]
		}) : null,
		can(user, "syncAccounting") && item.status === "APPROVED" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "app-card mt-4 space-y-3 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "flex items-center gap-2 font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheckCorner, { className: "size-5 text-primary" }), " ثبت در حسابداری"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: accRef,
					onChange: (e) => setAccRef(e.target.value),
					placeholder: "شماره سند حسابداری، مثلاً ACC-1402-095",
					"aria-label": "شماره سند حسابداری",
					className: "h-12 w-full rounded-xl border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: sync,
					className: "min-h-12 w-full rounded-xl bg-primary font-bold text-primary-foreground",
					children: "علامت‌گذاری به‌عنوان منتقل‌شده"
				})
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
			open: rejectOpen,
			onOpenChange: setRejectOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
				dir: "rtl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "رد کردن خرید دوچرخه" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "دلیل رد کردن اجباری است و برای ثبت‌کننده ارسال می‌شود." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						rows: 3,
						value: reason,
						onChange: (e) => setReason(e.target.value),
						placeholder: "دلیل رد...",
						"aria-label": "دلیل رد",
						className: "w-full rounded-xl border bg-card p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "انصراف" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
						onClick: reject,
						children: "ثبت رد"
					})] })
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RepairSheet, {
			bike: item,
			open: repairOpen,
			onOpenChange: setRepairOpen
		})
	] });
}
var taskTone = (s) => s === "APPROVED" || s === "SYNCED_TO_ACCOUNTING" ? "success" : s === "REJECTED" || s === "CANCELLED" ? "danger" : s === "SUBMITTED" ? "info" : s === "IN_PROGRESS" ? "primary" : "warning";
/** Repair history for one bike: service, mechanic, wage, status and date. */
function RepairHistory({ bikeId }) {
	const { state } = useStore();
	const repairs = state.tasks.filter((t) => t.bikeId === bikeId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "app-card mt-4 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
			className: "mb-3 flex items-center gap-2 font-extrabold",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-5 text-primary" }), " تاریخچه تعمیرات"]
		}), repairs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "تا کنون تعمیری برای این دوچرخه ثبت نشده است."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y",
			children: repairs.map((t) => {
				const worker = state.users.find((u) => u.id === t.workerId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "py-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/tasks/$id",
						params: { id: t.id },
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "min-w-0 font-bold",
								children: t.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								tone: taskTone(t.status),
								children: TASK_STATUS_LABEL[t.status]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: [
								"تعمیرکار: ",
								worker?.fullName ?? "تخصیص‌نیافته",
								" ·",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "num",
									children: money(t.finalWage ?? t.wage, state.currency)
								}),
								" ·",
								" ",
								faDate(t.createdAt)
							]
						})]
					})
				}, t.id);
			})
		})]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PurchaseDetail, {}) });
//#endregion
export { SplitComponent as component };
