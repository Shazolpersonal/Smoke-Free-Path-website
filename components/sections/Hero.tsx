"use client";

import { motion } from "framer-motion";
import { SectionWrapper, CTAButton, PriceBadge } from "@/components/ui";
import { copyBn, pricing } from "@/content";

export function Hero() {
  return (
    <SectionWrapper
      id="hero"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-emerald-deep via-emerald-deep/90 to-gold-royal/30"
    >
      {/* Subtle Islamic geometric pattern overlay */}
      <div className="absolute inset-0 opacity-5 bg-[url('/patterns/islamic-geometric.svg')] bg-repeat" />

      {/* Price Badge - Top Right */}
      <motion.div
        className="absolute top-4 right-4 md:top-8 md:right-8 z-10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <PriceBadge
          original={pricing.original}
          discount={pricing.launch}
          label={copyBn.hero.priceLabel}
        />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text Content (order-2 on mobile so animation shows first) */}
          <motion.div
            className="text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white-pure mb-6 leading-tight font-hind-siliguri whitespace-pre-line">
              {copyBn.hero.headline}
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-white-pure/90 mb-4 font-noto-sans-bengali">
              {copyBn.hero.subheadline}
            </p>

            {/* Supporting Text */}
            <p className="text-lg md:text-xl text-white-pure/80 mb-8 font-noto-sans-bengali">
              {copyBn.hero.supporting}
            </p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <CTAButton variant="primary" href="/checkout" size="lg">
                {copyBn.hero.primaryCta}
              </CTAButton>
              <CTAButton
                variant="secondary"
                href="/gift"
                size="lg"
                className="border-white-pure text-white-pure hover:bg-white-pure/10"
              >
                {copyBn.hero.secondaryCta}
              </CTAButton>
            </motion.div>

            {/* Below CTA Text */}
            <motion.p
              className="text-sm md:text-base text-white-pure/70 font-noto-sans-bengali"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {copyBn.hero.belowCta}
            </motion.p>
          </motion.div>

          {/*
            Right Column — 9-second animated presentation of the bundle.
            Shown on ALL devices:
              • mobile  : order-1 (above text), aspect [4/3] banner
              • tablet  : aspect-square, max-width constrained
              • desktop : order-2 (right of text), aspect-square

            The SVG tells a 7-scene story in 9 seconds:
              1. Brand reveal       (0.0–1.5s)
              2. The promise        (1.5–2.5s)
              3. App 1: মুহূর্ত ব্রেথ    (2.5–4.0s)
              4. App 2: পদক্ষেপ     (4.0–5.5s)
              5. App 3: ৩৬৯         (5.5–7.0s)
              6. Price: ৳৩৬৯         (7.0–8.3s)
              7. Call to action     (8.3–9.0s)
            Islamic adab: no living beings. Respects prefers-reduced-motion.
          */}
          <motion.div
            className="order-1 lg:order-2 w-full mx-auto max-w-md lg:max-w-none"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className={[
                "relative mx-auto overflow-hidden",
                "aspect-[4/3] sm:aspect-square",
                "rounded-2xl sm:rounded-3xl",
                "border border-white-pure/20 lg:border-2",
                "shadow-2xl ring-1 ring-gold-royal/25",
              ].join(" ")}
            >
              {/*
                Native <img> (not next/image) is intentional: the SVG has
                internal <style> + CSS keyframes that drive the animation.
                next/image optimization can strip/inline SVGs in ways that
                break the animation.
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
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
