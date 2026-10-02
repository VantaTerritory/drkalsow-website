import type { Metadata } from "next";
import { getPage, pageMetadata } from "@/lib/seo/pages";
import { buildPageJsonLd, JsonLd } from "@/lib/seo/schema";
import { ContactHero } from "@/components/marketing/contact/contact-hero";
import { ConsultationOptions } from "@/components/marketing/contact/consultation-options";
import { ConsultationForm } from "@/components/marketing/contact/consultation-form";
import { OfficeVisit } from "@/components/marketing/contact/office-visit";

export const metadata: Metadata = pageMetadata("/call-our-office");

/**
 * Contact — mirrors the live drkalsow.com/call-our-office: phone first, the
 * request form right under the hero (moved up on 2 Oct 2026 so it is one
 * scroll away), the three consultation routes with their published fees and
 * the office location. The live page also repeats the home-page stat strip
 * and the awake-lipo philosophy blocks (including the copywriter's unedited
 * production notes); neither belongs on a contact page.
 */
export default function Page() {
  const page = getPage("/call-our-office");

  return (
    <>
      <JsonLd nodes={buildPageJsonLd(page)} />
      <ContactHero page={page} />
      <ConsultationForm tone="white" />
      <ConsultationOptions />
      <OfficeVisit />
    </>
  );
}
