"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui";
import { copyBn } from "@/content";

export function PainMirror() {
  // Stagger animation for thoughts
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  const itemTransition = {
    duration: 0.5,
    ease: "easeOut" as const,
  };

  return (
    <SectionWrapper
      id="pain-mirror"
      className="bg-[#1A1A1A] bg-gradient-to-b from-[#1A1A1A] to-[#1A2A1A]"
    >
      {/* Section Heading */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-white-pure text-center mb-12 font-hind-siliguri"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        {copyBn.painMirror.heading}
      </motion.h2>

      {/* Floating Thought Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {copyBn.painMirror.thoughts.map((thought, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            transition={itemTransition}
            className="relative p-6 rounded-xl bg-white-pure/5 backdrop-blur-sm border border-white-pure/10 hover:bg-white-pure/10 transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-lg md:text-xl text-white-pure/90 font-noto-sans-bengali leading-relaxed">
              {thought}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Closing Line */}
      <motion.p
        className="text-2xl md:text-3xl text-center text-emerald-deep font-bold font-hind-siliguri max-w-3xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        {copyBn.painMirror.closing}
      </motion.p>
    </SectionWrapper>
  );
}
