import { cn } from "@/lib/utils";

interface IslamicQuoteProps {
  arabic: string;
  translation: string;
  source: string;
  className?: string;
}

export function IslamicQuote({
  arabic,
  translation,
  source,
  className,
}: IslamicQuoteProps) {
  return (
    <div
      className={cn(
        "relative p-8 md:p-12 rounded-xl",
        "bg-emerald-deep/10 border-2 border-gold-royal",
        "text-center",
        className
      )}
      role="figure"
      aria-label="ইসলামিক উদ্ধৃতি"
    >
      {/* Arabic Quote */}
      <p
        className="text-3xl md:text-4xl font-amiri text-gold-royal mb-6 leading-relaxed"
        lang="ar"
        dir="rtl"
      >
        {arabic}
      </p>

      {/* Bengali Translation */}
      <p className="text-lg md:text-xl text-charcoal mb-4 leading-relaxed">
        {translation}
      </p>

      {/* Source Citation */}
      <p className="text-sm md:text-base text-charcoal/70 font-semibold">
        {source}
      </p>
    </div>
  );
}
