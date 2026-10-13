"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Lv2Image } from "@/lib/landings/lipo-360-v2";

/*
 * The FAQ and the two question sets after it read as one section (12 Oct,
 * Nico): their questions run down the right, and the left keeps one pinned
 * panel whose eyebrow, heading and photo turn to the set being read. Each
 * set marks itself with data-flow-set; the two after the FAQ mount late
 * (lazy-guide.tsx), so the sets are looked up on every scroll frame.
 * Phones: no pinned panel, each set shows its own heading (LV2 · FAQ FLOW).
 */
export type FlowPanel = { id: string; eyebrow: string; heading: string; photo?: Lv2Image };

export function FaqFlowAside({ panels }: { panels: FlowPanel[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = ref.current?.closest("section");
    if (!section) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.45;
      let next = 0;
      panels.forEach((p, i) => {
        const el = section.querySelector<HTMLElement>(`[data-flow-set="${p.id}"]`);
        if (el && el.getBoundingClientRect().top < line) next = i;
      });
      setActive(next);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [panels]);

  return (
    <div className="lv2-flow-aside" ref={ref} aria-hidden="true">
      {panels.map((p, i) => (
        <div className="lv2-flow-panel" data-active={i === active || undefined} key={p.id}>
          <p className="eyebrow-text lv2-flow-eyebrow">{p.eyebrow}</p>
          <p className="h-sec lv2-flow-heading">{p.heading}</p>
          {p.photo && (
            <span className="lv2-flow-photo">
              <Image src={p.photo.src} alt="" fill sizes="(max-width: 899px) 1px, 440px" />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
