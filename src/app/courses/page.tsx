import type { Metadata } from "next";
import CoursesPageClient from "./CoursesPageClient";

export const metadata: Metadata = {
  title: "Driving Courses & Pricing",
  description:
    "Browse UK driving courses for every learner — beginner lessons, intensive courses, Pass Plus, and more. Transparent 2025 pricing based on London market rates.",
  alternates: { canonical: "https://mcodev.co.uk/courses" },
  openGraph: {
    title: "Driving Courses & Pricing | MCO-DS UK",
    description:
      "Beginner, intensive, and advanced driving courses with transparent UK pricing. Book online today.",
    url: "https://mcodev.co.uk/courses",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Driving Courses & Pricing | MCO-DS UK",
    description: "Beginner to advanced UK driving courses with transparent pricing.",
  },
};

export default function CoursesPage() {
  return <CoursesPageClient />;
}
