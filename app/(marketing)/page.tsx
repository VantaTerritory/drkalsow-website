import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pages";
import { Hero } from "@/components/marketing/home/hero";
import { MembershipStrip } from "@/components/marketing/home/membership-strip";
import { GalleryLinks } from "@/components/marketing/home/gallery-links";
import { OfficeShowcase } from "@/components/marketing/home/office-showcase";
import { SocialProof } from "@/components/marketing/home/social-proof";
import { Locations } from "@/components/marketing/home/locations";
import { FinalCta } from "@/components/marketing/home/final-cta";

export const metadata: Metadata = pageMetadata("/");

/**
 * Home — duplicates the live drkalsow.com home section by section:
 * hero → credentials strip → before/after gallery links → NYC office →
 * testimonials → visit us → consultation CTA.
 * (Live IG feed section intentionally left out for now — needs an embed decision.)
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <MembershipStrip />
      <GalleryLinks />
      <OfficeShowcase />
      <SocialProof />
      <Locations />
      <FinalCta />
    </>
  );
}
