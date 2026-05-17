"use client";

/**
 * KaraokeTranscript — time-synchronised line display.
 *
 * Each line is a button; tapping seeks the player to that timestamp so
 * users can revisit specific verses (especially the Quranic ayah).
 *
 * Arabic lines render with the Amiri font in RTL direction per the
 * adab rules. Bengali lines use Hind Siliguri.
 */

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useAudioPlayer } from "./AudioProvider";
import { A11Y_TEXT } from "./audio-config";
import type { TranscriptLine } from "./types";

export function KaraokeTranscript() {
  const { transcript, currentLineIndex, seek } = useAudioPlayer();
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll active line into view.
  useEffect(() => {
    if (currentLineIndex < 0 || !containerRef.current) return;
    const node = containerRef.current.querySelector<HTMLElement>(
      `[data-line-index="${currentLineIndex}"]`
    );
    if (node) {
      node.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "center",
      });
    }
  }, [currentLineIndex, reducedMotion]);

  if (!transcript) {
    return (
      <div className="text-center text-[#faf8f1]/50 text-sm py-10 font-noto-bengali">
        {A11Y_TEXT.transcriptLoading}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto px-4 py-2 sfp-transcript-scroll"
      role="region"
      aria-label="অডিও transcript — আব্বার কথা"
    >
      <div className="space-y-2 py-4 max-w-xl mx-auto">
        {transcript.lines.map((line, idx) => (
          <MemoizedTranscriptLineRow
            key={idx}
            line={line}
            index={idx}
            active={idx === currentLineIndex}
            past={idx < currentLineIndex}
            onSeek={seek}
          />
        ))}
      </div>
    </div>
  );
}

const MemoizedTranscriptLineRow = React.memo(function TranscriptLineRow({
  line,
  index,
  active,
  past,
  onSeek,
}: {
  line: TranscriptLine;
  index: number;
  active: boolean;
  past: boolean;
  onSeek: (t: number) => void;
}) {
  const opacityClass = active ? "opacity-100" : past ? "opacity-40" : "opacity-60";
  const colorClass = active ? "text-[#10b981]" : "text-[#faf8f1]";
  const fontClass = line.arabic
    ? "font-amiri text-2xl md:text-3xl text-right leading-loose"
    : "font-hind-siliguri text-base md:text-lg leading-relaxed";

  return (
    <button
      type="button"
      data-line-index={index}
      onClick={() => onSeek(line.t)}
      dir={line.arabic ? "rtl" : "ltr"}
      className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017] ${opacityClass} ${colorClass} ${fontClass}`}
      aria-current={active ? "true" : undefined}
    >
      {line.text}
    </button>
  );
});
