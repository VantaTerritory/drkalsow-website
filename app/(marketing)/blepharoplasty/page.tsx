import type { Metadata } from "next";
import { getPage, pageMetadata } from "@/lib/seo/pages";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = pageMetadata("/blepharoplasty");

export default function Page() {
  return <PagePlaceholder page={getPage("/blepharoplasty")} />;
}
