/** Anchor-based navigation. `id` must match the id of the corresponding <section>. */
export const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "achievements", label: "Highlights" },
  { id: "contact", label: "Contact" },
] as const;

export const SECTION_IDS = ["home", ...NAV_ITEMS.map((n) => n.id)] as const;
