# Demo Posters — Source + Exports

এই ফোল্ডারে ৩টি অ্যাপের ডেমো-পোস্টার আছে। প্রতিটি পোস্টার ৩টি ফরম্যাটে দেওয়া:

| ফাইল | উদ্দেশ্য | ব্যবহার |
|---|---|---|
| `app-N-poster.svg` | সম্পাদনযোগ্য সোর্স | ভবিষ্যতে টেক্সট/রং পরিবর্তনের জন্য |
| `app-N-poster.webp` | ওয়েবে দেখানোর জন্য (~70KB) | `<Image>` component |
| `app-N-poster.png` | সোশ্যাল শেয়ারিং / ইমেইল | fallback, OG image |

**Dimensions:** 1080×1920 (9:16 portrait)  
**Fonts used:** Hind Siliguri Bold (headlines), Noto Sans Bengali (body) — Google Fonts, free, OFL license  
**Colors:** `#0B3B36` (emerald-deep), `#C9A96E` (gold-royal), `#F6F1E4` (cream)

## Posters

1. **app-1-poster** — *মুহূর্ত ব্রেথ* (Breath Moment) · Calming teal gradient · "২১ সেকেন্ড যথেষ্ট"
2. **app-2-poster** — *পদক্ষেপ* (Footsteps) · Sunrise gold→emerald · "৪১ দিনের যাত্রা"
3. **app-3-poster** — *৩৬৯* · Deep emerald + royal gold · "আধ্যাত্মিক রূপান্তর"

## How to regenerate (if you edit SVG sources)

```bash
# Install once:
sudo apt install librsvg2-bin webp fonts-beng

# Re-export PNG + WebP:
for f in public/demos/app-*-poster.svg; do
  base=$(basename $f .svg)
  rsvg-convert -w 1080 -h 1920 -f png "$f" -o "public/demos/${base}.png"
  cwebp -q 82 "public/demos/${base}.png" -o "public/demos/${base}.webp"
done
```

## Why posters instead of videos?

Original plan used `.mp4` demo videos (ছিল ০-byte placeholder file)। Videos:
- বড় file size (Cloudflare Pages build limits issue)
- Autoplay mobile-এ muted ছাড়া চলে না
- Production ready video না থাকায় page broken ছিল

পোস্টার approach এর সুবিধা:
- LCP দ্রুত (tiny WebP)
- SEO-crawlable (alt text + Bengali content)
- Social share-এ সরাসরি preview আসে
- পরে চাইলে video add করে এটাকে poster হিসেবে রাখা যাবে
