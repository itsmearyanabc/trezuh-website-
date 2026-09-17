# TREZUH

Single-page site for TREZUH — Estates · Developments · Private Wealth.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Framer Motion. Statically prerendered; no client data, no runtime.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static prerender
npm start
```

## The idea

The brief was quiet luxury, so the site is built on restraint rather than
decoration. Three rules govern everything:

1. **Monochrome.** Seven greys, no accent colour anywhere, and every
   photograph desaturated to the same grade so the imagery reads as one body
   of work rather than a set of stock pictures.
2. **Type as the layout.** Hierarchy is carried by scale, tracking and
   hairlines. There are no boxes, no shadows, no fills — the only filled
   shapes on the page are the photographs and the inverted hover states.
3. **Space is a material.** Sections run to 13rem of vertical padding at
   desktop widths, and no composition is centred unless it earns it.

## Design system

Everything lives in `src/app/globals.css` under `@theme`, so the system is
one file.

| | |
| --- | --- |
| Surfaces | `--color-ink` `#050505`, `--color-ink-soft` `#0D0D0D`, `--color-paper` `#F7F7F5`, `--color-bright` `#FFFFFF` |
| Text | `--color-mute` `#8A8A8A` |
| Rules | `--color-rule` `#DCDCDC` (light), `--color-rule-dark` `#252525` (dark) |
| Display | Jost — geometric grotesk, chosen to extend the drawn wordmark's geometry |
| Text | Manrope |
| Accent | Cormorant Garamond italic, roughly four appearances in total |
| Scale | `--text-mega` → `--text-label`, all fluid `clamp()`; no breakpoint jumps |
| Easing | `cubic-bezier(0.16, 1, 0.3, 1)` everywhere, ~1s |

Layout primitives are `.shell` (the measure and its margins), `.grid-12`
(twelve columns at ≥1024px, six below) and `.section-pad` / `.section-pad-lg`.

## Structure

```
src/
  app/            layout (fonts, metadata), page, globals.css, icon, robots, sitemap
  components/
    layout/       Header, MobileMenu, Footer, Wordmark, WhatsAppButton
    seo/          JsonLd
    primitives/   Reveal, RevealLines, ArrowLink, SectionHead, ParallaxImage, DraftGrid
    sections/     Hero, Introduction, Pillars, Opportunities, PrivateCapital, Standard, Contact
  lib/            content.ts (all copy and data), images.ts, motion.ts
  assets/images/  photography, statically imported for blur placeholders
```

All copy and project data is in `src/lib/content.ts`. Nothing else needs to
be touched to re-write the site.

## Details worth knowing

- **The masthead reads the page.** It measures which section sits under it —
  anything marked `data-theme="dark"` — and inverts itself accordingly, so the
  wordmark is always the right colour with no flash between sections.
- **The pillars invert on hover** from the baseline up, and lift a photograph
  into the gap between the copy and the link. The same state is bound to
  `:focus-within`, so it exists for the keyboard too. One image element serves
  both the in-flow mobile composition and the desktop reveal.
- **Motion** is three gestures: a fade with a short rise, a headline line
  unmasking from below, and a few percent of parallax on large imagery. Under
  `prefers-reduced-motion` the same states are used with the duration taken
  out, so nothing is ever left stranded in its hidden state.
- **Contrast**: no text is set below 60% opacity at label size, which holds
  every grey at or above 4.5:1 on both surfaces. Verified across the rendered
  page, not by eye.
- **The floating WhatsApp button** waits until the reader has left the hero,
  then stands down again over the footer, where the same link already sits in
  the Connect column. A white disc with the mark cut out of it — it reads on
  the paper sections and the black ones without introducing a colour.
- **Responsive**: mobile and tablet get their own compositions rather than a
  scaled-down desktop — the project images change proportion at the tablet
  breakpoint, and the pillar photograph moves from the flow into the hover
  reveal at 1024px. No horizontal overflow from 320px to 2560px.

## Brand

The wordmark is **drawn, not typeset** — see
`src/components/layout/Wordmark.tsx`. Every geometric grotesk shortens the
middle arm of the E, which the TREZUH E does not, so the six letters are
constructed as SVG on the logo's own grid: 100 units of cap height, an
11-unit stroke, 22 units of tracking. That also means the wordmark needs no
webfont, is identical in every browser, and never reflows while one loads.

To use the original vector artwork instead, drop it at
`public/brand/trezuh-wordmark.svg` and follow the note in the component.

## SEO

- Title, description and keywords are written for "luxury real estate
  Hyderabad" and the firm's own name; edit them in `src/app/layout.tsx`.
- **Structured data** (`src/components/seo/JsonLd.tsx`) publishes an
  `Organization` / `RealEstateAgent` node with the real postal address,
  telephone, email and Instagram profile, plus `WebSite` and `WebPage`. The
  values come from `BRAND` in `src/lib/content.ts`, so what search engines
  read and what the footer prints can never drift apart.
- `opengraph-image.jpg` (1200×630) is a real brand card, not a screenshot;
  it also serves as the Twitter card. `icon.svg` and `apple-icon.png` are
  generated from the same mark.
- `robots.txt` and `sitemap.xml` are generated routes and follow
  `NEXT_PUBLIC_SITE_URL`.
- One `<h1>`, ordered headings, semantic landmarks, descriptive alt text and
  a real postal address in an `<address>` element in the footer.

Set the domain once, in `.env.production` (or the shell that runs the build):

```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

It is read at **build** time, so rebuild after changing it. After the domain
is live, submit the sitemap in Google Search Console and create the Google
Business Profile for the Banjara Hills address — for a local firm that is
worth more than anything on the page.

## Deploying to a Hostinger VPS

The build emits `.next/standalone`, a self-contained Node server.

```bash
# on the VPS, as a non-root user
git clone https://github.com/itsmearyanabc/trezuh-website-.git trezuh
cd trezuh
npm ci
echo "NEXT_PUBLIC_SITE_URL=https://yourdomain.com" > .env.production
npm run build

# the standalone output needs the static assets copied in beside it
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public

# run it under pm2 so it survives reboots
pm2 start .next/standalone/server.js --name trezuh --update-env
pm2 save && pm2 startup
```

The server listens on `PORT` (default 3000). Put nginx in front of it:

```nginx
server {
  server_name yourdomain.com www.yourdomain.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  # hashed build assets never change
  location /_next/static/ {
    proxy_pass http://127.0.0.1:3000;
    add_header Cache-Control "public, max-age=31536000, immutable";
  }
}
```

Then `sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com` for TLS.
In Hostinger's DNS, point the `A` record for `@` and `www` at the VPS IP.

To redeploy: `git pull && npm ci && npm run build`, copy `static` and
`public` into `.next/standalone` again, then `pm2 restart trezuh`.

## Before launch

- Replace the placeholder photography — see `CREDITS.md`.
- Replace the illustrative projects in `src/lib/content.ts` with real ones.
- `PROJECTS[].href` and the pillar `href`s point at anchors on this page.
  Point them at `/opportunities/[slug]` when those pages exist.
- Set `NEXT_PUBLIC_SITE_URL` and rebuild.
- Add LinkedIn to `SOCIAL` in `src/lib/content.ts` when the account exists.
