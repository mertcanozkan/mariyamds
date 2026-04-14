"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Car, Zap, Settings, Clock, AlertCircle, ArrowRight } from "lucide-react";
import { MOCK_INSTRUCTORS } from "@/lib/mock-data/instructors";
import { useBookingStore } from "@/lib/store/bookingStore";
import { LessonType, Transmission } from "@/lib/types";
import { formatPrice, formatPricePerHour } from "@/lib/utils/formatters";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

const lessonTypes: {
  value: LessonType;
  label: string;
  duration: number;
  description: string;
  recommended?: string;
}[] = [
  {
    value: "intro",
    label: "Introductory Lesson",
    duration: 1,
    description: "Perfect for complete beginners. Get a feel for the car and basic controls.",
    recommended: "First timers",
  },
  {
    value: "standard",
    label: "Standard Lesson",
    duration: 1,
    description: "Regular 1-hour lesson building on existing skills.",
  },
  {
    value: "motorway",
    label: "Motorway Lesson",
    duration: 1,
    description: "Gain confidence on the motorway. Available after you've passed your test.",
  },
  {
    value: "test-prep",
    label: "Test Preparation",
    duration: 2,
    description: "Two-hour focused session on weak areas before your practical test.",
    recommended: "Test ready",
  },
  {
    value: "pass-plus",
    label: "Pass Plus",
    duration: 6,
    description: "Six-hour post-test course covering motorways, rural roads, and night driving.",
  },
];

function BookingPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setInstructor, setLessonDetails, setStep } = useBookingStore();

  const slug = searchParams.get("instructor");
  const instructor = MOCK_INSTRUCTORS.find((i) => i.slug === slug) || MOCK_INSTRUCTORS[0];

  const [selectedType, setSelectedType] = useState<LessonType>("standard");
  const [selectedTransmission, setSelectedTransmission] = useState<Transmission>(
    instructor.transmission === "both" ? "manual" : instructor.transmission
  );

  const lessonConfig = lessonTypes.find((l) => l.value === selectedType)!;
  const totalPrice = instructor.pricePerHour * lessonConfig.duration;

  const handleContinue = () => {
    setInstructor(instructor.id);
    setLessonDetails(selectedType, selectedTransmission, lessonConfig.duration, totalPrice);
    setStep(2);
    router.push("/booking/schedule");
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                  step === 1
                    ? "bg-blue-600 text-white"
                    : "bg-white/8 text-slate-500"
                )}
              >
                {step}
              </div>
              {step < 4 && <div className="w-12 h-px bg-white/10" />}
            </div>
          ))}
          <span className="ml-2 text-sm text-slate-500">Lesson details</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Instructor card */}
            <div className="rounded-xl border border-white/8 bg-[#0f1117] p-4">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Booking with</p>
              <div className="flex items-center gap-3">
                <Avatar src={instructor.avatar} name={instructor.name} size="md" />
                <div>
                  <div className="text-sm font-semibold text-white">{instructor.name}</div>
                  <div className="text-xs text-slate-500">{instructor.location.city} · {formatPricePerHour(instructor.pricePerHour)}</div>
                </div>
                <Badge variant="blue" className="ml-auto">ADI #{instructor.adiNumber}</Badge>
              </div>
            </div>

            {/* Lesson type */}
            <div>
              <h2 className="text-base font-semibold text-white mb-3">Choose lesson type</h2>
              <div className="space-y-2">
                {lessonTypes.map((lt) => (
                  <motion.button
                    key={lt.value}
                    onClick={() => setSelectedType(lt.value)}
                    className={cn(
                      "w-full text-left rounded-xl border p-4 transition-all duration-200",
                      selectedType === lt.value
                        ? "border-blue-500/50 bg-blue-500/8 shadow-[0_0_20px_rgba(59,130,246,0.08)]"
                        : "border-white/8 bg-[#0f1117] hover:border-white/15 hover:bg-white/3"
                    )}
                    whileHover={{ scale: 1.005 }}
                    whileTap={{ scale: 0.998 }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-white">{lt.label}</span>
                          {lt.recommended && (
                            <Badge variant="green" size="sm">{lt.recommended}</Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-500">{lt.description}</p>
                        <div className="flex items-center gap-1 mt-2 text-xs text-slate-600">
                          <Clock size={10} />
                          {lt.duration} hour{lt.duration > 1 ? "s" : ""}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-base font-bold text-white">
                          {formatPrice(instructor.pricePerHour * lt.duration)}
                        </div>
                        {lt.duration > 1 && (
                          <div className="text-xs text-slate-600">{formatPricePerHour(instructor.pricePerHour)}</div>
                        )}
                      </div>
                    </div>
                    {selectedType === lt.value && (
                      <div className="mt-1 flex justify-end">
                        <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Transmission */}
            <div>
              <h2 className="text-base font-semibold text-white mb-3">Transmission</h2>
              <div className="flex gap-3">
                {(["manual", "automatic"] as Transmission[]).map((t) => {
                  const disabled =
                    instructor.transmission !== "both" && instructor.transmission !== t;
                  return (
                    <button
                      key={t}
                      disabled={disabled}
                      onClick={() => setSelectedTransmission(t)}
                      className={cn(
                        "flex-1 rounded-xl border p-4 flex flex-col items-center gap-2 transition-all",
                        disabled
                          ? "border-white/5 bg-white/2 opacity-40 cursor-not-allowed"
                          : selectedTransmission === t
                          ? "border-blue-500/50 bg-blue-500/8"
                          : "border-white/8 bg-[#0f1117] hover:border-white/15 cursor-pointer"
                      )}
                    >
                      {t === "manual" ? (
                        <Settings size={22} className={selectedTransmission === t ? "text-blue-400" : "text-slate-400"} />
                      ) : (
                        <Zap size={22} className={selectedTransmission === t ? "text-blue-400" : "text-slate-400"} />
                      )}
                      <span className={cn("text-sm font-medium capitalize", selectedTransmission === t ? "text-white" : "text-slate-400")}>
                        {t}
                      </span>
                    </button>
                  );
                })}
              </div>
              {instructor.transmission !== "both" && (
                <p className="text-xs text-slate-600 mt-2 flex items-center gap-1">
                  <AlertCircle size={11} />
                  This instructor only teaches {instructor.transmission}
                </p>
              )}
            </div>
          </div>

          {/* Summary sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-white/8 bg-[#0f1117] p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Booking summary</h3>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Instructor</span>
                  <span className="text-slate-300">{instructor.name.split(" ")[0]}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Lesson type</span>
                  <span className="text-slate-300">{lessonConfig.label}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Duration</span>
                  <span className="text-slate-300">{lessonConfig.duration}h</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Transmission</span>
                  <span className="text-slate-300 capitalize">{selectedTransmission}</span>
                </div>
                <div className="border-t border-white/8 pt-3 flex justify-between">
                  <span className="text-sm font-semibold text-white">Total</span>
                  <span className="text-lg font-bold text-white">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 p-3 rounded-lg bg-amber-500/8 border border-amber-500/15 mb-4">
                <Car size={13} className="text-amber-400 flex-shrink-0" />
                <span className="text-xs text-amber-300">
                  {instructor.vehicle.year} {instructor.vehicle.make} {instructor.vehicle.model}
                </span>
              </div>

              <Button onClick={handleContinue} className="w-full" size="md">
                Continue to Schedule
                <ArrowRight size={14} />
              </Button>

              <p className="text-[10px] text-slate-600 text-center mt-3">
                Free cancellation up to 48 hours before your lesson
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-20 flex items-center justify-center text-slate-400">Loading...</div>}>
      <BookingPageContent />
    </Suspense>
  );
}
