"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type ParallaxImageProps = {
  src: StaticImageData;
  alt: string;
  /** Tailwind aspect utility, e.g. `aspect-[4/5]`. */
  className?: string;
  sizes: string;
  priority?: boolean;
  /** Vertical travel as a percentage of the frame. Kept deliberately small. */
  amount?: number;
  grade?: "grade" | "grade-deep";
};

/**
 * A photograph that drifts a few percent against the page as it passes.
 * The inner layer is oversized by exactly the travel distance so no edge is
 * ever exposed, and the effect is removed entirely for reduced motion.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  sizes,
  priority,
  amount = 7,
  grade = "grade",
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${amount}%`, `${amount}%`],
  );

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-ink-soft ${className ?? ""}`}
    >
      <motion.div
        className="absolute inset-0"
        style={
          reduced
            ? undefined
            : { y, height: `${100 + amount * 2}%`, top: `-${amount}%` }
        }
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          className={`object-cover ${grade}`}
        />
      </motion.div>
    </div>
  );
}
