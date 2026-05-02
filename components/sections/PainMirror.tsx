"use client";

import { motion } from "framer-motion";
import { SectionWrapper, LuxeBackground } from "@/components/ui";
import { copyBn } from "@/content";
import { EASE_LUXE, fadeUp, staggerContainer } from "@/lib/motion";

// Per-thought metadata: emoji, category label, Bengali index, subtle tint
const THOUGHT_META = [
  { emoji: "🌅", category: "বিলম্ব",      index: "১", tint: "from-amber-300/25 to-transparent" },
  { emoji: "🚬", category: "অস্বীকার",   index: "২", tint: "from-orange-300/25 to-transparent" },
  { emoji: "💔", category: "আত্ম-সন্দেহ", index: "৩", tint: "from-rose-300/25 to-transparent" },
  { emoji: "❓", category: "ভয়",         index: "৪", tint: "from-sky-300/25 to-transparent" },
  { emoji: "👨‍👩‍👧", category: "লজ্জা",  index: "৫", tint: "from-violet-300/25 to-transparent" },
  { emoji: "🤲", category: "অনুশোচনা",  index: "৬", tint: "from-emerald-300/25 to-transparent" },
];

export function PainMirror() {
  return (
    <SectionWrapper
      id="pain-mirror"
      bgVariant="transparent"
      className="relative overflow-hidden"
    >
      <LuxeBackground variant="pain" />

      {/* Kicker / Eyebrow */}
      <motion.p
        className="relative z-10 text-center text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-gold-royal/80 font-hind-siliguri mb-3"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: EASE_LUXE }}
      >
        ● নিজের সাথে সৎ থাকুন ●
      </motion.p>

      {/* Section Heading */}
      <motion.h2
        className="relative z-10 text-3xl md:text-4xl lg:text-5xl font-bold text-white-pure text-center mb-4 font-hind-siliguri leading-tight tracking-tight"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.75, ease: EASE_LUXE }}
      >
        {copyBn.painMirror.heading}
      </motion.h2>

      {/* Social proof / reassurance */}
      <motion.p
        className="relative z-10 text-center text-base md:text-lg text-white-pure/60 font-noto-bengali mb-12 max-w-xl mx-auto leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE_LUXE }}
      >
        আপনি একা নন — প্রতি ১০ জন ধূমপায়ীর ৭ জন একই কথা ভাবেন।
      </motion.p>

      {/* Floating Thought Cards */}
      <motion.div
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-16"
        variants={staggerContainer(0.1, 0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {copyBn.painMirror.thoughts.map((thought, index) => {
          const meta = THOUGHT_META[index] ?? THOUGHT_META[0];
          // Strip leading "💭 " from canonical copy and keep only the quote
          const cleanThought = thought.replace(/^💭\s*/, "");

          return (
            <motion.div
              key={index}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: EASE_LUXE }}
              className={[
                "relative group p-6 md:p-7 rounded-2xl",
                "luxe-glass",
                "hover:-translate-y-1.5",
                "transition-[transform,border-color,box-shadow] duration-500",
                "hover:border-gold-royal/40",
                "hover:shadow-[0_20px_40px_rgba(6,24,18,0.6),0_0_28px_rgba(212,160,23,0.15)]",
              ].join(" ")}
            >
              {/* Soft category tint glow */}
              <span
                aria-hidden="true"
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${meta.tint} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              {/* Gold corner accent */}
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 w-10 h-px bg-gradient-to-r from-gold-royal/70 to-transparent"
              />
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 h-10 w-px bg-gradient-to-b from-gold-royal/70 to-transparent"
              />

              {/* Bengali numeral badge */}
              <span
                aria-hidden="true"
                className="absolute top-4 right-4 flex items-center justify-center w-7 h-7 rounded-full bg-gold-royal/10 border border-gold-royal/30 text-gold-royal text-xs font-bold font-hind-siliguri"
              >
                {meta.index}
              </span>

              {/* Header row: emoji + category tag */}
              <div className="relative flex items-center gap-3 mb-3">
                <span className="text-2xl md:text-3xl leading-none" aria-hidden="true">
                  {meta.emoji}
                </span>
                <span className="text-[11px] md:text-xs uppercase tracking-[0.2em] font-semibold text-white-pure/50 font-hind-siliguri">
                  {meta.category}
                </span>
              </div>

              {/* Thought quote */}
              <p className="relative text-lg md:text-xl text-white-pure/95 font-noto-bengali leading-relaxed italic">
                {cleanThought}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Closing Line — gold gradient with down-arrow cue */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, delay: 0.2, ease: EASE_LUXE }}
      >
        <p className="text-2xl md:text-3xl lg:text-[2.3rem] text-center font-bold font-hind-siliguri max-w-3xl mx-auto leading-relaxed text-gold-gradient tracking-tight">
          {copyBn.painMirror.closing}
        </p>

        {/* Down-arrow cue to next section */}
        <motion.span
          aria-hidden="true"
          className="mt-8 text-gold-royal/70 text-2xl"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
      </motion.div>
    </SectionWrapper>
  );
}
