import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { BeforeAfterGalleryV2, type BaGalleryPatient } from "@/components/marketing/lipo-v2/ba-gallery";
import type { Lv2ResultsBlock } from "@/lib/landings/lipo-360-v2";

/*
 * Results of /lipo-360-v2: the doctor's before/after composites, one group
 * of three views per patient, behind a veil (styles: LV2 · RESULTS in the
 * LV2-MEDIA region of lipo-v2.css).
 *
 * The veil rule (Google Ads review): the HTML, the RSC payload inside it
 * and every preload hint only ever carry the blurred previews. The client
 * gets ids, labels and alt texts, never the Drive file names (`source`)
 * nor an original's URL; the lightbox builds that URL from the id after
 * a tap.
 *
 * Phones: the section follows the hero, so the header shrinks to the
 * eyebrow and one line of heading and the intro and the veil note move
 * under the patients (CSS order), putting patient 01 on the first screen.
 */
export function ResultsBlock({ block }: { block: Lv2ResultsBlock }) {
  const patients: BaGalleryPatient[] = block.patients.map(({ number, detail, views }) => ({
    number,
    detail,
    views: views.map(({ id, view, alt }) => ({ id, view, alt })),
  }));
  const titleId = `${block.id}-title`;

  return (
    <section className="section-py-lg lv2-results" id={block.id} aria-labelledby={titleId}>
      <div className="container lv2-results-inner">
        <div className="lv2-results-head">
          <Eyebrow>{block.eyebrow}</Eyebrow>
          <h2 className="h-sec" id={titleId}>
            {block.heading}
          </h2>
        </div>

        <div className="lv2-results-intro">
          <p className="lv2-intro">{block.intro}</p>
          <p className="lv2-results-note">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>{block.veil.note}</span>
          </p>
        </div>

        <BeforeAfterGalleryV2 patients={patients} veilLabel={block.veil.label} veilNote={block.veil.note} />

        <div className="lv2-results-foot">
          <p className="lv2-results-disclaimer">{block.disclaimer}</p>
          <div className="lv2-results-ctas">
            {/* no prefetch from this link (the shared header and footer still prefetch /beforeafter, as on every page) */}
            <Link href={block.gallery.href} className="btn-secondary" prefetch={false}>
              {block.gallery.label}
            </Link>
            <a href="#consultation" className="btn-primary">
              Request Consultation
              <span aria-hidden> →</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
