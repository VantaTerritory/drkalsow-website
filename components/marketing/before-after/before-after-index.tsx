"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type BeforeAfterIndexItem = {
  id: string;
  label: string;
};

type PillPosition = {
  x: number;
  width: number;
};

export function BeforeAfterIndex({ items }: { items: readonly BeforeAfterIndexItem[] }) {
  const linksRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const motionCountRef = useRef(0);
  const scrollLockUntilRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pill, setPill] = useState<PillPosition>({ x: 0, width: 0 });
  const [motion, setMotion] = useState({ direction: "forward", key: 0 });

  const activateIndex = useCallback((nextIndex: number) => {
    const previousIndex = activeIndexRef.current;
    if (nextIndex === previousIndex) return;

    activeIndexRef.current = nextIndex;
    motionCountRef.current += 1;
    setMotion({
      direction: nextIndex > previousIndex ? "forward" : "backward",
      key: motionCountRef.current,
    });
    setActiveIndex(nextIndex);
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;
      if (performance.now() < scrollLockUntilRef.current) return;

      const navBottom =
        linksRef.current?.closest(".ba-gallery-index")?.getBoundingClientRect().bottom ?? 144;
      const readingLine = Math.max(navBottom + 48, window.innerHeight * 0.36);
      let nextIndex = 0;

      items.forEach((item, index) => {
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top <= readingLine) {
          nextIndex = index;
        }
      });

      activateIndex(nextIndex);
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [activateIndex, items]);

  useEffect(() => {
    const links = linksRef.current;
    const activeLink = links?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
    if (!links || !activeLink) return;

    const updatePill = () => {
      setPill({ x: activeLink.offsetLeft, width: activeLink.offsetWidth });
    };

    updatePill();
    const resizeObserver = new ResizeObserver(updatePill);
    resizeObserver.observe(links);
    document.fonts.ready.then(updatePill);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const linkLeft = activeLink.offsetLeft;
    const linkRight = linkLeft + activeLink.offsetWidth;
    const visibleLeft = links.scrollLeft;
    const visibleRight = visibleLeft + links.clientWidth;

    if (linkLeft < visibleLeft + 12 || linkRight > visibleRight - 12) {
      links.scrollTo({
        left: linkLeft - (links.clientWidth - activeLink.offsetWidth) / 2,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    }

    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  return (
    <nav className="ba-gallery-index" aria-label="Before and after procedures">
      <div className="container ba-gallery-index-inner">
        <span>Explore</span>
        <div className="ba-gallery-index-links" ref={linksRef}>
          <span
            className="ba-gallery-active-pill"
            data-direction={motion.direction}
            data-ready={pill.width > 0}
            style={{ width: pill.width, transform: `translate3d(${pill.x}px, 0, 0)` }}
            aria-hidden="true"
          >
            {motion.key > 0 && <span className="ba-gallery-pill-drop" key={motion.key} />}
          </span>

          {items.map((item, index) => (
            <a
              href={`#${item.id}`}
              data-index={index}
              aria-current={activeIndex === index ? "location" : undefined}
              key={item.id}
              onClick={() => {
                scrollLockUntilRef.current = performance.now() + 700;
                activateIndex(index);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
