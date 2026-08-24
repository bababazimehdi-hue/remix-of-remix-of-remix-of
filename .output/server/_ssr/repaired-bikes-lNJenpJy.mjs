import { U as nowISO } from "./router-DkR-Q5N6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/repaired-bikes-lNJenpJy.js
/**
* Moves a bike into the «دوچرخه‌های تعمیر شده» section.
* The bike (and its purchase price) leaves the purchases/inventory accounts;
* the mechanic wages recorded on its tasks are intentionally left untouched.
*/
function markBikeRepaired(purchases, bikeId, userId, note) {
	return purchases.map((p) => p.id === bikeId && !p.repairedAt ? {
		...p,
		repairedAt: nowISO(),
		repairedBy: userId,
		...note?.trim() ? { repairedNote: note.trim() } : {}
	} : p);
}
/** Tasks of a bike that are still open (not approved / booked / cancelled). */
var openBikeTasks = (tasks, bikeId) => tasks.filter((t) => t.bikeId === bikeId && t.status !== "APPROVED" && t.status !== "SYNCED_TO_ACCOUNTING" && t.status !== "CANCELLED");
/** Total mechanic wage recorded for a bike — kept even after it is repaired. */
var bikeWageTotal = (tasks, bikeId) => tasks.filter((t) => t.bikeId === bikeId && t.status !== "CANCELLED" && t.status !== "REJECTED").reduce((s, t) => s + (t.finalWage ?? t.wage), 0);
//#endregion
export { markBikeRepaired as n, openBikeTasks as r, bikeWageTotal as t };
