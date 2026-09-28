"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { SwipeCarousel } from "@/components/ui/swipe-carousel";
import { veilBackground } from "@/lib/landings/lipo-360-v2-veils";
import type { Lv2BaView } from "@/lib/landings/lipo-360-v2";
import { BaLightbox, type BaLightboxItem } from "@/components/marketing/lipo-v2/ba-lightbox";

/** What reaches the client per patient: no Drive file names, no original URLs. */
export type BaGalleryPatient = {
  number: string;
  detail: string;
  views: Pick<Lv2BaView, "id" | "view" | "alt">[];
};

function EyeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/**
 * The veiled before/after tiles, one group per patient (a row of three
 * from tablet up, a swipe track on phones), and the lightbox that loads
 * the uncropped original after a tap. One source of truth: the index of
 * the open view in patient-major order (null = closed).
 */
export function BeforeAfterGalleryV2({
  patients,
  veilLabel,
  veilNote,
}: {
  patients: BaGalleryPatient[];
  veilLabel: string;
  /** Phones: shown once, right under the first patient (the section intro sits after the list there). */
  veilNote?: string;
}) {
  const items = useMemo<BaLightboxItem[]>(
    () => patients.flatMap((p) => p.views.map((v) => ({ ...v, patient: p.number, detail: p.detail }))),
    [patients],
  );
  // index of each patient's first view in `items`
  const offsets = useMemo(
    () => patients.map((_, i) => patients.slice(0, i).reduce((sum, p) => sum + p.views.length, 0)),
    [patients],
  );

  const [open, setOpen] = useState<number | null>(null);
  const tiles = useRef<(HTMLButtonElement | null)[]>([]);
  const opener = useRef<number | null>(null);

  const close = useCallback(() => {
    const at = opener.current;
    setOpen(null);
    // focus goes back to the tile that opened the viewer
    if (at !== null) tiles.current[at]?.focus({ preventScroll: true });
  }, []);

  return (
    <>
      <ol className="lv2-ba-list">
        {patients.map((p, pi) => {
          return (
            <li className="lv2-ba-patient" key={p.number}>
              <h3 className="lv2-ba-caption">
                <strong>Patient {p.number}</strong> – {p.detail}
              </h3>
              <SwipeCarousel
                className="lv2-ba-track"
                count={p.views.length}
                label={`Patient ${p.number} photos`}
                itemNoun={`patient ${p.number} view`}
              >
                {p.views.map((v, vi) => {
                  const at = offsets[pi] + vi;
                  return (
                    <button
                      type="button"
                      key={v.id}
                      ref={(el) => {
                        tiles.current[at] = el;
                      }}
                      className="lv2-ba-tile"
                      aria-haspopup="dialog"
                      onClick={() => {
                        opener.current = at;
                        setOpen(at);
                      }}
                    >
                      {/* The name comes from the content, so it contains every
                          word the tile shows (WCAG 2.5.3, label in name):
                          "Patient 01, Front view Before After Medical photos ·
                          Tap to view (partial nudity)". The pills are placed by
                          CSS, so their DOM order is free to read well. */}
                      <span className="sr-only">{`View Patient ${p.number}, `}</span>
                      <span className="lv2-ba-frame">
                        {/* the veil: a soft field of the photo's own colours, drawn in CSS */}
                        <span className="lv2-ba-field" aria-hidden="true" style={{ background: veilBackground(v.id) }} />
                        <span className="lv2-ba-tag lv2-ba-tag--view">{v.view} view</span>{" "}
                        <span className="lv2-ba-tag lv2-ba-tag--before">Before</span>{" "}
                        <span className="lv2-ba-tag lv2-ba-tag--after">After</span>{" "}
                        <span className="lv2-ba-veil">
                          <EyeIcon />
                          {/* from tablet up only the first view of each patient spells it out */}
                          <span className="lv2-ba-veil-text">{veilLabel}</span>
                        </span>
                      </span>
                      <span className="sr-only"> (clinical photo with partial nudity)</span>
                    </button>
                  );
                })}
              </SwipeCarousel>
              {pi === 0 && veilNote && (
                // phones only (CSS); the copy in the section intro is hidden there, so no duplicate
                <p className="lv2-results-note lv2-ba-note">
                  <EyeIcon />
                  <span>{veilNote}</span>
                </p>
              )}
            </li>
          );
        })}
      </ol>

      {open !== null && <BaLightbox items={items} index={open} onIndexChange={setOpen} onClose={close} />}
    </>
  );
}
