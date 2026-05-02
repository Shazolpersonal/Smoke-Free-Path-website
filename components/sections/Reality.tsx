"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/ui";
import { copyBn } from "@/content";
import { EASE_LUXE } from "@/lib/motion";

/* Counter animation hook — preserved behaviour, identical math. */
function useCountUp(
  end: number,
  duration: number = 2000,
  shouldStart: boolean = false,
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [end, duration, shouldStart]);

  return count;
}

function StatCard({
  number,
  label,
  index,
}: {
  number: string;
  label: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const numericValue = parseInt(number.replace(/[^0-9]/g, ""));
  const hasNumber = !isNaN(numericValue);
  const animatedCount = useCountUp(numericValue, 2000, isInView && hasNumber);

  const formatNumber = (num: number) => {
    const original = number;
    if (original.includes("৳")) return `৳${num.toLocaleString("bn-BD")}`;
    if (original.includes("%")) return `${num}%`;
    if (original.includes(",")) return num.toLocaleString("bn-BD");
    return num.toString();
  };

  return (
    <motion.div
      ref={ref}
      className={[
        "relative overflow-hidden p-8 rounded-2xl text-center",
        "luxe-glass border-red-alert/25",
        "transition-all duration-500",
        "hover:-translate-y-1 hover:border-red-alert/45",
        "hover:shadow-[0_18px_36px_rgba(6,24,18,0.55),0_0_32px_rgba(184,52,45,0.18)]",
      ].join(" ")}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: EASE_LUXE }}
    >
      {/* Top accent bar */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-alert/60 to-transparent"
      />

      <div className="text-5xl md:text-6xl font-bold text-red-alert mb-4 font-hind-siliguri tracking-tight">
        {hasNumber && isInView ? formatNumber(animatedCount) : number}
      </div>

      <div className="text-base md:text-lg text-white-pure/80 font-noto-bengali leading-relaxed">
        {label}
      </div>
    </motion.div>
  );
}

export function Reality() {
  return (
    <SectionWrapper
      id="reality"
      bgVariant="transparent"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#0F2A22_0%,var(--color-ink-velvet)_100%)]"
    >
      {/* Subtle grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 luxe-noise pointer-events-none"
      />

      <motion.h2
        className="relative z-10 text-3xl md:text-4xl lg:text-5xl font-bold text-white-pure text-center mb-16 font-hind-siliguri tracking-tight"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.75, ease: EASE_LUXE }}
      >
        {copyBn.reality.heading}
      </motion.h2>

      {/* Stats Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {copyBn.reality.stats.map((stat, index) => (
          <StatCard
            key={index}
            number={stat.number}
            label={stat.label}
            index={index}
          />
        ))}
      </div>

      {/* Central Quote with gold filigree corners */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center px-4"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, delay: 0.3, ease: EASE_LUXE }}
      >
        <blockquote className="relative py-8">
          {/* Gold decorative quotation marks */}
          <span
            aria-hidden="true"
            className="absolute -top-4 -left-4 md:-left-8 text-7xl md:text-8xl text-gold-royal/30 font-playfair leading-none select-none"
          >
            ❝
          </span>

          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white-pure leading-relaxed font-hind-siliguri whitespace-pre-line px-4 md:px-12 tracking-tight">
            {copyBn.reality.quote}
          </p>

          <span
            aria-hidden="true"
            className="absolute -bottom-4 -right-4 md:-right-8 text-7xl md:text-8xl text-gold-royal/30 font-playfair leading-none select-none"
          >
            ❞
          </span>
        </blockquote>
      </motion.div>
    </SectionWrapper>
  );
}
