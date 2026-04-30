import { ShareBar } from "@/components/ui/ShareBar";
import { SITE_URL } from "@/lib/config";

export const metadata = {
  title: "ধন্যবাদ | ধোঁয়া-মুক্ত পথ",
  description: "আপনার পেমেন্ট সফল হয়েছে।",
};

export default function ThankYouPage() {
  return (
    <div className="bg-[#f4f1ea] min-h-screen py-24 px-4 md:px-8 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white-pure rounded-2xl p-8 md:p-12 shadow-xl border border-gold-royal/20">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-emerald-deep/10 text-emerald-deep rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-charcoal mb-4 font-hind-siliguri">
            ধন্যবাদ!
          </h1>
          <p className="text-xl text-charcoal/80 font-noto-sans-bengali">
            আপনার যাত্রা শুরু হয়ে গেছে।
          </p>
        </div>

        <div className="bg-charcoal/5 p-8 rounded-xl mb-12">
          <h2 className="text-2xl font-bold text-charcoal mb-6 font-hind-siliguri border-b border-charcoal/10 pb-4">
            পরবর্তী ধাপ:
          </h2>
          <ul className="space-y-4 font-noto-sans-bengali text-lg text-charcoal/90">
            <li className="flex items-center gap-3">
              <span className="text-emerald-deep">✅</span> পেমেন্ট গৃহীত হয়েছে
            </li>
            <li className="flex items-center gap-3">
              <span className="text-gold-royal">⏳</span> যাচাইকরণ চলছে (৬ ঘণ্টার মধ্যে)
            </li>
            <li className="flex items-center gap-3">
              <span>📧</span> ইমেইলে ডাউনলোড লিংক পাঠানো হবে
            </li>
            <li className="flex items-center gap-3">
              <span>📱</span> ইনস্টল করুন এবং যাত্রা শুরু করুন
            </li>
          </ul>
        </div>

        <div className="text-center border-t border-charcoal/10 pt-8">
          <h3 className="text-xl font-bold text-charcoal mb-6 font-hind-siliguri">
            বন্ধুদের জানিয়ে দিন
          </h3>
          <div className="flex justify-center mb-8">
            <ShareBar
              url={SITE_URL}
              message="আমি একটি অসাধারণ জিনিস খুঁজে পেয়েছি যা ধূমপান ছাড়তে সাহায্য করতে পারে। যদি আপনি বা আপনার পরিচিত কেউ ধূমপায়ী হন, এটি দেখুন:"
            />
          </div>
          <div className="text-charcoal/60 text-sm font-noto-sans-bengali space-y-2">
            <p>
              সাহায্য দরকার?{" "}
              <a href="/contact" className="text-emerald-deep hover:underline">
                WhatsApp এ মেসেজ দিন
              </a>
            </p>
            <p>ইমেইল পাননি? স্প্যাম ফোল্ডার চেক করুন</p>
          </div>
        </div>
      </div>
    </div>
  );
}
