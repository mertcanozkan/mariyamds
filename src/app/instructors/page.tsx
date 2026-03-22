import type { Metadata } from "next";
import InstructorsPageClient from "./InstructorsPageClient";

export const metadata: Metadata = {
  title: "Find a Driving Instructor",
  description:
    "Search DVSA-approved driving instructors near you. Filter by location, price, transmission type, and rating. Book your first lesson online in minutes.",
  alternates: { canonical: "https://mcodev.co.uk/instructors" },
  openGraph: {
    title: "Find a Driving Instructor | MCO-DS UK",
    description:
      "Search DVSA-approved driving instructors near you. Filter by location, price, and rating.",
    url: "https://mcodev.co.uk/instructors",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find a Driving Instructor | MCO-DS UK",
    description: "Search DVSA-approved driving instructors near you.",
  },
};

export default function InstructorsPage() {
  return <InstructorsPageClient />;
}