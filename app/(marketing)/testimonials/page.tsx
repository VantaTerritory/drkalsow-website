import type { Metadata } from "next";
import { getPage, pageMetadata } from "@/lib/seo/pages";
import { JsonLd, buildPageJsonLd } from "@/lib/seo/schema";
import { TestimonialsHero } from "@/components/marketing/testimonials/testimonials-hero";
import { PatientStories } from "@/components/marketing/testimonials/patient-stories";
import { ReviewGallery } from "@/components/marketing/testimonials/review-gallery";
import { FinalCta } from "@/components/marketing/home/final-cta";

export const metadata: Metadata = pageMetadata("/testimonials");

export default function Page() {
  return (
    <>
      <JsonLd nodes={buildPageJsonLd(getPage("/testimonials"))} />
      <TestimonialsHero />
      <PatientStories />
      <ReviewGallery />
      <FinalCta />
    </>
  );
}
