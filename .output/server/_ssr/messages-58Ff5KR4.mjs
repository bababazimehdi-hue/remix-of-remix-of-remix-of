import { r as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as Send, Et as CheckCheck, F as Pencil, It as ArrowRight, L as Paperclip, Tt as Check, U as Mic, Z as Image, _ as Square, a as Video, c as UserPlus, m as Trash2, o as Users, t as X, v as Smile } from "../_libs/lucide-react.mjs";
import { T as toFa, b as faTime, i as AvatarImage, n as Avatar, r as AvatarFallback, t as AppShell, u as PageHeader, v as faDateTimeLong } from "./ui-kit-B64qXDLa.mjs";
import { D as cn, J as uid, L as groupKey, T as can, U as nowISO, Y as useStore, h as Logo, k as dmKey, q as roleTitle, x as ROLE_LABEL } from "./router-DkR-Q5N6.mjs";
import { r as Route$18 } from "./router-DkR-Q5N62.mjs";
import { t as RecordActions } from "./RecordActions-Bo88K8vu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/messages-58Ff5KR4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Create/edit sheet for a custom chat group. Any person with an account in the
* app can be added, so the admin can build any group they need.
*/
function GroupEditor({ group, onClose }) {
	const { state, setState, user, log } = useStore();
	const [title, setTitle] = (0, import_react.useState)(group?.title ?? "");
	const [members, setMembers] = (0, import_react.useState)(group?.memberIds ?? (user ? [user.id] : []));
	const [q, setQ] = (0, import_react.useState)("");
	if (!user) return null;
	const me = user;
	const people = state.users.filter((u) => !u.isArchived).filter((u) => {
		const t = q.trim();
		if (!t) return true;
		return `${u.fullName} ${u.username} ${u.phone}`.includes(t);
	}).sort((a, b) => a.fullName.localeCompare(b.fullName, "fa"));
	function toggle(id) {
		setMembers((m) => m.includes(id) ? m.filter((x) => x !== id) : [...m, id]);
	}
	function save() {
		const name = title.trim();
		if (!name) {
			toast.error("نام گروه را وارد کنید.");
			return;
		}
		const memberIds = Array.from(/* @__PURE__ */ new Set([me.id, ...members]));
		if (memberIds.length < 2) {
			toast.error("حداقل یک کاربر دیگر را به گروه اضافه کنید.");
			return;
		}
		const next = group ? {
			...group,
			title: name,
			memberIds
		} : {
			id: uid("g"),
			title: name,
			memberIds,
			createdBy: me.id,
			createdAt: nowISO()
		};
		setState((s) => ({
			...s,
			chatGroups: (s.chatGroups ?? []).some((g) => g.id === next.id) ? (s.chatGroups ?? []).map((g) => g.id === next.id ? next : g) : [...s.chatGroups ?? [], next]
		}));
		log({
			entity: "message",
			recordId: next.id,
			action: group ? "ویرایش گروه گفت‌وگو" : "ساخت گروه گفت‌وگو",
			note: `${name} — ${memberIds.length} عضو`
		});
		toast.success(group ? "گروه به‌روزرسانی شد" : "گروه ساخته شد");
		onClose(`g:${next.id}`);
	}
	function remove() {
		if (!group) return;
		setState((s) => ({
			...s,
			chatGroups: (s.chatGroups ?? []).filter((g) => g.id !== group.id)
		}));
		log({
			entity: "message",
			recordId: group.id,
			action: "حذف گروه گفت‌وگو",
			note: group.title
		});
		toast.success("گروه حذف شد");
		onClose();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between gap-3 border-b px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-2 font-extrabold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-5 text-primary" }), group ? "اعضای گروه" : "گروه جدید"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onClose(),
					"aria-label": "بستن",
					className: "grid size-9 place-items-center rounded-full border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 space-y-3 overflow-y-auto p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "group-title",
							className: "block text-sm font-bold",
							children: "نام گروه"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "group-title",
							value: title,
							onChange: (e) => setTitle(e.target.value),
							placeholder: "مثلاً گروه تعمیرکاران",
							className: "h-12 w-full rounded-xl border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							htmlFor: "group-search",
							className: "block text-sm font-bold",
							children: [
								"جست‌وجوی کاربران (",
								members.length,
								" عضو انتخاب شده)"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "group-search",
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "نام یا نام کاربری",
							className: "h-12 w-full rounded-xl border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "app-card divide-y",
						children: [people.map((u) => {
							const active = members.includes(u.id) || u.id === user.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: u.id === user.id,
								onClick: () => toggle(u.id),
								className: "flex w-full items-center gap-3 p-3 text-start disabled:opacity-70",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `grid size-6 shrink-0 place-items-center rounded-md border ${active ? "border-primary bg-primary text-primary-foreground" : "bg-card"}`,
									children: active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : null
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block truncate font-bold",
										children: [u.fullName, u.id === user.id ? " (شما)" : ""]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block truncate text-xs text-muted-foreground",
										children: [u.title?.trim() || roleTitle(u), u.isActive ? "" : " · غیرفعال"]
									})]
								})]
							}) }, u.id);
						}), people.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "p-4 text-sm font-bold text-muted-foreground",
							children: "کاربری پیدا نشد."
						}) : null]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "flex items-center gap-2 border-t p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: save,
					className: "h-13 flex-1 rounded-xl bg-primary text-base font-extrabold text-primary-foreground",
					children: group ? "ذخیره تغییرات" : "ساخت گروه"
				}), group ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: remove,
					"aria-label": "حذف گروه",
					className: "grid size-13 place-items-center rounded-xl bg-destructive/10 text-destructive",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-5" })
				}) : null]
			})
		]
	});
}
/** Main emoji set, grouped by simple Persian labels. */
var GROUPS = [
	{
		label: "چهره‌ها",
		emojis: [
			"😀",
			"😃",
			"😄",
			"😁",
			"😆",
			"😅",
			"😂",
			"🤣",
			"🙂",
			"🙃",
			"😉",
			"😊",
			"😇",
			"🥰",
			"😍",
			"🤩",
			"😘",
			"😗",
			"😚",
			"😋",
			"😜",
			"🤪",
			"🤗",
			"🤔",
			"🤨",
			"😐",
			"😑",
			"😴",
			"😌",
			"😔",
			"😢",
			"😭",
			"😤",
			"😠",
			"😡",
			"🥵",
			"🥶",
			"😱",
			"😰",
			"😥",
			"🤒",
			"🤕",
			"🤢",
			"🤮",
			"🥳",
			"😎",
			"🤓",
			"🧐"
		]
	},
	{
		label: "دست‌ها و افراد",
		emojis: [
			"👍",
			"👎",
			"👌",
			"✌️",
			"🤞",
			"🤝",
			"👏",
			"🙌",
			"🙏",
			"💪",
			"👋",
			"✋",
			"☝️",
			"👀",
			"🧑‍🔧",
			"👨‍🔧",
			"👩‍🔧",
			"🚴",
			"🚵",
			"🧑‍💻"
		]
	},
	{
		label: "دل و نشانه‌ها",
		emojis: [
			"❤️",
			"🧡",
			"💛",
			"💚",
			"💙",
			"💜",
			"🖤",
			"💔",
			"💯",
			"✅",
			"❌",
			"⚠️",
			"❗",
			"❓",
			"⭐",
			"🔥",
			"✨",
			"🎉",
			"🎁",
			"⏰"
		]
	},
	{
		label: "کار و اشیا",
		emojis: [
			"🚲",
			"🛠️",
			"🔧",
			"🔩",
			"⚙️",
			"🧰",
			"🔋",
			"💡",
			"📦",
			"📸",
			"📱",
			"💰",
			"🧾",
			"📊",
			"📝",
			"📅",
			"🚚",
			"🏪",
			"☕",
			"🍵"
		]
	}
];
function EmojiPicker({ onPick }) {
	const [tab, setTab] = (0, import_react.useState)(0);
	const group = GROUPS[tab];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-on-hero/20 bg-[oklch(0.2_0.02_52/0.92)] p-2 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-2 flex gap-1 overflow-x-auto",
			children: GROUPS.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-pressed": tab === i,
				onClick: () => setTab(i),
				className: `shrink-0 rounded-lg px-2 py-1 text-[11px] font-bold ${tab === i ? "bg-primary text-primary-foreground" : "bg-on-hero/10 text-on-hero"}`,
				children: g.label
			}, g.label))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid max-h-40 grid-cols-8 gap-1 overflow-y-auto",
			children: group.emojis.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": `ایموجی ${e}`,
				onClick: () => onPick(e),
				className: "grid h-9 place-items-center rounded-lg text-xl hover:bg-on-hero/10",
				children: e
			}, e))
		})]
	});
}
var chat_bg_default = "/assets/chat-bg-wA2hKdJo.jpg";
/**
* Keeps the chat surface exactly as tall as the *visible* viewport.
* On Android/iOS the software keyboard shrinks `visualViewport`, so we
* recompute the height (and re-pin the scroll to the newest message)
* whenever the keyboard opens, closes or the page is resized.
*/
function useChatViewport(onResize) {
	const ref = (0, import_react.useRef)(null);
	const [height, setHeight] = (0, import_react.useState)(null);
	const cb = (0, import_react.useRef)(onResize);
	cb.current = onResize;
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const vv = window.visualViewport;
		const measure = () => {
			const el = ref.current;
			if (!el) return;
			const top = el.getBoundingClientRect().top;
			const viewportHeight = vv ? vv.height : window.innerHeight;
			const reserved = (vv ? window.innerHeight - vv.height > 120 : false) ? 8 : window.innerWidth < 1024 ? 76 : 24;
			const next = Math.max(240, viewportHeight - top - reserved);
			setHeight(next);
			requestAnimationFrame(() => cb.current?.());
		};
		measure();
		const t = window.setTimeout(measure, 250);
		vv?.addEventListener("resize", measure);
		vv?.addEventListener("scroll", measure);
		window.addEventListener("resize", measure);
		window.addEventListener("orientationchange", measure);
		return () => {
			window.clearTimeout(t);
			vv?.removeEventListener("resize", measure);
			vv?.removeEventListener("scroll", measure);
			window.removeEventListener("resize", measure);
			window.removeEventListener("orientationchange", measure);
		};
	}, []);
	return {
		ref,
		height
	};
}
var MAX_ATTACHMENT = 8388608;
function readFile(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(String(reader.result));
		reader.onerror = () => reject(/* @__PURE__ */ new Error("read-failed"));
		reader.readAsDataURL(file);
	});
}
function Messages() {
	const { state, user } = useStore();
	const { c } = Route$18.useSearch();
	const navigate = useNavigate();
	const [editing, setEditing] = (0, import_react.useState)(void 0);
	const [q, setQ] = (0, import_react.useState)("");
	const others = (0, import_react.useMemo)(() => user ? state.users.filter((u) => u.id !== user.id && u.isActive) : [], [state.users, user]);
	const myGroups = (0, import_react.useMemo)(() => user ? (state.chatGroups ?? []).filter((g) => g.memberIds.includes(user.id)) : [], [state.chatGroups, user]);
	const channels = (0, import_react.useMemo)(() => {
		const list = [];
		if (!user) return list;
		for (const g of myGroups) list.push({
			id: groupKey(g.id),
			title: g.title,
			subtitle: `${toFa(g.memberIds.length)} عضو`,
			group: true,
			groupId: g.id
		});
		for (const u of others) list.push({
			id: dmKey(user.id, u.id),
			title: u.fullName,
			subtitle: u.title?.trim() || ROLE_LABEL[u.role],
			group: false,
			...u.avatarUrl ? { avatarUrl: u.avatarUrl } : {}
		});
		return list;
	}, [
		others,
		user,
		myGroups
	]);
	if (!user) return null;
	const me = user;
	const active = channels.find((ch) => ch.id === c);
	const activeGroup = active?.groupId ? (state.chatGroups ?? []).find((g) => g.id === active.groupId) : void 0;
	if (!active) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "پیام‌رسان",
			subtitle: "گفت‌وگوی گروهی و خصوصی با هم‌تیمی‌ها"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex flex-col gap-2 sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "جست‌وجوی کاربر یا گروه...",
				"aria-label": "جست‌وجوی گفت‌وگو",
				className: "h-12 flex-1 rounded-xl border bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setEditing(null),
				className: "flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-extrabold text-primary-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-5" }), " گروه جدید"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: channels.filter((ch) => q.trim() ? ch.title.includes(q.trim()) : true).map((ch) => {
				const msgs = state.messages.filter((m) => m.channel === ch.id);
				const last = msgs[msgs.length - 1];
				const unread = msgs.filter((m) => m.senderId !== me.id && !m.readBy.includes(me.id)).length;
				const grp = ch.groupId ? (state.chatGroups ?? []).find((g) => g.id === ch.groupId) : void 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex w-full items-center gap-2 rounded-2xl border bg-card p-3 transition-colors hover:bg-accent",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void navigate({
							to: "/messages",
							search: { c: ch.id }
						}),
						className: "flex min-w-0 flex-1 items-center gap-3 text-start",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "size-11",
								children: [ch.avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
									src: ch.avatarUrl,
									alt: ch.title
								}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
									className: "bg-primary-soft font-bold text-primary",
									children: ch.group ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-5" }) : ch.title.slice(0, 1)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-bold",
									children: ch.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs text-muted-foreground",
									children: last ? last.text || attachmentLabel(last.attachment) : ch.subtitle
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "shrink-0 text-end",
								children: [last ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-[11px] text-muted-foreground",
									children: faTime(last.createdAt)
								}) : null, unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 inline-block rounded-full bg-destructive px-2 text-xs font-bold text-destructive-foreground",
									children: toFa(unread)
								}) : null]
							})
						]
					}), grp ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setEditing(grp),
						"aria-label": `افزودن عضو به ${ch.title}`,
						title: "افزودن عضو",
						className: "grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-5" })
					}) : null]
				}, ch.id);
			})
		}),
		editing !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupEditor, {
			group: editing,
			onClose: (channelId) => {
				setEditing(void 0);
				if (channelId) navigate({
					to: "/messages",
					search: { c: channelId }
				});
			}
		}) : null
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chat, {
		channelId: active.id,
		title: active.title,
		subtitle: active.subtitle,
		me,
		...activeGroup ? { onManageMembers: () => setEditing(activeGroup) } : {}
	}), editing !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupEditor, {
		group: editing,
		onClose: () => {
			setEditing(void 0);
		}
	}) : null] });
}
function attachmentLabel(a) {
	if (!a) return "—";
	if (a.kind === "image") return "🖼 عکس";
	if (a.kind === "video") return "🎬 ویدیو";
	if (a.kind === "voice") return "🎤 پیام صوتی";
	return `📎 ${a.name}`;
}
function Chat({ channelId, title, subtitle, me, onManageMembers }) {
	const { state, setState, notify, log } = useStore();
	const navigate = useNavigate();
	const [text, setText] = (0, import_react.useState)("");
	const [emojiOpen, setEmojiOpen] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [recording, setRecording] = (0, import_react.useState)(false);
	const [urgent, setUrgent] = (0, import_react.useState)(false);
	const recorder = (0, import_react.useRef)(null);
	const bottom = (0, import_react.useRef)(null);
	const scroller = (0, import_react.useRef)(null);
	const fileInput = (0, import_react.useRef)(null);
	const mediaInput = (0, import_react.useRef)(null);
	const messages = state.messages.filter((m) => m.channel === channelId);
	(0, import_react.useEffect)(() => {
		const unread = state.messages.filter((m) => m.channel === channelId && m.senderId !== me.id && !m.readBy.includes(me.id));
		if (!unread.length) return;
		setState((s) => ({
			...s,
			messages: s.messages.map((m) => unread.some((u) => u.id === m.id) ? {
				...m,
				readBy: [...m.readBy, me.id]
			} : m)
		}));
	}, [
		state.messages,
		channelId,
		me.id,
		setState
	]);
	function pinToBottom() {
		const el = scroller.current;
		if (!el) return;
		el.scrollTop = el.scrollHeight;
	}
	(0, import_react.useEffect)(() => {
		pinToBottom();
	}, [
		messages.length,
		channelId,
		draft,
		editing
	]);
	const { ref: shellRef, height: shellHeight } = useChatViewport(pinToBottom);
	async function pick(kind, file) {
		if (!file) return;
		if (file.size > MAX_ATTACHMENT) {
			toast.error("حجم فایل باید کمتر از ۸ مگابایت باشد.");
			return;
		}
		try {
			const url = await readFile(file);
			const isImage = file.type.startsWith("image/");
			const isVideo = file.type.startsWith("video/");
			setDraft({
				kind: kind === "media" ? isVideo ? "video" : isImage ? "image" : "file" : "file",
				url,
				name: file.name
			});
		} catch {
			toast.error("خواندن فایل ممکن نشد.");
		}
	}
	async function toggleRecord() {
		if (recording) {
			recorder.current?.stop();
			setRecording(false);
			return;
		}
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const rec = new MediaRecorder(stream);
			const chunks = [];
			rec.ondataavailable = (e) => chunks.push(e.data);
			rec.onstop = async () => {
				stream.getTracks().forEach((t) => t.stop());
				const blob = new Blob(chunks, { type: rec.mimeType || "audio/webm" });
				if (blob.size > MAX_ATTACHMENT) {
					toast.error("پیام صوتی بیش از حد طولانی است.");
					return;
				}
				const url = await readFile(new File([blob], "voice.webm", { type: blob.type }));
				setDraft({
					kind: "voice",
					url,
					name: "پیام صوتی"
				});
			};
			recorder.current = rec;
			rec.start();
			setRecording(true);
		} catch {
			toast.error("دسترسی به میکروفون ممکن نشد.");
		}
	}
	function send() {
		const body = text.trim();
		if (!body && !draft) return;
		if (editing) {
			setState((s) => ({
				...s,
				messages: s.messages.map((m) => m.id === editing.id ? {
					...m,
					text: body,
					editedAt: nowISO()
				} : m)
			}));
			log({
				entity: "message",
				recordId: editing.id,
				action: "ویرایش پیام",
				before: { text: editing.text },
				after: { text: body }
			});
			setEditing(null);
			setText("");
			return;
		}
		const msg = {
			id: uid("m"),
			channel: channelId,
			senderId: me.id,
			text: body,
			...draft ? { attachment: draft } : {},
			createdAt: nowISO(),
			readBy: [me.id]
		};
		setState((s) => ({
			...s,
			messages: [...s.messages, msg]
		}));
		const customGroup = channelId.startsWith("g:") ? (state.chatGroups ?? []).find((g) => g.id === channelId.slice(2)) : void 0;
		const recipients = channelId.startsWith("dm:") ? channelId.slice(3).split("|").filter((x) => x !== me.id) : customGroup ? customGroup.memberIds.filter((x) => x !== me.id) : state.users.filter((u) => u.isActive && u.id !== me.id).filter((u) => channelId === "partners" ? can(u, "partnersChat") : can(u, "messages")).map((u) => u.id);
		if (recipients.length) notify({
			userRole: [],
			userIds: recipients,
			title: `پیام جدید از ${me.fullName}`,
			body: body || draft?.name || "پیوست جدید",
			url: `/messages?c=${encodeURIComponent(channelId)}`,
			type: "message",
			event: urgent ? "URGENT_MESSAGE" : "NEW_MESSAGE"
		});
		setText("");
		setDraft(null);
		setUrgent(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: shellRef,
		style: shellHeight ? { height: shellHeight } : void 0,
		className: "chat-shell relative -mx-4 flex h-[calc(100dvh-13.5rem)] min-h-[18rem] flex-col overflow-hidden rounded-none sm:mx-0 sm:rounded-3xl lg:h-[calc(100dvh-9.5rem)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: chat_bg_default,
				alt: "",
				"aria-hidden": true,
				loading: "lazy",
				className: "chat-bg"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "chat-veil" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-10 flex shrink-0 items-center gap-3 border-b border-on-hero/10 bg-[oklch(0.16_0.02_52/0.45)] px-4 py-3 backdrop-blur-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => void navigate({
							to: "/messages",
							search: { c: void 0 }
						}),
						"aria-label": "بازگشت به فهرست گفت‌وگوها",
						className: "grid size-9 shrink-0 place-items-center rounded-full border border-on-hero/20 text-on-hero",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "size-10 rounded-full shadow-[var(--shadow-glow)]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate font-display text-lg leading-tight text-on-hero",
							children: title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs font-bold text-on-hero-muted",
							children: subtitle
						})]
					}),
					onManageMembers ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onManageMembers,
						className: "flex shrink-0 items-center gap-1 rounded-full bg-primary px-3 py-2 text-[11px] font-extrabold text-primary-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-4" }), " افزودن کاربر"]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: scroller,
				className: "relative z-10 min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-3 py-4",
				children: [
					messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto -mt-1 flex w-fit max-w-full items-center gap-2 rounded-full bg-[oklch(0.18_0.02_52/0.55)] px-4 py-2 text-center text-xs text-on-hero-muted backdrop-blur-md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4 shrink-0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-extrabold text-on-hero",
								children: "هنوز پیامی نیست"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "— اولین پیام را شما بفرستید." })
						]
					}) : null,
					messages.map((m) => {
						const mine = m.senderId === me.id;
						const sender = state.users.find((u) => u.id === m.senderId);
						const seen = m.readBy.filter((id) => id !== me.id).length > 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("flex", mine ? "justify-end" : "justify-start"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("max-w-[82%] px-3.5 py-2.5 text-sm shadow-[0_10px_25px_-14px_oklch(0_0_0/0.8)]", mine ? "grad-primary rounded-2xl rounded-be-md text-primary-foreground" : "rounded-2xl rounded-bs-md bg-[oklch(0.235_0.015_52/0.62)] text-on-hero backdrop-blur-md"),
								children: [
									!mine ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-1 text-xs font-extrabold text-primary",
										children: sender?.fullName ?? "کاربر"
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "min-w-0 flex-1",
											children: m.attachment ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttachmentView, { a: m.attachment }) : null
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordActions, {
											kind: "message",
											id: m.id,
											title: m.text?.slice(0, 40) || "پیام",
											tone: "onHero",
											className: "-me-1 -mt-1 size-7"
										})]
									}),
									m.text ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "whitespace-pre-wrap break-words",
										children: m.text
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: cn("mt-1 flex items-center gap-2 text-[11px]", mine ? "text-primary-foreground/80" : "text-on-hero-muted"),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												title: faDateTimeLong(m.createdAt),
												children: faTime(m.createdAt)
											}),
											m.editedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ویرایش شده" }) : null,
											mine ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [seen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }), m.text ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => {
													setEditing(m);
													setText(m.text);
												},
												className: "ms-auto inline-flex items-center gap-1 font-bold",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" }), " ویرایش"]
											}) : null] }) : null
										]
									})
								]
							})
						}, m.id);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: bottom })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 shrink-0 space-y-2 border-t border-on-hero/10 bg-[oklch(0.16_0.02_52/0.55)] p-3 backdrop-blur-md",
				children: [
					editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-xl bg-muted px-3 py-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" }),
							" در حال ویرایش پیام",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setEditing(null);
									setText("");
								},
								className: "ms-auto",
								"aria-label": "لغو ویرایش",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
							})
						]
					}) : null,
					draft ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-xl bg-muted px-3 py-2 text-xs",
						children: [attachmentLabel(draft), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setDraft(null),
							className: "ms-auto",
							"aria-label": "حذف پیوست",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})]
					}) : null,
					emojiOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmojiPicker, { onPick: (emoji) => setText((t) => t + emoji) }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: text,
							onChange: (e) => setText(e.target.value),
							rows: 1,
							placeholder: "پیام خود را بنویسید…",
							className: "max-h-32 min-h-11 min-w-0 flex-1 resize-none rounded-xl border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: send,
							"aria-label": "ارسال پیام",
							className: "grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-5" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: mediaInput,
								type: "file",
								accept: "image/*,video/*",
								hidden: true,
								onChange: (e) => void pick("media", e.target.files?.[0])
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileInput,
								type: "file",
								hidden: true,
								onChange: (e) => void pick("file", e.target.files?.[0])
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
								label: "عکس یا ویدیو",
								onClick: () => mediaInput.current?.click(),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
								label: "ایموجی",
								onClick: () => setEmojiOpen((o) => !o),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smile, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
								label: "فایل",
								onClick: () => fileInput.current?.click(),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
								label: recording ? "پایان ضبط" : "ضبط ویس",
								onClick: () => void toggleRecord(),
								children: recording ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-5 text-destructive" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": urgent,
								onClick: () => setUrgent((u) => !u),
								className: `ms-auto h-10 rounded-lg px-3 text-xs font-bold ${urgent ? "bg-destructive text-destructive-foreground" : "bg-secondary text-foreground"}`,
								children: "ارسال فوری"
							})
						]
					})
				]
			})
		]
	});
}
function IconBtn({ label, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		"aria-label": label,
		title: label,
		className: "grid size-10 shrink-0 place-items-center rounded-xl border border-on-hero/25 bg-[oklch(0.2_0.02_52/0.6)] text-on-hero",
		children
	});
}
function AttachmentView({ a }) {
	if (a.kind === "image") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: a.url,
		alt: a.name,
		className: "mb-2 max-h-64 rounded-xl object-cover"
	});
	if (a.kind === "video") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
		src: a.url,
		controls: true,
		className: "mb-2 max-h-64 w-full rounded-xl"
	});
	if (a.kind === "voice") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
		src: a.url,
		controls: true,
		className: "mb-2 w-56"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: a.url,
		download: a.name,
		className: "mb-2 flex items-center gap-2 rounded-xl bg-muted px-3 py-2 font-bold",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "hidden" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "size-4" }),
			" ",
			a.name
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Messages, {}) });
//#endregion
export { SplitComponent as component };
