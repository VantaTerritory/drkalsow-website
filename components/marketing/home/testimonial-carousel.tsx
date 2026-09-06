"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";

/**
 * Scroll-snap carousel of testimonial cards with prev/next arrows at the
 * sides. Sits next to the testimonials video in the SocialProof section.
 */
export function TestimonialCarousel() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update]);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".testimonial-card");
    const dx = card ? card.offsetWidth + 14 : el.clientWidth * 0.8;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * dx, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div className="sp-carousel">
      <button
        type="button"
        className="sp-arrow"
        data-dir="prev"
        aria-label="Previous testimonial"
        disabled={!canPrev}
        onClick={() => step(-1)}
      >
        <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden>
          <path d="M6 1 L1 6 L6 11 M1 6 H13" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>

      <div className="sp-track" ref={trackRef}>
        {siteConfig.testimonials.map((t) => (
          <article key={t.name} className="testimonial-card">
            <span className="testimonial-quote-mark" aria-hidden>
              &ldquo;
            </span>
            <p className="testimonial-stars" aria-label={`${t.stars} out of 5 stars`}>
              {"★".repeat(t.stars)}
            </p>
            <p className="testimonial-body">{t.body}</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar" aria-hidden>
                {t.initials}
              </div>
              <div>
                <p className="testimonial-name">{t.name}</p>
                <p className="testimonial-meta">{t.meta}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        className="sp-arrow"
        data-dir="next"
        aria-label="Next testimonial"
        disabled={!canNext}
        onClick={() => step(1)}
      >
        <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden>
          <path d="M8 1 L13 6 L8 11 M13 6 H1" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>
    </div>
  );
}
