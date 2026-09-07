import { siteConfig } from "@/lib/site-config";
import { pageUrl, type SitePage } from "@/lib/seo/pages";

const PHYSICIAN_ID = `${siteConfig.meta.url}/#physician`;

/** Site-wide JSON-LD (root layout): the practice as a Physician node + WebSite. */
export function buildJsonLd() {
  const nyc = siteConfig.locations[0];
  return [
    {
      "@context": "https://schema.org",
      "@type": "Physician",
      "@id": PHYSICIAN_ID,
      name: siteConfig.surgeon,
      url: siteConfig.meta.url,
      image: `${siteConfig.meta.url}${siteConfig.meta.ogImage}`,
      medicalSpecialty: "PlasticSurgery",
      telephone: siteConfig.phone.tel,
      address: {
        "@type": "PostalAddress",
        streetAddress: nyc.address,
        addressLocality: "New York",
        addressRegion: "NY",
        postalCode: "10022",
        addressCountry: "US",
      },
      sameAs: [siteConfig.social.instagram],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.meta.siteName,
      url: siteConfig.meta.url,
    },
  ];
}

/**
 * Per-page JSON-LD following the audit's "08 Schema Map":
 * BreadcrumbList on every internal page + the page-type entity.
 * (FAQPage / ImageGallery details get added when each page's real
 * content is built.)
 */
export function buildPageJsonLd(page: SitePage) {
  const url = pageUrl(page);
  const nodes: object[] = [];

  if (page.path !== "/") {
    nodes.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.meta.url },
        { "@type": "ListItem", position: 2, name: page.h1, item: url },
      ],
    });
  }

  if (page.group === "procedure") {
    nodes.push({
      "@context": "https://schema.org",
      "@type": "MedicalProcedure",
      name: page.label,
      url,
      description: page.description,
      procedureType: "https://schema.org/SurgicalProcedure",
      performer: { "@id": PHYSICIAN_ID },
    });
  } else if (page.path === "/call-our-office") {
    nodes.push({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: page.h1,
      url,
      about: { "@id": PHYSICIAN_ID },
    });
  } else if (page.path === "/about-1") {
    nodes.push({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: page.h1,
      url,
      about: { "@id": PHYSICIAN_ID },
    });
  } else if (page.path === "/testimonials") {
    nodes.push({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: page.h1,
      url,
      about: { "@id": PHYSICIAN_ID },
    });
  } else if (page.path === "/beforeafter") {
    nodes.push({
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      name: page.h1,
      url,
      about: { "@id": PHYSICIAN_ID },
    });
  }

  return nodes;
}

/** Render helper: serialized <script> nodes for a page's JSON-LD. */
export function JsonLd({ nodes }: { nodes: object[] }) {
  return (
    <>
      {nodes.map((node, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }} />
      ))}
    </>
  );
}
