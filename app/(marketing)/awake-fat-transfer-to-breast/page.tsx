import type { Metadata } from "next";
import { getPage, pageMetadata } from "@/lib/seo/pages";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export const metadata: Metadata = pageMetadata("/awake-fat-transfer-to-breast");

export default function Page() {
  return <PagePlaceholder page={getPage("/awake-fat-transfer-to-breast")} />;
}
