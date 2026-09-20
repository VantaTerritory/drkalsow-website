import type { Metadata } from "next";
import { getPage, pageMetadata } from "@/lib/seo/pages";
import { JsonLd, buildPageJsonLd } from "@/lib/seo/schema";
import { Hero } from "@/components/marketing/home/hero";
import { MembershipStrip } from "@/components/marketing/home/membership-strip";
import { WhyChoose } from "@/components/marketing/home/why-choose";
import { About } from "@/components/marketing/home/about";
import { GalleryLinks } from "@/components/marketing/home/gallery-links";
import { OfficeShowcase } from "@/components/marketing/home/office-showcase";
import { SocialProof } from "@/components/marketing/home/social-proof";
import { FinalCta } from "@/components/marketing/home/final-cta";

export const metadata: Metadata = pageMetadata("/");

/**
 * Home, repositioned Sep 2026 around Awake Lipo 360 (SEO team roadmap):
 * hero → credentials strip → about → why patients choose Dr. Kalsow →
 * before/after gallery → NYC office + visit bento → testimonials → CTA.
 * (Live IG feed section intentionally left out for now — needs an embed decision.)
 */
export default function HomePage() {
  return (
    <>
      <JsonLd nodes={buildPageJsonLd(getPage("/"))} />
      <Hero />
      <MembershipStrip />
      <About />
      <WhyChoose />
      <GalleryLinks />
      <OfficeShowcase />
      <SocialProof />
      <FinalCta />
    </>
  );
}
