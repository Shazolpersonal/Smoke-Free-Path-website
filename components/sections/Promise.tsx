"use client";

import { motion } from "framer-motion";
import { Shield, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { SectionWrapper } from "@/components/ui";
import { copyBn } from "@/content";

export function Promise() {
  return (
    <SectionWrapper id="promise" bgVariant="emerald">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          className="flex justify-center mb-8"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div className="p-5 bg-gold-royal/20 rounded-full border border-gold-royal/30 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
            <Shield className="w-16 h-16 text-gold-royal" />
          </div>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl font-bold text-charcoal mb-4 font-hind-siliguri"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {copyBn.promise.heading.replace("🛡️ ", "")}
        </motion.h2>

        <motion.h3
          className="text-xl md:text-2xl text-emerald-deep font-semibold mb-10 font-noto-sans-bengali"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {copyBn.promise.subHeading}
        </motion.h3>

        <motion.div
          className="bg-white-pure p-8 md:p-10 rounded-2xl shadow-xl border border-gold-royal/20 mb-10 text-left relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-lg text-charcoal/80 mb-8 whitespace-pre-line font-noto-sans-bengali leading-relaxed">
            {copyBn.promise.intro}
          </p>

          <h4 className="font-bold text-xl text-charcoal mb-6 font-hind-siliguri">{copyBn.promise.thenHeading}</h4>
          
          <ul className="space-y-4 mb-10">
            {copyBn.promise.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-deep shrink-0 mt-0.5" />
                <span className="text-lg text-charcoal/90 font-noto-sans-bengali">{benefit.replace("✓ ", "")}</span>
              </li>
            ))}
          </ul>

          <div className="bg-emerald-deep/5 p-6 md:p-8 rounded-xl border border-emerald-deep/10">
            <h4 className="font-bold text-lg text-emerald-deep mb-4 font-hind-siliguri">{copyBn.promise.whyHeading}</h4>
            <p className="text-charcoal/80 whitespace-pre-line text-base leading-relaxed font-noto-sans-bengali">
              {copyBn.promise.whyBody}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/policy/refund"
            className="inline-flex items-center justify-center text-emerald-deep hover:text-gold-royal underline underline-offset-4 font-semibold transition-colors font-noto-sans-bengali text-lg"
          >
            {copyBn.promise.cta}
          </Link>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
