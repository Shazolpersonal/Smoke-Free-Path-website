"use client";

import { motion } from "framer-motion";
import { SectionWrapper, AppCard } from "@/components/ui";
import { copyBn } from "@/content";

export function ThreePillars() {
  return (
    <SectionWrapper
      id="three-pillars"
      bgVariant="white"
    >
      {/* Section Heading */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-charcoal text-center mb-12 font-hind-siliguri"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        {copyBn.threePillars.heading}
      </motion.h2>

      {/* Three App Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {copyBn.threePillars.cards.map((card, index) => (
          <AppCard
            key={index}
            theme={card.theme}
            emoji={card.emoji}
            name={card.name}
            tagline={card.tagline}
            description={card.description}
            screenshotSrc={`/screenshots/app-${index + 1}-placeholder.svg`}
            demoLink="#live-demo"
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
