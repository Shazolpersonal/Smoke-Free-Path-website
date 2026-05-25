"use client";

/**
 * SkipPill — the small bottom-right pill shown to:
 *   • returning visitors who have previously skipped or dismissed, and
 *   • first-time visitors who click "পরে শুনব" in the MemorialModal.
 *
 * Tapping the pill triggers `startListening("pill")` which morphs it
 * into the MiniPlayer. A dismiss (×) on the pill itself sets the
 * `sfp_audio_dismissed` flag and hides everything until localStorage
 * is cleared.
 */

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useAudioPlayer } from "./AudioProvider";
import { A11Y_TEXT } from "./audio-config";

export function SkipPill() {
  const { uiMode, reopenFromPill, dismissMiniPlayer, hasHeard } = useAudioPlayer();
  const reducedMotion = useReducedMotion();
  const visible = uiMode === "pill";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sfp-audio-pill"
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={
            reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 26 }
          }
          className="fixed bottom-4 right-4 z-40 flex items-center gap-2"
          data-testid="sfp-audio-pill"
        >
          <button
            type="button"
            onClick={reopenFromPill}
            className="group flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full bg-gradient-to-br from-[#10172a] to-[#0a0f1c] border border-[#D4A017]/30 text-[#faf8f1] shadow-lg hover:shadow-2xl hover:border-[#D4A017]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1c]/80 transition-all font-hind-siliguri text-sm"
            aria-label={hasHeard ? A11Y_TEXT.listenAgain : A11Y_TEXT.listenFirst}
            data-testid="sfp-audio-pill-play"
          >
            <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#10b981] text-white shrink-0 group-hover:bg-[#059669] transition-colors">
              {!reducedMotion && (
                <span className="absolute inset-0 rounded-full bg-[#10b981]/40 animate-ping" aria-hidden="true" />
              )}
              <svg
                viewBox="0 0 24 24"
                width="12"
                height="12"
                fill="currentColor"
                aria-hidden="true"
                className="translate-x-[1px]"
              >
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
            </span>
            <span>
              {hasHeard ? "🔁 আবার শুনুন" : "🎧 আব্বার কথা শুনুন"}
            </span>
          </button>
          <button
            type="button"
            onClick={dismissMiniPlayer}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017] transition"
            aria-label={A11Y_TEXT.close}
            title={A11Y_TEXT.close}
          >
            <svg
              viewBox="0 0 24 24"
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
