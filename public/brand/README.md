# Brand assets

`trezuh-wordmark.svg` is the TREZUH wordmark, traced from the artwork supplied
by the client. Cap height is 100 units, the full mark is 701.79 wide, and it
inherits `currentColor` — so it can be dropped into anything and will take the
colour of its context.

The site does not load this file; `src/components/layout/Wordmark.tsx` carries
the same outlines inline, so the mark paints with the first byte of HTML and
never flashes. Keep the two in step if either changes.

`src/app/icon.svg`, `src/app/apple-icon.png` and `src/app/opengraph-image.jpg`
are all generated from these outlines as well.

Rules: monochrome only, no icon beside it, no effects, and no change to its
proportions or letterspacing.
