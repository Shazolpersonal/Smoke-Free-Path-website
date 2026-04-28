"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/ui";
import { copyBn } from "@/content";

// Counter animation hook
function useCountUp(end: number, duration: number = 2000, shouldStart: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, shouldStart]);

  return count;
}

// Stat Card Component
function StatCard({ number, label, index }: { number: string; label: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Extract numeric value for count-up animation
  const numericValue = parseInt(number.replace(/[^0-9]/g, ""));
  const hasNumber = !isNaN(numericValue);
  const animatedCount = useCountUp(numericValue, 2000, isInView && hasNumber);

  // Format the animated number back to original format
  const formatNumber = (num: number) => {
    const original = number;
    if (original.includes("৳")) {
      return `৳${num.toLocaleString("bn-BD")}`;
    }
    if (original.includes("%")) {
      return `${num}%`;
    }
    if (original.includes(",")) {
      return num.toLocaleString("bn-BD");
    }
    return num.toString();
  };

  return (
    <motion.div
      ref={ref}
      className="relative p-8 rounded-xl bg-charcoal/50 backdrop-blur-sm border-2 border-red-alert/30 hover:border-red-alert/50 transition-colors"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Number */}
      <div className="text-4xl md:text-5xl font-bold text-red-alert mb-4 font-hind-siliguri">
        {hasNumber && isInView ? formatNumber(animatedCount) : number}
      </div>

      {/* Label */}
      <div className="text-lg md:text-xl text-white-pure/80 font-noto-sans-bengali leading-relaxed">
        {label}
      </div>
    </motion.div>
  );
}

export function Reality() {
  return (
    <SectionWrapper
      id="reality"
      className="bg-gradient-to-b from-[#1A2A1A] to-charcoal"
    >
      {/* Section Heading */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-white-pure text-center mb-16 font-hind-siliguri"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        {copyBn.reality.heading}
      </motion.h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {copyBn.reality.stats.map((stat, index) => (
          <StatCard
            key={index}
            number={stat.number}
            label={stat.label}
            index={index}
          />
        ))}
      </div>

      {/* Central Quote */}
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <blockquote className="relative">
          {/* Quote marks */}
          <span className="absolute -top-8 -left-4 text-6xl text-gold-royal/30 font-serif">
            "
          </span>

          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white-pure leading-relaxed font-hind-siliguri whitespace-pre-line px-8">
            {copyBn.reality.quote}
          </p>

          <span className="absolute -bottom-8 -right-4 text-6xl text-gold-royal/30 font-serif">
            "
          </span>
        </blockquote>
      </motion.div>
    </SectionWrapper>
  );
}
