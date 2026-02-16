import type { Metadata } from "next";

import CookieBanner from "@/components/cookie-banner";
import FloatingBookNow from "@/components/floating-book-now";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ThemeToggle from "@/components/theme-toggle";
import { siteConfig } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Mariyam DS | Automatic Driving Lessons Stoke Newington",
    template: "%s | Mariyam DS"
  },
  description: siteConfig.description,
  keywords: [
    "Automatic driving lessons Stoke Newington",
    "Female driving instructor London",
    "Driving lessons Hackney",
    "Intensive driving course London",
    "Automatic driving instructor near me"
  ],
  openGraph: {
    title: "Mariyam DS | Premium Automatic Driving Lessons",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_GB",
    type: "website"
  },
  alternates: {
    canonical: "/"
  }
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "DrivingSchool",
  name: siteConfig.name,
  description: siteConfig.description,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  areaServed: ["Stoke Newington", "Hackney", "London"],
  image: "https://images.unsplash.com/photo-1613145993488-38fa511b4b65?auto=format&fit=crop&w=1200&q=80",
  priceRange: "£45-£899",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Stoke Newington",
    addressRegion: "London",
    addressCountry: "UK"
  },
  url: siteConfig.url,
  sameAs: [
    `https://wa.me/${siteConfig.whatsapp}`
  ]
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&d)){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body className="font-sans">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ThemeToggle />
        <FloatingBookNow />
        <CookieBanner />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      </body>
    </html>
  );
}
