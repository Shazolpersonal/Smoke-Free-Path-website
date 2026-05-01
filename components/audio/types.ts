/**
 * Audio narration player — shared TypeScript types.
 *
 * These types describe the data shapes passed between the AudioProvider
 * context, the transcript JSON, and the various UI surfaces
 * (MemorialModal, MiniPlayer, ExpandedPlayer, KaraokeTranscript).
 */

export interface TranscriptLine {
  /** Start time in seconds. */
  t: number;
  /** Approximate duration in seconds. */
  d: number;
  /** Display text (Bengali by default). */
  text: string;
  /** When true, render with Amiri font & RTL direction. */
  arabic?: boolean;
}

export interface TranscriptChapter {
  id: string;
  title: string;
  /** Start time in seconds (inclusive). */
  start: number;
  /** End time in seconds (exclusive). */
  end: number;
}

export interface Transcript {
  version: string;
  lang: string;
  /** Full audio duration in seconds (matches <audio>.duration). */
  duration: number;
  chapters: TranscriptChapter[];
  lines: TranscriptLine[];
}

export interface AudioPlayerState {
  isReady: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  currentTime: number;
  duration: number;
  /** 0..1 */
  volume: number;
  isMuted: boolean;
  /** Last buffered position in seconds. */
  bufferedEnd: number;
  hasError: boolean;
}

/**
 * Mutually-exclusive visual states for the audio UI.
 *
 * - `hidden`    → nothing on screen (dismissed or not yet initialised)
 * - `modal`     → first-visit MemorialModal
 * - `pill`      → small "আবার শুনুন" pill (returning visitor)
 * - `mini`      → persistent bottom-right MiniPlayer
 * - `expanded`  → full-screen ExpandedPlayer overlay (MiniPlayer hidden behind)
 */
export type AudioUiMode = "hidden" | "modal" | "pill" | "mini" | "expanded";

export type AudioStartTrigger = "modal" | "pill" | "expanded" | "resume";

export interface AudioContextValue {
  state: AudioPlayerState;
  transcript: Transcript | null;
  uiMode: AudioUiMode;
  currentChapter: TranscriptChapter | null;
  /** Index into `transcript.lines` of the line that should be highlighted now, or -1. */
  currentLineIndex: number;

  // Playback actions
  startListening: (trigger: AudioStartTrigger) => Promise<void>;
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => Promise<void>;
  seek: (timeInSeconds: number) => void;
  skipForward: (seconds: number) => void;
  skipBackward: (seconds: number) => void;
  setVolume: (zeroToOne: number) => void;
  toggleMute: () => void;

  // UI transitions
  skipFromModal: () => void;
  dismissMiniPlayer: () => void;
  expand: () => void;
  collapse: () => void;
  reopenFromPill: () => Promise<void>;

  // Persisted flags (hydrated from localStorage after mount)
  hasHeard: boolean;
  hasSkipped: boolean;
  hasDismissed: boolean;
  hasCompleted: boolean;
}
