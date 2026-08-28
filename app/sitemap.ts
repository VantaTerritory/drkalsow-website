import type { MetadataRoute } from "next";
import { SITE_PAGES, pageUrl } from "@/lib/seo/pages";

/**
 * Sitemap per the SEO technical checklist: only final 200, indexable,
 * self-canonical URLs. No redirects, no 404/410, no noindex.
 * (The old Squarespace sitemap wrongly included /procedures (302),
 * /cart (noindex) and /procedure-breast-augmentation (404).)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return SITE_PAGES.filter((p) => p.inSitemap !== false).map((p) => ({
    url: pageUrl(p),
    changeFrequency: "monthly",
    priority: p.path === "/" ? 1 : p.group === "core" ? 0.8 : 0.7,
  }));
}
