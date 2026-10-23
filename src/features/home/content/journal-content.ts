import type { JournalContent } from "@/features/home/types/home-content";

export const journalContent: JournalContent = {
  eyebrow: "06 — Recent Writing",
  heading: "Notes on healing.",
  posts: [
    {
      category: "Women's Health",
      title: "Holistic Management of PCOD Through Homoeopathy",
      excerpt:
        "A constitutional approach to polycystic ovarian disease — beyond symptom suppression.",
      image: {
        src: "/images/home/journal-1.svg",
        alt: "Botanical line illustration for the women's health essay",
      },
      href: "/blog/holistic-management-of-pcod",
    },
    {
      category: "Mind & Mood",
      title: "Constitutional Treatment for Autoimmune & Stress Health",
      excerpt:
        "How chronic stress feeds autoimmune patterns, and why the remedy must match the person.",
      image: {
        src: "/images/home/journal-2.svg",
        alt: "Botanical line illustration for the mind and mood essay",
      },
      href: "/blog/constitutional-treatment-for-autoimmune-stress",
    },
    {
      category: "Child Care",
      title: "Gentle Paediatric Remedies for Chronic Ailments",
      excerpt:
        "Ear, throat and tonsil concerns in children, treated gently and constitutionally.",
      image: {
        src: "/images/home/journal-3.svg",
        alt: "Botanical line illustration for the child care essay",
      },
      href: "/blog/gentle-paediatric-remedies",
    },
  ],
};
