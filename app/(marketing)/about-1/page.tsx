import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pages";
import { AboutHero } from "@/components/marketing/about/about-hero";
import { AboutStory } from "@/components/marketing/about/about-story";
import { AboutAwards } from "@/components/marketing/about/about-awards";
import { MembershipStrip } from "@/components/marketing/home/membership-strip";
import { FinalCta } from "@/components/marketing/home/final-cta";

export const metadata: Metadata = pageMetadata("/about-1");

/**
 * About — content mirrors the live drkalsow.com/about-1 (bio, facial-surgery
 * quote, training awards, stats), on the Aubergine system:
 * hero panel (copy + portrait + stats) → story + bento → awards →
 * memberships → consultation CTA.
 */
export default function Page() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutAwards />
      <MembershipStrip />
      <FinalCta />
    </>
  );
}
