// SEO migration map: /new-page was a test page (GSC-only, 9 impressions).
// Serve an explicit 410 Gone instead of a soft 404.
export function GET() {
  return new Response("Gone", { status: 410 });
}
