"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { MOCK_TESTIMONIALS } from "@/lib/mock-data/testimonials";
import StarRating from "@/components/ui/StarRating";
import Avatar from "@/components/ui/Avatar";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % MOCK_TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(id);
  }, [autoplay]);

  const prev = () => {
    setAutoplay(false);
    setCurrent((c) => (c - 1 + MOCK_TESTIMONIALS.length) % MOCK_TESTIMONIALS.length);
  };

  const next = () => {
    setAutoplay(false);
    setCurrent((c) => (c + 1) % MOCK_TESTIMONIALS.length);
  };

  const t = MOCK_TESTIMONIALS[current];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 mb-4">
            <span className="text-xs text-pink-300 font-medium">Student stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Real results, real reviews
          </h2>
          <p className="text-lg text-slate-400">
            Thousands of students have passed their test with MCO-DS instructors.
          </p>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="rounded-2xl border border-white/8 bg-[#0f1117] p-8 md:p-10 text-center min-h-[280px] flex flex-col items-center justify-center">
            <Quote size={32} className="text-violet-500/50 mb-6" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center"
              >
                <p className="text-xl md:text-2xl text-slate-200 leading-relaxed mb-6 font-light italic max-w-2xl">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <StarRating rating={t.rating} size="md" className="mb-4" />

                <div className="flex items-center gap-3">
                  <Avatar name={t.name} size="md" />
                  <div className="text-left">
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.city}</div>
                  </div>
                  {t.passed && (
                    <div className="flex items-center gap-1 ml-2 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/20">
                      <CheckCircle size={11} className="text-emerald-400" />
                      <span className="text-[10px] text-emerald-400 font-medium">Passed 1st attempt</span>
                    </div>
                  )}
                </div>

                <div className="mt-3 text-xs text-slate-600">
                  Instructor: {t.instructorName}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex gap-1.5">
              {MOCK_TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setAutoplay(false); setCurrent(i); }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-blue-500" : "w-1.5 bg-white/20"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
