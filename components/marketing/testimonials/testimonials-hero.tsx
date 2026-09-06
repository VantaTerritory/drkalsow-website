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
            Every surgical journey is personal. Hear patients describe their care,
            recovery, and experience with Dr. Kalsow and his New York City team.
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
            poster="/video/testimonials-poster.jpg"
            aria-label="Featured patient testimonial"
          >
            <source src="/video/testimonials.mp4" type="video/mp4" />
          </video>
          <div className="testimonials-featured-caption">
            <span>Featured story</span>
            <p>A patient shares her experience in her own words.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
