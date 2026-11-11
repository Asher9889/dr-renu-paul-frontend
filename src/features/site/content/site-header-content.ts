import type { SiteHeaderContent } from "@/features/site/types/site-chrome";

export const siteHeaderContent: SiteHeaderContent = {
  logotype: "Dr. Renu Paul",
  establishedLine: "Est. 1980 · Kanpur & Faridabad",
  navItems: [
    { index: "01", label: "About", href: "/#physician" },
    { index: "02", label: "Expertise", href: "/#expertise" },
    { index: "03", label: "Achievements", href: "/#achievements" },
    { index: "04", label: "Blogs", href: "/blog" },
    { index: "05", label: "Books", href: "/books" },
  ],
  cta: { label: "Book Appointment", href: "/#contact" },
};
