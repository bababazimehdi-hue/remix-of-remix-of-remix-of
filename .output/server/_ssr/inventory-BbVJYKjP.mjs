import { r as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as Ruler, Pt as BadgeCheck, R as Palette, jt as Bike, n as Wrench, w as Search } from "../_libs/lucide-react.mjs";
import { S as money, T as toFa, _ as faDateTime, a as Chip, c as FilterChips, d as Sheet, f as SheetContent, l as ListSkeleton, m as SheetTitle, o as EmptyState, p as SheetHeader, t as AppShell, u as PageHeader } from "./ui-kit-B64qXDLa.mjs";
import { c as TextArea, r as Field, s as SelectField, t as AmountField } from "./fields-ESZmE-g5.mjs";
import { C as TASK_STATUS_LABEL, J as uid, T as can, U as nowISO, Y as useStore, a as BIKE_SIZES, o as BIKE_TYPE_LABEL, z as isRepairedBike } from "./router-DkR-Q5N6.mjs";
import { n as markBikeRepaired } from "./repaired-bikes-lNJenpJy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inventory-BbVJYKjP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function InventoryPage() {
	const { state, setState, user, notify, loading } = useStore();
	const [q, setQ] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("ALL");
	const [size, setSize] = (0, import_react.useState)("ALL");
	const [repairFor, setRepairFor] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		workerId: "",
		title: "",
		description: "",
		wage: 0
	});
	const isManager = can(user, "approve");
	const workers = state.users.filter((u) => u.isActive && (u.isWorker || u.role === "MECHANIC"));
	/** Only bikes that are actually owned by the shop (approved, not yet repaired). */
	const bikes = (0, import_react.useMemo)(() => state.purchases.filter((p) => !isRepairedBike(p) && (p.status === "APPROVED" || p.status === "SYNCED_TO_ACCOUNTING")), [state.purchases]);
	function moveToRepaired(bike) {
		if (!user) return;
		setState((s) => ({
			...s,
			purchases: markBikeRepaired(s.purchases, bike.id, user.id)
		}));
		toast.success("دوچرخه به بخش «تعمیر شده‌ها» منتقل شد");
	}
	const list = (0, import_react.useMemo)(() => bikes.filter((b) => type === "ALL" || b.bikeType === type).filter((b) => size === "ALL" || b.size === size).filter((b) => q ? (b.brand + b.color + b.size).includes(q.trim()) : true), [
		bikes,
		type,
		size,
		q
	]);
	const bySize = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const b of bikes) map.set(b.size, (map.get(b.size) ?? 0) + 1);
		return [...BIKE_SIZES].filter((s) => map.has(s)).map((s) => [s, map.get(s)]);
	}, [bikes]);
	const byType = (0, import_react.useMemo)(() => Object.keys(BIKE_TYPE_LABEL).map((t) => [t, bikes.filter((b) => b.bikeType === t).length]), [bikes]);
	function taskOf(bike) {
		return bike.repairTaskId ? state.tasks.find((t) => t.id === bike.repairTaskId) : void 0;
	}
	function openRepair(bike) {
		setForm({
			workerId: workers[0]?.id ?? "",
			title: `تعمیر دوچرخه ${bike.brand} سایز ${bike.size}`,
			description: `رنگ: ${bike.color} · دسته: ${BIKE_TYPE_LABEL[bike.bikeType]}`,
			wage: 0
		});
		setRepairFor(bike);
	}
	function sendToRepair(e) {
		e.preventDefault();
		const bike = repairFor;
		if (!bike || !user) return;
		if (!form.workerId) {
			toast.error("یک تعمیرکار انتخاب کنید.");
			return;
		}
		if (!form.title.trim()) {
			toast.error("عنوان کار را وارد کنید.");
			return;
		}
		if (form.wage <= 0) {
			toast.error("دستمزد را وارد کنید.");
			return;
		}
		const taskId = uid("t");
		setState((s) => ({
			...s,
			tasks: [{
				id: taskId,
				workerId: form.workerId,
				bikeId: bike.id,
				title: form.title.trim(),
				description: form.description.trim(),
				priority: "MEDIUM",
				wage: form.wage,
				status: "PENDING",
				createdBy: user.id,
				createdAt: nowISO()
			}, ...s.tasks],
			purchases: s.purchases.map((p) => p.id === bike.id ? {
				...p,
				repairTaskId: taskId
			} : p)
		}));
		notify({
			userRole: ["MECHANIC"],
			userIds: [form.workerId],
			title: "دوچرخه برای تعمیر ارسال شد",
			body: `${bike.brand} سایز ${bike.size} – ${form.title.trim()}`,
			url: "/tasks",
			type: "task",
			event: "NEW_TASK"
		});
		setRepairFor(null);
		toast.success("دوچرخه برای تعمیرکار ارسال شد");
	}
	if (!user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "دوچرخه‌ها",
			subtitle: `${toFa(bikes.length)} دوچرخه موجود`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "app-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "کل دوچرخه‌ها"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "num mt-1 text-2xl font-extrabold text-primary",
					children: toFa(bikes.length)
				})]
			}), byType.map(([t, count]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "app-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: BIKE_TYPE_LABEL[t]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "num mt-1 text-2xl font-extrabold",
					children: toFa(count)
				})]
			}, t))]
		}),
		bySize.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "app-card mb-4 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mb-3 flex items-center gap-2 text-sm font-extrabold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ruler, { className: "size-4 text-primary" }), " تعداد بر اساس سایز"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: bySize.map(([s, count]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
					tone: "info",
					children: [
						"سایز ",
						toFa(s),
						": ",
						toFa(count),
						" عدد"
					]
				}, s))
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center gap-2 rounded-2xl border bg-card px-4 focus-within:ring-2 focus-within:ring-ring",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "جستجو بر اساس برند، رنگ یا سایز...",
				"aria-label": "جستجوی دوچرخه",
				className: "h-12 w-full bg-transparent text-sm outline-none"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChips, {
			value: type,
			onChange: setType,
			options: [{
				value: "ALL",
				label: "همه دسته‌ها"
			}, ...Object.keys(BIKE_TYPE_LABEL).map((t) => ({
				value: t,
				label: BIKE_TYPE_LABEL[t]
			}))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChips, {
				value: size,
				onChange: setSize,
				options: [{
					value: "ALL",
					label: "همه سایزها"
				}, ...BIKE_SIZES.map((s) => ({
					value: s,
					label: `سایز ${toFa(s)}`
				}))]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, {}) : list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bike, { className: "size-6" }),
				title: "دوچرخه‌ای ثبت نشده است",
				description: "فقط خریدهای تأییدشده در این فهرست نمایش داده می‌شوند."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-3 sm:grid-cols-2",
				children: list.map((b) => {
					const task = taskOf(b);
					const inRepair = task && task.status !== "APPROVED" && task.status !== "CANCELLED";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "app-card overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2 bg-secondary px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
								tone: "primary",
								children: ["سایز ", toFa(b.size)]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-muted-foreground",
								children: BIKE_TYPE_LABEL[b.bikeType]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-extrabold",
									children: b.brand
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 flex items-center gap-1 text-sm text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, { className: "size-4" }),
										" رنگ: ",
										b.color,
										" · ثبت: ",
										faDateTime(b.createdAt)
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex items-center justify-between gap-2 border-t pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "num text-sm font-extrabold",
										children: money(b.purchasePrice, state.currency)
									}), task ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
										tone: inRepair ? "warning" : "success",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-3.5" }),
											" ",
											TASK_STATUS_LABEL[task.status]
										]
									}) : null]
								}),
								isManager ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => openRepair(b),
									disabled: !!inRepair,
									className: "mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-extrabold text-primary-foreground disabled:opacity-50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-4" }), inRepair ? "در حال تعمیر" : "ارسال برای تعمیر"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => moveToRepaired(b),
									className: "mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-primary/40 bg-accent text-sm font-extrabold text-accent-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "size-4" }), "انتقال به دوچرخه‌های تعمیر شده"]
								})] }) : null
							]
						})]
					}, b.id);
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
			open: !!repairFor,
			onOpenChange: (o) => !o && setRepairFor(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
				side: "bottom",
				className: "safe-bottom max-h-[90vh] overflow-y-auto rounded-t-3xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
					className: "text-start",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "ارسال دوچرخه برای تعمیر" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: sendToRepair,
					className: "space-y-4 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
							id: "repair-worker",
							label: "تعمیرکار",
							required: true,
							value: form.workerId,
							onChange: (v) => setForm((f) => ({
								...f,
								workerId: v
							})),
							options: workers.map((w) => ({
								value: w.id,
								label: `${w.fullName} – ${w.title}`
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "repair-title",
							label: "عنوان کار",
							required: true,
							value: form.title,
							onChange: (v) => setForm((f) => ({
								...f,
								title: v
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
							id: "repair-desc",
							label: "توضیحات",
							value: form.description,
							onChange: (v) => setForm((f) => ({
								...f,
								description: v
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmountField, {
							id: "repair-wage",
							label: "دستمزد",
							required: true,
							currency: state.currency,
							value: form.wage,
							onChange: (v) => setForm((f) => ({
								...f,
								wage: v
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "h-14 w-full rounded-xl bg-primary text-base font-extrabold text-primary-foreground",
							children: "ثبت و ارسال به تعمیرکار"
						})
					]
				})]
			})
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InventoryPage, {}) });
//#endregion
export { SplitComponent as component };
