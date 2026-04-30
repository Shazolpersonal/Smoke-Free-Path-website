"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionWrapper, ShareBar } from "@/components/ui";
import { copyBn } from "@/content";
import { SITE_URL } from "@/lib/config";

export function FinalCTA() {
  return (
    <SectionWrapper id="final-cta" bgVariant="emerald" className="border-t border-emerald-deep/10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-charcoal mb-8 font-hind-siliguri"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {copyBn.finalCta.heading}
        </motion.h2>

        <motion.div
          className="bg-white-pure p-8 md:p-12 rounded-2xl shadow-lg border border-gold-royal/20 mb-12 text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-lg md:text-xl text-charcoal/90 leading-relaxed font-noto-sans-bengali whitespace-pre-line">
            {copyBn.finalCta.body}
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/checkout"
            className="w-full sm:w-auto px-8 py-4 bg-red-alert text-white-pure rounded-xl font-bold text-lg shadow-lg hover:-translate-y-1 hover:shadow-red-alert/30 transition-all duration-300 font-noto-sans-bengali"
          >
            {copyBn.finalCta.primaryCta}
          </Link>
          <Link
            href="/checkout?gift=true"
            className="w-full sm:w-auto px-8 py-4 bg-white-pure text-charcoal border-2 border-charcoal/10 rounded-xl font-bold text-lg hover:-translate-y-1 hover:border-gold-royal hover:text-gold-royal transition-all duration-300 font-noto-sans-bengali"
          >
            {copyBn.finalCta.secondaryCta}
          </Link>
        </motion.div>

        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <ShareBar
            url={SITE_URL}
            message={copyBn.hero.headline}
            className="justify-center"
          />
        </motion.div>

        <motion.p
          className="text-sm text-charcoal/60 font-noto-sans-bengali"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {copyBn.finalCta.microtext}
        </motion.p>
      </div>
    </SectionWrapper>
  );
}
