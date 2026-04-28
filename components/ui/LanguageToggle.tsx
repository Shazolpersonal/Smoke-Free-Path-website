"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  current?: "bn" | "en";
  onChange?: (lang: "bn" | "en") => void;
  className?: string;
}

export function LanguageToggle({
  current: controlledCurrent,
  onChange,
  className,
}: LanguageToggleProps) {
  const [current, setCurrent] = useState<"bn" | "en">("bn");

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language") as "bn" | "en" | null;
      if (saved) {
        setCurrent(saved);
      }
    }
  }, []);

  // Use controlled value if provided
  const activeLang = controlledCurrent || current;

  const handleToggle = (lang: "bn" | "en") => {
    setCurrent(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
    }
    onChange?.(lang);
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 p-1 rounded-lg bg-charcoal/5",
        className
      )}
      role="group"
      aria-label="ভাষা নির্বাচন করুন"
    >
      <button
        onClick={() => handleToggle("bn")}
        className={cn(
          "relative px-4 py-2 rounded-md font-semibold text-sm transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-emerald-deep focus:ring-offset-1",
          activeLang === "bn"
            ? "text-white-pure"
            : "text-charcoal/60 hover:text-charcoal"
        )}
        aria-pressed={activeLang === "bn"}
      >
        {activeLang === "bn" && (
          <motion.div
            layoutId="language-indicator"
            className="absolute inset-0 bg-emerald-deep rounded-md"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <span className="relative z-10">বাং</span>
      </button>

      <button
        onClick={() => handleToggle("en")}
        className={cn(
          "relative px-4 py-2 rounded-md font-semibold text-sm transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-emerald-deep focus:ring-offset-1",
          activeLang === "en"
            ? "text-white-pure"
            : "text-charcoal/60 hover:text-charcoal"
        )}
        aria-pressed={activeLang === "en"}
      >
        {activeLang === "en" && (
          <motion.div
            layoutId="language-indicator"
            className="absolute inset-0 bg-emerald-deep rounded-md"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <span className="relative z-10">EN</span>
      </button>
    </div>
  );
}
