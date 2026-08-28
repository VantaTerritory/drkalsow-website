import type { Metadata } from "next";
import { getPage, pageMetadata } from "@/lib/seo/pages";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = pageMetadata("/arm-lipo-1");

export default function Page() {
  return <PagePlaceholder page={getPage("/arm-lipo-1")} />;
}
