/**
 * Audio narration — non-secret runtime configuration.
 *
 * Constants only, safe to inline in client bundle.
 * All user-facing strings are Bengali; technical keys are English.
 */

export const AUDIO_CONFIG = {
  /** Main compressed file (mono 96kbps, ~2.5 MB). */
  src: "/audio/abbar-kotha.mp3",
  coverImage: "/audio/abbar-kotha-cover.svg",
  transcriptUrl: "/audio/abbar-kotha-transcript.json",

  /** Exact duration from ffprobe: 207.647347s ≈ 3:27.6 */
  durationSec: 207.647,
  /** Rounded displayable duration. */
  durationLabel: "৩:২৭",

  title: "আব্বার কথা",
  subtitle: "আব্দুল করিম (রহঃ) — স্মৃতিতে",

  // UX timings (ms)
  modalDelayMs: 1500,
  modalToMiniMs: 600,
  completionToastMs: 8000,

  // Skip amounts
  skipForwardSec: 15,
  skipBackwardSec: 15,

  /** Minimum milliseconds between analytics beacons. */
  analyticsThrottleMs: 5000,

  /** Fractional milestones for engagement analytics. */
  progressMilestones: [0.25, 0.5, 0.75] as const,

  /** Element ID that the completion handler scrolls to. */
  scrollTargetIdPrimary: "price-comparison",
  scrollTargetIdFallback: "final-cta",
} as const;

/** localStorage keys. Prefix `sfp_` = Smoke-Free-Path. */
export const LS_KEYS = {
  heard: "sfp_audio_heard",
  skipped: "sfp_audio_skipped",
  dismissed: "sfp_audio_dismissed",
  completed: "sfp_audio_completed",
  completionPct: "sfp_audio_completion_pct",
  startedAt: "sfp_audio_started_at",
  milestones: "sfp_audio_milestones",
} as const;

/** Bengali ARIA labels & UI copy. */
export const A11Y_TEXT = {
  playerRegion: "অডিও প্লেয়ার — আব্বার কথা",
  play: "শুনুন",
  pause: "বিরতি",
  resume: "আবার চালু করুন",
  playToggle: "শুনুন / বিরতি",
  muteToggle: "মিউট / আনমিউট করুন",
  skip15Forward: "১৫ সেকেন্ড এগিয়ে যান",
  skip15Back: "১৫ সেকেন্ড পিছিয়ে যান",
  volume: "ভলিউম নিয়ন্ত্রণ",
  mute: "মিউট করুন",
  unmute: "মিউট বন্ধ করুন",
  expand: "বড় প্লেয়ার খুলুন",
  collapse: "ছোট প্লেয়ারে ফিরুন",
  close: "বন্ধ করুন",
  drag: "প্লেয়ার টেনে সরান",
  seek: "অগ্রসরতা নিয়ন্ত্রণ",
  skipModal: "পরে শুনব",
  listenAgain: "আব্বার কথা আবার শুনুন",
  listenFirst: "আব্বার কথা শুনুন",
  modalTitle: "৩ মিনিট ২৭ সেকেন্ড দিন, ভাই",
  modalSubtitle: "একটি কথা আপনার জীবন বদলাতে পারে",
  memorialLine: "আমার প্রয়াত পিতা আব্দুল করিম (রহঃ)",
  memorialDates: "১৯৬৮ — ২০১২ • আল্লাহ তাঁকে ক্ষমা করুন",
  memorialRibbon: "IN LOVING MEMORY",
  trustMicro: "🎧 শুনতে শুনতে website browse করতে পারবেন",
  completionToast: "ধন্যবাদ ভাই। এবার ৳৩৬৯-এ শুরু করুন?",
  transcriptLoading: "Transcript লোড হচ্ছে…",
} as const;

export type A11yKey = keyof typeof A11Y_TEXT;
