import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { siteConfig } from "@/lib/site-config";

export function ReviewGallery() {
  return (
    <section className="testimonial-review-field" id="patient-reviews">
      <div className="container testimonial-review-content">
        <Reveal className="testimonial-review-intro">
          <Eyebrow>Patient reviews</Eyebrow>
          <h2 className="h-sec">
            Care remembered <em>beyond the procedure.</em>
          </h2>
          <p>
            Patients often remember the details: being heard, feeling prepared, and
            having a team available throughout recovery.
          </p>
        </Reveal>

        <div className="testimonial-gallery-mask">
          <div className="testimonial-review-gallery">
            {siteConfig.testimonials.map((testimonial, index) => (
              <Reveal
                as="article"
                className="testimonial-card testimonial-gallery-card"
                delay={(index % 3) * 70}
                key={testimonial.name}
              >
                <span className="testimonial-quote-mark" aria-hidden>
                  &ldquo;
                </span>
                <p
                  className="testimonial-stars"
                  aria-label={`${testimonial.stars} out of 5 stars`}
                >
                  {"★".repeat(testimonial.stars)}
                </p>
                <p className="testimonial-body">{testimonial.body}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar" aria-hidden>
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="testimonial-name">{testimonial.name}</p>
                    <p className="testimonial-meta">{testimonial.meta}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="testimonial-review-cta">
          <a
            className="btn-secondary testimonial-google-button"
            href={siteConfig.googleReviewUrl}
            target="_blank"
            rel="noreferrer"
          >
            Leave a Google Review <span aria-hidden>↗</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
