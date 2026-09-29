import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { BeforeAfterGalleryV2, type BaGalleryPatient } from "@/components/marketing/lipo-v2/ba-gallery";
import type { Lv2Patient, Lv2ResultsBlock } from "@/lib/landings/lipo-360-v2";

/** A patient as the client gallery gets it: ids, labels and alt texts, never the Drive file names (`source`). */
export const galleryPatient = ({ number, detail, views }: Lv2Patient): BaGalleryPatient => ({
  number,
  detail,
  views: views.map(({ id, view, alt }) => ({ id, view, alt })),
});

/*
 * Results of /lipo-360-v2: the doctor's before/after composites, uncropped,
 * one group of three views per patient (styles: LV2 · RESULTS in the
 * LV2-MEDIA region of lipo-v2.css). A tap opens a view in the lightbox.
 */
export function ResultsBlock({ block }: { block: Lv2ResultsBlock }) {
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
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
            <span>{block.hint}</span>
          </p>
        </div>

        <BeforeAfterGalleryV2 patients={block.patients.map(galleryPatient)} />

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
