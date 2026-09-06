import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pages";
import { Hero } from "@/components/marketing/home/hero";
import { MembershipStrip } from "@/components/marketing/home/membership-strip";
import { About } from "@/components/marketing/home/about";
import { GalleryLinks } from "@/components/marketing/home/gallery-links";
import { OfficeShowcase } from "@/components/marketing/home/office-showcase";
import { SocialProof } from "@/components/marketing/home/social-proof";
import { FinalCta } from "@/components/marketing/home/final-cta";

export const metadata: Metadata = pageMetadata("/");

/**
 * Home — duplicates the live drkalsow.com home section by section:
 * hero → credentials strip → about → before/after gallery →
 * NYC office + visit bento → testimonials → consultation CTA.
 * (Live IG feed section intentionally left out for now — needs an embed decision.)
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <MembershipStrip />
      <About />
      <GalleryLinks />
      <OfficeShowcase />
      <SocialProof />
      <FinalCta />
    </>
  );
}
