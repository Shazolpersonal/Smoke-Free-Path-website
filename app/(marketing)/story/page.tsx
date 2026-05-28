import { StoryLetter } from "@/components/ui/StoryLetter";
import { copyBn } from "@/content";

export const metadata = {
  title: "আমাদের গল্প — কেন এই অ্যাপগুলো বানিয়েছিলাম",
  description: "আবদুল করিমের স্মৃতিতে — একজন বাবার গল্প এবং একজন ছেলের প্রতিশ্রুতি।",
};

export default function StoryPage() {
  return (
    <div className="bg-[#f4f1ea] min-h-screen py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <StoryLetter
          heading={copyBn.story.heading}
          paragraphs={copyBn.story.paragraphs}
          signature={copyBn.story.signature}
          role={copyBn.story.role}
          note={copyBn.story.note}
          className="font-noto-sans-bengali"
        />
        <div className="mt-16 text-center">
          <a
            href="/checkout"
            className="inline-block bg-red-alert text-white-pure font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-red-alert/30 hover:-translate-y-1 transition-all duration-300 font-noto-sans-bengali text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-alert focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f1ea]"
          >
            হ্যাঁ, আমি প্রস্তুত — ৳৩৬৯
          </a>
        </div>
      </div>
    </div>
  );
}
