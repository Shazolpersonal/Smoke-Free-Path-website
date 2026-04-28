export const metadata = {
  title: "ডাউনলোড | ধোঁয়া-মুক্ত পথ",
  description: "আপনার অ্যাপগুলো ডাউনলোড করুন",
};

// Required for output: export on dynamic routes
export function generateStaticParams() {
  return [
    { token: 'DEMO-TOKEN-123' },
  ];
}

export default function DownloadPage({ params }: { params: { token: string } }) {
  // In production with Cloudflare Workers, we would validate the token here via an API call
  
  return (
    <div className="bg-white-pure min-h-screen py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6 font-hind-siliguri">
            স্বাগতম! আপনার তিনটি অ্যাপ ডাউনলোড করুন:
          </h1>
          <p className="text-xl text-charcoal/80 font-noto-sans-bengali">
            নিচের বাটনগুলোতে ক্লিক করে অ্যাপগুলো ফোনে সেভ করুন।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* App 1 */}
          <div className="bg-charcoal/5 p-8 rounded-2xl border border-charcoal/10 text-center hover:-translate-y-1 transition-transform">
            <div className="text-4xl mb-4">🧘</div>
            <h2 className="text-xl font-bold text-charcoal mb-2 font-hind-siliguri">মুহূর্ত ব্রেথ</h2>
            <p className="text-sm text-charcoal/60 mb-6">File Size: 12MB</p>
            <a href="#" className="inline-block w-full bg-emerald-deep text-white-pure font-bold py-3 rounded-xl hover:bg-emerald-deep/90 transition-colors">
              ডাউনলোড করুন
            </a>
          </div>

          {/* App 2 */}
          <div className="bg-charcoal/5 p-8 rounded-2xl border border-charcoal/10 text-center hover:-translate-y-1 transition-transform">
            <div className="text-4xl mb-4">🛣️</div>
            <h2 className="text-xl font-bold text-charcoal mb-2 font-hind-siliguri">পদক্ষেপ</h2>
            <p className="text-sm text-charcoal/60 mb-6">File Size: 15MB</p>
            <a href="#" className="inline-block w-full bg-emerald-deep text-white-pure font-bold py-3 rounded-xl hover:bg-emerald-deep/90 transition-colors">
              ডাউনলোড করুন
            </a>
          </div>

          {/* App 3 */}
          <div className="bg-charcoal/5 p-8 rounded-2xl border border-charcoal/10 text-center hover:-translate-y-1 transition-transform">
            <div className="text-4xl mb-4">✨</div>
            <h2 className="text-xl font-bold text-charcoal mb-2 font-hind-siliguri">৩৬৯ মেথড</h2>
            <p className="text-sm text-charcoal/60 mb-6">File Size: 8MB</p>
            <a href="#" className="inline-block w-full bg-gold-royal text-charcoal font-bold py-3 rounded-xl hover:bg-gold-royal/90 transition-colors">
              ডাউনলোড করুন
            </a>
          </div>
        </div>

        <div className="bg-emerald-deep/5 p-8 md:p-12 rounded-3xl border border-emerald-deep/20 mb-16">
          <h3 className="text-2xl font-bold text-charcoal mb-6 font-hind-siliguri text-center">
            কীভাবে ইনস্টল করবেন?
          </h3>
          <ol className="max-w-xl mx-auto space-y-4 font-noto-sans-bengali text-lg text-charcoal/90">
            <li>১. ফাইলগুলো ডাউনলোড করুন।</li>
            <li>২. ফোনে <strong>Install unknown apps</strong> চালু করুন।</li>
            <li>৩. ফাইলগুলোতে ক্লিক করে ইনস্টল করুন।</li>
          </ol>
          <div className="text-center mt-8">
            <a href="/install-guide" className="text-emerald-deep font-bold underline hover:text-emerald-deep/80">বিস্তারিত গাইড পড়ুন</a>
          </div>
        </div>

        {/* TODO: Replace with proper token validation in production using Cloudflare Workers */}
        <div className="text-center text-sm text-charcoal/40 font-mono">
          Token Access: {params.token}
        </div>
      </div>
    </div>
  );
}
