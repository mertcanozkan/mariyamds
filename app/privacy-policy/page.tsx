import type { Metadata } from "next";

import PageHero from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Mariyam DS in line with UK GDPR standards.",
  alternates: {
    canonical: "/privacy-policy"
  }
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How Mariyam DS collects, stores, and processes personal information in accordance with UK GDPR."
      />

      <section className="mx-auto w-full max-w-4xl space-y-6 px-4 pb-20 md:px-8">
        <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 text-sm leading-relaxed text-white/80 backdrop-blur md:p-8">
          <h2 className="font-heading text-2xl text-white">Data Controller</h2>
          <p className="mt-2">Mariyam DS is the data controller for personal information collected via this website.</p>

          <h2 className="mt-6 font-heading text-2xl text-white">Data We Collect</h2>
          <p className="mt-2">Name, email, phone number, driving experience details, and any message submitted through the booking form.</p>

          <h2 className="mt-6 font-heading text-2xl text-white">Lawful Basis</h2>
          <p className="mt-2">We process your data based on consent and legitimate interest for responding to enquiries and arranging lessons.</p>

          <h2 className="mt-6 font-heading text-2xl text-white">Data Retention</h2>
          <p className="mt-2">Enquiry records are retained only as long as necessary for client communication, service delivery, and legal obligations.</p>

          <h2 className="mt-6 font-heading text-2xl text-white">Your Rights</h2>
          <p className="mt-2">You may request access, correction, deletion, or restriction of your personal data at any time.</p>

          <h2 className="mt-6 font-heading text-2xl text-white">Contact</h2>
          <p className="mt-2">For data requests, email: hello@mariyamds.co.uk</p>
        </article>
      </section>
    </>
  );
}
