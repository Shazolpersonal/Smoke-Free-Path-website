/**
 * Runtime-safe config reader.
 *
 * All values here are `NEXT_PUBLIC_*` environment variables inlined at
 * build time by Next.js. They therefore need hard-coded fallbacks that
 * match production reality, so the UI stays usable even if the
 * deployment forgets to set a variable.
 *
 * IMPORTANT: never put private secrets in this file — everything here
 * ships to the browser.
 */

/** Raw 11-digit BD mobile as stored in BKash/Nagad apps. */
export const BKASH_NUMBER: string =
  process.env.NEXT_PUBLIC_BKASH_NUMBER || "01977752579";

export const NAGAD_NUMBER: string =
  process.env.NEXT_PUBLIC_NAGAD_NUMBER || "01977752579";

export const WHATSAPP_NUMBER: string =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "01977752579";

export const SUPPORT_EMAIL: string =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "niyyah369app@gmail.com";

export const ORDER_EMAIL: string =
  process.env.NEXT_PUBLIC_ORDER_EMAIL ||
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL ||
  "niyyah369app@gmail.com";

export const SITE_URL: string = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://smoke-free-path.pages.dev"
).replace(/\/$/, "");

export const BUNDLE_PRICE: number = Number(
  process.env.NEXT_PUBLIC_BUNDLE_PRICE || 369
);
export const ORIGINAL_PRICE: number = Number(
  process.env.NEXT_PUBLIC_ORIGINAL_PRICE || 963
);
export const CUSTOMER_LIMIT: number = Number(
  process.env.NEXT_PUBLIC_CUSTOMER_LIMIT || 963
);

export const ORDER_WORKER_URL: string | undefined =
  process.env.NEXT_PUBLIC_ORDER_WORKER_URL || undefined;

/** Convert "01977752579" → "8801977752579" for wa.me / tel: links. */
export function toIntlBdPhone(n: string | undefined | null): string {
  if (!n) return "";
  const digits = n.replace(/\D/g, "");
  if (digits.startsWith("880")) return digits;
  if (digits.startsWith("0")) return "880" + digits.slice(1);
  return digits;
}

/** Localized display for a phone number (e.g. "01977-752579"). */
export function formatBdPhoneDisplay(n: string | undefined | null): string {
  if (!n) return "";
  const digits = n.replace(/\D/g, "");
  if (digits.length !== 11) return n ?? "";
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}
