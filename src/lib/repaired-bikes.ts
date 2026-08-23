import { nowISO } from "@/lib/datetime";
import type { BicyclePurchase, Task } from "@/lib/store";

/**
 * Moves a bike into the «دوچرخه‌های تعمیر شده» section.
 * The bike (and its purchase price) leaves the purchases/inventory accounts;
 * the mechanic wages recorded on its tasks are intentionally left untouched.
 */
export function markBikeRepaired(
  purchases: BicyclePurchase[],
  bikeId: string,
  userId: string,
  note?: string,
): BicyclePurchase[] {
  return purchases.map((p) =>
    p.id === bikeId && !p.repairedAt
      ? {
          ...p,
          repairedAt: nowISO(),
          repairedBy: userId,
          ...(note?.trim() ? { repairedNote: note.trim() } : {}),
        }
      : p,
  );
}

/** Tasks of a bike that are still open (not approved / booked / cancelled). */
export const openBikeTasks = (tasks: Task[], bikeId: string) =>
  tasks.filter(
    (t) =>
      t.bikeId === bikeId &&
      t.status !== "APPROVED" &&
      t.status !== "SYNCED_TO_ACCOUNTING" &&
      t.status !== "CANCELLED",
  );

/** Total mechanic wage recorded for a bike — kept even after it is repaired. */
export const bikeWageTotal = (tasks: Task[], bikeId: string) =>
  tasks
    .filter((t) => t.bikeId === bikeId && t.status !== "CANCELLED" && t.status !== "REJECTED")
    .reduce((s, t) => s + (t.finalWage ?? t.wage), 0);
