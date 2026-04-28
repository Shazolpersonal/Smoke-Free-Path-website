import { cn } from "@/lib/utils";

interface StoryLetterProps {
  heading: string;
  paragraphs: readonly string[];
  signature: string;
  role: string;
  note?: string;
  className?: string;
}

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
        "max-w-3xl mx-auto",
        "prose prose-lg",
        "text-left",
        className
      )}
    >
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-charcoal mb-8 leading-relaxed">
        {heading}
      </h2>

      {/* Story Paragraphs */}
      <div className="space-y-6 text-charcoal/90 leading-loose">
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className={cn(
              "whitespace-pre-line",
              // Highlight diary quote
              paragraph.includes("'") && "italic text-charcoal/70 pl-4 border-l-4 border-gold-royal/30"
            )}
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* Signature */}
      <div className="mt-12 text-right">
        <p className="text-xl font-serif font-semibold text-charcoal">
          {signature}
        </p>
        <p className="text-sm text-charcoal/60 mt-1">{role}</p>
      </div>

      {/* Note */}
      {note && (
        <p className="mt-8 text-sm italic text-charcoal/50 text-center">
          {note}
        </p>
      )}
    </article>
  );
}
