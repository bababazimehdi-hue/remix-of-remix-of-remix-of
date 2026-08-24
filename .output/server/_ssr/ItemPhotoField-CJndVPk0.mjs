import { r as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { Ot as Camera, Q as ImagePlus, m as Trash2 } from "../_libs/lucide-react.mjs";
import { t as compressImage } from "./images-B5GrQKOY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ItemPhotoField-CJndVPk0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Optional product picture for a single invoice item.
* Supports camera capture and gallery pick, with preview and removal.
*/
function ItemPhotoField({ id, value, onChange, label = "تصویر محصول", disabled = false }) {
	const cameraRef = (0, import_react.useRef)(null);
	const galleryRef = (0, import_react.useRef)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function pick(files) {
		const file = files?.[0];
		if (!file) return;
		setBusy(true);
		try {
			onChange(await compressImage(file));
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "خواندن تصویر ممکن نشد.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-sm font-bold",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground",
					children: "اختیاری"
				})]
			}),
			value ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-full max-w-40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: value,
					alt: label,
					className: "h-32 w-full rounded-xl object-cover"
				}), !disabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "حذف تصویر محصول",
					onClick: () => onChange(""),
					className: "absolute end-1 top-1 rounded-lg bg-background/90 p-1 text-destructive",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
				}) : null]
			}) : null,
			!disabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-5" }),
						" ",
						value ? "تغییر عکس" : "گالری"
					]
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: cameraRef,
				id: `cam-${id}`,
				type: "file",
				accept: "image/*",
				capture: "environment",
				className: "hidden",
				onChange: (e) => {
					pick(e.target.files);
					e.target.value = "";
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: galleryRef,
				id: `gal-${id}`,
				type: "file",
				accept: "image/*",
				className: "hidden",
				onChange: (e) => {
					pick(e.target.files);
					e.target.value = "";
				}
			}),
			busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "در حال فشرده‌سازی تصویر…"
			}) : null
		]
	});
}
//#endregion
export { ItemPhotoField as t };
