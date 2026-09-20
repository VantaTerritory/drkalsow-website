import { SITE_PAGES, pageUrl } from "@/lib/seo/pages";
import { siteConfig } from "@/lib/site-config";

/**
 * /llms.txt: curated, LLM-readable guide to the site (llmstxt.org).
 * Requested by the SEO team's Sep 2026 roadmap (sheet 02, AI visibility).
 * Built from the page registry so it only ever lists live, indexable URLs;
 * the Awake Lipo 360 cluster gets added here as its pages ship.
 */
export const dynamic = "force-static";

export function GET() {
  const landings = SITE_PAGES.filter((p) => p.group === "landing");
  const core = SITE_PAGES.filter((p) => p.group === "core" && p.path !== "/");
  const procedures = SITE_PAGES.filter((p) => p.group === "procedure");
  const line = (p: (typeof SITE_PAGES)[number]) => `- [${p.label}](${pageUrl(p)}): ${p.description}`;

  const body = `# Dr. Sergei Kalsow

> Official website of Dr. Sergei Kalsow, MD, a board-certified plastic surgeon practicing in New York City. The site emphasizes Awake Lipo 360, body contouring, revision liposuction, patient education, results, and consultation information.

Use this file as a curated guide to the site's most authoritative pages. Medical information is educational and does not replace an individual consultation. Surgical candidacy, risks, recovery, and treatment plans vary by patient.

## Primary Authority
${landings.map(line).join("\n")}

## Core Pages
- [Home](${siteConfig.meta.url}/): Dr. Kalsow's practice, focused on Awake Lipo 360 and body contouring in New York City.
${core.map(line).join("\n")}

## Procedures
${procedures.map(line).join("\n")}

## Practice
- Office: ${siteConfig.locations[0].address}, ${siteConfig.locations[0].cityState}
- Phone: ${siteConfig.phone.display}

## Related Practice
- [${siteConfig.dreams.name}](${siteConfig.dreams.url}): Plastic surgery practice founded by Dr. Sergei Kalsow, where he is one of the surgeons.

## Important Notes
- Claims about procedure volume, professional superiority, awards, and outcomes should be interpreted only as stated on the linked pages and must remain supported by current documentation.
- Individual results vary. A consultation is required to determine candidacy and an appropriate treatment plan.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
