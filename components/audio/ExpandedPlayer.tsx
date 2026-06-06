"use client";

/**
 * ExpandedPlayer — full-screen overlay with cover art, transcript, and
 * standard playback controls. Dismisses to MiniPlayer via Esc or backdrop.
 *
 * Keyboard shortcuts (all with Bengali ARIA labels):
 *   Space        → play / pause
 *   ← / →        → ±15s
 *   ↑ / ↓        → ±10% volume
 *   M            → toggle mute
 *   Esc          → minimise to MiniPlayer
 */

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useAudioPlayer } from "./AudioProvider";
import { AUDIO_CONFIG, A11Y_TEXT } from "./audio-config";
import { KaraokeTranscript } from "./KaraokeTranscript";

function formatTime(seconds: number): string {
  const s = !isFinite(seconds) || seconds < 0 ? 0 : seconds;
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${String(r).padStart(2, "0")}`;
}

export function ExpandedPlayer() {
  const {
    uiMode,
    state,
    toggle,
    skipForward,
    skipBackward,
    seek,
    setVolume,
    toggleMute,
    collapse,
    currentChapter,
  } = useAudioPlayer();
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const isOpen = uiMode === "expanded";

  const progress = state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0;
  const bufferedPct = state.duration > 0 ? (state.bufferedEnd / state.duration) * 100 : 0;

  // Keyboard shortcuts while expanded.
  useEffect(() => {
    if (!isOpen) return;
    const prevActive = (typeof document !== "undefined" ? document.activeElement : null) as HTMLElement | null;
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      const inField = tag === "INPUT" || tag === "TEXTAREA";
      if (e.key === "Escape") {
        e.preventDefault();
        collapse();
      } else if (e.key === " " && !inField) {
        e.preventDefault();
        void toggle();
      } else if (e.key === "ArrowRight" && !inField) {
        e.preventDefault();
        skipForward(AUDIO_CONFIG.skipForwardSec);
      } else if (e.key === "ArrowLeft" && !inField) {
        e.preventDefault();
        skipBackward(AUDIO_CONFIG.skipBackwardSec);
      } else if (e.key === "ArrowUp" && !inField) {
        e.preventDefault();
        setVolume(Math.min(1, state.volume + 0.1));
      } else if (e.key === "ArrowDown" && !inField) {
        e.preventDefault();
        setVolume(Math.max(0, state.volume - 0.1));
      } else if ((e.key === "m" || e.key === "M") && !inField) {
        e.preventDefault();
        toggleMute();
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      try {
        prevActive?.focus?.();
      } catch {
        /* ignore */
      }
    };
  }, [isOpen, collapse, toggle, skipForward, skipBackward, setVolume, toggleMute, state.volume]);

  const onSeekClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!state.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    seek(pct * state.duration);
  };

  const onSeekKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      skipForward(5);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      skipBackward(5);
    } else if (e.key === "Home") {
      e.preventDefault();
      seek(0);
    } else if (e.key === "End") {
      e.preventDefault();
      seek(state.duration);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.35 }}
          className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label="আব্বার কথা — সম্পূর্ণ অডিও প্লেয়ার"
          onClick={(e) => {
            if (e.target === e.currentTarget) collapse();
          }}
          data-testid="sfp-audio-expanded"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
            }
            className="relative w-full max-w-2xl max-h-[94vh] rounded-3xl bg-gradient-to-b from-[#10172a] to-[#0a0f1c] border border-[#D4A017]/25 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Close */}
            <button
              ref={closeBtnRef}
              type="button"
              onClick={collapse}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017] transition"
              aria-label={A11Y_TEXT.collapse}
              title={`${A11Y_TEXT.collapse} (Esc)`}
              data-testid="sfp-audio-expanded-close"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>

            {/* Header: cover + title */}
            <div className="px-6 pt-6 md:pt-8 pb-4 text-center">
              <div className="relative mx-auto w-36 h-36 md:w-48 md:h-48 mb-4">
                {!reducedMotion && state.isPlaying && (
                  <motion.div
                    className="absolute inset-[-10px] rounded-full border border-[#D4A017]/25"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    aria-hidden="true"
                  />
                )}
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_0_60px_#10b98133]">
                  <Image
                    src={AUDIO_CONFIG.coverImage}
                    alt=""
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                    unoptimized
                    priority
                  />
                </div>
              </div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4A017]/80 mb-1">
                SPOKEN MEMOIR
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#faf8f1] font-hind-siliguri mb-0.5">
                {AUDIO_CONFIG.title}
              </h2>
              <p className="text-sm text-[#faf8f1]/60 font-noto-bengali">
                {AUDIO_CONFIG.subtitle}
              </p>
              {currentChapter && (
                <p className="mt-3 inline-block text-xs px-3 py-1 rounded-full bg-[#10b981]/15 text-[#10b981] font-hind-siliguri">
                  অধ্যায়: {currentChapter.title}
                </p>
              )}
            </div>

            {/* Transcript (flex-1, scrollable) */}
            <div className="flex-1 min-h-[30vh] overflow-hidden border-t border-white/5">
              <KaraokeTranscript />
            </div>

            {/* Controls */}
            <div className="px-4 md:px-6 py-4 border-t border-white/5 bg-black/30">
              {/* Seek bar */}
              <div
                role="slider"
                tabIndex={0}
                aria-label={A11Y_TEXT.seek}
                aria-valuenow={Math.round(state.currentTime)}
                aria-valuemin={0}
                aria-valuemax={Math.max(1, Math.round(state.duration))}
                aria-valuetext={`${formatTime(state.currentTime)} — মোট ${formatTime(state.duration)}`}
                onClick={onSeekClick}
                onKeyDown={onSeekKey}
                className="relative h-2 bg-white/10 rounded-full cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017]"
              >
                <div
                  className="absolute inset-y-0 left-0 bg-white/15 rounded-full"
                  style={{ width: `${bufferedPct}%` }}
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#10b981] to-[#D4A017] rounded-full transition-[width] duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                  aria-hidden="true"
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow group-hover:scale-110 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition"
                  style={{ left: `calc(${progress}% - 7px)` }}
                  aria-hidden="true"
                />
              </div>
              <div className="flex justify-between text-[11px] text-[#faf8f1]/50 mt-1 font-inter">
                <span>{formatTime(state.currentTime)}</span>
                <span>{formatTime(state.duration)}</span>
              </div>

              {/* Transport */}
              <div className="flex items-center justify-center gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => skipBackward(AUDIO_CONFIG.skipBackwardSec)}
                  className="w-11 h-11 rounded-full text-[#faf8f1]/80 hover:text-[#D4A017] hover:bg-white/5 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017] transition"
                  aria-label={A11Y_TEXT.skip15Back}
                  title={`${A11Y_TEXT.skip15Back} (←)`}
                >
                  <svg viewBox="0 0 28 28" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M14 7V4l-5 5 5 5V11a6 6 0 1 1-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="9" y="19" fontSize="7" fill="currentColor" stroke="none" fontWeight="700">15</text>
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={toggle}
                  aria-pressed={state.isPlaying}
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-[#10b981] to-[#059669] hover:shadow-[0_0_40px_#10b98166] text-white flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017] transition-shadow"
                  aria-label={state.isPlaying ? A11Y_TEXT.pause : A11Y_TEXT.play}
                  title={`${state.isPlaying ? A11Y_TEXT.pause : A11Y_TEXT.play} (Space)`}
                  data-testid="sfp-audio-expanded-toggle"
                >
                  {state.isPlaying ? (
                    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
                      <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true" className="translate-x-[2px]">
                      <path d="M8 5v14l11-7L8 5z" />
                    </svg>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => skipForward(AUDIO_CONFIG.skipForwardSec)}
                  className="w-11 h-11 rounded-full text-[#faf8f1]/80 hover:text-[#D4A017] hover:bg-white/5 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017] transition"
                  aria-label={A11Y_TEXT.skip15Forward}
                  title={`${A11Y_TEXT.skip15Forward} (→)`}
                >
                  <svg viewBox="0 0 28 28" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M14 7V4l5 5-5 5V11a6 6 0 1 0 6 6" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="9" y="19" fontSize="7" fill="currentColor" stroke="none" fontWeight="700">15</text>
                  </svg>
                </button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-3 mt-4 max-w-xs mx-auto">
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-pressed={state.isMuted}
                  className="w-9 h-9 rounded-lg text-[#faf8f1]/70 hover:text-[#D4A017] hover:bg-white/5 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017] transition"
                  aria-label={state.isMuted ? A11Y_TEXT.unmute : A11Y_TEXT.mute}
                  title={`${state.isMuted ? A11Y_TEXT.unmute : A11Y_TEXT.mute} (M)`}
                >
                  {state.isMuted || state.volume === 0 ? (
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M11 5L6 9H2v6h4l5 4V5zM19 12c0-2.2-1.2-4.1-3-5M15 8a4 4 0 0 1 0 8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={state.isMuted ? 0 : state.volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="flex-1 accent-[#10b981]"
                  aria-label={A11Y_TEXT.volume}
                />
                <span className="text-[11px] text-[#faf8f1]/50 font-inter w-8 text-right">
                  {Math.round((state.isMuted ? 0 : state.volume) * 100)}%
                </span>
              </div>

              {/* Shortcut hints */}
              <p className="text-[10px] text-[#faf8f1]/40 text-center mt-3 font-inter hidden md:block">
                Space · ←/→ 15s · ↑/↓ volume · M mute · Esc close
              </p>
            </div>

            {/* SR live region */}
            <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
              {state.isPlaying ? "অডিও চালু আছে" : "অডিও বিরতিতে"}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
