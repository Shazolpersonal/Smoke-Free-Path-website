import { cn } from "@/lib/utils";
import { LuxeDivider } from "./LuxeDivider";

interface StoryLetterProps {
  heading: string;
  paragraphs: readonly string[];
  signature: string;
  role: string;
  note?: string;
  className?: string;
}

/**
 * Editorial-styled letter presentation for FounderStory — the sacred
 * section in memory of Abdul Karim rahimahullah.
 *
 * Principles honoured (README steering):
 *   5. The Founder's Story is Sacred — no CTAs live inside.
 *   4. Silence is Sacred — generous whitespace.
 *   6. Islamic Content is Holy — ornaments, not flourishes.
 */
export function StoryLetter({
  heading,
  paragraphs,
  signature,
  role,
  note,
  className,
}: StoryLetterProps) {
  return (
    <article
      className={cn(
        "max-w-3xl mx-auto text-left",
        "prose prose-lg",
        className,
      )}
    >
      {/* Tiny Islamic ornament above heading */}
      <div
        aria-hidden="true"
        className="flex justify-center mb-4 text-gold-royal/70 text-2xl font-amiri leading-none select-none"
      >
        ۞
      </div>

      {/* Heading */}
      <h2
        className={cn(
          "text-center",
          "text-2xl md:text-[2rem] leading-snug",
          "font-playfair font-bold text-emerald-deep",
          "mb-2",
          "tracking-tight",
        )}
      >
        {heading}
      </h2>

      {/* Gold underline accent */}
      <div className="flex justify-center mb-8">
        <span className="inline-block h-[2px] w-16 bg-gradient-to-r from-gold-soft/60 via-gold-royal to-gold-soft/60 rounded-full" />
      </div>

      {/* Opening filigree divider */}
      <LuxeDivider tone="gold" size="sm" className="mt-2 mb-10" />

      {/* Story paragraphs */}
      <div className="space-y-6 text-[1.02rem] md:text-lg text-charcoal/90 leading-loose">
        {paragraphs.map((paragraph, index) => {
          const isDiaryQuote = paragraph.includes("'");
          const isFirst = index === 0;
          return (
            <p
              key={index}
              className={cn(
                "whitespace-pre-line",
                // Highlight diary quote — preserved behaviour, elevated styling
                isDiaryQuote &&
                  "italic text-charcoal/75 pl-5 py-3 pr-4 rounded-r-lg border-l-4 border-gold-royal bg-gold-royal/[0.06]",
                // First paragraph gets a drop cap for editorial elegance
                isFirst && !isDiaryQuote && "luxe-dropcap",
              )}
            >
              {paragraph}
            </p>
          );
        })}
      </div>

      {/* Closing filigree divider before signature */}
      <LuxeDivider tone="gold" size="sm" className="mt-12 mb-8" />

      {/* Signature block */}
      <div className="text-right">
        <p className="text-xl md:text-2xl font-playfair italic font-semibold text-emerald-deep leading-tight">
          {signature}
        </p>
        <p className="text-[11px] md:text-xs text-charcoal/60 tracking-[0.2em] uppercase mt-1 font-inter">
          {role}
        </p>
      </div>

      {/* Note with flanking dots */}
      {note && (
        <div className="mt-10 flex items-center justify-center gap-3 text-center">
          <span
            aria-hidden="true"
            className="w-1 h-1 rounded-full bg-gold-royal/50"
          />
          <p className="text-sm italic text-charcoal/55 leading-relaxed max-w-lg">
            {note}
          </p>
          <span
            aria-hidden="true"
            className="w-1 h-1 rounded-full bg-gold-royal/50"
          />
        </div>
      )}
    </article>
  );
}
