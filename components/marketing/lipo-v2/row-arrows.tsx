"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/*
 * Prev / Next for a sideways row (12 Oct, Nico: not everyone has a trackpad).
 * The row is the element matching `track` inside the same wrapper; one press
 * moves it one card. Each button turns off at its end. Styles: lv2-rail-btn.
 */
export function RowArrows({ track, label }: { track: string; label: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const row = useCallback(() => ref.current?.parentElement?.querySelector<HTMLElement>(track) ?? null, [track]);

  useEffect(() => {
    const el = row();
    if (!el) return;
    const sync = () => setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", sync);
      ro.disconnect();
    };
  }, [row]);

  const step = (dir: 1 | -1) => {
    const el = row();
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div className="lv2-row-arrows" ref={ref}>
      <button type="button" className="lv2-rail-btn" onClick={() => step(-1)} disabled={edge.start} aria-label={`Previous ${label}`}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M10 3.5 5.5 8l4.5 4.5" />
        </svg>
      </button>
      <button type="button" className="lv2-rail-btn" onClick={() => step(1)} disabled={edge.end} aria-label={`Next ${label}`}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 3.5 10.5 8 6 12.5" />
        </svg>
      </button>
    </div>
  );
}
