import { Fragment } from "react";
// B's own stylesheet: shipped only with this route, never to variant A (see its header)
import "./lipo-v2.css";
import { getPage } from "@/lib/seo/pages";
import {
  LIPO_360_V2,
  type Lv2Block,
  type Lv2HeroBlock,
  type Lv2Patient,
  type Lv2ResultsBlock,
} from "@/lib/landings/lipo-360-v2";
import { ConsultationForm } from "@/components/marketing/contact/consultation-form";
import { LandingStickyCta } from "@/components/marketing/landing/landing-sections";
import { VariantTracker } from "@/components/marketing/lipo-v2/variant-tracker";
import { StickyBarHeight } from "@/components/marketing/lipo-v2/sticky-bar-height";
import { Clarity } from "@/components/marketing/lipo-v2/clarity";
import { ResultsBlock, galleryPatient } from "@/components/marketing/lipo-v2/results";
import { GUIDE_IDS } from "@/lib/landings/lipo-360-v2-guide";
import {
  ProseBlock,
  PointsBlock,
  DisclosureBlock,
  LessonsBlock,
  RevisionBlock,
} from "@/components/marketing/lipo-v2/guide";
import { LazyGuide } from "@/components/marketing/lipo-v2/lazy-guide";
import {
  HeroBlock,
  HeroDetails,
  WhyBlock,
  CalloutBlock,
  ProcedureBlock,
  DiagramsBlock,
  IncisionsBlock,
  TestimonialsBlock,
  DestinationBlock,
  InstagramBlock,
  FaqBlock,
  ClosingBlock,
  ConsultationIntro,
} from "@/components/marketing/lipo-v2/sections";

/**
 * Awake Lipo 360, variant B (Google Ads A/B test). Renders the blocks of
 * lib/landings/lipo-360-v2.ts in order. The `ld-page` wrapper keeps the
 * landing-level behavior of variant A (section rhythm, the mobile sticky
 * Call / Request bar and the room it needs); everything specific to B is
 * styled through `lv2-*` classes in ./lipo-v2.css (and guide.tsx's own
 * sheet), route stylesheets, so nothing here reaches variant A, not even
 * as downloaded bytes.
 * No page JSON-LD: B is a noindex test page.
 */
export function LipoV2Page() {
  const page = getPage(LIPO_360_V2.path);
  const { blocks } = LIPO_360_V2;
  const hero = blocks.find((b): b is Lv2HeroBlock => b.kind === "hero");
  const patients = blocks.find((b): b is Lv2ResultsBlock => b.kind === "results")?.patients ?? [];
  // the foot form keeps its rounded top; any other runs square, as in variant A
  const lastForm = blocks.findLast((b) => b.kind === "consultation")?.id;

  return (
    <div className="ld-page lv2-page" data-landing-variant={LIPO_360_V2.variant}>
      <VariantTracker variant={LIPO_360_V2.variant} test={LIPO_360_V2.test} />
      {blocks.map((block) => (
        <Fragment key={block.id}>
          <Block block={block} h1={page.h1} source={page.path} patients={patients} foot={block.id === lastForm} />
          {/* phones: the hero's lead, figures and CTAs move below this block */}
          {hero?.mobileDetailsAfter === block.id && <HeroDetails hero={hero} placement="mobile" />}
        </Fragment>
      ))}
      <LandingStickyCta />
      <StickyBarHeight />
      <Clarity />
    </div>
  );
}

function Block({
  block,
  h1,
  source,
  patients,
  foot,
}: {
  block: Lv2Block;
  h1: string;
  source: string;
  /** The page's last form, near the foot. */
  foot: boolean;
  /** The results' patients, for blocks that show one of them again (revision). */
  patients: Lv2Patient[];
}) {
  // draft 2's long-form blocks: mounted in the browser (lazy-guide.tsx)
  if (GUIDE_IDS.has(block.id)) {
    const patient = block.kind === "revision" ? patients.find((p) => p.number === block.patient) : undefined;
    return <LazyGuide id={block.id} patient={patient && galleryPatient(patient)} />;
  }
  switch (block.kind) {
    case "hero":
      return <HeroBlock block={block} h1={h1} />;
    case "why":
      return <WhyBlock block={block} />;
    case "results":
      return <ResultsBlock block={block} />;
    case "callout":
      return <CalloutBlock block={block} />;
    case "procedure":
      return <ProcedureBlock block={block} />;
    case "diagrams":
      return <DiagramsBlock block={block} />;
    case "incisions":
      return <IncisionsBlock block={block} />;
    case "instagram":
      return <InstagramBlock block={block} />;
    case "testimonials":
      return <TestimonialsBlock block={block} />;
    case "destination":
      return <DestinationBlock block={block} />;
    case "faq":
      return <FaqBlock block={block} />;
    case "closing":
      return <ClosingBlock block={block} />;
    case "consultation": {
      // masked in Clarity's recordings (clarity.tsx)
      const form = <ConsultationForm id={block.id} source={source} intro={<ConsultationIntro block={block} />} />;
      return (
        <div className={foot ? "lv2-form-end" : "ld-consult-mid"} data-clarity-mask="True">
          {form}
        </div>
      );
    }
    // generic blocks placed in lipo-360-v2.ts itself (the philosophy), rendered on the server
    case "prose":
      return <ProseBlock block={block} />;
    case "points":
      return <PointsBlock block={block} />;
    case "disclosure":
      return <DisclosureBlock block={block} />;
    case "lessons":
      return <LessonsBlock block={block} />;
    case "revision": {
      const patient = patients.find((p) => p.number === block.patient);
      return patient ? <RevisionBlock block={block} patient={galleryPatient(patient)} /> : null;
    }
  }
}
