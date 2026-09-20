import { siteConfig } from "@/lib/site-config";
import { pageUrl, type SitePage } from "@/lib/seo/pages";

/* ============================================================
   JSON-LD. Entity model per the SEO team's Sep 2026 roadmap (sheet
   03_Schemas): the surgeon (Person) and his practice (Physician, a
   MedicalBusiness) are separate nodes with stable @ids, and Dreams
   Plastic Surgery is a third node he founded. No Review / AggregateRating
   anywhere: self-controlled ratings are ineligible for stars and a
   liability under NY physician advertising rules.
   ============================================================ */
const SITE = siteConfig.meta.url;
export const PERSON_ID = `${SITE}/#person`;
export const PHYSICIAN_ID = `${SITE}/#physician`;
export const DREAMS_ID = `${siteConfig.dreams.url}#organization`;

/** Site-wide JSON-LD (root layout): Person + Physician + Dreams + WebSite. */
export function buildJsonLd() {
  const nyc = siteConfig.locations[0];
  const image = `${SITE}${siteConfig.meta.ogImage}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Sergei Kalsow",
      honorificPrefix: "Dr.",
      honorificSuffix: "MD",
      jobTitle: "Plastic Surgeon",
      url: SITE,
      image,
      sameAs: [siteConfig.social.instagram, siteConfig.social.youtube],
      worksFor: { "@id": PHYSICIAN_ID },
      affiliation: [{ "@id": PHYSICIAN_ID }, { "@id": DREAMS_ID }],
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Board Certification",
        name: "American Board of Plastic Surgery",
        recognizedBy: { "@type": "Organization", name: "American Board of Plastic Surgery" },
      },
      knowsAbout: ["Awake Lipo 360", "Liposuction", "Body contouring", "Plastic surgery"],
    },
    {
      "@context": "https://schema.org",
      "@type": "Physician",
      "@id": PHYSICIAN_ID,
      name: siteConfig.surgeon,
      url: SITE,
      image,
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
      openingHoursSpecification: nyc.openingHours.map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.dayOfWeek,
        opens: h.opens,
        closes: h.closes,
      })),
      founder: { "@id": PERSON_ID },
      sameAs: [siteConfig.social.instagram],
    },
    {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      "@id": DREAMS_ID,
      name: siteConfig.dreams.name,
      url: siteConfig.dreams.url,
      founder: { "@id": PERSON_ID },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.meta.siteName,
      url: SITE,
      about: { "@id": PERSON_ID },
      publisher: { "@id": PHYSICIAN_ID },
    },
  ];
}

/**
 * Per-page JSON-LD: BreadcrumbList on every internal page + the page-type
 * entity. (FAQPage / ImageObject details get added when each page's real
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
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: page.h1, item: url },
      ],
    });
  }

  if (page.path === "/") {
    nodes.push({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.title,
      url,
      mainEntity: { "@id": PERSON_ID },
      about: { "@id": PHYSICIAN_ID },
    });
  } else if (page.group === "procedure") {
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
  } else if (page.path === "/about-dr-sergei-kalsow") {
    nodes.push({
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      name: page.h1,
      url,
      mainEntity: { "@id": PERSON_ID },
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
