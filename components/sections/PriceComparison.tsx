"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui";
import { copyBn } from "@/content";

export function PriceComparison() {
  return (
    <SectionWrapper id="price-comparison" bgVariant="dark">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-hind-siliguri text-gold-royal">
          {copyBn.priceComparison.heading}
        </h2>

        {/* Cost Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {copyBn.priceComparison.items.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white-pure/5 p-6 rounded-xl border border-white-pure/10 flex flex-col items-center justify-center text-center hover:border-white-pure/20 transition-colors"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-white-pure/70 mb-2 font-noto-sans-bengali text-sm md:text-base">{item.label}</span>
              <span className="text-2xl md:text-3xl font-bold text-red-alert font-hind-siliguri">{item.value}</span>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="text-center text-white-pure/20 mb-12 select-none hidden md:block">
          {copyBn.priceComparison.divider}
        </div>

        {/* Bottom Section */}
        <motion.div
          className="bg-gradient-to-br from-gold-royal/20 to-transparent border border-gold-royal/30 p-8 md:p-12 rounded-2xl text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-9xl text-gold-royal">৳</span>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-white-pure font-hind-siliguri">
              {copyBn.priceComparison.appPriceHeading}
            </h3>
            <ul className="space-y-4 mb-8 inline-block text-left">
              {copyBn.priceComparison.benefits.map((benefit, index) => (
                <li key={index} className="text-lg md:text-xl text-gold-royal font-hind-siliguri flex items-center gap-2">
                  {benefit}
                </li>
              ))}
            </ul>
            <p className="text-xl md:text-2xl italic text-white-pure/90 font-noto-sans-bengali mt-4 border-t border-white-pure/10 pt-8">
              "{copyBn.priceComparison.quote}"
            </p>
          </div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
