"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/ui";
import { copyBn } from "@/content";
import { EASE_LUXE } from "@/lib/motion";
import {
  Wallet,
  Hourglass,
  Users,
  Activity,
  CalendarOff,
  AlertTriangle
} from "lucide-react";

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

const getIconForIndex = (index: number) => {
  switch (index) {
    case 0: return <Wallet className="w-8 h-8 md:w-10 md:h-10 text-red-alert/80" strokeWidth={1.5} />;
    case 1: return <Hourglass className="w-8 h-8 md:w-10 md:h-10 text-red-alert/80" strokeWidth={1.5} />;
    case 2: return <Users className="w-8 h-8 md:w-10 md:h-10 text-red-alert/80" strokeWidth={1.5} />;
    case 3: return <AlertTriangle className="w-8 h-8 md:w-10 md:h-10 text-red-alert/80" strokeWidth={1.5} />;
    case 4: return <CalendarOff className="w-8 h-8 md:w-10 md:h-10 text-red-alert/80" strokeWidth={1.5} />;
    default: return <Activity className="w-8 h-8 md:w-10 md:h-10 text-red-alert/80" strokeWidth={1.5} />;
  }
};

function BentoStatCard({
  number,
  label,
  index,
  className = "",
}: {
  number: string;
  label: string;
  index: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

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
        "relative overflow-hidden p-8 rounded-3xl flex flex-col justify-between",
        "luxe-glass border-red-alert/20",
        "transition-all duration-500 group",
        "hover:-translate-y-1 hover:border-red-alert/40",
        "hover:shadow-[0_20px_40px_rgba(6,24,18,0.6),0_0_40px_rgba(184,52,45,0.15)]",
        className
      ].join(" ")}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE_LUXE }}
    >
      {/* Subtle background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-alert/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="p-3 rounded-2xl bg-red-alert/10 border border-red-alert/20 text-red-alert group-hover:scale-110 transition-transform duration-500">
          {getIconForIndex(index)}
        </div>
      </div>

      <div className="relative z-10 mt-auto">
        <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-red-alert mb-3 font-hind-siliguri tracking-tight leading-none group-hover:text-red-500 transition-colors duration-300">
          {hasNumber && isInView ? formatNumber(animatedCount) : number}
        </div>
        <div className="text-lg md:text-xl text-white-pure/80 font-noto-bengali leading-relaxed font-medium">
          {label}
        </div>
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

      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-red-alert/10 rounded-full blur-[120px] pointer-events-none opacity-50" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.75, ease: EASE_LUXE }}
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-red-alert/10 border border-red-alert/20 text-red-400 font-noto-bengali text-sm md:text-base mb-6 tracking-wide uppercase">
            বাস্তব চিত্র
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white-pure font-hind-siliguri tracking-tight leading-tight">
            {copyBn.reality.heading}
          </h2>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {copyBn.reality.stats.map((stat, index) => {
            // Bento sizing logic
            let spanClass = "md:col-span-1 min-h-[280px]";
            if (index === 0) spanClass = "md:col-span-2 min-h-[320px]"; // Large featured stat

            return (
              <BentoStatCard
                key={index}
                number={stat.number}
                label={stat.label}
                index={index}
                className={spanClass}
              />
            );
          })}
        </div>

        {/* Central Quote with elegant presentation */}
        <motion.div
          className="relative max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, delay: 0.2, ease: EASE_LUXE }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-royal/10 to-transparent blur-3xl opacity-60" />

          <blockquote className="relative py-12 px-6 md:px-16 rounded-3xl border border-gold-royal/20 bg-emerald-abyss/80 backdrop-blur-md overflow-hidden">
            {/* Top/bottom decorative borders */}
            <span className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-gold-royal/50 to-transparent" />
            <span className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-gold-royal/50 to-transparent" />

            <div className="text-4xl md:text-5xl lg:text-6xl text-gold-royal/20 font-playfair mb-4 leading-none text-center">
              ❝
            </div>

            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white-pure leading-snug font-hind-siliguri whitespace-pre-line tracking-tight">
              {copyBn.reality.quote}
            </p>

            <div className="text-4xl md:text-5xl lg:text-6xl text-gold-royal/20 font-playfair mt-4 leading-none text-center">
              ❞
            </div>
          </blockquote>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
