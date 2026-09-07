import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pages";
import { ProcedureTemplate } from "@/components/marketing/procedure/procedure-template";

export const metadata: Metadata = pageMetadata("/awake-fat-transfer-to-breast");

export default function Page() {
  return <ProcedureTemplate path="/awake-fat-transfer-to-breast" />;
}
