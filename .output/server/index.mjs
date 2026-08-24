globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-08-24T06:03:42.531Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"19b7-H8KBJcWOSBnARbio3KjA+Lhw37I\"",
		"mtime": "2026-08-24T06:03:42.531Z",
		"size": 6583,
		"path": "../public/favicon.png"
	},
	"/manifest.webmanifest": {
		"type": "application/manifest+json",
		"etag": "\"260-yVQHgIoCHtNsJxKRuBBD8io2rd8\"",
		"mtime": "2026-08-24T06:03:42.531Z",
		"size": 608,
		"path": "../public/manifest.webmanifest"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-08-24T06:03:42.533Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/ItemPhotoField-hZuJSQob.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"943-YXX6oBCx6XP0UkfUJWN8gJWRhAI\"",
		"mtime": "2026-08-24T06:03:37.720Z",
		"size": 2371,
		"path": "../public/assets/ItemPhotoField-hZuJSQob.js"
	},
	"/assets/Logo-CNrj0caa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22f29-XKbsPe19X6gaCOnbnrerJsMcFYI\"",
		"mtime": "2026-08-24T06:03:37.720Z",
		"size": 143145,
		"path": "../public/assets/Logo-CNrj0caa.js"
	},
	"/assets/PermissionsManager-BB9QqGYO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"156e-5Bj+Cgv9vAtFwh9XhCYBItuZAok\"",
		"mtime": "2026-08-24T06:03:37.721Z",
		"size": 5486,
		"path": "../public/assets/PermissionsManager-BB9QqGYO.js"
	},
	"/assets/RecordActions-CAzi-el2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b7b7-SMzmzyNkOXA6qLtJ2B151HSnn28\"",
		"mtime": "2026-08-24T06:03:37.721Z",
		"size": 47031,
		"path": "../public/assets/RecordActions-CAzi-el2.js"
	},
	"/assets/_id-BGwjIA5D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ddd-e1fXHymjZEY/tXCk03amklIEjmA\"",
		"mtime": "2026-08-24T06:03:37.721Z",
		"size": 11741,
		"path": "../public/assets/_id-BGwjIA5D.js"
	},
	"/assets/_id-C2AB6RrJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"352e-AA/zXd9din1o6dYjvkKJJ4M/9Qc\"",
		"mtime": "2026-08-24T06:03:37.721Z",
		"size": 13614,
		"path": "../public/assets/_id-C2AB6RrJ.js"
	},
	"/assets/_id-RlnON3_u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bd1-kjrskXfplvf+M2UT+8pV4Fg4O9s\"",
		"mtime": "2026-08-24T06:03:37.721Z",
		"size": 7121,
		"path": "../public/assets/_id-RlnON3_u.js"
	},
	"/assets/account-BVrT6dj_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2807-9+9xPsX3zbq1fz+MPXYw1G1YoXE\"",
		"mtime": "2026-08-24T06:03:37.721Z",
		"size": 10247,
		"path": "../public/assets/account-BVrT6dj_.js"
	},
	"/assets/admin-CNO1_mpp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"186b-i6aOBU5Hf+fL/6vxPrz/z7bmYdA\"",
		"mtime": "2026-08-24T06:03:37.721Z",
		"size": 6251,
		"path": "../public/assets/admin-CNO1_mpp.js"
	},
	"/assets/alert-dialog-CGVKWeHz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e7b-qYCGYUOE3a1EI+WVkuqBwkW6Fzk\"",
		"mtime": "2026-08-24T06:03:37.721Z",
		"size": 3707,
		"path": "../public/assets/alert-dialog-CGVKWeHz.js"
	},
	"/assets/archive-CwQe1zXA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f1-h6FuizIAqGuciinEU8+QuaKd1iU\"",
		"mtime": "2026-08-24T06:03:37.721Z",
		"size": 241,
		"path": "../public/assets/archive-CwQe1zXA.js"
	},
	"/assets/archive-restore-DHasUSkL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-R/1eVguxbX06Uzg9vPV6i/yZKjA\"",
		"mtime": "2026-08-24T06:03:37.721Z",
		"size": 328,
		"path": "../public/assets/archive-restore-DHasUSkL.js"
	},
	"/assets/arrow-right-CEGj9VZl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-/h4YcMytDmwH/8bgyslZQ+9uRGs\"",
		"mtime": "2026-08-24T06:03:37.721Z",
		"size": 153,
		"path": "../public/assets/arrow-right-CEGj9VZl.js"
	},
	"/assets/audit-D2Vpilpy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19a4-6xGMW98pl52SSr8wr6FLNAxHL4A\"",
		"mtime": "2026-08-24T06:03:37.721Z",
		"size": 6564,
		"path": "../public/assets/audit-D2Vpilpy.js"
	},
	"/assets/audit-DHhWtvIj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b94-XHD5rYDi8GUOsPgu6mRYW43Tfz0\"",
		"mtime": "2026-08-24T06:03:37.721Z",
		"size": 2964,
		"path": "../public/assets/audit-DHhWtvIj.js"
	},
	"/assets/badge-check-B3uzZj-p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"130-gCyJvz7uR6naLoFGz7+x5q6NwGg\"",
		"mtime": "2026-08-24T06:03:37.721Z",
		"size": 304,
		"path": "../public/assets/badge-check-B3uzZj-p.js"
	},
	"/assets/bicycle-purchases-mycY9hyn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fe4-kD7tXad/KQupqC6/5aAmEVXZozo\"",
		"mtime": "2026-08-24T06:03:37.721Z",
		"size": 4068,
		"path": "../public/assets/bicycle-purchases-mycY9hyn.js"
	},
	"/assets/bike-GNvoIfvY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"114-Wp3pECaSh0Sykb1sd5Rk3s++c00\"",
		"mtime": "2026-08-24T06:03:37.721Z",
		"size": 276,
		"path": "../public/assets/bike-GNvoIfvY.js"
	},
	"/assets/build-DPwMHs6H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d57-Aq22gSdROOZCEs4tj7htDCRbjWA\"",
		"mtime": "2026-08-24T06:03:37.721Z",
		"size": 3415,
		"path": "../public/assets/build-DPwMHs6H.js"
	},
	"/assets/calendar-BmbKYE4M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f5-+OkLuCFWcanm++4CZW+hMyINcUg\"",
		"mtime": "2026-08-24T06:03:37.721Z",
		"size": 245,
		"path": "../public/assets/calendar-BmbKYE4M.js"
	},
	"/assets/camera-C0Xxwwyn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"144-MOgQkzr7g5OQkTpB6V6RAYTMFL0\"",
		"mtime": "2026-08-24T06:03:37.721Z",
		"size": 324,
		"path": "../public/assets/camera-C0Xxwwyn.js"
	},
	"/assets/card-bikes-jur5FGz4.png": {
		"type": "image/png",
		"etag": "\"308de-izsuapkdDb0QEHDE2LL6rFbMKwM\"",
		"mtime": "2026-08-24T06:03:37.724Z",
		"size": 198878,
		"path": "../public/assets/card-bikes-jur5FGz4.png"
	},
	"/assets/card-expenses-today-C3IjMywK.png": {
		"type": "image/png",
		"etag": "\"20fbd-IE8zpnzayHC9kI/tZioK8NH/zbg\"",
		"mtime": "2026-08-24T06:03:37.724Z",
		"size": 135101,
		"path": "../public/assets/card-expenses-today-C3IjMywK.png"
	},
	"/assets/card-expenses-total-8PY5_ggM.png": {
		"type": "image/png",
		"etag": "\"10b47-2nqnAsNULr6shM8GSEtSUeMYxtE\"",
		"mtime": "2026-08-24T06:03:37.724Z",
		"size": 68423,
		"path": "../public/assets/card-expenses-total-8PY5_ggM.png"
	},
	"/assets/card-invoices-B6fwy6Pn.png": {
		"type": "image/png",
		"etag": "\"d23a-3mtiFwOgifs22RSJL5kdTvQvCuc\"",
		"mtime": "2026-08-24T06:03:37.724Z",
		"size": 53818,
		"path": "../public/assets/card-invoices-B6fwy6Pn.png"
	},
	"/assets/card-tasks-dbNNeWJf.png": {
		"type": "image/png",
		"etag": "\"216f0-21RMrADvddyvW+CRQJBIQKQXYLY\"",
		"mtime": "2026-08-24T06:03:37.724Z",
		"size": 136944,
		"path": "../public/assets/card-tasks-dbNNeWJf.png"
	},
	"/assets/chart-column-DekfBas2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ef-d3EM5SZQvZMwql/BClIECUbZXLc\"",
		"mtime": "2026-08-24T06:03:37.721Z",
		"size": 239,
		"path": "../public/assets/chart-column-DekfBas2.js"
	},
	"/assets/chat-bg-wA2hKdJo.jpg": {
		"type": "image/jpeg",
		"etag": "\"1460e-2UJbb3nzrOxJoMdXsPm+shzSS2Y\"",
		"mtime": "2026-08-24T06:03:37.724Z",
		"size": 83470,
		"path": "../public/assets/chat-bg-wA2hKdJo.jpg"
	},
	"/assets/chevron-left-BznLSinZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-nOEyhDjwt5KHb/sF+mPNwUn5Yrs\"",
		"mtime": "2026-08-24T06:03:37.721Z",
		"size": 118,
		"path": "../public/assets/chevron-left-BznLSinZ.js"
	},
	"/assets/circle-x-CsIra8gk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-jJNDbRLgKYV9xhZ7qUgSYR+LJW8\"",
		"mtime": "2026-08-24T06:03:37.721Z",
		"size": 320,
		"path": "../public/assets/circle-x-CsIra8gk.js"
	},
	"/assets/client-CPYyzEFe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33d7a-XBufo4mfFdzhx6M6R6LTDna+s8c\"",
		"mtime": "2026-08-24T06:03:37.721Z",
		"size": 212346,
		"path": "../public/assets/client-CPYyzEFe.js"
	},
	"/assets/clipboard-list-D3JpvkBq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18f-NSspLJC1NlF+QVHw4Cr/h6XmgPs\"",
		"mtime": "2026-08-24T06:03:37.722Z",
		"size": 399,
		"path": "../public/assets/clipboard-list-D3JpvkBq.js"
	},
	"/assets/clock-DvwOpM7d.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9d-HlIKYdZqJwYxvQi+LUsmnVqAvbk\"",
		"mtime": "2026-08-24T06:03:37.722Z",
		"size": 157,
		"path": "../public/assets/clock-DvwOpM7d.js"
	},
	"/assets/copy-CkeSg48B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e0-XAtl5ZBQMsQtHQGXfUqRdhOVbrk\"",
		"mtime": "2026-08-24T06:03:37.722Z",
		"size": 224,
		"path": "../public/assets/copy-CkeSg48B.js"
	},
	"/assets/daily-reports-DVipdJLy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"41eb-nJzESC1EUM5709/ml+5OEUp0wUk\"",
		"mtime": "2026-08-24T06:03:37.722Z",
		"size": 16875,
		"path": "../public/assets/daily-reports-DVipdJLy.js"
	},
	"/assets/dashboard-BGnZ0Mcj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b23-Pd86YWS1c7ui1WMJHN5NrzYtYVQ\"",
		"mtime": "2026-08-24T06:03:37.722Z",
		"size": 6947,
		"path": "../public/assets/dashboard-BGnZ0Mcj.js"
	},
	"/assets/dist-B_CIHKJL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e5d-GenFnGga6RxsqnaDPs0S4w0JdG0\"",
		"mtime": "2026-08-24T06:03:37.722Z",
		"size": 7773,
		"path": "../public/assets/dist-B_CIHKJL.js"
	},
	"/assets/dist-BualiU0n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6b20-FKY5Xv+M6jH4+TIvVws/a8wmC3s\"",
		"mtime": "2026-08-24T06:03:37.722Z",
		"size": 27424,
		"path": "../public/assets/dist-BualiU0n.js"
	},
	"/assets/earnings-DoJZbLbT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15d6-eUOcgRcLt/Et2O0MEe5H/V0q6mw\"",
		"mtime": "2026-08-24T06:03:37.722Z",
		"size": 5590,
		"path": "../public/assets/earnings-DoJZbLbT.js"
	},
	"/assets/earnings-Gqgq4owF.png": {
		"type": "image/png",
		"etag": "\"7b13-QEKdzvhUyDmeQUrvy/LUxGZ/G9k\"",
		"mtime": "2026-08-24T06:03:37.724Z",
		"size": 31507,
		"path": "../public/assets/earnings-Gqgq4owF.png"
	},
	"/assets/esm-Bv_6caNF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"160-8ZH+qscIYOi8HcC370OfBHR+Ovg\"",
		"mtime": "2026-08-24T06:03:37.722Z",
		"size": 352,
		"path": "../public/assets/esm-Bv_6caNF.js"
	},
	"/assets/expenses-BPAcKO1A.png": {
		"type": "image/png",
		"etag": "\"134c4-1lww5pjQmeXWjbMWZKDJjwbSiiY\"",
		"mtime": "2026-08-24T06:03:37.725Z",
		"size": 79044,
		"path": "../public/assets/expenses-BPAcKO1A.png"
	},
	"/assets/expenses-ITRwTiUo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10d3-aMAf36XBHeuDT8B9PXnja+89fQQ\"",
		"mtime": "2026-08-24T06:03:37.722Z",
		"size": 4307,
		"path": "../public/assets/expenses-ITRwTiUo.js"
	},
	"/assets/exports-cQSodGJW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2331-NAWIwvjOudumO9nfFcAMoTMCKyE\"",
		"mtime": "2026-08-24T06:03:37.722Z",
		"size": 9009,
		"path": "../public/assets/exports-cQSodGJW.js"
	},
	"/assets/exports-jyb2k9sj.png": {
		"type": "image/png",
		"etag": "\"b89e-RpTzujoK0jR+2nK6PCMiVNcs/+8\"",
		"mtime": "2026-08-24T06:03:37.725Z",
		"size": 47262,
		"path": "../public/assets/exports-jyb2k9sj.png"
	},
	"/assets/card-purchases-Ce5M2759.png": {
		"type": "image/png",
		"etag": "\"24c54-VOLGsKAau5Z8I6PQy/kqo4keDb4\"",
		"mtime": "2026-08-24T06:03:37.724Z",
		"size": 150612,
		"path": "../public/assets/card-purchases-Ce5M2759.png"
	},
	"/assets/fields-C4Bz8tuk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15e8-WC2FG0N/1QlgD1IJH5mUUFKiRVc\"",
		"mtime": "2026-08-24T06:03:37.722Z",
		"size": 5608,
		"path": "../public/assets/fields-C4Bz8tuk.js"
	},
	"/assets/gift-Dnu1UdPc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"151-hZMKfYmvd8hjqxL+lUs9iRQ0nsM\"",
		"mtime": "2026-08-24T06:03:37.722Z",
		"size": 337,
		"path": "../public/assets/gift-Dnu1UdPc.js"
	},
	"/assets/history-sXGqVUim.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e1-v4wfz4zwzBzawoUn7M8vuokOXYw\"",
		"mtime": "2026-08-24T06:03:37.722Z",
		"size": 225,
		"path": "../public/assets/history-sXGqVUim.js"
	},
	"/assets/home-DDjJczyk.png": {
		"type": "image/png",
		"etag": "\"18c0f-5HjfzQHR7vCpirXC0lsaciqOBNY\"",
		"mtime": "2026-08-24T06:03:37.725Z",
		"size": 101391,
		"path": "../public/assets/home-DDjJczyk.png"
	},
	"/assets/image-Dcr_93Uv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"101-WbDkMQidcniYA7IGye1cb1qujW8\"",
		"mtime": "2026-08-24T06:03:37.722Z",
		"size": 257,
		"path": "../public/assets/image-Dcr_93Uv.js"
	},
	"/assets/image-plus-Bh7UinGh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15f-9p88uC9uEah1BqICsW6N7O0CfPo\"",
		"mtime": "2026-08-24T06:03:37.722Z",
		"size": 351,
		"path": "../public/assets/image-plus-Bh7UinGh.js"
	},
	"/assets/images-Br7BL4Al.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30a-E4m/HJAwphtRZXjSJOIPjiV5qNg\"",
		"mtime": "2026-08-24T06:03:37.722Z",
		"size": 778,
		"path": "../public/assets/images-Br7BL4Al.js"
	},
	"/assets/index-Bx3xYaa-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a3a0-YkzgPymzudwZFsnjYq55bE0TCaM\"",
		"mtime": "2026-08-24T06:03:37.720Z",
		"size": 304032,
		"path": "../public/assets/index-Bx3xYaa-.js"
	},
	"/assets/inventory-BZ23KCWH.png": {
		"type": "image/png",
		"etag": "\"1cd13-x1omMicojf+fbykcv+9qFjUWEJ0\"",
		"mtime": "2026-08-24T06:03:37.725Z",
		"size": 118035,
		"path": "../public/assets/inventory-BZ23KCWH.png"
	},
	"/assets/inventory-_Zm9Egu-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e96-t8+bk3xBw7vixb16RSov/Zq60M8\"",
		"mtime": "2026-08-24T06:03:37.722Z",
		"size": 7830,
		"path": "../public/assets/inventory-_Zm9Egu-.js"
	},
	"/assets/invoices-C_7ynItR.png": {
		"type": "image/png",
		"etag": "\"14dd2-gtVf4mkfg56SshbseU4RIgJ+08c\"",
		"mtime": "2026-08-24T06:03:37.725Z",
		"size": 85458,
		"path": "../public/assets/invoices-C_7ynItR.png"
	},
	"/assets/lazyRouteComponent--7ylLACl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e90-C5nVobf8Z59/XuauDF0h7vBDjHE\"",
		"mtime": "2026-08-24T06:03:37.722Z",
		"size": 3728,
		"path": "../public/assets/lazyRouteComponent--7ylLACl.js"
	},
	"/assets/login-banner-C34myJHx.jpg": {
		"type": "image/jpeg",
		"etag": "\"1e45d-JL3SqIVyAJr9rfwAHLvMKhtbMVI\"",
		"mtime": "2026-08-24T06:03:37.725Z",
		"size": 123997,
		"path": "../public/assets/login-banner-C34myJHx.jpg"
	},
	"/assets/login-banner-DDNpftBF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"295-hQSE7lZKNXRQQMEWj1ZZRo7BaYg\"",
		"mtime": "2026-08-24T06:03:37.722Z",
		"size": 661,
		"path": "../public/assets/login-banner-DDNpftBF.js"
	},
	"/assets/logo-BLBh_Cfa.png": {
		"type": "image/png",
		"etag": "\"4263c-Yjed2yM/Y41Ze2/Ad9inyWLODrE\"",
		"mtime": "2026-08-24T06:03:37.725Z",
		"size": 271932,
		"path": "../public/assets/logo-BLBh_Cfa.png"
	},
	"/assets/messages-96fDhSmy.png": {
		"type": "image/png",
		"etag": "\"e876-ZFgUYotHZgInybRanjMvczsssKE\"",
		"mtime": "2026-08-24T06:03:37.725Z",
		"size": 59510,
		"path": "../public/assets/messages-96fDhSmy.png"
	},
	"/assets/messages-D7dx8Xen.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"54d4-PD3NEzh3TZ0u+XGkKA1aT6i1i6c\"",
		"mtime": "2026-08-24T06:03:37.722Z",
		"size": 21716,
		"path": "../public/assets/messages-D7dx8Xen.js"
	},
	"/assets/new-BuE11X81.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bf3-qJFOPLH1ELL98LR5w4n0PplYCxc\"",
		"mtime": "2026-08-24T06:03:37.722Z",
		"size": 3059,
		"path": "../public/assets/new-BuE11X81.js"
	},
	"/assets/new-CVz3m-oU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b3e-MOI7O0HuJS1XUob0jm2I154Homg\"",
		"mtime": "2026-08-24T06:03:37.722Z",
		"size": 2878,
		"path": "../public/assets/new-CVz3m-oU.js"
	},
	"/assets/new-EIERwgov.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10e7-iM5TvsJeL1UIbGmD2dfq7o6dIpE\"",
		"mtime": "2026-08-24T06:03:37.722Z",
		"size": 4327,
		"path": "../public/assets/new-EIERwgov.js"
	},
	"/assets/notifications-BMACoHBr.png": {
		"type": "image/png",
		"etag": "\"cb2a-UUcinjAu0qtYNwNUZFt3kYQlmVM\"",
		"mtime": "2026-08-24T06:03:37.725Z",
		"size": 52010,
		"path": "../public/assets/notifications-BMACoHBr.png"
	},
	"/assets/notifications-DW2EXyt7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d67-doHcrXGu53O+EjnQ8YJEL3karC8\"",
		"mtime": "2026-08-24T06:03:37.722Z",
		"size": 3431,
		"path": "../public/assets/notifications-DW2EXyt7.js"
	},
	"/assets/palette-rOtqpAjd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f2-K/4Hfl+GN5tLNqYNoB2kA62n170\"",
		"mtime": "2026-08-24T06:03:37.722Z",
		"size": 498,
		"path": "../public/assets/palette-rOtqpAjd.js"
	},
	"/assets/pencil-CAGMN6F5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"108-qc0Mwt8aPIjHNw0/fCNLfO2tdG8\"",
		"mtime": "2026-08-24T06:03:37.722Z",
		"size": 264,
		"path": "../public/assets/pencil-CAGMN6F5.js"
	},
	"/assets/people._id-8j8O-RbX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cda-J7/N4eIEtPN5NO4AXTLZh6vnatc\"",
		"mtime": "2026-08-24T06:03:37.723Z",
		"size": 3290,
		"path": "../public/assets/people._id-8j8O-RbX.js"
	},
	"/assets/people.index-ClT9zj1X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a40-XZ3bVx8oGQ3I33rbcAdx49al7ic\"",
		"mtime": "2026-08-24T06:03:37.723Z",
		"size": 10816,
		"path": "../public/assets/people.index-ClT9zj1X.js"
	},
	"/assets/permissions-BQW52p4g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-xCujsqx44JbsSgtLeqM3hsQE0kI\"",
		"mtime": "2026-08-24T06:03:37.723Z",
		"size": 213,
		"path": "../public/assets/permissions-BQW52p4g.js"
	},
	"/assets/preload-helper-Czpn1I53.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ac-sE+5KsaRXTMfwOfrOATQajMSGV4\"",
		"mtime": "2026-08-24T06:03:37.723Z",
		"size": 1196,
		"path": "../public/assets/preload-helper-Czpn1I53.js"
	},
	"/assets/purchase-invoices-9Mc02ATP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1276-QGYK6EJhOaxxbt/hKMiz7H0YlA0\"",
		"mtime": "2026-08-24T06:03:37.723Z",
		"size": 4726,
		"path": "../public/assets/purchase-invoices-9Mc02ATP.js"
	},
	"/assets/purchases-MWoGNJMu.png": {
		"type": "image/png",
		"etag": "\"f192-jphsIm9FtLX2Wx3Lae+Ag3LzoiE\"",
		"mtime": "2026-08-24T06:03:37.725Z",
		"size": 61842,
		"path": "../public/assets/purchases-MWoGNJMu.png"
	},
	"/assets/repaired-bikes-BocXX3xO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"126a-KVmHiOLVXbvXh31fNLomB1FBK4I\"",
		"mtime": "2026-08-24T06:03:37.723Z",
		"size": 4714,
		"path": "../public/assets/repaired-bikes-BocXX3xO.js"
	},
	"/assets/repaired-bikes-D1GZTine.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c2-iVCcqNSkqOGkYBhsfBvJfKZdBFQ\"",
		"mtime": "2026-08-24T06:03:37.723Z",
		"size": 450,
		"path": "../public/assets/repaired-bikes-D1GZTine.js"
	},
	"/assets/reports-CI4zVq6y.png": {
		"type": "image/png",
		"etag": "\"5e8b-MAf+mH0TcdCixH5F+f4dIo4FD5s\"",
		"mtime": "2026-08-24T06:03:37.725Z",
		"size": 24203,
		"path": "../public/assets/reports-CI4zVq6y.png"
	},
	"/assets/reports-dfui1E0Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f7d-by2cQQDRZH6JVZZo7cE0wK69dtk\"",
		"mtime": "2026-08-24T06:03:37.723Z",
		"size": 3965,
		"path": "../public/assets/reports-dfui1E0Q.js"
	},
	"/assets/rolldown-runtime-hePW80VL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2cc-fA8td6k29UVF6JoPfhOPkceTK1M\"",
		"mtime": "2026-08-24T06:03:37.723Z",
		"size": 716,
		"path": "../public/assets/rolldown-runtime-hePW80VL.js"
	},
	"/assets/rotate-ccw-BArjzEym.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc-dpYbD7GC2scLt+zKcWnRIK6ql6Y\"",
		"mtime": "2026-08-24T06:03:37.723Z",
		"size": 188,
		"path": "../public/assets/rotate-ccw-BArjzEym.js"
	},
	"/assets/routes-CVd3160J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16a3-sSnvs42h9XnoIqkDE+fmOlxggpE\"",
		"mtime": "2026-08-24T06:03:37.723Z",
		"size": 5795,
		"path": "../public/assets/routes-CVd3160J.js"
	},
	"/assets/ruler-5ARH7iHp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"182-lK4HLHYkurgJnvZwsXWVfZojnA4\"",
		"mtime": "2026-08-24T06:03:37.723Z",
		"size": 386,
		"path": "../public/assets/ruler-5ARH7iHp.js"
	},
	"/assets/send-DRbBO5oc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"116-UmAyzMgOjsA1/ApDVe8xRBTlnyQ\"",
		"mtime": "2026-08-24T06:03:37.723Z",
		"size": 278,
		"path": "../public/assets/send-DRbBO5oc.js"
	},
	"/assets/settings-CwgicMEv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1db-62JOlPooqCoWTA/HyrXfaqzBRBc\"",
		"mtime": "2026-08-24T06:03:37.723Z",
		"size": 475,
		"path": "../public/assets/settings-CwgicMEv.js"
	},
	"/assets/settings-D-looumG.png": {
		"type": "image/png",
		"etag": "\"185c7-ffqItnIRqY3jxwED24ynJGLtubo\"",
		"mtime": "2026-08-24T06:03:37.725Z",
		"size": 99783,
		"path": "../public/assets/settings-D-looumG.png"
	},
	"/assets/settings-cBpz2fLj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a1e8-Lz7UjBFn9waVkx+/rrSjR98iUlE\"",
		"mtime": "2026-08-24T06:03:37.723Z",
		"size": 41448,
		"path": "../public/assets/settings-cBpz2fLj.js"
	},
	"/assets/shield-ClH9F5lg.png": {
		"type": "image/png",
		"etag": "\"bf92-mi0ce/wkmqeoX0FyuunxpqjLrkY\"",
		"mtime": "2026-08-24T06:03:37.726Z",
		"size": 49042,
		"path": "../public/assets/shield-ClH9F5lg.png"
	},
	"/assets/shield-alert-WL0QN7eh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"155-PXPnZKAQmtK2XYZU1Wguh206Ooo\"",
		"mtime": "2026-08-24T06:03:37.723Z",
		"size": 341,
		"path": "../public/assets/shield-alert-WL0QN7eh.js"
	},
	"/assets/shield-check-WcMmpDQF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"134-eCquFC938G+g/6wBsNNg/poIOWg\"",
		"mtime": "2026-08-24T06:03:37.723Z",
		"size": 308,
		"path": "../public/assets/shield-check-WcMmpDQF.js"
	},
	"/assets/styles-c9HqhXgH.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"19d9a-tIh3h7JCwZ8qx9Nxnv1v1x/HZMA\"",
		"mtime": "2026-08-24T06:03:37.726Z",
		"size": 105882,
		"path": "../public/assets/styles-c9HqhXgH.css"
	},
	"/assets/switch-ZHUyKNVY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"130b-J1aBT8msgrKOR41O4gOh4W4tykc\"",
		"mtime": "2026-08-24T06:03:37.723Z",
		"size": 4875,
		"path": "../public/assets/switch-ZHUyKNVY.js"
	},
	"/assets/tasks-B3oQ8xrZ.png": {
		"type": "image/png",
		"etag": "\"12a35-6k8QNuc5g6sCnnCI9XjRxOY+oRc\"",
		"mtime": "2026-08-24T06:03:37.726Z",
		"size": 76341,
		"path": "../public/assets/tasks-B3oQ8xrZ.png"
	},
	"/assets/tasks-BirVW891.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f95-cRfOsCITt/Cu0BpP2RHHwZdKmxU\"",
		"mtime": "2026-08-24T06:03:37.723Z",
		"size": 8085,
		"path": "../public/assets/tasks-BirVW891.js"
	},
	"/assets/trash-2-8BYMZ18H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13c-AVcZS9evU+Y7LYogRS9TRHV2yHs\"",
		"mtime": "2026-08-24T06:03:37.723Z",
		"size": 316,
		"path": "../public/assets/trash-2-8BYMZ18H.js"
	},
	"/assets/trending-up-Cmv3C3Q_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a3-j9Jh8fDVFOKjbVqzdou5bD6KFbY\"",
		"mtime": "2026-08-24T06:03:37.723Z",
		"size": 163,
		"path": "../public/assets/trending-up-Cmv3C3Q_.js"
	},
	"/assets/ui-kit-DOEYkiYU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17994-DtCCUFiL1YRjmFiu5+UX71Zw/64\"",
		"mtime": "2026-08-24T06:03:37.723Z",
		"size": 96660,
		"path": "../public/assets/ui-kit-DOEYkiYU.js"
	},
	"/assets/useParams-CA66iYoL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fe-F6ZAIhpCBWABzRw4iXIlvgSS6XI\"",
		"mtime": "2026-08-24T06:03:37.723Z",
		"size": 254,
		"path": "../public/assets/useParams-CA66iYoL.js"
	},
	"/assets/useSearch-Bq1X4LNX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d6-gkAnNRM7FEdmm0h/Atqm0UxOrw0\"",
		"mtime": "2026-08-24T06:03:37.723Z",
		"size": 214,
		"path": "../public/assets/useSearch-Bq1X4LNX.js"
	},
	"/assets/user-DWODKeoy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b8-L32tgWsBzzuHEEHxNUANjTtSd+A\"",
		"mtime": "2026-08-24T06:03:37.723Z",
		"size": 184,
		"path": "../public/assets/user-DWODKeoy.js"
	},
	"/assets/user-plus-CMrYfIhh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12a-7JQ7qj34m4IipQNJn6BUBk8MoJ0\"",
		"mtime": "2026-08-24T06:03:37.724Z",
		"size": 298,
		"path": "../public/assets/user-plus-CMrYfIhh.js"
	},
	"/assets/users-3sfpU1wF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3fc5-1KqjfMRlpoTwG/posMajtOqDjGg\"",
		"mtime": "2026-08-24T06:03:37.724Z",
		"size": 16325,
		"path": "../public/assets/users-3sfpU1wF.js"
	},
	"/assets/users-DurcrBDB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"126-yrhFc2/DEnd/2ubqFatUbX2nisw\"",
		"mtime": "2026-08-24T06:03:37.724Z",
		"size": 294,
		"path": "../public/assets/users-DurcrBDB.js"
	},
	"/assets/users-YmUS8wse.png": {
		"type": "image/png",
		"etag": "\"7e68-01w4pNgg/swcPf1OCNSAjfTxaR0\"",
		"mtime": "2026-08-24T06:03:37.726Z",
		"size": 32360,
		"path": "../public/assets/users-YmUS8wse.png"
	},
	"/assets/wallet-BFRGkvYc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"112-pvVtSI2ImvbBvsQ/+/St8yodxyI\"",
		"mtime": "2026-08-24T06:03:37.724Z",
		"size": 274,
		"path": "../public/assets/wallet-BFRGkvYc.js"
	},
	"/assets/web-Bsnuc7rd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"353-iSyCF/G1S0eT/SLpiCTgL5Gnzpc\"",
		"mtime": "2026-08-24T06:03:37.724Z",
		"size": 851,
		"path": "../public/assets/web-Bsnuc7rd.js"
	},
	"/icons/icon-192.png": {
		"type": "image/png",
		"etag": "\"a1a6-nW+KHInzNfPyzDv8jB4vnJRrrWE\"",
		"mtime": "2026-08-24T06:03:42.531Z",
		"size": 41382,
		"path": "../public/icons/icon-192.png"
	},
	"/icons/icon-512.png": {
		"type": "image/png",
		"etag": "\"4263c-Yjed2yM/Y41Ze2/Ad9inyWLODrE\"",
		"mtime": "2026-08-24T06:03:42.533Z",
		"size": 271932,
		"path": "../public/icons/icon-512.png"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_IO091Z = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_IO091Z
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
