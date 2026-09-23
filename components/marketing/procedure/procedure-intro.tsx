import { PROCEDURE_FACTS, type ProcedureContent } from "@/lib/procedures/content";
import { Eyebrow, Divider } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { StatBento } from "@/components/ui/stat-bento";

/**
 * "About the procedure": the practice's own description of the surgery,
 * with three figures under it so the block is not text alone.
 */
export function ProcedureIntro({ content }: { content: ProcedureContent }) {
  const facts = content.facts === false ? null : (content.facts ?? PROCEDURE_FACTS);
  return (
    <section className="bg-white section-py-lg" id="about-procedure">
      <div className="container">
        <Reveal className="proc-intro">
          <div className="proc-intro-head">
            <Eyebrow>About the Procedure</Eyebrow>
            <h2 className="h-sec">{content.intro.heading}</h2>
            <Divider />
          </div>
          <div className="proc-intro-body">
            {content.intro.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            {facts && <StatBento stats={facts} className="proc-facts" />}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
