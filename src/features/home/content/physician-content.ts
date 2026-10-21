import type { PhysicianContent } from "@/features/home/types/home-content";

export const physicianContent: PhysicianContent = {
  eyebrow: "02 — The Physician",
  heading:
    "A woman of immense knowledge, quiet confidence and graceful practice.",
  paragraphs: [
    "Dr. Renu Paul has practised classical homoeopathy for forty-five years — first through her own clinic, and today as Senior Consultant of the Homoeopathic Department at Accord Super Speciality Hospital, Sector 86, Faridabad. Her work rests on one conviction: treat the person, not merely the disease.",
    "A certified counsellor since 2008, she integrates NBI (Neethling Brain Instrument) Brain Profiles with constitutional homoeopathic treatment — mapping thinking preferences and emotional patterns alongside remedy selection. Her case-taking is unhurried and exact, and her prescriptions are built to hold.",
  ],
  education: [
    { credential: "MD Homoeopathy", institution: "Agra University" },
    { credential: "BMS Homoeopathy", institution: "Kanpur University" },
    { credential: "PGCR Rehabilitation", institution: "AIIPMR, Bombay" },
    {
      credential: "PGNAH",
      institution: "National Academy of Homoeopathy",
    },
    {
      credential: "MTEC Emergency Care",
      institution: "KGMC Lucknow / Allegheny University, USA",
    },
  ],
  portrait: {
    src: "/dr-renu/dr-renu-paul.jpg",
    alt: "Dr. Renu Paul at her clinic in Kanpur",
    // caption: "Fig. 02 — At her clinic, Kanpur.",
    caption: "",
  },
  link: { label: "Read the full story", href: "#physician" },
};
