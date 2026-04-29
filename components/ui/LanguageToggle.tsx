"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Lang = "bn" | "en";

interface LanguageToggleProps {
  current?: Lang;
  onChange?: (lang: Lang) => void;
  className?: string;
}

// --- External-store adapter for the "language" localStorage key ---------
//
// React's recommended way to read from an external data source (like
// localStorage, a browser API, or a third-party store) is
// `useSyncExternalStore`. It avoids the hydration mismatch and
// cascading-render problems that `useState + useEffect + setState`
// produces.

const LANG_STORAGE_KEY = "language";
const LANG_CHANGE_EVENT = "smokefree:language-change";

function subscribe(callback: () => void) {
  // Fires in OTHER tabs when localStorage changes:
  window.addEventListener("storage", callback);
  // Fires in THIS tab when we dispatch it from handleToggle:
  window.addEventListener(LANG_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LANG_CHANGE_EVENT, callback);
  };
}

function getSnapshot(): Lang {
  const saved = localStorage.getItem(LANG_STORAGE_KEY);
  return saved === "en" ? "en" : "bn";
}

// During server-render / static export there is no window - always default
// to the site's primary language so the SSR HTML matches client first paint.
function getServerSnapshot(): Lang {
  return "bn";
}

export function LanguageToggle({
  current: controlledCurrent,
  onChange,
  className,
}: LanguageToggleProps) {
  const storedLang = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  // Controlled value (if parent passed one) takes precedence; otherwise we
  // use the value read from localStorage via useSyncExternalStore.
  const activeLang = controlledCurrent ?? storedLang;

  const handleToggle = (lang: Lang) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
      // Manually notify THIS tab so useSyncExternalStore re-reads.
      window.dispatchEvent(new Event(LANG_CHANGE_EVENT));
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
