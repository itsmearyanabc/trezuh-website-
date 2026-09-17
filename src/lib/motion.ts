import type { Transition, Variants } from "framer-motion";

/**
 * Motion vocabulary.
 *
 * The site uses three gestures and nothing else: a fade with a short rise,
 * a line that unmasks from below, and an image that settles as it enters.
 * Durations sit around one second — slow enough to read as considered,
 * short enough never to hold the reader up.
 */

export const EASE_EDITORIAL = [0.16, 1, 0.3, 1] as const;

export const SLOW: Transition = {
  duration: 1.1,
  ease: EASE_EDITORIAL,
};

export const MEDIUM: Transition = {
  duration: 0.8,
  ease: EASE_EDITORIAL,
};

/** Default viewport rule: play once, a little after the element appears. */
export const VIEWPORT = { once: true, margin: "-12% 0px -10% 0px" } as const;

export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: SLOW },
};

export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: SLOW },
};

/** Parent for staggered children (labels, lists, principle columns). */
export const stagger = (amount = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: amount, delayChildren: delay },
  },
});

/** A single headline line, revealed from behind its own mask. */
export const maskedLine: Variants = {
  hidden: { y: "108%" },
  visible: {
    y: "0%",
    transition: { duration: 1.15, ease: EASE_EDITORIAL },
  },
};

/**
 * Collapse a duration when the reader has asked for reduced motion.
 *
 * We keep the animation *props* in place and only take the time out of them.
 * Stripping `initial`/`whileInView` instead would leave anything already
 * painted in its hidden state if the media query resolves after first paint.
 */
export const dur = (reduced: boolean | null, seconds: number) =>
  reduced ? 0 : seconds;

/** Large imagery: a restrained settle, never a zoom. */
export const imageSettle: Variants = {
  hidden: { scale: 1.08, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.4, ease: EASE_EDITORIAL },
  },
};
