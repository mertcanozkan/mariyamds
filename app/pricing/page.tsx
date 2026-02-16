import type { Metadata } from "next";

import CTASection from "@/components/cta-section";
import PageHero from "@/components/page-hero";
import PricingCard from "@/components/pricing-card";
import { pricingPlans } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for automatic driving lessons in Stoke Newington. Single sessions, discounted bundles, and intensive examples.",
  alternates: {
    canonical: "/pricing"
  }
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Clear pricing with premium lesson quality"
        description="All plans are designed for personalised one-to-one instruction. Most learners choose bundles for stronger continuity and better value."
      />

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 md:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.title} {...plan} />
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-white/75">Pricing shown as example packages. Final intensive plans may vary by learner starting level and availability.</p>
      </section>

      <CTASection
        title="Secure your preferred lesson slot"
        body="Demand is high for female automatic driving instructors in Stoke Newington. Book early to lock in your schedule."
      />
    </>
  );
}
