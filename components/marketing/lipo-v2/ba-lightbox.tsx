"use client";

import { useCallback, useEffect, useEffectEvent, useLayoutEffect, useRef, useState } from "react";
import { BA_FULL_DIR, BA_SIZE } from "@/lib/landings/lipo-360-v2-media";
import type { Lv2BaView } from "@/lib/landings/lipo-360-v2";

export type BaLightboxItem = Pick<Lv2BaView, "id" | "view" | "alt"> & { patient: string; detail: string };

/**
 * The uncropped original's URL. Built here, from the id, and only once the
 * viewer is open: it never appears in the HTML, the RSC payload or a
 * preload hint of the page.
 */
const fullSrc = (id: string) => `${BA_FULL_DIR}/${id}.webp`;

const SWIPE_PX = 48; // horizontal travel that turns a drag into prev / next
const TAP_PX = 10; // at most this much movement still counts as a tap
const DOUBLE_TAP_MS = 320;
/** Arrow keys while zoomed: how far each one pans the photo (px). */
const PAN_KEYS: Record<string, readonly [number, number]> = {
  ArrowRight: [80, 0],
  ArrowLeft: [-80, 0],
  ArrowDown: [0, 80],
  ArrowUp: [0, -80],
};
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

type Status = { id: string; state: "ready" | "error" };

function Icon({ d, size = 20 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const ICON = {
  close: "M6 6l12 12M18 6L6 18",
  prev: "M15 5l-7 7 7 7",
  next: "M9 5l7 7-7 7",
  zoomIn: "M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13ZM15.5 15.5 20 20M10.5 7.8v5.4M7.8 10.5h5.4",
  zoomOut: "M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13ZM15.5 15.5 20 20M7.8 10.5h5.4",
};

/**
 * Modal viewer for the before/after originals (a native <dialog> opened
 * with showModal: focus moves in, the rest of the page is inert, Esc
 * closes). One photo at a time, the two neighbours prefetched, prev / next
 * by button, arrow keys or a horizontal swipe; a 2x zoom (button, double
 * click or double tap) that pans as a scroll container.
 */
export function BaLightbox({
  items,
  index,
  onIndexChange,
  onClose,
}: {
  items: BaLightboxItem[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const figRef = useRef<HTMLDivElement | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);
  const zoomAt = useRef({ fx: 0.5, fy: 0.5 });
  const prefetched = useRef(new Map<string, HTMLImageElement>());
  const gesture = useRef<{ id: number; x: number; y: number; onPhoto: boolean } | null>(null);
  const pointers = useRef(new Set<number>());
  const lastTap = useRef<{ t: number; x: number; y: number } | null>(null);
  const lastPointerType = useRef("mouse");
  const swallowClick = useRef(false);

  const n = items.length;
  const item = items[index];
  const state = status?.id === item.id ? status.state : "loading";

  const go = useCallback(
    (step: number) => {
      setZoomed(false);
      onIndexChange((index + step + n) % n);
    },
    [index, n, onIndexChange],
  );
  const close = useCallback(() => dialogRef.current?.close(), []);
  const fireClose = useEffectEvent(() => onClose());

  // Open as a modal and lock the page behind it.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const root = document.documentElement;
    const body = document.body;
    const before = { overflow: root.style.overflow, paddingRight: body.style.paddingRight };
    const scrollbar = window.innerWidth - root.clientWidth;
    root.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`; // no reflow jump
    if (!dialog.open) dialog.showModal();
    closeRef.current?.focus();
    // "close" is queued: a stale one (dev double mount) finds the dialog open again
    const onDialogClose = () => {
      if (!dialog.open) fireClose();
    };
    dialog.addEventListener("close", onDialogClose);
    return () => {
      dialog.removeEventListener("close", onDialogClose);
      if (dialog.open) dialog.close();
      root.style.overflow = before.overflow;
      body.style.paddingRight = before.paddingRight;
    };
  }, []);

  // The two neighbours, fetched only now that the viewer is open.
  useEffect(() => {
    for (const step of [1, -1]) {
      const next = items[(index + step + n) % n];
      if (prefetched.current.has(next.id)) continue;
      const img = new Image();
      img.decoding = "async";
      img.src = fullSrc(next.id);
      prefetched.current.set(next.id, img);
    }
  }, [index, items, n]);

  // Zooming keeps the tapped point under the finger (or centres the photo).
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const fig = figRef.current;
    if (!zoomed || !stage || !fig) return;
    stage.scrollLeft = zoomAt.current.fx * fig.offsetWidth - stage.clientWidth / 2;
    stage.scrollTop = zoomAt.current.fy * fig.offsetHeight - stage.clientHeight / 2;
  }, [zoomed]);

  const toggleZoom = (clientX?: number, clientY?: number) => {
    if (zoomed) {
      setZoomed(false);
      return;
    }
    const fig = figRef.current;
    if (fig && clientX !== undefined && clientY !== undefined) {
      const r = fig.getBoundingClientRect();
      zoomAt.current = { fx: clamp01((clientX - r.left) / r.width), fy: clamp01((clientY - r.top) / r.height) };
    } else {
      zoomAt.current = { fx: 0.5, fy: 0.5 };
    }
    setZoomed(true);
  };

  // Loading state until the photo is decoded; results of a photo the viewer
  // already left (its element is gone) are ignored.
  const watchPhoto = useCallback((img: HTMLImageElement | null) => {
    if (!img) return;
    const id = img.dataset.id ?? "";
    img.decode().then(
      () => {
        if (img.isConnected) setStatus({ id, state: "ready" });
      },
      () => {
        if (img.isConnected) setStatus({ id, state: img.complete && img.naturalWidth > 0 ? "ready" : "error" });
      },
    );
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (zoomed) {
      // arrows pan the zoomed photo, wherever the focus is inside the viewer
      const pan = PAN_KEYS[e.key];
      if (pan && stageRef.current) {
        e.preventDefault();
        stageRef.current.scrollBy({ left: pan[0], top: pan[1] });
      }
      return;
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  // Backdrop click: anywhere on the dark field that is not the photo, a
  // control or the caption text (never while zoomed).
  const onClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (swallowClick.current) {
      swallowClick.current = false;
      return;
    }
    const target = e.target as Element;
    if (zoomed || target.closest("button, .lv2-lightbox-fig, .lv2-lightbox-cap, .lv2-lightbox-count")) return;
    close();
  };

  // Touch: a horizontal swipe changes photo, a double tap zooms. Two
  // fingers are a pinch and belong to the browser.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    lastPointerType.current = e.pointerType;
    swallowClick.current = false;
    pointers.current.add(e.pointerId);
    if (pointers.current.size > 1 || e.pointerType === "mouse") {
      gesture.current = null;
      return;
    }
    const onPhoto = !!figRef.current?.contains(e.target as Node);
    gesture.current = { id: e.pointerId, x: e.clientX, y: e.clientY, onPhoto };
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId);
    const g = gesture.current;
    gesture.current = null;
    if (!g || g.id !== e.pointerId) return;
    const dx = e.clientX - g.x;
    const dy = e.clientY - g.y;
    if (!zoomed && Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy) * 1.3) {
      swallowClick.current = true;
      lastTap.current = null;
      go(dx < 0 ? 1 : -1);
      return;
    }
    if (!g.onPhoto || Math.abs(dx) > TAP_PX || Math.abs(dy) > TAP_PX) return;
    const last = lastTap.current;
    if (last && e.timeStamp - last.t < DOUBLE_TAP_MS && Math.hypot(e.clientX - last.x, e.clientY - last.y) < 32) {
      lastTap.current = null;
      swallowClick.current = true;
      toggleZoom(e.clientX, e.clientY);
    } else {
      lastTap.current = { t: e.timeStamp, x: e.clientX, y: e.clientY };
    }
  };
  const onPointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId);
    gesture.current = null;
  };

  return (
    <dialog
      ref={dialogRef}
      className="lv2-lightbox"
      aria-modal="true"
      aria-label="Before and after photos"
      onClick={onClick}
      onKeyDown={onKeyDown}
      // A swipe sets swallowClick but produces no click, so the flag would eat
      // the next tap anywhere (e.g. on the bar). Every new press starts clean;
      // the stage's own handler runs after this one and can set it again.
      onPointerDownCapture={() => {
        swallowClick.current = false;
      }}
    >
      <div className="lv2-lightbox-bar">
        <p className="lv2-lightbox-count" aria-hidden="true">
          {index + 1} / {n}
        </p>
        <div className="lv2-lightbox-actions">
          <button
            type="button"
            className="lv2-lightbox-btn"
            aria-pressed={zoomed}
            aria-label="Zoom"
            onClick={() => toggleZoom()}
          >
            <Icon d={zoomed ? ICON.zoomOut : ICON.zoomIn} />
          </button>
          <button ref={closeRef} type="button" className="lv2-lightbox-btn" aria-label="Close" onClick={close}>
            <Icon d={ICON.close} />
          </button>
        </div>
      </div>

      <button
        type="button"
        className="lv2-lightbox-btn lv2-lightbox-nav lv2-lightbox-nav--prev"
        aria-label="Previous photo"
        onClick={() => go(-1)}
      >
        <Icon d={ICON.prev} size={22} />
      </button>

      <div
        ref={stageRef}
        className="lv2-lightbox-stage"
        data-zoomed={zoomed ? "" : undefined}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <div
          ref={figRef}
          className="lv2-lightbox-fig"
          data-state={state}
          onDoubleClick={(e) => {
            if (lastPointerType.current === "mouse") toggleZoom(e.clientX, e.clientY);
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={item.id}
            ref={watchPhoto}
            data-id={item.id}
            className="lv2-lightbox-img"
            src={fullSrc(item.id)}
            alt={item.alt}
            width={BA_SIZE.width}
            height={BA_SIZE.height}
            decoding="async"
            draggable={false}
          />
          {/* Portrait phones stack the pair: this second copy of the same file
              (already loaded, no second download) shows the after half under
              the before half. Hidden everywhere else. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={`${item.id}-after`}
            className="lv2-lightbox-img lv2-lightbox-img--after"
            src={fullSrc(item.id)}
            alt=""
            aria-hidden="true"
            width={BA_SIZE.width}
            height={BA_SIZE.height}
            decoding="async"
            draggable={false}
          />
          <span className="lv2-ba-tag lv2-ba-tag--before" aria-hidden="true">
            Before
          </span>
          <span className="lv2-ba-tag lv2-ba-tag--after" aria-hidden="true">
            After
          </span>
          {state === "loading" && (
            <span className="lv2-lightbox-status" aria-hidden="true">
              <span className="lv2-lightbox-spinner" />
              Loading photo
            </span>
          )}
          {state === "error" && (
            <span className="lv2-lightbox-status" role="alert">
              This photo could not be loaded.
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        className="lv2-lightbox-btn lv2-lightbox-nav lv2-lightbox-nav--next"
        aria-label="Next photo"
        onClick={() => go(1)}
      >
        <Icon d={ICON.next} size={22} />
      </button>

      <p className="lv2-lightbox-cap" aria-live="polite">
        <span className="sr-only">
          Photo {index + 1} of {n}.{" "}
        </span>
        <strong>Patient {item.patient}</strong> – {item.detail}
        <span className="lv2-lightbox-view"> · {item.view} view</span>
      </p>
    </dialog>
  );
}
