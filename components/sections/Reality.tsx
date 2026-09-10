"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { SectionWrapper } from "@/components/ui";
import { copyBn } from "@/content";
import { EASE_LUXE } from "@/lib/motion";

/* Counter animation hook — preserved behaviour, identical math. */
// ⚡ Bolt Optimization:
// Problem: `useCountUp` was using `useState` inside a `requestAnimationFrame` loop, causing
// the component to re-render ~60 times per second during the 2.5s animation.
// Solution: Use Framer Motion's `useMotionValue`, `useTransform`, and `animate`
// to bypass React renders and directly update the DOM node.
// Impact: Eliminates ~150 React re-renders per animated number, vastly reducing CPU usage and layout thrashing.
function useCountUp(
  end: number,
  duration: number = 2500,
  shouldStart: boolean = false,
) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    if (!shouldStart) return;

    // We emulate easeOutQuart easing: 1 - Math.pow(1 - progress, 4)
    const controls = animate(count, end, {
      duration: duration / 1000, // framer-motion takes seconds
      ease: [0.25, 1, 0.5, 1], // approximate easeOutQuart
    });

    return controls.stop;
  }, [count, end, duration, shouldStart]);

  return rounded;
}

function EditorialStat({
  number,
  label,
  index,
  total,
}: {
  number: string;
  label: string;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const numericValue = parseInt(number.replace(/[^0-9]/g, ""));
  const hasNumber = !isNaN(numericValue);
  const animatedCount = useCountUp(numericValue, 2500, isInView && hasNumber);

  const formattedValue = useTransform(animatedCount, (num) => {
    const original = number;
    if (original.includes("৳")) return `৳${num.toLocaleString("bn-BD")}`;
    if (original.includes("%")) return `${num}%`;
    if (original.includes(",")) return num.toLocaleString("bn-BD");
    return num.toString();
  });

  // If there's no number, we just show the string. Otherwise, we show the animated motion value.
  const displayValue = hasNumber ? (isInView ? formattedValue : "0") : number;

  // Create an alternating layout logic to make it look like an editorial spread
  const isEven = index % 2 === 0;
  // First item gets special treatment
  const isFirst = index === 0;

  return (
    <motion.div
      ref={ref}
      className={`relative w-full flex flex-col md:flex-row items-center justify-between py-16 md:py-24 border-b border-white-pure/5 last:border-0 group ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.2, delay: index * 0.15, ease: EASE_LUXE }}
    >
      {/* Background Hover Effect - Cinematic wide gradient sweep */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-alert/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10 blur-2xl" />

      {/* Number Side */}
      <div className={`w-full md:w-1/2 flex ${isEven ? "justify-start md:justify-end" : "justify-start"} mb-8 md:mb-0`}>
        <div className="relative">
          {/* Subtle glow behind the number */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-red-alert/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10 pointer-events-none" />

          <motion.div
            className={`${isFirst ? "text-7xl md:text-8xl lg:text-[140px]" : "text-6xl md:text-7xl lg:text-[110px]"} font-black text-red-alert/90 font-hind-siliguri tracking-tighter leading-none group-hover:text-red-500 transition-colors duration-700`}
            style={{
              textShadow: "0 10px 40px rgba(184, 52, 45, 0.2)",
              WebkitTextStroke: "1px rgba(184, 52, 45, 0.4)"
            }}
          >
            {displayValue}
          </motion.div>
        </div>
      </div>

      {/* Text Side */}
      <div className={`w-full md:w-5/12 flex flex-col ${isEven ? "items-start text-left" : "items-start md:items-end md:text-right"}`}>
        <div className="flex items-center gap-4 mb-4 opacity-40 font-mono text-sm tracking-widest text-gold-royal/80">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span className="w-8 h-[1px] bg-gold-royal/40"></span>
          <span>{String(total).padStart(2, '0')}</span>
        </div>
        <div className="text-2xl md:text-3xl lg:text-4xl text-white-pure/90 font-noto-bengali leading-snug font-medium max-w-sm">
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
      className="relative bg-ink-velvet min-h-screen flex flex-col"
    >
      {/* Cinematic Environmental Effects */}
      <div className="absolute inset-0 luxe-noise opacity-30 pointer-events-none mix-blend-overlay" />
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-0" />

      {/* Deep red ambient light source */}
      <div className="absolute top-[20%] right-[-10%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-red-alert/5 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-gold-royal/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto w-full pt-16 md:pt-32 pb-32">

        {/* Intro Header */}
        <motion.div
          className="max-w-3xl mb-32"
          initial={{ opacity: 0, filter: "blur(10px)", y: 40 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: EASE_LUXE }}
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="w-12 h-[1px] bg-red-alert/40"></span>
            <span className="text-red-alert/80 font-mono text-sm tracking-[0.2em] uppercase">বাস্তবতা</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-8xl font-black text-white-pure font-hind-siliguri tracking-tighter leading-[1.1] mb-6">
            {copyBn.reality.heading.split(' ').map((word, i, arr) => (
              <span key={i} className={i === arr.length - 1 ? "text-red-alert block mt-2" : ""}>
                {word}{" "}
              </span>
            ))}
          </h2>
        </motion.div>

        {/* Editorial Stats Spread */}
        <div className="relative w-full mb-40">
          {/* Vertical timeline spine line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white-pure/10 to-transparent -translate-x-1/2 hidden md:block" />

          {copyBn.reality.stats.map((stat, index) => (
            <EditorialStat
              key={index}
              number={stat.number}
              label={stat.label}
              index={index}
              total={copyBn.reality.stats.length}
            />
          ))}
        </div>

        {/* Cinematic Quote Finale */}
        <motion.div
          className="relative w-full min-h-[60vh] flex flex-col items-center justify-center py-24 md:py-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 2, ease: EASE_LUXE }}
        >
          {/* Intense center spotlight for quote */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,160,23,0.1)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[1px] bg-gradient-to-r from-transparent via-gold-royal/30 to-transparent blur-[2px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] h-[1px] bg-gradient-to-r from-transparent via-white-pure/40 to-transparent" />

          <div className="relative z-10 w-full max-w-5xl mx-auto text-center px-4">
            <motion.div
              className="text-gold-royal/30 font-playfair text-[8rem] md:text-[12rem] leading-none absolute -top-16 md:-top-24 left-1/2 -translate-x-1/2 -z-10 select-none opacity-40 blur-[1px]"
              initial={{ y: 50, scale: 0.9 }}
              whileInView={{ y: 0, scale: 1 }}
              transition={{ duration: 2, ease: EASE_LUXE }}
            >
              &quot;
            </motion.div>

            <motion.h3
              className="text-4xl md:text-5xl lg:text-7xl font-black text-white-pure leading-[1.1] font-hind-siliguri tracking-tight"
              style={{
                textShadow: "0 20px 40px rgba(0,0,0,0.5)"
              }}
              initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
              whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.5, delay: 0.3, ease: EASE_LUXE }}
            >
              {copyBn.reality.quote.split('—').map((part, i) => (
                <span key={i} className={i === 1 ? "block text-gold-gradient mt-4 md:mt-8 text-5xl md:text-6xl lg:text-8xl" : "block"}>
                  {part}{i === 0 ? " —" : ""}
                </span>
              ))}
            </motion.h3>
          </div>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}
