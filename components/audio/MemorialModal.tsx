"use client";

/**
 * MemorialModal — the first-visit invitation to listen.
 *
 * Islamic adab guarantees (hard-coded here):
 *   • Never autoplays audio — requires an explicit user tap.
 *   • Skip button ("পরে শুনব") is always visible and focusable.
 *   • ESC closes via skip (no forced gate).
 *   • Backdrop uses abstract geometric SVG only (no living beings).
 */

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useAudioPlayer } from "./AudioProvider";
import { A11Y_TEXT } from "./audio-config";

export function MemorialModal() {
  const { uiMode, startListening, skipFromModal } = useAudioPlayer();
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const playBtnRef = useRef<HTMLButtonElement>(null);

  const isOpen = uiMode === "modal";

  // Focus management + keyboard trap (+ ESC closes via skip).
  useEffect(() => {
    if (!isOpen) return;
    const prevActive = (typeof document !== "undefined" ? document.activeElement : null) as HTMLElement | null;
    const focusTimer = window.setTimeout(() => playBtnRef.current?.focus(), 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        skipFromModal();
        return;
      }
      if (e.key !== "Tab" || !containerRef.current) return;
      const focusable = containerRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      try {
        prevActive?.focus?.();
      } catch {
        /* ignore */
      }
    };
  }, [isOpen, skipFromModal]);

  const fadeTransition = reducedMotion
    ? { duration: 0 }
    : ({ duration: 0.5, ease: [0.22, 1, 0.36, 1] } as const);
  const cardTransition = reducedMotion
    ? { duration: 0 }
    : ({ duration: 0.6, ease: [0.22, 1, 0.36, 1] } as const);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={fadeTransition}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sfp-memorial-title"
          aria-describedby="sfp-memorial-desc"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1c] via-[#151b2e] to-[#07091a]">
            <IslamicPatternOverlay />
            {/* Soft gold glow behind card */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[560px] h-[560px] bg-[#D4A017]/10 blur-[120px] rounded-full pointer-events-none" />
          </div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={cardTransition}
            className="relative z-10 w-full max-w-md rounded-3xl bg-gradient-to-b from-[#10172a]/95 to-[#0a0f1c]/95 backdrop-blur-xl border border-[#D4A017]/25 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] p-7 md:p-10"
          >
            {/* Memorial header */}
            <div className="text-center mb-6">
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#D4A017]/80 mb-2">
                {A11Y_TEXT.memorialRibbon}
              </p>
              <p
                id="sfp-memorial-desc"
                className="font-hind-siliguri text-[15px] text-[#faf8f1]/90"
              >
                {A11Y_TEXT.memorialLine}
              </p>
              <p className="text-xs text-[#faf8f1]/50 mt-1 font-noto-bengali">
                {A11Y_TEXT.memorialDates}
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6" aria-hidden="true">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D4A017]/30 to-transparent" />
              <span className="text-[#D4A017]/70">◆</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D4A017]/30 to-transparent" />
            </div>

            {/* Title */}
            <h2
              id="sfp-memorial-title"
              className="text-2xl md:text-3xl font-bold text-center text-[#faf8f1] mb-3 font-hind-siliguri leading-tight"
            >
              {A11Y_TEXT.modalTitle}
            </h2>
            <p className="text-center text-[#faf8f1]/70 mb-8 font-noto-bengali text-base">
              {A11Y_TEXT.modalSubtitle}
            </p>

            {/* Play button (no music, just speech) */}
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                {!reducedMotion && (
                  <>
                    <motion.span
                      className="absolute inset-0 rounded-full bg-[#10b981]/25"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
                      aria-hidden="true"
                    />
                    <motion.span
                      className="absolute inset-[-6px] rounded-full bg-[#D4A017]/20"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0, 0.35] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                      aria-hidden="true"
                    />
                  </>
                )}
                <motion.button
                  ref={playBtnRef}
                  type="button"
                  onClick={() => startListening("modal")}
                  whileHover={reducedMotion ? undefined : { scale: 1.05 }}
                  whileTap={reducedMotion ? undefined : { scale: 0.97 }}
                  className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#10b981] to-[#059669] shadow-[0_0_40px_#10b98155] flex items-center justify-center text-white hover:shadow-[0_0_60px_#10b98188] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D4A017]/60 transition-shadow"
                  aria-label={`${A11Y_TEXT.play} — ${A11Y_TEXT.modalTitle}`}
                  data-testid="sfp-audio-modal-play"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="30"
                    height="30"
                    fill="currentColor"
                    aria-hidden="true"
                    className="translate-x-[2px]"
                  >
                    <path d="M8 5v14l11-7L8 5z" />
                  </svg>
                </motion.button>
              </div>

              <p className="text-xs text-[#faf8f1]/55 text-center font-noto-bengali">
                {A11Y_TEXT.trustMicro}
              </p>

              <button
                type="button"
                onClick={skipFromModal}
                className="text-sm text-[#faf8f1]/60 hover:text-[#D4A017] underline underline-offset-4 decoration-dotted focus-visible:outline-none focus-visible:text-[#D4A017] font-noto-bengali transition-colors"
                aria-label={A11Y_TEXT.skipModal}
                data-testid="sfp-audio-modal-skip"
              >
                {A11Y_TEXT.skipModal}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Inline SVG pattern — star & interlocking lines, no figurative imagery.
 * Rendered at low opacity as decorative backdrop.
 */
function IslamicPatternOverlay() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.07] mix-blend-screen pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="sfp-islamic-pat"
          width="120"
          height="120"
          patternUnits="userSpaceOnUse"
        >
          <g fill="none" stroke="#D4A017" strokeWidth="0.7">
            {/* Eight-pointed star (Rub el Hizb) */}
            <path d="M60 10 L73 45 L108 45 L80 68 L91 103 L60 82 L29 103 L40 68 L12 45 L47 45 Z" />
            <circle cx="60" cy="60" r="6" />
            <path d="M0 60 L120 60 M60 0 L60 120" strokeWidth="0.3" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#sfp-islamic-pat)" />
    </svg>
  );
}
