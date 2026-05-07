# Hero / Open Graph Posters

Social sharing এবং homepage hero-এর জন্য ব্যানার-পোস্টার।

| ফাইল | মাপ | ব্যবহার |
|---|---|---|
| `hero-og.*` | 1200×630 | Open Graph (Facebook, LinkedIn), Twitter summary card |
| `hero-landscape-1920.*` | 1920×1080 | Desktop hero banner, YouTube thumbnail |
| `hero-square-1080.*` | 1080×1080 | Instagram/Facebook feed square |

প্রতিটি size-এর জন্য তিনটি format:
- **SVG** — editable source
- **WebP** — website-এ ব্যবহারের জন্য (~40-75KB)
- **PNG** — সোশ্যাল/ইমেইলের জন্য fallback

## Alt text (Bengali + English)

**Hero OG:**
- bn: "ধোঁয়া-মুক্ত পথ — শেষ ধূমপান আজই হোক, নতুন জীবন আগামীকাল শুরু হোক। তিনটি অ্যাপ, ৪১ দিনের যাত্রা, সারাজীবনের স্বাধীনতা। মাত্র ৳৩৬৯।"
- en: "Dhoya-Mukto Poth — End smoking today, start a new life tomorrow. Three apps, a 41-day journey, lifelong freedom. Only ৳369."

Same message, same color palette as demo posters — for brand consistency.

## Primary recommendation

- Meta `og:image` → `/og/hero-og.png` (PNG preferred by Facebook/LinkedIn scrapers)
- WhatsApp rich preview → same PNG works
- `<Image>` in Hero section → `/og/hero-landscape-1920.webp` (fast loading)

See `app/layout.tsx` for current bindings.
