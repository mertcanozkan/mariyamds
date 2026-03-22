import HeroSection from "@/components/landing/HeroSection";
import StatsBar from "@/components/landing/StatsBar";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import InstructorShowcase from "@/components/landing/InstructorShowcase";
import CoursesSection from "@/components/landing/CoursesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import PricingSection from "@/components/landing/PricingSection";
import CtaSection from "@/components/landing/CtaSection";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MCO-DS UK",
  url: "https://mcodev.co.uk",
  logo: "https://mcodev.co.uk/images/logo.png",
  description:
    "UK driving instructor marketplace connecting learners with DVSA-approved instructors nationwide.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "GB",
  },
  sameAs: [],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MCO-DS UK",
  url: "https://mcodev.co.uk",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://mcodev.co.uk/instructors?location={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <HowItWorksSection />
      <InstructorShowcase />
      <CoursesSection />
      <TestimonialsSection />
      <PricingSection />
      <CtaSection />
    </>
  );
}