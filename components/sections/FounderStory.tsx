"use client";

import { motion } from "framer-motion";
import { SectionWrapper, StoryLetter } from "@/components/ui";
import { copyBn } from "@/content";

export function FounderStory() {
  return (
    <SectionWrapper id="founder-story" bgVariant="sepia">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <StoryLetter
          heading={copyBn.story.heading}
          paragraphs={copyBn.story.paragraphs}
          signature={copyBn.story.signature}
          role={copyBn.story.role}
          note={copyBn.story.note}
          className="font-noto-sans-bengali"
        />
      </motion.div>
    </SectionWrapper>
  );
}
