"use client";

import { motion } from "framer-motion";
import { SectionWrapper, IslamicQuote, CTAButton } from "@/components/ui";
import { copyBn } from "@/content";
import { EASE_LUXE } from "@/lib/motion";

export function IslamicInspiration() {
  return (
    <SectionWrapper
      id="islamic-inspiration"
      bgVariant="transparent"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#F0E8D0_0%,var(--color-cream-parchment)_100%)]"
    >
      {/* Subtle arabesque dot pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, var(--color-emerald-deep) 1px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 luxe-noise-light pointer-events-none"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          className="flex justify-center mb-4"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_LUXE }}
        >
          <span className="text-2xl text-gold-royal/60 font-amiri select-none">
            ﷽
          </span>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-deep mb-12 font-hind-siliguri tracking-tight leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_LUXE }}
        >
          {copyBn.islamic.heading}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE_LUXE }}
          className="mb-12"
        >
          <IslamicQuote
            arabic={copyBn.islamic.arabicQuote}
            translation={copyBn.islamic.translation}
            source={copyBn.islamic.source}
          />
        </motion.div>

        <motion.div
          className="text-lg md:text-xl text-charcoal/80 mb-12 font-noto-bengali leading-relaxed whitespace-pre-line text-left md:text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE_LUXE }}
        >
          {copyBn.islamic.body}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE_LUXE }}
        >
          <CTAButton variant="luxe" href="/checkout?gift=true" size="lg">
            {copyBn.islamic.cta}
          </CTAButton>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
