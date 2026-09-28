"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Lv2Video } from "@/lib/landings/lipo-360-v2";

/*
 * Video primitives of /lipo-360-v2 (styles: LV2-MEDIA region of lipo-v2.css).
 *
 * LoopVideo: muted, looping, playsInline clip with a Pause / Play control,
 * never autoplayed under prefers-reduced-motion. start="load" begins after
 * the window load event plus an idle slot (the hero: never competes with
 * the LCP); start="visible" begins when scrolled near the viewport. Both
 * pause while off screen. Nothing but the poster loads before that
 * (preload="none", no autoplay attribute in the server HTML).
 *
 * VideoFacade: poster + play button; the <video> (with sound and controls)
 * is created only on tap. Used for the reel and the testimonials.
 */

const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

/** Runs `cb` once the page has loaded and the main thread has a free slot. */
function afterPageLoad(cb: () => void): () => void {
  let cancelled = false;
  let idle: number | undefined;
  let timer: number | undefined;
  const fire = () => {
    if (!cancelled) cb();
  };
  const schedule = () => {
    if (typeof window.requestIdleCallback === "function") idle = window.requestIdleCallback(fire, { timeout: 1500 });
    else timer = window.setTimeout(fire, 300);
  };
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
  return () => {
    cancelled = true;
    window.removeEventListener("load", schedule);
    if (idle !== undefined) window.cancelIdleCallback(idle);
    if (timer !== undefined) window.clearTimeout(timer);
  };
}

export function LoopVideo({
  video,
  start = "visible",
  className,
}: {
  video: Lv2Video;
  start?: "load" | "visible";
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  // Mirrors the element (play / pause events), so the button never lies.
  const [paused, setPaused] = useState(true);
  // A <video> poster is fetched as soon as the tag is parsed, wherever it sits
  // on the page. Below the fold ("visible") it waits for the clip to near the
  // viewport, so it never competes with the first screen's LCP image.
  const [posterOn, setPosterOn] = useState(start === "load");
  // The viewer's own choice wins over everything the page decides.
  const choice = useRef<"play" | "pause" | null>(null);
  const gate = useRef({ ready: false, inView: false, reduced: false });

  const apply = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const { ready, inView, reduced } = gate.current;
    const wanted = choice.current === "play" || (choice.current === null && ready && !reduced);
    if (wanted && inView) {
      if (el.paused) {
        el.muted = true;
        el.play().catch(() => {}); // blocked (e.g. low power mode): stays paused, the button offers Play
      }
    } else if (!el.paused) {
      el.pause();
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sync = () => setPaused(el.paused);
    el.addEventListener("play", sync);
    el.addEventListener("pause", sync);

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    gate.current.reduced = motion.matches;
    const onMotion = () => {
      gate.current.reduced = motion.matches;
      apply();
    };
    motion.addEventListener("change", onMotion);

    // Starts near the viewport, pauses off screen (saves CPU and battery).
    let io: IntersectionObserver | undefined;
    if (typeof IntersectionObserver === "function") {
      io = new IntersectionObserver(
        (entries) => {
          gate.current.inView = entries[entries.length - 1].isIntersecting;
          if (gate.current.inView) setPosterOn(true);
          apply();
        },
        { rootMargin: "200px 0px" },
      );
      io.observe(el);
    } else {
      gate.current.inView = true;
    }

    let cancelLoad: (() => void) | undefined;
    if (start === "load") {
      cancelLoad = afterPageLoad(() => {
        gate.current.ready = true;
        apply();
      });
    } else {
      gate.current.ready = true;
      apply();
    }

    return () => {
      el.removeEventListener("play", sync);
      el.removeEventListener("pause", sync);
      motion.removeEventListener("change", onMotion);
      io?.disconnect();
      cancelLoad?.();
    };
  }, [start, apply]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      choice.current = "play";
      el.muted = true;
      el.play().catch(() => {});
    } else {
      choice.current = "pause";
      el.pause();
    }
  };

  return (
    <div className={cx("lv2-loop", className)}>
      <video
        ref={ref}
        className="lv2-loop-video"
        src={video.src}
        poster={posterOn ? video.poster : undefined}
        width={video.width}
        height={video.height}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        aria-label={video.title}
      />
      {/* WCAG 2.2.2: anything that moves on its own can be paused. The label
          names the action, so no aria-pressed on top of it (ARIA APG). */}
      <button
        type="button"
        className="lv2-loop-toggle"
        onClick={toggle}
        aria-label={paused ? "Play video" : "Pause video"}
      >
        {paused ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
            <path d="M3.5 1.8v10.4L12 7z" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
            <rect x="2.5" y="1.8" width="3.2" height="10.4" rx="0.8" />
            <rect x="8.3" y="1.8" width="3.2" height="10.4" rx="0.8" />
          </svg>
        )}
      </button>
    </div>
  );
}

export function VideoFacade({ video, className }: { video: Lv2Video; className?: string }) {
  const [playing, setPlaying] = useState(false);
  const ratio = `${video.width} / ${video.height}`;

  // The player replaces the button: move focus onto it and start it from
  // the tap (the autoplay attribute alone is not enough on every mobile browser).
  const mountPlayer = useCallback((el: HTMLVideoElement | null) => {
    if (!el) return;
    // one voice at a time: starting this video pauses any other facade video
    el.addEventListener("play", () => {
      document.querySelectorAll<HTMLVideoElement>("video.lv2-facade-video").forEach((other) => {
        if (other !== el && !other.paused) other.pause();
      });
    });
    el.focus({ preventScroll: true });
    el.play().catch(() => {});
  }, []);

  if (playing) {
    return (
      <video
        ref={mountPlayer}
        className={cx("lv2-facade-video", className)}
        style={{ aspectRatio: ratio }}
        src={video.src}
        poster={video.poster}
        width={video.width}
        height={video.height}
        controls
        autoPlay
        playsInline
        preload="metadata"
        tabIndex={0}
        aria-label={video.title}
      />
    );
  }

  return (
    <button
      type="button"
      className={cx("lv2-facade", className)}
      style={{ aspectRatio: ratio }}
      onClick={() => setPlaying(true)}
    >
      <Image src={video.poster} alt="" fill sizes="(max-width: 767px) 86vw, (max-width: 1023px) 45vw, 400px" />
      <span className="lv2-facade-play" aria-hidden="true">
        <svg width="20" height="22" viewBox="0 0 20 22" fill="currentColor">
          <path d="M3 2 L18 11 L3 20 Z" />
        </svg>
      </span>
      <span className="sr-only">Play {video.title}</span>
    </button>
  );
}
