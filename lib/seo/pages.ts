import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

/* ============================================================
   PAGE REGISTRY — single source of truth for routes + SEO.
   Source: DrKalsow_SEO_Migration_Audit_2026-08-25.xlsx (SEO team).
   Titles / metas / H1s = "propuesto" columns of "00 Migration Map".
   Slugs preserved EXACTLY as the live site ("-1" suffixes included)
   per the audit: do NOT clean slugs during the migration.
   Redirects live in next.config.mjs (sheet "02 Redirect Map").
   Phase-2 pages (upper-east-side, mommy-makeover, tummy-tuck, etc.)
   are intentionally NOT created at launch — see AGENTS.md.
   UPDATE Sep 2026: "Dr Kalsow - Septiembre.xlsx" (SEO team, sheet
   01_Matriz_URLs) repositions the site around Awake Lipo 360. Home and
   About below follow its Title/H1 drafts; About also moves to the clean
   URL it requests (301 from /about-1 in next.config.mjs). Its meta
   descriptions are ours (the sheet has no description column).
   ============================================================ */

export type PageGroup = "core" | "procedure" | "practice" | "landing" | "utility";
export type ProcedureCategory = "face" | "breast" | "body" | "hair";

export interface SitePage {
  /** Route path, e.g. "/rhinoplasty". Home = "/". */
  path: string;
  /** Label used in nav / link grids. */
  label: string;
  /** <title> — SEO team's proposed title. */
  title: string;
  /** meta description — SEO team's proposed meta. */
  description: string;
  /** On-page H1 — SEO team's proposed H1. */
  h1: string;
  group: PageGroup;
  /** Face / Breast / Body / Hair — drives the grouped Procedures nav. */
  category?: ProcedureCategory;
  /** Shown in the header nav (top level or Procedures dropdown). */
  inNav?: boolean;
  /** Include in sitemap.xml (default true). Only 200 indexable finals. */
  inSitemap?: boolean;
  /** Emit a noindex robots tag (utility pages). Set inSitemap: false too. */
  noindex?: boolean;
  /** Schema recommended by the audit (sheet "08 Schema Map"). */
  schema?: string;
}

export const SITE_PAGES: readonly SitePage[] = [
  // ---- Core ----
  {
    path: "/",
    label: "Home",
    title: "Dr. Sergei Kalsow | Awake Lipo 360 Surgeon in NYC",
    description:
      "Dr. Sergei Kalsow, MD, board-certified plastic surgeon in New York City, focuses on Awake Lipo 360 and body contouring, and also offers breast and facial procedures.",
    // Sheet draft uses an em dash; the client bans them in copy, so a colon.
    h1: "Dr. Sergei Kalsow, MD: Awake Lipo 360 & Body Contouring in NYC",
    group: "core",
    inNav: true,
    schema: "Physician + Person + WebSite",
  },
  {
    path: "/about-dr-sergei-kalsow",
    label: "About",
    title: "About Dr. Sergei Kalsow | Plastic Surgeon & Dreams Founder",
    description:
      "Learn about Dr. Sergei Kalsow, a board-certified plastic surgeon in New York City and founder of Dreams Plastic Surgery: training, surgical experience, awards and approach.",
    h1: "About Dr. Sergei Kalsow, MD",
    group: "core",
    inNav: true,
    schema: "ProfilePage + Person + BreadcrumbList",
  },
  {
    path: "/testimonials",
    label: "Testimonials",
    title: "Patient Testimonials | Dr. Sergei Kalsow NYC",
    description:
      "Read patient testimonials about Dr. Sergei Kalsow’s plastic surgery care in New York City, including experiences with procedures, recovery and results.",
    h1: "Patient Testimonials for Dr. Sergei Kalsow",
    group: "core",
    inNav: true,
    schema: "CollectionPage + BreadcrumbList",
  },
  {
    path: "/beforeafter",
    label: "Before / After",
    title: "Plastic Surgery Before & After NYC | Dr. Kalsow",
    description:
      "Explore Dr. Sergei Kalsow’s plastic surgery before-and-after gallery in NYC, with real patient results across breast, body, face and contouring procedures.",
    h1: "Plastic Surgery Before & After Gallery",
    group: "core",
    inNav: true,
    schema: "ImageGallery + BreadcrumbList",
  },
  {
    path: "/call-our-office",
    label: "Contact",
    title: "Contact Dr. Sergei Kalsow | NYC Plastic Surgery",
    description:
      "Contact Dr. Sergei Kalsow’s NYC office to schedule an in-person or virtual consultation, ask about procedures and learn about appointment options.",
    h1: "Contact Dr. Kalsow’s NYC Office",
    group: "core",
    inNav: true,
    schema: "ContactPage + Physician + BreadcrumbList",
  },

  // ---- Procedures · Face ----
  {
    path: "/facelift",
    label: "Facelift",
    title: "Facelift NYC | Dr. Sergei Kalsow, Plastic Surgeon",
    description:
      "Explore facelift surgery in NYC with Dr. Sergei Kalsow, including candidacy, surgical approach, recovery, expected results and before-and-after examples.",
    h1: "Facelift Surgery in NYC",
    group: "procedure",
    category: "face",
    inNav: true,
    schema: "MedicalProcedure + BreadcrumbList",
  },
  {
    path: "/rhinoplasty",
    label: "Rhinoplasty",
    title: "Rhinoplasty NYC | Dr. Sergei Kalsow",
    description:
      "Learn about rhinoplasty in NYC with Dr. Sergei Kalsow, including candidacy, surgical planning, recovery, expected results and personalized consultation.",
    h1: "Rhinoplasty in NYC",
    group: "procedure",
    category: "face",
    inNav: true,
    schema: "MedicalProcedure + BreadcrumbList",
  },
  {
    path: "/blepharoplasty",
    label: "Blepharoplasty",
    title: "Blepharoplasty NYC | Dr. Sergei Kalsow",
    description:
      "Explore blepharoplasty in NYC with Dr. Sergei Kalsow, including upper and lower eyelid surgery, candidacy, recovery and expected results.",
    h1: "Blepharoplasty in NYC",
    group: "procedure",
    category: "face",
    inNav: true,
    schema: "MedicalProcedure + BreadcrumbList",
  },
  {
    path: "/chin-lipo",
    label: "Chin Lipo",
    title: "Chin Liposuction NYC | Dr. Sergei Kalsow",
    description:
      "Explore chin liposuction in NYC with Dr. Sergei Kalsow to improve jawline and neck contour, including candidacy, recovery, results and consultation.",
    h1: "Chin Liposuction in NYC",
    group: "procedure",
    category: "face",
    inNav: true,
    schema: "MedicalProcedure + BreadcrumbList",
  },
  {
    path: "/lip-augmentation",
    label: "Lip Augmentation",
    title: "Lip Augmentation NYC | Dr. Sergei Kalsow",
    description:
      "Explore lip augmentation in NYC with Dr. Sergei Kalsow, including treatment options, candidacy, expected results, recovery and a personalized consultation.",
    h1: "Lip Augmentation in NYC",
    group: "procedure",
    category: "face",
    inNav: true,
    schema: "MedicalProcedure + BreadcrumbList",
  },

  // ---- Procedures · Breast ----
  {
    path: "/breast-augmentation",
    label: "Breast Augmentation",
    title: "Breast Augmentation NYC | Dr. Sergei Kalsow",
    description:
      "Explore breast augmentation in NYC with Dr. Sergei Kalsow, including implant options, candidacy, surgical planning, recovery and expected results.",
    h1: "Breast Augmentation in NYC",
    group: "procedure",
    category: "breast",
    inNav: true,
    schema: "MedicalProcedure + BreadcrumbList",
  },
  {
    path: "/breast-lift-and-reduction-1",
    label: "Breast Lift & Reduction",
    title: "Breast Lift & Reduction NYC | Dr. Sergei Kalsow",
    description:
      "Learn about breast lift and breast reduction surgery in NYC with Dr. Sergei Kalsow, including candidacy, procedure planning, recovery and results.",
    h1: "Breast Lift & Breast Reduction in NYC",
    group: "procedure",
    category: "breast",
    inNav: true,
    schema: "MedicalProcedure + BreadcrumbList",
  },
  {
    path: "/awake-fat-transfer-to-breast",
    label: "Awake Fat Transfer to Breast",
    title: "Awake Fat Transfer to Breast NYC | Dr. Kalsow",
    description:
      "Learn about awake fat transfer to the breast in NYC with Dr. Sergei Kalsow, using your own fat to enhance breast volume with a personalized surgical plan.",
    h1: "Awake Fat Transfer to Breast in NYC",
    group: "procedure",
    category: "breast",
    inNav: true,
    schema: "MedicalProcedure + BreadcrumbList",
  },

  // ---- Procedures · Body ----
  {
    path: "/lipo-360-bbl",
    label: "Lipo 360 + BBL",
    title: "Lipo 360 + BBL NYC | Dr. Sergei Kalsow",
    description:
      "Learn about Lipo 360 with BBL in NYC with Dr. Sergei Kalsow, including candidacy, fat transfer, recovery, results and personalized surgical planning.",
    h1: "Lipo 360 + BBL in NYC",
    group: "procedure",
    category: "body",
    inNav: true,
    schema: "MedicalProcedure + BreadcrumbList",
  },
  {
    path: "/skinny-bbl",
    label: "Skinny BBL",
    title: "Skinny BBL NYC | Dr. Sergei Kalsow",
    description:
      "Explore Skinny BBL in NYC with Dr. Sergei Kalsow for slimmer patients, including candidacy, fat transfer planning, recovery and expected results.",
    h1: "Skinny BBL in NYC",
    group: "procedure",
    category: "body",
    inNav: true,
    schema: "MedicalProcedure + BreadcrumbList",
  },
  {
    path: "/arm-lipo-1",
    label: "Arm Lipo",
    title: "Arm Liposuction NYC | Dr. Sergei Kalsow",
    description:
      "Explore arm liposuction in NYC with Dr. Sergei Kalsow, including candidacy, upper-arm contouring, recovery, expected results and consultation.",
    h1: "Arm Liposuction in NYC",
    group: "procedure",
    category: "body",
    inNav: true,
    schema: "MedicalProcedure + BreadcrumbList",
  },

  // ---- Procedures · Hair ----
  {
    path: "/hair-transplant",
    label: "Hair Transplant",
    title: "Hair Transplant NYC | Dr. Sergei Kalsow",
    description:
      "Learn about hair transplant in NYC with Dr. Sergei Kalsow, including candidacy, treatment planning, recovery and natural-looking hair restoration results.",
    h1: "Hair Transplant in NYC",
    group: "procedure",
    category: "hair",
    inNav: true,
    schema: "MedicalProcedure + BreadcrumbList",
  },

  // ---- Landings (SEO + paid) ----
  // Standalone pages built from the SEO team's HTML drafts. Not part of the
  // Procedures menu or the footer: they live on their own, indexable and in
  // the sitemap. Title/description/H1 = theirs.
  // Awake Lipo 360: Dr_Kalsow_Awake_Lipo_360_SEO_Paid_v14.html (main Ads landing).
  {
    path: "/awake-lipo-360-nyc",
    label: "Awake Lipo 360",
    title: "Awake Lipo 360 NYC | Dr. Sergei Kalsow",
    description:
      "Explore Awake Lipo 360 in New York City with Dr. Sergei Kalsow. Learn treatment areas, candidacy, recovery, results, and what to expect. Request a consultation.",
    h1: "Awake Lipo 360 in NYC",
    group: "landing",
    schema: "WebPage + MedicalProcedure + FAQPage + BreadcrumbList",
  },
  // Breast Reduction landing (Dr_Kalsow_Breast_Reduction_NYC_SEO_Paid_v2.html).
  {
    path: "/breast-reduction-nyc",
    label: "Breast Reduction",
    title: "Breast Reduction NYC | Dr. Sergei Kalsow",
    description:
      "Breast reduction in New York City with Dr. Sergei Kalsow. Learn how reduction mammoplasty can reduce breast size, reshape and lift the breasts, improve comfort, and whether out-of-network insurance benefits may apply.",
    h1: "Breast Reduction in NYC",
    group: "landing",
    schema: "WebPage + MedicalProcedure + FAQPage + BreadcrumbList",
  },

  // ---- Practice / secondary ----
  // ⚠️ These two exist live (200, indexable) but do NOT appear in the SEO
  // team's migration map (orphans — not linked, so the crawl missed them).
  // Kept reachable with their live metadata, out of nav and sitemap.
  // OPEN QUESTION for the SEO team: keep, consolidate or redirect.
  {
    path: "/dreamsplasticsurgery",
    label: "Dreams Plastic Surgery",
    title: "Dreams Plastic Surgery NYC | Led by Dr. Kalsow",
    description:
      "Learn about Dreams Plastic Surgery in NYC and Dr. Kalsow’s patient-focused approach to cosmetic and reconstructive procedures with natural-looking results.",
    h1: "Dreams Plastic Surgery NYC",
    group: "practice",
    inSitemap: false,
  },
  {
    path: "/testimonials-1",
    label: "Dreams Reviews",
    title: "Dreams Plastic Surgery Reviews | Patient Testimonials NYC",
    description:
      "Read real patient testimonials about their experiences at Dreams Plastic Surgery. Discover why patients trust Dr. Kalsow and his team for exceptional care and results.",
    h1: "Dreams Plastic Surgery Reviews",
    group: "practice",
    inSitemap: false,
  },

  // ---- Utility ----
  // Confirmation page the consultation form redirects to after a successful
  // send (all three forms; the origin travels as ?source=<path>). It exists
  // so GTM / Ads / Meta can count the lead on a plain page view. Not an SEO
  // page: noindex, out of sitemap, nav and llms.txt.
  {
    path: "/thank-you",
    label: "Thank You",
    title: "Thank You | Dr. Sergei Kalsow",
    description:
      "Your consultation request has been received. Dr. Kalsow’s New York City office will be in touch to confirm your appointment.",
    h1: "Thank you, we have your request.",
    group: "utility",
    inSitemap: false,
    noindex: true,
  },
] as const;

export const NAV_PAGES = SITE_PAGES.filter((p) => p.inNav && p.group === "core");
export const NAV_PROCEDURES = SITE_PAGES.filter((p) => p.inNav && p.group === "procedure");
export const ALL_PROCEDURES = SITE_PAGES.filter((p) => p.group === "procedure");

/** Procedures grouped for direct navigation by Face / Breast / Body / Hair. */
export const PROCEDURE_CATEGORIES: readonly { key: ProcedureCategory; label: string }[] = [
  { key: "face", label: "Face" },
  { key: "breast", label: "Breast" },
  { key: "body", label: "Body" },
  { key: "hair", label: "Hair" },
];

export function proceduresByCategory(category: ProcedureCategory) {
  return ALL_PROCEDURES.filter((p) => p.category === category);
}

export function getPage(path: string): SitePage {
  const page = SITE_PAGES.find((p) => p.path === path);
  if (!page) throw new Error(`Unknown page path: ${path}`);
  return page;
}

/** Absolute canonical URL for a registered page. */
export function pageUrl(page: SitePage): string {
  return `${siteConfig.meta.url}${page.path === "/" ? "" : page.path}`;
}

/** Build the Next.js Metadata object for a registered page. */
export function pageMetadata(path: string): Metadata {
  const page = getPage(path);
  const url = pageUrl(page);
  // Utility pages stay out of the index: robots directive only, no canonical
  // and no social card (nobody shares a form confirmation).
  if (page.noindex) {
    return {
      title: page.title,
      description: page.description,
      robots: { index: false, follow: true },
    };
  }
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: siteConfig.meta.siteName,
      type: "website",
      images: [{ url: siteConfig.meta.ogImage, width: 1200, height: 630, alt: siteConfig.surgeon }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [siteConfig.meta.ogImage],
    },
  };
}
