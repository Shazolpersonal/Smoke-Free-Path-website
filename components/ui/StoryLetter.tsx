"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type Range = readonly [number, number];

interface StoryChapter {
  label: string;
  range: Range;
}

interface ClosingCta {
  label: string;
  href: string;
}

interface StoryLetterProps {
  heading: string;
  paragraphs: readonly string[];
  signature: string;
  role: string;
  note?: string;
  className?: string;

  // Optional narrative enhancements — backward compatible.
  // When omitted the component falls back to a simple paragraph list
  // with the diary pull-quote auto-detected by apostrophes (legacy behavior).
  kicker?: string;
  chapterLabel?: string;
  chapters?: readonly StoryChapter[];
  emphasisParagraphIndices?: readonly number[];
  diaryIntroIndex?: number;
  diaryParagraphIndex?: number;
  factParagraphIndices?: readonly number[];
  promiseParagraphIndices?: readonly number[];
  closingBlessingIndex?: number;
  noteTitle?: string;
  closingCta?: ClosingCta;
}

// Convert a western number 0-9 sequence to Bengali digits ০-৯.
// Used only for chapter numbering; does NOT touch any paragraph text.
const toBengaliDigit = (n: number): string =>
  String(n)
    .split("")
    .map((d) => "০১২৩৪৫৬৭৮৯"[Number(d)] ?? d)
    .join("");

export function StoryLetter({
  heading,
  paragraphs,
  signature,
  role,
  note,
  className,
  kicker,
  chapterLabel,
  chapters,
  emphasisParagraphIndices,
  diaryIntroIndex,
  diaryParagraphIndex,
  factParagraphIndices,
  promiseParagraphIndices,
  closingBlessingIndex,
  noteTitle,
  closingCta,
}: StoryLetterProps) {
  const shouldReduceMotion = useReducedMotion();

  const emphasisSet = new Set(emphasisParagraphIndices ?? []);
  const factSet = new Set(factParagraphIndices ?? []);
  const promiseSet = new Set(promiseParagraphIndices ?? []);

  // Build chapter plan; fallback to a single virtual chapter spanning all paragraphs.
  const effectiveChapters: readonly StoryChapter[] =
    chapters && chapters.length > 0
      ? chapters
      : [
          {
            label: "",
            range: [0, Math.max(0, paragraphs.length - 1)] as const,
          },
        ];

  const fadeUp: Variants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : {
        hidden: { opacity: 0, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.2, 0.65, 0.3, 1] },
        },
      };

  const viewport = { once: true, margin: "-80px" } as const;

  // Render one "normal" paragraph given its index.
  // Emphasis / diaryIntro / diaryQuote / closingBlessing get unique treatment.
  const renderParagraph = (p: string, idx: number, key: string) => {
    // Diary pull-quote — large italic card with gold accent + opening quote mark
    if (idx === diaryParagraphIndex) {
      return (
        <motion.figure
          key={key}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="my-6 md:my-8"
        >
          <div className="relative rounded-2xl border-l-4 border-gold-royal bg-white-pure/65 px-6 md:px-10 py-6 md:py-8 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
            <span
              aria-hidden="true"
              className="absolute -top-3 left-4 md:left-6 text-5xl md:text-6xl leading-none text-gold-royal/40 font-serif select-none"
            >
              ❝
            </span>
            <blockquote className="text-xl md:text-2xl italic leading-relaxed text-charcoal/90 whitespace-pre-line">
              {p}
            </blockquote>
          </div>
        </motion.figure>
      );
    }

    // Diary intro — small italic setup line right before the quote
    if (idx === diaryIntroIndex) {
      return (
        <motion.p
          key={key}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="text-base md:text-lg text-charcoal/75 whitespace-pre-line italic"
        >
          {p}
        </motion.p>
      );
    }

    // Emphasis — short punchy lines ("তিনি পারেননি।", "তিন বছর। ৩টি অ্যাপ।")
    if (emphasisSet.has(idx)) {
      return (
        <motion.p
          key={key}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="text-2xl md:text-3xl font-bold text-charcoal whitespace-pre-line leading-snug my-4 md:my-6"
        >
          {p}
        </motion.p>
      );
    }

    // Closing blessing — italic, centered, softly serif, wider line-height
    if (idx === closingBlessingIndex) {
      return (
        <motion.p
          key={key}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="text-lg md:text-xl italic text-charcoal/85 whitespace-pre-line text-center leading-relaxed mt-6 md:mt-8"
        >
          {p}
        </motion.p>
      );
    }

    // Default paragraph
    return (
      <motion.p
        key={key}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
        className="text-base md:text-lg text-charcoal/90 whitespace-pre-line leading-loose"
      >
        {p}
      </motion.p>
    );
  };

  // Track promise indices already rendered as a grouped pull-quote,
  // so subsequent loop iterations skip them.
  const renderedFromPromise = new Set<number>();

  return (
    <article
      className={cn("max-w-3xl mx-auto text-left", className)}
    >
      {/* Kicker pill — "নির্মাতার গল্প" / "The Creator's Story" */}
      {kicker && (
        <motion.div
          className="flex justify-center mb-5"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-charcoal/[0.06] text-charcoal/70 text-[11px] font-bold uppercase tracking-[0.18em]">
            <span
              className="w-1.5 h-1.5 rounded-full bg-gold-royal"
              aria-hidden="true"
            />
            {kicker}
          </span>
        </motion.div>
      )}

      {/* Heading */}
      <motion.h2
        className="text-2xl md:text-4xl font-serif font-bold text-charcoal text-center mb-10 md:mb-14 leading-relaxed"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {heading}
      </motion.h2>

      {/* Chapters */}
      <div className="space-y-12 md:space-y-14">
        {effectiveChapters.map((chapter, cIdx) => {
          const [start, end] = chapter.range;
          const items: React.ReactNode[] = [];

          for (let i = start; i <= end; i++) {
            if (i >= paragraphs.length) break;
            if (renderedFromPromise.has(i)) continue;

            // Promise pull-quote group — render ALL promise indices as one
            // combined gold card the first time we encounter any of them.
            if (promiseSet.has(i)) {
              const promiseIndices = (promiseParagraphIndices ?? [])
                .slice()
                .sort((a, b) => a - b);
              promiseIndices.forEach((pi) => renderedFromPromise.add(pi));

              items.push(
                <motion.figure
                  key={`promise-${cIdx}-${i}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  variants={fadeUp}
                  className="my-6 md:my-8"
                >
                  <div className="relative rounded-2xl border border-gold-royal/30 bg-gradient-to-br from-gold-royal/[0.08] to-gold-royal/[0.02] px-6 md:px-10 py-7 md:py-9 shadow-[0_4px_20px_rgba(212,160,23,0.10)]">
                    <span
                      aria-hidden="true"
                      className="absolute -top-3 left-4 md:left-6 text-5xl md:text-6xl leading-none text-gold-royal/45 font-serif select-none"
                    >
                      ❝
                    </span>
                    <blockquote className="space-y-4">
                      {promiseIndices.map((pi, pIdx) => (
                        <p
                          key={pi}
                          className={cn(
                            "whitespace-pre-line leading-relaxed",
                            pIdx === 0
                              ? "text-2xl md:text-3xl font-bold text-charcoal"
                              : "text-base md:text-lg text-charcoal/85"
                          )}
                        >
                          {paragraphs[pi]}
                        </p>
                      ))}
                    </blockquote>
                  </div>
                </motion.figure>
              );
              continue;
            }

            // Fact highlight — charcoal left-border callout line
            if (factSet.has(i)) {
              items.push(
                <motion.p
                  key={`fact-${cIdx}-${i}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  variants={fadeUp}
                  className="my-4 md:my-5 px-5 py-4 rounded-xl border-l-4 border-charcoal/60 bg-white-pure/60 text-lg md:text-xl font-semibold text-charcoal whitespace-pre-line"
                >
                  {paragraphs[i]}
                </motion.p>
              );
              continue;
            }

            items.push(renderParagraph(paragraphs[i], i, `para-${i}`));
          }

          return (
            <section
              key={`chapter-${cIdx}`}
              aria-label={chapter.label || undefined}
            >
              {chapter.label && chapterLabel && (
                <motion.div
                  className="flex items-center gap-4 mb-5 md:mb-7"
                  initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewport}
                  transition={{ duration: 0.5 }}
                >
                  <span className="flex items-center gap-2 text-[11px] md:text-xs font-bold uppercase tracking-[0.18em] text-gold-royal shrink-0">
                    <span
                      className="w-6 h-px bg-gold-royal/50"
                      aria-hidden="true"
                    />
                    {chapterLabel} {toBengaliDigit(cIdx + 1)} · {chapter.label}
                  </span>
                  <span
                    className="flex-1 h-px bg-charcoal/10"
                    aria-hidden="true"
                  />
                </motion.div>
              )}
              <div className="space-y-5 md:space-y-6">{items}</div>
            </section>
          );
        })}
      </div>

      {/* Signature attribution */}
      <motion.div
        className="mt-14 md:mt-16 flex justify-end"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.6 }}
      >
        <div className="text-right">
          <div
            className="inline-block w-12 h-px bg-gold-royal/60 mb-3 ml-auto"
            aria-hidden="true"
          />
          <p className="text-xl md:text-2xl font-serif font-semibold text-charcoal">
            {signature}
          </p>
          <p className="text-sm text-charcoal/60 mt-1">{role}</p>
        </div>
      </motion.div>

      {/* Privacy note */}
      {note && (
        <motion.aside
          className="mt-10 max-w-xl mx-auto rounded-xl border border-charcoal/10 bg-white-pure/50 px-5 py-4 flex gap-3 items-start"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5 }}
        >
          <span
            aria-hidden="true"
            className="mt-0.5 w-5 h-5 rounded-full bg-charcoal/10 text-charcoal/60 flex items-center justify-center text-[11px] font-bold shrink-0"
          >
            i
          </span>
          <div className="flex-1">
            {noteTitle && (
              <p className="text-xs font-semibold text-charcoal/70 uppercase tracking-wide mb-1">
                {noteTitle}
              </p>
            )}
            <p className="text-sm italic text-charcoal/60 leading-relaxed">
              {note}
            </p>
          </div>
        </motion.aside>
      )}

      {/* Closing CTA — gentle gold button tying the story to the offer */}
      {closingCta && (
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <a
            href={closingCta.href}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-royal text-white-pure font-semibold text-sm md:text-base shadow-[0_6px_18px_rgba(212,160,23,0.30)] hover:shadow-[0_10px_28px_rgba(212,160,23,0.45)] hover:-translate-y-0.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-royal focus-visible:ring-offset-2"
          >
            {closingCta.label}
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      )}
    </article>
  );
}
