import type { Metadata } from "next";
import { Inter, Noto_Sans_Bengali } from "next/font/google";

import { LanguageProvider } from "@/lib/i18n/LanguageProvider";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-noto-bengali",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mimpex Agrochemicals Ltd.",
    template: "%s | Mimpex Agrochemicals",
  },
  description:
    "Mimpex Agrochemicals Ltd. — crop protection, PGR, ImageBot AI diagnostics, and 24/7 virtual sales assistant.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className={`${inter.variable} ${notoBengali.variable} ${inter.className}`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
