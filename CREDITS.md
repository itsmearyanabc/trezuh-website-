# Photography

All photographs are from Unsplash and are used under the Unsplash licence.
They are placeholders standing in for TREZUH's own project photography, and
every one of them is normalised to the same monochrome grade in CSS
(`.grade` / `.grade-deep` in `src/app/globals.css`) so the set reads as one
body of work.

| File | Unsplash photo ID | Used for |
| --- | --- | --- |
| `hero-tower.jpg` | `photo-1685268759630-a0c318007737` | Hero |
| `band-curve.jpg` | `photo-1619857121838-997e82345250` | Full-bleed plate, Fig. 01 |
| `pillar-estates.jpg` | `photo-1670589953882-b94c9cb380f5` | Estates |
| `pillar-developments.jpg` | `photo-1536501483244-925da0b87089` | Developments |
| `pillar-wealth.jpg` | `photo-1620288526796-b339e29e9397` | Private Wealth |
| `project-meridian.jpg` | `photo-1616577711667-3da65b20c36a` | Meridian House |
| `project-atlas.jpg` | `photo-1534085897953-27d90056705a` | Atlas Quarter |
| `project-solenne.jpg` | `photo-1580587771525-78b9dba3b914` | Solenne |

Each image resolves at `https://unsplash.com/photos/<id>`.

Replace them by dropping new files into `src/assets/images/` under the same
names — the static imports in `src/lib/images.ts` pick up the new dimensions
and regenerate the blur placeholders automatically.

# Typefaces

- **Jost** (Google Fonts) — display. A geometric grotesk chosen because it
  shares the wordmark's construction: the single-storey diagonal `R`, the flat
  `E` arms, the circular `O`.
- **Manrope** (Google Fonts) — text.
- **Cormorant Garamond** (Google Fonts) — the italic serif accent, used four
  times on the entire page.

# Project names

Meridian House, Atlas Quarter and Solenne are illustrative. Replace the
entries in `src/lib/content.ts` with real positions before launch.
