"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProcedureVideo } from "@/lib/procedures/content";

function PlayIcon() {
  return (
    <span className="proc-play" aria-hidden>
      <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
        <path d="M3 2 L18 11 L3 20 Z" fill="currentColor" />
      </svg>
    </span>
  );
}

/**
 * The procedure video card, in the three shapes the practice's own material
 * comes in: a self-hosted mp4, an embeddable YouTube video behind a
 * click-to-load facade, and an age-restricted YouTube video that can only be
 * watched on YouTube itself.
 */
export function ProcedureVideoCard({ video }: { video: ProcedureVideo }) {
  const [playing, setPlaying] = useState(false);

  if (video.kind === "file") {
    return (
      <figure className="proc-hero-video">
        {/* surgical footage: plays on click, never autoplays */}
        <video
          src={video.src}
          poster={video.poster}
          controls
          playsInline
          preload="metadata"
          aria-label={video.caption}
        />
        <figcaption>
          <span>Surgery video</span>
          {video.caption}
        </figcaption>
      </figure>
    );
  }

  if (video.kind === "youtube") {
    return (
      <figure className="proc-hero-video">
        {playing ? (
          <iframe
            className="proc-embed"
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button type="button" className="proc-facade" onClick={() => setPlaying(true)}>
            <Image
              src={video.poster}
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 46vw"
              priority
            />
            <PlayIcon />
            <span className="proc-facade-label">Play {video.title}</span>
          </button>
        )}
        <figcaption>
          <span>Surgery video</span>
          {video.caption}
        </figcaption>
      </figure>
    );
  }

  // Age-restricted on YouTube: embedded playback is blocked, so the card links out.
  return (
    <figure className="proc-hero-video">
      <a
        className="proc-facade proc-facade-restricted"
        href={`https://www.youtube.com/watch?v=${video.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <PlayIcon />
        <span className="proc-restricted-title">{video.title}</span>
        <span className="proc-restricted-note">
          Watch on YouTube. This surgical footage is age restricted, so it plays there rather than
          here.
        </span>
      </a>
      <figcaption>
        <span>Surgery video</span>
        {video.caption}
      </figcaption>
    </figure>
  );
}
