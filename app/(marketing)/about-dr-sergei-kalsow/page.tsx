import type { Metadata } from "next";
import { getPage, pageMetadata } from "@/lib/seo/pages";
import { JsonLd, buildPageJsonLd } from "@/lib/seo/schema";
import { AboutHero } from "@/components/marketing/about/about-hero";
import { AboutStory } from "@/components/marketing/about/about-story";
import { AboutAwards } from "@/components/marketing/about/about-awards";
import { MeetDoctor } from "@/components/marketing/about/meet-doctor";
import { MembershipStrip } from "@/components/marketing/home/membership-strip";

export const metadata: Metadata = pageMetadata("/about-dr-sergei-kalsow");

/**
 * About — content mirrors the old drkalsow.com/about-1 (bio, facial-surgery
 * quote, training awards, stats), on the Aubergine system:
 * hero panel (copy + portrait + stats) → story + bento → awards →
 * memberships → appointment details.
 */
export default function Page() {
  return (
    <>
      <JsonLd nodes={buildPageJsonLd(getPage("/about-dr-sergei-kalsow"))} />
      <AboutHero />
      <AboutStory />
      <AboutAwards />
      <MembershipStrip tone="white" />
      <MeetDoctor />
    </>
  );
}
