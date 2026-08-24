import { r as __toESM } from "./_runtime.mjs";
import { N as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, y as useParams } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { $ as History, C as Send, I as PencilLine, It as ArrowRight, Ot as Camera, Q as ImagePlus, bt as CirclePlay, m as Trash2, xt as CircleCheck, yt as CircleX } from "./_libs/lucide-react.mjs";
import { S as money, a as Chip, o as EmptyState, t as AppShell, u as PageHeader, v as faDateTimeLong } from "./_ssr/ui-kit-B64qXDLa.mjs";
import { a as InfoRow, c as TextArea, t as AmountField } from "./_ssr/fields-ESZmE-g5.mjs";
import { C as TASK_STATUS_LABEL, E as canApproveTask, T as can, U as nowISO, Y as useStore, b as PRIORITY_LABEL } from "./_ssr/router-DkR-Q5N6.mjs";
import { t as RecordActions } from "./_ssr/RecordActions-Bo88K8vu.mjs";
import { t as compressImage } from "./_ssr/images-B5GrQKOY.mjs";
import { n as markBikeRepaired, r as openBikeTasks } from "./_ssr/repaired-bikes-lNJenpJy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-GI3--VjD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TaskDetail() {
	const { id } = useParams({ from: "/tasks/$id" });
	const { state, setState, user, notify, log } = useStore();
	const navigate = useNavigate();
	const [note, setNote] = (0, import_react.useState)("");
	const [reason, setReason] = (0, import_react.useState)("");
	const [finalWage, setFinalWage] = (0, import_react.useState)(0);
	const [wageNote, setWageNote] = (0, import_react.useState)("");
	const [editReason, setEditReason] = (0, import_react.useState)("");
	const [photos, setPhotos] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const cameraRef = (0, import_react.useRef)(null);
	const galleryRef = (0, import_react.useRef)(null);
	const task = state.tasks.find((t) => t.id === id);
	if (!task || !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-6" }),
		title: "وظیفه یافت نشد",
		description: "این وظیفه حذف شده یا دسترسی ندارید."
	});
	const worker = state.users.find((u) => u.id === task.workerId);
	const isOwner = task.workerId === user.id;
	const isManager = can(user, "approve");
	const canApprove = canApproveTask(user);
	const readOnly = !can(user, "write");
	const savedPhotos = task.photos ?? [];
	const history = state.activity.filter((a) => a.entity === "task" && a.recordId === task.id);
	function patch(p) {
		setState((s) => ({
			...s,
			tasks: s.tasks.map((t) => t.id === id ? {
				...t,
				...p
			} : t)
		}));
	}
	async function addPhotos(files, source) {
		if (!files?.length) return;
		const room = 4 - photos.length;
		if (room <= 0) {
			toast.error(`حداکثر 4 عکس می‌توانید اضافه کنید.`);
			return;
		}
		setBusy(true);
		try {
			const picked = [];
			for (const file of Array.from(files).slice(0, room)) picked.push(await compressImage(file));
			setPhotos((p) => [...p, ...picked]);
			toast.success(`${picked.length} عکس اضافه شد`);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : source === "camera" ? "دوربین در دسترس نیست؛ از گالری استفاده کنید." : "خواندن تصویر ناموفق بود.");
		} finally {
			setBusy(false);
		}
	}
	function submitWork() {
		if (!note.trim()) {
			toast.error("توضیح انجام کار را وارد کنید.");
			return;
		}
		if (!photos.length && !savedPhotos.length) {
			toast.error("ثبت حداقل یک عکس از کار انجام‌شده الزامی است.");
			return;
		}
		const allPhotos = [...savedPhotos, ...photos].slice(0, 4);
		patch({
			status: "SUBMITTED",
			completedNote: note,
			photos: allPhotos,
			...allPhotos[0] ? { photo: allPhotos[0] } : {},
			submittedAt: nowISO()
		});
		log({
			entity: "task",
			recordId: task.id,
			action: "ثبت انجام کار",
			after: {
				note,
				photos: allPhotos.length
			}
		});
		notify({
			userRole: ["ADMIN", "STORE_MANAGER"],
			title: "وظیفه انجام شد",
			body: `${task.title} — نیاز به تأیید دارد.`,
			url: `/tasks/${task.id}`,
			type: "task",
			event: "TASK_STATUS"
		});
		setPhotos([]);
		setNote("");
		toast.success("انجام وظیفه ثبت شد");
	}
	function approve() {
		if (!canApproveTask(user)) {
			toast.error("تأیید وظیفه فقط توسط پشتیبان سامانه ممکن است.");
			return;
		}
		const wage = finalWage || task.wage;
		patch({
			status: "APPROVED",
			finalWage: wage,
			approvedAt: nowISO(),
			...wageNote.trim() ? { wageNote: wageNote.trim() } : {}
		});
		log({
			entity: "wage",
			recordId: task.id,
			action: "تأیید وظیفه و تعیین دستمزد نهایی",
			before: { wage: task.wage },
			after: {
				wage,
				note: wageNote.trim() || void 0
			}
		});
		notify({
			userIds: [task.workerId],
			userRole: ["MECHANIC"],
			title: "وظیفه تأیید شد",
			body: wageNote.trim() ? `دستمزد نهایی ثبت شد. توضیح: ${wageNote.trim()}` : "وظیفه شما تأیید شد.",
			url: `/tasks/${task.id}`,
			type: "task",
			event: wage === task.wage ? "TASK_STATUS" : "BONUS_PENALTY"
		});
		const bikeId = task.bikeId;
		if (bikeId) {
			if (!openBikeTasks(state.tasks, bikeId).filter((t) => t.id !== task.id).length) {
				setState((s) => ({
					...s,
					purchases: markBikeRepaired(s.purchases, bikeId, user.id, "تعمیر نهایی و تأیید شد")
				}));
				toast.success("دوچرخه به بخش «تعمیر شده‌ها» منتقل شد");
			}
		}
		toast.success("وظیفه تأیید شد");
	}
	function reject() {
		if (!canApproveTask(user)) {
			toast.error("رد وظیفه فقط توسط پشتیبان سامانه ممکن است.");
			return;
		}
		if (!reason.trim()) {
			toast.error("دلیل رد اجباری است.");
			return;
		}
		patch({
			status: "REJECTED",
			rejectReason: reason
		});
		log({
			entity: "task",
			recordId: task.id,
			action: "رد وظیفه",
			note: reason
		});
		notify({
			userIds: [task.workerId],
			userRole: ["MECHANIC"],
			title: "وظیفه نیاز به اصلاح دارد",
			body: `دلیل: ${reason}`,
			url: `/tasks/${task.id}`,
			type: "task",
			event: "TASK_STATUS"
		});
		toast.success("وظیفه رد شد");
	}
	function requestEdit() {
		if (!editReason.trim()) {
			toast.error("دلیل درخواست ویرایش را بنویسید.");
			return;
		}
		patch({
			editRequest: editReason.trim(),
			editRequestAt: nowISO()
		});
		log({
			entity: "task",
			recordId: task.id,
			action: "درخواست ویرایش",
			note: editReason.trim()
		});
		notify({
			userRole: ["ADMIN", "STORE_MANAGER"],
			title: "درخواست ویرایش وظیفه",
			body: `${task.title} — ${editReason.trim()}`,
			url: `/tasks/${task.id}`,
			type: "task",
			event: "TASK_STATUS"
		});
		setEditReason("");
		toast.success("درخواست ویرایش برای مدیر ارسال شد");
	}
	function answerEditRequest(accepted) {
		patch({
			editRequest: null,
			editRequestAt: null,
			...accepted ? { status: "IN_PROGRESS" } : {}
		});
		log({
			entity: "task",
			recordId: task.id,
			action: accepted ? "پذیرش درخواست ویرایش" : "رد درخواست ویرایش"
		});
		notify({
			userIds: [task.workerId],
			userRole: ["MECHANIC"],
			title: accepted ? "اجازهٔ ویرایش داده شد" : "درخواست ویرایش رد شد",
			body: task.title,
			url: `/tasks/${task.id}`,
			type: "task",
			event: "TASK_STATUS"
		});
		toast.success(accepted ? "وظیفه برای ویرایش باز شد" : "درخواست رد شد");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => navigate({ to: "/tasks" }),
			className: "mb-3 flex items-center gap-1 text-sm font-bold text-primary",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" }), " بازگشت به وظایف"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: task.title,
			subtitle: `تعمیرکار: ${worker?.fullName ?? "—"}`,
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					tone: "info",
					children: TASK_STATUS_LABEL[task.status]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordActions, {
					kind: "task",
					id: task.id,
					title: task.title,
					status: task.status,
					onDone: () => void navigate({ to: "/tasks" })
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "app-card divide-y p-4 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
					label: "توضیحات",
					children: task.description || "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
					label: "اولویت",
					children: PRIORITY_LABEL[task.priority]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
					label: "تاریخ سررسید",
					children: task.dueDate ? faDateTimeLong(task.dueDate) : "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
					label: "دستمزد",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "num",
						children: money(task.wage, state.currency)
					})
				}),
				task.finalWage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
					label: "دستمزد نهایی",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "num",
						children: money(task.finalWage, state.currency)
					})
				}) : null,
				task.wageNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
					label: "توضیح دستمزد",
					children: task.wageNote
				}) : null,
				task.completedNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
					label: "گزارش انجام کار",
					children: task.completedNote
				}) : null,
				task.rejectReason ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
					label: "دلیل رد",
					children: task.rejectReason
				}) : null
			]
		}),
		savedPhotos.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "app-card mt-4 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-3 font-bold",
				children: "عکس‌های ثبت‌شده"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 gap-2",
				children: savedPhotos.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: src,
					target: "_blank",
					rel: "noreferrer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src,
						alt: `عکس کار انجام‌شده ${i + 1} برای ${task.title}`,
						loading: "lazy",
						className: "h-24 w-full rounded-xl object-cover"
					})
				}, src.slice(-24) + i))
			})]
		}) : null,
		isManager && task.editRequest ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "app-card mt-4 space-y-3 border-e-4 border-e-primary p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "flex items-center gap-2 font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PencilLine, { className: "size-5 text-primary" }), " درخواست ویرایش از تعمیرکار"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-6",
					children: task.editRequest
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => answerEditRequest(true),
						className: "min-h-12 flex-1 rounded-xl bg-primary font-extrabold text-primary-foreground",
						children: "اجازه ویرایش"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => answerEditRequest(false),
						className: "min-h-12 flex-1 rounded-xl bg-destructive/10 font-bold text-destructive",
						children: "رد درخواست"
					})]
				})
			]
		}) : null,
		isOwner && !readOnly && (task.status === "PENDING" || task.status === "IN_PROGRESS" || task.status === "REJECTED") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "app-card mt-4 space-y-3 p-4",
			children: task.status === "PENDING" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => {
					patch({ status: "IN_PROGRESS" });
					log({
						entity: "task",
						recordId: task.id,
						action: "شروع وظیفه"
					});
					toast.success("وظیفه شروع شد");
				},
				className: "flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-primary font-extrabold text-primary-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "size-5" }), " شروع وظیفه"]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					id: "note",
					label: "گزارش انجام کار",
					value: note,
					onChange: setNote,
					placeholder: "شرح کارهای انجام‌شده..."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mb-2 block text-sm font-bold",
						children: [
							"عکس کار انجام‌شده (الزامی، حداکثر ",
							4,
							" عکس)"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: busy,
							onClick: () => cameraRef.current?.click(),
							className: "flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary/10 text-sm font-bold text-primary disabled:opacity-60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-5" }), " دوربین"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: busy,
							onClick: () => galleryRef.current?.click(),
							className: "flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-secondary text-sm font-bold disabled:opacity-60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-5" }), " گالری"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: cameraRef,
						type: "file",
						accept: "image/*",
						capture: "environment",
						className: "hidden",
						onChange: (e) => {
							addPhotos(e.target.files, "camera");
							e.target.value = "";
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: galleryRef,
						type: "file",
						accept: "image/*",
						multiple: true,
						className: "hidden",
						onChange: (e) => {
							addPhotos(e.target.files, "gallery");
							e.target.value = "";
						}
					}),
					busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: "در حال فشرده‌سازی تصویر…"
					}) : null,
					photos.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid grid-cols-3 gap-2",
						children: photos.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src,
								alt: `عکس انتخاب‌شده ${i + 1}`,
								className: "h-24 w-full rounded-xl object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "حذف عکس",
								onClick: () => setPhotos((p) => p.filter((_, x) => x !== i)),
								className: "absolute end-1 top-1 rounded-lg bg-background/90 p-1 text-destructive",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})]
						}, src.slice(-24) + i))
					}) : null
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: submitWork,
					disabled: busy,
					className: "flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-primary font-extrabold text-primary-foreground disabled:opacity-60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-5" }), " ثبت انجام وظیفه"]
				})
			] })
		}) : null,
		isOwner && !readOnly && (task.status === "SUBMITTED" || task.status === "APPROVED") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "app-card mt-4 space-y-3 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "flex items-center gap-2 font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PencilLine, { className: "size-5 text-primary" }), " درخواست ویرایش"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs leading-6 text-muted-foreground",
					children: "پس از ثبت، تغییر اطلاعات فقط با تأیید مدیر ممکن است. دلیل درخواست خود را بنویسید."
				}),
				task.editRequest ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-xl bg-secondary p-3 text-sm",
					children: "درخواست شما ثبت شده و در انتظار پاسخ مدیر است."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					id: "editReason",
					label: "دلیل درخواست",
					value: editReason,
					onChange: setEditReason
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: requestEdit,
					className: "min-h-12 w-full rounded-xl bg-secondary font-bold",
					children: "ارسال درخواست به مدیر"
				})] })
			]
		}) : null,
		canApprove && task.status === "SUBMITTED" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "app-card mt-4 space-y-4 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-bold",
					children: "بررسی و تأیید"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmountField, {
					id: "finalWage",
					label: "دستمزد نهایی (پاداش یا جریمه)",
					value: finalWage || task.wage,
					onChange: setFinalWage,
					currency: state.currency
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					id: "wageNote",
					label: "توضیح پاداش یا کسر (اختیاری)",
					value: wageNote,
					onChange: setWageNote
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: approve,
					className: "flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-primary font-extrabold text-primary-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5" }), " تأیید وظیفه"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					id: "reason",
					label: "دلیل رد (در صورت نیاز)",
					value: reason,
					onChange: setReason
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: reject,
					className: "flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-destructive/10 font-bold text-destructive",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-5" }), " رد و نیاز به اصلاح"]
				})
			]
		}) : null,
		history.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "app-card mt-4 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "mb-3 flex items-center gap-2 font-bold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-5 text-primary" }), " تاریخچهٔ تغییرات"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: history.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "border-b pb-2 text-sm last:border-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-bold",
							children: a.action
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								state.users.find((u) => u.id === a.userId)?.fullName ?? "کاربر",
								" —",
								" ",
								faDateTimeLong(a.createdAt)
							]
						}),
						a.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs leading-6",
							children: a.note
						}) : null
					]
				}, a.id))
			})]
		}) : null
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskDetail, {}) });
//#endregion
export { SplitComponent as component };
