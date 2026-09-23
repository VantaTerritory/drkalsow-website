import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import type { ProcedureFaq } from "@/lib/procedures/content";

/**
 * FAQ accordion built on native <details>, so it opens without JavaScript
 * and stays accessible and printable.
 */
export function ProcedureFaqSection({
  items,
  tone = "white",
}: {
  items: ProcedureFaq[];
  /** Background, so a page can keep its sections alternating. */
  tone?: "white" | "cream";
}) {
  if (items.length === 0) return null;

  return (
    <section className={`bg-${tone} section-py-lg`} id="faq">
      <div className="container-tight">
        <div className="section-header" style={{ marginBottom: "var(--space-5)" }}>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="h-sec">
            What patients <em>ask us.</em>
          </h2>
        </div>

        <Reveal className="faq-list">
          {items.map((item) => (
            <details className="faq-item" key={item.q}>
              <summary className="faq-question">
                {item.q}
                <span className="faq-marker" aria-hidden />
              </summary>
              <p className="faq-answer">{item.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
