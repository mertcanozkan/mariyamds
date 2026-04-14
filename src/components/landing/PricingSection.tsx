"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

const plans = [
  {
    name: "Student",
    price: "Free",
    description: "Everything you need to find and book your ideal instructor.",
    features: [
      "Browse all instructors nationwide",
      "Read verified reviews",
      "Instant online booking",
      "Student dashboard",
      "Progress tracking",
      "Theory test resources",
      "Lesson history & receipts",
    ],
    cta: "Get Started Free",
    href: "/register",
    highlighted: false,
  },
  {
    name: "Instructor",
    price: "10%",
    priceNote: "per lesson booked",
    description: "Grow your business with our powerful instructor tools.",
    features: [
      "Full profile listing",
      "Availability calendar",
      "Online booking system",
      "Student management",
      "Earnings dashboard",
      "Review management",
      "Marketing exposure",
      "Dedicated support",
    ],
    cta: "Join as Instructor",
    href: "/register?role=instructor",
    highlighted: true,
  },
];

export default function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-4">
            <span className="text-xs text-cyan-300 font-medium">Simple pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            No hidden fees
          </h2>
          <p className="text-lg text-slate-400">
            Students use MCO-DS completely free. Instructors pay only when they earn.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-2xl border p-6 md:p-8 ${
                plan.highlighted
                  ? "border-blue-500/40 bg-gradient-to-b from-blue-950/30 to-[#0f1117] shadow-[0_0_40px_rgba(59,130,246,0.12)]"
                  : "border-white/8 bg-[#0f1117]"
              }`}
            >
              {plan.highlighted && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 mb-4">
                  <span className="text-xs text-blue-300 font-medium">Most popular</span>
                </div>
              )}

              <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-sm text-slate-500 mb-4">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                {plan.priceNote && (
                  <span className="text-sm text-slate-500 ml-2">{plan.priceNote}</span>
                )}
              </div>

              <ul className="space-y-2.5 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <Check size={14} className="text-emerald-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link href={plan.href} className="block">
                <Button
                  variant={plan.highlighted ? "primary" : "outline"}
                  className="w-full"
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
