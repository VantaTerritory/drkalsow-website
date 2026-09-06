import Image from "next/image";
import Link from "next/link";
import { Eyebrow, Divider } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";

/**
 * Bio copy from the live About page (verbatim, sentence case), with the
 * doctor's facial-surgery quote as a pull-quote and a bento of practice
 * photos (reuses the LP bento classes).
 */
export function AboutStory() {
  return (
    <section className="bg-white section-py-lg">
      <div className="container">
        <div className="about-grid">
          <Reveal className="bento" delay={80}>
            <div className="bento-item bento-1">
              <Image
                src="/img/team/dr-kalsow-or.jpg"
                alt="Dr. Kalsow in the operating room"
                fill
                sizes="(max-width: 900px) 50vw, 20vw"
                loading="lazy"
              />
            </div>
            <div className="bento-item bento-2">
              <Image
                src="/img/office/office-skyline.jpg"
                alt="Treatment lounge with Midtown skyline views"
                fill
                sizes="(max-width: 900px) 50vw, 20vw"
                loading="lazy"
              />
            </div>
            <div className="bento-item bento-3">
              <Image
                src="/img/team/dr-kalsow-lounge.jpg"
                alt="Dr. Kalsow at the Madison Avenue practice"
                fill
                sizes="(max-width: 900px) 50vw, 20vw"
                loading="lazy"
              />
            </div>
            <div className="bento-item bento-4">
              <Image
                src="/img/team/kalsow-team.jpg"
                alt="Dr. Kalsow with his surgical team"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal className="about-body">
            <Eyebrow>His Approach</Eyebrow>
            <h2 className="h-sec" style={{ marginBottom: "var(--space-3)" }}>
              Beautiful, <em>natural results.</em>
            </h2>

            <Divider />

            <p style={{ marginTop: "var(--space-3)" }}>
              The most rewarding aspect of Dr. Kalsow&apos;s profession is witnessing the
              transformative impact his work has on patients&apos; lives. He is committed to
              staying abreast of the latest best practices to ensure the highest quality results
              for his patients.
            </p>
            <p>
              His extensive experience is demonstrated by over 5,000 procedures performed,
              specializing in awake Brazilian Butt Lift (BBL) and awake facelift procedures. He
              also offers a range of other procedures, including mommy makeovers, rhinoplasty,
              and various types of breast surgery.
            </p>

            <blockquote className="abt-quote">
              &ldquo;Working on the face you can make the most difference in patients&apos; lives.
              When people look at you, the face is the first thing they see. Whether you are at
              work or in a social setting, facial beauty helps you in all your life
              circumstances.&rdquo;
            </blockquote>

            <p>
              As a board-certified plastic surgeon, Dr. Kalsow has met the rigorous standards and
              qualifications set by the relevant medical board, underscoring his expertise and
              unwavering commitment to patient safety and care.
            </p>
            <p>
              If you have any questions,{" "}
              <Link href="/call-our-office" className="text-link">
                fill out the contact form
              </Link>{" "}
              or call the office. Dr. Kalsow looks forward to assisting you on your journey.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
