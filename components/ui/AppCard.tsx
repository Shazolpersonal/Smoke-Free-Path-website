"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AppCardProps {
  theme: "blue" | "emerald" | "gold";
  emoji: string;
  name: string;
  tagline: string;
  description: string;
  screenshotSrc?: string;
  demoLink?: string;
  className?: string;
}

const themeStyles = {
  blue: {
    bg: "bg-blue-serenity/10",
    border: "border-blue-serenity",
    text: "text-blue-serenity",
  },
  emerald: {
    bg: "bg-emerald-deep/10",
    border: "border-emerald-deep",
    text: "text-emerald-deep",
  },
  gold: {
    bg: "bg-gold-royal/10",
    border: "border-gold-royal",
    text: "text-gold-royal",
  },
};

export function AppCard({
  theme,
  emoji,
  name,
  tagline,
  description,
  screenshotSrc,
  demoLink,
  className,
}: AppCardProps) {
  const styles = themeStyles[theme];

  return (
    <motion.div
      className={cn(
        "flex flex-col p-6 rounded-xl border-2",
        "transition-all duration-300",
        styles.bg,
        styles.border,
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}
    >
      {/* Icon */}
      <div className="text-5xl mb-4">{emoji}</div>

      {/* Title & Tagline */}
      <h3 className="text-2xl font-bold text-charcoal mb-2">{name}</h3>
      <p className={cn("text-lg font-semibold mb-4", styles.text)}>
        "{tagline}"
      </p>

      {/* Description */}
      <p className="text-charcoal/80 mb-6 whitespace-pre-line leading-relaxed">
        {description}
      </p>

      {/* Screenshot */}
      {screenshotSrc && (
        <div className="relative w-full aspect-[9/16] mb-4 rounded-lg overflow-hidden bg-charcoal/5">
          <Image
            src={screenshotSrc}
            alt={`${name} স্ক্রিনশট`}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Demo Link */}
      {demoLink && (
        <a
          href={demoLink}
          className={cn(
            "inline-flex items-center gap-2 font-semibold",
            "hover:underline transition-colors",
            styles.text
          )}
          aria-label={`${name} ডেমো দেখুন`}
        >
          ডেমো দেখুন →
        </a>
      )}
    </motion.div>
  );
}
