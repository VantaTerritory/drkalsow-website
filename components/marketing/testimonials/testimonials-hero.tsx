import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";

export function TestimonialsHero() {
  return (
    <section className="testimonials-hero">
      <div className="container testimonials-hero-grid">
        <Reveal className="testimonials-hero-copy">
          <Eyebrow>Real patients · Real stories</Eyebrow>
          <h1 className="h-display">
            Patient Testimonials for <em>Dr. Sergei Kalsow</em>
          </h1>
          <p>
            Every surgical journey is personal. Hear patients describe their care, recovery
            and results with Dr. Kalsow and his New York City team, from Lipo 360 and body
            contouring to facial and breast procedures.
          </p>
          <a className="link-arrow" href="#patient-stories">
            Watch Their Stories <span aria-hidden>↓</span>
          </a>
        </Reveal>

        <Reveal className="testimonials-featured-video" delay={100}>
          <video
            controls
            playsInline
            preload="metadata"
            poster="/video/testimonials/alex-poster.webp"
            aria-label="Featured patient testimonial: Alex, Lipo 360 and BBL"
          >
            <source src="/video/testimonials/alex.mp4" type="video/mp4" />
          </video>
          <div className="testimonials-featured-caption">
            <span>Featured story · Lipo 360 + BBL</span>
            <p>Alex shares his Lipo 360 and BBL experience in his own words.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
