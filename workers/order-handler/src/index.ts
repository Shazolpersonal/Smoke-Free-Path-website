/**
 * ধোঁয়া-মুক্ত পথ :: order-handler Worker
 *
 * POST /orders
 *   body: OrderData JSON (see ../lib/order.ts for the shape on the client)
 *   returns: { ok: true, id: string }  on success
 *            { ok: false, error }       on validation / send failure
 *
 * GET /health  →  200 "ok"  (cheap ping endpoint for monitoring)
 *
 * Secrets (wrangler secret put):
 *   RESEND_API_KEY   — from resend.com dashboard
 *   ORDER_EMAIL      — destination Gmail (niyyah369app@gmail.com)
 *
 * Vars (wrangler.toml):
 *   ALLOWED_ORIGINS  — array of origins permitted by CORS
 *   FROM_EMAIL       — RFC 5322 From header
 */

interface Env {
  RESEND_API_KEY: string;
  ORDER_EMAIL: string;
  ALLOWED_ORIGINS: string[];
  FROM_EMAIL: string;
}

interface OrderData {
  name: string;
  email: string;
  phone: string;
  purpose: "self" | "gift";
  trxId: string;
  recipientName?: string;
  recipientEmail?: string;
  message?: string;
}

/** very small validator — no external deps */
function validateOrder(o: unknown): OrderData | string {
  if (!o || typeof o !== "object") return "Body must be a JSON object";
  const d = o as Record<string, unknown>;
  const required: Array<keyof OrderData> = [
    "name",
    "email",
    "phone",
    "purpose",
    "trxId",
  ];
  for (const k of required) {
    if (typeof d[k] !== "string" || (d[k] as string).length === 0) {
      return `Field '${k}' is required`;
    }
  }
  if (d.purpose !== "self" && d.purpose !== "gift") {
    return "purpose must be 'self' or 'gift'";
  }
  if (!/^01[3-9]\d{8}$/.test(d.phone as string)) {
    return "phone must be a valid BD mobile (01[3-9]XXXXXXXX)";
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email as string)) {
    return "email is not valid";
  }
  if ((d.purpose as string) === "gift") {
    if (!d.recipientName || !d.recipientEmail) {
      return "gift orders need recipientName and recipientEmail";
    }
  }
  return d as unknown as OrderData;
}

function corsHeaders(origin: string | null, allowed: string[]) {
  const ok = origin
    ? allowed.some((a) => origin === a || origin.endsWith(".pages.dev"))
    : false;
  return {
    "Access-Control-Allow-Origin": ok ? origin! : allowed[0] ?? "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

function buildEmailHtml(d: OrderData, id: string): string {
  const escape = (s: string) =>
    s.replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        }[c] as string)
    );

  const giftBlock =
    d.purpose === "gift"
      ? `
    <tr><td><strong>Gift for:</strong></td><td>${escape(d.recipientName || "")}</td></tr>
    <tr><td><strong>Recipient email:</strong></td><td>${escape(d.recipientEmail || "")}</td></tr>
    <tr><td><strong>Message:</strong></td><td>${escape(d.message || "—")}</td></tr>`
      : "";

  return `<!doctype html>
<html><body style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px">
  <h1 style="color:#0B3B36">New Order :: ধোঁয়া-মুক্ত পথ</h1>
  <p>Order id: <code>${id}</code></p>
  <table cellspacing="0" cellpadding="6" style="border-collapse:collapse;width:100%;border:1px solid #ddd">
    <tr><td><strong>Name:</strong></td><td>${escape(d.name)}</td></tr>
    <tr><td><strong>Email:</strong></td><td><a href="mailto:${escape(d.email)}">${escape(d.email)}</a></td></tr>
    <tr><td><strong>Phone:</strong></td><td><a href="tel:+88${escape(d.phone)}">${escape(d.phone)}</a></td></tr>
    <tr><td><strong>Purpose:</strong></td><td>${d.purpose}</td></tr>
    <tr><td><strong>Transaction ID:</strong></td><td>${escape(d.trxId)}</td></tr>
    ${giftBlock}
  </table>
  <p style="color:#666;margin-top:24px">Verify the bKash/Nagad transaction and reply with download links within 6 hours.</p>
</body></html>`;
}

async function sendViaResend(env: Env, d: OrderData, id: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.FROM_EMAIL,
      to: env.ORDER_EMAIL,
      reply_to: d.email,
      subject: `New Order: ${d.purpose.toUpperCase()} - ${d.name}`,
      html: buildEmailHtml(d, id),
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend error ${res.status}: ${body}`);
  }
}

const handler = {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    const origin = req.headers.get("origin");
    const allowed = env.ALLOWED_ORIGINS ?? [];
    const cors = corsHeaders(origin, allowed);

    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (url.pathname === "/health" && req.method === "GET") {
      return new Response("ok", { headers: cors });
    }

    if (url.pathname !== "/orders" || req.method !== "POST") {
      return Response.json({ ok: false, error: "Not Found" }, { status: 404, headers: cors });
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return Response.json(
        { ok: false, error: "Invalid JSON body" },
        { status: 400, headers: cors }
      );
    }

    const result = validateOrder(body);
    if (typeof result === "string") {
      return Response.json(
        { ok: false, error: result },
        { status: 400, headers: cors }
      );
    }

    const id = `ord_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

    try {
      await sendViaResend(env, result, id);
    } catch (err) {
      return Response.json(
        {
          ok: false,
          error: "email_send_failed",
          detail: err instanceof Error ? err.message : String(err),
          id, // client still knows the id in case operator queries logs
        },
        { status: 502, headers: cors }
      );
    }

    return Response.json({ ok: true, id }, { headers: cors });
  },
};

export default handler;
