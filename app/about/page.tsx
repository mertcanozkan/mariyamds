import type { Metadata } from "next";

import CTASection from "@/components/cta-section";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Mariyam, a professional female automatic driving instructor in Stoke Newington focused on calm, confidence-building lessons.",
  alternates: {
    canonical: "/about"
  }
};

const qualifications = [
  "DVSA-approved driving instructor",
  "Automatic-only specialist teaching approach",
  "Experience coaching beginners, nervous drivers, and test candidates",
  "Structured progress tracking with milestone-based plans"
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Professional, patient instruction that builds real confidence"
        description="Mariyam DS was created to deliver a safer, calmer learning experience for modern London learners, with specialist support from a female automatic instructor."
      />

      <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 pb-16 md:grid-cols-2 md:px-8">
        <Reveal>
          <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur">
            <h2 className="font-heading text-3xl text-white">Professional Biography</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              Mariyam is a dedicated female driving instructor based in Stoke Newington, helping learners across Hackney and North London develop safe, independent driving habits. Her sessions blend technical precision with emotional reassurance, so learners feel both challenged and supported.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              She has built a reputation for helping first-time learners and anxious drivers transform uncertainty into confident, test-ready driving through clear explanations, practical repetition, and calm communication.
            </p>
          </article>
        </Reveal>

        <Reveal>
          <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur">
            <h2 className="font-heading text-3xl text-white">Qualifications</h2>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              {qualifications.map((qualification) => (
                <li key={qualification}>- {qualification}</li>
              ))}
            </ul>
          </article>
        </Reveal>

        <Reveal>
          <article className="force-light-text rounded-3xl border border-brand-accent/35 bg-gradient-to-br from-brand-ink/95 to-brand-deep/88 p-7">
            <h2 className="font-heading text-3xl text-white">Teaching Philosophy</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/85">
              Every learner progresses differently. Lessons are adapted to your pace while maintaining clear standards for control, awareness, and safe decision-making.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/85">
              The focus is practical confidence: understanding why you do each action, not just memorising routines. This creates safer drivers beyond the test.
            </p>
          </article>
        </Reveal>

        <Reveal>
          <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 backdrop-blur">
            <h2 className="font-heading text-3xl text-white">Support for Nervous Drivers</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              If driving feels overwhelming, lessons start with low-pressure routes, confidence anchors, and progressive exposure techniques. You are never rushed.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              The aim is to reduce fear, increase clarity, and help you stay calm under real road conditions.
            </p>
          </article>
        </Reveal>
      </section>

      <CTASection
        title="Start your driving journey with calm expert guidance"
        body="Book a first lesson and build confidence with a female automatic instructor who teaches at your pace."
      />
    </>
  );
}
