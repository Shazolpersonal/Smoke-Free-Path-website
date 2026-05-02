import { cn } from "@/lib/utils";

interface LuxeBackgroundProps {
  /** Composition variant. */
  variant?: "hero" | "final-cta" | "price-dark" | "pain" | "parchment";
  /** Extra classes (e.g. to override opacity or z-index). */
  className?: string;
  /** Whether to include the grainy noise overlay. */
  withNoise?: boolean;
}

/**
 * A self-contained absolutely-positioned decorative background layer.
 * Drops in as the first child of a relatively-positioned section.
 *
 * Renders:
 * - a multi-stop base gradient
 * - 2–3 blurred colour orbs that drift gently
 * - an optional noise overlay
 *
 * Everything is aria-hidden and pointer-events-none so it never
 * interferes with real content.
 */
export function LuxeBackground({
  variant = "hero",
  className,
  withNoise = true,
}: LuxeBackgroundProps) {
  const layers = getVariantLayers(variant);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className,
      )}
    >
      {/* Base gradient */}
      <div className={cn("absolute inset-0", layers.base)} />

      {/* Decorative orbs */}
      {layers.orbs.map((orb, i) => (
        <span
          key={i}
          className={cn("luxe-orb", orb.drift, orb.position, orb.tint)}
        />
      ))}

      {/* Radial accent, if any */}
      {layers.radial && (
        <div
          className="absolute inset-0"
          style={{ background: layers.radial }}
        />
      )}

      {/* Optional pattern overlay */}
      {layers.pattern && (
        <div
          className={cn("absolute inset-0", layers.patternClass)}
          style={{
            backgroundImage: layers.pattern,
            backgroundSize: layers.patternSize ?? "32px 32px",
          }}
        />
      )}

      {/* Film grain for print-feel */}
      {withNoise && (
        <div
          className={cn(
            "absolute inset-0",
            variant === "parchment" ? "luxe-noise-light" : "luxe-noise",
          )}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Variant compositions                                                */
/* ------------------------------------------------------------------ */

type Layer = {
  base: string;
  orbs: { drift: string; position: string; tint: string }[];
  radial?: string;
  pattern?: string;
  patternClass?: string;
  patternSize?: string;
};

function getVariantLayers(variant: NonNullable<LuxeBackgroundProps["variant"]>): Layer {
  switch (variant) {
    case "hero":
      return {
        base:
          "bg-[linear-gradient(140deg,var(--color-emerald-abyss)_0%,var(--color-emerald-night)_40%,var(--color-emerald-deep)_75%,rgba(212,160,23,0.18)_100%)]",
        orbs: [
          {
            drift: "luxe-orb-drift-a",
            position: "top-[-10%] left-[-8%] w-[380px] h-[380px]",
            tint: "bg-emerald-bright/25",
          },
          {
            drift: "luxe-orb-drift-b",
            position: "bottom-[-15%] right-[-10%] w-[420px] h-[420px]",
            tint: "bg-gold-royal/18",
          },
          {
            drift: "luxe-orb-drift-a",
            position:
              "top-[40%] right-[25%] w-[220px] h-[220px] opacity-35",
            tint: "bg-gold-glow/12",
          },
        ],
        radial:
          "radial-gradient(60% 50% at 70% 30%, rgba(245, 201, 71, 0.08) 0%, transparent 70%)",
        pattern:
          "radial-gradient(circle at 2px 2px, rgba(245,201,71,0.10) 1px, transparent 0)",
        patternClass: "opacity-[0.35]",
        patternSize: "28px 28px",
      };

    case "final-cta":
      return {
        base:
          "bg-[linear-gradient(160deg,var(--color-emerald-abyss)_0%,var(--color-emerald-night)_55%,var(--color-emerald-deep)_100%)]",
        orbs: [
          {
            drift: "luxe-orb-drift-a",
            position: "top-[-12%] right-[-12%] w-[440px] h-[440px]",
            tint: "bg-gold-royal/22",
          },
          {
            drift: "luxe-orb-drift-b",
            position: "bottom-[-18%] left-[-8%] w-[480px] h-[480px]",
            tint: "bg-emerald-bright/22",
          },
          {
            drift: "luxe-orb-drift-a",
            position:
              "top-[45%] left-[42%] w-[260px] h-[260px] opacity-40",
            tint: "bg-gold-glow/15",
          },
        ],
        radial:
          "radial-gradient(55% 45% at 30% 80%, rgba(245, 201, 71, 0.10) 0%, transparent 75%)",
      };

    case "price-dark":
      return {
        base:
          "bg-[linear-gradient(170deg,var(--color-ink-velvet)_0%,var(--color-emerald-night)_55%,var(--color-emerald-abyss)_100%)]",
        orbs: [
          {
            drift: "luxe-orb-drift-b",
            position: "top-[5%] left-[-6%] w-[320px] h-[320px] opacity-40",
            tint: "bg-gold-soft/15",
          },
          {
            drift: "luxe-orb-drift-a",
            position:
              "bottom-[10%] right-[-8%] w-[360px] h-[360px] opacity-40",
            tint: "bg-emerald-bright/18",
          },
        ],
        radial:
          "conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(212,160,23,0.04) 70deg, transparent 140deg, rgba(245,201,71,0.03) 210deg, transparent 280deg)",
      };

    case "pain":
      return {
        base:
          "bg-[linear-gradient(180deg,var(--color-ink-velvet)_0%,#122421_50%,#0F2A22_100%)]",
        orbs: [
          {
            drift: "luxe-orb-drift-a",
            position:
              "bottom-[-20%] left-[10%] w-[360px] h-[360px] opacity-35",
            tint: "bg-emerald-bright/18",
          },
          {
            drift: "luxe-orb-drift-b",
            position:
              "top-[-10%] right-[5%] w-[280px] h-[280px] opacity-30",
            tint: "bg-red-alert/10",
          },
        ],
      };

    case "parchment":
      return {
        base:
          "bg-[linear-gradient(180deg,var(--color-cream-parchment)_0%,var(--color-cream-deep)_100%)]",
        orbs: [
          {
            drift: "luxe-orb-drift-a",
            position:
              "top-[-15%] left-[-10%] w-[320px] h-[320px] opacity-50",
            tint: "bg-gold-royal/10",
          },
          {
            drift: "luxe-orb-drift-b",
            position:
              "bottom-[-18%] right-[-10%] w-[360px] h-[360px] opacity-40",
            tint: "bg-emerald-bright/10",
          },
        ],
      };

    default:
      return { base: "", orbs: [] };
  }
}
