import { BRAND, SITE_URL, SOCIAL } from "@/lib/content";

/**
 * Structured data.
 *
 * One @graph describing the firm, the site and this page, so search engines
 * can resolve TREZUH as a real organisation with a real address rather than
 * inferring it from the copy. The address, telephone and social profile all
 * match what is printed in the footer — consistency is what earns a knowledge
 * panel, not volume.
 */
export function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "RealEstateAgent"],
        "@id": `${SITE_URL}/#organization`,
        name: BRAND.name,
        alternateName: `${BRAND.name} Developments`,
        url: SITE_URL,
        description: BRAND.positioning,
        slogan: "Where value becomes legacy.",
        email: BRAND.email,
        telephone: BRAND.phone.tel,
        image: `${SITE_URL}/opengraph-image`,
        logo: `${SITE_URL}/icon.svg`,
        address: {
          "@type": "PostalAddress",
          streetAddress: BRAND.address.street,
          addressLocality: BRAND.address.locality,
          addressRegion: BRAND.address.region,
          addressCountry: "IN",
        },
        areaServed: [
          { "@type": "City", name: "Hyderabad" },
          { "@type": "Country", name: "India" },
        ],
        knowsAbout: [
          "Luxury real estate",
          "Property development",
          "Private equity",
          "Real estate investment",
          "Private wealth",
        ],
        sameAs: SOCIAL.map((item) => item.href),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Investment and partnership enquiries",
          email: BRAND.email,
          telephone: BRAND.phone.tel,
          areaServed: "IN",
          availableLanguage: ["English", "Hindi", "Telugu"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: BRAND.name,
        description: BRAND.statement,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-IN",
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: `${BRAND.name} — ${BRAND.descriptor}`,
        description: BRAND.positioning,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-IN",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // The payload is our own static object, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
