"use client";

import { useEffect, useRef } from "react";

/**
 * Native horizontal scroller (touch and trackpad are the browser's own) with:
 *  - mouse wheel: scrolls the track sideways;
 *  - click-and-drag with the mouse; a drag longer than a few pixels swallows
 *    the click so card links do not fire;
 *  - optional auto-scroll (`autoScroll` px/s) that pauses while the visitor
 *    hovers, touches, drags, wheels or focuses the track, resumes a moment
 *    after they let go, stops off-screen and is off under
 *    prefers-reduced-motion;
 *  - optional seamless `loop`: the children must be three identical groups.
 *    The track opens on the middle one and jumps a group's width whenever it
 *    reaches either end, so it scrolls forever in both directions.
 */
export function HorizontalScroller({
  children,
  className,
  autoScroll = 0,
  loop = false,
  ...rest
}: {
  children: React.ReactNode;
  className: string;
  /** Pixels per second. 0 disables. */
  autoScroll?: number;
  loop?: boolean;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "children">) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---- seamless loop ---- */
    const groupWidth = () => {
      if (!loop || el.children.length < 3) return 0;
      const [a, b] = el.children as unknown as HTMLElement[];
      return b.offsetLeft - a.offsetLeft;
    };
    const wrap = () => {
      const g = groupWidth();
      if (!g) return;
      if (el.scrollLeft >= 2 * g) el.scrollLeft -= g;
      else if (el.scrollLeft <= 0) el.scrollLeft += g;
    };
    if (loop) {
      const g = groupWidth();
      if (g) el.scrollLeft = g; // open on the middle copy: room to move either way
    }

    /* ---- pause / resume ---- */
    let hovering = false;
    let touching = false;
    let dragging = false;
    let focused = false;
    let visible = true;
    let cooldownUntil = 0;
    const cooldown = () => {
      cooldownUntil = performance.now() + 2500;
    };
    const paused = (now: number) =>
      hovering || touching || dragging || focused || !visible || now < cooldownUntil;

    /* ---- wheel: vertical wheel moves the track sideways ---- */
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) {
        cooldown();
        return; // already horizontal, native handles it
      }
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      if (!loop) {
        const atStart = el.scrollLeft <= 0 && e.deltaY < 0;
        const atEnd = el.scrollLeft >= max - 1 && e.deltaY > 0;
        if (atStart || atEnd) return; // hand the scroll back to the page
      }
      e.preventDefault();
      el.scrollLeft += e.deltaY;
      cooldown();
    };

    /* ---- mouse drag ---- */
    let moved = false;
    let startX = 0;
    let startLeft = 0;
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.classList.add("is-dragging");
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = startLeft - dx;
    };
    const endDrag = () => {
      if (!dragging) return;
      dragging = false;
      el.classList.remove("is-dragging");
      cooldown();
    };
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };

    const onEnter = () => {
      hovering = true;
    };
    const onLeave = () => {
      hovering = false;
      endDrag();
      cooldown();
    };
    const onTouchStart = () => {
      touching = true;
    };
    const onTouchEnd = () => {
      touching = false;
      cooldown();
    };
    // Only keyboard focus pauses the drift: a mouse press on a card link also
    // focuses it, and that must not freeze the track until the next click.
    const onFocusIn = () => {
      focused = el.querySelector(":focus-visible") !== null;
    };
    const onFocusOut = () => {
      focused = false;
      cooldown();
    };
    const onScroll = () => wrap();

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);
    el.addEventListener("click", onClick, true);
    el.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(el);

    /* ---- auto-scroll ---- */
    let raf = 0;
    if (autoScroll > 0 && !reduced) {
      let last = performance.now();
      let carry = 0;
      const tick = (now: number) => {
        const dt = Math.min(now - last, 100);
        last = now;
        if (!paused(now)) {
          carry += (autoScroll * dt) / 1000;
          const step = Math.floor(carry);
          if (step >= 1) {
            el.scrollLeft += step;
            carry -= step;
            wrap();
          }
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
      el.removeEventListener("click", onClick, true);
      el.removeEventListener("scroll", onScroll);
    };
  }, [autoScroll, loop]);

  return (
    <div className={className} ref={ref} {...rest}>
      {children}
    </div>
  );
}
