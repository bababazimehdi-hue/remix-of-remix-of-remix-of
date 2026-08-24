import {
  formatJalaliDate,
  formatJalaliDateLong,
  formatJalaliDateTime,
  formatJalaliDateTimeLong,
  formatJalaliFullMoment,
  formatJalaliTime,
  nowISO,
  relativeTime as relativeTimeCore,
} from "./datetime";

const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
const AR_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

/** Normalizes both Persian and Arabic-Indic digits before numeric parsing. */
function toLatinDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (digit) => String(FA_DIGITS.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(AR_DIGITS.indexOf(digit)));
}

export function toFa(value: string | number): string {
  return String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)]!);
}

export function groupDigits(value: number | string): string {
  const n = typeof value === "number" ? value : Number(String(value).replace(/[^\d.-]/g, ""));
  if (!Number.isFinite(n)) return "";
  return n.toLocaleString("en-US");
}

export type Currency = "TOMAN" | "RIAL";

export function money(amount: number, currency: Currency = "TOMAN"): string {
  const value = currency === "RIAL" ? amount * 10 : amount;
  return `${toFa(groupDigits(value))} ${currency === "RIAL" ? "ریال" : "تومان"}`;
}

/** All date/time display goes through the central Intl-based module. */
export const faDate = formatJalaliDate;
export const faDateLong = formatJalaliDateLong;
export const faDateTime = formatJalaliDateTime;
export const faDateTimeLong = formatJalaliDateTimeLong;
export const faFullMoment = formatJalaliFullMoment;

export function faTime(value: string | number | Date, withSeconds = false): string {
  return formatJalaliTime(value, withSeconds);
}

export const relativeTime = relativeTimeCore;

/** Turns an input value into a grouped, Persian-digit amount for display. */
export function formatAmountInput(raw: string): string {
  const digits = toLatinDigits(raw).replace(/\D/g, "");
  if (!digits) return "";
  return toFa(groupDigits(Number(digits)));
}

export function parseAmountInput(raw: string): number {
  // Amounts are stored as whole currency units. Dots, commas, Arabic
  // separators and spaces are grouping characters (e.g. 100.000 = 100000).
  const digits = toLatinDigits(raw).replace(/\D/g, "");
  return digits ? Number(digits) : 0;
}

/** Canonical ISO-UTC timestamp for storage. */
export const todayISO = nowISO;
export { nowISO };
