import Link from "next/link";

import { navLinks, siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="force-light-text border-t border-white/10 bg-brand-ink text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 md:grid-cols-3 md:px-8">
        <div>
          <h2 className="font-heading text-2xl">
            Mariyam <span className="text-brand-accent">DS</span>
          </h2>
          <p className="mt-3 text-sm text-white/70">Automatic driving lessons with calm, professional female instruction in Stoke Newington and nearby Hackney areas.</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">Site Links</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-brand-accent">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy-policy" className="transition hover:text-brand-accent">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-conditions" className="transition hover:text-brand-accent">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>{siteConfig.location}</li>
            <li>
              <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`} className="transition hover:text-brand-accent">
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="transition hover:text-brand-accent">
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-brand-accent/40 px-3 py-1 text-xs text-brand-accent transition hover:bg-brand-accent hover:text-brand-ink"
              >
                WhatsApp Quick Chat
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/50 md:px-8">
        (c) {new Date().getFullYear()} Mariyam DS. All rights reserved.
      </div>
    </footer>
  );
}
