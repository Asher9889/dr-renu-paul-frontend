import { Toaster } from "@/components/ui/sonner";
import { SiteFooter, SiteHeader } from "@/features/site";
import { MotionProvider } from "@/motion";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <MotionProvider>
      <SiteHeader />
      {children}
      <SiteFooter />
      <Toaster position="top-center" />
    </MotionProvider>
  );
}
