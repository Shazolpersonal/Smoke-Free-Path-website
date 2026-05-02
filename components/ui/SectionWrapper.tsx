import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /**
   * Background variant.
   *
   * Existing variants (preserved, do not change behaviour):
   *   - "white"   : plain white-pure
   *   - "emerald" : very light emerald tint
   *   - "dark"    : charcoal background, white text
   *   - "sepia"   : warm #f4f1ea paper
   *
   * NEW luxe variants (additive — Emerald & Gold Luxe redesign):
   *   - "parchment" : premium cream gradient, warm and editorial
   *   - "luxe-dark" : deep emerald-abyss surface for dark premium sections
   *   - "ink"       : near-black ink-velvet with emerald undertone
   *   - "transparent" : no background — useful when a <LuxeBackground />
   *                     is rendered as a sibling decorative layer.
   */
  bgVariant?:
    | "white"
    | "emerald"
    | "dark"
    | "sepia"
    | "parchment"
    | "luxe-dark"
    | "ink"
    | "transparent";
}

const bgVariants: Record<NonNullable<SectionWrapperProps["bgVariant"]>, string> = {
  white: "bg-white-pure",
  emerald: "bg-emerald-deep/5",
  dark: "bg-charcoal text-white-pure",
  sepia: "bg-[#f4f1ea]",
  /* NEW */
  parchment: "bg-cream-parchment text-charcoal",
  "luxe-dark": "bg-emerald-abyss text-white-pure",
  ink: "bg-ink-velvet text-white-pure",
  transparent: "bg-transparent",
};

export function SectionWrapper({
  children,
  className,
  id,
  bgVariant = "white",
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-16 md:py-24 px-4 md:px-8",
        bgVariants[bgVariant],
        className,
      )}
    >
      <div className="max-w-6xl mx-auto relative z-10">{children}</div>
    </section>
  );
}
