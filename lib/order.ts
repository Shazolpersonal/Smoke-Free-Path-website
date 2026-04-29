/**
 * Order submission logic.
 *
 * Strategy (2026 refactor):
 * 1. If NEXT_PUBLIC_ORDER_WORKER_URL is set, POST the order as JSON to the
 *    Cloudflare Worker. Worker emails the order to the operator and
 *    returns {ok: true, id}.
 * 2. If the Worker call fails OR no URL is configured, fall back to a
 *    mailto: link pre-filled with the order details so the customer's
 *    email client can still deliver it.
 *
 * This dual-path design keeps the site 100% functional on static
 * Cloudflare Pages hosting: if the operator has set up a Worker, we use
 * it; otherwise we degrade gracefully.
 */

export interface OrderData {
  name: string;
  email: string;
  phone: string;
  purpose: "self" | "gift";
  trxId: string;
  recipientName?: string;
  recipientEmail?: string;
  message?: string;
}

export interface OrderResult {
  ok: boolean;
  /** Server-assigned order id, if a Worker was contacted. */
  id?: string;
  /** True when we fell back to mailto because the Worker was unavailable. */
  mailtoFallback: boolean;
  /** Human-readable status in Bengali for UI display. */
  message: string;
}

const FALLBACK_ORDER_EMAIL = "niyyah369app@gmail.com";

function buildEmailSubject(data: OrderData): string {
  return `New Order: ${data.purpose.toUpperCase()} - ${data.name}`;
}

function buildEmailBody(data: OrderData): string {
  let body = `ORDER DETAILS:\n-------------------\n`;
  body += `Name: ${data.name}\n`;
  body += `Email: ${data.email}\n`;
  body += `Phone: ${data.phone}\n`;
  body += `Purpose: ${data.purpose}\n`;
  body += `Transaction ID: ${data.trxId}\n\n`;

  if (data.purpose === "gift") {
    body += `GIFT DETAILS:\n-------------------\n`;
    body += `Recipient Name: ${data.recipientName ?? ""}\n`;
    body += `Recipient Email: ${data.recipientEmail ?? ""}\n`;
    body += `Message: ${data.message || "None"}\n\n`;
  }

  body += `Please verify the transaction and send the download links.\n`;
  return body;
}

function openMailto(data: OrderData): void {
  const to =
    process.env.NEXT_PUBLIC_ORDER_EMAIL ||
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL ||
    FALLBACK_ORDER_EMAIL;
  const subject = encodeURIComponent(buildEmailSubject(data));
  const body = encodeURIComponent(buildEmailBody(data));
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
}

export async function submitOrder(data: OrderData): Promise<OrderResult> {
  const workerUrl = process.env.NEXT_PUBLIC_ORDER_WORKER_URL;

  // Path A: Worker is configured — POST JSON.
  if (workerUrl) {
    try {
      const res = await fetch(`${workerUrl.replace(/\/$/, "")}/orders`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const json = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          id?: string;
        };
        return {
          ok: true,
          id: json.id,
          mailtoFallback: false,
          message:
            "ধন্যবাদ! আপনার অর্ডার গৃহীত হয়েছে। ৬ ঘণ্টার মধ্যে ইমেইলে ডাউনলোড লিংক পাবেন।",
        };
      }
      // Non-2xx → fall through to mailto fallback, but log for diagnostics.
      console.warn("[order] worker responded non-ok, falling back to mailto", {
        status: res.status,
      });
    } catch (err) {
      console.warn("[order] worker fetch failed, falling back to mailto", err);
    }
  }

  // Path B: no Worker configured OR Worker failed — mailto fallback.
  openMailto(data);
  return {
    ok: true,
    mailtoFallback: true,
    message:
      "আপনার মেইল অ্যাপ খুলছে — পাঠিয়ে দিন, আমরা ৬ ঘণ্টার মধ্যে উত্তর দেব।",
  };
}
