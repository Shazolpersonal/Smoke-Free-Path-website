"use client";

import { motion } from "framer-motion";
import { SectionWrapper, AppCard } from "@/components/ui";
import { copyBn } from "@/content";

export function ThreePillars() {
  const { threePillars } = copyBn;
  const cards = threePillars.cards;
  const total = cards.length;

  return (
    <SectionWrapper id="three-pillars" bgVariant="sepia">
      {/* Kicker pill */}
      <motion.div
        className="flex justify-center mb-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-royal/10 text-gold-royal text-[11px] font-bold uppercase tracking-[0.18em] font-inter">
          <span
            className="w-1.5 h-1.5 rounded-full bg-gold-royal"
            aria-hidden="true"
          />
          {threePillars.kicker}
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h2
        className="text-3xl md:text-5xl font-bold text-charcoal text-center mb-5 font-hind-siliguri leading-tight"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {threePillars.heading}
      </motion.h2>

      {/* Subheading */}
      <motion.p
        className="text-base md:text-lg text-charcoal/75 text-center max-w-2xl mx-auto mb-14 md:mb-16 font-hind-siliguri leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {threePillars.subheading}
      </motion.p>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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

      {/* Bundle reminder */}
      <motion.div
        className="mt-14 md:mt-16 flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <p className="text-charcoal/75 text-center font-hind-siliguri">
          {threePillars.bundleHook}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <span className="text-2xl md:text-3xl font-bold text-gold-royal font-hind-siliguri">
            {threePillars.bundlePrice}
          </span>
          <a
            href="#final-cta"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-royal text-white-pure font-semibold text-sm md:text-base shadow-[0_6px_18px_rgba(212,160,23,0.35)] hover:shadow-[0_10px_28px_rgba(212,160,23,0.5)] hover:-translate-y-0.5 transition-all duration-300 font-hind-siliguri focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-royal focus-visible:ring-offset-2"
          >
            {threePillars.bundleCta}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
