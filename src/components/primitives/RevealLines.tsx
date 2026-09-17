"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType, ReactNode } from "react";

import { dur, EASE_EDITORIAL, VIEWPORT } from "@/lib/motion";

type RevealLinesProps = {
  /** One entry per typographic line. Line breaks are a design decision. */
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
};

/**
 * Headline reveal: each line rises from behind its own mask.
 * Lines are authored explicitly rather than wrapped by the browser, which is
 * what keeps the large type composed instead of merely large.
 */
export function RevealLines({
  lines,
  as = "h2",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
}: RevealLinesProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as "h2"];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduced ? 0 : stagger,
            delayChildren: reduced ? 0 : delay,
          },
        },
      }}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          /* The vertical padding keeps ascenders and descenders out of the
             mask at line-heights below 1; the matching negative margin gives
             the leading back. */
          className={`-my-[0.14em] block overflow-hidden py-[0.14em] ${lineClassName ?? ""}`}
        >
          <motion.span
            className="block will-change-transform"
            variants={{
              hidden: { y: reduced ? "0%" : "110%" },
              visible: {
                y: "0%",
                transition: { duration: dur(reduced, 1.15), ease: EASE_EDITORIAL },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
