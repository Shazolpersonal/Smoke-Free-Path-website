import Link from "next/link";

export const metadata = {
  title: "ডাউনলোড | ধোঁয়া-মুক্ত পথ",
  description:
    "অর্ডার সফল হলে আপনার ইমেইলে ডাউনলোড লিংক পাঠানো হবে ৬ ঘণ্টার মধ্যে।",
  robots: {
    index: false,
    follow: false,
  },
};

// Token-gated downloads are currently manual: the operator receives an
// order email (via Cloudflare Worker → Resend), verifies the bKash/Nagad
// transaction, and emails the customer a Google Drive APK bundle link.
//
// This route exists only so incoming magic-link emails that use
// `/download/<token>` don't 404. It renders a single "come back later"
// landing screen with clear next steps. The `token` param is not
// validated — validation happens out-of-band by the operator.
export function generateStaticParams() {
  return [{ token: "inbox" }];
}

export default function DownloadPage() {
  return (
    <div className="bg-[#f4f1ea] min-h-screen py-24 px-4 md:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white-pure rounded-3xl shadow-xl border border-gold-royal/20 overflow-hidden">
        {/* Header band */}
        <div className="bg-gradient-to-br from-emerald-deep to-emerald-deep/90 text-white-pure p-10 md:p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-white-pure/10 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 font-hind-siliguri">
            আপনার ইমেইল চেক করুন
          </h1>
          <p className="text-lg text-white-pure/85 font-noto-sans-bengali">
            ডাউনলোড লিংক আপনার ইমেইল-ইনবক্সে পাঠানো হয়েছে।
          </p>
        </div>

        {/* Body */}
        <div className="p-8 md:p-12 space-y-8">
          <div>
            <h2 className="text-xl font-bold text-charcoal mb-4 font-hind-siliguri">
              কীভাবে আপনার অ্যাপগুলো পাবেন?
            </h2>
            <ol className="space-y-4 font-noto-sans-bengali text-charcoal/90">
              <li className="flex gap-4">
                <span className="flex-none w-8 h-8 rounded-full bg-emerald-deep/10 text-emerald-deep font-bold flex items-center justify-center text-sm">
                  ১
                </span>
                <span>
                  অর্ডার সফলভাবে submit হওয়ার পর আপনি{" "}
                  <strong>একটি confirmation</strong> পাবেন।
                </span>
              </li>
              <li className="flex gap-4">
                <span className="flex-none w-8 h-8 rounded-full bg-emerald-deep/10 text-emerald-deep font-bold flex items-center justify-center text-sm">
                  ২
                </span>
                <span>
                  আমরা আপনার bKash/Nagad transaction যাচাই করি (সাধারণত{" "}
                  <strong>৬ ঘণ্টার মধ্যে</strong>)।
                </span>
              </li>
              <li className="flex gap-4">
                <span className="flex-none w-8 h-8 rounded-full bg-emerald-deep/10 text-emerald-deep font-bold flex items-center justify-center text-sm">
                  ৩
                </span>
                <span>
                  যাচাই সফল হলে, আপনার ইমেইলে তিনটি APK ফাইলের{" "}
                  <strong>Google Drive ডাউনলোড লিংক</strong> পাঠাব।
                </span>
              </li>
              <li className="flex gap-4">
                <span className="flex-none w-8 h-8 rounded-full bg-gold-royal/15 text-gold-royal font-bold flex items-center justify-center text-sm">
                  ৪
                </span>
                <span>
                  APK-গুলো ডাউনলোড করে আপনার ফোনে ইনস্টল করুন।{" "}
                  <Link
                    href="/install-guide"
                    className="text-emerald-deep font-bold underline hover:text-gold-royal"
                  >
                    ইনস্টল গাইড দেখুন →
                  </Link>
                </span>
              </li>
            </ol>
          </div>

          <div className="rounded-2xl bg-gold-royal/10 border border-gold-royal/30 p-6">
            <h3 className="font-bold text-charcoal mb-2 font-hind-siliguri">
              ⏰ ৬ ঘণ্টা পেরিয়ে গেছে? ইমেইল পাননি?
            </h3>
            <ul className="text-sm text-charcoal/80 space-y-1.5 font-noto-sans-bengali">
              <li>
                ১. আপনার <strong>spam / promotions ফোল্ডার</strong> চেক করুন
              </li>
              <li>
                ২. সঠিক ইমেইল ঠিকানা দিয়েছেন কিনা verify করুন
              </li>
              <li>
                ৩. এখনও না পেলে আমাদের{" "}
                <Link href="/contact" className="text-emerald-deep font-bold underline">
                  WhatsApp / ইমেইল
                </Link>{" "}
                করুন — দ্রুত সাহায্য করব
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link
              href="/"
              className="flex-1 text-center rounded-xl border-2 border-charcoal/15 px-6 py-3 font-bold text-charcoal hover:border-emerald-deep hover:text-emerald-deep transition-colors font-noto-sans-bengali"
            >
              হোমে ফিরে যান
            </Link>
            <Link
              href="/contact"
              className="flex-1 text-center rounded-xl bg-emerald-deep px-6 py-3 font-bold text-white-pure hover:shadow-lg hover:shadow-emerald-deep/30 hover:-translate-y-0.5 transition-all font-noto-sans-bengali"
            >
              সাহায্য দরকার?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
