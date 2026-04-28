# Tech Stack — Dhoya-Mukto Poth

## Core Technologies

### Framework
**Next.js 15 (App Router)**

**Why Next.js:**
- React-based (component architecture)
- App Router for modern routing
- Static export support (for Cloudflare Pages)
- Built-in image optimization
- Font optimization with next/font
- Excellent TypeScript support
- SEO-friendly

**Configuration:**
```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export for Cloudflare Pages
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true,
}

module.exports = nextConfig
```

---

### Language
**TypeScript (strict mode)**

**Why TypeScript:**
- Type safety reduces bugs
- Better IDE support
- Self-documenting code
- Easier refactoring

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "allowJs": true,
    "forceConsistentCasingInFileNames": true,
    "incremental": true,
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

### Styling
**Tailwind CSS v4**

**Why Tailwind:**
- Utility-first approach
- Excellent responsive design support
- Small bundle size (purged CSS)
- Consistent design system
- Fast development

**Configuration:**
```js
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'emerald-deep': '#0F5132',
        'gold-royal': '#D4A017',
        'blue-serenity': '#1E6091',
        'white-pure': '#FAFAF7',
        'charcoal': '#1A1A1A',
        'red-alert': '#B8342D',
        'orange-sunrise': '#E07A3B',
        'mint-fresh': '#6FB897',
      },
      fontFamily: {
        'hind': ['Hind Siliguri', 'sans-serif'],
        'noto-bengali': ['Noto Sans Bengali', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'amiri': ['Amiri', 'serif'],
      },
    },
  },
  plugins: [],
}
```

---

### Animations
**Framer Motion**

**Why Framer Motion:**
- Declarative animations
- Excellent performance
- Scroll-triggered animations
- Gesture support
- Accessibility-aware (respects prefers-reduced-motion)

**Installation:**
```bash
npm install framer-motion
```

**Usage:**
```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
  {content}
</motion.div>
```

---

### Forms
**React Hook Form + Zod**

**Why React Hook Form:**
- Minimal re-renders
- Built-in validation
- TypeScript support
- Small bundle size

**Why Zod:**
- TypeScript-first schema validation
- Runtime type checking
- Excellent error messages

**Installation:**
```bash
npm install react-hook-form zod @hookform/resolvers
```

**Usage:**
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'নাম কমপক্ষে ২ অক্ষরের হতে হবে'),
  email: z.string().email('সঠিক ইমেইল দিন'),
  phone: z.string().regex(/^01[3-9]\d{8}$/, 'সঠিক বাংলাদেশি নম্বর দিন'),
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
});
```

---

### Icons
**Lucide React**

**Why Lucide:**
- Beautiful, consistent icons
- Tree-shakeable (only import what you use)
- Customizable size and color
- Excellent React support

**Installation:**
```bash
npm install lucide-react
```

**Usage:**
```tsx
import { Heart, Share2, Download } from 'lucide-react';

<Heart className="w-6 h-6 text-red-500" />
```

---

### Fonts
**next/font/google**

**Why next/font:**
- Automatic font optimization
- No layout shift
- Self-hosted fonts (privacy + performance)
- Subset support

**Usage:**
```tsx
import { Hind_Siliguri, Noto_Sans_Bengali, Playfair_Display, Inter, Amiri } from 'next/font/google';

const hindSiliguri = Hind_Siliguri({
  weight: ['400', '700'],
  subsets: ['bengali', 'latin'],
  display: 'swap',
  variable: '--font-hind',
});

const notoSansBengali = Noto_Sans_Bengali({
  weight: ['400', '500'],
  subsets: ['bengali'],
  display: 'swap',
  variable: '--font-noto-bengali',
});

// Apply in layout.tsx
<html className={`${hindSiliguri.variable} ${notoSansBengali.variable}`}>
```

---

## Deployment

### Platform
**Cloudflare Pages**

**Why Cloudflare Pages:**
- Free tier generous
- Global CDN (fast in Bangladesh)
- Automatic HTTPS
- Static site hosting
- GitHub integration
- Excellent performance
- DDoS protection

**Deployment:**
```bash
# Build command
npm run build

# Output directory
out/

# Environment variables (if needed)
NEXT_PUBLIC_SITE_URL=https://dhoya-mukto-poth.pages.dev
```

---

### Repository
**GitHub**

**Branch Strategy:**
- `main` — Production (auto-deploys to Cloudflare)
- `dev` — Development
- Feature branches as needed

---

## Analytics

### Cloudflare Web Analytics

**Why Cloudflare:**
- Privacy-friendly (no cookies)
- GDPR compliant
- Free
- Lightweight script
- Integrated with Cloudflare Pages

**Setup:**
```html
<!-- Add to layout.tsx -->
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "YOUR_TOKEN"}'></script>
```

---

### Microsoft Clarity

**Why Clarity:**
- Free session recordings
- Heatmaps
- Privacy-friendly
- Understand user behavior
- No impact on performance

**Setup:**
```html
<!-- Add to layout.tsx -->
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "YOUR_PROJECT_ID");
</script>
```

---

## Email Service

### Brevo API (formerly Sendinblue)

**Why Brevo:**
- Free tier: 300 emails/day
- Transactional email support
- Template system
- Bangladesh-friendly
- Good deliverability

**Usage (Future):**
```tsx
// lib/email.ts
import { SendSmtpEmail } from '@sendinblue/client';

export async function sendDownloadEmail(to: string, token: string) {
  // Implementation
}
```

**For MVP:**
- Manual email sending
- Store orders in simple JSON/CSV
- Automate later

---

## Project Structure

```
/
├── .kiro/
│   ├── specs/
│   │   ├── 00-overview.md
│   │   ├── 01-brand-guide.md
│   │   ├── 02-site-architecture.md
│   │   ├── 03a-homepage-hero-pain.md
│   │   ├── 03b-homepage-solution-story.md
│   │   ├── 03c-homepage-price-promise-islamic.md
│   │   ├── 03d-homepage-faq-final-other-pages.md
│   │   ├── 04-design-patterns.md
│   │   └── 05-tech-stack.md
│   ├── steering/
│   │   └── principles.md
│   └── hooks/
│       └── *.json
│
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx              # Homepage
│   │   ├── story/
│   │   │   └── page.tsx          # Founder's story
│   │   ├── faq/
│   │   │   └── page.tsx          # FAQ page
│   │   └── install-guide/
│   │       └── page.tsx          # Installation guide
│   │
│   ├── (commerce)/
│   │   ├── checkout/
│   │   │   └── page.tsx          # Checkout form
│   │   ├── gift/
│   │   │   └── page.tsx          # Gift purchase
│   │   ├── thank-you/
│   │   │   └── page.tsx          # Post-purchase
│   │   └── download/
│   │       └── [token]/
│   │           └── page.tsx      # Token-protected download
│   │
│   ├── (legal)/
│   │   └── policy/
│   │       └── [slug]/
│   │           └── page.tsx      # Dynamic policy pages
│   │
│   ├── contact/
│   │   └── page.tsx              # Contact page
│   │
│   ├── api/
│   │   └── order/
│   │       └── route.ts          # Order submission endpoint
│   │
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   └── not-found.tsx             # 404 page
│
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── PainMirror.tsx
│   │   ├── Reality.tsx
│   │   ├── NewHope.tsx
│   │   ├── ThreePillars.tsx
│   │   ├── LiveDemo.tsx
│   │   ├── FounderStory.tsx
│   │   ├── PriceComparison.tsx
│   │   ├── Promise.tsx
│   │   ├── IslamicInspiration.tsx
│   │   ├── FAQ.tsx
│   │   └── FinalCTA.tsx
│   │
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Accordion.tsx
│   │   └── ...
│   │
│   └── layout/
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── LanguageToggle.tsx
│       └── ShareBar.tsx
│
├── content/
│   ├── copy.bn.ts                # All Bengali copy
│   ├── copy.en.ts                # All English copy
│   └── faq.ts                    # FAQ data
│
├── lib/
│   ├── utils.ts                  # Utility functions
│   ├── cn.ts                     # Class name helper
│   └── constants.ts              # App constants
│
├── hooks/
│   ├── useLanguage.ts            # Language switching
│   ├── useReducedMotion.ts       # Accessibility
│   └── useScrollProgress.ts      # Scroll tracking
│
├── types/
│   └── index.ts                  # TypeScript types
│
├── public/
│   ├── fonts/                    # Font files (if self-hosting)
│   ├── images/
│   │   ├── hero-bg.webp
│   │   ├── sunrise.webp
│   │   └── ...
│   ├── screenshots/
│   │   ├── app1-home.png
│   │   ├── app2-home.png
│   │   └── app3-home.png
│   ├── demos/
│   │   ├── app1-demo.gif
│   │   ├── app2-demo.gif
│   │   └── app3-demo.gif
│   ├── apk/                      # APK files (for download)
│   │   ├── dhoya-mukto-steps.apk
│   │   ├── dhoya-mukto-369.apk
│   │   └── muhurto-breath.apk
│   └── favicon.ico
│
├── styles/
│   └── globals.css               # Additional global styles
│
├── .env.local                    # Environment variables
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## Environment Variables

```bash
# .env.local

# Site
NEXT_PUBLIC_SITE_URL=https://dhoya-mukto-poth.pages.dev
NEXT_PUBLIC_SITE_NAME=ধোঁয়া-মুক্ত পথ

# Contact
NEXT_PUBLIC_WHATSAPP_NUMBER=+8801XXXXXXXXX
NEXT_PUBLIC_SUPPORT_EMAIL=support@dhoya-mukto-poth.com

# Analytics
NEXT_PUBLIC_CLARITY_PROJECT_ID=your_clarity_id

# Email (Future)
BREVO_API_KEY=your_brevo_api_key
```

---

## Dependencies

### Production Dependencies

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "framer-motion": "^11.0.0",
    "react-hook-form": "^7.50.0",
    "zod": "^3.22.0",
    "@hookform/resolvers": "^3.3.0",
    "lucide-react": "^0.300.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  }
}
```

### Development Dependencies

```json
{
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/node": "^20.10.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "tailwindcss": "^4.0.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.56.0",
    "eslint-config-next": "^15.0.0"
  }
}
```

---

## Build & Development Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "format": "prettier --write ."
  }
}
```

---

## Constraints & Considerations

### Static Export Limitations

Because we're using `output: 'export'` for Cloudflare Pages:

**Cannot Use:**
- Server-side rendering (SSR)
- API routes (use Cloudflare Workers if needed)
- Dynamic routes with `getServerSideProps`
- Image optimization (must use `unoptimized: true`)
- Incremental Static Regeneration (ISR)

**Can Use:**
- Static generation
- Client-side data fetching
- Dynamic routes with `generateStaticParams`
- All React features
- Client-side routing

### Initial Order Processing

**MVP Approach:**
- Form submission sends data to Cloudflare Workers (or simple webhook)
- Data stored in Google Sheets / Airtable / Simple JSON
- Manual email sending for first 100 customers
- Automate later with Brevo API

**Future Automation:**
- Cloudflare Workers for order processing
- Brevo API for automated emails
- Token generation for download links
- Database for order tracking

---

## Performance Optimization

### Code Splitting

```tsx
// Lazy load heavy components
import dynamic from 'next/dynamic';

const LiveDemo = dynamic(() => import('@/components/sections/LiveDemo'), {
  loading: () => <div>Loading...</div>,
  ssr: false, // Client-side only
});
```

### Image Optimization

```tsx
import Image from 'next/image';

<Image
  src="/images/hero-bg.webp"
  alt="ধোঁয়া-মুক্ত পথ"
  width={1920}
  height={1080}
  priority // For above-the-fold images
  placeholder="blur"
  blurDataURL="data:image/..." // Low-quality placeholder
/>
```

### Font Optimization

```tsx
// Subset fonts to only needed characters
const hindSiliguri = Hind_Siliguri({
  weight: ['400', '700'],
  subsets: ['bengali', 'latin'],
  display: 'swap',
  preload: true,
});
```

### Bundle Analysis

```bash
# Install bundle analyzer
npm install @next/bundle-analyzer

# Analyze bundle
ANALYZE=true npm run build
```

---

## Testing Strategy

### Manual Testing (MVP)

- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile device testing (Android 8+)
- Slow connection testing (3G simulation)
- Accessibility testing (keyboard navigation, screen reader)

### Future Automated Testing

- **Unit tests:** Jest + React Testing Library
- **E2E tests:** Playwright
- **Visual regression:** Percy or Chromatic

---

## Security Considerations

### Content Security Policy

```tsx
// app/layout.tsx
export const metadata = {
  // ... other metadata
  other: {
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com https://www.clarity.ms; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://cloudflareinsights.com;",
  },
};
```

### Form Validation

- Client-side validation (Zod)
- Server-side validation (if using API routes)
- CSRF protection (if needed)
- Rate limiting (Cloudflare)

### Download Token Security

- Generate unique tokens for each order
- Time-limited tokens (expire after 30 days)
- One-time use or limited downloads
- Store tokens securely

---

## Monitoring & Logging

### Error Tracking (Future)

**Sentry:**
- Free tier available
- React error boundaries
- Performance monitoring
- Release tracking

### Uptime Monitoring

**UptimeRobot:**
- Free tier: 50 monitors
- 5-minute checks
- Email/SMS alerts

---

## Backup & Version Control

### Git Strategy

- Commit frequently with clear messages
- Use conventional commits
- Tag releases (v1.0.0, v1.1.0, etc.)
- Keep main branch deployable

### Content Backup

- Spec files in `.kiro/specs/`
- Copy files in `content/`
- Images in `public/`
- All version controlled in Git

---

## Launch Checklist

### Pre-Launch

- [ ] All pages built and tested
- [ ] Mobile responsive verified
- [ ] Accessibility audit passed
- [ ] Performance targets met
- [ ] All copy proofread (Bengali + English)
- [ ] Images optimized
- [ ] Forms tested
- [ ] Payment instructions clear
- [ ] Download links working
- [ ] Analytics installed
- [ ] Domain configured
- [ ] SSL certificate active

### Post-Launch

- [ ] Monitor analytics
- [ ] Check error logs
- [ ] Test order flow with real payment
- [ ] Verify email delivery
- [ ] Monitor page load times
- [ ] Check mobile experience
- [ ] Gather user feedback
- [ ] Iterate based on data

---

## Future Enhancements

### Phase 2

- Automated email system (Brevo)
- Order dashboard
- Testimonials section
- Blog for SEO
- Bengali SEO optimization

### Phase 3

- iOS app versions
- Affiliate program
- Community forum
- Success stories page
- Video testimonials

### Phase 4

- Multi-language support (Urdu, Hindi)
- International payment methods
- Subscription model for premium features
- Mobile app for website
