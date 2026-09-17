# Brand assets

Drop the supplied TREZUH artwork here — `trezuh-wordmark.svg` for the wordmark
and `trezuh-lockup.svg` for the wordmark-over-descriptor version.

The site currently sets the wordmark as live type in the display face (Jost),
which matches the supplied logo's geometry, stays sharp at every size and
remains selectable. To use the original artwork instead, edit
`src/components/layout/Wordmark.tsx` — the swap is a single element and the
instructions are in the file.

Rules that apply either way: monochrome only, no icon beside it, no effects,
no change to its proportions or letterspacing.
