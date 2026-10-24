import type { Metadata } from "next";
import { Inter, Playfair_Display, Literata } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Dr. Renu Paul — Homoeopathy & Holistic Healing",
  description:
    "47+ years of gentle, constitutional homoeopathy by Dr. Renu Paul, MD (Hom.) — Lifestyle Diseases, Depression & Anxiety, Auto Immune Diseases, Genetic Disorders and more. Kanpur & Faridabad.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${literata.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

/**
 * keeping root layout.tsx to fonts + metadata + <body>
 */