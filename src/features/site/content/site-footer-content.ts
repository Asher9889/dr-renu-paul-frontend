import type { FooterContent } from "@/features/site/types/site-chrome";

export const siteFooterContent: FooterContent = {
  columns: [
    {
      index: "01",
      title: "Explore",
      links: [
        { label: "About", href: "/#physician" },
        { label: "Expertise", href: "/#expertise" },
        { label: "Achievements", href: "/#achievements" },
        { label: "Journal", href: "/blog" },
      ],
    },
    {
      index: "02",
      title: "Practice",
      links: [
        { label: "Consultations", href: "/#contact" },
        { label: "Clinic Hours", href: "/#contact" },
        { label: "Kanpur, Uttar Pradesh", href: "/#contact" },
        { label: "Faridabad, Haryana", href: "/#contact" },
      ],
    },
    {
      index: "03",
      title: "Memberships",
      links: [
        {
          label: "Women's Homoeopathic Organization",
          href: "/#achievements",
        },
        {
          label: "National Academy of Homoeopathy",
          href: "/#achievements",
        },
        {
          label: "Asian Homoeopathic Medical League",
          href: "/#achievements",
        },
        {
          label: "Homoeopathic Medical Association of India",
          href: "/#achievements",
        },
      ],
    },
  ],
  memberships:
    "Life Member — HMAI · National Academy of Homoeopathy · Asian Homoeopathic Medical League · Indian Red Cross Society",
  legal: "© 2026 Dr. Renu Paul · Kanpur & Faridabad · Designed with care",
  wordmark: "Renu Paul",
};
