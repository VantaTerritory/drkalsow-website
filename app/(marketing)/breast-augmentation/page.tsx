import type { Metadata } from "next";
import { getPage, pageMetadata } from "@/lib/seo/pages";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = pageMetadata("/breast-augmentation");

export default function Page() {
  return <PagePlaceholder page={getPage("/breast-augmentation")} />;
}
