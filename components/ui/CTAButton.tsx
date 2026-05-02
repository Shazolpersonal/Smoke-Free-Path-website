"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "luxe" | "luxe-outline" | "ghost";

interface CTAButtonProps {
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  /** Show a soft gold pulse ring — meant for the single most prominent CTA on a view. */
  pulse?: boolean;
  /** Turn off the shimmer on hover (some subtle contexts don't want it). */
  noShimmer?: boolean;
  className?: string;
  ariaLabel?: string;
}

/**
 * Primary call-to-action button used across the premium redesign.
 *
 * Variants:
 *  - "primary"      : existing gold-royal solid (preserved)
 *  - "secondary"    : existing emerald outline (preserved)
 *  - "luxe"         : NEW — gold gradient with shimmer + emerald-glow shadows
 *  - "luxe-outline" : NEW — transparent with gold border and hover fill
 *  - "ghost"        : NEW — minimal, for tertiary actions (gift link etc.)
 *
 * Existing callers using "primary" / "secondary" continue to work with no
 * changes. New sections opt into "luxe" for the hero-most buttons.
 */

const variants: Record<Variant, string> = {
  primary:
    "bg-gold-royal text-white-pure shadow-[0_4px_12px_rgba(212,160,23,0.3)] hover:shadow-[0_6px_16px_rgba(212,160,23,0.4)]",
  secondary:
    "border-2 border-emerald-deep text-emerald-deep bg-transparent hover:bg-emerald-deep/5",
  luxe:
    [
      "relative text-charcoal font-bold",
      "bg-[linear-gradient(135deg,var(--color-gold-glow)_0%,var(--color-gold-royal)_55%,var(--color-gold-soft)_100%)]",
      "border border-gold-royal/60",
      "shadow-gold-glow",
      "hover:shadow-[0_0_50px_rgba(212,160,23,0.5),0_12px_32px_rgba(212,160,23,0.3)]",
      "luxe-cta-shimmer",
    ].join(" "),
  "luxe-outline":
    [
      "relative border-2 border-gold-royal/60 text-gold-royal bg-transparent",
      "hover:bg-gold-royal/10 hover:border-gold-royal",
      "shadow-[0_2px_8px_rgba(212,160,23,0.15)]",
      "hover:shadow-[0_4px_16px_rgba(212,160,23,0.25)]",
    ].join(" "),
  ghost:
    "text-emerald-deep hover:text-gold-royal underline underline-offset-4 decoration-gold-royal/40 hover:decoration-gold-royal transition-colors",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
  xl: "px-10 py-5 text-xl",
};

// Create the motion-wrapped Link ONCE at module scope so it keeps a stable
// component identity across renders (React Compiler / framer-motion require
// this to preserve animation state and avoid unnecessary unmount/remount).
const MotionLink = motion(Link);

const motionProps = {
  whileHover: { scale: 1.02, y: -2 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
} as const;

export function CTAButton({
  variant = "primary",
  href,
  onClick,
  children,
  icon,
  size = "md",
  fullWidth = false,
  pulse = false,
  noShimmer = false,
  className,
  ariaLabel,
}: CTAButtonProps) {
  // Remove the shimmer class if caller opted out (variant="luxe" includes it by default).
  const variantClasses =
    noShimmer && variant === "luxe"
      ? variants.luxe.replace("luxe-cta-shimmer", "")
      : variants[variant];

  const baseClasses = cn(
    "inline-flex items-center justify-center gap-2",
    "rounded-xl font-semibold",
    "transition-[transform,box-shadow,background-color,border-color] duration-300 ease-out",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-royal focus-visible:ring-offset-2",
    variantClasses,
    sizes[size],
    fullWidth && "w-full",
    pulse && "luxe-pulse-ring",
    className,
  );

  const content = (
    <>
      {children}
      {icon && <span className="inline-flex">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <MotionLink
        href={href}
        className={baseClasses}
        aria-label={ariaLabel}
        {...motionProps}
      >
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={baseClasses}
      aria-label={ariaLabel}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
