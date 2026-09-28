import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pages";
import { LipoV2Page } from "@/components/marketing/lipo-v2/lipo-v2-page";

// Variant B of the Awake Lipo 360 Google Ads A/B test. noindex (registry).
export const metadata: Metadata = pageMetadata("/lipo-360-v2");

/** Awake Lipo 360, variant B: the client's content and order on the site's design. */
export default function Page() {
  return <LipoV2Page />;
}
