"use client";

import { useEffect } from "react";

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

/** Where a tel: link sits on the page, for the click_to_call event. */
function ctaLocation(link: Element): string {
  const tagged = link.closest("[data-cta-location]")?.getAttribute("data-cta-location");
  if (tagged) return tagged;
  if (link.closest(".ld-sticky-cta")) return "sticky_bar";
  if (link.closest("header")) return "header";
  if (link.closest("footer")) return "footer";
  return link.closest("section[id]")?.id ?? "page";
}

/**
 * A/B test markers for the Google Ads experiment, variant pages only
 * (variant A, the control, is left untouched and is told apart by its path).
 * Pushes `landing_variant` once per page view and a `click_to_call` event
 * for every tel: link on the page, including the header, the sticky bar
 * and the form, without touching those shared components. The tel: clicks
 * that count as conversions should still be measured the same way on both
 * variants (a GTM link-click trigger on "tel:"), see the A/B test notes.
 */
export function VariantTracker({ variant, test }: { variant: string; test: string }) {
  useEffect(() => {
    const w = window as DataLayerWindow;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: "landing_variant", landing_variant: variant, landing_test: test });

    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const link = target?.closest('a[href^="tel:"]');
      if (!link) return;
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        event: "click_to_call",
        landing_variant: variant,
        landing_test: test,
        cta_location: ctaLocation(link),
        link_url: link.getAttribute("href"),
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [variant, test]);

  return null;
}
