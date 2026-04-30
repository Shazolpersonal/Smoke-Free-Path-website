/**
 * Barrel re-export for the audio player hook.
 *
 * Keeps import paths short and allows future refactors
 * (e.g. moving implementation out of AudioProvider) without
 * touching every call site.
 */
export { useAudioPlayer } from "./AudioProvider";
export type {
  AudioContextValue,
  AudioPlayerState,
  AudioUiMode,
  AudioStartTrigger,
  Transcript,
  TranscriptChapter,
  TranscriptLine,
} from "./types";
