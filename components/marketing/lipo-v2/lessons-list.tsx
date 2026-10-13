"use client";

import { useSyncExternalStore } from "react";
import { Reveal } from "@/components/motion/reveal";
import type { Lv2Card } from "@/lib/landings/lipo-360-v2";

/*
 * The doctor's eight notes (LV2 · LESSONS in lipo-v2-guide.css): cards from
 * 600px, an accordion on phones (one note open at a time). Two structures,
 * so the width picks one on the client; the block already mounts there
 * only (lazy-guide.tsx), so nothing hydrates against server markup.
 */

const CARDS_MQ = "(min-width: 600px)";
const subscribe = (cb: () => void) => {
  const m = window.matchMedia(CARDS_MQ);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
const pad = (n: number) => String(n).padStart(2, "0");

export function LessonsList({ items, wide = [] }: { items: Lv2Card[]; wide?: number[] }) {
  const cards = useSyncExternalStore(subscribe, () => window.matchMedia(CARDS_MQ).matches, () => true);
  if (cards) {
    return (
      <Reveal as="ol" className="lv2-lessons-notes lv2-lessons-cards">
        {items.map((item, i) => (
          <li key={item.title} className="lv2-lesson" data-wide={wide.includes(i + 1) || undefined}>
            <span className="lv2-lesson-num" aria-hidden>
              {pad(i + 1)}
            </span>
            <h3 className="lv2-lesson-title">{item.title}</h3>
            <p className="lv2-lesson-body">{item.body}</p>
          </li>
        ))}
      </Reveal>
    );
  }
  return (
    <ol className="lv2-lessons-notes lv2-lessons-acc">
      {items.map((item, i) => (
        <li key={item.title}>
          <details name="lv2-lessons" open={i === 0} className="lv2-lesson" data-wide={wide.includes(i + 1) || undefined}>
            <summary>
              <span className="lv2-lesson-num" aria-hidden>
                {pad(i + 1)}
              </span>
              <span className="lv2-lesson-title">{item.title}</span>
              <span className="lv2-lesson-icon" aria-hidden />
            </summary>
            <p className="lv2-lesson-body">{item.body}</p>
          </details>
        </li>
      ))}
    </ol>
  );
}
