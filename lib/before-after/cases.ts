export interface BeforeAfterCase {
  src: string;
  alt: string;
}

export interface BeforeAfterProcedure {
  id: string;
  label: string;
  category: "Face" | "Breast" | "Body" | "Hair";
  path: string;
  introduction: string;
  cases: readonly BeforeAfterCase[];
}

function buildCases(id: string, label: string): readonly BeforeAfterCase[] {
  return [1, 2, 3, 4].map((caseNumber) => ({
    src: `/img/before-after/${id}/case-${String(caseNumber).padStart(2, "0")}.jpg`,
    alt: `${label} before-and-after result, patient case ${String(caseNumber).padStart(2, "0")}`,
  }));
}

/**
 * Curated from the practice's live gallery on September 7, 2026.
 * Four distinct patient cases per procedure keep this page useful without
 * reproducing the full legacy gallery.
 */
export const BEFORE_AFTER_PROCEDURES: readonly BeforeAfterProcedure[] = [
  {
    id: "facelift",
    label: "Facelift",
    category: "Face",
    path: "/facelift",
    introduction:
      "Compare frontal and profile changes across patients with different facial structures and rejuvenation goals.",
    cases: buildCases("facelift", "Facelift"),
  },
  {
    id: "rhinoplasty",
    label: "Rhinoplasty",
    category: "Face",
    path: "/rhinoplasty",
    introduction:
      "Review changes in nasal profile, tip shape, and overall facial balance across a range of starting anatomies.",
    cases: buildCases("rhinoplasty", "Rhinoplasty"),
  },
  {
    id: "blepharoplasty",
    label: "Blepharoplasty",
    category: "Face",
    path: "/blepharoplasty",
    introduction:
      "See how individualized eyelid surgery can change the appearance of the upper and lower eye area.",
    cases: buildCases("blepharoplasty", "Blepharoplasty"),
  },
  {
    id: "chin-lipo",
    label: "Chin Lipo",
    category: "Face",
    path: "/chin-lipo",
    introduction:
      "Observe changes in the contour beneath the chin and in the transition between the jawline and neck.",
    cases: buildCases("chin-lipo", "Chin Lipo"),
  },
  {
    id: "lip-augmentation",
    label: "Lip Augmentation",
    category: "Face",
    path: "/lip-augmentation",
    introduction:
      "Compare changes in lip volume, shape, and balance across patients with different starting anatomy and treatment goals.",
    cases: buildCases("lip-augmentation", "Lip Augmentation"),
  },
  {
    id: "breast-augmentation",
    label: "Breast Augmentation",
    category: "Breast",
    path: "/breast-augmentation",
    introduction:
      "Compare changes in breast volume, proportion, and profile across patients with different starting points.",
    cases: buildCases("breast-augmentation", "Breast Augmentation"),
  },
  {
    id: "breast-lift-and-reduction",
    label: "Breast Lift & Reduction",
    category: "Breast",
    path: "/breast-lift-and-reduction-1",
    introduction:
      "Explore patient outcomes focused on breast position, proportion, and the removal of excess tissue.",
    cases: buildCases("breast-lift-and-reduction", "Breast Lift and Reduction"),
  },
  {
    id: "awake-fat-transfer-to-breast",
    label: "Awake Fat Transfer to Breast",
    category: "Breast",
    path: "/awake-fat-transfer-to-breast",
    introduction:
      "View changes in breast volume and contour following fat transfer planned around each patient's anatomy.",
    cases: buildCases("awake-fat-transfer-to-breast", "Awake Fat Transfer to Breast"),
  },
  {
    id: "lipo-360-bbl",
    label: "Lipo 360 + BBL",
    category: "Body",
    path: "/lipo-360-bbl",
    introduction:
      "See body contouring results across patients with different proportions, tissue distribution, and goals.",
    cases: buildCases("lipo-360-bbl", "Lipo 360 and BBL"),
  },
  {
    id: "skinny-bbl",
    label: "Skinny BBL",
    category: "Body",
    path: "/skinny-bbl",
    introduction:
      "Explore proportion changes in patients whose treatment plans began with a lower available fat volume.",
    cases: buildCases("skinny-bbl", "Skinny BBL"),
  },
  {
    id: "arm-lipo",
    label: "Arm Lipo",
    category: "Body",
    path: "/arm-lipo-1",
    introduction:
      "Review contour changes through the upper arms across different angles and starting tissue distributions.",
    cases: buildCases("arm-lipo", "Arm Lipo"),
  },
  {
    id: "hair-transplant",
    label: "Hair Transplant",
    category: "Hair",
    path: "/hair-transplant",
    introduction:
      "See hairline and density changes across patients with individualized restoration plans and different patterns of hair loss.",
    cases: buildCases("hair-transplant", "Hair Transplant"),
  },
] as const;

export const BEFORE_AFTER_FAQ = [
  {
    q: "What should I look for in before-and-after photos?",
    a: "Look across several patients rather than relying on a single result. Compare cases with a similar starting anatomy, review multiple views when available, and use the gallery as a starting point for a consultation.",
  },
  {
    q: "Will my result look the same as a patient shown here?",
    a: "No two patients begin with the same anatomy or follow the same healing process. These photographs show individual outcomes and do not guarantee a specific result.",
  },
  {
    q: "When are the after photographs taken?",
    a: "Photography timing varies by procedure and patient. Healing continues over time, so the care team can provide context about a relevant case during your consultation.",
  },
  {
    q: "Can I see additional cases during a consultation?",
    a: "Yes. Ask the care team whether additional examples related to your anatomy, goals, and procedure of interest are available to review privately.",
  },
  {
    q: "How can I learn more about a procedure shown here?",
    a: "Each gallery section links to its procedure page, where you can review candidacy, Dr. Kalsow's approach, recovery guidance, and common questions.",
  },
  {
    q: "Are the outcomes shown in this gallery guaranteed?",
    a: "No. Before-and-after photographs are educational examples of individual patient outcomes. Results vary, and only a personal consultation can establish an appropriate treatment plan.",
  },
];
