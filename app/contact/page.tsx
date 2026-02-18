import type { Metadata } from "next";
import Link from "next/link";

import BookingForm from "@/components/booking-form";
import CalendarWidget from "@/components/calendar-widget";
import PageHero from "@/components/page-hero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Booking",
  description:
    "Book automatic driving lessons in Stoke Newington. Contact Mariyam DS by form, WhatsApp, or phone.",
  alternates: {
    canonical: "/contact"
  }
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Book your automatic driving lessons"
        description="Send your booking request, contact by WhatsApp, or check location details for Stoke Newington coverage."
      />

      <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 pb-16 md:grid-cols-[1.2fr_1fr] md:px-8">
        <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur md:p-8">
          <h2 className="font-heading text-3xl text-white">Booking Form</h2>
          <p className="mt-2 text-sm text-white/75">Complete the form below and receive a response with available lesson slots.</p>
          <div className="mt-6">
            <BookingForm />
          </div>
        </article>

        <aside className="space-y-5">
          <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
            <h3 className="font-heading text-2xl text-white">Quick Contact</h3>
            <p className="mt-2 text-sm text-white/75">For faster replies, use WhatsApp or call directly.</p>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`} className="rounded-full border border-white/20 px-4 py-2 text-white transition hover:border-brand-accent hover:text-brand-accent">
                Call {siteConfig.phone}
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20Mariyam%2C%20I%20want%20to%20book%20automatic%20driving%20lessons.`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-brand-accent px-4 py-2 text-center font-semibold text-brand-ink transition hover:bg-brand-coral"
              >
                WhatsApp Quick Contact
              </a>
            </div>
          </article>

          <article className="force-light-text rounded-3xl border border-brand-accent/35 bg-gradient-to-br from-brand-ink/95 to-brand-deep/88 p-6">
            <h3 className="font-heading text-2xl text-white">Lesson Calendar</h3>
            <p className="mt-2 text-sm text-white/80">Select your preferred lesson date and time, then confirm instantly via WhatsApp.</p>
            <p className="mt-2 text-xs text-white/70">Rate guide: £43/hr standard, £47/hr after 5pm weekdays and all day Saturday. Sundays closed.</p>
            <CalendarWidget whatsappNumber={siteConfig.whatsapp} />
          </article>
        </aside>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-20 md:px-8">
        <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur md:p-6">
          <h2 className="font-heading text-2xl text-white">Service Area Map</h2>
          <p className="mt-2 text-sm text-white/75">Primary coverage: Stoke Newington and surrounding Hackney areas.</p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/15">
            <iframe
              title="Stoke Newington Map"
              src="https://www.google.com/maps?q=Stoke+Newington+London&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[320px] w-full"
            />
          </div>
          <p className="mt-3 text-xs text-white/60">
            By submitting a booking form, you agree to data processing described in our <Link href="/privacy-policy" className="text-brand-accent underline">Privacy Policy</Link>.
          </p>
        </article>
      </section>
    </>
  );
}
