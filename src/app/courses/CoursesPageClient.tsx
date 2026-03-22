"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  ChevronDown,
  ArrowRight,
  Clock,
  Zap,
  Star,
  Shield,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { COURSES, COURSE_FAQS, type CourseCategory } from "@/lib/mock-data/courses";
import Button from "@/components/ui/Button";

// ── Colour maps ────────────────────────────────────────────────────────────────

const cardColour: Record<string, string> = {
  cyan: "border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.07)]",
  blue: "border-blue-500/20 shadow-[0_0_40px_rgba(59,130,246,0.07)]",
  emerald: "border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.07)]",
  violet: "border-violet-500/20 shadow-[0_0_40px_rgba(139,92,246,0.07)]",
  amber: "border-amber-500/20 shadow-[0_0_40px_rgba(245,158,11,0.07)]",
  rose: "border-rose-500/20 shadow-[0_0_40px_rgba(244,63,94,0.07)]",
};

const accentText: Record<string, string> = {
  cyan: "text-cyan-400",
  blue: "text-blue-400",
  emerald: "text-emerald-400",
  violet: "text-violet-400",
  amber: "text-amber-400",
  rose: "text-rose-400",
};

const accentBg: Record<string, string> = {
  cyan: "bg-cyan-500/10",
  blue: "bg-blue-500/10",
  emerald: "bg-emerald-500/10",
  violet: "bg-violet-500/10",
  amber: "bg-amber-500/10",
  rose: "bg-rose-500/10",
};

const badgeCls: Record<string, string> = {
  cyan: "bg-cyan-500/15 text-cyan-300 border-cyan-500/20",
  blue: "bg-blue-500/15 text-blue-300 border-blue-500/20",
  emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  violet: "bg-violet-500/15 text-violet-300 border-violet-500/20",
  amber: "bg-amber-500/15 text-amber-300 border-amber-500/20",
  rose: "bg-rose-500/15 text-rose-300 border-rose-500/20",
};

// ── Category filter config ─────────────────────────────────────────────────────

type FilterTab = CourseCategory | "all";

const TABS: { id: FilterTab; label: string }[] = [
  { id: "all", label: "All courses" },
  { id: "beginner", label: "Beginner" },
  { id: "package", label: "Packages" },
  { id: "intensive", label: "Intensive" },
  { id: "advanced", label: "Advanced" },
  { id: "specialist", label: "Specialist" },
];

// ── FAQ item ───────────────────────────────────────────────────────────────────

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="border border-white/8 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/4 transition-colors"
      >
        <span className="text-sm font-medium text-slate-200">{q}</span>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-slate-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm text-slate-400 leading-relaxed border-t border-white/8 pt-3">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Course card ────────────────────────────────────────────────────────────────

function CourseCard({
  course,
  index,
}: {
  course: (typeof COURSES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      id={course.id}
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className={`relative rounded-2xl border bg-[#0f1117] overflow-hidden flex flex-col ${cardColour[course.colour]}`}
    >
      {/* Top accent stripe */}
      <div
        className={`h-1 w-full ${accentBg[course.colour]}`}
        style={{ background: `var(--stripe-${course.colour})` }}
      />

      <div className="p-6 md:p-7 flex flex-col flex-1">
        {/* Badge row */}
        <div className="flex items-start justify-between mb-4">
          <span className="text-3xl">{course.icon}</span>
          {course.badge && (
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${badgeCls[course.badgeColor ?? "blue"]}`}
            >
              {course.popular && <Zap size={10} />}
              {course.badge}
            </span>
          )}
        </div>

        {/* Name & tagline */}
        <h3 className="text-xl font-bold text-white mb-1">{course.name}</h3>
        <p className={`text-sm font-medium mb-3 ${accentText[course.colour]}`}>
          {course.tagline}
        </p>
        <p className="text-sm text-slate-500 leading-relaxed mb-5">
          {course.description}
        </p>

        {/* Who is it for */}
        <div className="flex items-start gap-2 mb-5 p-3 rounded-lg bg-white/3 border border-white/6">
          <Star size={13} className="text-slate-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-slate-400">
            <span className="font-medium text-slate-300">Best for: </span>
            {course.whoIsItFor}
          </p>
        </div>

        {/* Price block */}
        <div className="flex items-end gap-3 mb-2">
          <span className={`text-4xl font-bold ${accentText[course.colour]}`}>
            £{course.priceGbp.toLocaleString()}
          </span>
          {course.originalPriceGbp && (
            <span className="text-slate-600 line-through text-sm mb-1">
              £{course.originalPriceGbp.toLocaleString()}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 mb-6">
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <Clock size={11} />
            {course.hours}h
            {course.pricePerHour
              ? ` · £${course.pricePerHour % 1 === 0 ? course.pricePerHour : course.pricePerHour.toFixed(2)}/hr`
              : ""}
          </span>
          {course.savingGbp && (
            <span className="text-[11px] text-emerald-400 bg-emerald-400/10 rounded-full px-2 py-0.5 font-medium">
              Save £{course.savingGbp}
            </span>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-2.5 mb-6 flex-1">
          {course.features.map((f) => (
            <li key={f.text} className="flex items-start gap-2.5">
              {f.included ? (
                <Check size={13} className="text-emerald-400 mt-0.5 flex-shrink-0" />
              ) : (
                <X size={13} className="text-slate-600 mt-0.5 flex-shrink-0" />
              )}
              <span
                className={`text-xs leading-relaxed ${
                  f.included ? "text-slate-300" : "text-slate-600 line-through"
                }`}
              >
                {f.text}
              </span>
            </li>
          ))}
        </ul>

        {/* Includes chips */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {course.includes.map((inc) => (
            <span
              key={inc}
              className="text-[11px] text-slate-400 bg-white/5 border border-white/8 rounded-full px-2.5 py-0.5"
            >
              {inc}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link href="/instructors">
          <Button
            variant={course.popular ? "primary" : "outline"}
            className="w-full gap-2"
          >
            Book this course
            <ArrowRight size={15} />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function CoursesPageClient() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  const filtered =
    activeTab === "all"
      ? COURSES
      : COURSES.filter((c) => c.category === activeTab);

  return (
    <main className="min-h-screen pt-24">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-blue-600/5 rounded-full blur-[140px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 mb-5">
              <BookOpen size={13} className="text-blue-400" />
              <span className="text-xs text-blue-300 font-medium">
                UK driving courses — 2025 pricing
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
              Courses for{" "}
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                every learner
              </span>
            </h1>

            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              From a single taster session to fast-track intensive courses and
              post-test Pass Plus. Transparent pricing based on current London
              market rates — no hidden fees, no nasty surprises.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
              {[
                { icon: Shield, text: "DVSA-approved instructors" },
                { icon: Star, text: "4.9★ average rating" },
                { icon: Zap, text: "Instant online booking" },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1.5">
                  <Icon size={14} className="text-blue-400" />
                  {text}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Filter tabs ───────────────────────────────────────────────────── */}
      <div className="sticky top-16 z-30 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/8 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide pb-0.5">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-500 text-white shadow-[0_0_12px_rgba(59,130,246,0.4)]"
                    : "text-slate-400 hover:text-white hover:bg-white/8"
                }`}
              >
                {tab.label}
                {tab.id !== "all" && (
                  <span className="ml-1.5 text-[10px] opacity-60">
                    {COURSES.filter((c) => c.category === tab.id).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Course grid ───────────────────────────────────────────────────── */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((course, i) => (
                <CourseCard key={course.id} course={course} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Pricing note ──────────────────────────────────────────────────── */}
      <section className="pb-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl border border-white/8 bg-white/2 p-5 md:p-6 text-center">
            <p className="text-sm text-slate-500 leading-relaxed">
              <span className="font-medium text-slate-400">
                Prices shown are London market rates (2025).
              </span>{" "}
              Instructors in other regions may charge less. The exact price is
              always confirmed on each instructor&apos;s profile before you
              book. DVSA practical test fee (£62–£75) is not included.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Frequently asked questions
            </h2>
            <p className="text-slate-500">
              Everything you need to know about booking and pricing.
            </p>
          </div>

          <div className="space-y-3">
            {COURSE_FAQS.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-b from-blue-950/20 to-[#0f1117] p-10 md:p-14 text-center shadow-[0_0_80px_rgba(59,130,246,0.08)]">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Browse DVSA-approved instructors near you, check their
              availability, and book your first lesson in minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/instructors">
                <Button size="lg" className="gap-2">
                  Find an instructor
                  <ArrowRight size={16} />
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" size="lg">
                  Create free account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
