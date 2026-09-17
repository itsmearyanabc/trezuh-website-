"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { ArrowLink } from "@/components/primitives/ArrowLink";
import { RevealLines } from "@/components/primitives/RevealLines";
import { BRAND } from "@/lib/content";
import { IMAGES } from "@/lib/images";
import { dur, EASE_EDITORIAL } from "@/lib/motion";

/**
 * Hero.
 *
 * One photograph, one sentence, one door. The image drifts and swells very
 * slightly as the page leaves it — roughly a tenth of its height over a full
 * screen — which reads as depth rather than as an effect.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const contentFade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      data-theme="dark"
      className="relative flex h-[100svh] min-h-[38rem] flex-col overflow-hidden bg-ink text-paper"
    >
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { y, scale }}
      >
        <Image
          src={IMAGES.heroTower}
          alt="A dark contemporary tower seen from its base against an open sky"
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          className="object-cover grade-deep"
        />
      </motion.div>

      {/* Two overlays: one to seat the masthead, one to seat the headline. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,5,0.62)_0%,rgba(5,5,5,0.12)_34%,rgba(5,5,5,0.55)_72%,rgba(5,5,5,0.88)_100%)]"
      />

      <motion.div
        className="shell relative flex h-full flex-col justify-end pb-[clamp(2rem,5vh,3.5rem)] pt-28"
        style={reduced ? undefined : { y: contentY, opacity: contentFade }}
      >
        <motion.div
          className="mb-[clamp(1.75rem,4vh,3rem)] flex items-baseline justify-between gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: dur(reduced, 1.2),
            ease: EASE_EDITORIAL,
            delay: reduced ? 0 : 0.45,
          }}
        >
          <p className="label opacity-70">{BRAND.descriptor}</p>
          <p className="label hidden opacity-60 lg:block">
            Private Investment House
          </p>
        </motion.div>

        <RevealLines
          as="h1"
          lines={["Where value", "becomes legacy."]}
          className="display display-tight text-hero uppercase"
          lineClassName="-mb-[0.06em]"
          delay={0.25}
        />

        <div className="grid-12 mt-[clamp(2.25rem,5vh,4rem)] items-end gap-y-8 border-t border-paper/20 pt-7">
          <motion.div
            className="col-span-6 lg:col-span-4"
            initial={{ opacity: 0, y: reduced ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: dur(reduced, 1),
              ease: EASE_EDITORIAL,
              delay: reduced ? 0 : 0.95,
            }}
          >
            <ArrowLink href="#firm" size="lead">
              Explore TREZUH
            </ArrowLink>
          </motion.div>

          <motion.p
            className="col-span-6 max-w-[44ch] text-body opacity-70 lg:col-span-5 lg:col-start-8"
            initial={{ opacity: 0, y: reduced ? 0 : 18 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{
              duration: dur(reduced, 1),
              ease: EASE_EDITORIAL,
              delay: reduced ? 0 : 1.05,
            }}
          >
            {BRAND.positioning}
          </motion.p>
        </div>
      </motion.div>

      <div
        aria-hidden
        /* Sits in the outer margin, clear of the measure, so it never
           collides with the meta line at short viewport heights. */
        className="pointer-events-none absolute top-1/2 right-[clamp(0.5rem,1.5vw,2rem)] hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex"
      >
        <span className="label opacity-60 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="scroll-cue relative block h-16 w-px overflow-hidden bg-paper/20" />
      </div>
    </section>
  );
}
