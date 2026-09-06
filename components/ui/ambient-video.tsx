"use client";

import { useEffect, useRef } from "react";

/**
 * Muted autoplaying video that pauses under prefers-reduced-motion (the
 * poster stands in). Used for the About OR loop and the testimonials video;
 * pass `controls` when the viewer should be able to unmute/scrub.
 */
export function AmbientVideo({
  src,
  poster,
  className,
  controls = false,
  loop = true,
  ariaLabel,
}: {
  src: string;
  poster?: string;
  className?: string;
  controls?: boolean;
  loop?: boolean;
  ariaLabel: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) video.pause();
      else video.play().catch(() => {});
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop={loop}
      controls={controls}
      playsInline
      preload="metadata"
      aria-label={ariaLabel}
    />
  );
}
