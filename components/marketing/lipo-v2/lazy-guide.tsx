"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { BaGalleryPatient } from "@/components/marketing/lipo-v2/ba-gallery";

/*
 * Draft 2's long-form sections of /lipo-360-v2 (lib/landings/lipo-360-v2-guide.ts),
 * mounted in the browser, in their place in the page, once it has loaded
 * and the main thread is idle. They all sit several screens down; kept out
 * of the initial HTML (and of the RSC payload that repeats it), the
 * document stays the size of variant A's and the hero photo paints as
 * early. Their stylesheet ships with the route, so they arrive styled.
 */
const GuideById = dynamic(() => import("@/components/marketing/lipo-v2/guide-client"), { ssr: false });

/** True after the window's load event, at the next idle moment (2 s at most). */
function useAfterLoad() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let idle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const go = () => {
      if (typeof window.requestIdleCallback === "function") {
        idle = window.requestIdleCallback(() => setReady(true), { timeout: 2000 });
      } else {
        timer = setTimeout(() => setReady(true), 200);
      }
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => {
      window.removeEventListener("load", go);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer !== undefined) clearTimeout(timer);
    };
  }, []);
  return ready;
}

export function LazyGuide({ id, patient }: { id: string; patient?: BaGalleryPatient }) {
  const ready = useAfterLoad();
  return ready ? <GuideById id={id} patient={patient} /> : null;
}
