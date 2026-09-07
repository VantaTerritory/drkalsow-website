import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { ProcedurePhilosophy as ProcedurePhilosophyContent } from "@/lib/procedures/content";

export function ProcedurePhilosophy({ content }: { content: ProcedurePhilosophyContent }) {
  return (
    <section className="proc-philosophy">
      <div className="container">
        <Reveal className="proc-philosophy-layout">
          <div className="proc-philosophy-head">
            <Eyebrow>Dr. Kalsow&apos;s Approach</Eyebrow>
            <h2>{content.heading}</h2>
          </div>

          <div className="proc-philosophy-body">
            {content.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}

            <ol className="proc-philosophy-principles">
              {content.principles.map((principle, index) => (
                <li key={principle}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {principle}
                </li>
              ))}
            </ol>

            <p className="proc-philosophy-closing">{content.closing}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
