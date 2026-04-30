"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionWrapper, ShareBar } from "@/components/ui";
import { copyBn } from "@/content";
import { SITE_URL } from "@/lib/config";

export function FinalCTA() {
  return (
    <SectionWrapper className="bg-emerald-deep text-white-pure relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold-royal/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white-pure/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-hind-siliguri leading-tight">
            আজই আপনার ধোঁয়া-মুক্ত যাত্রা শুরু করুন
          </h2>
          <p className="text-xl md:text-2xl text-white-pure/90 mb-10 font-noto-sans-bengali">
            মাত্র ৳৩৬৯ বিনিয়োগ করুন নিজের এবং আপনার পরিবারের সুস্থ ভবিষ্যতের জন্য
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link
            href="/checkout"
            className="w-full sm:w-auto px-8 py-4 bg-gold-royal text-charcoal font-bold rounded-lg hover:bg-gold-royal/90 hover:scale-105 transition-all text-lg shadow-lg"
          >
            অ্যাপগুলো ডাউনলোড করুন
          </Link>
          <p className="text-white-pure/80 font-noto-sans-bengali">
            ৪১ দিনের মানি-ব্যাক গ্যারান্টি
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-12 border-t border-white-pure/10"
        >
          <p className="text-lg text-white-pure/80 mb-6 font-noto-sans-bengali">
            পরিচিত কাউকে উপহার দিতে চান?
          </p>
          <Link
            href="/gift"
            className="inline-flex items-center gap-2 text-gold-royal hover:text-white-pure transition-colors font-medium text-lg border border-gold-royal/30 px-6 py-2 rounded-full hover:bg-gold-royal/10"
          >
            <span>🎁</span> উপহার হিসেবে কিনুন
          </Link>
        </motion.div>

        <motion.div
          className="mt-16 pt-8 border-t border-white-pure/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <ShareBar
            url={SITE_URL}
            message={copyBn.hero.headline}
            className="justify-center"
          />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
