# ধোঁয়া-মুক্ত পথ | Smoke-Free Path

**বিসমিল্লাহির রহমানির রহিম**

A mission-driven landing website for a bundle of 3 mobile apps designed to help people quit smoking through science, spirituality, and peace.

## 📖 About

This is NOT a typical commercial project. This is a **humanitarian effort** to save lives from tobacco addiction, built in memory of Abdul Karim.

**Mission:** প্রতিটি ধূমপায়ীর হাতে ধোঁয়া-মুক্ত জীবনের চাবি পৌঁছে দেওয়া — বিজ্ঞান, আধ্যাত্মিকতা ও প্রশান্তির সমন্বয়ে।

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React
- **Deployment:** Cloudflare Pages (static export)

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ and npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd dhoya-mukto-poth

# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Edit .env.local with your values
```

### Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_BKASH_NUMBER=01977752579
NEXT_PUBLIC_NAGAD_NUMBER=01977752579
NEXT_PUBLIC_WHATSAPP_NUMBER=01977752579
NEXT_PUBLIC_SUPPORT_EMAIL=support@yourdomain.com
NEXT_PUBLIC_BUNDLE_PRICE=369
NEXT_PUBLIC_ORIGINAL_PRICE=963
NEXT_PUBLIC_CUSTOMER_LIMIT=963

# Optional Analytics
NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN=your_token_here
NEXT_PUBLIC_CLARITY_ID=your_clarity_id_here
```

### Development

```bash
# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create static export
npm run build

# Output will be in the 'out/' directory (2.9MB)
```

## 🌍 Deployment

### Cloudflare Pages (Recommended)

This site is optimized for Cloudflare Pages with automatic GitHub deployments.

#### Setup Steps:

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Configure GitHub Secrets:**
   Go to your repository → Settings → Secrets and variables → Actions
   
   Add these secrets:
   - `CLOUDFLARE_API_TOKEN` - Get from Cloudflare Dashboard → My Profile → API Tokens
   - `CLOUDFLARE_ACCOUNT_ID` - Get from Cloudflare Dashboard → Workers & Pages
   - `NEXT_PUBLIC_SITE_URL` - Your production URL
   - `NEXT_PUBLIC_BKASH_NUMBER`
   - `NEXT_PUBLIC_NAGAD_NUMBER`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
   - `NEXT_PUBLIC_SUPPORT_EMAIL`
   - `NEXT_PUBLIC_BUNDLE_PRICE`
   - `NEXT_PUBLIC_ORIGINAL_PRICE`
   - `NEXT_PUBLIC_CUSTOMER_LIMIT`
   - `NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN` (optional)
   - `NEXT_PUBLIC_CLARITY_ID` (optional)

3. **Create Cloudflare Pages Project:**
   - Go to Cloudflare Dashboard → Workers & Pages → Create application
   - Connect your GitHub repository
   - Project name: `dhoya-mukto-poth`
   - Build command: `npm run build`
   - Build output directory: `out`
   - Environment variables: Add all NEXT_PUBLIC_* variables

4. **Automatic Deployments:**
   - Every push to `main` branch triggers automatic deployment via GitHub Actions
   - The workflow is defined in `.github/workflows/deploy.yml`

#### Manual Deployment:

```bash
# Build the project
npm run build

# Install Wrangler CLI (if not installed)
npm install -g wrangler

# Deploy to Cloudflare Pages
wrangler pages deploy out --project-name=dhoya-mukto-poth
```

### Performance Optimizations

The site includes:
- Static export for maximum performance
- Optimized images (SVG placeholders)
- Lazy-loaded sections below the fold
- Aggressive caching headers (`public/_headers`)
- Font optimization with `display: swap`
- Minimal JavaScript bundle

### Analytics Setup

#### Cloudflare Web Analytics:
1. Go to Cloudflare Dashboard → Analytics → Web Analytics
2. Add your site
3. Copy the token
4. Add to `NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN`

#### Microsoft Clarity:
1. Go to [clarity.microsoft.com](https://clarity.microsoft.com)
2. Create a project
3. Copy the Project ID
4. Add to `NEXT_PUBLIC_CLARITY_ID`

## 📱 How to Update APK Files

When you have new versions of the mobile apps:

1. **Upload APK files** to a secure hosting service (e.g., Cloudflare R2, AWS S3)
2. **Generate download tokens** using your order system
3. **Update download links** in the email templates
4. **Test the download flow** from `/download/[token]` page

## 🧪 Testing Checklist

Before deployment, verify:

- [ ] All pages load correctly
- [ ] Forms submit properly (checkout, gift, contact)
- [ ] All links work (internal and external)
- [ ] Images load and have proper alt text
- [ ] Bengali text renders without missing glyphs
- [ ] Mobile responsive on various screen sizes
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility (test with NVDA/ChromeVox)
- [ ] Performance: Lighthouse score ≥ 90
- [ ] Accessibility: Lighthouse score ≥ 95
- [ ] SEO: Lighthouse score ≥ 95

## 🔍 SEO Features

- ✅ Open Graph image (1200x630)
- ✅ Bengali structured data (Organization, Product schema)
- ✅ Dynamic sitemap.xml
- ✅ robots.txt
- ✅ Bengali meta descriptions for all pages
- ✅ Semantic HTML
- ✅ Proper heading hierarchy

## 📞 Support & Contact

For questions or issues:
- WhatsApp: Check `NEXT_PUBLIC_WHATSAPP_NUMBER` in env
- Email: Check `NEXT_PUBLIC_SUPPORT_EMAIL` in env

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── (marketing)/       # Public pages
│   ├── (commerce)/        # Transaction pages
│   ├── (legal)/           # Policy pages
│   └── layout.tsx         # Root layout
├── components/
│   ├── sections/          # Homepage sections
│   ├── ui/                # Reusable UI components
│   └── layout/            # Header, Footer, etc.
├── content/               # Bengali + English copy
├── lib/                   # Utility functions
├── public/                # Static assets
└── .kiro/
    ├── specs/             # Project specifications
    └── steering/          # Ethical principles
```

## 🎨 Brand Colors

- **Emerald Deep** (#0F5132) - Primary brand, trust, Islamic
- **Gold Royal** (#D4A017) - CTA, achievement, reward
- **Blue Serenity** (#1E6091) - Calm, breathing sections
- **White Pure** (#FAFAF7) - Clean backgrounds
- **Charcoal** (#1A1A1A) - Body text

## 🕌 Steering Principles

Every decision in this project follows these principles:

1. **This is Not a Commercial Website** - Mission to save lives
2. **The Visitor is Family** - Treat with dignity and respect
3. **Dignity Over Conversion** - No manipulative tactics
4. **Silence is Sacred** - Let whitespace breathe
5. **The Founder's Story is Sacred** - No CTAs in emotional sections
6. **Islamic Content is Holy** - Treat with reverence
7. **Accessibility is Not Optional** - Works for everyone
8. **The 41-Day Promise is Binding** - Our word is our bond
9. **Performance is Respect** - Optimize for slow connections
10. **When in Doubt — Ask** - Don't guess on ethical content

Read full principles in `.kiro/steering/principles.md`

## 📝 Development Guidelines

- **Mobile-first** - Bangladesh traffic is primarily mobile
- **Bengali primary** - English is secondary
- **Offline-first** - Must work without internet
- **Performance** - Target < 2MB page size, < 2.5s LCP
- **Accessibility** - WCAG AA minimum

## 🌍 Deployment

This site is configured for static export to Cloudflare Pages:

```bash
npm run build
# Deploy the 'out/' directory to Cloudflare Pages
```

See detailed deployment instructions above.

## 📄 License

This project is dedicated to the memory of Abdul Karim and all those affected by tobacco addiction.

---

**© 2024 ধোঁয়া-মুক্ত পথ | আবদুল করিমের স্মৃতিতে নিবেদিত**
