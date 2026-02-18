import Link from "next/link";

import CTASection from "@/components/cta-section";
import FAQPreview from "@/components/faq-preview";
import Hero from "@/components/hero";
import PricingCard from "@/components/pricing-card";
import Reveal from "@/components/reveal";
import ServiceCard from "@/components/service-card";
import TestimonialCard from "@/components/testimonial-card";
import { pricingPlans, testimonials } from "@/lib/site";

const services = [
  {
    title: "Single Driving Lessons",
    description: "Flexible one-to-one sessions for steady confidence-building and practical skill growth.",
    idealFor: "Learners who need weekly support and adaptable scheduling.",
    price: "From £43/hr"
  },
  {
    title: "Block Bookings",
    description: "Structured lesson bundles for better value and faster progress with consistent weekly slots.",
    idealFor: "Committed learners preparing for practical test success.",
    price: "Save with bundles"
  },
  {
    title: "Fast-Track Intensive",
    description: "Focused automatic training plans to help you progress quickly with expert calm guidance.",
    idealFor: "Learners on tight timelines or urgent test deadlines.",
    price: "Intensive options"
  }
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
            <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">About Mariyam DS</p>
              <h2 className="mt-3 font-heading text-3xl text-white">Premium automatic instruction from a trusted female instructor</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/80">
                Mariyam DS delivers calm, structured driving lessons for learners across Stoke Newington, Hackney, and surrounding London areas. Every lesson is designed to build skill and confidence, whether you are a complete beginner, returning after a long gap, or preparing for your practical test.
              </p>
              <div className="mt-5 flex flex-wrap gap-3 text-xs uppercase tracking-[0.13em] text-white/70">
                <span className="rounded-full border border-white/15 px-3 py-1">Female-led instruction</span>
                <span className="rounded-full border border-white/15 px-3 py-1">Automatic-only expertise</span>
                <span className="rounded-full border border-white/15 px-3 py-1">Nervous driver support</span>
              </div>
            </article>

            <aside className="force-light-text rounded-3xl border border-brand-accent/30 bg-gradient-to-br from-brand-ink/95 to-brand-deep/90 p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">Availability Update</p>
              <h3 className="mt-3 font-heading text-2xl text-white">Limited weekly slots</h3>
              <p className="mt-3 text-sm text-white/80">Due to high demand for female automatic instructors in North London, only a limited number of new learner slots are opened each week.</p>
              <Link href="/contact" className="mt-5 inline-flex rounded-full bg-brand-accent px-4 py-2 text-sm font-semibold text-brand-ink transition hover:bg-brand-coral">
                Reserve Your Slot
              </Link>
            </aside>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">Services</p>
          <h2 className="mt-2 font-heading text-3xl text-white md:text-4xl">Learning plans for every stage</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <Reveal key={service.title}>
              <ServiceCard {...service} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">Testimonials</p>
            <h2 className="mt-2 font-heading text-3xl text-white md:text-4xl">Trusted by local learners</h2>
          </div>
          <Link href="/testimonials" className="text-sm font-semibold text-brand-accent hover:underline">
            View all reviews
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Reveal key={testimonial.name}>
              <TestimonialCard {...testimonial} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">Pricing</p>
          <h2 className="mt-2 font-heading text-3xl text-white md:text-4xl">From £43 per hour</h2>
          <p className="mt-2 text-sm text-white/75">£47 per hour after 5pm weekdays and all day Saturday. Sundays are closed.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.title} {...plan} />
          ))}
        </div>
      </section>

      <CTASection
        title="Learn safely, drive confidently, pass prepared"
        body="Book automatic driving lessons in Stoke Newington with supportive female-led coaching. Start with a single lesson or choose a fast-track plan."
      />

      <FAQPreview />
    </>
  );
}
