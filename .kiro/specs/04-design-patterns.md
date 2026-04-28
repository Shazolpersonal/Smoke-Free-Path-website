# Design Patterns — Dhoya-Mukto Poth

## Responsive Breakpoints

```css
Mobile:  0-767px    (design-first priority)
Tablet:  768-1023px
Desktop: 1024px+
```

### Mobile-First Philosophy

This site MUST be designed mobile-first because:
1. Majority of Bangladesh traffic is mobile
2. Many users have older Android devices
3. Data connections may be slow
4. Screen sizes vary widely

**Design Priority:** If a feature works beautifully on mobile but is "just okay" on desktop, that's acceptable. The reverse is NOT acceptable.

---

## Animation Philosophy

### Core Principles

1. **Subtle over flashy** — Animations should enhance, not distract
2. **Purposeful over decorative** — Every animation should have a reason
3. **Respectful of preferences** — Honor `prefers-reduced-motion`
4. **Performance-conscious** — No janky animations on older devices

### Animation Library

**Primary:** Framer Motion

**Why Framer Motion:**
- Declarative React API
- Excellent performance
- Built-in scroll triggers
- Gesture support
- Accessibility-aware

### Animation Patterns

#### 1. Entrance Animations

**Pattern:** Fade-in + slight translate-y

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  {content}
</motion.div>
```

**Use for:**
- Section headings
- Card components
- CTA buttons
- Important text blocks

#### 2. Scroll-Triggered Reveals

**Pattern:** Reveal on scroll into viewport

```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.7 }}
>
  {content}
</motion.div>
```

**Use for:**
- Each homepage section
- Stat cards in Reality section
- Three Pillars cards
- FAQ items

#### 3. Hover States

**Pattern:** Subtle scale + shadow

```tsx
<motion.button
  whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(0,0,0,0.15)" }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2 }}
>
  {buttonText}
</motion.button>
```

**Use for:**
- CTA buttons
- App cards
- Navigation links

#### 4. Number Counting Animation

**Pattern:** Count up for statistics

```tsx
// Use react-countup or custom hook
<CountUp
  start={0}
  end={72000}
  duration={2}
  separator=","
  prefix="৳"
/>
```

**Use for:**
- Harsh Reality section statistics
- Price comparison numbers

### Animation Timing

| Animation Type | Duration | Easing |
|----------------|----------|--------|
| Micro-interactions | 0.15-0.2s | easeOut |
| Entrance | 0.5-0.7s | easeOut |
| Scroll reveals | 0.6-0.8s | easeOut |
| Page transitions | 0.3-0.4s | easeInOut |

### Accessibility: Reduced Motion

**CRITICAL:** Always respect user preferences

```tsx
const prefersReducedMotion = useReducedMotion();

<motion.div
  initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
  animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
>
  {content}
</motion.div>
```

Or use Framer Motion's built-in support:

```tsx
// Framer Motion automatically respects prefers-reduced-motion
// when using default transitions
```

### What NOT to Animate

- ❌ Auto-playing videos with sound
- ❌ Aggressive parallax effects
- ❌ Infinite spinning/rotating elements
- ❌ Flashing or strobing effects
- ❌ Animations that block content access

---

## Component Patterns

### 1. `<SectionWrapper />`

**Purpose:** Consistent vertical padding and max-width for all sections

**Props:**
```tsx
interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'emerald' | 'dark';
  id?: string; // for anchor links
}
```

**Implementation:**
```tsx
<section
  id={id}
  className={cn(
    "py-16 md:py-24",
    "px-4 md:px-8",
    backgrounds[background]
  )}
>
  <div className="max-w-6xl mx-auto">
    {children}
  </div>
</section>
```

---

### 2. `<CTAButton />`

**Purpose:** Primary and secondary call-to-action buttons

**Variants:**
- **primary:** Gold background, white text
- **secondary:** Outlined, transparent background
- **gift:** Special styling for gift CTA

**Props:**
```tsx
interface CTAButtonProps {
  variant: 'primary' | 'secondary' | 'gift';
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}
```

**Styling:**
```css
/* Primary */
background: var(--color-gold-royal);
color: white;
padding: 16px 32px;
border-radius: 8px;
font-weight: 600;
box-shadow: 0 4px 12px rgba(212, 160, 23, 0.3);

/* Hover */
transform: translateY(-2px);
box-shadow: 0 6px 16px rgba(212, 160, 23, 0.4);

/* Secondary */
border: 2px solid var(--color-emerald-deep);
color: var(--color-emerald-deep);
background: transparent;
```

---

### 3. `<AppCard />`

**Purpose:** Display each of the three apps in the Three Pillars section

**Props:**
```tsx
interface AppCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  screenshot: string;
  theme: 'blue' | 'emerald' | 'gold';
  demoLink?: string;
}
```

**Layout:**
- Icon at top
- Title + subtitle
- Description text
- Screenshot image
- "ডেমো দেখুন" link

**Responsive:**
- Desktop: 3 cards side-by-side
- Tablet: 2 cards, then 1
- Mobile: Stacked vertically

---

### 4. `<TestimonialCard />`

**Purpose:** Future-ready for testimonials (not in MVP)

**Props:**
```tsx
interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
}
```

---

### 5. `<FAQAccordion />`

**Purpose:** Expandable Q&A sections

**Behavior:**
- Click to expand/collapse
- Smooth height animation
- Only one open at a time (optional)
- Keyboard accessible

**Implementation:**
```tsx
// Use Radix UI Accordion or Headless UI Disclosure
import * as Accordion from '@radix-ui/react-accordion';

<Accordion.Root type="single" collapsible>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Question</Accordion.Trigger>
    <Accordion.Content>Answer</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

---

### 6. `<PriceBadge />`

**Purpose:** Display price with strikethrough original price

**Props:**
```tsx
interface PriceBadgeProps {
  originalPrice: number;
  currentPrice: number;
  currency?: string;
  discount?: number;
}
```

**Display:**
```
~~৳৯৬৩~~  ৳৩৬৯  (৬২% ছাড়)
```

---

### 7. `<IslamicQuote />`

**Purpose:** Display Quranic verses or hadith with proper styling

**Props:**
```tsx
interface IslamicQuoteProps {
  arabic: string;
  bengaliTranslation: string;
  reference: string;
}
```

**Styling:**
- Emerald background
- Gold border (2px)
- White text
- Arabic in 'Amiri' font
- Bengali translation below
- Reference in smaller text

---

### 8. `<LanguageToggle />`

**Purpose:** Switch between Bengali and English

**Behavior:**
- Toggle button in header
- Persists choice in localStorage
- Smooth content transition
- Icon + text label

**States:**
- বাং (active)
- EN (inactive)

---

### 9. `<StoryLetter />`

**Purpose:** Special layout for founder's story section

**Characteristics:**
- Serif typography (Playfair Display for English, Hind Siliguri for Bengali)
- Left-aligned text (like a letter)
- Ample whitespace
- Sepia tones
- No CTA buttons inside
- Handwritten-style quotes

---

### 10. `<ShareBar />`

**Purpose:** Social sharing buttons

**Platforms:**
- WhatsApp (primary)
- Facebook
- Copy Link

**Pre-written Bengali message:**
```
আমি একটি অসাধারণ জিনিস খুঁজে পেয়েছি যা ধূমপান ছাড়তে সাহায্য করতে পারে। 
যদি আপনি বা আপনার পরিচিত কেউ ধূমপায়ী হন, এটি দেখুন: [link]
```

---

## Layout Components

### Header

**Desktop:**
```
[Logo] [হোম] [গল্প] [FAQ] [যোগাযোগ] [Language: বাং | EN] [CTA: ৳৩৬৯]
```

**Mobile:**
```
[Logo] [Language] [☰ Menu]
```

**Behavior:**
- Sticky on scroll
- Transparent initially, solid background after scroll
- Smooth scroll to sections
- Mobile: Hamburger menu with slide-in drawer

---

### Footer

**Layout:** 4 columns on desktop, stacked on mobile

**Columns:**
1. পণ্য (Product)
2. সহায়তা (Support)
3. আইনি (Legal)
4. সংযোগ (Connect)

**Bottom:**
```
© 2024 ধোঁয়া-মুক্ত পথ | আবদুল করিমের স্মৃতিতে নিবেদিত
```

---

## Accessibility Requirements

### WCAG AA Minimum

**Color Contrast:**
- Body text: 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- Interactive elements: 3:1 minimum

**Keyboard Navigation:**
- All interactive elements focusable
- Visible focus indicators
- Logical tab order
- Skip to main content link

**Semantic HTML:**
```html
<main>
  <section aria-labelledby="hero-heading">
    <h1 id="hero-heading">...</h1>
  </section>
</main>
```

**Images:**
- All images have meaningful alt text in Bengali
- Decorative images: `alt=""`
- Complex images: Detailed descriptions

**Forms:**
- Labels associated with inputs
- Error messages clear and helpful
- Required fields indicated
- Validation feedback

**Screen Reader Support:**
- ARIA labels where needed
- ARIA live regions for dynamic content
- Proper heading hierarchy (h1 → h2 → h3)

---

## Performance Targets

### Lighthouse Scores

- **Performance:** ≥ 90
- **Accessibility:** ≥ 95
- **Best Practices:** ≥ 90
- **SEO:** ≥ 95

### Core Web Vitals

- **First Contentful Paint (FCP):** < 1.5s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Cumulative Layout Shift (CLS):** < 0.1
- **First Input Delay (FID):** < 100ms

### Page Weight

- **Total page size:** < 2MB
- **Images:** WebP format, lazy loaded
- **Fonts:** Subset to Bengali + English characters only
- **JavaScript:** Code splitting, tree shaking

---

## Responsive Design Rules

### Mobile (0-767px)

- Single column layout
- Full-width buttons
- Larger touch targets (min 44x44px)
- Simplified navigation (hamburger)
- Stacked cards
- Larger font sizes for readability

### Tablet (768-1023px)

- 2-column layouts where appropriate
- Slightly larger spacing
- Hybrid navigation (some visible, some in menu)

### Desktop (1024px+)

- Multi-column layouts
- Hover states active
- Full navigation visible
- Larger hero images
- Side-by-side content

---

## Design System Tokens

### Spacing Scale

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 24px;
--space-6: 32px;
--space-7: 48px;
--space-8: 64px;
--space-9: 96px;
--space-10: 128px;
```

### Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;
```

### Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
```

---

## Image Guidelines

### Formats

- **Primary:** WebP with JPEG fallback
- **Icons:** SVG
- **Screenshots:** PNG (for clarity)

### Optimization

- Compress all images (TinyPNG, Squoosh)
- Responsive images with srcset
- Lazy loading below the fold
- Blur-up placeholder technique

### Alt Text Guidelines

**Good:**
```html
<img src="app-screenshot.webp" alt="মুহূর্ত ব্রেথ অ্যাপের হোম স্ক্রিন যেখানে ১২টি শ্বাস-প্রশ্বাসের কৌশল দেখানো হচ্ছে" />
```

**Bad:**
```html
<img src="app-screenshot.webp" alt="screenshot" />
```

---

## Form Design Patterns

### Input Fields

```tsx
<div className="form-field">
  <label htmlFor="email">ইমেইল ঠিকানা *</label>
  <input
    id="email"
    type="email"
    required
    aria-required="true"
    aria-describedby="email-error"
  />
  <span id="email-error" className="error-message">
    {error}
  </span>
</div>
```

### Validation

- Real-time validation (on blur)
- Clear error messages in Bengali
- Success states (green checkmark)
- Disabled submit until valid

### Error Messages

**Good:**
```
দয়া করে একটি সঠিক ইমেইল ঠিকানা দিন
```

**Bad:**
```
Invalid email
```

---

## Loading States

### Skeleton Screens

Use skeleton screens instead of spinners for better perceived performance.

```tsx
<div className="skeleton">
  <div className="skeleton-line" />
  <div className="skeleton-line short" />
</div>
```

### Progress Indicators

For multi-step forms (checkout, gift):
```
[1. তথ্য] → [2. পেমেন্ট] → [3. নিশ্চিতকরণ]
```

---

## Print Styles

Consider users who might want to print:
- Refund policy
- Installation guide
- Receipt/confirmation

```css
@media print {
  header, footer, .no-print {
    display: none;
  }
  
  body {
    font-size: 12pt;
    color: black;
  }
}
```
