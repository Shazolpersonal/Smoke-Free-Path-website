"use client";

import { motion } from "framer-motion";
import {
  SectionWrapper,
  StoryLetter,
  LuxeBackground,
} from "@/components/ui";
import { copyBn } from "@/content";
import { EASE_LUXE } from "@/lib/motion";

/**
 * FounderStory — in memory of Abdul Karim rahimahullah.
 *
 * This section is SACRED. Steering principles applied strictly:
 *   5. The Founder's Story is Sacred — no CTAs inside.
 *   4. Silence is Sacred — generous whitespace.
 *   6. Islamic Content is Holy — dignified ornaments only.
 */
export function FounderStory() {
  return (
    <SectionWrapper
      id="story"
      bgVariant="transparent"
      className="relative overflow-hidden"
    >
      {/* Warm parchment background with gentle gold orbs and paper grain */}
      <LuxeBackground variant="parchment" withNoise />

      {/* Decorative top ornament — tiny */}
      <motion.div
        aria-hidden="true"
        className="relative z-10 flex justify-center mb-6 text-gold-royal/50 text-3xl font-amiri select-none"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: EASE_LUXE }}
      >
        ۩
      </motion.div>

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.0, ease: EASE_LUXE }}
      >
        {/* Parchment paper card with subtle deckled edges */}
        <div className="relative max-w-3xl mx-auto">
          {/* Soft paper shadow beneath card */}
          <div
            aria-hidden="true"
            className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-gold-royal/8 via-transparent to-emerald-bright/5 blur-2xl"
          />

          <div
            className={[
              "relative rounded-3xl",
              "bg-white-pure/60 backdrop-blur-sm",
              "border border-gold-royal/20",
              "px-6 py-10 md:px-14 md:py-16",
              "shadow-luxe-lg",
            ].join(" ")}
          >
            <StoryLetter
              heading={copyBn.story.heading}
              paragraphs={copyBn.story.paragraphs}
              signature={copyBn.story.signature}
              role={copyBn.story.role}
              note={copyBn.story.note}
              className="font-noto-bengali"
            />
          </div>
        </div>
      </motion.div>

      {/* Decorative bottom ornament — "Al-Fatiha" reminder dot */}
      <motion.div
        aria-hidden="true"
        className="relative z-10 flex justify-center mt-10 text-gold-royal/40 text-xl font-amiri select-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.6 }}
      >
        ❁
      </motion.div>
    </SectionWrapper>
  );
}
