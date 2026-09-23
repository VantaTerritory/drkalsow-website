"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AmbientVideo } from "@/components/ui/ambient-video";
import type { LandingVideo } from "@/lib/landings/content";

/**
 * A patient video as a square tile in the case grid. By default it sits
 * behind its poster and nothing loads or plays until the tap; a short silent
 * clip (`ambient`) loops muted on its own instead, with a pause control. The
 * numbered label ties the tile to the photo card of the same patient. Phone
 * footage is portrait, so the tap-to-play player letterboxes inside the
 * square rather than cropping the patient.
 */
export function LandingVideoTile({ video, label }: { video: LandingVideo; label: string }) {
  if (video.ambient) return <AmbientTile video={video} label={label} />;
  return <FacadeTile video={video} label={label} />;
}

function AmbientTile({ video, label }: { video: LandingVideo; label: string }) {
  const box = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);

  // The button mirrors the element's real state, so a clip that
  // prefers-reduced-motion stopped reads "Play", not "Pause".
  useEffect(() => {
    const el = box.current?.querySelector("video");
    if (!el) return;
    const sync = () => setPaused(el.paused);
    sync();
    el.addEventListener("play", sync);
    el.addEventListener("pause", sync);
    return () => {
      el.removeEventListener("play", sync);
      el.removeEventListener("pause", sync);
    };
  }, []);

  const toggle = () => {
    const el = box.current?.querySelector("video");
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  };

  return (
    <figure className="ld-case ld-case--video">
      <div className="ld-case-media ld-case-media--ambient" ref={box}>
        <AmbientVideo src={video.src} poster={video.poster} ariaLabel={video.caption} />
        <span className="ld-tag ld-case-num">{label}</span>
        <button type="button" className="ld-tag ld-video-toggle" onClick={toggle} aria-pressed={paused}>
          {paused ? "Play" : "Pause"}
        </button>
      </div>
      <figcaption>
        <strong>{video.title}</strong>
        <span>{video.caption}</span>
      </figcaption>
    </figure>
  );
}

function FacadeTile({ video, label }: { video: LandingVideo; label: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className="ld-case ld-case--video">
      <div className="ld-case-media">
        {playing ? (
          <video
            src={video.src}
            poster={video.poster}
            controls
            autoPlay
            playsInline
            preload="metadata"
            aria-label={video.caption}
          />
        ) : (
          <button type="button" className="proc-facade ld-facade" onClick={() => setPlaying(true)}>
            <Image src={video.poster} alt="" fill sizes="(max-width: 768px) 86vw, 30vw" />
            <span className="proc-play" aria-hidden>
              <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
                <path d="M3 2 L18 11 L3 20 Z" fill="currentColor" />
              </svg>
            </span>
            <span className="proc-facade-label">Play {video.title}</span>
          </button>
        )}
        <span className="ld-tag ld-case-num">{label}</span>
      </div>
      <figcaption>
        <strong>{video.title}</strong>
        <span>{video.caption}</span>
      </figcaption>
    </figure>
  );
}
