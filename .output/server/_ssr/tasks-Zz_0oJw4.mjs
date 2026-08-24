import { r as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { N as Plus, n as Wrench, w as Search } from "../_libs/lucide-react.mjs";
import { S as money, T as toFa, a as Chip, c as FilterChips, d as Sheet, f as SheetContent, l as ListSkeleton, m as SheetTitle, n as Avatar, o as EmptyState, p as SheetHeader, r as AvatarFallback, t as AppShell, u as PageHeader } from "./ui-kit-B64qXDLa.mjs";
import { c as TextArea, n as DateField, r as Field, s as SelectField, t as AmountField } from "./fields-ESZmE-g5.mjs";
import { C as TASK_STATUS_LABEL, J as uid, T as can, U as nowISO, Y as useStore, b as PRIORITY_LABEL } from "./router-DkR-Q5N6.mjs";
import { t as RecordActions } from "./RecordActions-Bo88K8vu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tasks-Zz_0oJw4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var statusTone = (s) => s === "APPROVED" ? "success" : s === "REJECTED" || s === "CANCELLED" ? "danger" : s === "SUBMITTED" ? "info" : s === "IN_PROGRESS" ? "primary" : "neutral";
function TasksPage() {
	const { state, setState, user, notify, loading } = useStore();
	const navigate = useNavigate();
	const [q, setQ] = (0, import_react.useState)("");
	const [selectedWorker, setSelectedWorker] = (0, import_react.useState)(null);
	const [filter, setFilter] = (0, import_react.useState)("ALL");
	const [newOpen, setNewOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		workerId: "",
		title: "",
		description: "",
		priority: "MEDIUM",
		dueDate: "",
		wage: 0
	});
	const isManager = can(user, "approve");
	const workers = state.users.filter((u) => u.isWorker || u.role === "MECHANIC");
	const myTasks = (0, import_react.useMemo)(() => state.tasks.filter((t) => t.workerId === user?.id), [state.tasks, user]);
	const workerTasks = (0, import_react.useMemo)(() => state.tasks.filter((t) => selectedWorker ? t.workerId === selectedWorker : true).filter((t) => filter === "ALL" || t.status === filter), [
		state.tasks,
		selectedWorker,
		filter
	]);
	function createTask(e) {
		e.preventDefault();
		if (!form.workerId || !form.title.trim() || form.wage <= 0) {
			toast.error("کارمند، عنوان وظیفه و دستمزد اجباری هستند.");
			return;
		}
		setState((s) => ({
			...s,
			tasks: [{
				id: uid("t"),
				workerId: form.workerId,
				title: form.title,
				description: form.description,
				priority: form.priority,
				...form.dueDate ? { dueDate: new Date(form.dueDate).toISOString() } : {},
				wage: form.wage,
				status: "PENDING",
				createdBy: user.id,
				createdAt: nowISO()
			}, ...s.tasks]
		}));
		notify({
			userRole: ["MECHANIC"],
			title: "وظیفه جدید",
			body: "وظیفه جدید برای شما ثبت شد.",
			url: "/tasks",
			type: "task",
			event: "NEW_TASK"
		});
		setNewOpen(false);
		setForm({
			workerId: "",
			title: "",
			description: "",
			priority: "MEDIUM",
			dueDate: "",
			wage: 0
		});
		toast.success("وظیفه جدید ثبت شد");
	}
	if (!user) return null;
	if (!isManager) {
		const list = myTasks.filter((t) => filter === "ALL" || t.status === filter);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "وظایف من",
				subtitle: "لیست کارهای محول‌شده به شما"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChips, {
				value: filter,
				onChange: setFilter,
				options: [
					{
						value: "ALL",
						label: "همه"
					},
					{
						value: "PENDING",
						label: "انجام‌نشده"
					},
					{
						value: "IN_PROGRESS",
						label: "در حال انجام"
					},
					{
						value: "SUBMITTED",
						label: "منتظر تأیید"
					},
					{
						value: "APPROVED",
						label: "تأییدشده"
					},
					{
						value: "REJECTED",
						label: "رد شده"
					}
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, {}) : list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-6" }),
					title: "وظیفه‌ای وجود ندارد",
					description: "در این دسته وظیفه‌ای برای شما ثبت نشده است."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: list.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskCard, { id: t.id }, t.id))
				})
			})
		] });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "مدیریت وظایف تعمیرکاران",
			subtitle: "انتخاب کارمند و پیگیری کارها",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setNewOpen(true),
				className: "flex items-center gap-1 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " وظیفه جدید"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center gap-2 rounded-2xl border bg-card px-4 focus-within:ring-2 focus-within:ring-ring",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "جستجوی تعمیرکار...",
				"aria-label": "جستجوی تعمیرکار",
				className: "h-12 w-full bg-transparent text-sm outline-none"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-3",
			children: workers.filter((w) => w.fullName.includes(q)).map((w) => {
				const active = state.tasks.filter((t) => t.workerId === w.id && (t.status === "PENDING" || t.status === "IN_PROGRESS")).length;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setSelectedWorker(selectedWorker === w.id ? null : w.id),
					"aria-pressed": selectedWorker === w.id,
					className: `app-card flex w-full items-center gap-3 p-4 text-start ${selectedWorker === w.id ? "ring-2 ring-primary" : ""}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
							className: "size-12 border-2 border-primary/30",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
								className: "bg-accent font-bold text-accent-foreground",
								children: w.fullName.slice(0, 1)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-extrabold",
								children: w.fullName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm text-muted-foreground",
								children: w.title
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							tone: active ? "success" : "neutral",
							children: active ? `${toFa(active)} وظیفه فعال` : "بدون وظیفه"
						})
					]
				}) }, w.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-lg font-extrabold",
					children: selectedWorker ? `وظایف ${state.users.find((u) => u.id === selectedWorker)?.fullName}` : "همه وظایف"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChips, {
					value: filter,
					onChange: setFilter,
					options: [
						{
							value: "ALL",
							label: "همه"
						},
						{
							value: "PENDING",
							label: "انجام‌نشده"
						},
						{
							value: "IN_PROGRESS",
							label: "در حال انجام"
						},
						{
							value: "SUBMITTED",
							label: "منتظر تأیید"
						},
						{
							value: "APPROVED",
							label: "تأییدشده"
						},
						{
							value: "REJECTED",
							label: "رد شده"
						}
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, {}) : workerTasks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-6" }),
						title: "وظیفه‌ای یافت نشد",
						description: "برای این کارمند وظیفه‌ای در این وضعیت ثبت نشده است.",
						action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setNewOpen(true),
							className: "rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground",
							children: "ایجاد وظیفه جدید"
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-3",
						children: workerTasks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskCard, { id: t.id }, t.id))
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
			open: newOpen,
			onOpenChange: setNewOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
				side: "bottom",
				className: "safe-bottom max-h-[92vh] overflow-y-auto rounded-t-3xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
					className: "text-start",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "ایجاد وظیفه جدید" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: createTask,
					className: "space-y-4 p-4",
					noValidate: true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
							id: "worker",
							label: "انتخاب کارمند",
							required: true,
							value: form.workerId,
							onChange: (v) => setForm({
								...form,
								workerId: v
							}),
							options: [{
								value: "",
								label: "انتخاب کنید"
							}, ...workers.map((w) => ({
								value: w.id,
								label: w.fullName
							}))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "title",
							label: "عنوان وظیفه",
							required: true,
							value: form.title,
							onChange: (v) => setForm({
								...form,
								title: v
							}),
							placeholder: "مثلاً سرویس کامل دوچرخه کوهستان"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
							id: "desc",
							label: "توضیحات وظیفه",
							value: form.description,
							onChange: (v) => setForm({
								...form,
								description: v
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
							id: "priority",
							label: "اولویت",
							value: form.priority,
							onChange: (v) => setForm({
								...form,
								priority: v
							}),
							options: Object.keys(PRIORITY_LABEL).map((p) => ({
								value: p,
								label: PRIORITY_LABEL[p]
							}))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateField, {
							id: "due",
							label: "تاریخ سررسید",
							value: form.dueDate,
							onChange: (v) => setForm({
								...form,
								dueDate: v
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmountField, {
							id: "wage",
							label: "دستمزد",
							required: true,
							value: form.wage,
							onChange: (v) => setForm({
								...form,
								wage: v
							}),
							currency: state.currency
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "min-h-13 w-full rounded-xl bg-primary py-3.5 font-extrabold text-primary-foreground",
							children: "ثبت وظیفه"
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			hidden: true,
			onClick: () => navigate({ to: "/tasks" })
		})
	] });
}
function TaskCard({ id }) {
	const { state } = useStore();
	const t = state.tasks.find((x) => x.id === id);
	const border = t.status === "IN_PROGRESS" ? "border-e-4 border-e-primary" : t.status === "SUBMITTED" ? "border-e-4 border-e-info" : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordActions, {
			kind: "task",
			id: t.id,
			title: t.title,
			status: t.status,
			className: "absolute start-2 top-2 z-10 bg-card/80 backdrop-blur"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/tasks/$id",
			params: { id: t.id },
			className: `app-card block p-4 ${border}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "min-w-0 text-base font-extrabold",
						children: t.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						tone: statusTone(t.status),
						children: TASK_STATUS_LABEL[t.status]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "num mt-2 text-sm text-muted-foreground",
					children: money(t.wage, state.currency)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 flex items-center gap-1 text-sm font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-2.5 rounded-full ${t.priority === "HIGH" || t.priority === "URGENT" ? "bg-destructive" : t.priority === "MEDIUM" ? "bg-primary" : "bg-muted-foreground"}` }), PRIORITY_LABEL[t.priority]]
				})
			]
		})]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TasksPage, {}) });
//#endregion
export { SplitComponent as component };
