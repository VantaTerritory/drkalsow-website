import type { Metadata } from "next";
import { getPage, pageMetadata } from "@/lib/seo/pages";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = pageMetadata("/about-1");

export default function Page() {
  return <PagePlaceholder page={getPage("/about-1")} />;
}
