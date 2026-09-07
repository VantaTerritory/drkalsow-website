import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pages";
import { ProcedureTemplate } from "@/components/marketing/procedure/procedure-template";

export const metadata: Metadata = pageMetadata("/arm-lipo-1");

export default function Page() {
  return <ProcedureTemplate path="/arm-lipo-1" />;
}
