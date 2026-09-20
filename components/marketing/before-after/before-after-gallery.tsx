import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { SwipeCarousel } from "@/components/ui/swipe-carousel";
import { BeforeAfterIndex } from "@/components/marketing/before-after/before-after-index";
import { BEFORE_AFTER_PROCEDURES } from "@/lib/before-after/cases";

export function BeforeAfterHero() {
  return (
    <section className="ba-gallery-hero">
      <div className="container ba-gallery-hero-inner">
        <div className="ba-gallery-hero-copy">
          <Eyebrow>Real patient results</Eyebrow>
          <h1 className="h-display">
            Plastic Surgery <em>Before &amp; After</em> Gallery
          </h1>
          <p>
            Explore a curated selection of Dr. Kalsow&apos;s patient outcomes, starting with
            liposuction and body contouring, then breast and facial procedures. Each result
            reflects an individual treatment plan.
          </p>
        </div>

        <div className="ba-gallery-clinical-note">
          <p>Our standard</p>
          <strong>Results should survive honest photography.</strong>
          <span>
            Review front, oblique, side and back views when available. No single angle tells the
            whole story. Individual results vary.
          </span>
        </div>
      </div>
    </section>
  );
}

export function BeforeAfterGallery() {
  return (
    <section className="ba-gallery-browser" aria-label="Patient result gallery">
      <BeforeAfterIndex
        items={BEFORE_AFTER_PROCEDURES.map(({ id, label }) => ({ id, label }))}
      />

      <div className="ba-gallery-main">
        <div className="container">
          {BEFORE_AFTER_PROCEDURES.map((procedure, procedureIndex) => (
            <Reveal
              as="section"
              className="ba-gallery-procedure"
              id={procedure.id}
              key={procedure.id}
            >
              <div className="ba-gallery-procedure-head">
                <div>
                  <p className="ba-gallery-procedure-meta">
                    <span>{String(procedureIndex + 1).padStart(2, "0")}</span>
                    {procedure.category}
                  </p>
                  <h2>{procedure.label}</h2>
                </div>
                <div className="ba-gallery-procedure-intro">
                  <p>{procedure.introduction}</p>
                  <Link href={procedure.path} className="link-arrow">
                    Explore {procedure.label} <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>

              <SwipeCarousel
                className="ba-gallery-grid"
                count={procedure.cases.length}
                label={`${procedure.label} patient results`}
                itemNoun={`${procedure.label} patient`}
              >
                {procedure.cases.map((patientCase, caseIndex) => (
                  <figure className="ba-gallery-case" key={patientCase.src}>
                    <Link
                      href={procedure.path}
                      className="ba-gallery-case-image"
                      aria-label={`Explore ${procedure.label}, patient ${caseIndex + 1}`}
                    >
                      <Image
                        src={patientCase.src}
                        alt={patientCase.alt}
                        fill
                        sizes="(max-width: 680px) 92vw, (max-width: 1100px) 46vw, 25vw"
                      />
                    </Link>
                    <figcaption>
                      <span>Patient {String(caseIndex + 1).padStart(2, "0")}</span>
                      <Link href={procedure.path} aria-label={`Explore ${procedure.label}`}>
                        View procedure <span aria-hidden>↗</span>
                      </Link>
                    </figcaption>
                  </figure>
                ))}
              </SwipeCarousel>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
