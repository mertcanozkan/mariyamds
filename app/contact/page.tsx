import type { Metadata } from "next";
import Link from "next/link";

import PageHero from "@/components/page-hero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Mariyam DS by phone, WhatsApp, or email. Automatic driving lessons in Stoke Newington and Hackney.",
  alternates: {
    canonical: "/contact"
  }
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        description="Reach Mariyam directly by phone, WhatsApp, or email — or use the map to check service coverage."
      />

      <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 pb-16 md:grid-cols-2 md:px-8">
        {/* Contact methods */}
        <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur md:p-8">
          <h2 className="font-heading text-3xl text-white">Contact Mariyam</h2>
          <p className="mt-2 text-sm text-white/70">
            For fastest response use WhatsApp. Alternatively call or email directly.
          </p>

          <div className="mt-6 flex flex-col gap-4">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20Mariyam%2C%20I%27d%20like%20to%20enquire%20about%20automatic%20driving%20lessons.`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-brand-accent/30 bg-brand-accent/10 px-5 py-4 transition hover:border-brand-accent/60 hover:bg-brand-accent/15"
            >
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-accent text-brand-ink">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-white">WhatsApp</p>
                <p className="text-xs text-white/60">Fastest way to reach Mariyam</p>
              </div>
            </a>

            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 px-5 py-4 transition hover:border-white/30 hover:bg-white/10"
            >
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 text-white/80">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-white">Phone</p>
                <p className="text-xs text-white/60">{siteConfig.phone}</p>
              </div>
            </a>

            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 px-5 py-4 transition hover:border-white/30 hover:bg-white/10"
            >
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 text-white/80">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-white">Email</p>
                <p className="text-xs text-white/60">{siteConfig.email}</p>
              </div>
            </a>
          </div>

          <div className="mt-6 rounded-2xl border border-brand-accent/20 bg-brand-accent/5 p-4 text-sm text-white/80">
            <p className="font-semibold text-white">Ready to book your first lesson?</p>
            <p className="mt-1 text-xs text-white/60">Use the dedicated booking form to select your preferred date, time, and lesson details.</p>
            <Link
              href="/book"
              className="mt-3 inline-block rounded-full bg-brand-accent px-5 py-2 text-xs font-bold text-brand-ink transition hover:bg-brand-coral"
            >
              Book a Lesson →
            </Link>
          </div>
        </article>

        {/* Map + location info */}
        <aside className="space-y-5">
          <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
            <h3 className="font-heading text-2xl text-white">Service Area</h3>
            <p className="mt-2 text-sm text-white/70">
              Primary coverage: Stoke Newington, Hackney, and surrounding North &amp; East London areas.
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-white/15">
              <iframe
                title="Stoke Newington Map"
                src="https://www.google.com/maps?q=Stoke+Newington+London&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[300px] w-full"
              />
            </div>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-white/60">Hours</h3>
            <ul className="space-y-1.5 text-sm text-white/75">
              <li className="flex justify-between">
                <span>Monday – Friday (daytime)</span>
                <span className="text-brand-accent">£43/hr</span>
              </li>
              <li className="flex justify-between">
                <span>Weekdays after 5pm</span>
                <span className="text-brand-accent">£47/hr</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday (all day)</span>
                <span className="text-brand-accent">£47/hr</span>
              </li>
              <li className="flex justify-between text-white/40">
                <span>Sunday</span>
                <span>Closed</span>
              </li>
            </ul>
          </article>
        </aside>
      </section>
    </>
  );
}
