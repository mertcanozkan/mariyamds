import Link from "next/link";
import Image from "next/image";

import Counters from "./counters";
import TrustBadges from "./trust-badges";

export default function Hero() {
  return (
    <section className="force-light-text relative overflow-hidden px-4 pb-16 pt-14 md:px-8 md:pt-20">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_right,#d7a15f33,transparent_45%),radial-gradient(circle_at_bottom_left,#f07e6e1a,transparent_40%),linear-gradient(120deg,#121a2f,#192646,#121a2f)] bg-[length:180%_180%] animate-gradient-shift" />
      <div className="absolute inset-0 -z-10 opacity-30" style={{ backgroundImage: "url('/images/noise.svg')" }} />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">Stoke Newington, London</p>
          <h1 className="mt-4 font-heading text-4xl leading-tight text-white md:text-6xl">
            Automatic Driving Lessons in Stoke Newington
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/80 md:text-lg">
            Empowered learning with a professional female instructor. Calm, structured automatic lessons from beginner confidence to test-day readiness.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-full bg-brand-accent px-6 py-3 text-sm font-semibold text-brand-ink transition hover:bg-brand-coral">
              Book a Lesson
            </Link>
            <Link href="/pricing" className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-brand-accent hover:text-brand-accent">
              View Prices
            </Link>
          </div>

          <p className="mt-5 text-sm font-medium text-brand-accent">Limited weekly slots available for new learners.</p>
          <TrustBadges />
          <Counters />
        </div>

        <div className="relative">
          <div className="absolute -left-6 top-8 h-16 w-16 rounded-full bg-brand-accent/30 blur-xl" />
          <div className="absolute -right-10 bottom-8 h-24 w-24 rounded-full bg-brand-coral/40 blur-2xl" />
          <figure className="group relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-2 shadow-glow backdrop-blur">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
              <Image
                src="https://images.unsplash.com/photo-1717251219562-5c2604fa1331?auto=format&fit=crop&w=1200&q=80"
                alt="Female driving instructor coaching learner in automatic car"
                fill
                priority
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
