"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Theme = "blue" | "emerald" | "gold";

interface AppCardProps {
  theme: Theme;
  emoji: string;
  name: string;
  tagline: string;
  description: string;
  screenshotSrc?: string;
  demoLink?: string;

  /** Bullet list shown in place of description when provided. */
  features?: readonly string[];
  /** Short "when to use" chip. */
  useCase?: string;
  /** Contextual label shown above useCase (e.g. "যখন ব্যবহার করবেন"). */
  useCaseLabel?: string;
  /** Bundle badge text (e.g. "বান্ডেলে অন্তর্ভুক্ত"). */
  bundleLabel?: string;
  /** Pillar number (0-based) and total for "স্তম্ভ ১ / ৩" indicator. */
  index?: number;
  total?: number;
  /** Label for the pillar indicator (e.g. "স্তম্ভ"). */
  pillarLabel?: string;
  /** Custom CTA label — falls back to Bengali "ডেমো দেখুন". */
  demoLabel?: string;

  className?: string;
}

const themeStyles: Record<
  Theme,
  {
    bg: string;
    bgSoft: string;
    border: string;
    borderHover: string;
    text: string;
    chip: string;
    accentBar: string;
    dot: string;
    ring: string;
    gradient: string;
  }
> = {
  blue: {
    bg: "bg-white-pure",
    bgSoft: "bg-blue-serenity/5",
    border: "border-blue-serenity/30",
    borderHover: "group-hover:border-blue-serenity",
    text: "text-blue-serenity",
    chip: "bg-blue-serenity/10 text-blue-serenity",
    accentBar: "bg-blue-serenity",
    dot: "bg-blue-serenity",
    ring: "focus-visible:ring-blue-serenity",
    gradient: "from-blue-serenity/15 via-transparent to-transparent",
  },
  emerald: {
    bg: "bg-white-pure",
    bgSoft: "bg-emerald-deep/5",
    border: "border-emerald-deep/30",
    borderHover: "group-hover:border-emerald-deep",
    text: "text-emerald-deep",
    chip: "bg-emerald-deep/10 text-emerald-deep",
    accentBar: "bg-emerald-deep",
    dot: "bg-emerald-deep",
    ring: "focus-visible:ring-emerald-deep",
    gradient: "from-emerald-deep/15 via-transparent to-transparent",
  },
  gold: {
    bg: "bg-white-pure",
    bgSoft: "bg-gold-royal/5",
    border: "border-gold-royal/40",
    borderHover: "group-hover:border-gold-royal",
    text: "text-gold-royal",
    chip: "bg-gold-royal/10 text-gold-royal",
    accentBar: "bg-gold-royal",
    dot: "bg-gold-royal",
    ring: "focus-visible:ring-gold-royal",
    gradient: "from-gold-royal/15 via-transparent to-transparent",
  },
};

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"] as const;

function toBanglaNumeral(value: number): string {
  return String(value)
    .split("")
    .map((digit) => BN_DIGITS[Number(digit)] ?? digit)
    .join("");
}

function hasBengaliScript(value?: string): boolean {
  return !!value && /[\u0980-\u09FF]/.test(value);
}

export function AppCard({
  theme,
  emoji,
  name,
  tagline,
  description,
  screenshotSrc,
  demoLink,
  features,
  useCase,
  useCaseLabel,
  bundleLabel,
  index,
  total,
  pillarLabel,
  demoLabel,
  className,
}: AppCardProps) {
  const styles = themeStyles[theme];
  const showFeatures = features && features.length > 0;
  const isBengali = hasBengaliScript(pillarLabel ?? name);
  const pillarNumber =
    typeof index === "number"
      ? isBengali
        ? toBanglaNumeral(index + 1)
        : String(index + 1)
      : null;
  const totalNumber =
    typeof total === "number"
      ? isBengali
        ? toBanglaNumeral(total)
        : String(total)
      : null;

  const cta = demoLabel ?? "ডেমো দেখুন";
  const staggerIndex = typeof index === "number" ? index : 0;

  return (
    <motion.article
      aria-labelledby={`pillar-title-${name.replace(/\s+/g, "-")}`}
      className={cn(
        "group relative flex flex-col overflow-hidden",
        "rounded-2xl border-2",
        "transition-colors duration-500 ease-out",
        "shadow-[0_4px_14px_rgba(26,26,26,0.06)]",
        "hover:shadow-[0_20px_40px_rgba(26,26,26,0.12)]",
        styles.bg,
        styles.border,
        styles.borderHover,
        className,
      )}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: staggerIndex * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
    >
      {/* Top accent bar */}
      <div className={cn("h-1 w-full", styles.accentBar)} aria-hidden="true" />

      {/* Header row: pillar index + bundle badge */}
      <div className="flex items-center justify-between gap-2 px-6 pt-5 pb-3">
        {pillarNumber && totalNumber && (
          <span
            className={cn(
              "inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase",
              styles.text,
            )}
            aria-label={`${pillarLabel ?? "Pillar"} ${pillarNumber} / ${totalNumber}`}
          >
            <span
              className={cn("inline-block h-[2px] w-6", styles.accentBar)}
              aria-hidden="true"
            />
            <span className={isBengali ? "font-hind-siliguri" : "font-inter"}>
              {pillarLabel ?? "Pillar"} {pillarNumber} / {totalNumber}
            </span>
          </span>
        )}
        {bundleLabel && (
          <span
            className={cn(
              "inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap",
              isBengali ? "font-hind-siliguri" : "font-inter",
              styles.chip,
            )}
          >
            <span aria-hidden="true">✓</span> {bundleLabel}
          </span>
        )}
      </div>

      {/* Emoji + Name + Tagline */}
      <div className="px-6">
        <div
          className="text-5xl mb-3 select-none leading-none"
          aria-hidden="true"
        >
          {emoji}
        </div>
        <h3
          id={`pillar-title-${name.replace(/\s+/g, "-")}`}
          className="text-2xl md:text-[1.6rem] font-bold text-charcoal mb-1.5 font-hind-siliguri leading-tight"
        >
          {name}
        </h3>
        <p
          className={cn(
            "text-base font-semibold italic mb-5 font-hind-siliguri",
            styles.text,
          )}
        >
          &ldquo;{tagline}&rdquo;
        </p>
      </div>

      {/* Screenshot with tinted gradient */}
      {screenshotSrc && (
        <div
          className={cn(
            "relative mx-6 aspect-[9/16] rounded-xl overflow-hidden mb-5",
            styles.bgSoft,
          )}
        >
          <div
            className={cn(
              "absolute inset-0 z-10 bg-gradient-to-t pointer-events-none",
              styles.gradient,
            )}
            aria-hidden="true"
          />
          <Image
            src={screenshotSrc}
            alt={`${name} — app preview`}
            fill
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 30vw"
          />
        </div>
      )}

      {/* Use-case chip */}
      {useCase && (
        <div className="px-6 mb-4">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full",
              isBengali ? "font-hind-siliguri" : "font-inter",
              styles.chip,
            )}
          >
            <span aria-hidden="true">💡</span>
            {useCaseLabel ? (
              <>
                <span className="opacity-80">{useCaseLabel}:</span>{" "}
                <span>{useCase}</span>
              </>
            ) : (
              <span>{useCase}</span>
            )}
          </span>
        </div>
      )}

      {/* Features or fallback description */}
      {showFeatures ? (
        <ul className="px-6 mb-6 space-y-2.5">
          {features!.map((feature, i) => (
            <li
              key={i}
              className="flex gap-2.5 text-sm leading-relaxed text-charcoal/85 font-hind-siliguri"
            >
              <span
                className={cn(
                  "mt-[0.55rem] flex-shrink-0 w-1.5 h-1.5 rounded-full",
                  styles.dot,
                )}
                aria-hidden="true"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="px-6 mb-6 text-charcoal/80 whitespace-pre-line leading-relaxed font-hind-siliguri">
          {description}
        </p>
      )}

      {/* CTA button */}
      {demoLink && (
        <div className="mt-auto px-6 pb-6">
          <a
            href={demoLink}
            className={cn(
              "group/btn inline-flex items-center justify-center gap-2 w-full",
              "px-5 py-3 rounded-xl font-semibold text-sm",
              "border-2 transition-all duration-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              "hover:bg-charcoal/5",
              styles.border,
              styles.text,
              styles.ring,
              isBengali ? "font-hind-siliguri" : "font-inter",
            )}
            aria-label={`${name} — ${cta}`}
          >
            {cta}
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover/btn:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      )}
    </motion.article>
  );
}
