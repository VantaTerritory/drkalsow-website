import Image from "next/image";
import Link from "next/link";
import { Eyebrow, Divider } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";

/**
 * Bio copy from the live About page (verbatim, sentence case), with the
 * doctor's facial-surgery quote as a pull-quote and a formal portrait.
 */
export function AboutStory() {
  return (
    <section className="bg-white section-py-lg">
      <div className="container">
        <div className="about-grid">
          <Reveal className="about-story-portrait" delay={80}>
            <Image
              src="/img/portrait/dr-kalsow-suit.webp"
              alt="Dr. Sergei Kalsow wearing a blue suit"
              fill
              sizes="(max-width: 768px) 100vw, 42vw"
              loading="lazy"
            />
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
              Across more than 5,000 surgeries, experience becomes pattern recognition:
              understanding how anatomy, tissue distribution, skin quality, asymmetry and prior
              procedures should shape each surgical plan. Rather than applying the same formula
              to every patient, Dr. Kalsow develops an individualized approach around the person
              in front of him.
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
