"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType, ReactNode } from "react";

import { dur, EASE_EDITORIAL, VIEWPORT } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds of delay, used to phrase a group of elements. */
  delay?: number;
  /** Distance travelled on entry. Smaller for dense text, larger for blocks. */
  distance?: number;
  as?: ElementType;
};

/**
 * The workhorse entrance: opacity plus a short rise, once, on scroll.
 * Under `prefers-reduced-motion` the same states are used with no duration,
 * so the element is simply present.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 26,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as "div"];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{
        duration: dur(reduced, 1.05),
        ease: EASE_EDITORIAL,
        delay: reduced ? 0 : delay,
      }}
    >
      {children}
    </MotionTag>
  );
}
