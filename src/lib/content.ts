import type { StaticImageData } from "next/image";

import { IMAGES } from "@/lib/images";

/**
 * All editorial copy lives here. Sections read from this file so the writing
 * can be revised without touching layout.
 */

export const BRAND = {
  name: "TREZUH",
  descriptor: "Estates · Developments · Private Wealth",
  descriptorParts: ["Estates", "Developments", "Private Wealth"],
  positioning:
    "We operate across luxury real estate and private equity, creating enduring value, strategic opportunities, and long-term wealth for our partners.",
  statement:
    "A diversified firm spanning luxury real estate and private equity, focused on creating exceptional opportunities, enduring value, and generational wealth.",
  email: "Thetrezuh@gmail.com",
  phone: {
    /** As it is read. */
    display: "+91 81217 64901",
    /** As it is dialled. */
    tel: "+918121764901",
    /** The WhatsApp Business short link every WhatsApp entry point uses. */
    whatsapp: "https://wa.me/message/LGSUZQGAF35TK1",
  },
  address: {
    street: "Road No. 12, Banjara Hills",
    locality: "Hyderabad",
    region: "Telangana",
    country: "India",
    /** One line, for the places that only have one line. */
    short: "Banjara Hills, Hyderabad",
  },
  year: 2026,
} as const;

/** Canonical origin. Set NEXT_PUBLIC_SITE_URL once the domain is pointed. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://trezuh.com"
).replace(/\/$/, "");

export type NavItem = { label: string; href: string };

export const NAV: NavItem[] = [
  { label: "Estates", href: "#estates" },
  { label: "Developments", href: "#developments" },
  { label: "Private Wealth", href: "#private-wealth" },
  { label: "About", href: "#firm" },
  { label: "Contact", href: "#contact" },
];

export const SOCIAL: NavItem[] = [
  // The clean profile URL: the invite link this came from carries a private
  // one-time token that should not be published.
  { label: "Instagram", href: "https://www.instagram.com/trezuhdevelopments" },
];

export type Pillar = {
  index: string;
  id: string;
  title: string;
  description: string;
  /** Where the discipline is evidenced further down the page. */
  href: string;
  image: StaticImageData;
  imageAlt: string;
};

export const PILLARS: Pillar[] = [
  {
    index: "01",
    id: "estates",
    title: "Estates",
    description:
      "Luxury real estate acquisition, development and positioning.",
    href: "#opportunities",
    image: IMAGES.pillarEstates,
    imageAlt: "A contemporary residence set above water at dusk",
  },
  {
    index: "02",
    id: "developments",
    title: "Developments",
    description: "Creating distinctive spaces with long-term value.",
    href: "#opportunities",
    image: IMAGES.pillarDevelopments,
    imageAlt: "A modular stone and glass façade in raking light",
  },
  {
    index: "03",
    id: "private-wealth",
    title: "Private Wealth",
    description:
      "Strategic capital allocation and private investment opportunities.",
    href: "#capital",
    image: IMAGES.pillarWealth,
    imageAlt: "A detail of veined stone",
  },
];

export type Project = {
  index: string;
  name: string;
  location: string;
  description: string;
  assetClass: string;
  status: string;
  /** Detail pages are out of scope for the single-page build; the enquiry
   *  anchor stands in until `/opportunities/[slug]` exists. */
  href: string;
  image: StaticImageData;
  imageAlt: string;
};

export const PROJECTS: Project[] = [
  {
    index: "01",
    name: "Meridian House",
    location: "Kensington, London",
    description:
      "Two stone-fronted townhouses rebuilt behind a retained nineteenth-century façade, delivering eleven private residences around a concealed courtyard.",
    assetClass: "Residential",
    href: "#contact",
    status: "Delivered 2025",
    image: IMAGES.projectMeridian,
    imageAlt:
      "A board-formed concrete wall meeting a still reflecting pool",
  },
  {
    index: "02",
    name: "Atlas Quarter",
    location: "Business Bay, Dubai",
    description:
      "A mixed-use quarter of two towers above a public colonnade, developed alongside a regional institutional partner on a thirty-year ground lease.",
    assetClass: "Mixed-use",
    href: "#contact",
    status: "Under construction",
    image: IMAGES.projectAtlas,
    imageAlt: "Stacked balconies of a tower converging into darkness",
  },
  {
    index: "03",
    name: "Solenne",
    location: "Cap d'Antibes, France",
    description:
      "A private coastal estate of four residences cut into the cliff, held through a single-asset vehicle for a family office partner.",
    assetClass: "Private estate",
    href: "#contact",
    status: "Acquired 2026",
    image: IMAGES.projectSolenne,
    imageAlt: "A white modernist villa above a still pool",
  },
];

export const CAPITAL_LINES = [
  "Strategic investment.",
  "Long-term perspective.",
  "Disciplined execution.",
] as const;

export const CAPITAL_DISCIPLINES = [
  "Real Estate",
  "Private Capital",
  "Strategic Partnerships",
  "Long-term Value",
] as const;

export type Principle = {
  index: string;
  title: string;
  description: string;
};

export const PRINCIPLES: Principle[] = [
  {
    index: "01",
    title: "Discipline",
    description:
      "We decline far more than we pursue. Conviction is earned, never assumed.",
  },
  {
    index: "02",
    title: "Vision",
    description:
      "We underwrite the decade rather than the quarter, and hold accordingly.",
  },
  {
    index: "03",
    title: "Precision",
    description:
      "Every detail is a decision. Nothing on our projects is left to chance.",
  },
  {
    index: "04",
    title: "Longevity",
    description:
      "We build assets intended to outlast the conditions that created them.",
  },
];
