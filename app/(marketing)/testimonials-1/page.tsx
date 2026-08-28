import type { Metadata } from "next";
import { getPage, pageMetadata } from "@/lib/seo/pages";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = pageMetadata("/testimonials-1");

export default function Page() {
  return <PagePlaceholder page={getPage("/testimonials-1")} />;
}
