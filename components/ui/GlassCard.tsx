import type { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Surface tone: luxe-dark = frosted-on-dark (emerald-abyss backgrounds),
   *  luxe-light = frosted-on-cream (parchment / white-pure backgrounds). */
  tone?: "dark" | "light";
  /** Show a soft gold border glow on hover. */
  hoverGlow?: boolean;
  /** Optional top accent bar: 'gold' | 'emerald' | 'none'. */
  accent?: "gold" | "emerald" | "none";
  className?: string;
}

/**
 * Glass-morphism card used throughout the premium redesign. Backdrop-blur
 * on translucent surfaces, hairline gold border, brand-tinted shadows.
 *
 * - On dark section backgrounds (emerald-abyss, ink-velvet), use tone="dark".
 * - On parchment / white backgrounds, use tone="light".
 *
 * Accessibility: this is a decorative shell — pass through any props you
 * need (role, aria-*) via spread.
 */
export function GlassCard({
  children,
  tone = "dark",
  hoverGlow = true,
  accent = "none",
  className,
  ...rest
}: GlassCardProps) {
  const accentBar =
    accent === "gold"
      ? "before:bg-gradient-to-r before:from-gold-soft/0 before:via-gold-royal before:to-gold-soft/0"
      : accent === "emerald"
        ? "before:bg-gradient-to-r before:from-emerald-bright/0 before:via-emerald-bright before:to-emerald-bright/0"
        : null;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl transition-all duration-500 ease-out",
        tone === "dark" ? "luxe-glass" : "luxe-glass-light",
        tone === "dark"
          ? "shadow-[0_20px_48px_rgba(6,24,18,0.45)]"
          : "shadow-luxe-md",
        hoverGlow &&
          (tone === "dark"
            ? "hover:shadow-[0_24px_56px_rgba(6,24,18,0.55),0_0_32px_rgba(212,160,23,0.22)]"
            : "hover:shadow-[0_24px_56px_rgba(15,81,50,0.18),0_0_28px_rgba(212,160,23,0.22)]"),
        hoverGlow && "hover:border-gold-royal/45",
        accentBar &&
          "before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:z-10",
        accentBar,
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
