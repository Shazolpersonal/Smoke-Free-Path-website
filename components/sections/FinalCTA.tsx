"use client";

import { motion } from "framer-motion";
import { Shield, Gift } from "lucide-react";
import {
  SectionWrapper,
  ShareBar,
  CTAButton,
  LuxeBackground,
} from "@/components/ui";
import { copyBn } from "@/content";
import { SITE_URL } from "@/lib/config";
import { EASE_LUXE } from "@/lib/motion";

export function FinalCTA() {
  return (
    <SectionWrapper
      id="final-cta"
      bgVariant="transparent"
      className="relative overflow-hidden"
    >
      <LuxeBackground variant="final-cta" />

      <div className="relative z-10 max-w-4xl mx-auto text-center text-white-pure">
        {/* Kicker */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_LUXE }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full luxe-glass border border-gold-royal/30">
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full bg-gold-royal"
            />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-glow font-inter">
              আজই শুরু
            </span>
          </span>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-5xl lg:text-[3.4rem] font-bold mb-6 font-hind-siliguri leading-[1.2] text-gold-gradient tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_LUXE }}
        >
          আজই আপনার ধোঁয়া-মুক্ত যাত্রা শুরু করুন
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl text-white-pure/80 mb-12 font-noto-bengali leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE_LUXE }}
        >
          মাত্র ৳৩৬৯ বিনিযোগ করুন নিজের এবং আপনার পরিবারের সুস্থ ভবিষ্যতের জন্য
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE_LUXE }}
          className="flex flex-col items-center gap-5 mb-14"
        >
          <div className="luxe-float">
            <CTAButton
              variant="luxe"
              href="/checkout"
              size="xl"
              pulse
              ariaLabel="৳৩৬৯ দিয়ে সম্পূর্ণ যাত্রা কিনুন"
            >
              <span>অ্যাপগুলো ডাউনলোড করুন</span>
              <span aria-hidden="true" className="ml-1">
                →
              </span>
            </CTAButton>
          </div>

          <div className="flex items-center gap-2 text-gold-glow/80 font-noto-bengali text-sm md:text-base">
            <Shield className="w-4 h-4" aria-hidden="true" />
            <span>৪১ দিনের মানি-ব্যাক গ্যারান্টি</span>
          </div>
        </motion.div>

        {/* Gift section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.45, ease: EASE_LUXE }}
          className="pt-12 border-t border-gold-royal/20"
        >
          <p className="text-lg text-white-pure/75 mb-6 font-noto-bengali">
            পরিচিত কাউকে উপহার দিতে চান?
          </p>

          <CTAButton
            variant="luxe-outline"
            href="/gift"
            size="md"
            icon={<Gift className="w-4 h-4" aria-hidden="true" />}
            className="text-gold-glow border-gold-royal/45"
          >
            উপহার হিসেবে কিনুন
          </CTAButton>
        </motion.div>

        {/* Share bar */}
        <motion.div
          className="mt-16 pt-10 border-t border-gold-royal/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <ShareBar
            url={SITE_URL}
            message={copyBn.hero.headline}
            className="justify-center"
          />
        </motion.div>

        {/* Bookended sincerity line */}
        <motion.div
          className="mt-14 flex items-center justify-center gap-3 text-white-pure/45"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.85 }}
        >
          <span
            aria-hidden="true"
            className="w-1 h-1 rounded-full bg-gold-royal/60"
          />
          <span className="text-xs md:text-sm italic font-playfair tracking-wide">
            With sincerity and compassion
          </span>
          <span
            aria-hidden="true"
            className="w-1 h-1 rounded-full bg-gold-royal/60"
          />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
