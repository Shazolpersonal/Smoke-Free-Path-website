# Order Handler Worker (ধোঁয়া-মুক্ত পথ)

Checkout form-এর POST request receive করে, Resend API (অথবা Cloudflare Email Routing) দিয়ে email পাঠায়, এবং success/failure JSON return করে।

## কেন Worker দরকার?

Static Cloudflare Pages-এ server-side code চলে না — তাই form submit হলে customer-এর browser-কে সরাসরি Gmail-এ POST পাঠাতে দেই না (CORS block, spam abuse)।  
একটা ছোট Worker সেই bridge-এর কাজ করবে:

```
Checkout form (browser)  →  POST /orders  →  Worker  →  Resend / Email Routing  →  Gmail inbox
```

## Deploy step-by-step (~১৫ মিনিট, 100% free)

### Step 1 — Resend account (email pathway)

1. https://resend.com এ free account খুলুন (মাসে ৩,০০০ email free)।
2. Dashboard → **API Keys** → **Create API Key** → name: `sfp-order-worker` → copy the key (এখন থেকে `re_xxxxxxx`-এর মত দেখাবে)।
3. Resend **Domains** section-এ যান — custom domain না থাকলে `onboarding@resend.dev` sender use করতে পারেন (শুরুর জন্য যথেষ্ট)।

### Step 2 — Worker deploy

```bash
cd workers/order-handler
npm install
npm run deploy   # calls wrangler deploy
```

(প্রথমবার হলে `npx wrangler login` চালিয়ে Cloudflare account-এ login করুন)।

### Step 3 — Secret set করুন

```bash
npx wrangler secret put RESEND_API_KEY
# paste your re_xxxxxxx from Step 1

npx wrangler secret put ORDER_EMAIL
# paste: niyyah369app@gmail.com
```

### Step 4 — Worker URL নিয়ে আসুন

Deploy শেষ হলে console-এ কিছুটা এরকম দেখাবে:

```
Published sfp-order-handler (1.23 sec)
  https://sfp-order-handler.YOUR-SUBDOMAIN.workers.dev
```

এই URL copy করুন।

### Step 5 — Pages project-এ env var যোগ করুন

1. dash.cloudflare.com → **Pages** → `smoke-free-path` → **Settings** → **Environment variables**
2. Production + Preview দুটোতেই যোগ করুন:
   ```
   NEXT_PUBLIC_ORDER_WORKER_URL = https://sfp-order-handler.YOUR-SUBDOMAIN.workers.dev
   ```
3. **Retry deployment** — পরের deploy-এ লাগবে।

### Step 6 — Test

1. https://smoke-free-path.pages.dev/checkout খুলুন
2. Form fill করে submit করুন
3. `niyyah369app@gmail.com` inbox-এ email আসা উচিত within seconds
4. Browser console-এ দেখবেন 200 OK, no mailto popup

## Architecture note

Resend API-র আরেকটা option হল Cloudflare Email Workers (100% native, domain থাকলে) — কিন্তু সেটা চালু করতে custom domain (e.g. dhoyamuktopoth.com) Cloudflare-এ add করা লাগে। আপাতত Resend সহজ পথ।

## যদি Worker deploy করতে না চান

`lib/order.ts`-এ মানানসই fallback আছে — `NEXT_PUBLIC_ORDER_WORKER_URL` blank রাখলে form submit হলে customer-এর mail client খুলে যাবে (পুরনো behavior, কিন্তু email address এখন সঠিক: `niyyah369app@gmail.com`)।

## Troubleshooting

| সমস্যা | কারণ | সমাধান |
|---|---|---|
| 403 CORS error | `ALLOWED_ORIGIN` env-এ আপনার site URL নেই | `wrangler secret put ALLOWED_ORIGIN` চালিয়ে সঠিক URL set করুন |
| Email আসছে না | Resend API key invalid | dashboard.resend.com → Logs tab check করুন |
| 429 Too Many Requests | Free tier quota (১০০K req/day, ৩K email/mo) শেষ | সাধারণত হবে না, কিন্তু spike হলে upgrade করুন বা rate-limit middleware যোগ করুন |
