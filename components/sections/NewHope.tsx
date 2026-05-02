"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui";
import { copyBn } from "@/content";
import { EASE_LUXE } from "@/lib/motion";

export function NewHope() {
  return (
    <SectionWrapper
      id="new-hope"
      bgVariant="transparent"
      className="relative overflow-hidden bg-[linear-gradient(180deg,var(--color-ink-velvet)_0%,#1B3A2D_55%,var(--color-emerald-deep)_100%)]"
    >
      {/* Sunrise wash overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(45%_55%_at_70%_30%,rgba(224,122,59,0.14)_0%,transparent_70%)] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(35%_50%_at_20%_80%,rgba(111,184,151,0.12)_0%,transparent_70%)] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 luxe-noise pointer-events-none"
      />

      <div className="relative z-10">
        {/* Kicker */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full luxe-glass border border-gold-royal/30">
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full bg-gold-royal"
            />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-glow font-inter">
              নতুন সূর্যোদয়
            </span>
          </span>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white-pure text-center mb-8 font-hind-siliguri leading-[1.2] tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75, ease: EASE_LUXE }}
        >
          {copyBn.newHope.heading}
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl text-white-pure/85 text-center mb-10 font-noto-bengali leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE_LUXE }}
        >
          {copyBn.newHope.intro}
        </motion.p>

        <motion.p
          className="text-lg md:text-xl text-gold-glow font-semibold text-center mb-8 font-noto-bengali"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE_LUXE }}
        >
          {copyBn.newHope.pillarsHeading}
        </motion.p>

        <motion.div
          className="max-w-2xl mx-auto space-y-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE_LUXE }}
        >
          {copyBn.newHope.pillars.map((pillar, index) => (
            <motion.div
              key={index}
              className={[
                "relative group p-5 rounded-2xl overflow-hidden",
                "luxe-glass",
                "transition-all duration-500 hover:translate-x-2",
                "hover:border-gold-royal/30",
                "hover:shadow-[0_14px_30px_rgba(6,24,18,0.5),0_0_20px_rgba(212,160,23,0.15)]",
              ].join(" ")}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.5,
                delay: 0.4 + index * 0.1,
                ease: EASE_LUXE,
              }}
            >
              {/* Gold left accent — slides on hover */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gold-soft via-gold-royal to-gold-soft opacity-40 group-hover:opacity-100 transition-opacity duration-500"
              />
              <p className="text-lg text-white-pure/90 font-noto-bengali leading-relaxed pl-3">
                {pillar}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="text-2xl md:text-3xl lg:text-[2.3rem] text-center font-bold font-hind-siliguri text-gold-gradient tracking-tight"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, delay: 0.55, ease: EASE_LUXE }}
        >
          {copyBn.newHope.closing}
        </motion.p>
      </div>
    </SectionWrapper>
  );
}
