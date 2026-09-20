import { getPage } from "@/lib/seo/pages";
import { JsonLd, buildPageJsonLd } from "@/lib/seo/schema";
import { procedureContent, SHARED_FAQ } from "@/lib/procedures/content";
import { ProcedureHero } from "@/components/marketing/procedure/procedure-hero";
import { ProcedureIntro } from "@/components/marketing/procedure/procedure-intro";
import { ProcedurePhilosophy } from "@/components/marketing/procedure/procedure-philosophy";
import { ProcedureCases } from "@/components/marketing/procedure/procedure-cases";
import { ProcedureFaqSection } from "@/components/marketing/procedure/procedure-faq";
import { FinalCta } from "@/components/marketing/home/final-cta";

/**
 * Shared layout for all 12 procedure pages: hero (H1 + lead + surgery video)
 * → about the procedure → before/after cases → FAQ → consultation.
 * Each page passes only its path; copy comes from lib/procedures/content.ts
 * and page-level SEO from lib/seo/pages.ts, so a change here lands on every
 * procedure at once.
 */
export function ProcedureTemplate({ path }: { path: string }) {
  const page = getPage(path);
  const content = procedureContent(path);

  if (!content) {
    throw new Error(`No procedure content registered for ${path}`);
  }

  const faq = [...(content.faq ?? []), ...SHARED_FAQ];

  return (
    <>
      <JsonLd nodes={buildPageJsonLd(page)} />
      <ProcedureHero page={page} content={content} />
      <ProcedureIntro content={content} />
      {content.philosophy && <ProcedurePhilosophy content={content.philosophy} />}
      <ProcedureCases content={content} label={page.label} />
      <ProcedureFaqSection items={faq} />
      <FinalCta />
    </>
  );
}
