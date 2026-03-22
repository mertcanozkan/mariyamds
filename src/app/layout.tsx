import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import ConditionalShell from "@/components/layout/ConditionalShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "MCO-DS UK — Find Your Perfect Driving Instructor",
    template: "%s | MCO-DS UK",
  },
  description:
    "Find DVSA-approved driving instructors near you. Compare ratings, prices, and availability. Book your first lesson in minutes.",
  keywords: ["driving instructor", "driving lessons", "DVSA", "ADI", "learn to drive", "UK"],
  openGraph: {
    type: "website",
    siteName: "MCO-DS UK",
    title: "MCO-DS UK — Find Your Perfect Driving Instructor",
    description:
      "Find DVSA-approved driving instructors near you. Compare ratings, prices, and availability.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-slate-100 font-[family-name:var(--font-inter)]">
        <SessionProvider>
          <ConditionalShell>{children}</ConditionalShell>
        </SessionProvider>
      </body>
    </html>
  );
}
