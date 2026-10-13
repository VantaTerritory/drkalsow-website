"use client";

import { Children, useCallback, useEffect, useRef } from "react";

/*
 * An endless row of cards (testimonials, 12 Oct; the events row of Relier's
 * home): it starts on the container's left edge and runs off the right of
 * the screen. Native scrolling (thumb, trackpad, keyboard) with Prev / Next
 * buttons. The cards are rendered three times; the copies on either side
 * are inert and hidden from assistive tech, and when the row settles in
 * one of them it jumps, unseen, to the same spot of the middle set.
 * Styles: LV2 · LOOP RAIL in lipo-v2.css.
 */
export function LoopRail({ children, label }: { children: React.ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const items = Children.toArray(children);
  const n = items.length;

  /** Width of one set of cards, gaps included. */
  const setWidth = useCallback(() => {
    const el = ref.current;
    if (!el || el.children.length < 2 * n) return 0;
    const a = el.children[0] as HTMLElement;
    const b = el.children[n] as HTMLElement;
    return b.offsetLeft - a.offsetLeft;
  }, [n]);

  const recentre = useCallback(() => {
    const el = ref.current;
    const w = setWidth();
    if (!el || !w) return;
    if (el.scrollLeft < w * 0.5) el.scrollLeft += w;
    else if (el.scrollLeft > w * 1.5) el.scrollLeft -= w;
  }, [setWidth]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // start on the middle set, with no animation
    el.scrollLeft = setWidth();
    let timer: number | undefined;
    const onScroll = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(recentre, 140);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("scrollend", recentre);
    const ro = new ResizeObserver(() => {
      el.scrollLeft = setWidth();
    });
    ro.observe(el);
    return () => {
      window.clearTimeout(timer);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("scrollend", recentre);
      ro.disconnect();
    };
  }, [setWidth, recentre]);

  const step = (dir: 1 | -1) => {
    const el = ref.current;
    const card = el?.children[0] as HTMLElement | undefined;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div className="lv2-rail">
      <div className="lv2-rail-nav">
        <button type="button" className="lv2-rail-btn" onClick={() => step(-1)} aria-label="Previous video">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10 3.5 5.5 8l4.5 4.5" />
          </svg>
        </button>
        <button type="button" className="lv2-rail-btn" onClick={() => step(1)} aria-label="Next video">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 3.5 10.5 8 6 12.5" />
          </svg>
        </button>
      </div>
      <div className="lv2-rail-track" ref={ref} role="group" aria-label={label} tabIndex={0}>
        {[0, 1, 2].map((copy) =>
          items.map((item, i) => (
            <div
              className="lv2-rail-item"
              key={`${copy}-${i}`}
              aria-hidden={copy === 1 ? undefined : true}
              inert={copy === 1 ? undefined : true}
            >
              {item}
            </div>
          )),
        )}
      </div>
    </div>
  );
}
