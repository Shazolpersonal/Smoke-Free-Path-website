"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
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

        {/* Cost Breakdown - Ascending Chart Layout */}
        <div className="relative w-full max-w-5xl mx-auto mb-20 px-4">
          <div className="flex flex-col md:flex-row items-end justify-between gap-4 md:gap-2 h-auto md:h-[400px] mt-12 mb-8">
            {copyBn.priceComparison.items.map((item, index) => {
              // Calculate height for desktop ascending bars (min 20%, max 100%)
              const heightPercent = 25 + (index * (75 / (copyBn.priceComparison.items.length - 1)));
              const isLast = index === copyBn.priceComparison.items.length - 1;

              return (
                <motion.div
                  key={index}
                  className={[
                    "relative group w-full md:w-1/5 flex flex-col md:justify-end",
                    "rounded-2xl md:rounded-t-2xl md:rounded-b-none",
                    "transition-all duration-500",
                  ].join(" ")}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.15,
                    ease: EASE_LUXE,
                  }}
                >
                  {/* Mobile Layout (Horizontal Card) */}
                  <div className={[
                    "md:hidden p-5 rounded-2xl flex items-center justify-between border",
                    isLast
                      ? "bg-red-alert/10 border-red-alert/30 shadow-[0_0_20px_rgba(239,68,68,0.15)]"
                      : "luxe-glass border-white-pure/10"
                  ].join(" ")}>
                    <span className="text-white-pure/80 font-noto-bengali text-base">
                      {item.label}
                    </span>
                    <span className={[
                      "font-bold font-hind-siliguri text-xl",
                      isLast ? "text-red-500 text-2xl" : "text-white-pure"
                    ].join(" ")}>
                      {item.value}
                    </span>
                  </div>

                  {/* Desktop Layout (Ascending Bars) */}
                  <div className="hidden md:flex flex-col items-center w-full h-full justify-end group-hover:-translate-y-2 transition-transform duration-500">
                    <div className="text-center mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -top-12 w-[150%] left-1/2 -translate-x-1/2">
                      <span className="block text-white-pure/60 text-sm font-noto-bengali">
                        {item.label}
                      </span>
                    </div>

                    <span className={[
                      "block text-2xl lg:text-3xl font-bold font-hind-siliguri mb-4 z-10 transition-colors duration-300",
                      isLast ? "text-red-alert scale-110" : "text-white-pure/90 group-hover:text-gold-royal"
                    ].join(" ")}>
                      {item.value}
                    </span>

                    <motion.div
                      className={[
                        "w-full rounded-t-2xl relative overflow-hidden",
                        isLast
                          ? "bg-gradient-to-t from-red-alert/5 to-red-alert/20 border-t border-x border-red-alert/40 shadow-[0_-10px_30px_rgba(239,68,68,0.15)]"
                          : "bg-gradient-to-t from-white-pure/5 to-white-pure/10 border-t border-x border-white-pure/10 group-hover:border-gold-royal/30"
                      ].join(" ")}
                      style={{ height: `${heightPercent}%` }}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${heightPercent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                    >
                      {/* Animated inner gradient for last item */}
                      {isLast && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-transparent via-red-alert/10 to-transparent"
                          animate={{ y: ["100%", "-100%"] }}
                          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                        />
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop base line */}
          <div className="hidden md:block w-full h-px bg-gradient-to-r from-transparent via-white-pure/20 to-transparent" />

          {/* Desktop Labels under the bars */}
          <div className="hidden md:flex justify-between mt-4 px-2">
             {copyBn.priceComparison.items.map((item, index) => (
                <div key={`label-${index}`} className="w-1/5 text-center">
                  <span className={[
                    "font-noto-bengali text-sm",
                    index === copyBn.priceComparison.items.length - 1 ? "text-red-400 font-medium" : "text-white-pure/60"
                  ].join(" ")}>
                    {item.label}
                  </span>
                </div>
             ))}
          </div>
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
      <motion.span
        className={[
          "text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-none font-hind-siliguri",
          "text-gold-gradient",
          inView ? "luxe-countup-pop" : "",
        ].join(" ")}
      >
        ৳<motion.span>{inView ? value : 0}</motion.span>
      </motion.span>
    </div>
  );
}

// ⚡ Bolt Optimization:
// Problem: Frequent `useState` updates inside a `requestAnimationFrame` loop caused
// unnecessary React re-renders for the entire `PriceReveal` component (~60fps during 1.4s).
// Solution: Replaced `useState` with Framer Motion's `useMotionValue` and `animate`
// to directly manipulate the DOM node without triggering a React render cycle.
// Impact: Minimizes CPU overhead and React reconciliation costs by keeping the animation purely in the DOM.
function useCountUp(end: number, duration = 1400, start = false) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    if (!start) return;
    const controls = animate(count, end, {
      duration: duration / 1000,
      ease: [0.25, 1, 0.5, 1], // easeOutQuart
    });
    return controls.stop;
  }, [count, end, duration, start]);

  return rounded;
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
