"use client";

import { GUIDE_BLOCKS } from "@/lib/landings/lipo-360-v2-guide";
import type { BaGalleryPatient } from "@/components/marketing/lipo-v2/ba-gallery";
import {
  ProseBlock,
  PointsBlock,
  DisclosureBlock,
  LessonsBlock,
  RevisionBlock,
} from "@/components/marketing/lipo-v2/guide";

/**
 * One of draft 2's long-form blocks, by id, rendered in the browser (loaded
 * by lazy-guide.tsx). Its copy travels in this chunk, not in the page's
 * HTML. `patient` is the revision block's patient, already stripped of
 * the Drive file names by the page.
 */
export default function GuideById({ id, patient }: { id: string; patient?: BaGalleryPatient }) {
  const block = GUIDE_BLOCKS.find((b) => b.id === id);
  if (!block) return null;
  switch (block.kind) {
    case "prose":
      return <ProseBlock block={block} />;
    case "points":
      return <PointsBlock block={block} />;
    case "disclosure":
      return <DisclosureBlock block={block} />;
    case "lessons":
      return <LessonsBlock block={block} />;
    case "revision":
      return patient ? <RevisionBlock block={block} patient={patient} /> : null;
  }
}
