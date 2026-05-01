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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            className="text-center lg:text-left"
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

          {/* Right Column - Hero Image: animated sunrise over village road */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-white-pure/20 shadow-2xl ring-1 ring-gold-royal/20">
              {/*
                9-second looping SVG animation: dawn → sunrise → morning.
                Islamic adab: no living beings. Respects prefers-reduced-motion
                (internal SVG @media query renders a static morning scene).

                Using native <img> (not next/image) on purpose: the SVG contains
                internal <style> + CSS keyframe animations that must run in the
                browser; next/image optimization can strip or inline the SVG in
                ways that break the animation.
              */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/hero-sunrise.svg"
                alt="গ্রামের পথে সূর্যোদয় — নতুন দিনের সূচনা"
                width={800}
                height={800}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover select-none"
                draggable={false}
              />
              {/* Subtle top highlight to blend with hero gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white-pure/5" />
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
