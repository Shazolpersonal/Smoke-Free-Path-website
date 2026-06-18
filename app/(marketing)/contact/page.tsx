import { Mail, MessageCircle, Package } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "যোগাযোগ | ধোঁয়া-মুক্ত পথ",
  description:
    "যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন। WhatsApp-এ দ্রুত উত্তর পাবেন, এইমেইল-এ বিস্তারিত কথা বলতে পারবেন।",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "যোগাযোগ | ধোঁয়া-মুক্ত পথ",
    description: "যেকোনো প্রশ্নে আমাদের WhatsApp বা ইমেইল করুন।",
  },
};

// বাংলাদেশি 01XXXXXXXXX → international format 880XXXXXXXXXX
// "01977752579" → "8801977752579"
function toIntlBdPhone(n: string | undefined): string {
  if (!n) return "";
  const digits = n.replace(/\D/g, "");
  if (digits.startsWith("880")) return digits;
  if (digits.startsWith("0")) return "880" + digits.slice(1);
  return digits;
}

export default function ContactPage() {
  // Fallback values mirror what's currently hard-coded in the Footer so the
  // site stays usable even if an env var is accidentally unset.
  const whatsapp =
    toIntlBdPhone(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) || "8801977752579";
  const supportEmail =
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "niyyah369app@gmail.com";
  const orderEmail =
    process.env.NEXT_PUBLIC_ORDER_EMAIL ||
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL ||
    "niyyah369app@gmail.com";

  // Pre-filled WhatsApp greeting in Bengali (URL-encoded)
  const whatsappGreeting = encodeURIComponent(
    "আসসালামু আলাইকুম। আমার একটা প্রশ্ন রয়েছে ধোঁয়া-মুক্ত পথ অ্যাপ সম্পর্কে।"
  );
  const waHref = `https://wa.me/${whatsapp}?text=${whatsappGreeting}`;

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "যোগাযোগ | ধোঁয়া-মুক্ত পথ",
    contactOption: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: `+${whatsapp}`,
        email: supportEmail,
        availableLanguage: ["bn", "en"],
      },
      {
        "@type": "ContactPoint",
        contactType: "orders",
        email: orderEmail,
      },
    ],
  };

  return (
    <div className="bg-[#f4f1ea] min-h-screen py-24 px-4 md:px-8">
      {/* 🛡️ Sentinel: Sanitize JSON stringification to prevent XSS vulnerability */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson).replace(/</g, '\\u003c') }}
      />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6 font-hind-siliguri">
            যোগাযোগ
          </h1>
          <p className="text-xl text-charcoal/80 font-noto-sans-bengali">
            আমরা সাহায্য করতে এখানে আছি। যেকোনো প্রশ্ন বা সমস্যায় আমাদের জানান।
            <br />
            সাধারণত ২৪ ঘণ্টার মধ্যে আমরা উত্তর দিয়ে থাকি।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* WhatsApp Card */}
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white-pure p-8 rounded-2xl border-2 border-[#25D366]/20 hover:border-[#25D366] transition-colors group text-center block"
            aria-label={`WhatsApp: +${whatsapp}`}
          >
            <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-8 h-8 text-[#25D366]" />
            </div>
            <h2 className="text-2xl font-bold text-charcoal mb-2 font-hind-siliguri">
              WhatsApp
            </h2>
            <p className="text-charcoal/70 font-noto-sans-bengali mb-2">
              দ্রুততম উত্তরের জন্য
            </p>
            <p className="text-sm text-charcoal/60 font-mono tracking-tight">
              +{whatsapp}
            </p>
          </a>

          {/* Email Card */}
          <a
            href={`mailto:${supportEmail}`}
            className="bg-white-pure p-8 rounded-2xl border-2 border-emerald-deep/20 hover:border-emerald-deep transition-colors group text-center block"
            aria-label={`ইমেইল: ${supportEmail}`}
          >
            <div className="w-16 h-16 bg-emerald-deep/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Mail className="w-8 h-8 text-emerald-deep" />
            </div>
            <h2 className="text-2xl font-bold text-charcoal mb-2 font-hind-siliguri">
              ইমেইল
            </h2>
            <p className="text-charcoal/70 font-noto-sans-bengali mb-2">
              বিস্তারিত কথা বলতে
            </p>
            <p className="text-sm text-charcoal/60 break-all">{supportEmail}</p>
          </a>

          {/* Order-tracking card */}
          <div className="bg-white-pure p-8 rounded-2xl border-2 border-gold-royal/20 text-center">
            <div className="w-16 h-16 bg-gold-royal/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-8 h-8 text-gold-royal" />
            </div>
            <h2 className="text-2xl font-bold text-charcoal mb-2 font-hind-siliguri">
              অর্ডার ট্র্যাকিং
            </h2>
            <p className="text-charcoal/70 font-noto-sans-bengali mb-2">
              ডাউনলোড লিংক ০-৬ ঘণ্টার মধ্যে আপনার ইমেইলে আসবে। না পেলে WhatsApp করুন।
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-charcoal/60 font-noto-sans-bengali">
            সাধারণ প্রশ্নের উত্তরের জন্য আগে{" "}
            <Link
              href="/faq"
              className="text-emerald-deep font-bold hover:underline"
            >
              FAQ পেজ
            </Link>{" "}
            দেখে নিতে পারেন।
          </p>
        </div>
      </div>
    </div>
  );
}
