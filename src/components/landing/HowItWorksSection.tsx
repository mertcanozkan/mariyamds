"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Calendar, Car, Award } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Find your instructor",
    description:
      "Search by postcode, filter by price, transmission type, and language. Read verified reviews from real students.",
  },
  {
    number: "02",
    icon: Calendar,
    title: "Book in minutes",
    description:
      "Select your lesson type, pick a date and time that suits you, and confirm your booking instantly online.",
  },
  {
    number: "03",
    icon: Car,
    title: "Start learning",
    description:
      "Meet your instructor, start building your skills, and track your progress through your student dashboard.",
  },
  {
    number: "04",
    icon: Award,
    title: "Pass your test",
    description:
      "When you're ready, book your practical test and celebrate your success. Pass Plus available with your instructor.",
  },
];

export default function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="how-it-works" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-4">
            <span className="text-xs text-emerald-300 font-medium">Simple process</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Pass in four steps
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Getting your driving licence has never been simpler. Here&apos;s how MCO-DS works.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex flex-col items-center text-center px-4"
              >
                {/* Step indicator */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600/20 to-violet-600/20 border border-white/10 flex items-center justify-center">
                    <Icon size={28} className="text-blue-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-[10px] font-bold text-white">
                    {i + 1}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
