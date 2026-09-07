import type { Metadata } from "next";
import { getPage, pageMetadata } from "@/lib/seo/pages";
import { buildPageJsonLd, JsonLd } from "@/lib/seo/schema";
import {
  BeforeAfterGallery,
  BeforeAfterHero,
} from "@/components/marketing/before-after/before-after-gallery";
import { ProcedureFaqSection } from "@/components/marketing/procedure/procedure-faq";
import { FinalCta } from "@/components/marketing/home/final-cta";
import { BEFORE_AFTER_FAQ } from "@/lib/before-after/cases";

export const metadata: Metadata = pageMetadata("/beforeafter");

export default function Page() {
  const page = getPage("/beforeafter");

  return (
    <>
      <JsonLd nodes={buildPageJsonLd(page)} />
      <BeforeAfterHero />
      <BeforeAfterGallery />
      <ProcedureFaqSection items={BEFORE_AFTER_FAQ} />
      <FinalCta />
    </>
  );
}
