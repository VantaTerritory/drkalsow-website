import type { MetadataRoute } from "next";
import { SITE_PAGES, pageUrl } from "@/lib/seo/pages";

/**
 * Sitemap per the SEO technical checklist: only final 200, indexable,
 * self-canonical URLs. No redirects, no 404/410, no noindex.
 * The procedures hub is intentionally excluded because navigation goes
 * directly to each procedure landing page.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return SITE_PAGES.filter((p) => p.inSitemap !== false).map((p) => ({
    url: pageUrl(p),
    changeFrequency: "monthly",
    priority: p.path === "/" ? 1 : p.group === "core" ? 0.8 : 0.7,
  }));
}
