import { getPage, pageUrl, type SitePage } from "@/lib/seo/pages";
import { siteConfig } from "@/lib/site-config";
import { landingContent, type LandingContent } from "@/lib/landings/content";
import { JsonLd, PHYSICIAN_ID } from "@/lib/seo/schema";
import { ProcedureFaqSection } from "@/components/marketing/procedure/procedure-faq";
import { ConsultationForm } from "@/components/marketing/contact/consultation-form";
import {
  LandingHero,
  LandingIntroBar,
  LandingWhatIsIt,
  LandingGoals,
  LandingResults,
  LandingSteps,
  LandingInsurance,
  LandingApproach,
  LandingCandidacy,
  LandingRecovery,
  LandingSafety,
  LandingSecondary,
  LandingTravel,
  LandingSurgeon,
  LandingCtaIntro,
  LandingStickyCta,
} from "@/components/marketing/landing/landing-sections";

/**
 * Shared layout for the SEO + paid landing pages (Awake Lipo 360, Breast
 * Reduction). Section order follows the SEO team's drafts; optional sections
 * (insurance, safety, secondary topic) render only when the content has them.
 * Each page passes only its path; copy comes from lib/landings/content.ts and
 * page-level SEO from lib/seo/pages.ts.
 */
export function LandingTemplate({ path }: { path: string }) {
  const page = getPage(path);
  const content = landingContent(path);

  return (
    <div className="ld-page">
      <JsonLd nodes={buildLandingJsonLd(page, content)} />
      <LandingHero page={page} content={content} />
      <LandingIntroBar content={content} />
      <LandingWhatIsIt content={content} />
      <LandingGoals content={content} />
      <LandingResults content={content} />
      <LandingSteps content={content} />
      {content.insurance && <LandingInsurance content={content} />}
      <LandingApproach content={content} />
      <LandingCandidacy content={content} />
      <LandingRecovery content={content} />
      {content.safety && <LandingSafety content={content} />}
      {content.secondary && <LandingSecondary content={content} />}
      <LandingTravel content={content} />
      <LandingSurgeon content={content} />
      <ProcedureFaqSection items={content.faq} />
      <ConsultationForm id="consultation" source={page.path} intro={<LandingCtaIntro content={content} />} />
      <LandingStickyCta />
    </div>
  );
}

/**
 * Page graph per the SEO team's draft: WebPage about the procedure, the
 * procedure itself, the visible FAQ, and a two-level breadcrumb (the site has
 * no /procedures hub, so the draft's middle crumb is dropped).
 */
function buildLandingJsonLd(page: SitePage, content: LandingContent) {
  const url = pageUrl(page);
  const procedureId = `${url}#procedure`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      about: { "@id": procedureId },
      mainEntity: { "@id": PHYSICIAN_ID },
    },
    {
      "@context": "https://schema.org",
      "@type": "MedicalProcedure",
      "@id": procedureId,
      name: content.schema.name,
      url,
      procedureType: "https://schema.org/SurgicalProcedure",
      bodyLocation: content.schema.bodyLocation,
      description: content.schema.description,
      performer: { "@id": PHYSICIAN_ID },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: content.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.meta.url },
        { "@type": "ListItem", position: 2, name: page.h1, item: url },
      ],
    },
  ];
}
