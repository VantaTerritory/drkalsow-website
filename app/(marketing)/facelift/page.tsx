import type { Metadata } from "next";
import { getPage, pageMetadata } from "@/lib/seo/pages";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = pageMetadata("/facelift");

// New URL per the SEO migration map: the live /hair-transplantation page had
// Facelift content under wrong metadata. That content migrates here;
// /hair-transplantation 301s to this page (see next.config.ts).
export default function Page() {
  return <PagePlaceholder page={getPage("/facelift")} />;
}
