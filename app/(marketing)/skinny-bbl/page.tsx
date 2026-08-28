import type { Metadata } from "next";
import { getPage, pageMetadata } from "@/lib/seo/pages";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = pageMetadata("/skinny-bbl");

export default function Page() {
  return <PagePlaceholder page={getPage("/skinny-bbl")} />;
}
