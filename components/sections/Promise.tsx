"use client";

import { motion } from "framer-motion";
import { Shield, CheckCircle2 } from "lucide-react";
import { SectionWrapper, CTAButton } from "@/components/ui";
import { copyBn } from "@/content";
import { EASE_LUXE, SPRING_SOFT } from "@/lib/motion";

export function Promise() {
  return (
    <SectionWrapper
      id="promise"
      bgVariant="transparent"
      className="relative overflow-hidden bg-[linear-gradient(180deg,var(--color-cream-parchment)_0%,#F0E8D0_100%)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 luxe-noise-light pointer-events-none"
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Shield with gold glow aura */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={SPRING_SOFT}
        >
          <div className="relative">
            {/* Glow halo */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -m-4 rounded-full bg-gold-royal/30 blur-2xl"
            />
            <div className="relative p-6 bg-[linear-gradient(135deg,var(--color-gold-glow)_0%,var(--color-gold-royal)_100%)] rounded-full border-2 border-gold-soft shadow-gold-glow">
              <Shield className="w-14 h-14 text-white-pure" strokeWidth={2} />
            </div>
          </div>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-deep mb-4 font-hind-siliguri tracking-tight leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_LUXE }}
        >
          {copyBn.promise.heading.replace("🛡️ ", "")}
        </motion.h2>

        <motion.h3
          className="text-xl md:text-2xl text-gold-royal font-semibold mb-12 font-noto-bengali"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE_LUXE }}
        >
          {copyBn.promise.subHeading}
        </motion.h3>

        {/* Main content card */}
        <motion.div
          className={[
            "relative bg-white-pure/95 backdrop-blur-sm",
            "p-8 md:p-12 rounded-3xl",
            "shadow-luxe-lg border border-gold-royal/25",
            "mb-10 text-left",
            "overflow-hidden",
          ].join(" ")}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE_LUXE }}
        >
          {/* Top accent bar */}
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold-royal to-transparent"
          />

          <p className="text-lg text-charcoal/80 mb-8 whitespace-pre-line font-noto-bengali leading-relaxed">
            {copyBn.promise.intro}
          </p>

          <h4 className="font-bold text-xl text-emerald-deep mb-6 font-hind-siliguri flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block w-8 h-px bg-gold-royal"
            />
            {copyBn.promise.thenHeading}
          </h4>

          <ul className="space-y-4 mb-10">
            {copyBn.promise.benefits.map((benefit, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: 0.4 + index * 0.08,
                  ease: EASE_LUXE,
                }}
              >
                <span className="flex-shrink-0 mt-1">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-deep text-white-pure">
                    <CheckCircle2 className="w-4 h-4" strokeWidth={2.4} />
                  </span>
                </span>
                <span className="text-lg text-charcoal/90 font-noto-bengali leading-relaxed">
                  {benefit.replace("✓ ", "")}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* Why card — glass-morphism */}
          <div className="relative bg-emerald-deep/5 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-emerald-deep/15 overflow-hidden">
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-emerald-bright/60 via-emerald-deep to-emerald-bright/60"
            />
            <h4 className="font-bold text-lg text-emerald-deep mb-4 font-hind-siliguri pl-2">
              {copyBn.promise.whyHeading}
            </h4>
            <p className="text-charcoal/80 whitespace-pre-line text-base leading-relaxed font-noto-bengali pl-2">
              {copyBn.promise.whyBody}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <CTAButton
            variant="luxe"
            href="/policy/refund"
            className="font-noto-bengali"
          >
            {copyBn.promise.cta}
          </CTAButton>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
