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
    ];
  },
};

export default nextConfig;
