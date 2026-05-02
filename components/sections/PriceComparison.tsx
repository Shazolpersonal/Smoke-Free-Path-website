"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper, LuxeBackground } from "@/components/ui";
import { copyBn } from "@/content";
import { BUNDLE_PRICE, ORIGINAL_PRICE } from "@/lib/config";
import { EASE_LUXE } from "@/lib/motion";

/**
 * PriceComparison — the conversion moment of the page.
 *
 * CRITICAL: the outer <section> MUST keep `id="price-comparison"`.
 * components/audio/AudioMount.tsx targets `#price-comparison` and applies
 * the `sfp-audio-completion-highlight` class when the narration finishes.
 * If the id changes, the completion glow silently stops working.
 */
export function PriceComparison() {
  return (
    <SectionWrapper
      id="price-comparison"
      bgVariant="transparent"
      className="relative overflow-hidden"
    >
      <LuxeBackground variant="price-dark" />

      <motion.div
        className="max-w-4xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.75, ease: EASE_LUXE }}
      >
        {/* Kicker pill */}
        <motion.div
          className="flex justify-center mb-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full luxe-glass border border-gold-royal/30">
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full bg-gold-royal"
            />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-glow font-inter">
              সত্যিকারের মূল্য
            </span>
          </span>
        </motion.div>

        <h2 className="text-3xl md:text-5xl font-bold text-center mb-14 font-hind-siliguri text-gold-gradient leading-tight tracking-tight">
          {copyBn.priceComparison.heading}
        </h2>

        {/* Cost Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {copyBn.priceComparison.items.map((item, index) => (
            <motion.div
              key={index}
              className={[
                "relative group p-6 rounded-2xl text-center",
                "luxe-glass",
                "border-white-pure/10 hover:border-gold-royal/30",
                "transition-all duration-500 hover:-translate-y-1",
                "hover:shadow-[0_18px_36px_rgba(6,24,18,0.55),0_0_20px_rgba(212,160,23,0.15)]",
              ].join(" ")}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: EASE_LUXE,
              }}
            >
              <span className="block text-white-pure/70 mb-3 font-noto-bengali text-sm md:text-base">
                {item.label}
              </span>
              <span className="block text-2xl md:text-3xl font-bold text-red-alert font-hind-siliguri">
                {item.value}
              </span>
              {/* Hover gold underline */}
              <span
                aria-hidden="true"
                className="absolute left-1/2 -translate-x-1/2 bottom-3 h-px w-0 bg-gradient-to-r from-transparent via-gold-royal to-transparent transition-[width] duration-500 group-hover:w-16"
              />
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="text-center text-gold-royal/30 mb-12 select-none hidden md:block text-2xl font-amiri">
          {copyBn.priceComparison.divider}
        </div>

        {/* Bundle highlight card */}
        <motion.div
          className={[
            "relative overflow-hidden",
            "p-8 md:p-14 rounded-3xl text-center",
            "border border-gold-royal/45",
            "bg-[linear-gradient(135deg,rgba(212,160,23,0.10)_0%,rgba(15,81,50,0.22)_55%,rgba(212,160,23,0.08)_100%)]",
            "shadow-[0_24px_48px_rgba(6,24,18,0.5),0_0_40px_rgba(212,160,23,0.18)]",
          ].join(" ")}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_LUXE }}
        >
          {/* Giant ৳ watermark */}
          <div
            aria-hidden="true"
            className="absolute -top-4 -right-2 text-[14rem] leading-none text-gold-royal/[0.08] font-hind-siliguri font-bold select-none pointer-events-none"
          >
            ৳
          </div>

          {/* Top corner arabesque accents */}
          <GoldCornerMark className="absolute top-4 left-4" rotate={0} />
          <GoldCornerMark className="absolute top-4 right-4" rotate={90} />
          <GoldCornerMark className="absolute bottom-4 left-4" rotate={-90} />
          <GoldCornerMark className="absolute bottom-4 right-4" rotate={180} />

          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl font-semibold mb-8 text-white-pure/80 font-hind-siliguri tracking-wide">
              {copyBn.priceComparison.appPriceHeading}
            </h3>

            {/* Animated price */}
            <PriceReveal
              original={ORIGINAL_PRICE}
              current={BUNDLE_PRICE}
            />

            <ul className="space-y-4 mb-10 inline-block text-left mt-8">
              {copyBn.priceComparison.benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  className="text-lg md:text-xl text-gold-glow font-hind-siliguri flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + index * 0.08,
                    ease: EASE_LUXE,
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="flex-shrink-0 text-gold-royal text-lg"
                  >
                    ✦
                  </span>
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </ul>

            <div className="pt-8 border-t border-gold-royal/15 relative">
              {/* Decorative gold quotation */}
              <span
                aria-hidden="true"
                className="absolute -top-5 left-1/2 -translate-x-1/2 text-4xl text-gold-royal/40 font-playfair leading-none select-none bg-[color:var(--color-emerald-night)] px-4"
              >
                ❝
              </span>
              <p className="text-xl md:text-2xl italic text-white-pure/90 font-noto-bengali leading-relaxed">
                {copyBn.priceComparison.quote}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}

/* -------------------------------------------------------------- */
/* Sub-components                                                  */
/* -------------------------------------------------------------- */

function PriceReveal({
  original,
  current,
}: {
  original: number;
  current: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const value = useCountUp(current, 1400, inView);

  return (
    <div ref={ref} className="flex items-end justify-center gap-4 flex-wrap">
      <span className="text-xl md:text-2xl text-white-pure/40 line-through font-hind-siliguri">
        ৳{original}
      </span>
      <span
        className={[
          "text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-none font-hind-siliguri",
          "text-gold-gradient",
          inView ? "luxe-countup-pop" : "",
        ].join(" ")}
      >
        ৳{inView ? value : 0}
      </span>
    </div>
  );
}

function useCountUp(end: number, duration = 1400, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    let begin: number | null = null;
    const step = (t: number) => {
      if (begin === null) begin = t;
      const progress = Math.min((t - begin) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.floor(eased * end));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, start]);
  return value;
}

function GoldCornerMark({
  className,
  rotate = 0,
}: {
  className?: string;
  rotate?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className ?? ""}
      style={{ transform: `rotate(${rotate}deg)` }}
      width="22"
      height="22"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M4 14 L4 4 L14 4 M4 4 Q11 11 18 5"
        stroke="rgb(212 160 23 / 0.55)"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="4" cy="4" r="1.4" fill="rgb(212 160 23 / 0.8)" />
    </svg>
  );
}
