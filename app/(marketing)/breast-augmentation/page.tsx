import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pages";
import { ProcedureTemplate } from "@/components/marketing/procedure/procedure-template";

export const metadata: Metadata = pageMetadata("/breast-augmentation");

export default function Page() {
  return <ProcedureTemplate path="/breast-augmentation" />;
}
