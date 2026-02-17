"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="force-light-text sticky top-0 z-50 border-b border-white/10 bg-brand-ink/95 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-8" aria-label="Primary">
        <Link href="/" className="font-heading text-xl text-white">
          Mariyam <span className="text-brand-accent">DS</span>
        </Link>

        <button
          type="button"
          className="inline-flex items-center rounded-md border border-white/20 px-3 py-2 text-sm text-white md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          Menu
        </button>

        <div className="hidden items-center gap-5 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm text-white/85 transition hover:text-brand-accent",
                pathname === link.href && "text-brand-accent"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-brand-accent px-4 py-2 text-sm font-semibold text-brand-ink transition hover:bg-brand-coral"
          >
            Book Now
          </Link>
        </div>
      </nav>

      {open ? (
        <div id="mobile-nav" className="border-t border-white/10 bg-brand-ink px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-3 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm text-white/85 transition hover:bg-white/10 hover:text-brand-accent",
                  pathname === link.href && "bg-white/10 text-brand-accent"
                )}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-end pt-2">
              <Link
                href="/contact"
                className="rounded-full bg-brand-accent px-4 py-2 text-sm font-semibold text-brand-ink"
                onClick={() => setOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
