import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";

/* Awards exactly as published on the live About page. */
const AWARDS = [
  { year: "2014", title: "Outstanding House Officer Award, LSU Health Science Center" },
  { year: "2013", title: "Second Place, National American College of Surgeons Jeopardy Competition" },
  { year: "2013", title: "Department of Surgery Student Award for Best Teaching Senior Surgery Resident" },
  { year: "2013", title: "Winner of Surgical Jeopardy, Louisiana Chapter, American College of Surgeons" },
  { year: "2012", title: "Department of Surgery Student Award for Best Teaching Junior Surgery Resident" },
  { year: "2010-2013", title: "Top Quartile Score, American Board of Surgery In-Training Examination" },
  { year: "2010", title: "Winner of Surgical Jeopardy, Louisiana Chapter, American College of Surgeons" },
];

/** Awards & training recognition (dark band). */
export function AboutAwards() {
  return (
    <section className="bg-aubergine section-py-lg" id="awards">
      <div className="container">
        <div className="section-header">
          <Eyebrow dark>Awards &amp; Training</Eyebrow>
          <h2 className="h-sec">
            Recognized from <em>residency on.</em>
          </h2>
          <p className="locations-subtitle" style={{ color: "var(--color-primary-100)", opacity: 0.85 }}>
            Dr. Kalsow received multiple awards during his training, including House Officer of
            the Year during his Chief year in 2014.
          </p>
        </div>

        <Reveal>
          <ul className="awards-list">
            {AWARDS.map((a, i) => (
              <li className="award-row" key={`${a.year}-${i}`}>
                <span className="award-year">{a.year}</span>
                <span className="award-title">{a.title}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
