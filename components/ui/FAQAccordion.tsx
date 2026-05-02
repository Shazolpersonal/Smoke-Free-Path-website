"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: readonly FAQItem[];
  className?: string;
}

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className={cn(
              "relative overflow-hidden rounded-2xl bg-white-pure",
              "border border-emerald-deep/15",
              "shadow-luxe-sm transition-[box-shadow,border-color,transform] duration-300",
              isOpen
                ? "shadow-luxe-md border-gold-royal/35"
                : "hover:shadow-luxe-md hover:border-emerald-deep/30",
            )}
          >
            {/* Golden accent bar that appears when open */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-500",
                isOpen
                  ? "bg-gradient-to-b from-gold-soft via-gold-royal to-gold-soft opacity-100"
                  : "bg-transparent opacity-0",
              )}
            />

            <button
              onClick={() => toggleItem(item.id)}
              className={cn(
                "w-full pl-6 pr-5 py-5 text-left",
                "flex items-center justify-between gap-4",
                "transition-colors duration-200",
                "hover:bg-emerald-deep/[0.03]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-royal focus-visible:ring-inset",
              )}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
            >
              <span className="text-lg font-semibold text-charcoal font-hind-siliguri leading-snug">
                {item.question}
              </span>
              <motion.span
                className={cn(
                  "flex-shrink-0 w-9 h-9 rounded-full",
                  "flex items-center justify-center text-xl",
                  "border transition-colors duration-300",
                  isOpen
                    ? "bg-gold-royal text-white-pure border-gold-royal shadow-gold-glow-soft"
                    : "bg-emerald-deep/5 text-emerald-deep border-emerald-deep/20",
                )}
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden="true"
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-answer-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.32,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="overflow-hidden"
                >
                  <div className="pl-6 pr-5 pb-5 text-charcoal/80 leading-relaxed border-t border-emerald-deep/10 pt-4 font-noto-bengali">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
