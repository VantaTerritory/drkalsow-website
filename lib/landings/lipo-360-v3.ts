import { LIPO_360_V2, type Lv2Page } from "@/lib/landings/lipo-360-v2";

/*
 * /lipo-360-v3: the doctor's own edit of variant B (his commit "Update Lipo
 * 360 page sections" on `development`, 14 Oct 2026), served beside B so he
 * can see it in production without touching the A/B test. Same blocks as
 * B, minus the ones he took out; the revision block loses its patient
 * gallery with the results block. Not part of the Google Ads test.
 */
const REMOVED: ReadonlySet<string> = new Set([
  "philosophy-highlight",
  "results",
  "lipo-360-details", // the incisions
  "limitations",
]);

export const LIPO_360_V3: Lv2Page = {
  path: "/lipo-360-v3",
  variant: "V3",
  test: "awake_lipo_360_doctor_edit",
  blocks: LIPO_360_V2.blocks.filter((b) => !REMOVED.has(b.id)),
};
