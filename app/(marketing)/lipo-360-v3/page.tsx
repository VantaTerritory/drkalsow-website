import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pages";
import { LIPO_360_V3 } from "@/lib/landings/lipo-360-v3";
import { LipoV2Page } from "@/components/marketing/lipo-v2/lipo-v2-page";

// The doctor's own edit of variant B, outside the A/B test. noindex (registry).
export const metadata: Metadata = pageMetadata("/lipo-360-v3");

/** Awake Lipo 360, the doctor's edit of variant B. */
export default function Page() {
  return <LipoV2Page data={LIPO_360_V3} />;
}
