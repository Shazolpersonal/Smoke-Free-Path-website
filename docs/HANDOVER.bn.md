# ধোঁয়া-মুক্ত পথ — বিস্তারিত handover guide

> এই ডকুমেন্ট পড়লেই আপনি বুঝবেন — কি করা হয়েছে, কি আপনি নিজে করবেন, আর কিভাবে করবেন। প্রতিটি সাব-সেকশন স্বাবলম্বি — যে ক্রমে খুশি পড়ুন।

---

## 📌 এক নজরে সব

| # | কাজ | পরিশ্রম (আপনার) | খরচ | প্রয়োজনীয়তা |
|---|---|---|---|---|
| 1 | Env variables সেট করা (Pages dashboard) | ৫ মিনিট | Free | অবশ্য করনীয় |
| 2 | Cloudflare Web Analytics চালু | ৩ মিনিট | Free | পরামর্শ |
| 3 | Order Worker deploy + Resend | ১৫ মিনিট | Free | অবশ্য করনীয় (না করলে mailto fallback চলবে) |
| 4 | Custom domain কিনে Cloudflare-এ add | ২০ মিনিট | ~$10/বছর | Email Routing চাইলে মাত্র |
| 5 | Cloudflare Email Routing | ১০ মিনিট | Free | Domain থাকলেই |

---

## ০. বর্তমান অবস্থা (মিত ২০২৬-০৪-৩০)

### ✅ যা ঠিক হয়েছে (merged PRs #5–#12)

- Header ও Footer সব পেজে রেন্ডার হয়
- CTAButton রেন্ডার বাগ fix
- LanguageToggle hydration-safe (useSyncExternalStore)
- `.env.local.example` + `.gitignore` exception add
- `/faq` standalone পেজ JSON-LD schema সহ (PR #9)
- Demo video placeholder রিপ্লেস নতুন Bengali poster দিয়ে (PR #10)
- Contact page env-driven + real WhatsApp/Gmail (PR #11)
- Cloudflare Worker order handler + safe mailto fallback (PR #12)

### ⏳ যা আপনাকে নিজে চালু করতে হবে

- Cloudflare Pages-এ env var সেট করা (প্রথম প্রয়োজন। না করলে fallback চলবে কিন্তু env ব্যবহার হবে না)
- Cloudflare Web Analytics চালু
- Order Worker deploy (real-time Gmail নোটিফিকেশনের জন্য)

### ❌ যা এখনও সম্ভব না (domain লাগবে)

- Cloudflare Email Routing (`info@yourdomain`, `orders@yourdomain` অ্যাড্রেস) — `pages.dev`-এ মির্ছ নিষিদ্ধ, custom domain লাগবে
- সাইট-এর ব্র্যান্ড ইমেইল সেটআপ — custom domain দরকার

---

## ১. Cloudflare Pages এ env var সেট করা 🔑

একটাই কাজ — এমন চারটা value add করুন যা সাইট ছাড়লে চলবে না।

### Step-by-step

1. 🌐 https://dash.cloudflare.com খুলুন
2. Sidebar → **Workers & Pages** → `smoke-free-path` ক্লিক করুন
3. Tabs: **Settings** → **Environment variables**
4. **Production** column-এ একেকে করে add করুন ("+ Add variable" button):

```
NEXT_PUBLIC_SITE_URL         = https://smoke-free-path.pages.dev
NEXT_PUBLIC_WHATSAPP_NUMBER  = 01977752579
NEXT_PUBLIC_SUPPORT_EMAIL    = niyyah369app@gmail.com
NEXT_PUBLIC_ORDER_EMAIL      = niyyah369app@gmail.com
NEXT_PUBLIC_BKASH_NUMBER     = 01977752579
NEXT_PUBLIC_NAGAD_NUMBER     = 01977752579
NEXT_PUBLIC_BUNDLE_PRICE     = 369
NEXT_PUBLIC_ORIGINAL_PRICE   = 963
NEXT_PUBLIC_CUSTOMER_LIMIT   = 963
```

5. **Preview** column-ও একই একই value copy করে যোগ করুন (Preview = PR থেকে আসা temporary deploy)।
6. ⬇️ নীচে "Save" → তারপর **Deployments** tab → সর্বশেষ deploy-এর পাশে "Retry deployment" ক্লিক

Deploy শেষ হলে `/contact` page-এ WhatsApp link গিয়ে দেখুন — `+8801977752579` দেখাবে ট্রেনিং এর তলায়।

### যদি env set করার পরেও আগের value দেখায়

- Browser cache clear (`Ctrl+Shift+R`)
- Cloudflare Pages-এ Deployments tab থেকে নিশ্চিত করুন new deploy `Success` status
- View source করে HTML-এ নতুন phone number আছে কিনা check

---

## ২. Cloudflare Web Analytics চালু 📈

Google Analytics-এর র্জা, cookie popup দরকার না, privacy-friendly, 100% free।

### Step-by-step

1. dash.cloudflare.com → **Analytics & Logs** → **Web Analytics**
2. "Add a site" (মাঝের বাটন)
3. Hostname: `smoke-free-path.pages.dev` টাইপ করুন
4. Cloudflare একটা **Beacon Token** দেবে, দেখতে হবে এভাবে:
   ```
   {"token": "ab12cd34ef56..."}
   ```
   এই token বা পুরো object copy করুন
5. **Pages → Settings → Environment variables** এ যোগ করুন:
   ```
   NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN = ab12cd34ef56...
   ```
   (শুধু token, `{}` ছাড়া)
6. Retry deployment
7. Site visit করুন ২-৩ মিনিট
8. Cloudflare dashboard → Web Analytics → আপনার site — ভিজিটর stats আসবে

### এউ চালু করতে layout.tsx-এ পরিবর্তন লাগবে?

**না।** কোড-এ conditional আছে:

```tsx
{process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN && (
  <script defer src='...' data-cf-beacon={...} />
)}
```

অর্থাৎ token শূন্য থাকলে script load হয় না, token দিলে auto load হয়।

---

## ৩. Order Handler Worker deploy 📨

### কেন করবো?

Checkout form submit হলে এখন mailto-এ customer-এর email app খোলে। Worker deploy করলে form-এর ডেটা সরাসরি `niyyah369app@gmail.com`-এ আসবে — customer-কে কিচ্ছু করতে হবে না।

### প্রি-রিকুইজিট

- Node.js 20+ local machine-এ (https://nodejs.org থেকে download)
- Cloudflare account (নিক্ষিতই আছে)

### Step-by-step

#### Step 3.1 — Resend account (Free 3K email/month)

1. https://resend.com → "Sign up for free"
2. Gmail দিয়ে account খুলুন (আপনার `niyyah369app@gmail.com`)
3. Inbox check → verification link click
4. Dashboard → **API Keys** → **Create API Key**
   - Name: `sfp-order-worker`
   - Permission: **Sending access**
   - **Create** ক্লিক থেকে `re_xxxxxx...` ধরনের string copy করুন
   - ⚠️ **এই key আর কখনো দেখানো হবে না** — এখনই safe place-এ save করুন

#### Step 3.2 — Worker deploy

টার্মিনাল খুলে:

```bash
# রিপো ক্লোন করুন (আগে থাকলে skip)
git clone https://github.com/Shazolpersonal/Smoke-Free-Path-website.git
cd Smoke-Free-Path-website

# Worker ফোল্ডার-এ যান
cd workers/order-handler

# Dependencies install
npm install

# Cloudflare login (browser খুলবে)
npx wrangler login

# Deploy!
npm run deploy
```

Deploy শেষ হলে terminal-এ এরকম output:

```
Total Upload: 5.82 KiB / gzip: 2.04 KiB
Uploaded sfp-order-handler (1.23 sec)
Published sfp-order-handler (0.47 sec)
  https://sfp-order-handler.your-subdomain.workers.dev
```

এই URL copy করুন।

#### Step 3.3 — Secrets set

```bash
# এখনও workers/order-handler folder-এ
npx wrangler secret put RESEND_API_KEY
# শুধাবে, paste your re_xxxxxxxx → Enter

npx wrangler secret put ORDER_EMAIL
# শুধাবে, paste: niyyah369app@gmail.com → Enter
```

#### Step 3.4 — Pages-এ URL add

dash.cloudflare.com → Pages → `smoke-free-path` → Settings → Environment variables:

```
NEXT_PUBLIC_ORDER_WORKER_URL = https://sfp-order-handler.your-subdomain.workers.dev
```

Production + Preview দুটোতেই add → Save → Retry deployment

#### Step 3.5 — Test 🧪

1. https://smoke-free-path.pages.dev/checkout খুলুন
2. Form fill করুন — ট্রানজাকশন ID field-এ `TEST-XXX-001` লিখুন
3. **জমা দিন** click
4. ১-২ minute-এর মধ্যে `niyyah369app@gmail.com` inbox-এ ডিজাইনড HTML email আসবে subject: `New Order: SELF - <আপনার দেয়া নাম>`
5. না আসলে:
   - Resend dashboard → **Logs** tab → দেখুন error আছে কিনা
   - `npx wrangler tail` চালান Worker logs live দেখার জন্য
   - Spam folder check

### যদি Worker deploy করতে না চান

অসুবিধা নেই — `NEXT_PUBLIC_ORDER_WORKER_URL` blank রেখে দিন, `lib/order.ts` automatic fallback আছে: customer-এর email client খুলে যাবে আপনার Gmail অ্যাড্রেসে pre-filled email নিয়ে। সরাসরি not as smooth, কিন্তু functional।

---

## ৪. Custom domain + Email Routing — optional but recommended 📬

### কেন custom domain লাগবে?

`smoke-free-path.pages.dev` এর MX record আপনি edit করতে পারবেন না (Cloudflare-এর shared subdomain)। অর্থাৎ `info@smoke-free-path.pages.dev` কখনো কাজ করাবে না। আপনি যদি professional email chan (yourname@yourdomain.com), তাহলে domain কিনতেই হবে।

### Domain কোথা থেকে কিনবো?

- **Cloudflare Registrar** (রেকমেন্ড — at-cost pricing, ~$10/বছর)
- Namecheap, GoDaddy, Porkbun — যেকোনো registrar
- `.com` এর চেয়ে `.org`, `.life`, `.app` পাওয়া যায় kichutei cheap-এ

প্রস্তাবিত nam:
- `dhoyamuktopoth.com`
- `dhoyamuktopoth.org`
- `369niyyah.com`
- `niyyah369.com`

WhoIs check: https://whois.com

### ডোমেইন Cloudflare-এ add করা

1. dash.cloudflare.com → **Add a site** button
2. Domain টাইপ করুন → Free plan select
3. Cloudflare DNS records scan করবে → Next
4. আপনার দেওয়া domain registrar-এ যান → Nameservers পরিবর্তন করুন Cloudflare-এর দুটো nameserver-এ (উদাহরণ: `xena.ns.cloudflare.com`)
5. ~1-24 ঘণ্টা লাগবে propagate হতে
6. Cloudflare-এ আবার ফিরে এসে check করুন — domain Active দেখাবে

### Custom domain-কে Pages-এ link করা

1. dash.cloudflare.com → Pages → `smoke-free-path` → **Custom domains** tab
2. "Set up a custom domain" → আপনার domain (যেমন `dhoyamuktopoth.com`)
3. Cloudflare CNAME record auto-add করবে
4. ~2-5 minute-এ https://dhoyamuktopoth.com কাজ করবে
5. **★ Env vars update:** `NEXT_PUBLIC_SITE_URL=https://dhoyamuktopoth.com`

### এবার Email Routing chalউ করা

1. dash.cloudflare.com → আপনার domain → **Email** → **Email Routing**
2. Enable button → Cloudflare MX records add করবে auto
3. **Custom addresses** tab → একেকটা add করুন:

   | Receive at | Send to |
   |---|---|
   | `info@dhoyamuktopoth.com` | niyyah369app@gmail.com |
   | `orders@dhoyamuktopoth.com` | niyyah369app@gmail.com |
   | `support@dhoyamuktopoth.com` | niyyah369app@gmail.com |
   | `contact@dhoyamuktopoth.com` | niyyah369app@gmail.com |
   | `hello@dhoyamuktopoth.com` | niyyah369app@gmail.com |

4. **Destination addresses** tab-এ Gmail verify করতে হবে — `niyyah369app@gmail.com`-এ email আসবে, click verify
5. Save → Done

### Test

- `hello@dhoyamuktopoth.com`-এ আপনার ব্যক্তিগত email থেকে email পাঠান
- `niyyah369app@gmail.com`-এ ১০-৩০ second-এ আসা উচিত
- না আসলে spam folder + Email Routing → **Logs** tab check করুন

### Worker-কেও upgrade করুন (optional)

Domain থাকলে Worker এ Resend-এর জায়গায় Cloudflare Email Workers native API থেকেও email পাঠানো যায় — সেটা 100% Cloudflare-এ থাকে। `workers/order-handler/src/index.ts`-এ `sendViaResend()` এর জায়গায় `sendViaCloudflareEmail()` লেখা যাবে। এটা অপশনাল, Resend দিয়ে পরুনো কাজ চলবে।

---

## ৫. পোস্টার পুনরায় তৈরি করা 🎨

যদি ভবিষ্যতে poster এর headline/রং বদলাতে চান:

```bash
# একবারই install
sudo apt-get install librsvg2-bin webp fonts-beng

# SVG রবক edit করুন (any text editor)
code public/demos/app-1-poster.svg

# আবার regenerate WebP (যদি website-এ পিকসেল-level preview চান)
rsvg-convert -w 1080 -h 1920 -f png public/demos/app-1-poster.svg -o public/demos/app-1-poster.png
cwebp -q 82 public/demos/app-1-poster.png -o public/demos/app-1-poster.webp
```

SVG-ই direct ব্যবহার করছি এখন — browser native-ly render করে, regenerate না করলেও চলবে।

### OG PNG বানানো

যদি Facebook/LinkedIn rich-preview-এ sharp image চান:

```bash
# hero-og.svg → PNG (1200×630)
rsvg-convert -w 1200 -h 630 -f png public/og/hero-og.svg -o public/og/hero-og.png

# বা compressed JPEG
rsvg-convert -w 1200 -h 630 -f png public/og/hero-og.svg | convert - -quality 78 public/og/hero-og.jpg
```

তারপর `app/layout.tsx`-এ `/og/hero-og.svg` → `/og/hero-og.jpg` (বা `.png`) পরিবর্তন করুন এবং ফাইল commit + push।

### নতুন পোস্টার ডিজাইন করাতে চাইলে

SVG editable — Figma, Inkscape, Illustrator, পুরো Adobe suite — সবই SVG open করে। Designer-কে SVG file পাঠান, রং বা text বদলাতে দিন।

---

## ৬. পরীক্ষা checklist ✅

প্রতি deploy-এর পরে এইগুলো check করুন:

- [ ] Home page load হয় (Header ও Footer দুটোই দেখা)
- [ ] `/story`, `/install-guide`, `/faq`, `/contact` — প্রতিটি page load হয় Header+Footer সহ
- [ ] Home-এ LiveDemo section — ৩টি রঙ্গিন poster দেখায় (সবুজ, গোল্ড, গাঢ় সবুজ), "ভিডিও শীঘ্রই" ribbon
- [ ] `/contact` WhatsApp card click → wa.me/8801977752579 open হয়, greeting message pre-filled
- [ ] `/contact` Email card click → `mailto:niyyah369app@gmail.com` open
- [ ] `/faq` load হয়, 10টি প্রশ্ন category-এ group করা
- [ ] Footer-এ `/faq` link click → /faq page-এ যায় (না 404)
- [ ] `/checkout` form submit → Worker deploy করলে Gmail-এ notification; না করলে customer mail app খোলে `niyyah369app@gmail.com` pre-filled
- [ ] Cloudflare Analytics dashboard-এ ভিজিট count বাড়ে (২-৩ min পরে)
- [ ] https://metatags.io তে URL দিয়ে preview: OG image (hero) দেখায়
- [ ] Lighthouse score: Performance 85+, Accessibility 95+, SEO 95+

### Lighthouse run করা

Chrome DevTools → **Lighthouse** tab → Mobile, all categories checked → **Analyze**. `lighthouse-report.json` রিপো-এর root-এ আছে previous baseline হিসাবে।

---

## ৭. Troubleshooting FAQ ❓

<details>
<summary><b>Q: Deploy হয়নি, Cloudflare Pages দেখায় "failed"</b></summary>

Possible cause:
- Build command: `npm run build`? Check Settings → Builds & deployments
- Node version mismatch: Settings → Build → `NODE_VERSION=20` env var add করুন
- হঠাৎ node_modules corrupted: local clone-এ `rm -rf node_modules package-lock.json && npm install` চালিয়ে নতুন lockfile commit করুন

Deploy logs: Pages project → Deployments tab → failed deploy → **View log**
</details>

<details>
<summary><b>Q: Worker deploy-এ `wrangler: command not found`</b></summary>

`npm install` chalaনি হতে পারে। যদি চলান:

```bash
cd workers/order-handler
npm install
npx wrangler deploy   # (npm run deploy এর একই)
```
</details>

<details>
<summary><b>Q: Email Routing setup-এ Gmail verify link আসছে না</b></summary>

- Spam/Promotions folder check
- Verify link-এর validity 24 ঘণ্টা — পরে হলে resend করুন (Email Routing tab → Destination → Resend)
- Gmail filter হয়ে আছে কিনা check: Settings → Filters
</details>

<details>
<summary><b>Q: Checkout form submit হের after Worker deploy, 403 error</b></summary>

CORS issue। Worker-এ আপনার domain allowed origin-এ নেই। `workers/order-handler/wrangler.toml`-এ:

```toml
ALLOWED_ORIGINS = [
  "https://smoke-free-path.pages.dev",
  "https://dhoyamuktopoth.com",  # আপনার নতুন domain
  "http://localhost:3000"
]
```

এবং `npm run deploy` redeploy।
</details>

<details>
<summary><b>Q: WhatsApp link click করলে `+1234567890` আনজানা নম্বর দেখায়</b></summary>

`NEXT_PUBLIC_WHATSAPP_NUMBER` env var set করতে ভুলে গেছেন। Section ১-এ ফিরে যান।
</details>

<details>
<summary><b>Q: সাইট Bengali-এ render না হলে</b></summary>

Fonts load হয়নি — possible causes:
- Ad-blocker Google Fonts block করছে
- Slow 3G-এ Bengali font লোড ধীরে — wait 2-3s
- `layout.tsx`-এ `display: 'swap'` set আছে, তাই প্রথমে fallback font (default system) দেখায়
</details>

---

## ৮. কিছু rollback করা লাগলে সেফটি-নেট

- যেকোনো commit-এর আগে ফিরতে: GitHub → কমিট → **Revert this commit** button
- Cloudflare Pages → Deployments → পূর্বের successful deploy-এর `...` → **Rollback to this deployment**
- Worker → dash.cloudflare.com → Workers → আপনার worker → **Deployments** tab → পুরনো version-এ click → Rollback

---

## ৯. আজের পর future improvements (priority order)

### P1 (৪৭ ঘণ্টা কাজ)

- [ ] Footer-কেও env-driven করা (এখন hardcoded, এক জায়গায় বদলালে সম্পূর্ণ update)
- [ ] Checkout form-এ submit success/failure toast UI (`lib/order.ts`-এর `OrderResult` use করে)
- [ ] Next.js 15 async `params` migration — `/download/[token]` ও `/policy/[slug]` route-এ dead warning
- [ ] GitHub Actions CI-এ `npm run lint` + `tsc --noEmit` gate

### P2 (১-২ দিন)

- [ ] Download token system actual implement (এখন demo `DEMO-TOKEN-123` placeholder)
- [ ] Gift flow backend (recipient-কে email send)
- [ ] Cloudflare Turnstile (CAPTCHA free) add করা checkout form-এ abuse ঠেকাতে
- [ ] Order logging to Cloudflare D1 database (archive বাজারধরণের জন্য)

### P3 (when needed)

- [ ] প্রকৃত demo video record + optimize (currently poster only)
- [ ] iPhone ভার্শন কৌশল চলা (FAQ-এ mentioned)
- [ ] Admin dashboard (order list, refund handling)
- [ ] বাংলা + ইংরেজি bilingual toggle পূর্ণ implement (এখন LanguageToggle আছে কিন্তু content translation partial)

---

## 📞 সাহায্য

কোথাও আটকে গেলে এই ফাইলের সেকশন নম্বর + specific error message পাঠান, আমরা exact fix পাঠাব।

**শুভকামনা — এই প্রচেষ্টা আপনার পিতার প্রতি একটি সদকায়ে জারিয়া হোক।**
