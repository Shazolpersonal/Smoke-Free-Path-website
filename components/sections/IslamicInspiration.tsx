"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionWrapper, IslamicQuote } from "@/components/ui";
import { copyBn } from "@/content";

export function IslamicInspiration() {
  return (
    <SectionWrapper id="islamic-inspiration" bgVariant="emerald" className="relative overflow-hidden">
      {/* SVG Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #042f2e 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
      
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-charcoal mb-12 font-hind-siliguri"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {copyBn.islamic.heading}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <IslamicQuote
            arabic={copyBn.islamic.arabicQuote}
            translation={copyBn.islamic.translation}
            source={copyBn.islamic.source}
            className="bg-white-pure"
          />
        </motion.div>

        <motion.div
          className="text-lg md:text-xl text-charcoal/80 mb-12 font-noto-sans-bengali leading-relaxed whitespace-pre-line text-left md:text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {copyBn.islamic.body}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            href="/checkout?gift=true"
            className="inline-block bg-gold-royal text-charcoal font-bold px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:-translate-y-1 transition-all duration-300 font-noto-sans-bengali text-lg"
          >
            {copyBn.islamic.cta}
          </Link>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
