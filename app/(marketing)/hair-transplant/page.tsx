import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pages";
import { ProcedureTemplate } from "@/components/marketing/procedure/procedure-template";

export const metadata: Metadata = pageMetadata("/hair-transplant");

export default function Page() {
  return <ProcedureTemplate path="/hair-transplant" />;
}
