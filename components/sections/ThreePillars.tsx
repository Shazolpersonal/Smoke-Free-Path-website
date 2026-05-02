"use client";

import { motion } from "framer-motion";
import {
  SectionWrapper,
  AppCard,
  LuxeBackground,
} from "@/components/ui";
import { copyBn } from "@/content";
import { EASE_LUXE } from "@/lib/motion";

export function ThreePillars() {
  const { threePillars } = copyBn;
  const cards = threePillars.cards;
  const total = cards.length;

  return (
    <SectionWrapper
      id="three-pillars"
      bgVariant="transparent"
      className="relative overflow-hidden"
    >
      <LuxeBackground variant="parchment" withNoise />

      {/* Kicker pill */}
      <motion.div
        className="relative z-10 flex justify-center mb-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.55, ease: EASE_LUXE }}
      >
        <span
          className={[
            "inline-flex items-center gap-2 px-4 py-1.5 rounded-full",
            "bg-white-pure/70 backdrop-blur-sm border border-gold-royal/35",
            "text-gold-royal text-[11px] font-bold uppercase tracking-[0.18em] font-inter",
            "shadow-luxe-sm",
          ].join(" ")}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-gold-royal"
            aria-hidden="true"
          />
          {threePillars.kicker}
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h2
        className="relative z-10 text-3xl md:text-5xl lg:text-[3.2rem] font-bold text-emerald-deep text-center mb-5 font-hind-siliguri leading-tight tracking-tight"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE_LUXE }}
      >
        {threePillars.heading}
      </motion.h2>

      {/* Subheading */}
      <motion.p
        className="relative z-10 text-base md:text-lg text-charcoal/75 text-center max-w-2xl mx-auto mb-14 md:mb-16 font-hind-siliguri leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE_LUXE }}
      >
        {threePillars.subheading}
      </motion.p>

      {/* Cards grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {cards.map((card, index) => (
          <AppCard
            key={card.name}
            index={index}
            total={total}
            theme={card.theme}
            emoji={card.emoji}
            name={card.name}
            tagline={card.tagline}
            description={card.description}
            features={card.features}
            useCase={card.useCase}
            useCaseLabel={threePillars.useCaseLabel}
            bundleLabel={threePillars.bundleLabel}
            pillarLabel={threePillars.pillarLabel}
            screenshotSrc={card.screenshotSrc}
            demoLink={card.demoAnchor}
            demoLabel={card.demoLink}
          />
        ))}
      </div>

      {/* Bundle reminder — upgraded CTA */}
      <motion.div
        className="relative z-10 mt-14 md:mt-16 flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.3, ease: EASE_LUXE }}
      >
        <p className="text-charcoal/75 text-center font-hind-siliguri text-base md:text-lg">
          {threePillars.bundleHook}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-5">
          <span className="text-3xl md:text-4xl font-bold text-gold-gradient font-hind-siliguri">
            {threePillars.bundlePrice}
          </span>
          <a
            href="#final-cta"
            className={[
              "inline-flex items-center gap-2 px-7 py-3.5 rounded-xl",
              "bg-[linear-gradient(135deg,var(--color-gold-glow)_0%,var(--color-gold-royal)_55%,var(--color-gold-soft)_100%)]",
              "text-charcoal font-bold text-sm md:text-base",
              "border border-gold-royal/50",
              "shadow-gold-glow",
              "hover:shadow-[0_0_50px_rgba(212,160,23,0.5),0_12px_32px_rgba(212,160,23,0.3)] hover:-translate-y-0.5",
              "transition-all duration-300",
              "font-hind-siliguri",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-royal focus-visible:ring-offset-2",
              "luxe-cta-shimmer",
            ].join(" ")}
          >
            {threePillars.bundleCta}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
