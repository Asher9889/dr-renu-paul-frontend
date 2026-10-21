import { Toaster } from "@/components/ui/sonner";
import { SiteFooter, SiteHeader } from "@/features/site";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
      <Toaster position="top-center" />
    </>
  );
}
