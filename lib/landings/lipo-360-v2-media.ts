/* Before/after file locations for /lipo-360-v2 (variant B). Kept apart from
   the page's content module on purpose: the client lightbox imports only
   these, so the browser bundle never carries the content module (which
   lists the doctor's Drive source files). The grid's veils are CSS
   (lipo-360-v2-veils.ts), not images. */

/** Uncropped originals, opened by the lightbox after a tap: `${BA_FULL_DIR}/<id>.webp`. */
export const BA_FULL_DIR = "/img/lipo-v2/ba/full";

/** Every view is a before | after pair composed at this size. */
export const BA_SIZE = { width: 2164, height: 1350 } as const;
