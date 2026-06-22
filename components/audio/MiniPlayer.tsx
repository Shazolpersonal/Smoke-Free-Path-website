"use client";

/**
 * MiniPlayer — persistent bottom-right audio controller.
 *
 * - Drag-to-reposition on mobile (vertical), leaves the CTA unblocked.
 * - Expand button opens the ExpandedPlayer overlay.
 * - Close (×) pauses playback and sets `sfp_audio_dismissed`.
 * - Ticker progress bar along the top of the card.
 * - Accessible as a labelled region with live-region announcements.
 */

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useDragControls,
  useReducedMotion,
} from "framer-motion";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useAudioPlayer } from "./AudioProvider";
import { AUDIO_CONFIG, A11Y_TEXT } from "./audio-config";

function formatTime(seconds: number): string {
  const s = !isFinite(seconds) || seconds < 0 ? 0 : seconds;
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${String(r).padStart(2, "0")}`;
}

export function MiniPlayer() {
  const {
    uiMode,
    state,
    toggle,
    expand,
    dismissMiniPlayer,
    currentChapter,
  } = useAudioPlayer();
  const reducedMotion = useReducedMotion();
  const dragControls = useDragControls();

  // Show whenever there is an active playback surface OR user has expanded it
  // (we keep MiniPlayer mounted behind ExpandedPlayer so returning via Esc
  // shows the same player without a remount flicker).
  const visible = uiMode === "mini" || uiMode === "expanded";
  const progress =
    state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0;
  const subtitle = currentChapter?.title ?? AUDIO_CONFIG.subtitle;

  const handleDragPointerDown = (
    e: ReactPointerEvent<HTMLButtonElement>
  ) => {
    if (reducedMotion) return;
    dragControls.start(e);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sfp-audio-mini"
          initial={{ opacity: 0, y: 90 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 90 }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 240, damping: 28, mass: 0.8 }
          }
          drag={reducedMotion ? false : "y"}
          dragConstraints={{ top: -180, bottom: 40 }}
          dragElastic={0.15}
          dragControls={dragControls}
          dragListener={false}
          /*
           * When the expanded overlay is open we still render this mini
           * player underneath (so the dismiss-to-mini animation is smooth)
           * but keep it visually hidden and inert to avoid focus traps.
           */
          style={uiMode === "expanded" ? { opacity: 0, pointerEvents: "none" } : undefined}
          aria-hidden={uiMode === "expanded" ? "true" : undefined}
          className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-[360px] z-40"
          role="region"
          aria-label={A11Y_TEXT.playerRegion}
          data-testid="sfp-audio-mini"
        >
          <div className="relative bg-gradient-to-br from-[#10172a]/95 to-[#0a0f1c]/95 backdrop-blur-xl border border-[#D4A017]/20 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)] rounded-2xl overflow-hidden">
            {/* Progress bar (top strip) */}
            <div
              className="h-[3px] bg-white/10"
              role="progressbar"
              aria-label={A11Y_TEXT.seek}
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuetext={`${formatTime(state.currentTime)} / ${formatTime(
                state.duration
              )}`}
            >
              <div
                className="h-full bg-gradient-to-r from-[#10b981] to-[#D4A017] transition-[width] duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center gap-3 p-3">
              {/* Drag handle / cover */}
              <button
                type="button"
                onPointerDown={handleDragPointerDown}
                className="shrink-0 relative w-12 h-12 rounded-lg overflow-hidden bg-[#0a0f1c] touch-none cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017]"
                aria-label={A11Y_TEXT.drag}
                title={A11Y_TEXT.drag}
              >
                <Image
                  src={AUDIO_CONFIG.coverImage}
                  alt=""
                  width={48}
                  height={48}
                  className="object-cover w-12 h-12"
                  unoptimized
                />
                <span className="absolute inset-0 bg-black/20" aria-hidden="true" />
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-[2px]" aria-hidden="true">
                  <span className="w-[3px] h-[3px] rounded-full bg-white/60" />
                  <span className="w-[3px] h-[3px] rounded-full bg-white/60" />
                  <span className="w-[3px] h-[3px] rounded-full bg-white/60" />
                </span>
              </button>

              {/* Title + subtitle */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#faf8f1] truncate font-hind-siliguri leading-tight">
                  {AUDIO_CONFIG.title}
                </p>
                <p className="text-[11px] text-[#faf8f1]/60 truncate font-noto-bengali mt-0.5">
                  {subtitle} · {formatTime(state.currentTime)} / {formatTime(state.duration)}
                </p>
              </div>

              {/* Play/Pause */}
              <button
                type="button"
                onClick={toggle}
                className="shrink-0 w-9 h-9 rounded-full bg-[#10b981] hover:bg-[#059669] text-white flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017] transition-colors"
                aria-pressed={state.isPlaying}
                aria-label={A11Y_TEXT.playToggle}
                title={state.isPlaying ? A11Y_TEXT.pause : A11Y_TEXT.play}
                data-testid="sfp-audio-mini-toggle"
              >
                {state.isPlaying ? (
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                    <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" className="translate-x-[1px]">
                    <path d="M8 5v14l11-7L8 5z" />
                  </svg>
                )}
              </button>

              {/* Expand */}
              <button
                type="button"
                onClick={expand}
                className="shrink-0 w-8 h-8 rounded-lg text-[#faf8f1]/70 hover:text-[#D4A017] hover:bg-white/5 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017] transition-colors"
                aria-label={A11Y_TEXT.expand}
                title={A11Y_TEXT.expand}
                data-testid="sfp-audio-mini-expand"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path
                    d="M4 14v6h6M20 10V4h-6M4 20l7-7M20 4l-7 7"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {/* Dismiss */}
              <button
                type="button"
                onClick={dismissMiniPlayer}
                className="shrink-0 w-7 h-7 rounded-lg text-[#faf8f1]/50 hover:text-[#B8342D] hover:bg-white/5 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017] transition-colors"
                aria-label={A11Y_TEXT.close}
                title={A11Y_TEXT.close}
                data-testid="sfp-audio-mini-close"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Live region for screen readers */}
            <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
              {state.isPlaying ? "অডিও চালু আছে" : state.isReady ? "অডিও বিরতিতে" : "অডিও প্রস্তুত হচ্ছে"}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
