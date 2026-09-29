"use client";

import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import Image, { type ImageProps } from "next/image";

/*
 * Images of /lipo-360-v2 that sit just under the first screen. Native
 * lazy loading fetches anything within about 2500px of the viewport, so on
 * a phone the patients' messages and the philosophy photo were downloaded
 * with the page and competed with the hero photo (the LCP). These mount
 * the image only once its box comes near the viewport; until then a
 * placeholder carries the same accessible name.
 */

const MARGIN = "900px 0px";

/** Calls back once, when `el` comes within MARGIN of the viewport. */
function useNear<T extends Element>(): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: MARGIN },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near]);
  return [ref, near];
}

/** A `fill` next/image inside a sized box, mounted when the box nears the viewport. */
export function NearImage({ alt, ...props }: ImageProps & { alt: string }) {
  const [ref, near] = useNear<HTMLSpanElement>();
  if (near) return <Image alt={alt} {...props} />;
  return <span ref={ref} className="lv2-near" role="img" aria-label={alt} />;
}

type RowImage = { src: string; alt: string; width: number; height: number };

/**
 * A sideways-scrolling row of `fill` images (each item at its own ratio),
 * mounted together when the row nears the viewport: items clipped by the
 * row's own scroll box would otherwise wait for a swipe.
 */
export function NearImageRow({
  images,
  className,
  itemClassName,
  label,
  sizes,
  style,
}: {
  images: RowImage[];
  className: string;
  itemClassName: string;
  label: string;
  sizes: string;
  style?: CSSProperties;
}) {
  const [ref, near] = useNear<HTMLUListElement>();
  return (
    <ul ref={ref} className={className} aria-label={label} style={style}>
      {images.map((m) => (
        <li className={itemClassName} key={m.src} style={{ aspectRatio: `${m.width} / ${m.height}` } as CSSProperties}>
          {near ? (
            <Image src={m.src} alt={m.alt} fill sizes={sizes} />
          ) : (
            <span className="lv2-near" role="img" aria-label={m.alt} />
          )}
        </li>
      ))}
    </ul>
  );
}
