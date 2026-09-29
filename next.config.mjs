// @ts-check

/**
 * Redirects per the SEO migration map (sheet "02 Redirect Map"):
 * single-hop server-side 301s, kept indefinitely.
 * /new-page → explicit 410 via app/new-page/route.ts.
 * /cart is intentionally not migrated (404).
 *
 * Plain .mjs on purpose, not .ts: Hostinger builds on a host with glibc 2.17,
 * so Next falls back to the WASM build of SWC, and that fallback cannot
 * transpile a TypeScript config (it emits a next.config.compiled.js importing
 * a temp module it never writes). JS config loads without touching SWC.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  async redirects() {
    return [
      // Squarespace served the home at /home (GSC still shows /home/).
      { source: "/home", destination: "/", statusCode: 301 },
      // Live /hair-transplantation had Facelift content under wrong metadata;
      // that content now lives at /facelift.
      { source: "/hair-transplantation", destination: "/facelift", statusCode: 301 },
      // 404 that still appears in the exported Squarespace sitemap.
      { source: "/procedure-breast-augmentation", destination: "/breast-augmentation", statusCode: 301 },
      // Sep 2026 SEO roadmap (Dr Kalsow - Septiembre.xlsx, row "Clean + rename
      // About page"): the live slug moves to a clean URL.
      { source: "/about-1", destination: "/about-dr-sergei-kalsow", statusCode: 301 },
      // The doctor's Awake Lipo 360 page on Squarespace lived at /new-page-1;
      // the roadmap makes /awake-lipo-360-nyc its permanent home.
      { source: "/new-page-1", destination: "/awake-lipo-360-nyc", statusCode: 301 },
    ];
  },
  // Variant B of the Awake Lipo 360 A/B test (/lipo-360-v2) shows the
  // doctor's clinical before/after photos, uncropped (a noindex page).
  // Keep them out of image search as well.
  async headers() {
    return [
      {
        source: "/img/lipo-v2/ba/full/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, noimageindex" }],
      },
      // the same originals served through the image optimizer
      {
        source: "/_next/image",
        has: [{ type: "query", key: "url", value: "(?<original>/img/lipo-v2/ba/full/.*)" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, noimageindex" }],
      },
    ];
  },
};

export default nextConfig;
