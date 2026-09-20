import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pages";
import { LandingTemplate } from "@/components/marketing/landing/landing-template";

export const metadata: Metadata = pageMetadata("/awake-lipo-360-nyc");

/** Awake Lipo 360 pillar: the site's main authority page and Google Ads landing. */
export default function Page() {
  return <LandingTemplate path="/awake-lipo-360-nyc" />;
}
