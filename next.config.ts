import type { NextConfig } from "next";

/**
 * Redirects per the SEO migration map (sheet "02 Redirect Map"):
 * single-hop server-side 301s, kept indefinitely.
 * /new-page → explicit 410 via app/new-page/route.ts.
 * /cart is intentionally not migrated (404).
 */
const nextConfig: NextConfig = {
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
