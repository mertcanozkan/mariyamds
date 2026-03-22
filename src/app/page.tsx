import HeroSection from "@/components/landing/HeroSection";
import StatsBar from "@/components/landing/StatsBar";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import InstructorShowcase from "@/components/landing/InstructorShowcase";
import CoursesSection from "@/components/landing/CoursesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import PricingSection from "@/components/landing/PricingSection";
import CtaSection from "@/components/landing/CtaSection";

export default function HomePage() {
  return (
    <>
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
