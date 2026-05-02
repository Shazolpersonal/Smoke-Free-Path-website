import { cn } from "@/lib/utils";

interface LuxeDividerProps {
  /** Color tone of the divider. */
  tone?: "gold" | "emerald";
  /** Size/scale of the center ornament. */
  size?: "sm" | "md" | "lg";
  /** Optional extra classes on the outer container. */
  className?: string;
}

/**
 * Gold filigree divider — a thin, centered line with a diamond
 * midpoint ornament. Used between emotional section transitions to
 * give the page a "turning the page of a beautifully printed book"
 * feel.
 *
 * Decorative only — aria-hidden.
 */
export function LuxeDivider({
  tone = "gold",
  size = "md",
  className,
}: LuxeDividerProps) {
  const lineColor =
    tone === "gold"
      ? "luxe-filigree-line"
      : "bg-gradient-to-r from-transparent via-emerald-bright/50 to-transparent";

  const dotColor = tone === "gold" ? "bg-gold-royal" : "bg-emerald-bright";

  const sizes = {
    sm: {
      container: "my-6",
      line: "h-px w-20",
      diamond: "w-1.5 h-1.5",
    },
    md: {
      container: "my-10",
      line: "h-px w-32 md:w-44",
      diamond: "w-2 h-2",
    },
    lg: {
      container: "my-14",
      line: "h-px w-48 md:w-64",
      diamond: "w-2.5 h-2.5",
    },
  };
  const s = sizes[size];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative flex items-center justify-center gap-3 select-none",
        s.container,
        className,
      )}
    >
      <span className={cn(s.line, lineColor)} />
      <span className="relative flex items-center justify-center">
        {/* Outer ring */}
        <span
          className={cn(
            "absolute rotate-45 rounded-sm",
            tone === "gold"
              ? "w-3 h-3 border border-gold-royal/40"
              : "w-3 h-3 border border-emerald-bright/40",
          )}
        />
        {/* Inner diamond */}
        <span
          className={cn(
            "relative rotate-45 rounded-sm",
            s.diamond,
            dotColor,
            tone === "gold" && "shadow-gold-glow-soft",
          )}
        />
      </span>
      <span className={cn(s.line, lineColor)} />
    </div>
  );
}
