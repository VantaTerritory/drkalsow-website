import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";

/* Awards exactly as published on the live About page, grouped by year. */
const AWARD_GROUPS = [
  {
    year: "2014",
    context: "Chief year",
    awards: ["Outstanding House Officer Award, LSU Health Science Center"],
  },
  {
    year: "2013",
    awards: [
      "Second Place, National American College of Surgeons Jeopardy Competition",
      "Department of Surgery Student Award for Best Teaching Senior Surgery Resident",
      "Winner of Surgical Jeopardy, Louisiana Chapter, American College of Surgeons",
      "Top Quartile Score, American Board of Surgery In-Training Examination",
    ],
    period: "2010–2013",
  },
  {
    year: "2012",
    awards: ["Department of Surgery Student Award for Best Teaching Junior Surgery Resident"],
  },
  {
    year: "2010",
    awards: ["Winner of Surgical Jeopardy, Louisiana Chapter, American College of Surgeons"],
  },
];

/** Awards & training recognition (dark band). */
export function AboutAwards() {
  return (
    <section className="bg-aubergine section-py-lg" id="awards">
      <div className="container">
        <div className="awards-intro">
          <Reveal>
            <Eyebrow dark>Awards &amp; Training</Eyebrow>
            <h2 className="h-sec">
              Recognized from <em>residency on.</em>
            </h2>
            <p
              className="locations-subtitle"
              style={{ color: "var(--color-primary-100)", opacity: 0.85 }}
            >
              Dr. Kalsow received multiple awards during his training, including House Officer of
              the Year during his Chief year in 2014.
            </p>
          </Reveal>
        </div>

        <Reveal as="ol" className="award-timeline" delay={180}>
          {AWARD_GROUPS.map((group) => (
            <li className="award-year-group" key={group.year}>
              <div className="award-date">
                <span className="award-year">{group.year}</span>
                {group.context && <span className="award-context">{group.context}</span>}
              </div>
              <span className="award-node" aria-hidden="true">
                <span />
              </span>
              <ul className="award-group-list">
                {group.awards.map((award, index) => (
                  <li className="award-item" key={award}>
                    {group.period && index === group.awards.length - 1 && (
                      <span className="award-period">{group.period}</span>
                    )}
                    <span className="award-title">{award}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
