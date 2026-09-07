"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Horizontal card track paged with the thumb, with dots underneath and no
 * arrows: on touch the swipe is the control, so arrows would be dead chrome.
 * Above the carousel breakpoint the same track goes back to a plain grid
 * through CSS and the dots hide, so one markup serves both layouts.
 */
export function SwipeCarousel({
  children,
  className,
  count,
  label,
  itemNoun,
  ...rest
}: {
  children: React.ReactNode;
  className: string;
  count: number;
  /** Group label for the track, e.g. "Facelift patient results". */
  label: string;
  /** Noun phrase for one card, e.g. "case" or "Facelift patient". Kept a
   *  string rather than a formatter so server components can pass it. */
  itemNoun: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "children">) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  // Nearest card to the track's left edge, measured from rects so it works
  // whether or not the track is the children's offsetParent.
  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const trackLeft = el.getBoundingClientRect().left;
    let nearest = 0;
    let smallest = Number.POSITIVE_INFINITY;
    Array.from(el.children).forEach((child, index) => {
      const distance = Math.abs(child.getBoundingClientRect().left - trackLeft);
      if (distance < smallest) {
        smallest = distance;
        nearest = index;
      }
    });
    setActive(nearest);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", sync);
      ro.disconnect();
    };
  }, [sync]);

  const goTo = (index: number) => {
    const el = trackRef.current;
    const card = el?.children[index];
    if (!el || !card) return;
    const delta = card.getBoundingClientRect().left - el.getBoundingClientRect().left;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: el.scrollLeft + delta, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <>
      <div className={className} ref={trackRef} role="group" aria-label={label} {...rest}>
        {children}
      </div>

      {count > 1 && (
        <div className="swipe-dots" aria-label={`${label} pagination`}>
          {Array.from({ length: count }, (_, index) => (
            <button
              type="button"
              key={index}
              className="swipe-dot"
              aria-label={`Show ${itemNoun} ${index + 1} of ${count}`}
              aria-current={active === index ? "true" : undefined}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      )}
    </>
  );
}
