import { cn } from "@/lib/utils";

interface IslamicQuoteProps {
  arabic: string;
  translation: string;
  source: string;
  className?: string;
}

/**
 * Reverent container for Qur'anic / Hadith text.
 *
 * Principle honoured: Islamic Content is Holy — the surface is
 * dignified, centred, with gold arabesque corner ornaments and the
 * Arabic verse presented in Amiri at generous size and line-height.
 */
export function IslamicQuote({
  arabic,
  translation,
  source,
  className,
}: IslamicQuoteProps) {
  return (
    <div
      className={cn(
        "relative p-8 md:p-14 rounded-2xl text-center",
        "bg-white-pure shadow-luxe-md",
        "border-2 border-gold-royal/40",
        className,
      )}
      role="figure"
      aria-label="ইসলামিক উদ্ধৃতি"
    >
      {/* Corner ornaments — decorative only */}
      <CornerOrnament
        className="absolute top-2 left-2"
        rotate={0}
      />
      <CornerOrnament
        className="absolute top-2 right-2"
        rotate={90}
      />
      <CornerOrnament
        className="absolute bottom-2 left-2"
        rotate={-90}
      />
      <CornerOrnament
        className="absolute bottom-2 right-2"
        rotate={180}
      />

      {/* Arabic Quote */}
      <p
        className="relative text-3xl md:text-4xl font-amiri text-gold-royal mb-8 leading-[2] tracking-wide"
        lang="ar"
        dir="rtl"
      >
        {arabic}
      </p>

      {/* Thin gold divider */}
      <div className="flex justify-center mb-6">
        <span className="inline-block h-px w-24 bg-gradient-to-r from-transparent via-gold-royal/60 to-transparent" />
      </div>

      {/* Bengali Translation */}
      <p className="relative text-lg md:text-xl text-charcoal mb-4 leading-relaxed font-noto-bengali">
        {translation}
      </p>

      {/* Source Citation */}
      <p className="relative text-sm md:text-base text-emerald-deep font-semibold font-hind-siliguri">
        {source}
      </p>
    </div>
  );
}

/** Tiny gold arabesque corner ornament — inline SVG, no extra request. */
function CornerOrnament({
  className,
  rotate = 0,
}: {
  className?: string;
  rotate?: number;
}) {
  return (
    <svg
      className={cn("w-6 h-6 md:w-8 md:h-8 text-gold-royal/50", className)}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path
        d="M4 4 L4 12 M4 4 L12 4 M4 4 Q10 10 16 4 M4 4 Q10 10 4 16"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="4" cy="4" r="1.2" fill="currentColor" />
    </svg>
  );
}
