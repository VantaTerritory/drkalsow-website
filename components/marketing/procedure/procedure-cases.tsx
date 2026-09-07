import Image from "next/image";
import Link from "next/link";
import type { ProcedureContent } from "@/lib/procedures/content";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SwipeCarousel } from "@/components/ui/swipe-carousel";
import { Reveal } from "@/components/motion/reveal";

/**
 * Before and after: at most three cases per procedure, from the practice's
 * own gallery. Carries the "individual results vary" disclaimer the practice
 * publishes with its results.
 */
export function ProcedureCases({ content, label }: { content: ProcedureContent; label: string }) {
  if (content.cases.length === 0) return null;

  return (
    <section className="bg-cream section-py-lg" id="results">
      <div className="container">
        <div className="section-header" style={{ marginBottom: "var(--space-5)" }}>
          <Eyebrow>Real Patients</Eyebrow>
          <h2 className="h-sec">
            {label} <em>results.</em>
          </h2>
          <p className="locations-subtitle">
            Photographed before and after surgery, from the front, the oblique and the side.
            Individual results vary.
          </p>
        </div>

        <Reveal>
          <SwipeCarousel
            className="proc-cases"
            data-count={content.cases.length}
            count={content.cases.length}
            label={`${label} before and after cases`}
            itemNoun="case"
          >
            {content.cases.map((c, i) => (
              <figure className="proc-case" key={c.image}>
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="(max-width: 768px) 90vw, 30vw"
                  loading={i === 0 ? "eager" : "lazy"}
                />
                <figcaption>Case {String(i + 1).padStart(2, "0")}</figcaption>
              </figure>
            ))}
          </SwipeCarousel>
        </Reveal>

        <p className="proc-cases-cta">
          <Link href="/beforeafter" className="link-arrow">
            See the full gallery →
          </Link>
        </p>
      </div>
    </section>
  );
}
