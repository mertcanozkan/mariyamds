import type { Metadata } from "next";

import PageHero from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for booking and attending lessons with Mariyam DS.",
  alternates: {
    canonical: "/terms-conditions"
  }
};

export default function TermsConditionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        description="Booking terms for automatic driving lessons provided by Mariyam DS."
      />

      <section className="mx-auto w-full max-w-4xl space-y-6 px-4 pb-20 md:px-8">
        <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 text-sm leading-relaxed text-white/80 backdrop-blur md:p-8">
          <h2 className="font-heading text-2xl text-white">Lesson Bookings</h2>
          <p className="mt-2">Lessons are confirmed only after mutual agreement of date, time, and payment terms.</p>

          <h2 className="mt-6 font-heading text-2xl text-white">Payments</h2>
          <p className="mt-2">Single lessons and bundles must be paid according to the booking agreement. Prices are subject to periodic review.</p>

          <h2 className="mt-6 font-heading text-2xl text-white">Cancellations</h2>
          <p className="mt-2">At least 48 hours notice is required to reschedule or cancel a lesson without charge.</p>

          <h2 className="mt-6 font-heading text-2xl text-white">Learner Responsibility</h2>
          <p className="mt-2">Learners must hold a valid provisional licence and disclose any relevant medical or legal restrictions.</p>

          <h2 className="mt-6 font-heading text-2xl text-white">Conduct and Safety</h2>
          <p className="mt-2">Lessons may be terminated if behaviour compromises road safety or instructor wellbeing.</p>

          <h2 className="mt-6 font-heading text-2xl text-white">Contact</h2>
          <p className="mt-2">For terms clarification, contact hello@mariyamds.co.uk.</p>
        </article>
      </section>
    </>
  );
}
