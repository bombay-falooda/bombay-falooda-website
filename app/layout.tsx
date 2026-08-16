import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";

import { SiteShell } from "@/components/site-shell";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["italic"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Bombay Falooda - Crafting Loaded Cups Since 1985",
  description:
    "Bombay Falooda customer website for menu, outlet selection, takeaway ordering, brand story and gallery.",
  manifest: "/manifest.json",
  icons: {
    icon: "/assets/bombay-logo.png",
    shortcut: "/assets/bombay-logo.png",
    apple: "/assets/bombay-logo.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable}`}>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
