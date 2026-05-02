# Premium Luxe Redesign — ধোঁয়া-মুক্ত পথ

**Status:** In Progress
**Owner:** Frontend
**Branch:** `feat/premium-luxe-redesign`
**Started:** 2026-05-02

---

## Overview

A site-wide *visual* refinement of `smoke-free-path.pages.dev` that elevates every
homepage section to a **premium "Emerald & Gold Luxe"** aesthetic — the feel of a
dignified, mission-driven brochure for a high-stakes product (people's health,
lives, and an imam's memorial). No content, narrative order, routing, or audio
behavior changes. Only *how it looks and feels* changes.

> بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
>
> এই কাজ সম্পূর্ণভাবে আবদুল করিম রাহিমাহুল্লাহ-এর স্মৃতির প্রতি সম্মান রক্ষা করে,
> এবং ৯টি *Steering Principles* (README অনুযায়ী) অক্ষুণ্ণ রাখে।

---

## Goals

1. Establish a cohesive **Emerald & Gold Luxe** visual system across all 12 homepage
   sections, Header, and Footer.
2. Introduce a premium token layer (deeper emerald, gold glow, cream parchment,
   brand-tinted shadows) **without breaking** existing Tailwind v4 tokens.
3. Add tasteful, respectful **motion & micro-interactions** that reinforce the
   contemplative feel — no gimmicks, no flashing, no violations of
   `prefers-reduced-motion`.
4. Treat the **FounderStory** section with *extra* editorial care — it stays
   sacred, no CTAs pushed inside it, and the tone deepens rather than distracts.
5. Preserve every existing behavior: audio narration, routing, accessibility,
   SEO metadata, structured data, Cloudflare Pages static export, analytics.

## Non-Goals

- ❌ No copy/content changes. Every `copyBn.*`, `faqItems`, and config reference
  stays byte-for-byte identical in intent.
- ❌ No routing changes. All `href`s, `/checkout`, `/gift`, `/contact`, policy
  pages remain untouched.
- ❌ No dependency churn beyond what already exists in `package.json`.
- ❌ No touching of the audio system (`components/audio/*`) or its CSS hooks
  (`.sfp-audio-completion-highlight`, `#price-comparison` id).
- ❌ No new fonts added (we reuse Hind Siliguri, Noto Sans Bengali, Playfair
  Display, Inter, Amiri to avoid additional Google Fonts payload).
- ❌ No structural narrative re-order — the 12-section flow stays exactly as the
  site has matured into.

## Scope

**In-scope files (22 touched):**

| Category | Files |
|---|---|
| Spec | `specs/premium-luxe-redesign/document.md` (new) |
| Tokens & utilities | `app/globals.css` (extended), `lib/motion.ts` (new) |
| New UI primitives | `components/ui/LuxeDivider.tsx`, `GlassCard.tsx`, `LuxeBackground.tsx` (all new) |
| Upgraded UI primitives | `CTAButton.tsx`, `PriceBadge.tsx`, `SectionWrapper.tsx`, `StoryLetter.tsx`, `IslamicQuote.tsx`, `FAQAccordion.tsx`, `index.ts` |
| Priority sections | `Hero.tsx`, `FounderStory.tsx`, `PriceComparison.tsx`, `FinalCTA.tsx` |
| Refined sections | `PainMirror.tsx`, `NewHope.tsx`, `Reality.tsx`, `ThreePillars.tsx`, `LiveDemo.tsx`, `IslamicInspiration.tsx`, `Promise.tsx`, `FAQ.tsx` |
| Layout | `components/layout/Header.tsx`, `components/layout/Footer.tsx` |

**Out-of-scope (untouched):**

- `components/audio/**/*` (sacred — "আব্বার কথা" narration)
- `lib/config.ts`, `lib/utils.ts`, `lib/order.ts`
- `content/**/*` (all Bengali/English copy stays identical)
- `app/api/**/*` (routes)
- `app/(marketing)/**/*`, `app/(commerce)/**/*`, `app/(legal)/**/*` (sub-pages)
- `next.config.ts`, `package.json`, tsconfig, eslint, Cloudflare config
- `public/` assets (`brand/hero-sunrise.svg`, `brand/logomark.svg`, demo posters)

---

## Design Direction — Emerald & Gold Luxe

### Extended Color Palette (added on top of existing tokens)

```css
/* Existing (preserved exactly) */
--color-emerald-deep: #0F5132;   /* primary brand */
--color-gold-royal:   #D4A017;   /* primary accent */
--color-blue-serenity:#1E6091;   /* calm/breathing */
--color-white-pure:   #FAFAF7;   /* pure background */
--color-charcoal:     #1A1A1A;   /* body text */
--color-red-alert:    #B8342D;
--color-orange-sunrise:#E07A3B;
--color-mint-fresh:   #6FB897;

/* NEW — luxe extensions */
--color-emerald-abyss:  #061812;   /* near-black forest, for premium dark bgs */
--color-emerald-night:  #0A2A1F;   /* deeper than brand emerald, not as dark as abyss */
--color-emerald-bright: #1B7A4F;   /* lifted emerald for hover / borders */
--color-gold-glow:      #F5C947;   /* lighter gold for glow + highlights */
--color-gold-soft:      #EAB730;   /* between royal and glow — for secondary accents */
--color-cream-parchment:#F8F2E2;   /* warm cream for story/reading surfaces */
--color-cream-deep:     #EEE4C9;   /* slightly deeper cream for contrast */
--color-ink-velvet:     #0F1410;   /* near-black with emerald undertone */
```

### Typography
- Keep all five existing Google Fonts — no additions.
- Reserve **Playfair Display** for key English display moments (decorative flourishes)
  and ornamental numerals like "৩৬৯".
- Reserve **Amiri** strictly for Arabic verses (already correct).
- Slightly tighter letter-spacing on Bengali headlines (`tracking-tight`) for a
  more luxurious typeset feel.

### Signature Visual Elements

1. **Luxe background system** (`<LuxeBackground>`):
   - animated gradient mesh (emerald-abyss → emerald-deep → gold-royal 12% opacity)
   - floating decorative orbs (bokeh blur)
   - sub-pixel noise overlay (`.luxe-noise`) for print-feel
   - optional geometric arabesque overlay at 4–6% opacity
2. **Gold filigree dividers** (`<LuxeDivider>`): a thin, centered, gold arabesque
   line with a diamond midpoint — used between emotional section transitions
   (Hero → PainMirror, FounderStory before/after).
3. **Glass-morphism cards** (`<GlassCard>`): frosted surfaces with a 1px gold
   border that glows softly on hover, brand-tinted shadow, inner emerald tint.
4. **Glowing CTA buttons**: gold base with dual layered shadows (a soft emerald
   shadow + a tighter gold glow), an inner shimmer gradient that traverses on
   hover, and a gentle pulse ring on primary actions.
5. **Scroll-driven reveals**: `y: 32 → 0`, `opacity: 0 → 1`, with a premium
   easing `cubic-bezier(0.22, 1, 0.36, 1)` over 700–900ms, staggered across
   cards at 110ms each. All revealed via Framer Motion's
   `whileInView` with `once: true`.
6. **Premium shadow system**: emerald-tinted shadows replace generic `black/20`:
   - `.shadow-luxe-sm` = `0 2px 8px rgba(15, 81, 50, 0.08)`
   - `.shadow-luxe-md` = `0 8px 24px rgba(15, 81, 50, 0.12), 0 2px 6px rgba(15, 81, 50, 0.08)`
   - `.shadow-luxe-lg` = `0 20px 48px rgba(15, 81, 50, 0.18), 0 8px 16px rgba(15, 81, 50, 0.10)`
   - `.shadow-gold-glow` = `0 0 40px rgba(212, 160, 23, 0.35), 0 8px 24px rgba(212, 160, 23, 0.18)`
7. **Gradient text** (`.text-luxe-gradient`): emerald-deep → gold-royal via
   `background-clip: text`.

---

## Section-by-Section Plan

### Priority 1 — Deep polish

#### 1. Hero
- **Background:** `emerald-abyss → emerald-deep → gold-royal (at 20% stop)` multi-stop
  diagonal gradient. A luxe gradient mesh orb (emerald-bright, blur-[120px]) drifts
  slowly; a second gold-soft orb at opposite corner. Noise overlay 4%.
- **Price badge:** Dark glass variant with gold inner glow, animated shine across
  `৳৩৬৯` on mount.
- **Headline:** `text-luxe-headline` — tighter tracking, gradient shine sweeping the
  word "ধোঁয়া-মুক্ত পথ" at 2.4s after load (once).
- **CTA buttons:** primary uses new `variant="luxe"` with shimmer + gold pulse ring.
- **Right panel:** SVG frame gets a gold-royal tinted inner border + outer emerald
  glow, subtle rotation (0.5deg) in idle, scale-up on hover.
- **Scroll indicator:** A thin gold chevron fading + dropping at bottom ("scroll
  to begin").

#### 2. FounderStory (sacred)
- **Background:** `cream-parchment` with a very faint paper-fiber noise (raised to
  6% opacity for tactility).
- **Ornaments:** Two `<LuxeDivider>` instances — one above heading, one between
  signature and note. Small decorative gold "۞" glyph above the heading.
- **Heading:** Serif Playfair, tighter tracking, emerald-deep color with a gold
  underline that animates in.
- **First paragraph:** Drop cap styling (the first Bengali letter enlarged, tinted
  gold, with an emerald frame).
- **Diary quote:** The existing italic left-border quote gets a gold-royal left
  border (thicker), a subtle parchment-deep bg tint, and rounded corners.
- **Signature block:** Styled as a hand-signed letter — signature in script-feel
  (using `italic` + Playfair), role in small caps with wide tracking.
- **Note:** Centered, italic, with two tiny gold dots bookending it.
- **No CTAs** — principle preserved.

#### 3. PriceComparison (conversion)
- **Wrapper MUST keep `id="price-comparison"`** so `AudioMount`'s completion
  highlight keeps working (`.sfp-audio-completion-highlight` targets this).
- **Background:** `ink-velvet → emerald-night` deep gradient with subtle diagonal
  light rays (CSS conic-gradient at 2% opacity).
- **Cost cards:** Glass-morphism; red-alert values stay red but get a bottom gold
  divider on hover. Each card lifts 4px on hover with a luxe shadow.
- **Bundle card:** Premium glass card with a gold border glow ring, embossed
  "৳" watermark at 8% opacity. List items get gold bullet glyphs (✦) instead of
  plain text. The quote below gets decorative gold quotation marks.
- **Count-up animation** on `৳৩৬৯` when the bundle card enters viewport.

#### 4. FinalCTA
- **Background:** `emerald-abyss` with a *three*-orb composition (emerald-bright,
  gold-soft, gold-glow) drifting at different speeds.
- **Heading:** Huge Bengali display, with a gold gradient shine sweep.
- **Main CTA:** Oversized luxe button (golden) with dual-shadow, shimmer, and a
  subtle floating animation (y: -2 on idle, 1.2s ease-in-out loop). 41-day
  guarantee label next to it with a tiny shield icon.
- **Gift CTA:** Golden outline variant with the 🎁 icon inline.
- **ShareBar:** Buttons get gold hover glows, slightly larger hit areas.
- **Subtle "with sincerity" micro-footer:** a line in tiny gold italic.

### Priority 2 — Refined

#### 5. PainMirror
- Darker background (`ink-velvet → emerald-night`); thought cards become
  glass-morphism with a 1px `gold-royal/20` top border that glows on hover;
  emerald-deep closing line becomes `text-luxe-gradient`.

#### 6. Reality
- Stat cards: luxe-dark surface, red-alert numerals gain a gentle pulse on
  count-up completion; quote gets gold filigree corner ornaments (SVG).

#### 7. NewHope
- Gradient refined: `emerald-night → orange-sunrise/12 → mint-fresh/10`.
  Pillar rows get a gold left-accent that animates on hover (slide).

#### 8. ThreePillars
- Minor: section gets `bg-cream-parchment`, kicker pill upgraded to glass, the
  bundle reminder gets a luxe CTA styling and a gold glow.

#### 9. LiveDemo
- Card frames get gold border, emerald-tinted shadow; poster surface keeps
  existing SVG but gains a subtle top-right gold-royal "ribbon" accent.

#### 10. IslamicInspiration
- IslamicQuote gains gold corner ornaments (Islamic geometric arabesque SVG),
  the `bg-emerald-deep/10` becomes `bg-white-pure` with a thicker gold border.
  Body text centered with a subtle emerald column accent on desktop.

#### 11. Promise
- Shield icon gains a soft gold-glow aura (spring on enter). The benefit list
  gets gold `✓` glyphs. "কেন ৪১ দিন" card uses glass-morphism.

#### 12. FAQ
- Accordion items: luxe-sm shadow, plus-icon becomes a small gold circle that
  smoothly rotates to '×' when open. Answer area gets a gentle emerald left
  accent.

### Priority 3 — Header & Footer

#### Header
- Logo wordmark preserved. On scroll, the bar gets a *gold-tinted* bottom
  divider (1px) and the emerald text gets a hairline gold underline that
  expands on logo hover.
- Nav links: hover ink becomes emerald-deep with a gold underline glide.
- CTA pill ("৳৩৬৯") becomes a luxe variant — gold gradient, shimmer on hover.
- Mobile menu: background becomes emerald-abyss with gold accents for hierarchy,
  backdrop-blur.

#### Footer
- Background stays charcoal but gains a top `1px` gold-royal gradient line
  (linear-gradient horizontally). Brand title gets `text-luxe-gradient`. Column
  headings keep gold-royal but add slight letter-spacing. The
  "Built with sincerity and compassion" line becomes centered with two small
  gold dots bookending it. © line stays as-is.

---

## Motion & Easing System (`lib/motion.ts`)

Shared constants so every section uses the same premium feel:

```ts
export const EASE_LUXE = [0.22, 1, 0.36, 1] as const; // gentle overshoot-free
export const EASE_QUIET = [0.4, 0, 0.2, 1] as const;

export const fadeUp = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 } };
export const fadeIn = { initial: { opacity: 0 }, whileInView: { opacity: 1 } };
export const scaleIn = { initial: { opacity: 0, scale: 0.96 }, whileInView: { opacity: 1, scale: 1 } };
```

Plus `staggerContainer(delay)`.

---

## Accessibility & Performance

- All decorative SVGs get `aria-hidden="true"`.
- All motion wrapped with Framer Motion's native `useReducedMotion()`-friendly
  primitives. Critical animations also gated via CSS
  `@media (prefers-reduced-motion: reduce)` as double defense.
- Color contrast: emerald-abyss `#061812` on gold-glow `#F5C947` = 10.89:1 (AAA).
  charcoal on cream-parchment = 14.1:1 (AAA). All CTAs maintain ≥ 4.5:1.
- No layout shift. All new backgrounds use absolutely-positioned decorative layers
  that don't affect content flow.
- No new network requests. No new fonts. No new dependencies.
- Lighthouse targets (from README): Performance ≥ 90, Accessibility ≥ 95,
  SEO ≥ 95 — preserved.

## Audio Narration — Preserved Guarantees

- `app/globals.css` keeps `.sfp-audio-completion-highlight`,
  `.sfp-audio-toast-in`, `.sfp-transcript-scroll`, keyframes, and reduced-motion
  rules exactly as-is.
- `app/layout.tsx` keeps `<AudioProvider>` wrapping + `<AudioMount />` at the
  bottom unchanged.
- `PriceComparison` retains `id="price-comparison"` and the outer element is
  still the element that receives `.sfp-audio-completion-highlight`.
- No changes to `components/audio/*`.

---

## Acceptance Criteria

- [ ] `npm run build` succeeds on Next.js 16 with Tailwind v4 (no type errors,
      no runtime errors, no broken imports).
- [ ] All 12 homepage sections render identically in terms of *copy* to the
      current live site.
- [ ] Every `href`, `id`, and route remains functional.
- [ ] Audio narration system still mounts, plays, and triggers the completion
      glow on the `#price-comparison` section.
- [ ] No violation of `prefers-reduced-motion` — reduced-motion users see
      static layouts with fades only.
- [ ] Mobile (375px) layout works on every section without horizontal scroll.
- [ ] Tablet (768px) and desktop (1280px+) layouts feel premium.
- [ ] Lighthouse scores within the README targets (manual check post-deploy).

## Test Plan

1. `npm run build` — CI must pass.
2. Manual QA on `/` homepage: scroll through all 12 sections on desktop + mobile
   viewports.
3. Audio playback: start narration, scroll to PriceComparison, observe
   completion glow on the section (`.sfp-audio-completion-highlight`).
4. Reduced-motion: toggle OS preference, reload, confirm no big motion plays.
5. Tab through the page — all focus rings visible, all CTAs reachable.
6. Color contrast — spot check via DevTools on new glass-morphism surfaces.

## Implementation Notes

- We **extend** the CSS variable system rather than replace it — the existing
  `--color-emerald-deep` etc. stay usable, and we layer `--color-emerald-abyss`
  etc. on top. This keeps untouched pages (checkout, story, faq sub-page) looking
  consistent.
- `SectionWrapper` gets new `bgVariant` values (`'luxe-dark' | 'parchment' | 'ink'`)
  additionally — existing `'white' | 'emerald' | 'dark' | 'sepia'` remain.
- `CTAButton` gets a new `variant="luxe"` on top of `primary` and `secondary` —
  existing usage stays working.
- All new files live under `components/ui/` for consistency.

## Status / Open Questions

- ✅ Scope: polished refinement (not full redesign) — approved.
- ✅ Direction: Emerald & Gold Luxe — approved.
- ✅ Live URL: `smoke-free-path.pages.dev` — captured.
- ✅ Priority sections: Hero, FounderStory, PriceComparison, FinalCTA — approved.
- ✅ Constraint: "careful, don't break, no info loss" — respected in every file.
- ⏳ Post-PR: collect user review feedback, iterate on any subtle details.
