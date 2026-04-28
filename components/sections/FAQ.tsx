"use client";

import { motion } from "framer-motion";
import { SectionWrapper, FAQAccordion } from "@/components/ui";
import { faqItems } from "@/content";

export function FAQ() {
  return (
    <SectionWrapper id="faq" bgVariant="white">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-charcoal text-center mb-12 font-hind-siliguri"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          সাধারণ জিজ্ঞাসা
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FAQAccordion items={faqItems} />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
