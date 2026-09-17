import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Manrope } from "next/font/google";

import { JsonLd } from "@/components/seo/JsonLd";
import { BRAND, SITE_URL } from "@/lib/content";

import "./globals.css";

/* Display: geometric grotesk, chosen to extend the geometry of the wordmark. */
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

/* Text: neutral, quiet, built for small sizes and long measures. */
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

/* Accent: one italic serif, used roughly four times on the entire page. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const TITLE = `${BRAND.name} — Luxury Real Estate, Developments & Private Equity`;
const DESCRIPTION =
  `${BRAND.name} is a diversified investment house in ${BRAND.address.locality} ` +
  "spanning luxury real estate, property development and private equity — " +
  "creating enduring value, strategic opportunities and generational wealth " +
  "for its partners.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s — ${BRAND.name}`,
  },
  description: DESCRIPTION,
  applicationName: BRAND.name,
  authors: [{ name: BRAND.name, url: SITE_URL }],
  creator: BRAND.name,
  publisher: BRAND.name,
  category: "Real Estate",
  alternates: { canonical: "/" },
  keywords: [
    "TREZUH",
    "Trezuh Developments",
    "luxury real estate Hyderabad",
    "real estate developers Banjara Hills",
    "property development Hyderabad",
    "private equity real estate India",
    "luxury villas Hyderabad",
    "real estate investment firm",
    "private wealth",
    "strategic capital",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: BRAND.name,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${manrope.variable} ${cormorant.variable}`}
    >
      <body>
        <JsonLd />
        <a
          href="#firm"
          className="label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-paper focus:px-4 focus:py-3 focus:text-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
