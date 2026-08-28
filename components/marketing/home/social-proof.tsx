import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";

/** Testimonial cards + aggregate rating line + link to the full page. */
export function SocialProof() {
  return (
    <section className="bg-cream section-py-lg" id="reviews">
      <div className="container">
        <div className="section-header">
          <Eyebrow ornament="heart">Real Patients · Real Stories</Eyebrow>
          <h2 className="h-sec">What our patients say.</h2>
        </div>

        <p className="rating-line">
          Rated <strong>{siteConfig.rating} ★</strong> across {siteConfig.ratingSource} · over 5,000 cases
        </p>

        <div className="testimonials-grid">
          {siteConfig.testimonials.map((t, i) => (
            <Reveal key={t.name} as="article" className="testimonial-card" delay={(i % 3) * 70}>
              <span className="testimonial-quote-mark" aria-hidden>
                &ldquo;
              </span>
              <p className="testimonial-stars" aria-label={`${t.stars} out of 5 stars`}>
                {"★".repeat(t.stars)}
              </p>
              <p className="testimonial-body">{t.body}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar" aria-hidden>
                  {t.initials}
                </div>
                <div>
                  <p className="testimonial-name">{t.name}</p>
                  <p className="testimonial-meta">{t.meta}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="testimonials-link">
          <Link href="/testimonials" className="link-arrow">
            Read more testimonials →
          </Link>
        </p>
      </div>
    </section>
  );
}
