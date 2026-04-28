"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui";
import { copyBn } from "@/content";

export function NewHope() {
  return (
    <SectionWrapper
      id="new-hope"
      className="bg-gradient-to-b from-charcoal via-[#2A3A2A] to-emerald-deep/20 relative overflow-hidden"
    >
      {/* Sunrise color wash overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-sunrise/10 via-transparent to-mint-fresh/10 pointer-events-none" />

      <div className="relative z-10">
        {/* Section Heading */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white-pure text-center mb-8 font-hind-siliguri leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {copyBn.newHope.heading}
        </motion.h2>

        {/* Intro Text */}
        <motion.p
          className="text-xl md:text-2xl text-white-pure/90 text-center mb-8 font-noto-sans-bengali"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {copyBn.newHope.intro}
        </motion.p>

        {/* Pillars Heading */}
        <motion.p
          className="text-lg md:text-xl text-emerald-deep font-semibold text-center mb-6 font-noto-sans-bengali"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {copyBn.newHope.pillarsHeading}
        </motion.p>

        {/* Three Pillars Preview */}
        <motion.div
          className="max-w-2xl mx-auto space-y-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {copyBn.newHope.pillars.map((pillar, index) => (
            <motion.div
              key={index}
              className="p-4 rounded-lg bg-white-pure/5 backdrop-blur-sm border border-white-pure/10 hover:bg-white-pure/10 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{ x: 10 }}
            >
              <p className="text-lg text-white-pure/90 font-noto-sans-bengali">
                {pillar}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Closing Text */}
        <motion.p
          className="text-2xl md:text-3xl text-center text-gold-royal font-bold font-hind-siliguri"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {copyBn.newHope.closing}
        </motion.p>
      </div>
    </SectionWrapper>
  );
}
