import { BRAND } from "@/lib/content";

/**
 * TREZUH wordmark.
 *
 * These outlines are traced from the supplied artwork, not set in a typeface.
 * The mark is deconstructed in ways no font reproduces: the E is three
 * detached bars with no spine, the R has no left stem — its bowl is closed by
 * a diagonal that continues into the leg — and the letters are far wider than
 * any grotesk, with vertical strokes noticeably heavier than the horizontals.
 * Substituting a font gets every one of those details wrong.
 *
 * Tracing also means the mark carries no webfont dependency, is identical in
 * every browser, and never reflows while something loads.
 *
 * The same outlines are available as a standalone file at
 * `public/brand/trezuh-wordmark.svg`.
 */

/** Outlines traced from the supplied artwork. Cap height = 100 units. */
const WORDMARK = {
  width: 701.79,
  height: 99.89,
  paths: [
    "M63.20,97.87 39.04,97.87 38.70,97.54 38.70,17.00 38.37,16.67 0.78,16.67 0.22,16.33 0.00,15.44 0.00,2.46 0.34,1.68 102.57,1.68 102.91,2.01 103.13,14.32 102.57,16.67 63.87,16.67 63.53,17.00 63.53,97.54 63.20,97.87Z",
    "M223.60,98.10 194.74,98.10 158.28,66.11 123.83,65.88 123.49,65.32 123.49,53.02 124.05,52.24 179.98,52.24 184.68,51.57 190.49,49.55 193.18,47.99 196.87,44.52 199.55,40.27 200.22,38.03 200.67,33.56 200.22,29.98 199.33,27.52 196.20,22.82 193.62,20.69 190.27,18.90 184.68,17.11 182.44,16.67 123.83,16.44 123.71,1.79 124.05,1.45 182.89,1.45 187.81,1.90 194.52,3.02 203.91,5.93 210.40,9.51 214.88,12.86 220.36,19.46 222.37,23.49 223.71,28.19 224.16,33.11 223.71,38.48 222.37,43.40 220.58,47.20 216.33,52.80 211.97,56.71 209.06,58.72 200.11,62.98 195.19,64.32 188.48,65.21 188.14,66.00 219.13,93.18 223.71,97.54 223.60,98.10Z",
    "M335.46,15.55 252.01,15.55 251.45,14.99 251.45,0.67 252.01,0.11 335.46,0.11 335.79,0.45 335.79,15.21 335.46,15.55Z",
    "M321.14,54.25 251.79,54.25 251.45,53.91 251.45,40.04 252.01,39.49 321.14,39.49 321.70,40.04 321.70,51.90 321.14,54.25Z",
    "M335.46,98.10 252.01,98.10 251.45,97.54 251.45,82.33 251.79,81.99 335.46,81.99 335.79,82.33 335.79,97.76 335.46,98.10Z",
    "M452.68,98.10 351.79,98.10 351.45,97.76 417.23,16.11 416.89,15.55 361.86,15.55 361.52,14.99 361.52,0.67 362.08,0.11 456.38,0.22 456.38,0.89 452.57,5.82 391.05,81.43 391.16,81.99 395.41,82.21 452.68,81.99 453.24,82.77 453.24,97.32 452.68,98.10Z",
    "M532.10,99.89 519.57,99.89 516.00,99.44 509.06,97.87 501.68,95.19 497.87,93.18 492.28,89.15 487.25,84.12 483.00,77.85 480.09,70.92 478.75,65.77 478.30,62.19 478.08,0.67 478.64,0.11 501.23,0.11 502.01,0.67 502.01,59.96 502.24,63.09 503.13,66.89 505.59,72.48 507.61,75.17 510.85,78.41 515.77,81.77 521.14,83.78 524.50,84.45 533.45,84.45 537.25,83.78 541.05,82.44 548.21,78.19 552.35,74.05 554.59,70.69 556.82,65.32 557.94,60.18 558.17,0.67 558.95,0.11 571.70,0.11 572.48,0.45 572.48,62.42 571.14,69.35 569.57,73.83 566.89,79.42 563.98,83.67 558.28,89.60 554.47,92.51 548.21,95.86 542.84,97.87 532.10,99.89Z",
    "M701.23,97.87 678.19,97.87 677.63,97.54 677.63,53.24 677.07,52.68 628.75,52.68 627.85,52.68 627.52,53.24 627.52,97.54 626.96,97.87 603.91,97.87 603.36,97.32 603.36,0.45 603.91,0.11 626.96,0.11 627.52,0.67 627.52,37.14 627.85,37.47 677.07,37.47 677.40,37.14 677.63,0.45 677.96,0.11 701.45,0.11 701.79,0.45 701.79,97.32 701.23,97.87Z",
  ],
} as const;

type WordmarkProps = {
  className?: string;
  /** Renders the full logo lockup: wordmark above descriptor. */
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
        viewBox={`0 0 ${WORDMARK.width} ${WORDMARK.height}`}
        aria-hidden
        focusable="false"
        /* self-start stops the flex column stretching the drawing to the
           width of the descriptor underneath it. */
        className="block h-[0.78em] w-auto self-start"
        fill="currentColor"
      >
        {WORDMARK.paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </svg>
      {withDescriptor ? (
        /* Set as the artwork sets it: sentence case, light, bullet
           separated — not as the small-caps label used elsewhere. */
        <span
          aria-hidden
          className={`mt-[0.5em] text-[0.26em] leading-none font-light tracking-[0.02em] opacity-75 ${descriptorClassName ?? ""}`}
        >
          {BRAND.descriptorParts.join(" • ")}
        </span>
      ) : null}
    </span>
  );
}
