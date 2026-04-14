import type { Metadata } from "next";
import Link from "next/link";

import BookingForm from "@/components/booking-form";
import PageHero from "@/components/page-hero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Lesson",
  description:
    "Book your automatic driving lesson with Mariyam DS in Stoke Newington. Select your preferred date, time, and duration.",
  alternates: {
    canonical: "/book"
  }
};

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a Lesson"
        title="Reserve your driving lesson"
        description="Fill in the form below and Mariyam will confirm your slot. For faster replies, use WhatsApp."
      />

      <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 pb-20 md:grid-cols-[1.4fr_1fr] md:px-8">
        {/* Booking form */}
        <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur md:p-8">
          <h2 className="font-heading text-3xl text-white">Booking Details</h2>
          <p className="mt-2 text-sm text-white/70">
            Complete all fields below. You&apos;ll receive a confirmation once Mariyam has reviewed availability.
          </p>
          <div className="mt-6">
            <BookingForm />
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-5">
          {/* Quick contact */}
          <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
            <h3 className="font-heading text-2xl text-white">Prefer to chat first?</h3>
            <p className="mt-2 text-sm text-white/70">Reach Mariyam directly for availability or any questions.</p>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20Mariyam%2C%20I%27d%20like%20to%20book%20an%20automatic%20driving%20lesson.`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-brand-accent px-4 py-2.5 text-center font-semibold text-brand-ink transition hover:bg-brand-coral"
              >
                WhatsApp Mariyam
              </a>
              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                className="rounded-full border border-white/20 px-4 py-2.5 text-center text-white/80 transition hover:border-brand-accent hover:text-brand-accent"
              >
                Call {siteConfig.phone}
              </a>
            </div>
          </article>

          {/* Pricing reminder */}
          <article className="rounded-3xl border border-brand-accent/25 bg-brand-accent/5 p-6">
            <h3 className="font-heading text-xl text-white">Rate Guide</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/75">
              <li className="flex justify-between">
                <span>Standard (weekday daytime)</span>
                <span className="font-semibold text-brand-accent">£43/hr</span>
              </li>
              <li className="flex justify-between">
                <span>After 5pm weekdays &amp; Saturday</span>
                <span className="font-semibold text-brand-accent">£47/hr</span>
              </li>
              <li className="flex justify-between">
                <span>5-lesson bundle</span>
                <span className="font-semibold text-brand-accent">£205</span>
              </li>
              <li className="flex justify-between">
                <span>10-lesson bundle</span>
                <span className="font-semibold text-brand-accent">£400</span>
              </li>
              <li className="pt-1 text-xs text-white/50">Sundays closed. Prices confirmed on booking.</li>
            </ul>
            <Link
              href="/pricing"
              className="mt-4 inline-block text-xs text-brand-accent underline underline-offset-2 hover:text-brand-coral"
            >
              View full pricing →
            </Link>
          </article>

          {/* What to expect */}
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="font-heading text-xl text-white">What happens next?</h3>
            <ol className="mt-3 space-y-2 text-sm text-white/70">
              <li className="flex gap-2">
                <span className="font-semibold text-brand-accent">1.</span>
                You submit your details above.
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-brand-accent">2.</span>
                Mariyam reviews availability and contacts you.
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-brand-accent">3.</span>
                Your lesson is confirmed and the address agreed.
              </li>
            </ol>
          </article>
        </aside>
      </section>
    </>
  );
}
