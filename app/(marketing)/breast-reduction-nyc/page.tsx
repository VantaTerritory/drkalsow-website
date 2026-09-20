import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pages";
import { LandingTemplate } from "@/components/marketing/landing/landing-template";

export const metadata: Metadata = pageMetadata("/breast-reduction-nyc");

/** Breast Reduction landing, with the out-of-network insurance angle. */
export default function Page() {
  return <LandingTemplate path="/breast-reduction-nyc" />;
}
