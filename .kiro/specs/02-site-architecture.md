# Site Architecture — Dhoya-Mukto Poth

## Site Map

### Total Pages: 11

```
/                      → Homepage (12-section single-scroll)
/checkout              → Purchase form + bKash/Nagad instructions
/gift                  → Gift purchase flow
/thank-you             → Post-purchase confirmation
/download/[token]      → Token-protected APK download page
/story                 → Full founder's story (Tanvir & Abdul Karim)
/faq                   → Extended FAQ
/install-guide         → APK installation tutorial
/policy/refund         → 41-Day Promise full terms
/policy/privacy        → Privacy policy
/policy/terms          → Terms of service
/contact               → WhatsApp + email contact
```

## Page Specifications

### 1. Homepage (`/`)

**Type:** Single-page scroll with 12 distinct sections

**Sections:**
1. Hero — Main value proposition + dual CTAs
2. Pain Mirror — Recognition of smoker's internal struggle
3. Harsh Reality — Statistical wake-up call
4. New Hope — Removing guilt, building confidence
5. Three Pillars — The three apps explained
6. Live Demo — Interactive app previews
7. Founder's Story — Emotional core (Abdul Karim's story)
8. Price Comparison — Value demonstration
9. 41-Day Promise — Risk reversal guarantee
10. Islamic Inspiration — Spiritual motivation
11. FAQ — Common questions accordion
12. Final CTA — Decision moment

**Navigation:**
- Sticky header with logo + language toggle
- Smooth scroll to sections
- Mobile hamburger menu
- Footer with links to all pages

**Key Features:**
- Language toggle (Bengali ⇄ English)
- Share buttons (WhatsApp, Facebook)
- Dual CTAs throughout (self/gift)
- Scroll-triggered animations

### 2. Checkout Page (`/checkout`)

**Purpose:** Self-purchase flow

**Form Fields:**
- Full Name (required)
- Email Address (required)
- Phone Number (required, Bangladesh format)
- Purpose: Self / Gift (radio buttons)

**Payment Section:**
- bKash Personal Number instructions with visual
- Nagad Personal Number instructions with visual
- Clear step-by-step payment guide
- Transaction ID input field (after payment)

**Messaging:**
- "We'll email you within 6 hours with download links"
- "Check spam folder if you don't see it"
- "Save this page — you can return anytime"

**Validation:**
- Email format check
- Phone number format (Bangladesh)
- Transaction ID format
- All fields required before submit

### 3. Gift Page (`/gift`)

**Purpose:** Gift purchase flow

**Form Fields:**
- Your Name (required)
- Your Email (required)
- Your Phone (required)
- Recipient Name (required)
- Recipient Email (required)
- Custom Message (optional, max 500 characters)

**Preview Section:**
- Shows what recipient will receive
- Preview of gift email design

**Special Messaging:**
- "আপনার উপহার সদকায়ে জারিয়া হোক"
- "Your gift may become continuous charity"
- Explanation of sadaqah jariyah concept

**Payment:** Same as checkout page

### 4. Thank You Page (`/thank-you`)

**Purpose:** Post-purchase confirmation

**Content:**
- Warm Bengali thank-you message
- "What happens next" timeline:
  - ✅ Payment received
  - ⏳ Verification (within 6 hours)
  - 📧 Email with download links
  - 📱 Install and begin journey

**Actions:**
- Social share prompt: "বন্ধুদের জানিয়ে দিন"
- WhatsApp share button (pre-written message)
- Facebook share button
- Instagram/Facebook follow buttons

**Support:**
- "Need help?" → WhatsApp contact
- "Didn't receive email?" → Check spam instructions

### 5. Download Page (`/download/[token]`)

**Purpose:** Secure APK delivery

**Security:**
- Token-validated access
- One-time or limited-time tokens
- Invalid token → redirect to contact page

**Content:**
- Welcome message
- 3 APK download buttons:
  1. ধোঁয়া-মুক্ত পথ: পদক্ষেপ
  2. ধোঁয়া-মুক্ত পথ: ৩৬৯
  3. মুহূর্ত ব্রেথ
- File sizes displayed
- Installation guide embedded
- WhatsApp support number visible

**Instructions:**
- "Download all three apps"
- "Follow installation guide below"
- "Need help? Contact us on WhatsApp"

### 6. Story Page (`/story`)

**Purpose:** Full founder's story (extended version)

**Content:**
- Complete narrative of Abdul Karim's life
- Tanvir's journey creating the apps
- Behind-the-scenes development
- Mission and vision
- Photos (if available, otherwise placeholders)

**Design:**
- Letter-like layout
- Serif typography
- Sepia tones
- Ample whitespace
- NO CTAs within story (dignity over conversion)
- Single CTA at very end

### 7. FAQ Page (`/faq`)

**Purpose:** Extended FAQ with detailed answers

**Format:** Accordion-style expandable sections

**Categories:**
1. Technical Questions (installation, updates, compatibility)
2. Payment Questions (methods, security, refunds)
3. Product Questions (how apps work, languages, content)
4. Trust Questions (who we are, privacy, data)

**Questions:** (See content-copy.md for full list and answers)

### 8. Install Guide Page (`/install-guide`)

**Purpose:** Step-by-step APK installation tutorial

**Content:**
- Android version requirements
- "Unknown sources" enable guide (with screenshots)
- Step-by-step installation for each app
- Embedded 2-minute YouTube video tutorial
- Troubleshooting common issues
- "Need help?" → WhatsApp CTA

**Visuals:**
- Screenshots for each step
- Arrows and annotations
- GIF animations for complex steps

### 9. Policy Pages

#### `/policy/refund` — 41-Day Promise Full Terms

**Content:**
- Complete terms and conditions
- Exactly 3 logical points required for refund
- Email: refund-request@[domain]
- 7-day response SLA
- Process timeline
- What happens after refund approval

#### `/policy/privacy` — Privacy Policy

**Content:**
- Bangladesh-compliant privacy policy
- Emphasize: offline-first, no data collection
- What data we collect (email, phone for delivery only)
- How data is used
- Data retention
- User rights

#### `/policy/terms` — Terms of Service

**Content:**
- Standard Bangladesh-compliant terms
- Lifetime access definition
- Update policy
- Refund policy reference
- Limitation of liability
- Governing law (Bangladesh)

### 10. Contact Page (`/contact`)

**Purpose:** Support and inquiries

**Contact Methods:**
- WhatsApp number (primary)
- Email address
- Response time expectations

**Form:**
- Name
- Email
- Subject
- Message
- Submit button

**Messaging:**
- "আমরা সাহায্য করতে এখানে আছি"
- "We're here to help"
- Response within 24 hours

## User Flows

### Flow A: Self-Purchase Journey

```
Homepage
  ↓ (Read hero section)
Pain Mirror
  ↓ (Recognition: "This is me")
Harsh Reality
  ↓ (Urgency: "This is serious")
New Hope
  ↓ (Possibility: "There's a way")
Three Pillars
  ↓ (Understanding: "How it works")
Live Demo
  ↓ (Visualization: "I can see it")
Founder's Story
  ↓ (Connection: "Someone understands")
Price Comparison
  ↓ (Value: "This is affordable")
41-Day Promise
  ↓ (Trust: "No risk")
Islamic Inspiration
  ↓ (Spiritual: "This is right")
Final CTA
  ↓ (Decision: "I'm ready")
Checkout Page
  ↓ (Fill form)
Payment Instructions
  ↓ (Pay via bKash/Nagad)
Submit Transaction ID
  ↓
Thank You Page
  ↓ (Wait for email)
Email with Download Link
  ↓ (Click link)
Download Page
  ↓ (Download APKs)
Install Guide
  ↓ (Install apps)
Begin Journey ✨
```

**Average Time:** 8-15 minutes (if reading full story)

**Key Decision Points:**
1. After Pain Mirror — Do they recognize themselves?
2. After Story — Do they feel understood?
3. After Promise — Do they trust us?

### Flow B: Gift Purchase Journey

```
Homepage
  ↓ (Recognize loved one's struggle)
Click "Gift" CTA
  ↓
Gift Page
  ↓ (Read sadaqah jariyah message)
Fill Form
  - Your details
  - Recipient details
  - Custom message
  ↓
Preview Gift Email
  ↓ (Confirm it looks good)
Payment Instructions
  ↓ (Pay via bKash/Nagad)
Submit Transaction ID
  ↓
Thank You Page
  ↓
Recipient Receives Beautiful Email
  ↓ (Recipient clicks link)
Recipient Download Page
  ↓ (Recipient downloads APKs)
Recipient Begins Journey ✨
```

**Average Time:** 5-8 minutes

**Key Decision Points:**
1. Is this an appropriate gift?
2. Will they be offended or grateful?
3. Can I afford it?

### Flow C: Share Journey

```
Any Page
  ↓
Click Share Button (WhatsApp/Facebook)
  ↓
Pre-written Bengali Message Appears:
"আমি একটি অসাধারণ জিনিস খুঁজে পেয়েছি যা ধূমপান ছাড়তে সাহায্য করতে পারে। 
যদি আপনি বা আপনার পরিচিত কেউ ধূমপায়ী হন, এটি দেখুন: [link]"
  ↓
Share with Contacts
  ↓
Contacts Visit Site
  ↓
Enter Flow A or B
```

**Viral Coefficient Goal:** 1.2 (each buyer shares with 1-2 people)

## Navigation Structure

### Header (Sticky)

**Desktop:**
```
[Logo] [হোম] [গল্প] [FAQ] [যোগাযোগ] [Language: বাং | EN] [CTA: ৳৩৬৯]
```

**Mobile:**
```
[Logo] [Language] [☰ Menu]
```

### Footer

**Column 1: পণ্য (Product)**
- তিনটি অ্যাপ
- মূল্য
- ৪১-দিন প্রতিশ্রুতি

**Column 2: সহায়তা (Support)**
- FAQ
- ইনস্টল গাইড
- যোগাযোগ

**Column 3: আইনি (Legal)**
- রিফান্ড নীতি
- প্রাইভেসি পলিসি
- শর্তাবলী

**Column 4: সংযোগ (Connect)**
- WhatsApp
- Facebook
- Instagram
- Email

**Bottom:**
```
© 2024 ধোঁয়া-মুক্ত পথ | আবদুল করিমের স্মৃতিতে নিবেদিত
```

## Technical Routing

### Next.js App Router Structure

```
app/
├── (marketing)/
│   ├── page.tsx              → /
│   ├── story/page.tsx        → /story
│   ├── faq/page.tsx          → /faq
│   └── install-guide/page.tsx → /install-guide
├── (commerce)/
│   ├── checkout/page.tsx     → /checkout
│   ├── gift/page.tsx         → /gift
│   ├── thank-you/page.tsx    → /thank-you
│   └── download/[token]/page.tsx → /download/[token]
├── (legal)/
│   └── policy/[slug]/page.tsx → /policy/refund, /policy/privacy, /policy/terms
├── contact/page.tsx          → /contact
├── layout.tsx
└── globals.css
```

### Route Groups Rationale

- **(marketing):** Public pages, SEO-optimized, static
- **(commerce):** Transaction pages, form validation
- **(legal):** Policy pages, static content
- **contact:** Standalone contact page

## SEO Structure

### Meta Tags (Per Page)

**Homepage:**
- Title: "ধোঁয়া-মুক্ত পথ | ধূমপান ছাড়ার সম্পূর্ণ সমাধান"
- Description: "তিনটি অ্যাপ, ৪১ দিনের যাত্রা, সারাজীবনের স্বাধীনতা। বিজ্ঞান ও আধ্যাত্মিকতার সমন্বয়ে ধূমপান ছাড়ুন।"
- OG Image: Hero image with Bengali text
- Keywords: ধূমপান ছাড়া, quit smoking Bangladesh, smoking cessation Bengali

**Story Page:**
- Title: "আমাদের গল্প — কেন এই অ্যাপগুলো বানিয়েছিলাম"
- Description: "আবদুল করিমের স্মৃতিতে — একজন বাবার গল্প এবং একজন ছেলের প্রতিশ্রুতি।"

### Sitemap Priority

1. Homepage: 1.0
2. Story, FAQ: 0.8
3. Checkout, Gift: 0.7
4. Other pages: 0.5

## Mobile Responsiveness

### Breakpoints

```css
Mobile:  0-767px    (design-first priority)
Tablet:  768-1023px
Desktop: 1024px+
```

### Mobile-Specific Considerations

1. **Hero:** Stack elements vertically, larger touch targets
2. **Three Pillars:** Stack cards vertically
3. **Story:** Single column, larger line height
4. **CTAs:** Full-width buttons on mobile
5. **Navigation:** Hamburger menu
6. **Forms:** Single column, large input fields

## Performance Considerations

### Static Generation
- All pages pre-rendered at build time
- No server-side rendering needed
- Deploy to Cloudflare Pages

### Code Splitting
- Route-based code splitting (automatic with Next.js)
- Component-level lazy loading for heavy sections

### Image Optimization
- Next.js Image component
- WebP format with fallbacks
- Lazy loading below fold
- Responsive images per breakpoint

### Font Loading
- Google Fonts with display=swap
- Preload critical fonts
- Subset fonts to Bengali + English characters only

## Analytics & Tracking

### Events to Track

**Engagement:**
- Time on page
- Scroll depth (25%, 50%, 75%, 100%)
- Section views (which sections get attention)
- Language toggle usage

**Conversion:**
- CTA clicks (self vs gift)
- Checkout page visits
- Form submissions
- Payment instructions viewed
- Download page visits

**Support:**
- FAQ accordion opens
- Install guide views
- Contact form submissions
- WhatsApp button clicks

**Social:**
- Share button clicks
- Share destination (WhatsApp vs Facebook)

### Tools
- Cloudflare Web Analytics (privacy-friendly)
- Microsoft Clarity (session recordings)
- No Google Analytics (privacy commitment)
