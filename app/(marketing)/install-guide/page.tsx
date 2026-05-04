import {
  WHATSAPP_NUMBER,
  SUPPORT_EMAIL,
  toIntlBdPhone,
} from "@/lib/config";

export const metadata = {
  title: "ইনস্টল গাইড | ধোঁয়া-মুক্ত পথ",
  description: "কীভাবে অ্যাপগুলো ইনস্টল করবেন তার বিস্তারিত গাইড।",
};

/**
 * Pre-filled WhatsApp deep link.
 *
 * - Uses the real support number from lib/config (WHATSAPP_NUMBER) so the
 *   value stays in sync with env / env-var overrides.
 * - toIntlBdPhone() converts "01977752579" → "8801977752579", the form
 *   wa.me requires.
 * - The pre-filled message starts with an Islamic greeting and names the
 *   context (install help) so the support agent can respond faster.
 */
const WA_SUPPORT_HREF = `https://wa.me/${toIntlBdPhone(
  WHATSAPP_NUMBER,
)}?text=${encodeURIComponent(
  "আসসালামু আলাইকুম। আমি অ্যাপ ইনস্টল করতে সাহায্য চাই।",
)}`;

/**
 * <ScreenshotComingSoon />
 *
 * Dignified replacement for the old <span>Placeholder: X Screenshot</span>
 * boxes that were leaking to production. Renders a dashed emerald card
 * with a contextual icon and a bilingual-safe "ছবি শীঘ্রই যোগ করা হবে"
 * label plus a short hint describing what the screenshot will show.
 *
 * Aspect ratios are injected by the caller to preserve the exact layout
 * the previous implementation used — no layout shift vs. the old boxes.
 */
function ScreenshotComingSoon({
  hint,
  aspect,
  children,
}: {
  hint: string;
  aspect: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={[
        aspect,
        "max-w-md mx-auto relative overflow-hidden",
        "rounded-xl border border-dashed border-emerald-deep/25",
        "bg-gradient-to-br from-emerald-deep/[0.04] via-white-pure to-gold-royal/[0.06]",
        "flex flex-col items-center justify-center gap-3 p-6 text-center",
      ].join(" ")}
      role="img"
      aria-label={`ছবি শীঘ্রই যোগ করা হবে — ${hint}`}
    >
      <div
        aria-hidden="true"
        className="w-12 h-12 rounded-full bg-emerald-deep/10 flex items-center justify-center text-emerald-deep"
      >
        {children}
      </div>
      <div>
        <p className="text-sm font-bold text-emerald-deep font-hind-siliguri">
          ছবি শীঘ্রই যোগ করা হবে
        </p>
        <p className="text-xs text-charcoal/60 font-noto-sans-bengali mt-1 max-w-[22ch]">
          {hint}
        </p>
      </div>
    </div>
  );
}

export default function InstallGuidePage() {
  return (
    <div className="bg-white-pure min-h-screen py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-charcoal mb-8 font-hind-siliguri text-center">
          কীভাবে ইনস্টল করবেন?
        </h1>

        <p className="text-xl text-charcoal/80 text-center mb-16 font-noto-sans-bengali">
          চিন্তা করবেন না — এটা খুবই সহজ! নিচের ধাপগুলো ফলো করুন।
        </p>

        <div className="space-y-12">
          {/* Step 1 */}
          <div className="bg-charcoal/5 p-8 rounded-2xl border border-charcoal/10">
            <h2 className="text-2xl font-bold text-charcoal mb-4 font-hind-siliguri">
              ধাপ ১: Unknown Sources চালু করুন
            </h2>
            <p className="text-charcoal/80 mb-6 font-noto-sans-bengali text-lg">
              যেহেতু অ্যাপটি প্লে স্টোরে নেই, তাই আপনার ফোনের সেটিংসে গিয়ে &quot;Install unknown apps&quot; বা &quot;Unknown sources&quot; চালু করতে হবে।
            </p>
            <ScreenshotComingSoon
              aspect="aspect-video"
              hint="Settings → Apps → Special access → Install unknown apps"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </ScreenshotComingSoon>
          </div>

          {/* Step 2 */}
          <div className="bg-charcoal/5 p-8 rounded-2xl border border-charcoal/10">
            <h2 className="text-2xl font-bold text-charcoal mb-4 font-hind-siliguri">
              ধাপ ২: অ্যাপগুলো ডাউনলোড করুন
            </h2>
            <p className="text-charcoal/80 mb-6 font-noto-sans-bengali text-lg">
              ইমেইলে দেওয়া লিংক থেকে ৩টি অ্যাপ ডাউনলোড করুন। ডাউনলোড শেষে ফাইলগুলোতে ক্লিক করুন।
            </p>
            <ScreenshotComingSoon
              aspect="aspect-video"
              hint="ইমেইলের ডাউনলোড লিংক → ৩টি APK ফাইল"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1" />
                <path d="M12 4v12" />
                <path d="M8 12l4 4 4-4" />
              </svg>
            </ScreenshotComingSoon>
          </div>

          {/* Step 3 */}
          <div className="bg-charcoal/5 p-8 rounded-2xl border border-charcoal/10">
            <h2 className="text-2xl font-bold text-charcoal mb-4 font-hind-siliguri">
              ধাপ ৩: ইনস্টল করুন
            </h2>
            <p className="text-charcoal/80 mb-6 font-noto-sans-bengali text-lg">
              &quot;Install&quot; বাটনে ক্লিক করুন। ইনস্টল হয়ে গেলে &quot;Open&quot; এ ক্লিক করে আপনার যাত্রা শুরু করুন!
            </p>
            <ScreenshotComingSoon
              aspect="aspect-[4/3]"
              hint="Install → Open → যাত্রা শুরু"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </ScreenshotComingSoon>
          </div>
        </div>

        <div className="mt-16 text-center bg-emerald-deep/10 p-12 rounded-2xl border-2 border-emerald-deep/20">
          <h3 className="text-2xl font-bold text-charcoal mb-6 font-hind-siliguri">
            এখনও সমস্যা হচ্ছে?
          </h3>
          <p className="text-lg text-charcoal/80 mb-8 font-noto-sans-bengali">
            কোনো চিন্তা নেই, আমরা সাহায্য করতে প্রস্তুত!
          </p>
          <a
            href={WA_SUPPORT_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white-pure font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-[#20BA5A] transition-colors font-noto-sans-bengali text-lg"
            aria-label="WhatsApp-এ সাহায্য চান — পূর্ব-পূরণকৃত মেসেজসহ"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            WhatsApp এ মেসেজ দিন
          </a>
          <p className="mt-5 text-sm text-charcoal/60 font-noto-sans-bengali">
            অথবা ইমেইল করুন:{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-emerald-deep font-semibold hover:underline break-all"
            >
              {SUPPORT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
