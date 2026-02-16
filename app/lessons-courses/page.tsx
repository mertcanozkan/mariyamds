import type { Metadata } from "next";
import Link from "next/link";

import CTASection from "@/components/cta-section";
import PageHero from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Lessons & Courses",
  description:
    "Explore single lessons, block bookings, intensive automatic courses, and refresher sessions in Stoke Newington and Hackney.",
  alternates: {
    canonical: "/lessons-courses"
  }
};

const offerings = [
  {
    title: "Single Lessons",
    price: "From £45 per hour",
    benefits: [
      "Flexible one-to-one scheduling",
      "Progress check every lesson",
      "Great for new starters and ongoing practice"
    ],
    idealFor: "Learners who want adaptable weekly support"
  },
  {
    title: "Block Booking Discounts",
    price: "5 lessons from £215 | 10 lessons from £420",
    benefits: [
      "Lower hourly cost",
      "Consistent weekly momentum",
      "Priority booking windows"
    ],
    idealFor: "Learners preparing for practical test with structured pace"
  },
  {
    title: "Fast-Track Intensive Courses",
    price: "Packages from £899",
    benefits: [
      "Concentrated learning over 1-2 weeks",
      "Focused route and manoeuvre training",
      "Ideal for urgent timelines"
    ],
    idealFor: "Learners who need quicker progression"
  },
  {
    title: "Refresher Lessons",
    price: "From £45 per hour",
    benefits: [
      "Rebuild confidence after a break",
      "Urban driving and parking confidence",
      "Road safety and modern driving refresh"
    ],
    idealFor: "Drivers returning to the road after time away"
  }
];

export default function LessonsCoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="Lessons & Courses"
        title="Automatic training options from beginner to advanced"
        description="Choose a lesson structure that matches your pace, confidence level, and timeline. All courses are taught one-to-one by a professional female instructor."
      />

      <section className="mx-auto grid w-full max-w-6xl gap-5 px-4 pb-16 md:grid-cols-2 md:px-8">
        {offerings.map((offering) => (
          <article key={offering.title} className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent">{offering.price}</p>
            <h2 className="mt-2 font-heading text-3xl text-white">{offering.title}</h2>

            <h3 className="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-white/70">Benefits</h3>
            <ul className="mt-2 space-y-2 text-sm text-white/82">
              {offering.benefits.map((benefit) => (
                <li key={benefit}>- {benefit}</li>
              ))}
            </ul>

            <p className="mt-4 text-sm text-white/82">
              <span className="font-semibold text-white">Ideal for:</span> {offering.idealFor}
            </p>

            <Link href="/contact" className="mt-6 inline-flex rounded-full bg-brand-accent px-4 py-2 text-sm font-semibold text-brand-ink transition hover:bg-brand-coral">
              Book this option
            </Link>
          </article>
        ))}
      </section>

      <CTASection
        title="Need help picking the right course?"
        body="Share your goals and availability, and receive a recommended plan tailored to your confidence level and timeline."
      />
    </>
  );
}
