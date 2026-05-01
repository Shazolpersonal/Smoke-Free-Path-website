"use client";

/**
 * AudioMount — decides which surface (modal / pill / mini / expanded) to
 * render based on `uiMode`. Also handles the global completion side-effects:
 *   1. highlights the price section with a gentle gold/emerald glow,
 *   2. smooth-scrolls to it,
 *   3. shows an 8-second thank-you toast.
 *
 * Dynamic imports keep the first-paint bundle small: returning visitors
 * who have dismissed the player never download the modal or expanded code.
 */

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useAudioPlayer } from "./AudioProvider";
import { AUDIO_CONFIG, A11Y_TEXT } from "./audio-config";

/** `ssr: false` — these components read `window` inside effects. */
const MemorialModal = dynamic(
  () => import("./MemorialModal").then((m) => m.MemorialModal),
  { ssr: false }
);
const MiniPlayer = dynamic(
  () => import("./MiniPlayer").then((m) => m.MiniPlayer),
  { ssr: false }
);
const SkipPill = dynamic(
  () => import("./SkipPill").then((m) => m.SkipPill),
  { ssr: false }
);
const ExpandedPlayer = dynamic(
  () => import("./ExpandedPlayer").then((m) => m.ExpandedPlayer),
  { ssr: false }
);

export function AudioMount() {
  const { hasHeard, hasSkipped, hasDismissed } = useAudioPlayer();
  const [toast, setToast] = useState<string | null>(null);

  // Listen for the custom completion event dispatched by AudioProvider.
  useEffect(() => {
    function onCompleted() {
      if (typeof document === "undefined") return;
      const el =
        document.getElementById(AUDIO_CONFIG.scrollTargetIdPrimary) ||
        document.getElementById(AUDIO_CONFIG.scrollTargetIdFallback);
      if (el) {
        el.classList.add("sfp-audio-completion-highlight");
        window.setTimeout(() => {
          el.classList.remove("sfp-audio-completion-highlight");
        }, 2400);
        window.setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 350);
      }
      setToast(A11Y_TEXT.completionToast);
      window.setTimeout(() => setToast(null), AUDIO_CONFIG.completionToastMs);
    }
    window.addEventListener("sfp:audio-completed", onCompleted as EventListener);
    return () =>
      window.removeEventListener("sfp:audio-completed", onCompleted as EventListener);
  }, []);

  /*
   * Only ship the MemorialModal bundle if the visitor hasn't yet decided
   * (heard / skipped / dismissed). Tiny bundle saving for returning users.
   */
  const shouldRenderModal = !hasHeard && !hasSkipped && !hasDismissed;

  return (
    <>
      {shouldRenderModal && <MemorialModal />}
      <SkipPill />
      <MiniPlayer />
      {/*
       * ExpandedPlayer is always rendered; its own AnimatePresence keeps
       * the DOM empty when uiMode !== "expanded". The dynamic import
       * above means the chunk loads on first client paint, not during SSR.
       */}
      <ExpandedPlayer />

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-5 left-1/2 -translate-x-1/2 z-[110] px-5 py-3 rounded-full bg-[#0F5132] text-[#FAFAF7] font-hind-siliguri text-sm shadow-2xl border border-[#D4A017]/40 sfp-audio-toast-in"
          data-testid="sfp-audio-completion-toast"
        >
          {toast}
        </div>
      )}
    </>
  );
}
