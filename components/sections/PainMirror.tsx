"use client";

import { motion } from "framer-motion";
import { SectionWrapper, LuxeBackground } from "@/components/ui";
import { copyBn } from "@/content";
import { EASE_LUXE, fadeUp, staggerContainer } from "@/lib/motion";

export function PainMirror() {
  return (
    <SectionWrapper
      id="pain-mirror"
      bgVariant="transparent"
      className="relative overflow-hidden"
    >
      <LuxeBackground variant="pain" />

      {/* Section Heading */}
      <motion.h2
        className="relative z-10 text-3xl md:text-4xl lg:text-5xl font-bold text-white-pure text-center mb-14 font-hind-siliguri leading-tight tracking-tight"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.75, ease: EASE_LUXE }}
      >
        {copyBn.painMirror.heading}
      </motion.h2>

      {/* Floating Thought Cards */}
      <motion.div
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        variants={staggerContainer(0.12, 0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {copyBn.painMirror.thoughts.map((thought, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: EASE_LUXE }}
            className={[
              "relative group p-6 md:p-7 rounded-2xl",
              "luxe-glass",
              "hover:-translate-y-1",
              "transition-[transform,border-color,box-shadow] duration-500",
              "hover:border-gold-royal/30",
              "hover:shadow-[0_18px_36px_rgba(6,24,18,0.55),0_0_24px_rgba(212,160,23,0.12)]",
            ].join(" ")}
          >
            {/* Gold corner accent */}
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 w-8 h-px bg-gradient-to-r from-gold-royal/60 to-transparent"
            />
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 h-8 w-px bg-gradient-to-b from-gold-royal/60 to-transparent"
            />

            <p className="text-lg md:text-xl text-white-pure/90 font-noto-bengali leading-relaxed">
              {thought}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Closing Line — gold gradient to hint hope */}
      <motion.p
        className="relative z-10 text-2xl md:text-3xl lg:text-[2.3rem] text-center font-bold font-hind-siliguri max-w-3xl mx-auto leading-relaxed text-gold-gradient tracking-tight"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, delay: 0.2, ease: EASE_LUXE }}
      >
        {copyBn.painMirror.closing}
      </motion.p>
    </SectionWrapper>
  );
}
