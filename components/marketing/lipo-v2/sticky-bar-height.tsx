"use client";

import { useEffect } from "react";

/**
 * Publishes the real height of the phone sticky Call / Request bar (shared
 * with variant A, not modified) as --lv2-sticky-h on the B page, so the
 * hero's first-screen budget holds when the bar wraps to two lines on narrow
 * phones or a font renders taller. CSS carries the usual values, so this only
 * corrects the rare case; on desktop the bar is hidden and nothing is set.
 */
export function StickyBarHeight() {
  useEffect(() => {
    const bar = document.querySelector<HTMLElement>(".ld-sticky-cta");
    const page = document.querySelector<HTMLElement>(".lv2-page");
    if (!bar || !page || typeof ResizeObserver === "undefined") return;
    const sync = () => {
      const h = bar.offsetHeight;
      if (h > 0) page.style.setProperty("--lv2-sticky-h", `${Math.ceil(h)}px`);
      else page.style.removeProperty("--lv2-sticky-h");
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(bar);
    return () => {
      ro.disconnect();
      page.style.removeProperty("--lv2-sticky-h");
    };
  }, []);

  return null;
}
