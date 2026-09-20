import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";

/* Order (Sep 2026, the doctor's emphasis): liposuction stories first, the
   patient coordinator last. */
const stories = [
  {
    name: "Lucille",
    detail: "Lipo 360, BBL + blepharoplasty",
    src: "/video/testimonials/lucille.mp4",
    poster: "/video/testimonials/lucille-poster.webp",
    className: "story-card-wide",
  },
  {
    name: "Patient stories",
    detail: "Several patients on their care and results",
    src: "/video/testimonials.mp4",
    poster: "/video/testimonials-poster.jpg",
    className: "story-card-tall",
  },
  {
    name: "Sami",
    detail: "Arm + upper back liposuction",
    src: "/video/testimonials/sami.mp4",
    poster: "/video/testimonials/sami-poster.webp",
    className: "",
  },
  {
    name: "Michelle",
    detail: "Submental liposuction + chin augmentation",
    src: "/video/testimonials/michelle.mp4",
    poster: "/video/testimonials/michelle-poster.webp",
    className: "",
  },
  {
    name: "Natasha Lubrano",
    detail: "Patient Coordinator",
    src: "/video/testimonials/natasha.mp4",
    poster: "/video/testimonials/natasha-poster.webp",
    className: "",
  },
] as const;

export function PatientStories() {
  return (
    <section className="patient-stories section-py-lg" id="patient-stories">
      <div className="container">
        <Reveal className="patient-stories-intro">
          <Eyebrow>In their own words</Eyebrow>
          <h2 className="h-sec">
            The experience, <em>as patients lived it.</em>
          </h2>
          <p>
            Candid conversations about consultation, treatment, and recovery, most of them
            after liposuction and body contouring. Select any story to listen.
          </p>
        </Reveal>

        <div className="patient-story-grid">
          {stories.map((story, index) => (
            <Reveal
              as="article"
              className={`patient-story-card ${story.className}`.trim()}
              delay={(index % 3) * 70}
              key={story.name}
            >
              <div className="patient-story-media">
                <video
                  controls
                  playsInline
                  preload="none"
                  poster={story.poster}
                  aria-label={`${story.name}: ${story.detail}`}
                >
                  <source src={story.src} type="video/mp4" />
                </video>
              </div>
              <div className="patient-story-caption">
                <div>
                  <p className="patient-story-name">{story.name}</p>
                  <p className="patient-story-detail">{story.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
