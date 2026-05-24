import type { Metadata } from "next";
import Link from "next/link";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { faqItems } from "@/content";

export const metadata: Metadata = {
  title: "সাধারণ জিজ্ঞাসা (FAQ) | ধোঁয়া-মুক্ত পথ",
  description:
    "অ্যাপ ইনস্টল, পেমেন্ট, প্রাইভেসি, ৪১-দিন প্রতিশ্রুতি, iPhone সাপোর্ট — সবচেয়ে গুরুত্বপূর্ণ প্রশ্নগুলোর উত্তর এক জায়গায়।",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "সাধারণ জিজ্ঞাসা | ধোঁয়া-মুক্ত পথ",
    description:
      "অ্যাপ, পেমেন্ট, ৪১-দিন প্রতিশ্রুতি — সব প্রশ্নের উত্তর।",
    url: "/faq",
    type: "website",
    locale: "bn_BD",
  },
};

// Category labels in Bengali, displayed in the order users most likely care about.
const CATEGORY_ORDER = [
  "pricing",
  "delivery",
  "technical",
  "privacy",
  "refund",
  "gift",
  "trust",
  "general",
] as const;

const CATEGORY_META: Record<
  (typeof CATEGORY_ORDER)[number],
  { label: string; emoji: string }
> = {
  pricing: { label: "মূল্য ও পেমেন্ট", emoji: "💰" },
  delivery: { label: "ডেলিভারি", emoji: "📦" },
  technical: { label: "টেকনিক্যাল সহায়তা", emoji: "📱" },
  privacy: { label: "গোপনীয়তা", emoji: "🔒" },
  refund: { label: "৪১-দিন প্রতিশ্রুতি", emoji: "⚖️" },
  gift: { label: "উপহার", emoji: "🎁" },
  trust: { label: "বিশ্বাস ও পরিচয়", emoji: "🤝" },
  general: { label: "সাধারণ", emoji: "💬" },
};

export default function FAQPage() {
  // Group FAQ items by category, preserving original order within each group.
  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    meta: CATEGORY_META[cat],
    items: faqItems.filter((item) => item.category === cat),
  })).filter((g) => g.items.length > 0);

  // FAQPage structured data so Google can render rich FAQ snippets.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Security: Sanitize JSON string to prevent XSS execution vulnerabilities from unescaped HTML characters
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
      />

      <div className="bg-[#f4f1ea] min-h-screen pt-24 md:pt-28 pb-20 px-4 md:px-8">
        {/* Page hero */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-emerald-deep font-semibold mb-3 font-noto-bengali">
            সাহায্য কেন্দ্র
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6 font-hind-siliguri">
            সাধারণ জিজ্ঞাসা
          </h1>
          <p className="text-lg md:text-xl text-charcoal/70 font-noto-bengali leading-relaxed max-w-2xl mx-auto">
            অ্যাপ, পেমেন্ট, প্রাইভেসি — সবচেয়ে বেশি জিজ্ঞাসিত প্রশ্নগুলোর স্পষ্ট, সরল উত্তর।
            আপনার প্রশ্ন না পেলে নিশ্চিন্তে আমাদের সাথে যোগাযোগ করুন।
          </p>
        </div>

        {/* Category quick-jump */}
        <nav
          aria-label="বিভাগ
          নির্বাচন"
          className="max-w-4xl mx-auto mb-12 flex flex-wrap justify-center gap-2"
        >
          {grouped.map((g) => (
            <a
              key={g.category}
              href={`#${g.category}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white-pure border border-charcoal/10 text-sm font-medium text-charcoal/80 hover:border-emerald-deep hover:text-emerald-deep transition-colors font-noto-bengali"
            >
              <span aria-hidden>{g.meta.emoji}</span>
              {g.meta.label}
              <span className="text-charcoal/40">({g.items.length})</span>
            </a>
          ))}
        </nav>

        {/* Grouped sections */}
        <div className="max-w-3xl mx-auto space-y-16">
          {grouped.map((g) => (
            <section
              key={g.category}
              id={g.category}
              aria-labelledby={`${g.category}-heading`}
              className="scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-6">
                <span
                  aria-hidden
                  className="text-3xl"
                >
                  {g.meta.emoji}
                </span>
                <h2
                  id={`${g.category}-heading`}
                  className="text-2xl md:text-3xl font-bold text-charcoal font-hind-siliguri"
                >
                  {g.meta.label}
                </h2>
              </div>
              <FAQAccordion items={g.items} />
            </section>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="max-w-3xl mx-auto mt-20">
          <div className="bg-emerald-deep text-white-pure rounded-2xl p-8 md:p-12 text-center shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-hind-siliguri">
              আপনার প্রশ্নের উত্তর খুঁজে পাননি?
            </h2>
            <p className="text-white-pure/80 mb-6 font-noto-bengali text-lg">
              নিশ্চিন্তে আমাদের
              সাথে WhatsApp বা ইমেইলে যোগাযোগ করুন। আমরা সাধারণত ২৪ ঘণ্টার মধ্যে উত্তর দিই।
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gold-royal text-charcoal font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-gold-royal/40 hover:-translate-y-1 transition-all duration-300 font-noto-bengali"
            >
              যোগাযোগ করুন
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
