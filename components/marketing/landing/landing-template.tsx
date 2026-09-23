import { getPage, pageUrl, type SitePage } from "@/lib/seo/pages";
import { siteConfig } from "@/lib/site-config";
import { landingContent, type LandingContent, type LandingSectionKey } from "@/lib/landings/content";
import { JsonLd, PHYSICIAN_ID } from "@/lib/seo/schema";
import { ProcedureFaqSection } from "@/components/marketing/procedure/procedure-faq";
import { ConsultationForm } from "@/components/marketing/contact/consultation-form";
import {
  LandingHero,
  LandingQuickNav,
  LandingPillars,
  LandingSurgeonSpotlight,
  LandingWhatIsIt,
  LandingDetailsIntro,
  LandingGoals,
  LandingResults,
  LandingScars,
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
  LandingClosingCta,
  LandingStickyCta,
} from "@/components/marketing/landing/landing-sections";

/**
 * Shared layout for the SEO + paid landing pages (Awake Lipo 360, Breast
 * Reduction). The hero always comes first; everything after it follows the
 * page's own `sections` list, so one landing can lead with the surgeon and
 * his cases while the other keeps the SEO team's procedure-first order.
 * Each page passes only its path; copy comes from lib/landings/content.ts
 * and page-level SEO from lib/seo/pages.ts.
 */
export function LandingTemplate({ path }: { path: string }) {
  const page = getPage(path);
  const content = landingContent(path);

  return (
    <div className="ld-page">
      <JsonLd nodes={buildLandingJsonLd(page, content)} />
      <LandingHero page={page} content={content} />
      {content.sections.map((key) => (
        <LandingSection key={key} section={key} page={page} content={content} />
      ))}
      <LandingStickyCta />
    </div>
  );
}

function LandingSection({
  section,
  page,
  content,
}: {
  section: LandingSectionKey;
  page: SitePage;
  content: LandingContent;
}) {
  switch (section) {
    case "quicknav":
      return <LandingQuickNav content={content} />;
    case "pillars":
      return <LandingPillars content={content} />;
    case "surgeon-spotlight":
      return <LandingSurgeonSpotlight content={content} />;
    case "results":
      return <LandingResults content={content} />;
    case "scars":
      return <LandingScars content={content} />;
    case "consultation": {
      // Mid-page the form is a flat band; as the last section it keeps the
      // rounded top edge the site uses before the footer.
      const isLast = content.sections[content.sections.length - 1] === "consultation";
      return (
        <div className={isLast ? undefined : "ld-consult-mid"}>
          <ConsultationForm id="consultation" source={page.path} intro={<LandingCtaIntro content={content} />} />
        </div>
      );
    }
    case "details-intro":
      return <LandingDetailsIntro content={content} />;
    case "what-is-it":
      return <LandingWhatIsIt content={content} />;
    case "goals":
      return <LandingGoals content={content} />;
    case "how-it-works":
      return <LandingSteps content={content} />;
    case "insurance":
      return <LandingInsurance content={content} />;
    case "approach":
      return <LandingApproach content={content} />;
    case "candidacy":
      return <LandingCandidacy content={content} />;
    case "recovery":
      return <LandingRecovery content={content} />;
    case "safety":
      return <LandingSafety content={content} />;
    case "secondary":
      return <LandingSecondary content={content} />;
    case "travel":
      return <LandingTravel content={content} />;
    case "surgeon":
      return <LandingSurgeon content={content} />;
    case "faq":
      return <ProcedureFaqSection items={content.faq} tone={content.faqTone} />;
    case "closing":
      return <LandingClosingCta content={content} />;
  }
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
