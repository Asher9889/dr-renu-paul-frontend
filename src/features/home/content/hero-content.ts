import type { HeroContent } from "@/features/home/types/home-content";

export const heroContent: HeroContent = {
  eyebrow: "01 — Homoeopathy & Holistic Healing",
  headlineLead: "Healing with",
  headlineItalic: "Homoeopathy",
  headlineTrail: "& Expertise.",
  paragraph:
    "Forty-five years of gentle practice — Lifestyle Diseases, Depression & Anxiety, Auto Immune Diseases, Genetic Disorders and more. Restoring constitutional vitality by treating the person, not just the disease.",
  primaryAction: { label: "Make an Appointment", href: "#contact" },
  secondaryAction: { label: "Explore Expertise", href: "#expertise" },
  footnote: "* Over 45 years of clinical experience — Kanpur & Faridabad.",
  portrait: {
    src: "/dr-renu/renu-full.png",
    alt: "Dr. Renu Paul speaking at a homoeopathy event",
    caption: "— Dr. Renu Paul, MD (Hom.)",
  },
  consultantNote: {
    label: "Former Senior Consultant",
    body: "Homeopathic Department, Accord Super Speciality Hospital, Sector 86, Faridabad",
  },
};
