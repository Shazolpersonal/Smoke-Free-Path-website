"use client";

/**
 * AudioProvider — the single source of truth for the audio narration UX.
 *
 * Architecture (Spotify / SoundCloud pattern):
 *   Root layout
 *     └─ <AudioProvider>
 *          ├─ <audio ref={audioRef}>     ← mounted once, never unmounted
 *          └─ {children}                 ← all pages render here
 *
 * Because the <audio> element lives above the route tree, audio playback
 * is not interrupted by client-side navigation.
 *
 * State machine (uiMode):
 *   hidden  ─┐ first-visit after 1500ms ┌→ modal
 *            │                          │
 *   hidden  ─┼─ return visit (pill)   ─→ pill  ──click──→ mini
 *            │                                            │
 *            └─ dismissed                         expand →│
 *                                                        ↓
 *                                                   expanded ←esc/backdrop→ mini
 *
 * Privacy: a small number of `sfp_audio_*` keys in localStorage remember
 * whether the user has already heard / skipped / dismissed the narration.
 * No personally identifying data is stored.
 *
 * Implementation notes:
 * - localStorage flags are read through `useSyncExternalStore` so React
 *   stays in sync with cross-tab changes AND with our in-tab writes.
 * - Calls to `setState` only happen inside event handlers, timer
 *   callbacks, or <audio> event listeners — never synchronously inside
 *   a `useEffect` body — to satisfy React 19's new
 *   `react-hooks/set-state-in-effect` rule.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { AUDIO_CONFIG, LS_KEYS } from "./audio-config";
import type {
  AudioContextValue,
  AudioPlayerState,
  AudioStartTrigger,
  AudioUiMode,
  Transcript,
  TranscriptChapter,
} from "./types";

const AudioContext = createContext<AudioContextValue | null>(null);

/* ---------- localStorage helpers (SSR-safe) ---------- */

const FLAG_CHANGE_EVENT = "sfp:audio-flag-change";

function readString(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
function writeString(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* ignore quota / private mode */
  }
}
function readBool(key: string): boolean {
  return readString(key) === "true";
}
function writeBool(key: string, value: boolean): void {
  writeString(key, String(value));
  emitFlagChange();
}
function emitFlagChange(): void {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new Event(FLAG_CHANGE_EVENT));
  } catch {
    /* ignore */
  }
}
function subscribeFlags(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(FLAG_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(FLAG_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/* ---------- Analytics helper (privacy-first, framework-agnostic) ---------- */

type AnalyticsEvent =
  | "audio_modal_shown"
  | "audio_started"
  | "audio_paused"
  | "audio_resumed"
  | "audio_25pct_reached"
  | "audio_50pct_reached"
  | "audio_75pct_reached"
  | "audio_completed"
  | "audio_skipped_from_modal"
  | "audio_dismissed_miniplayer"
  | "audio_expanded"
  | "audio_collapsed"
  | "cta_click_after_audio";

interface AnalyticsProps {
  trigger?: AudioStartTrigger;
  at_seconds?: number;
  [key: string]: unknown;
}

function track(event: AnalyticsEvent, props: AnalyticsProps = {}): void {
  if (typeof window === "undefined") return;
  try {
    type DataLayerItem = { event: AnalyticsEvent } & AnalyticsProps;
    type PostHogLike = { capture: (event: string, props: Record<string, unknown>) => void };
    type WinWithAnalytics = Window & {
      dataLayer?: DataLayerItem[];
      posthog?: PostHogLike;
    };
    const w = window as WinWithAnalytics;
    if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event, ...props });
    if (w.posthog && typeof w.posthog.capture === "function") {
      w.posthog.capture(event, props);
    }
  } catch {
    /* ignore analytics failures */
  }
}

/* ---------- Component ---------- */

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const preloadInjectedRef = useRef(false);
  const transcriptLoadedRef = useRef(false);
  const milestonesReachedRef = useRef<Set<number>>(new Set());
  const lastMilestonePersistTimeRef = useRef(0);
  const modalShownLoggedRef = useRef(false);

  /* ----- flags: hydrated from localStorage via useSyncExternalStore ----- */

  const hasHeard = useSyncExternalStore(
    subscribeFlags,
    () => readBool(LS_KEYS.heard),
    () => false
  );
  const hasSkipped = useSyncExternalStore(
    subscribeFlags,
    () => readBool(LS_KEYS.skipped),
    () => false
  );
  const hasDismissed = useSyncExternalStore(
    subscribeFlags,
    () => readBool(LS_KEYS.dismissed),
    () => false
  );
  const hasCompleted = useSyncExternalStore(
    subscribeFlags,
    () => readBool(LS_KEYS.completed),
    () => false
  );

  /* ----- playback state ----- */

  const [state, setState] = useState<AudioPlayerState>({
    isReady: false,
    isPlaying: false,
    isPaused: false,
    currentTime: 0,
    duration: AUDIO_CONFIG.durationSec,
    volume: 1,
    isMuted: false,
    bufferedEnd: 0,
    hasError: false,
  });

  /* ----- uiMode state machine ----- */
  // `userOverride` captures explicit user actions (play, expand, dismiss …).
  // `modalElapsed` is flipped by the first-visit timer so the computed mode
  // switches from "hidden" to "modal" without setting state inside an effect
  // body. This satisfies react-hooks/set-state-in-effect while preserving the
  // desired delay.
  const [userOverride, setUserOverride] = useState<AudioUiMode | null>(null);
  const [modalElapsed, setModalElapsed] = useState(false);
  const [transcript, setTranscript] = useState<Transcript | null>(null);

  const uiMode: AudioUiMode = useMemo(() => {
    if (userOverride) return userOverride;
    if (hasDismissed) return "hidden";
    if (hasHeard || hasSkipped) return "pill";
    return modalElapsed ? "modal" : "hidden";
  }, [userOverride, modalElapsed, hasHeard, hasSkipped, hasDismissed]);

  /* ----- first-visit modal timer (uses callbacks, not sync setState) ----- */
  useEffect(() => {
    if (hasHeard || hasSkipped || hasDismissed || modalElapsed) return;
    const timer = window.setTimeout(() => {
      setModalElapsed(true);
      if (!modalShownLoggedRef.current) {
        modalShownLoggedRef.current = true;
        track("audio_modal_shown");
      }
    }, AUDIO_CONFIG.modalDelayMs);
    return () => window.clearTimeout(timer);
  }, [hasHeard, hasSkipped, hasDismissed, modalElapsed]);

  /* ----- audio element event wiring ----- */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () =>
      setState((s) => ({ ...s, isReady: true, duration: audio.duration || s.duration }));
    const onPlay = () => setState((s) => ({ ...s, isPlaying: true, isPaused: false }));
    const onPause = () => setState((s) => ({ ...s, isPlaying: false, isPaused: true }));
    const onEnded = () => {
      setState((s) => ({
        ...s,
        isPlaying: false,
        isPaused: false,
        currentTime: audio.duration || s.currentTime,
      }));
      writeBool(LS_KEYS.completed, true);
      writeString(LS_KEYS.completionPct, "100");
      track("audio_completed");
      dispatchCompletionEvent();
    };
    const onTimeUpdate = () => {
      const now = audio.currentTime;
      setState((s) => ({ ...s, currentTime: now }));
      if (audio.duration > 0) {
        const pct = now / audio.duration;
        if (Date.now() - lastMilestonePersistTimeRef.current > 2000) {
          lastMilestonePersistTimeRef.current = Date.now();
          writeString(LS_KEYS.completionPct, String(Math.round(pct * 100)));
        }
        for (const m of AUDIO_CONFIG.progressMilestones) {
          if (pct >= m && !milestonesReachedRef.current.has(m)) {
            milestonesReachedRef.current.add(m);
            writeString(LS_KEYS.milestones, JSON.stringify([...milestonesReachedRef.current]));
            const ev: AnalyticsEvent =
              m === 0.25 ? "audio_25pct_reached" : m === 0.5 ? "audio_50pct_reached" : "audio_75pct_reached";
            track(ev, { at_seconds: Math.round(now) });
          }
        }
      }
    };
    const onProgress = () => {
      if (audio.buffered.length > 0) {
        setState((s) => ({ ...s, bufferedEnd: audio.buffered.end(audio.buffered.length - 1) }));
      }
    };
    const onVolumeChange = () =>
      setState((s) => ({ ...s, volume: audio.volume, isMuted: audio.muted }));
    const onError = () => setState((s) => ({ ...s, hasError: true }));

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("progress", onProgress);
    audio.addEventListener("volumechange", onVolumeChange);
    audio.addEventListener("error", onError);

    // Seed milestones from storage (once, in effect; subsequent writes go via ref)
    try {
      const raw = readString(LS_KEYS.milestones);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) milestonesReachedRef.current = new Set(parsed);
      }
    } catch {
      /* ignore */
    }

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("progress", onProgress);
      audio.removeEventListener("volumechange", onVolumeChange);
      audio.removeEventListener("error", onError);
    };
  }, []);

  /* ----- lazy loaders ----- */

  const loadTranscript = useCallback(async () => {
    if (transcriptLoadedRef.current) return;
    transcriptLoadedRef.current = true;
    try {
      const res = await fetch(AUDIO_CONFIG.transcriptUrl, { cache: "force-cache" });
      if (!res.ok) throw new Error(`Transcript HTTP ${res.status}`);
      const json = (await res.json()) as Transcript;
      setTranscript(json);
    } catch {
      transcriptLoadedRef.current = false; // allow retry later
    }
  }, []);

  const injectPreload = useCallback(() => {
    if (preloadInjectedRef.current || typeof document === "undefined") return;
    preloadInjectedRef.current = true;
    try {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "audio";
      link.href = AUDIO_CONFIG.src;
      document.head.appendChild(link);
    } catch {
      /* ignore */
    }
  }, []);

  /* ----- playback actions ----- */

  const play = useCallback(async (): Promise<void> => {
    const audio = audioRef.current;
    if (!audio) return;
    injectPreload();
    try {
      await audio.play();
    } catch {
      // Autoplay without a user gesture is (rightly) blocked by browsers.
    }
  }, [injectPreload]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    track("audio_paused", { at_seconds: Math.round(audio.currentTime) });
  }, []);

  const toggle = useCallback(async (): Promise<void> => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      await play();
      track("audio_resumed", { at_seconds: Math.round(audio.currentTime) });
    } else {
      pause();
    }
  }, [play, pause]);

  const seek = useCallback((timeInSeconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const max = isFinite(audio.duration) ? audio.duration : AUDIO_CONFIG.durationSec;
    audio.currentTime = Math.max(0, Math.min(max, timeInSeconds));
  }, []);

  const skipForward = useCallback(
    (seconds: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      seek(audio.currentTime + seconds);
    },
    [seek]
  );
  const skipBackward = useCallback(
    (seconds: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      seek(audio.currentTime - seconds);
    },
    [seek]
  );

  const setVolume = useCallback((zeroToOne: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = false;
    audio.volume = Math.max(0, Math.min(1, zeroToOne));
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
  }, []);

  /* ----- UI transitions (all from event handlers/callbacks) ----- */

  const startListening = useCallback(
    async (trigger: AudioStartTrigger) => {
      if (!readBool(LS_KEYS.heard)) {
        writeBool(LS_KEYS.heard, true);
        writeString(LS_KEYS.startedAt, String(Date.now()));
      }
      if (readBool(LS_KEYS.dismissed)) {
        writeBool(LS_KEYS.dismissed, false);
      }
      loadTranscript();
      await play();
      track("audio_started", { trigger });

      if (trigger === "modal") {
        // Keep modal rendered until morph finishes for a smooth transition.
        window.setTimeout(() => setUserOverride("mini"), AUDIO_CONFIG.modalToMiniMs);
      } else {
        setUserOverride("mini");
      }
    },
    [play, loadTranscript]
  );

  const skipFromModal = useCallback(() => {
    writeBool(LS_KEYS.skipped, true);
    setUserOverride("pill");
    track("audio_skipped_from_modal");
  }, []);

  const dismissMiniPlayer = useCallback(() => {
    const audio = audioRef.current;
    if (audio && !audio.paused) audio.pause();
    writeBool(LS_KEYS.dismissed, true);
    setUserOverride("hidden");
    track("audio_dismissed_miniplayer");
  }, []);

  const expand = useCallback(() => {
    loadTranscript();
    setUserOverride("expanded");
    track("audio_expanded");
  }, [loadTranscript]);

  const collapse = useCallback(() => {
    setUserOverride("mini");
    track("audio_collapsed");
  }, []);

  const reopenFromPill = useCallback(async () => {
    await startListening("pill");
  }, [startListening]);

  /* ----- derived: current chapter + line ----- */

  const currentChapter = useMemo<TranscriptChapter | null>(() => {
    if (!transcript) return null;
    return (
      transcript.chapters.find(
        (c) => state.currentTime >= c.start && state.currentTime < c.end
      ) ?? null
    );
  }, [transcript, state.currentTime]);

  const currentLineIndex = useMemo<number>(() => {
    if (!transcript) return -1;
    const lines = transcript.lines;

    // ⚡ Bolt Optimization:
    // Problem: This calculation runs ~4 times per second (on timeupdate). A linear search (O(N))
    // overhead grows as transcript gets longer.
    // Solution: Implement binary search (O(log N)) to find the active line based on current time.
    let low = 0;
    let high = lines.length - 1;
    let result = -1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (lines[mid].t <= state.currentTime) {
        result = mid; // Possible candidate, but we want the largest one <= currentTime
        low = mid + 1; // Look for a later line
      } else {
        high = mid - 1; // Line starts after current time
      }
    }

    return result;
  }, [transcript, state.currentTime]);

  const value = useMemo<AudioContextValue>(
    () => ({
      state,
      transcript,
      uiMode,
      currentChapter,
      currentLineIndex,
      startListening,
      play,
      pause,
      toggle,
      seek,
      skipForward,
      skipBackward,
      setVolume,
      toggleMute,
      skipFromModal,
      dismissMiniPlayer,
      expand,
      collapse,
      reopenFromPill,
      hasHeard,
      hasSkipped,
      hasDismissed,
      hasCompleted,
    }),
    [
      state,
      transcript,
      uiMode,
      currentChapter,
      currentLineIndex,
      startListening,
      play,
      pause,
      toggle,
      seek,
      skipForward,
      skipBackward,
      setVolume,
      toggleMute,
      skipFromModal,
      dismissMiniPlayer,
      expand,
      collapse,
      reopenFromPill,
      hasHeard,
      hasSkipped,
      hasDismissed,
      hasCompleted,
    ]
  );

  return (
    <AudioContext.Provider value={value}>
      {/*
        Single persistent <audio> element. Kept out of flow with `sr-only`
        and marked `aria-hidden`; all interaction happens via the custom UI.
        We intentionally DO NOT pass `autoPlay` — per Islamic adab &
        browser autoplay policies, playback requires an explicit tap.
      */}
      <audio
        ref={audioRef}
        src={AUDIO_CONFIG.src}
        preload="metadata"
        playsInline
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
      />
      {children}
    </AudioContext.Provider>
  );
}

function dispatchCompletionEvent() {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new CustomEvent("sfp:audio-completed"));
  } catch {
    /* ignore */
  }
}

export function useAudioPlayer(): AudioContextValue {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    throw new Error("useAudioPlayer must be used inside <AudioProvider>");
  }
  return ctx;
}
