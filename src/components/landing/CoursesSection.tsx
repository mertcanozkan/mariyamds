"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight, Zap, Clock } from "lucide-react";
import Link from "next/link";
import { COURSES } from "@/lib/mock-data/courses";
import Button from "@/components/ui/Button";

// Show only the key packages on the landing page
const FEATURED_IDS = ["taster", "standard-pack", "complete-pack", "intensive"];
const featured = COURSES.filter((c) => FEATURED_IDS.includes(c.id));

const colourMap: Record<string, string> = {
  cyan: "from-cyan-500/10 border-cyan-500/25 shadow-[0_0_30px_rgba(6,182,212,0.08)]",
  blue: "from-blue-500/10 border-blue-500/25 shadow-[0_0_30px_rgba(59,130,246,0.08)]",
  emerald:
    "from-emerald-500/10 border-emerald-500/25 shadow-[0_0_30px_rgba(16,185,129,0.08)]",
  violet:
    "from-violet-500/10 border-violet-500/25 shadow-[0_0_30px_rgba(139,92,246,0.08)]",
  amber:
    "from-amber-500/10 border-amber-500/25 shadow-[0_0_30px_rgba(245,158,11,0.08)]",
  rose: "from-rose-500/10 border-rose-500/25 shadow-[0_0_30px_rgba(244,63,94,0.08)]",
};

const badgeColourMap: Record<string, string> = {
  cyan: "bg-cyan-500/15 text-cyan-300 border-cyan-500/25",
  blue: "bg-blue-500/15 text-blue-300 border-blue-500/25",
  emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
  violet: "bg-violet-500/15 text-violet-300 border-violet-500/25",
  amber: "bg-amber-500/15 text-amber-300 border-amber-500/25",
  rose: "bg-rose-500/15 text-rose-300 border-rose-500/25",
};

const accentMap: Record<string, string> = {
  cyan: "text-cyan-400",
  blue: "text-blue-400",
  emerald: "text-emerald-400",
  violet: "text-violet-400",
  amber: "text-amber-400",
  rose: "text-rose-400",
};

export default function CoursesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="courses" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/4 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 mb-4">
            <span className="text-xs text-blue-300 font-medium">
              Courses &amp; Packages
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Every learner, every budget
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            From a single taster session to a complete course that takes you
            from zero to licence. London-market pricing with instructors across
            the UK.
          </p>
        </motion.div>

        {/* Course cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {featured.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative rounded-2xl border bg-gradient-to-b to-[#0f1117] p-6 flex flex-col ${colourMap[course.colour]}`}
            >
              {/* Popular / badge pill */}
              {course.badge && (
                <div
                  className={`absolute -top-3 left-4 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ${badgeColourMap[course.badgeColor ?? "blue"]}`}
                >
                  {course.popular && <Zap size={10} />}
                  {course.badge}
                </div>
              )}

              {/* Icon + name */}
              <div className="mb-4">
                <span className="text-3xl">{course.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                {course.name}
              </h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                {course.tagline}
              </p>

              {/* Price */}
              <div className="mb-1">
                <span className={`text-3xl font-bold ${accentMap[course.colour]}`}>
                  £{course.priceGbp.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-5">
                <Clock size={12} className="text-slate-500" />
                <span className="text-xs text-slate-500">
                  {course.hours}h
                  {course.pricePerHour
                    ? ` · £${course.pricePerHour.toFixed(0)}/hr`
                    : ""}
                </span>
                {course.savingGbp && (
                  <span className="ml-auto text-[11px] text-emerald-400 font-medium bg-emerald-400/10 rounded-full px-2 py-0.5">
                    Save £{course.savingGbp}
                  </span>
                )}
              </div>

              {/* Top 3 features */}
              <ul className="space-y-2 mb-6 flex-1">
                {course.features.slice(0, 3).map((f) => (
                  <li
                    key={f.text}
                    className="flex items-start gap-2 text-xs text-slate-400"
                  >
                    <Check
                      size={12}
                      className={`mt-0.5 flex-shrink-0 ${
                        f.included ? "text-emerald-400" : "text-slate-600"
                      }`}
                    />
                    <span className={f.included ? "" : "line-through text-slate-600"}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href={`/courses#${course.id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                >
                  View details
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/courses">
            <Button size="lg" className="gap-2">
              View all 8 courses
              <ArrowRight size={16} />
            </Button>
          </Link>
          <Link href="/instructors">
            <Button variant="ghost" size="lg" className="text-slate-400">
              Browse instructors instead
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
