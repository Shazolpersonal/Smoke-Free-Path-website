import { cn } from "@/lib/utils";

interface PriceBadgeProps {
  original: number;
  discount: number;
  label?: string;
  currency?: string;
  /**
   * Surface tone of the badge.
   *  - "light" : cream/white base (existing default) — use on dark hero overlays
   *  - "dark"  : dark glass — use on bright / parchment sections
   *
   * Kept optional so existing callers that don't pass `tone` behave exactly
   * like before.
   */
  tone?: "light" | "dark";
  className?: string;
}

export function PriceBadge({
  original,
  discount,
  label,
  currency = "৳",
  tone = "light",
  className,
}: PriceBadgeProps) {
  const discountPercent = Math.round((1 - discount / original) * 100);

  const surface =
    tone === "light"
      ? [
          "bg-white-pure/95 backdrop-blur-sm",
          "border-2 border-gold-royal/30",
          "shadow-gold-glow-soft",
        ].join(" ")
      : [
          "luxe-glass",
          "border border-gold-royal/40",
          "shadow-[0_8px_24px_rgba(6,24,18,0.5),0_0_32px_rgba(212,160,23,0.18)]",
        ].join(" ");

  const originalColor =
    tone === "light" ? "text-charcoal/50" : "text-white-pure/55";
  const labelColor =
    tone === "light" ? "text-charcoal/75" : "text-white-pure/75";

  return (
    <div
      className={cn(
        "inline-flex flex-col items-center gap-1.5 px-5 py-3 rounded-2xl",
        "transition-transform duration-300",
        surface,
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span className={cn("text-base line-through", originalColor)}>
          {currency}
          {original}
        </span>
        <span className="text-3xl md:text-[2rem] font-bold text-gold-gradient leading-none font-hind-siliguri">
          {currency}
          {discount}
        </span>
        <span className="text-xs font-bold text-red-alert bg-red-alert/15 px-2 py-1 rounded-full border border-red-alert/25">
          {discountPercent}% ছাড়
        </span>
      </div>
      {label && (
        <p
          className={cn(
            "text-xs md:text-sm text-center mt-0.5 font-noto-bengali",
            labelColor,
          )}
        >
          {label}
        </p>
      )}
    </div>
  );
}
