import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CTAButton } from "@/components/ui";

export function generateStaticParams() {
  return [
    { slug: "refund" },
    { slug: "privacy" },
    { slug: "terms" },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await params;
  const titles: Record<string, string> = {
    refund: "রিফান্ড পলিসি | ৪১-দিন প্রতিশ্রুতি",
    privacy: "প্রাইভেসি পলিসি",
    terms: "শর্তাবলী",
  };
  return {
    title: titles[resolvedParams.slug] || "পলিসি | ধোঁয়া-মুক্ত পথ",
  };
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  if (!["refund", "privacy", "terms"].includes(slug)) {
    notFound();
  }

  const filePath = path.join(process.cwd(), `content/policies/${slug}.md`);
  let content = "";
  try {
    content = fs.readFileSync(filePath, "utf-8");
  } catch {
    notFound();
  }

  return (
    <div className="bg-[linear-gradient(180deg,var(--color-cream-parchment)_0%,#F0E8D0_100%)] min-h-screen py-24 px-4 md:px-8 relative">
      <div aria-hidden="true" className="absolute inset-0 luxe-noise-light pointer-events-none" />
      <div className="max-w-3xl mx-auto relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-emerald-deep hover:text-gold-royal transition-colors font-noto-bengali font-semibold mb-8"
        >
          <span aria-hidden="true">←</span> মূল পেজে ফিরে যান
        </Link>
        <div className="bg-white-pure/95 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-luxe-lg border border-gold-royal/25 prose prose-lg prose-emerald font-noto-bengali mb-12">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

        {/* Call to action card for checkout */}
        <div className="bg-white-pure/95 backdrop-blur-sm p-8 rounded-3xl shadow-luxe border border-gold-royal/40 text-center flex flex-col items-center">
          <h3 className="text-2xl font-bold text-charcoal font-hind-siliguri mb-4">
            আমাদের ওপর বিশ্বাস রাখার জন্য ধন্যবাদ
          </h3>
          <p className="text-charcoal/80 font-noto-bengali mb-8 max-w-lg">
            আপনার যাত্রা শুরু করতে প্রস্তুত? কোনো চিন্তা ছাড়া শুরু করুন, কারণ আমরা আছি আপনার সাথে।
          </p>
          <CTAButton variant="luxe" href="/checkout" size="lg" className="w-full sm:w-auto">
            চেকআউট পেজে যান
          </CTAButton>
        </div>
      </div>
    </div>
  );
}
