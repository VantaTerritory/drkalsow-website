"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/*
 * A row of cards that the page's own scroll slides sideways (the points
 * blocks with layout "track", lipo-360-v2-guide.ts). From 900px, with
 * motion allowed and room for the cards, the section grows by the row's
 * overflow and its inner frame holds still under the site header while
 * the vertical scroll moves the row to the left; at the end of the row
 * the page simply carries on. Everywhere else (phones, reduced motion, a
 * window too short for the cards) the row is a native horizontal scroller
 * with snap points, swiped by the thumb, dots under it on phones.
 *
 * The cards are plain markup from the server component around it: this
 * part only measures, sets two CSS variables and a data attribute. No
 * React state per frame: the offset goes straight to the track's style.
 *
 * Tailwind scans this file: no utility names in comments or strings.
 */

/** Vertical pixels of page scroll per horizontal pixel of row travel (under 1: a shorter run). */
const RATIO = 0.7;
/** Least space above and below the held frame's content, px. */
const MIN_AIR = 24;
const PIN_QUERY = "(min-width: 900px) and (prefers-reduced-motion: no-preference)";

export function LimitationsTrack({
  id,
  className,
  label,
  head,
  count,
  children,
}: {
  id: string;
  className: string;
  /** Group label for the row, e.g. the section's heading. */
  label: string;
  head: ReactNode;
  /** Cards in the row (photo included), for the phone dots. */
  count: number;
  children: ReactNode;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !pin || !viewport || !track) return;

    const mq = window.matchMedia(PIN_QUERY);
    let dist = 0; // horizontal travel of the row, px
    let run = 0; // vertical scroll that drives it, px
    let on = false;
    let frame = 0;

    const headerH = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 95;

    const paint = () => {
      frame = 0;
      if (!on) return;
      const p = Math.min(1, Math.max(0, (headerH() - section.getBoundingClientRect().top) / run));
      track.style.setProperty("--lv2-lim-x", `${(-p * dist).toFixed(1)}px`);
      section.style.setProperty("--lv2-lim-p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const measure = () => {
      const overflow = track.scrollWidth - viewport.clientWidth;
      // heading + row (the same in both modes) plus a little air must fit under
      // the header, or the held frame would cut the cards
      const head = pin.firstElementChild as HTMLElement;
      const need = viewport.getBoundingClientRect().bottom - head.getBoundingClientRect().top + 2 * MIN_AIR;
      const fits = need <= window.innerHeight - headerH();
      const next = mq.matches && overflow > 0 && fits;
      if (next) {
        dist = overflow;
        run = Math.round(overflow * RATIO);
        section.style.setProperty("--lv2-lim-run", `${run}px`);
      } else {
        section.style.removeProperty("--lv2-lim-run");
        section.style.removeProperty("--lv2-lim-p");
        track.style.removeProperty("--lv2-lim-x");
      }
      on = next;
      setPinned(next);
      paint();
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    ro.observe(pin);
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // phones: the card nearest the row's left edge lights its dot
  const cards = () => Array.from(trackRef.current?.querySelectorAll<HTMLElement>("[data-lim-card]") ?? []);
  // the row's leading gutter, where a snapped card rests (the scroll padding's
  // computed value stays an unresolved expression, the track's padding is in px)
  const lead = () => (trackRef.current ? parseFloat(getComputedStyle(trackRef.current).paddingLeft) || 0 : 0);
  const syncDot = () => {
    const viewport = viewportRef.current;
    if (!viewport || pinned) return;
    const left = viewport.getBoundingClientRect().left;
    const pad = lead();
    let nearest = 0;
    let smallest = Number.POSITIVE_INFINITY;
    cards().forEach((card, i) => {
      const d = Math.abs(card.getBoundingClientRect().left - left - pad);
      if (d < smallest) {
        smallest = d;
        nearest = i;
      }
    });
    setActive(nearest);
  };
  const goTo = (i: number) => {
    const viewport = viewportRef.current;
    const card = cards()[i];
    if (!viewport || !card) return;
    const pad = lead();
    const delta = card.getBoundingClientRect().left - viewport.getBoundingClientRect().left - pad;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    viewport.scrollTo({ left: viewport.scrollLeft + delta, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section id={id} className={className} ref={sectionRef} data-pin={pinned ? "" : undefined}>
      <div className="lv2-lim-pin" ref={pinRef}>
        <div className="container lv2-lim-head">
          <div className="lv2-lim-copy">{head}</div>
          <div className="lv2-lim-progress" aria-hidden>
            <span />
          </div>
        </div>
        <div
          className="lv2-lim-viewport"
          ref={viewportRef}
          role="group"
          aria-label={label}
          // a scroller of its own only when it is not driven by the page
          tabIndex={pinned ? undefined : 0}
          onScroll={syncDot}
        >
          <div className="lv2-lim-track" ref={trackRef}>
            {children}
          </div>
        </div>
        {count > 1 && (
          <div className="swipe-dots lv2-lim-dots" aria-label={`${label} pagination`}>
            {Array.from({ length: count }, (_, i) => (
              <button
                type="button"
                key={i}
                className="swipe-dot"
                aria-label={`Show card ${i + 1} of ${count}`}
                aria-current={active === i ? "true" : undefined}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
