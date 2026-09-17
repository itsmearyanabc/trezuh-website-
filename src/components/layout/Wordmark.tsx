import { BRAND } from "@/lib/content";

/**
 * TREZUH wordmark.
 *
 * Drawn, not typeset. A font substitution gets the E wrong — most geometric
 * grotesks shorten the middle arm — so the six letters are constructed here
 * on the logo's own grid: 100 units of cap height, a 9.5-unit stroke, and an
 * E whose three arms are the same length.
 *
 * Because it is geometry rather than type, it is identical in every browser,
 * needs no webfont, and never reflows while one loads. Nothing is added to
 * it: no icon, no effects, no second colour.
 *
 * If the original vector artwork is preferred, drop it at
 * `public/brand/trezuh-wordmark.svg` and swap the <svg> below for:
 *   <Image src="/brand/trezuh-wordmark.svg" alt="" width={510} height={100}
 *          priority className="h-[0.72em] w-auto" />
 */

/** Advance widths and the tracking between them, in cap-height units. */
const GLYPHS = [
  // T
  { w: 74, d: "M0 0h74v11H0z M31.5 0h11v100h-11z" },
  // R — a full bowl closed by a straight diagonal leg
  {
    w: 64,
    d:
      "M0 0h11v100H0z " +
      "M11 0h23a26 26 0 0 1 0 52H11V41h23a15 15 0 0 0 0-30H11z " +
      "M34 41h12l18 59H52z",
  },
  // E — three arms of equal length
  { w: 60, d: "M0 0h11v100H0z M0 0h60v11H0z M0 44.5h60v11H0z M0 89h60v11H0z" },
  // Z
  { w: 62, d: "M0 0h62v11H0z M0 89h62v11H0z M47.95 11H62L14.05 89H0z" },
  // U
  { w: 70, d: "M0 0h11v65a24 24 0 0 0 48 0V0h11v65a35 35 0 0 1-70 0z" },
  // H
  { w: 70, d: "M0 0h11v100H0z M59 0h11v100h-11z M11 44.5h48v11H11z" },
] as const;

const TRACK = 22;

const OFFSETS = GLYPHS.reduce<number[]>((acc, glyph, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + GLYPHS[i - 1].w + TRACK);
  return acc;
}, []);

const WIDTH = OFFSETS[OFFSETS.length - 1] + GLYPHS[GLYPHS.length - 1].w;

type WordmarkProps = {
  className?: string;
  /** Renders the full logo lockup, wordmark above descriptor. */
  withDescriptor?: boolean;
  descriptorClassName?: string;
};

export function Wordmark({
  className,
  withDescriptor,
  descriptorClassName,
}: WordmarkProps) {
  return (
    <span className={`inline-flex flex-col ${className ?? ""}`}>
      {/* The name stays in the document as text, for search and for screen
          readers; the drawing carries the brand. */}
      <span className="sr-only">{BRAND.name}</span>
      <svg
        viewBox={`0 0 ${WIDTH} 100`}
        aria-hidden
        focusable="false"
        /* self-start keeps the flex column from stretching the drawing
           to the width of the descriptor underneath it. */
        className="block h-[0.72em] w-auto self-start"
        fill="currentColor"
      >
        {GLYPHS.map((glyph, i) => (
          <path key={i} d={glyph.d} transform={`translate(${OFFSETS[i]} 0)`} />
        ))}
      </svg>
      {withDescriptor ? (
        <span
          aria-hidden
          className={`label mt-[0.85em] opacity-60 ${descriptorClassName ?? ""}`}
        >
          {BRAND.descriptor}
        </span>
      ) : null}
    </span>
  );
}
