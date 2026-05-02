"use client";

import { motion } from "framer-motion";
import {
  SectionWrapper,
  CTAButton,
  PriceBadge,
  LuxeBackground,
} from "@/components/ui";
import { copyBn, pricing } from "@/content";
import { EASE_LUXE } from "@/lib/motion";

export function Hero() {
  return (
    <SectionWrapper
      id="hero"
      bgVariant="transparent"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
    >
      {/* Luxe animated background — drifting orbs + gradient mesh + noise */}
      <LuxeBackground variant="hero" />

      {/* Price Badge - Top Right */}
      <motion.div
        className="absolute top-4 right-4 md:top-8 md:right-8 z-20"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: EASE_LUXE }}
      >
        <PriceBadge
          original={pricing.original}
          discount={pricing.launch}
          label={copyBn.hero.priceLabel}
          tone="dark"
        />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 w-full pt-20 md:pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            className="text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_LUXE }}
          >
            {/* Kicker pill */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full luxe-glass border border-gold-royal/30"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: EASE_LUXE }}
            >
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 rounded-full bg-gold-royal"
              />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-glow font-inter">
                ৪১ দিনের যাত্রা
              </span>
            </motion.div>

            {/* Headline — with gradient shine on the first line */}
            <h1 className="text-4xl md:text-5xl lg:text-[3.6rem] font-bold text-white-pure mb-6 leading-[1.15] font-hind-siliguri whitespace-pre-line tracking-tight">
              {copyBn.hero.headline}
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-white-pure/90 mb-3 font-noto-bengali leading-relaxed">
              {copyBn.hero.subheadline}
            </p>

            {/* Supporting Text */}
            <p className="text-base md:text-lg text-white-pure/70 mb-10 font-noto-bengali leading-relaxed max-w-xl mx-auto lg:mx-0">
              {copyBn.hero.supporting}
            </p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: EASE_LUXE }}
            >
              <CTAButton variant="luxe" href="/checkout" size="lg" pulse>
                {copyBn.hero.primaryCta}
              </CTAButton>
              <CTAButton
                variant="luxe-outline"
                href="/gift"
                size="lg"
                className="text-gold-glow border-gold-royal/50 hover:bg-gold-royal/15"
              >
                {copyBn.hero.secondaryCta}
              </CTAButton>
            </motion.div>

            {/* Below CTA Text */}
            <motion.p
              className="text-sm md:text-base text-white-pure/60 font-noto-bengali flex items-center justify-center lg:justify-start gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
            >
              <span
                aria-hidden="true"
                className="w-4 h-px bg-gold-royal/50"
              />
              {copyBn.hero.belowCta}
              <span
                aria-hidden="true"
                className="w-4 h-px bg-gold-royal/50"
              />
            </motion.p>
          </motion.div>

          {/*
            Right Column — 9-second animated presentation of the bundle.
            Preserved as-is per brief: we only restyle the FRAME around the
            SVG, never the SVG itself.
          */}
          <motion.div
            className="order-1 lg:order-2 w-full mx-auto max-w-md lg:max-w-none"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE_LUXE }}
          >
            <div className="relative">
              {/* Outer gold glow aura */}
              <div
                aria-hidden="true"
                className="absolute -inset-1 rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-br from-gold-royal/30 via-gold-glow/15 to-emerald-bright/30 blur-xl opacity-70"
              />

              {/* Frame */}
              <div
                className={[
                  "relative mx-auto overflow-hidden",
                  "aspect-[4/3] sm:aspect-square",
                  "rounded-2xl sm:rounded-3xl",
                  "border border-gold-royal/40 lg:border-2",
                  "shadow-[0_30px_60px_rgba(6,24,18,0.55),0_0_48px_rgba(212,160,23,0.25)]",
                  "ring-1 ring-gold-royal/30",
                ].join(" ")}
              >
                {/*
                  Native <img> (not next/image) is intentional: the SVG has
                  internal <style> + CSS keyframes that drive the animation.
                  next/image optimization can strip/inline SVGs in ways that
                  break the animation. PRESERVED EXACTLY.
                */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand/hero-sunrise.svg"
                  alt="ধোঁয়া-মুক্ত পথ — তিনটি অ্যাপ (মুহূর্ত ব্রেথ, পদক্ষেপ, ৩৬৯), ৪১ দিনের যাত্রা, ৳৩৬৯ লঞ্চ মূল্য"
                  width={1000}
                  height={1000}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover select-none"
                  draggable={false}
                />
                {/* Subtle top highlight to blend with hero gradient */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white-pure/5"
                />
                {/* Inner gold hairline */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-1 rounded-[calc(1.5rem-4px)] sm:rounded-[calc(2rem-4px)] ring-1 ring-inset ring-gold-royal/15"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint — decorative */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gold-royal/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <span className="text-[10px] uppercase tracking-[0.32em] font-inter font-semibold">
          Begin
        </span>
        <svg
          className="luxe-scroll-chevron w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </SectionWrapper>
  );
}
