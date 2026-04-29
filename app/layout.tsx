import type { Metadata } from "next";
import { Hind_Siliguri, Noto_Sans_Bengali, Playfair_Display, Inter, Amiri } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Bengali Headlines
const hindSiliguri = Hind_Siliguri({
  weight: ['700'],
  subsets: ['bengali', 'latin'],
  display: 'swap',
  variable: '--font-hind-siliguri',
});

// Bengali Body
const notoSansBengali = Noto_Sans_Bengali({
  weight: ['400', '500'],
  subsets: ['bengali'],
  display: 'swap',
  variable: '--font-noto-bengali',
});

// English Headlines
const playfairDisplay = Playfair_Display({
  weight: ['700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

// English Body
const inter = Inter({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Arabic (Hadith/Quran)
const amiri = Amiri({
  weight: ['400'],
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-amiri',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://smoke-free-path.pages.dev'),
  title: "ধোঁয়া-মুক্ত পথ | সম্পূর্ণ যাত্রা",
  description: "তিনটি অ্যাপ। ৪১ দিনের যাত্রা। সারাজীবনের স্বাধীনতা। টেসলার ৩৬৯ মেথড, আচরণগত বিজ্ঞান, এবং আধ্যাত্মিক শক্তি — একসাথে। বাংলায়। শুধু আপনার জন্য।",
  keywords: ["ধূমপান ছাড়া", "সিগারেট ছাড়া", "তামাক মুক্তি", "বাংলাদেশ", "ইসলামিক", "আচরণগত বিজ্ঞান", "৩৬৯ মেথড"],
  authors: [{ name: "তানভির হাসান" }],
  openGraph: {
    title: "ধোঁয়া-মুক্ত পথ | সম্পূর্ণ যাত্রা",
    description: "তিনটি অ্যাপ। ৪১ দিনের যাত্রা। সারাজীবনের স্বাধীনতা।",
    type: "website",
    locale: "bn_BD",
    url: "/",
    siteName: "ধোঁয়া-মুক্ত পথ",
    images: [
      {
        url: "/og/hero-og.png",
        width: 1200,
        height: 630,
        alt: "ধোঁয়া-মুক্ত পথ - তিনটি অ্যাপ। ৪১ দিনের যাত্রা। সারাজীবনের স্বাধীনতা।",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ধোঁয়া-মুক্ত পথ | সম্পূর্ণ যাত্রা",
    description: "তিনটি অ্যাপ। ৪১ দিনের যাত্রা। সারাজীবনের স্বাধীনতা।",
    images: ["/og/hero-og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data for Organization and Product
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://smoke-free-path.pages.dev'}/#organization`,
        "name": "ধোঁয়া-মুক্ত পথ",
        "url": process.env.NEXT_PUBLIC_SITE_URL || 'https://smoke-free-path.pages.dev',
        "logo": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://smoke-free-path.pages.dev'}/og/hero-og.png`,
        "description": "তিনটি অ্যাপ। ৪১ দিনের যাত্রা। সারাজীবনের স্বাধীনতা।",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
          "contactType": "customer support",
          "availableLanguage": ["bn", "en"]
        }
      },
      {
        "@type": "Product",
        "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://smoke-free-path.pages.dev'}/#product`,
        "name": "ধোঁয়া-মুক্ত পথ - সম্পূর্ণ যাত্রা",
        "description": "তিনটি অ্যাপ। ৪১ দিনের যাত্রা। সারাজীবনের স্বাধীনতা। টেসলার ৩৬৯ মেথড, আচরণগত বিজ্ঞান, এবং আধ্যাত্মিক শক্তি — একসাথে।",
        "image": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://smoke-free-path.pages.dev'}/og/hero-og.png`,
        "offers": {
          "@type": "Offer",
          "price": process.env.NEXT_PUBLIC_BUNDLE_PRICE || "369",
          "priceCurrency": "BDT",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": "2027-12-31",
          "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://smoke-free-path.pages.dev'}/checkout`
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "reviewCount": "1"
        }
      }
    ]
  };

  return (
    <html
      lang="bn"
      className={`${hindSiliguri.variable} ${notoSansBengali.variable} ${playfairDisplay.variable} ${inter.variable} ${amiri.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN && (
          <script
            defer
            src='https://static.cloudflareinsights.com/beacon.min.js'
            data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN}"}`}
          />
        )}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
              `,
            }}
          />
        )}
      </head>
      <body className="min-h-full flex flex-col font-noto-bengali">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
