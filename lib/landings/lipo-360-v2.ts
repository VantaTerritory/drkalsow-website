/* ============================================================
   AWAKE LIPO 360 · VARIANT B — Google Ads A/B test (Sep 2026).

   Variant A is /awake-lipo-360-nyc (lib/landings/content.ts), the
   control: it stays exactly as it is. Variant B keeps the site's design
   system and takes the client's content and order (his prototype, his
   "Awake lipo 360. draft 2" document, the meetings of 23 and 24 Sep and
   Andrés's review of 29 Sep). The page is a list of blocks: reorder,
   drop or duplicate them here (a duplicate needs its own `id`).

   Round 2 (29 Sep): the order follows draft 2. Hero → why patients choose
   him → his philosophy → the gallery → an honest assessment → what Lipo
   360 is → … → FAQ. The long-form sections of draft 2 live in
   lipo-360-v2-guide.ts.

   Round 3 (8 Oct): the doctor's own edit of the page (the standalone copy we
   sent him on 2 Oct, returned as "DrKalsow-Lipo360-V2 (12).zip"). His
   order: hero → what Lipo 360 is → his philosophy beside a result → the
   gallery → candidacy → the diagrams → limitations → his lessons →
   closing band → form → testimonials → Instagram → FAQ → incisions → …
   → second form → the patients' messages. He dropped "The Name Is Newer
   Than The Procedure", "How Is Lipo 360 Performed?" and "What Thousands
   Of Awake Lipo 360 Cases Teach You".

   Copy rules: no em dashes (client), and nothing medical beyond what the
   doctor wrote. Where an answer is assembled from several sentences of
   draft 2, a comment says so.

   Before/after photos: the doctor's own composites, uncropped and with
   the censoring they already have, shown as they are since 29 Sep (Nico
   lifted the veil at the client's request, accepting the Google Ads
   review risk). A tap opens the original in the lightbox.
   ============================================================ */

import { siteConfig } from "@/lib/site-config";
import {
  CANDIDATE_BLOCK,
  CHOICES_BLOCK,
  LIMITATIONS_BLOCK,
  UNHAPPY_BLOCK,
  COMPLICATIONS_BLOCK,
  LESSONS_BLOCK,
  REVISION_BLOCK,
  MORE_BLOCK,
} from "@/lib/landings/lipo-360-v2-guide";

export type Lv2Link = { label: string; href: string };
export type Lv2Image = { src: string; alt: string; width: number; height: number };
export type Lv2Figure = Lv2Image & { caption: string };
/** An image whose caption is optional (stock images carry "Not a patient"). */
export type Lv2Picture = Lv2Image & {
  caption?: string;
  /** The caption set large, as a statement about the photo (round 3). */
  captionLead?: boolean;
  /** Shown whole on a rounded rectangle, never cropped to the arch or bubble (composites with text). */
  plain?: boolean;
};
export type Lv2Video = {
  src: string;
  poster: string;
  width: number;
  height: number;
  title: string;
  caption?: string;
};
/** `word`: the value is a word, not a figure, and is set smaller to fit its tile. */
export type Lv2Stat = { value: string; label: string; word?: boolean };
export type Lv2Card = { title: string; body: string };
/** A titled point whose text can run to several paragraphs. */
export type Lv2TextItem = { title: string; body: string | string[] };
export type Lv2Faq = { q: string; a: string };
/** Light section backgrounds, so neighbouring blocks can alternate. */
export type Lv2Tone = "white" | "cream" | "lavender";

/** One view of a patient: the before | after pair, 2164x1350 as the doctor composed it. */
export type Lv2BaView = {
  /** The file: /img/lipo-v2/ba/full/<id>.webp */
  id: string;
  view: "Front" | "Side" | "Back";
  alt: string;
  /** Files in the doctor's Drive, for traceability. Never rendered. */
  source: string;
};

export type Lv2Patient = {
  /** "01" … rendered as "Patient 01 – <detail>". */
  number: string;
  detail: string;
  views: Lv2BaView[];
};

export type Lv2HeroPhoto = Lv2Image & {
  /** Width / height of its frame when the photo is shown in another shape (cropped to cover). */
  frame?: number;
};

export type Lv2HeroBlock = {
  kind: "hero";
  id: string;
  eyebrow: string;
  /** One bold run inside the lead. */
  lead?: { before: string; bold: string; after: string };
  /** A heading over the figures, in the lead's place (round 3). */
  statsHeading?: string;
  stats: Lv2Stat[];
  call: Lv2Link;
  primary: Lv2Link;
  /** Left to right, before the clip. The first one is the LCP and the only one phones show beside the clip. */
  photos: [Lv2HeroPhoto, ...Lv2HeroPhoto[]];
  /** Phones: a head crop of the second photo, beside his name in the band that follows the hero. */
  avatar?: Lv2Image;
  /** A looping clip beside the photos (round 1); without it the hero shows his portrait alone. */
  video?: Lv2Video;
  /**
   * Phones: the lead, stats and CTAs render after this block instead of in
   * the hero, so the first screen is his photo and the moving clip. The
   * sticky Call / Request bar covers the CTAs.
   */
  mobileDetailsAfter?: string;
};

/** "Why thousands of patients choose Dr. Kalsow": his reasons, then the patients' own messages (either can go). */
export type Lv2WhyBlock = {
  kind: "why";
  id: string;
  eyebrow?: string;
  heading?: string;
  reasons?: Lv2Card[];
  /**
   * Screenshots of the patients' messages, published with their consent.
   * Pictures, not links: the client does not want them to open on a tap.
   * The alt text is the message itself.
   */
  messages: Lv2Image[];
};

export type Lv2ResultsBlock = {
  kind: "results";
  id: string;
  eyebrow: string;
  heading: string;
  intro: string;
  /** One line under the intro: how to see a view full size. */
  hint: string;
  patients: Lv2Patient[];
  gallery: Lv2Link;
  disclaimer: string;
};

/** A short statement on a tinted tile (draft 2's "An Honest Assessment"). */
export type Lv2CalloutBlock = {
  kind: "callout";
  id: string;
  tone: Lv2Tone;
  eyebrow: string;
  heading: string;
  body: string;
};

/** What Lipo 360 is, beside the marking clip. */
export type Lv2ProcedureBlock = {
  kind: "procedure";
  id: string;
  eyebrow: string;
  heading: string;
  body: string[];
  support: string;
  /** The marking scene: the looping clip (its still as the poster) or a photo. */
  marking: { image?: Lv2Image; video?: Lv2Video; caption: string };
};

/** The three diagrams back to back under their intro: one block so nothing can land between them. */
export type Lv2DiagramsBlock = {
  kind: "diagrams";
  id: string;
  heading: string;
  body: string;
  diagrams: Lv2Figure[];
};

/** Scars and incisions: the 3 mm figure, the healed-incision clip and the facts. */
export type Lv2IncisionsBlock = {
  kind: "incisions";
  id: string;
  eyebrow: string;
  heading: string;
  body: string;
  figure: Lv2Stat;
  facts: Lv2Card[];
  video: Lv2Video;
};

export type Lv2TestimonialsBlock = {
  kind: "testimonials";
  id: string;
  tone?: Lv2Tone;
  eyebrow: string;
  heading: string;
  intro: string;
  videos: Lv2Video[];
  more: Lv2Link;
};

/** The destination practice: its copy and approach, its mosaic, or both (round 3 runs them as two blocks). */
export type Lv2DestinationBlock = {
  kind: "destination";
  id: string;
  tone?: Lv2Tone;
  intro?: {
    eyebrow: string;
    heading: string;
    body: string[];
    approach: { title: string; items: string[] };
  };
  mosaic?: {
    portrait: Lv2Image;
    /** The hotel near the practice and the team. The mosaic is laid out for two. */
    images: Lv2Figure[];
    call: { heading: string; body: string; link: Lv2Link };
    reel: Lv2Video;
  };
};

/** A sideways roll of his Instagram: the reel, then photos that open his profile. */
export type Lv2InstagramBlock = {
  kind: "instagram";
  id: string;
  tone: Lv2Tone;
  eyebrow: string;
  heading: string;
  intro: string;
  follow: Lv2Link;
  reel: Lv2Video;
  posts: Lv2Figure[];
  hint: string;
};

/* ---- generic long-form blocks (draft 2), rendered by guide.tsx ---- */

/** Text with an optional opening statement, lead-in points, a tinted aside and an image beside it. */
export type Lv2ProseBlock = {
  kind: "prose";
  id: string;
  tone: Lv2Tone;
  /** Without a heading the block is the photo beside the text (the philosophy, round 3). */
  eyebrow?: string;
  heading?: string;
  /** Opening statement, set larger than the body. */
  lead?: string;
  body: string[];
  /** A bulleted list after the body. */
  bullets?: string[];
  /** "Lead-in: text" points after the body. */
  points?: Lv2Card[];
  /** Closing line after the points. */
  outro?: string;
  /** A second, related topic on a tinted tile. */
  aside?: Lv2TextItem;
  image?: Lv2Picture;
  /** The image's side from tablet up (phones stack it). Default "end". */
  imageSide?: "start" | "end";
};

/** Titled points in a ruled grid. */
export type Lv2PointsBlock = {
  kind: "points";
  id: string;
  tone: Lv2Tone;
  eyebrow: string;
  heading: string;
  intro?: string;
  items: Lv2TextItem[];
  /** Columns from desktop up. */
  columns: 2 | 3;
  numbered?: boolean;
  image?: Lv2Picture;
};

/** Long lists as native <details>, in groups (why some patients are unhappy, complications). */
export type Lv2DisclosureBlock = {
  kind: "disclosure";
  id: string;
  tone: Lv2Tone;
  eyebrow: string;
  heading: string;
  intro?: string;
  groups: { title?: string; items: Lv2Card[] }[];
};

/** The doctor's first-person lessons, on a dark band under three photos of him at work. */
export type Lv2LessonsBlock = {
  kind: "lessons";
  id: string;
  eyebrow: string;
  heading: string;
  items: Lv2Card[];
  photos: Lv2Image[];
};

/** Revision liposuction, with the views of one patient of the results block. */
export type Lv2RevisionBlock = {
  kind: "revision";
  id: string;
  tone: Lv2Tone;
  eyebrow: string;
  heading: string;
  body: string;
  /** The questions he asks himself before recommending a revision. */
  questions: string[];
  /** Number of a patient in the results block: its tiles and lightbox render here too. */
  patient: string;
  link: Lv2Link;
};

export type Lv2FaqBlock = {
  kind: "faq";
  id: string;
  tone?: Lv2Tone;
  eyebrow: string;
  heading: string;
  /** The first group is the prototype's ten questions, in his order; the rest come from draft 2. */
  groups: { title?: string; items: Lv2Faq[] }[];
};

export type Lv2ClosingBlock = {
  kind: "closing";
  id: string;
  eyebrow: string;
  heading: string;
  body: string;
  call: Lv2Link;
  primary: Lv2Link;
  disclaimer: string;
  image: Lv2Image;
};

/** A consultation form; its intro column. */
export type Lv2ConsultationBlock = {
  kind: "consultation";
  id: string;
  eyebrow: string;
  heading: string;
  body: string;
  /** A small result beside the heading. */
  photo?: Lv2Image;
  /** Under the intro's text. */
  teamPhoto?: Lv2Image;
};

export type Lv2GuideBlock =
  | Lv2ProseBlock
  | Lv2PointsBlock
  | Lv2DisclosureBlock
  | Lv2LessonsBlock
  | Lv2RevisionBlock;

export type Lv2Block =
  | Lv2HeroBlock
  | Lv2WhyBlock
  | Lv2ResultsBlock
  | Lv2CalloutBlock
  | Lv2ProcedureBlock
  | Lv2DiagramsBlock
  | Lv2IncisionsBlock
  | Lv2TestimonialsBlock
  | Lv2DestinationBlock
  | Lv2InstagramBlock
  | Lv2GuideBlock
  | Lv2FaqBlock
  | Lv2ClosingBlock
  | Lv2ConsultationBlock;

export type Lv2Page = {
  path: string;
  /** Pushed to the dataLayer as landing_variant / landing_test. */
  variant: "B";
  test: string;
  blocks: Lv2Block[];
};

/** Where the before/after files live (client code imports them from the -media module). */
export { BA_FULL_DIR, BA_SIZE } from "@/lib/landings/lipo-360-v2-media";

/** "212-653-8726", the format on the client's call buttons. */
export const PHONE = siteConfig.phone.display.replace(/[()]/g, "").replace(" ", "-");
const CALL: Lv2Link = { label: `Call ${PHONE}`, href: `tel:${siteConfig.phone.tel}` };
/* Two forms: #consultation right after the closing band (round 3), where the hero,
   the results and the mobile sticky bar lead, and #consultation-end near the foot. */
const REQUEST: Lv2Link = { label: "Request Consultation", href: "#consultation" };
/* Lipo 360 without fat transfer, back view: the doctor's own composite (his title,
   logo and censoring), kept with the other originals so it gets their noindex header. */
const NO_FAT_TRANSFER: Lv2Image = {
  src: "/img/lipo-v2/ba/full/no-fat-transfer-back.webp",
  alt: "Before and after Lipo 360 without fat transfer, back view",
  width: 1536,
  height: 1920,
};
const CONSULTATION_INTRO = {
  eyebrow: "Request a consultation",
  heading: "Tell Dr. Kalsow about your goals.",
  body: "Consultations are held in person at 635 Madison Avenue or by FaceTime. Share a few details and the office will be in touch to schedule.",
  // round 3: a small result beside the heading and the consultation room under the text
  photo: NO_FAT_TRANSFER,
  teamPhoto: {
    src: "/img/lipo-v2/consultation-team.jpg",
    alt: "Dr. Kalsow and a member of his team in the consultation room, the Manhattan skyline behind them",
    width: 1672,
    height: 941,
  },
};

/* Patients as numbered in the doctor's prototype (7 sets, 3 views each).
   Views are the doctor's before | after composites (1080 + 4 px + 1080).
   P05 and P06 only exist as singles in the Drive: composed the same way. */
function views(
  n: string,
  sources: Record<Lv2BaView["view"], string>,
  order: Lv2BaView["view"][] = ["Front", "Side", "Back"],
): Lv2BaView[] {
  return order.map((view) => ({
    id: `p${n}-${view.toLowerCase()}`,
    view,
    alt: `Patient ${n}, ${view.toLowerCase()} view, before (left) and after (right) Awake Lipo 360`,
    source: sources[view],
  }));
}

export const LIPO_360_V2: Lv2Page = {
  path: "/lipo-360-v2",
  variant: "B",
  test: "awake_lipo_360",
  blocks: [
    {
      kind: "hero",
      id: "top",
      eyebrow: "New York City · Awake Body Contouring",
      // round 3: his heading in the lead's place, and "Unparalleled results" for 360°
      statsHeading: "Why thousands of patients around the world choose Dr. Kalsow",
      stats: [
        { value: "5,000+", label: "Awake Lipo 360 procedures" },
        { value: "Unparalleled", label: "Results", word: true },
        { value: "NYC", label: "Destination practice" },
        { value: "MD", label: "Board-certified plastic surgeon" },
      ],
      call: CALL,
      primary: REQUEST,
      // His portrait alone (Nico, 29 Sep): the AI portrait the client asked
      // for (draft 2's hero photo, "Sergei Kalsow MD NYC" in his Drive; the
      // Drive file is this same 1254 px one), cropped to about 3:4 so the
      // practice's sign stays out. The white-coat photo left the hero and
      // the marking clip moved to the procedure block.
      photos: [
        {
          src: "/img/portrait/dr-kalsow-dreams.jpg",
          alt: "Portrait of Dr. Sergei Kalsow, MD, in a dark suit and tie",
          width: 1254,
          height: 1254,
          frame: 0.76,
        },
      ],
      mobileDetailsAfter: "top",
    },
    {
      kind: "procedure",
      id: "what-is-lipo-360",
      // Heading and first paragraphs from the doctor's prototype.
      eyebrow: "A signature procedure",
      heading: "Not Simply Fat Removal. A Deliberate Reshaping Of The Torso.",
      body: [
        "Awake Lipo 360 treats the abdomen, waist, flanks and back as one continuous three-dimensional structure. The goal is not to make each area independently smaller, but to create a cleaner transition from the rib cage through the waist and into the hips.",
        "Dr. Kalsow’s approach is based on finding the patient’s underlying frame, reducing the areas that obscure it, and sculpting the surrounding zones so the waist appears narrower and the torso more balanced from the front, side and back.",
      ],
      support:
        "Because no two frames are identical, treatment is planned around the individual anatomy rather than a standardized pattern.",
      // IMG_0877.MOV ("087"): the doctor marking a patient, a short muted
      // cut without her face and with as little exposure as possible. It
      // opened the hero until 29 Sep; here it takes the place of its own
      // still, which stays as the poster (4:5, the frame's shape).
      marking: {
        video: {
          src: "/video/lipo-v2/marking.mp4",
          poster: "/img/lipo-v2/marking-still.jpg",
          width: 800,
          height: 1000,
          title: "Dr. Kalsow marking a patient for Awake Lipo 360",
        },
        caption:
          "Dr. Kalsow marking the patient for Lipo 360. The procedure illustrates the target areas of the Lipo 360 procedure.",
      },
    },
    {
      kind: "prose",
      // round 3: no heading, and a result beside it instead of his photo
      id: "philosophy-highlight",
      tone: "white",
      // Draft 2, word for word (its em dashes as commas).
      lead: "The goal is the best possible result while maintaining safety.",
      body: [
        "In liposuction, the surgeon must be able to remove the maximum amount of fat possible safely for each person’s body. That is the first requirement. The name of a technique or piece of equipment matters far less than what the surgeon can accomplish with it.",
        "The second requirement is the ability to sculpt: knowing where to remove the most fat, how to shape the transition between areas, and where to be more conservative to avoid dents, particularly in the lower abdomen.",
        "Every part of Dr. Kalsow’s approach, from numbing and positioning to the tools he uses, is focused on removing the maximum amount of fat possible safely while creating a smooth, sculpted result.",
      ],
      image: { ...NO_FAT_TRANSFER, plain: true },
      imageSide: "start",
    },
    {
      kind: "results",
      id: "results",
      eyebrow: "Real patients",
      heading: "Awake Lipo 360 Results",
      intro:
        "Seven of Dr. Kalsow’s Awake Lipo 360 patients, each photographed from the front, the side and the back. The photographs are shown uncropped, as the practice took them.",
      hint: "Tap or click any photo to see it full size.",
      patients: [
        {
          number: "01",
          detail: "Lipo360 – BMI 26",
          views: views("01", {
            Front: "combo2_img7_front.webp",
            Side: "combo2_img7_side.webp",
            Back: "combo2_img7_back.webp",
          }),
        },
        {
          number: "02",
          detail: "Lipo360 – BMI 29 – Notice how skin tightened with just lipo.",
          // the former 04 (round 3 swapped them, files included)
          views: views("02", {
            Front: "combo_set6_front.webp",
            Side: "combo_set6_side.webp",
            Back: "combo_set6_back.webp",
          }),
        },
        {
          number: "03",
          detail: "Lipo360 – BMI 30",
          // Front and back are swapped in the Drive's file names. Back view first (round 3).
          views: views(
            "03",
            {
              Front: "combo2_img6_back.webp",
              Side: "combo2_img6_side.webp",
              Back: "combo2_img6_front.webp",
            },
            ["Back", "Side", "Front"],
          ),
        },
        {
          number: "04",
          detail: "Lipo360 – BMI 28 – Complete back sculpting.",
          // the former 02 (round 3 swapped them, files included), back view first
          views: views(
            "04",
            {
              Front: "combo2_img2_front.webp",
              Side: "combo2_img2_side.webp",
              Back: "combo2_img2_back.webp",
            },
            ["Back", "Side", "Front"],
          ),
        },
        {
          number: "05",
          detail: "Lipo360 – BMI 31 – Great difference only 1 week out.",
          views: views("05", {
            Front: "set2_front_before.webp + set2_front_after.webp",
            Side: "set2_side_before.webp + set2_side_after.webp",
            Back: "set2_back_before.webp + set2_back_after.webp",
          }),
        },
        {
          number: "06",
          detail:
            "Revision Lipo360 after tummy tuck and lipo elsewhere – BMI 26 – Notice improvement in shape and reduction of love handles, resulting in an hourglass silhouette.",
          views: views("06", {
            Front: "set1_front_before.webp + set1_front_after.webp",
            Side: "set1_side_before.webp + set1_side_after.webp",
            Back: "set1_back_before.webp + set1_back_after.webp",
          }),
        },
        {
          number: "07",
          detail: "Lipo360 combined with fat transfer. Notice improved projection.",
          views: views("07", {
            Front: "combo_set4_front.webp",
            Side: "combo_set4_side.webp",
            Back: "combo_set4_back.webp",
          }),
        },
      ],
      gallery: { label: "View the Full Gallery", href: "/beforeafter" },
      disclaimer: "Before-and-after photographs show individual outcomes and do not guarantee a particular result.",
    },
    CANDIDATE_BLOCK,
    {
      kind: "diagrams",
      id: "lipo-360-areas",
      // Draft 2's "What Is Lipo 360?" under the doctor's round 3 heading (its
      // sentence pointing at the diagrams is left out: they follow right under it).
      heading: "Which Areas Are Included in Lipo360, and Which Can Be Added?",
      body: "“Lipo 360” means liposuction around the midsection, typically including the abdomen, waist, sides, and back. The exact areas vary from person to person. During your consultation, Dr. Kalsow marks the areas he recommends treating so you can see what “360” means for your body.",
      // The doctor's three diagrams, in his order, back to back (captions
      // from draft 2; the fat transfer list is shortened to the areas the
      // diagram shows plus hands and scars).
      diagrams: [
        {
          src: "/img/landing/awake-lipo-360/treatment-area.png",
          alt: "Diagram of the Lipo 360 treatment area, front and back views: abdomen, waist, flanks and back",
          width: 1046,
          height: 1100,
          caption:
            "Areas included in Dr. Kalsow’s Lipo 360: upper and lower abdomen, flanks, sides of the breasts, bra rolls, lower and mid back, and upper back up to the armpits.",
        },
        {
          src: "/img/landing/awake-lipo-360/additional-areas.png",
          alt: "Diagram of additional body contouring areas that can be added, front and back views",
          width: 1046,
          height: 1100,
          caption:
            "Areas that can be added: chin, arms, inner and outer thighs, anterior and posterior axilla, buffalo hump, inner knees, calves and buttocks.",
        },
        {
          src: "/img/landing/awake-lipo-360/fat-transfer-areas.png",
          alt: "Diagram of possible fat transfer areas: face, breasts, hips and buttocks",
          width: 1046,
          height: 1100,
          caption:
            "Fat transfer areas: buttocks and hips (BBL), breasts (half a cup to a cup size larger only), face, hands and depressed scars.",
        },
      ],
    },
    LIMITATIONS_BLOCK,
    LESSONS_BLOCK,
    {
      kind: "closing",
      id: "plan",
      eyebrow: "Consultation",
      heading: "Your Anatomy Determines The Plan.",
      body: "A consultation is the point where the procedure becomes specific: your frame, target waist, prior liposuction, skin quality, candidacy for awake surgery and the contour that can realistically be created for you.",
      call: CALL,
      // the first form follows the band since round 3
      primary: REQUEST,
      disclaimer:
        "Surgical procedures have risks and results vary. A consultation is required to determine candidacy and the appropriate treatment plan.",
      image: {
        src: "/img/lipo-v2/sk-empire.jpg",
        alt: "The SK monogram of Dr. Sergei Kalsow over the Manhattan skyline and the Empire State Building at dusk",
        width: 1000,
        height: 1000,
      },
    },
    { kind: "consultation", id: "consultation", ...CONSULTATION_INTRO },
    {
      kind: "testimonials",
      id: "testimonials",
      // lavender = the patients' proof (results, testimonials, revision), and a break
      // in the long white / cream run between the gallery and the dark lessons band
      tone: "lavender",
      eyebrow: "In their own words",
      heading: "Patients, in their own words.",
      intro: "Video testimonials from Dr. Kalsow’s patients.",
      // The same real videos as /testimonials.
      videos: [
        {
          src: "/video/testimonials/alex.mp4",
          poster: "/video/testimonials/alex-poster.webp",
          width: 960,
          height: 540,
          title: "Alex",
          caption: "Lipo 360 + BBL",
        },
        {
          src: "/video/testimonials/lucille.mp4",
          poster: "/video/testimonials/lucille-poster.webp",
          width: 960,
          height: 540,
          title: "Lucille",
          caption: "Lipo 360, BBL + blepharoplasty",
        },
        {
          src: "/video/testimonials/sami.mp4",
          poster: "/video/testimonials/sami-poster.webp",
          width: 960,
          height: 540,
          title: "Sami",
          caption: "Arm + upper back liposuction",
        },
      ],
      more: { label: "More Patient Stories", href: "/testimonials" },
    },
    {
      kind: "instagram",
      id: "instagram",
      tone: "white",
      eyebrow: "Follow along",
      heading: "Inside Dr. Kalsow’s practice.",
      intro: "Technique, patient stories, and a look behind the scenes.",
      follow: { label: "Follow @doctor.serge", href: siteConfig.social.instagram },
      // the reel moved here from the destination mosaic (it stays there too, round 3)
      reel: {
        src: "/video/lipo-v2/reel-misconception.mp4",
        poster: "/video/lipo-v2/reel-misconception-poster.jpg",
        width: 720,
        height: 1280,
        title: "Dr. Kalsow on a common misconception",
        caption: "From Dr. Kalsow’s Instagram, @doctor.serge.",
      },
      // the doctor's own photos (round 3); each one opens his profile
      posts: [
        {
          src: "/img/lipo-v2/or-1.jpg",
          alt: "Dr. Kalsow in the operating room, behind two canisters of removed fat",
          width: 1125,
          height: 2000,
          caption: "In the operating room",
        },
        {
          src: "/img/lipo-v2/or-2.jpg",
          alt: "Dr. Kalsow in surgical gown and cap during liposuction",
          width: 1125,
          height: 2000,
          caption: "A closer look at the technique",
        },
        {
          src: "/img/lipo-v2/or-3.jpg",
          alt: "Dr. Kalsow in scrubs, sitting in his operating room",
          width: 1536,
          height: 2048,
          caption: "Behind the scenes",
        },
      ],
      hint: "Scroll to explore · See more on Instagram",
    },
    {
      kind: "faq",
      id: "faq",
      tone: "cream",
      eyebrow: "Frequently asked questions",
      heading: "Awake Lipo 360 FAQ",
      groups: [
        {
          // The prototype's ten questions, in his order. Answers from the
          // doctor's draft 2 or the ones variant A already publishes (#3
          // verbatim from A, #7 from the brief).
          items: [
            {
              q: "What is Awake Lipo 360?",
              a: "“Lipo 360” means liposuction around the midsection, typically including the abdomen, waist, sides and back; the exact areas vary from person to person. Dr. Kalsow performs Lipo 360 while the patient is awake. He treats each planned area as thoroughly as he safely can, then sculpts the transitions to create the desired shape.",
            },
            {
              q: "What is the difference between Lipo 360 and regular liposuction?",
              a: "Lipo 360 is liposuction. Terms such as “Lipo 360” describe a treatment area; they do not describe a special machine or guarantee a result. You can choose liposuction of specific areas, such as the abdomen, flanks or back, instead of treating the full midsection. The trade-off is that an untreated area may interrupt the transition in your contour.",
            },
            {
              q: "Am I completely pain-free during awake liposuction?",
              a: "The numbing process and parts of the procedure can be uncomfortable. Patients may feel pressure or movement. Comfort varies, and the procedure should not be described as pain-free.",
            },
            {
              // Assembled only from sentences of draft 2 (candidacy and
              // limitations), nothing added; approved by the client on 28 Sep.
              q: "Can Awake Lipo 360 create an hourglass shape without fat transfer?",
              a: "Lipo 360 can target the waist, love handles, abdomen and back to create more curves. The rib cage and underlying bone structure limit how narrow the waist can become. Fat transfer may soften hip dips, but it may not fill them completely; the result depends on your anatomy, skin and how much fat is available. At your consultation, Dr. Kalsow will explain what can realistically change for your body and whether Lipo 360 is the right way to achieve it.",
            },
            {
              q: "Do you use drains?",
              a: "Typically, no. Dr. Kalsow leaves the small liposuction incisions open so excess tumescent fluid can drain during the first day. He does not routinely use separate surgical drains. The red-tinged drainage can look alarming, so his team explains what to expect and when to call. Leaving incisions open does not replace careful limits on the amount of lidocaine used.",
            },
            {
              q: "Will I have scars?",
              a: "Yes, small ones. All incisions leave scars, even when they are small. Dr. Kalsow uses small access points of approximately 3 mm, positioned to reach the planned areas, using creases or less visible locations when possible. His typical Lipo 360 plan uses approximately 12 incisions; fat transfer may require two more. He will show you the proposed locations during your consultation.",
            },
            {
              q: "Can you correct liposuction performed somewhere else?",
              a: "Yes, Dr. Kalsow performs revision liposuction to address contour irregularities, asymmetry, or unsatisfactory results from a prior procedure. A consultation will determine the best approach for your specific case.",
            },
            {
              q: "How long do results from Awake Lipo 360 last?",
              a: "The fat cells removed are gone, so the change can last many years. Weight gain can enlarge the fat cells that remain and change your proportions. Pregnancy, aging and changes in skin quality can also alter the result.",
            },
            {
              q: "Can I travel to New York for surgery?",
              // "Potentially, yes." as variant A says it: no source supports an unconditional yes
              a: `Potentially, yes. Dr. Kalsow treats patients who come to New York from many U.S. states and from outside the United States. Destination patients need a plan for consultation, preoperative clearance, local accommodation, transportation, postoperative visits and safe timing for travel home. Once you land, call or text the office at ${PHONE} to let us know you’ve arrived.`,
            },
            {
              q: "How do I know whether I am a candidate?",
              a: "The ideal candidate is generally near a comfortable, stable weight, in good health, and has skin that can adjust to the new contour. Dr. Kalsow also evaluates patients whose circumstances call for a more individualized plan, such as a higher BMI, major weight loss or a previous liposuction. At your consultation, he will explain what can realistically change for your body and whether Lipo 360 is the right way to achieve it.",
            },
          ],
        },
        {
          // Draft 2's FAQ from here on, without its source notes in brackets.
          // Left out: "Is ultrasound used for fat transfer?" (the draft itself
          // says to confirm the practice's protocol before publishing it) and
          // the questions answered above or in the sections of the page.
          title: "The procedure",
          items: [
            {
              q: "What kind of liposuction does Dr. Kalsow perform?",
              a: "He uses power-assisted liposuction (PAL). The cannula moves rapidly over a short distance while he controls where it travels and how the areas are sculpted. The device assists the surgeon; it does not determine the result.",
            },
            {
              // the draft's second sentence is a note to the author, not copy
              q: "What cannulas does he use?",
              a: "Cannula size and shape may vary by area, the thickness of the fat layer, and whether the goal is fat removal or finer sculpting.",
            },
            {
              q: "Are there other types of liposuction?",
              a: "Yes. Surgeons may use traditional suction, power assistance, ultrasound assistance, laser assistance, or water assistance. These describe the tool used to help remove fat. The choice of tool does not replace planning, judgment, or careful contouring.",
            },
            {
              q: "What makes Lipo 360 difficult to sculpt well?",
              a: "Treating the abdomen alone can leave the flanks, bra rolls, or back out of balance. Conversely, removing too much in a thin area can create a dent. The surgeon must know where to be thorough, where to blend, and where to stop. Performing an extensive case while the patient is awake also requires experience with numbing, positioning, comfort, and steady execution throughout the procedure.",
            },
            {
              q: "How much can be removed? Is that fat or fluid?",
              a: "The amount depends on your body and the setting in which surgery is performed. The collection container holds total aspirate: fat plus tumescent fluid and other fluid. It is not a measurement of pure fat. Five liters of total aspirate is commonly used as the threshold for large-volume liposuction; it is not a promise that five liters of fat can or should be removed.",
            },
            {
              // the draft points to an insurance page the site does not have
              q: "Does insurance cover Lipo 360?",
              a: `Lipo 360 is a cosmetic procedure and is generally not covered by health insurance. If you are looking for a procedure that may qualify for insurance coverage, call the office at ${PHONE}.`,
            },
          ],
        },
        {
          title: "Results and expectations",
          items: [
            {
              q: "Does removed fat “move” to another part of my body?",
              a: "No. Fat removed by liposuction does not travel elsewhere. If you gain weight later, fat cells that remain, in treated and untreated areas, can enlarge. Maintaining a stable weight helps preserve your shape.",
            },
            {
              q: "What percentage improvement should I expect: 50% flatter or 80% flatter?",
              a: "There is no reliable percentage that applies to everyone. At your consultation, Dr. Kalsow can identify which fullness is removable fat, which is loose skin or muscle separation, and which may remain. Before-and-after photos of patients with similar anatomy are more useful than a promised percentage.",
            },
            {
              q: "Does liposuction improve cellulite?",
              a: "Liposuction is not a reliable cellulite treatment. Removing fat may leave cellulite unchanged or make it more visible in some areas, particularly where the fat layer is thin. Fat transfer does not reliably erase it either.",
            },
            {
              q: "How can I get the best result?",
              a: "Start with an honest assessment of what your anatomy allows. Follow your postoperative instructions, give swelling time to resolve, and maintain a stable weight. Compression and follow-up matter, but neither can turn loose skin into the result of a tummy tuck.",
            },
            {
              q: "How can I tell whether my abdominal fat is under the skin or inside the abdomen?",
              a: "Fat just beneath the skin can generally be pinched. Visceral fat lies deeper, behind the abdominal wall, and cannot be removed by liposuction. An examination also helps distinguish fat from loose skin, muscle separation, or a hernia.",
            },
          ],
        },
        {
          title: "Fat transfer and BBL",
          items: [
            {
              q: "Can fat transfer fill my hip dips?",
              a: "It may soften them, but hip dips have different causes. Some reflect a lack of fat; others are strongly influenced by the pelvis, muscle, and tightness of the tissues. A patient with a narrow frame and little available fat should not expect fat transfer alone to create a completely different body shape.",
            },
            {
              q: "Why can a buttock still look square after hip-dip filling?",
              a: "The surrounding contour matters. Prominent love handles or fullness above the buttocks can preserve a square appearance even if volume is added to the hips. Dr. Kalsow assesses where fat should be removed as well as where it might be added.",
            },
            {
              q: "Does Dr. Kalsow ever reduce the buttocks?",
              a: "In selected patients, he may conservatively reduce fullness in specific areas of the buttocks as part of the overall shape. The plan depends on the existing contour and the result you want.",
            },
            {
              q: "Can I use someone else’s fat for a BBL or breast fat transfer? Can I donate mine?",
              a: "Standard fat transfer uses your own fat. You cannot simply transfer fat suctioned from one person into another. Processed donor-derived products exist, but they are different from transferring a person’s freshly removed, living fat.",
            },
          ],
        },
        {
          title: "Tummy tuck",
          items: [
            {
              q: "Why might a tummy tuck without enough liposuction leave an incomplete result?",
              a: "A tummy tuck can remove loose skin and repair separated abdominal muscles, but it may leave fullness at the waist, flanks, or back. Liposuction of appropriate surrounding areas can improve the transition. The amount that can safely be combined with a tummy tuck depends on the surgical plan and blood supply.",
            },
            {
              q: "Will my abdomen be completely flat after a tummy tuck?",
              a: "Not necessarily. Repairing separated muscles can bring the abdominal wall inward, somewhat like bringing the sides of an overfilled suitcase together, but fat inside the abdomen can still push it outward. Neither a tummy tuck nor liposuction removes that internal, or visceral, fat.",
            },
            {
              q: "Will a tummy tuck remove stretch marks?",
              a: "A tummy tuck removes stretch marks only if they are on skin that is removed. Stretch marks on skin that remains may move position or become less noticeable, but the operation does not erase them. Liposuction does not remove stretch marks.",
            },
          ],
        },
      ],
    },
    {
      kind: "incisions",
      id: "lipo-360-details",
      eyebrow: "Scars and incisions",
      // 3 mm, as the doctor's draft 2 has it ("usually about 3 mm long");
      // settled by Nico on 28 Sep over the 4 mm said on the 23 Sep call.
      heading: "Small 3 mm access points.",
      // the size is in the heading and the figure tile, not a third time here
      body: "Fat is removed through small access points. Dr. Kalsow places them where they allow him to reach and sculpt each planned area, choosing natural creases or existing scars when possible.",
      figure: { value: "3 mm", label: "Approximate size of each access point" },
      facts: [
        {
          title: "About 12 small incisions",
          body: "For a typical Lipo 360: three on the lower abdomen, one inside the belly button, one beneath each breast, four along the sides and two on the back. Fat transfer usually adds one beneath each gluteal crease.",
        },
        {
          title: "No routine drains",
          body: "Dr. Kalsow typically leaves the small incisions without sutures so excess fluid can drain. He does not routinely use surgical drains.",
        },
        {
          title: "Small, discreet scars",
          body: "The incisions are designed to leave small, discreet scars, though all incisions leave some degree of scarring.",
        },
      ],
      video: {
        src: "/video/landing/awake-lipo-360-incision.mp4",
        poster: "/video/landing/awake-lipo-360-incision-poster.jpg",
        width: 960,
        height: 960,
        title: "A healed access incision",
        caption: "On a patient’s flank, filmed at the practice.",
      },
    },
    CHOICES_BLOCK,
    MORE_BLOCK,
    {
      kind: "destination",
      id: "destination-media",
      tone: "cream",
      // round 3: the mosaic on its own, right above the copy
      mosaic: {
        portrait: {
          src: "/img/portrait/dr-kalsow-suit.webp",
          alt: "Dr. Sergei Kalsow, MD, smiling, in a blue blazer",
          width: 1312,
          height: 1456,
        },
        images: [
          // Both from the doctor's Squarespace prototype page. The Plaza photo
          // was 732 px wide there: upscaled with Real-ESRGAN (x4, then 1600 px).
          {
            src: "/img/lipo-v2/hotel-plaza.jpg",
            alt: "The Plaza hotel on Fifth Avenue at dusk, a few blocks from Dr. Kalsow’s practice",
            width: 1600,
            height: 1200,
            caption: "The Plaza, a few blocks from the practice",
          },
          {
            src: "/img/lipo-v2/team-office.jpg",
            alt: "Dr. Kalsow with two members of his team in maroon scrubs at the practice",
            width: 1200,
            height: 800,
            caption: "Dr. Kalsow and his team",
          },
        ],
        // From draft 2, "For Our Destination Patients".
        call: {
          heading: "Traveling to New York?",
          body: `Once you land in New York, call or text us at ${PHONE} to let us know you’ve arrived. Send us the name of your hotel or the address where you’ll be staying and the best number to reach you while you’re here. If your flight is delayed or your plans change, just keep us updated.`,
          link: CALL,
        },
        reel: {
          src: "/video/lipo-v2/reel-misconception.mp4",
          poster: "/video/lipo-v2/reel-misconception-poster.jpg",
          width: 720,
          height: 1280,
          title: "Dr. Kalsow on a common misconception",
          caption: "From Dr. Kalsow’s Instagram, @doctor.serge.",
        },
      },
    },
    {
      kind: "destination",
      id: "destination",
      tone: "cream",
      intro: {
        eyebrow: "Why patients travel",
        heading: "A Destination Practice For Awake Lipo 360.",
        body: [
          "Dr. Kalsow treats patients who come to New York from many U.S. states and from outside the United States. A large portion of the practice has grown through patient referrals and patients who specifically seek his approach to waist and back contouring.",
          "Surgeons from outside the United States have also observed his technique. His practice includes both primary cases and complex revision body contouring.",
        ],
        approach: {
          title: "What Defines The Approach",
          items: [
            "Complete circumferential planning rather than isolated-area liposuction",
            "Strong emphasis on waist narrowing and back contour",
            "Strategic fat removal based on the patient’s skeletal frame",
            "Small access points (approx. 3 mm) placed with scar visibility in mind",
            "No drains for routine Awake Lipo 360 in Dr. Kalsow’s technique",
            "Personal surgical planning and follow-up with Dr. Kalsow",
          ],
        },
      },
    },
    {
      kind: "callout",
      id: "honest-assessment",
      tone: "white",
      eyebrow: "At your consultation",
      heading: "An Honest Assessment",
      // Draft 2, word for word (its em dash as a comma).
      body: "Dr. Kalsow will tell you what is possible, what is not, and how much fat he expects he can remove or transfer, so you can decide whether surgery is right for you. If he believes the change would be too small or that you would be unhappy with the result, he will tell you, and may advise against surgery. His priority is a meaningful result for you, not putting you through surgery and recovery without a worthwhile benefit.",
    },
    UNHAPPY_BLOCK,
    REVISION_BLOCK,
    COMPLICATIONS_BLOCK,
    { kind: "consultation", id: "consultation-end", ...CONSULTATION_INTRO },
    {
      kind: "why",
      id: "why-dr-kalsow",
      // Round 3: only the patients' messages, last on the page (the reasons
      // went; their heading now sits over the hero's figures).
      // The doctor's two ChatGPT compositions of the screenshots (on his
      // Squarespace prototype page), split into one card per patient
      // (consent confirmed by Nico on 28 Sep).
      messages: [
        {
          src: "/img/lipo-v2/testimonials/t1-corvette.jpg",
          alt: "A patient's message: “I'm so happy with my results!!! My husband is so happy too, he said that its like having a new Corvette”, with a photo of her after surgery.",
          width: 970,
          height: 1365,
        },
        {
          src: "/img/lipo-v2/testimonials/t2-review.jpg",
          alt: "A patient's review with her photo: “Dr. kalsow is a great license experience Doctor. Dr Kalsow Did my 360 BBL on January 25,2020. I give Dr.Kalsow All 5 stars. He Grant me excellent results with my 360 BBL surgery. He definitely enhanced my figure and gave me a wonderful shape that I'm in love with. I'm glad I had my 360 BBL surgery with Dr.Kalsow. He's the best for 360 Bbl if you in need of a excellent Doctor Dr. is your man. I'm A K-Doll now. Thank you so much Dr. Kalsow.” The practice adds: “This patient wanted a tiny waist and to be curvy, she couldn't be happier with her results!”",
          width: 580,
          height: 950,
        },
        {
          src: "/img/lipo-v2/testimonials/t3-seven-weeks.jpg",
          alt: "Two patient messages. A mirror photo with “Thank you, I love my result”, and a direct message: “Hiii! I'm almost 7 weeks post op and I just wanted to say I LOVE my results, you're amazing, thank you so much”.",
          width: 450,
          height: 1000,
        },
        {
          src: "/img/lipo-v2/testimonials/t4-one-year.jpg",
          alt: "A patient's message: “Hello Dr K. In 4 days it'll be exactly a year since you changed my life. I'm still in stock with the changes and the motivation it's brought my life. Couldn't thank you enough!!”, with her photo. The practice adds: “The photo is distorted but the curves are visible!”",
          width: 450,
          height: 684,
        },
      ],
    },
  ],
};
