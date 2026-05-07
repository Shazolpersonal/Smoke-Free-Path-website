import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [
    { slug: "refund" },
    { slug: "privacy" },
    { slug: "terms" },
  ];
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const titles: Record<string, string> = {
    refund: "রিফান্ড পলিসি | ৪১-দিন প্রতিশ্রুতি",
    privacy: "প্রাইভেসি পলিসি",
    terms: "শর্তাবলী",
  };
  return {
    title: titles[params.slug] || "পলিসি | ধোঁয়া-মুক্ত পথ",
  };
}

export default function PolicyPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
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
    <div className="bg-[#f4f1ea] min-h-screen py-24 px-4 md:px-8">
      <div className="max-w-3xl mx-auto bg-white-pure p-8 md:p-12 rounded-2xl shadow-lg border border-charcoal/10 prose prose-lg prose-emerald font-noto-sans-bengali">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
