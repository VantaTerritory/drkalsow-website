import { Fragment } from "react";
// B's own stylesheet: shipped only with this route, never to variant A (see its header)
import "./lipo-v2.css";
import { getPage } from "@/lib/seo/pages";
import { LIPO_360_V2, type Lv2Block, type Lv2HeroBlock } from "@/lib/landings/lipo-360-v2";
import { ConsultationForm } from "@/components/marketing/contact/consultation-form";
import { LandingStickyCta } from "@/components/marketing/landing/landing-sections";
import { VariantTracker } from "@/components/marketing/lipo-v2/variant-tracker";
import { StickyBarHeight } from "@/components/marketing/lipo-v2/sticky-bar-height";
import { ResultsBlock } from "@/components/marketing/lipo-v2/results";
import {
  HeroBlock,
  HeroDetails,
  ProcedureBlock,
  ExperienceBlock,
  TestimonialsBlock,
  DestinationBlock,
  FaqBlock,
  ClosingBlock,
  ConsultationIntro,
} from "@/components/marketing/lipo-v2/sections";

/**
 * Awake Lipo 360, variant B (Google Ads A/B test). Renders the blocks of
 * lib/landings/lipo-360-v2.ts in order. The `ld-page` wrapper keeps the
 * landing-level behavior of variant A (section rhythm, the mobile sticky
 * Call / Request bar and the room it needs); everything specific to B is
 * styled through `lv2-*` classes in ./lipo-v2.css, a route stylesheet, so
 * nothing here reaches variant A, not even as downloaded bytes.
 * No page JSON-LD: B is a noindex test page.
 */
export function LipoV2Page() {
  const page = getPage(LIPO_360_V2.path);
  const { blocks } = LIPO_360_V2;
  const hero = blocks.find((b): b is Lv2HeroBlock => b.kind === "hero");

  return (
    <div className="ld-page lv2-page" data-landing-variant={LIPO_360_V2.variant}>
      <VariantTracker variant={LIPO_360_V2.variant} test={LIPO_360_V2.test} />
      {blocks.map((block) => (
        <Fragment key={block.id}>
          <Block block={block} h1={page.h1} source={page.path} />
          {/* phones: the hero's lead, figures and CTAs move below this block */}
          {hero?.mobileDetailsAfter === block.id && <HeroDetails hero={hero} placement="mobile" />}
        </Fragment>
      ))}
      <LandingStickyCta />
      <StickyBarHeight />
    </div>
  );
}

function Block({ block, h1, source }: { block: Lv2Block; h1: string; source: string }) {
  switch (block.kind) {
    case "hero":
      return <HeroBlock block={block} h1={h1} />;
    case "results":
      return <ResultsBlock block={block} />;
    case "procedure":
      return <ProcedureBlock block={block} />;
    case "experience":
      return <ExperienceBlock block={block} />;
    case "testimonials":
      return <TestimonialsBlock block={block} />;
    case "destination":
      return <DestinationBlock block={block} />;
    case "faq":
      return <FaqBlock block={block} />;
    case "closing":
      return <ClosingBlock block={block} />;
    case "consultation":
      return <ConsultationForm id={block.id} source={source} intro={<ConsultationIntro block={block} />} />;
  }
}
