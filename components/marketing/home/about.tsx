import Link from "next/link";
import { Eyebrow, Divider } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { AmbientVideo } from "@/components/ui/ambient-video";

/**
 * "About" (home): the live site's letter-format About copy, kept verbatim
 * except Miami (dropped per project rules; NYC only) and sentence case.
 * Ambient OR video (the live hero's background loop) + credential pills.
 */
export function About() {
  return (
    <section className="section-py-lg" id="about">
      <div className="container">
        <div className="about-grid">
          <Reveal className="about-media" delay={80}>
            <AmbientVideo
              className="about-video"
              src="/video/about-or-loop.mp4"
              poster="/video/about-or-loop.jpg"
              ariaLabel="Dr. Kalsow performing surgery in the operating room"
            />
          </Reveal>

          <Reveal className="about-body">
            <Eyebrow ornament="none">About</Eyebrow>
            <h2 className="h-sec" style={{ marginBottom: "var(--space-3)" }}>
              Meet <em>Dr. Sergei Kalsow</em>
            </h2>

            <Divider />

            {/* Letter copy from the live site's About (Miami dropped: NYC only) */}
            <p className="about-salutation" style={{ marginTop: "var(--space-3)" }}>
              Dear future and current patients,
            </p>
            <p>
              My name is Dr. Sergei Kalsow, I&apos;m a board-certified plastic surgeon practicing
              in New York City. You can count on my expertise in the following procedures:
            </p>
            <ul className="about-procedures">
              <li>
                <strong>Face</strong> (Facelift, Blepharoplasty, Rhinoplasty)
              </li>
              <li>
                <strong>Breast</strong> (Augmentation and Lift)
              </li>
              <li>
                <strong>Body</strong> (360 Degree Liposuction, Brazilian Butt Lift, and Tummy Tuck)
              </li>
            </ul>
            <p>
              The most rewarding part of being a plastic surgeon is seeing how my work improves
              patients&apos; lives. I always aim to stay up to date with best practices and provide
              the best possible results.
            </p>
            <p>
              If you have any questions,{" "}
              <Link href="/call-our-office" className="text-link">
                fill out the contact form
              </Link>
              , or call my office. I look forward to helping you through your journey to enhance
              your body and feel more confident.
            </p>
            <p className="about-signature">Dr. Sergei Kalsow</p>

            <div style={{ marginTop: "var(--space-5)" }}>
              <Link href="/about-dr-sergei-kalsow" className="btn-secondary">
                More About Dr. Kalsow <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
