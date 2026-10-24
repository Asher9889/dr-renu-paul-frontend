import type { Metadata } from "next";

import { AdminQueryProvider } from "@/features/admin-blog/components/admin-query-provider";

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
  return <AdminQueryProvider>{children}</AdminQueryProvider>;
}
