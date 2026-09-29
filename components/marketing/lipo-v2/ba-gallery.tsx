"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { SwipeCarousel } from "@/components/ui/swipe-carousel";
import { BA_FULL_DIR } from "@/lib/landings/lipo-360-v2-media";
import type { Lv2BaView } from "@/lib/landings/lipo-360-v2";
import { BaLightbox, type BaLightboxItem } from "@/components/marketing/lipo-v2/ba-lightbox";

/** What reaches the client per patient: no Drive file names. */
export type BaGalleryPatient = {
  number: string;
  detail: string;
  views: Pick<Lv2BaView, "id" | "view" | "alt">[];
};

/**
 * The before/after tiles, one group per patient (a row of three from
 * tablet up, a swipe track on phones), each the doctor's whole composite,
 * and the lightbox that opens it full size. One source of truth: the
 * index of the open view in patient-major order (null = closed).
 */
export function BeforeAfterGalleryV2({ patients }: { patients: BaGalleryPatient[] }) {
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
        {patients.map((p, pi) => (
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
                    {/* The name comes from the content, so it holds every
                        word the tile shows (WCAG 2.5.3, label in name):
                        "View Patient 01, Front view Before After, full size".
                        The pills are placed by CSS, so their DOM order is
                        free to read well; the photo itself is described by
                        that name (empty alt, no double reading). */}
                    <span className="sr-only">{`View Patient ${p.number}, `}</span>
                    <span className="lv2-ba-frame">
                      <Image
                        src={`${BA_FULL_DIR}/${v.id}.webp`}
                        alt=""
                        fill
                        sizes="(max-width: 767px) 86vw, (max-width: 1199px) 31vw, 380px"
                      />
                      <span className="lv2-ba-tag lv2-ba-tag--view">{v.view} view</span>{" "}
                      <span className="lv2-ba-tag lv2-ba-tag--before">Before</span>{" "}
                      <span className="lv2-ba-tag lv2-ba-tag--after">After</span>
                    </span>
                    <span className="sr-only">, full size</span>
                  </button>
                );
              })}
            </SwipeCarousel>
          </li>
        ))}
      </ol>

      {open !== null && <BaLightbox items={items} index={open} onIndexChange={setOpen} onClose={close} />}
    </>
  );
}
