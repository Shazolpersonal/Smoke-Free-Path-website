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

          {/* Right Column - Hero Image Placeholder */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white-pure/10 backdrop-blur-sm border-2 border-white-pure/20 shadow-2xl">
              {/* Placeholder for hero image - sunrise over village road */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white-pure/50">
                  <svg
                    className="w-32 h-32 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <p className="text-sm">Hero Image: Sunrise over village road</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
