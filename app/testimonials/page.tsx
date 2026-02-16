import type { Metadata } from "next";

import CTASection from "@/components/cta-section";
import PageHero from "@/components/page-hero";
import TestimonialCard from "@/components/testimonial-card";
import { testimonials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read learner testimonials for Mariyam DS, a female automatic driving instructor in Stoke Newington and Hackney.",
  alternates: {
    canonical: "/testimonials"
  }
};

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: testimonials.map((testimonial, index) => ({
    "@type": "Review",
    position: index + 1,
    author: {
      "@type": "Person",
      name: testimonial.name
    },
    reviewBody: testimonial.content,
    reviewRating: {
      "@type": "Rating",
      ratingValue: testimonial.rating,
      bestRating: "5"
    },
    itemReviewed: {
      "@type": "DrivingSchool",
      name: "Mariyam DS"
    }
  }))
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Results built on trust, patience, and clear progress"
        description="Learners choose Mariyam DS for calm communication, structured automatic lessons, and confidence-focused coaching from a trusted female instructor."
      />

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 md:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </section>

      <CTASection
        title="Join learners who now drive with confidence"
        body="Book your first lesson and experience calm, premium instruction designed around your pace and goals."
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
    </>
  );
}
