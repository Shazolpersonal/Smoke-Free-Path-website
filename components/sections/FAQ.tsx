"use client";

import { motion } from "framer-motion";
import { SectionWrapper, FAQAccordion } from "@/components/ui";
import { faqItems } from "@/content";
import { EASE_LUXE } from "@/lib/motion";

export function FAQ() {
  return (
    <SectionWrapper
      id="faq"
      bgVariant="transparent"
      className="relative overflow-hidden bg-[linear-gradient(180deg,var(--color-white-pure)_0%,#F5F1E5_100%)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 luxe-noise-light pointer-events-none"
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Kicker */}
        <motion.div
          className="flex justify-center mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white-pure/80 backdrop-blur-sm border border-gold-royal/30 shadow-luxe-sm">
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full bg-gold-royal"
            />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-royal font-inter">
              প্রশ্নোত্তর
            </span>
          </span>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-deep text-center mb-4 font-hind-siliguri tracking-tight leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_LUXE }}
        >
          সাধারণ জিজ্ঞাসা
        </motion.h2>

        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="inline-block h-[2px] w-16 bg-gradient-to-r from-gold-soft/50 via-gold-royal to-gold-soft/50 rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.15, ease: EASE_LUXE }}
        >
          <FAQAccordion items={faqItems} />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
