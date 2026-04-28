import { Mail, MessageCircle } from "lucide-react";

export const metadata = {
  title: "যোগাযোগ | ধোঁয়া-মুক্ত পথ",
  description: "যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন।",
};

export default function ContactPage() {
  return (
    <div className="bg-[#f4f1ea] min-h-screen py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6 font-hind-siliguri">
            যোগাযোগ
          </h1>
          <p className="text-xl text-charcoal/80 font-noto-sans-bengali">
            আমরা সাহায্য করতে এখানে আছি। যেকোনো প্রশ্ন বা সমস্যায় আমাদের জানান। <br/> সাধারণত ২৪ ঘণ্টার মধ্যে আমরা উত্তর দিয়ে থাকি।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* WhatsApp Card */}
          <a 
            href="https://wa.me/8801234567890" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white-pure p-8 rounded-2xl border-2 border-[#25D366]/20 hover:border-[#25D366] transition-colors group text-center block"
          >
            <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-8 h-8 text-[#25D366]" />
            </div>
            <h2 className="text-2xl font-bold text-charcoal mb-2 font-hind-siliguri">WhatsApp</h2>
            <p className="text-charcoal/70 font-noto-sans-bengali">দ্রুততম উত্তরের জন্য আমাদের হোয়াটসঅ্যাপ করুন</p>
          </a>

          {/* Email Card */}
          <a 
            href="mailto:support@dhoyamuktopoth.com"
            className="bg-white-pure p-8 rounded-2xl border-2 border-emerald-deep/20 hover:border-emerald-deep transition-colors group text-center block"
          >
            <div className="w-16 h-16 bg-emerald-deep/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Mail className="w-8 h-8 text-emerald-deep" />
            </div>
            <h2 className="text-2xl font-bold text-charcoal mb-2 font-hind-siliguri">ইমেইল</h2>
            <p className="text-charcoal/70 font-noto-sans-bengali">support@dhoyamuktopoth.com</p>
          </a>
        </div>
      </div>
    </div>
  );
}
