import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { TestimonialCarousel } from "@/components/marketing/home/testimonial-carousel";
import { AmbientVideo } from "@/components/ui/ambient-video";

/**
 * Testimonials: left-aligned header (title + lead + CTA), then the live
 * site's testimonials video (self-hosted, with controls) beside a
 * prev/next carousel of testimonial cards.
 */
export function SocialProof() {
  return (
    <section className="bg-cream section-py-lg" id="reviews">
      <div className="container">
        <div className="sp-header">
          <Eyebrow>Real Patients · Real Stories</Eyebrow>
          <h2 className="h-sec">What our patients say.</h2>
          <p className="sp-lead">
            Rated {siteConfig.rating} ★ across {siteConfig.ratingSource}, with over 5,000
            surgeries performed. Hear their stories in their own words.
          </p>
          <Link href="/testimonials" className="btn-secondary">
            More Testimonials <span aria-hidden>→</span>
          </Link>
        </div>

        <Reveal className="sp-row">
          <div className="sp-video">
            {/* autoplays muted; viewers unmute via the controls */}
            <AmbientVideo
              src="/video/testimonials.mp4"
              poster="/video/testimonials-poster.jpg"
              controls
              ariaLabel="Patient testimonials video"
            />
          </div>
          <TestimonialCarousel />
        </Reveal>
      </div>
    </section>
  );
}
