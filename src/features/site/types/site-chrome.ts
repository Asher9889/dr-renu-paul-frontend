export type NavItem = {
  index: string;
  label: string;
  href: string;
};

export type SiteHeaderContent = {
  logotype: string;
  establishedLine: string;
  navItems: NavItem[];
  cta: { label: string; href: string };
};

export type FooterColumn = {
  index: string;
  title: string;
  links: { label: string; href: string }[];
};

export type FooterContent = {
  columns: FooterColumn[];
  memberships: string;
  legal: string;
  wordmark: string;
};
