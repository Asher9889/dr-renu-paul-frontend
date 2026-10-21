import { SiteFooter as SiteFooterView } from "@/components/shared/site-footer";
import { SiteHeader as SiteHeaderView } from "@/components/shared/site-header";
import { siteFooterContent } from "@/features/site/content/site-footer-content";
import { siteHeaderContent } from "@/features/site/content/site-header-content";

export function SiteHeader() {
  return <SiteHeaderView content={siteHeaderContent} />;
}

export function SiteFooter() {
  return <SiteFooterView content={siteFooterContent} />;
}
