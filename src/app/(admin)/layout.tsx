import type { Metadata } from "next";

import { AdminUiProvider } from "@/features/admin-blog/components/admin-ui-provider";

export const metadata: Metadata = {
  title: {
    default: "Journal Studio — Dr. Renu Paul",
    template: "%s — Journal Studio",
  },
  description: "Private studio for the Dr. Renu Paul journal.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminRootLayout({ children }: LayoutProps<"/">) {
  return <AdminUiProvider>{children}</AdminUiProvider>;
}
