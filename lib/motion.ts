/**
 * Shared motion primitives for the Premium Luxe Redesign.
 *
 * Every section uses the same easings and staggered reveal variants so
 * the whole homepage moves with one rhythm. Keep this file tiny and
 * stable — sections import from here rather than redefining their own.
 *
 * All animations are respectful of `prefers-reduced-motion`: Framer Motion
 * natively honours `useReducedMotion()`, and we also gate CSS-driven
 * motion in `app/globals.css` via `@media (prefers-reduced-motion: reduce)`.
 */

import type { Variants, Transition } from "framer-motion";

/** Premium, overshoot-free easing (a common Apple-ish curve). */
export const EASE_LUXE = [0.22, 1, 0.36, 1] as const;

/** A quieter, more even easing for long fades. */
export const EASE_QUIET = [0.4, 0, 0.2, 1] as const;

/** Reduced-motion-friendly spring for UI primitives (no big overshoot). */
export const SPRING_SOFT: Transition = {
  type: "spring",
  stiffness: 180,
  damping: 22,
  mass: 0.8,
};

/** Default in-view viewport config — fire once when a section enters. */
export const VIEWPORT_ONCE = { once: true, margin: "-100px" } as const;

/** Subtle upward fade — the standard reveal across the site. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

/** Bigger upward fade, for full-width blocks (heroes, full cards). */
export const fadeUpLarge: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0 },
};

/** Gentle scale-in from 0.96 — for framed media (hero image, IslamicQuote). */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};

/** Plain fade — used where motion should be barely perceptible. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/** Slide in from the side — used on pillar rows and decorative chips. */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0 },
};
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0 },
};

/** Standard transition for section reveals. */
export const transitionLuxe: Transition = {
  duration: 0.75,
  ease: EASE_LUXE,
};

/** Slower transition for especially emotional reveals (FounderStory). */
export const transitionDeep: Transition = {
  duration: 1.0,
  ease: EASE_LUXE,
};

/**
 * Stagger container — wrap a grid of children with this and set each
 * child to use one of the `fade*` variants. Pass an optional index or
 * override `staggerChildren`/`delayChildren` in the usage.
 */
export function staggerContainer(
  stagger: number = 0.12,
  delay: number = 0.05,
): Variants {
  return {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };
}

/** Hover/tap polish for premium buttons. */
export const buttonLuxeHover = {
  whileHover: { scale: 1.02, y: -2 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.22, ease: EASE_LUXE },
} as const;
