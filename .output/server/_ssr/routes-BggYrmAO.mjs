import { r as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { J as Lock, ot as Eye, q as LogIn, s as User, st as EyeOff } from "../_libs/lucide-react.mjs";
import { Y as useStore, h as Logo } from "./router-DkR-Q5N6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BggYrmAO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const { login, user, state } = useStore();
	const navigate = useNavigate();
	const [username, setUsername] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [show, setShow] = (0, import_react.useState)(false);
	const [remember, setRemember] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (user) navigate({ to: user.role === "MECHANIC" ? "/tasks" : "/dashboard" });
	}, [user, navigate]);
	function submit(e) {
		e.preventDefault();
		setError("");
		if (!username.trim()) return setError("نام کاربری یا شماره موبایل را وارد کنید.");
		if (password.length < 4) return setError("رمز عبور باید حداقل ۴ کاراکتر باشد.");
		setLoading(true);
		login(username, password).then((ok) => {
			setLoading(false);
			if (!ok) setError("نام کاربری یا رمز عبور اشتباه است.");
			else toast.success("خوش آمدید!");
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "safe-top safe-bottom relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute -top-32 -right-24 size-80 rounded-full bg-primary opacity-25 blur-3xl"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute -bottom-40 -left-24 size-96 rounded-full bg-primary opacity-20 blur-3xl"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "app-card relative w-full max-w-md overflow-hidden shadow-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative aspect-[2/1] w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: state.banners?.login || "/assets/login-banner-C34myJHx.jpg",
							alt: "دوچرخهٔ حرفه‌ای در تعمیرگاه با نور نارنجی",
							width: 1536,
							height: 768,
							className: "absolute inset-0 size-full object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": true,
							className: "hero-veil"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex h-full flex-col items-center justify-end gap-1.5 p-5 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "size-16 rounded-2xl shadow-[var(--shadow-glow)] ring-1 ring-on-hero/25" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-display text-3xl leading-tight tracking-tight text-on-hero drop-shadow",
									children: "دز رکاب"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-on-hero/10 px-3 py-1 text-[11px] font-bold text-on-hero-muted ring-1 ring-on-hero/25 backdrop-blur",
									children: "شهر دوچرخه دز رکاب"
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-2 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl leading-9",
								children: "خوش آمدید به اپلیکیشن دز رکاب"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "مدیریت هوشمند فروشگاه و تعمیرگاه"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: submit,
							className: "mt-7 space-y-4",
							noValidate: true,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "username",
										className: "block text-sm font-bold",
										children: "نام کاربری"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 rounded-xl border bg-card px-3 focus-within:ring-2 focus-within:ring-ring",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-5 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "username",
											value: username,
											onChange: (e) => setUsername(e.target.value),
											placeholder: "نام کاربری",
											autoComplete: "username",
											className: "h-12 w-full bg-transparent text-sm outline-none"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "password",
											className: "text-sm font-bold",
											children: "رمز عبور"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "text-sm font-bold text-primary",
											children: "فراموشی رمز عبور؟"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 rounded-xl border bg-card px-3 focus-within:ring-2 focus-within:ring-ring",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-5 shrink-0 text-muted-foreground" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: "password",
												type: show ? "text" : "password",
												value: password,
												onChange: (e) => setPassword(e.target.value),
												placeholder: "••••••••",
												autoComplete: "current-password",
												className: "h-12 w-full bg-transparent text-sm outline-none"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setShow((s) => !s),
												"aria-label": show ? "پنهان کردن رمز" : "نمایش رمز",
												className: "grid size-9 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-accent",
												children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-5" })
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center justify-end gap-2 text-sm font-medium",
									children: ["مرا به خاطر بسپار", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: remember,
										onChange: (e) => setRemember(e.target.checked),
										className: "size-5 accent-[var(--primary)]"
									})]
								}),
								error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									role: "alert",
									className: "rounded-xl bg-destructive/10 px-4 py-3 text-sm font-bold text-destructive",
									children: error
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									disabled: loading,
									className: "grad-primary flex h-14 w-full items-center justify-center gap-2 rounded-xl text-base font-extrabold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform active:scale-[0.99] disabled:opacity-60",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "size-5" }), loading ? "در حال ورود..." : "ورود به حساب"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-6 text-center text-sm text-muted-foreground",
							children: ["نیاز به راهنمایی دارید؟ ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-primary",
								children: "تماس با پشتیبانی"
							})]
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { LoginPage as component };
