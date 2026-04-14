"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useBookingStore } from "@/lib/store/bookingStore";
import { MOCK_INSTRUCTORS } from "@/lib/mock-data/instructors";
import { TimeSlot } from "@/lib/types";
import { formatPrice, formatTime } from "@/lib/utils/formatters";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function generateCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const days: (number | null)[] = [];
  for (let i = 0; i < offset; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  return days;
}

const SLOT_GROUPS = [
  { label: "Morning", range: "Before 12:00", filter: (t: string) => parseInt(t) < 12 },
  { label: "Afternoon", range: "12:00 – 17:00", filter: (t: string) => parseInt(t) >= 12 && parseInt(t) < 17 },
  { label: "Evening", range: "After 17:00", filter: (t: string) => parseInt(t) >= 17 },
];

const AVAILABLE_TIMES = ["09:00","10:00","11:00","14:00","15:00","16:00","17:00","18:00"];
const UNAVAILABLE_TIMES = ["11:00","16:00"];

export default function SchedulePage() {
  const router = useRouter();
  const { instructorId, durationHours, totalPriceInPence, setDateTime, setStep } = useBookingStore();

  const instructor = MOCK_INSTRUCTORS.find((i) => i.id === instructorId) || MOCK_INSTRUCTORS[0];

  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const calDays = generateCalendarDays(year, month);

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
    setSelectedDay(null); setSelectedSlot(null);
  };

  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
    setSelectedDay(null); setSelectedSlot(null);
  };

  const handleContinue = () => {
    if (!selectedDay || !selectedSlot) return;
    const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`;
    const slot: TimeSlot = {
      startTime: selectedSlot,
      endTime: `${String(parseInt(selectedSlot) + durationHours).padStart(2, "0")}:00`,
      available: true,
    };
    setDateTime(date, slot);
    setStep(3);
    router.push("/booking/details");
  };

  const isPastDay = (day: number) => {
    const date = new Date(year, month, day);
    return date < new Date(now.getFullYear(), now.getMonth(), now.getDate());
  };

  const isAvailableDay = (day: number) => {
    if (isPastDay(day)) return false;
    const dow = new Date(year, month, day).getDay();
    return dow !== 0 || instructor.availability.sunday.length > 0;
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
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                  step <= 2 ? "bg-blue-600 text-white" : "bg-white/8 text-slate-500"
                )}
              >
                {step < 2 ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : step}
              </div>
              {step < 4 && <div className="w-12 h-px bg-white/10" />}
            </div>
          ))}
          <span className="ml-2 text-sm text-slate-500">Choose date & time</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            {/* Calendar */}
            <div className="rounded-xl border border-white/8 bg-[#0f1117] p-5">
              <div className="flex items-center justify-between mb-5">
                <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-white/8 text-slate-400 hover:text-white transition-colors">
                  <ChevronLeft size={18} />
                </button>
                <h2 className="text-base font-semibold text-white">{MONTHS[month]} {year}</h2>
                <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-white/8 text-slate-400 hover:text-white transition-colors">
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 mb-2">
                {DAYS.map((d) => (
                  <div key={d} className="text-center text-xs text-slate-600 py-1">{d}</div>
                ))}
              </div>

              {/* Day grid */}
              <div className="grid grid-cols-7 gap-1">
                {calDays.map((day, i) => {
                  if (!day) return <div key={i} />;
                  const available = isAvailableDay(day);
                  const past = isPastDay(day);
                  const selected = selectedDay === day;
                  return (
                    <button
                      key={i}
                      disabled={!available}
                      onClick={() => { setSelectedDay(day); setSelectedSlot(null); }}
                      className={cn(
                        "aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all",
                        past
                          ? "text-slate-700 cursor-not-allowed"
                          : selected
                          ? "bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.4)]"
                          : available
                          ? "text-slate-300 hover:bg-white/8 hover:text-white cursor-pointer"
                          : "text-slate-600 cursor-not-allowed"
                      )}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time slots */}
            {selectedDay && (
              <div className="rounded-xl border border-white/8 bg-[#0f1117] p-5">
                <h2 className="text-base font-semibold text-white mb-4">Available times</h2>
                <div className="space-y-4">
                  {SLOT_GROUPS.map((group) => {
                    const slots = AVAILABLE_TIMES.filter(
                      (t) => group.filter(t) && !UNAVAILABLE_TIMES.includes(t)
                    );
                    if (slots.length === 0) return null;
                    return (
                      <div key={group.label}>
                        <div className="text-xs text-slate-500 mb-2">{group.label} · {group.range}</div>
                        <div className="flex flex-wrap gap-2">
                          {slots.map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedSlot(time)}
                              className={cn(
                                "px-3 py-2 rounded-lg text-sm font-medium border transition-all",
                                selectedSlot === time
                                  ? "bg-blue-600 border-blue-500 text-white"
                                  : "border-emerald-500/25 bg-emerald-500/8 text-emerald-400 hover:bg-emerald-500/15"
                              )}
                            >
                              {formatTime(time)}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-white/8 bg-[#0f1117] p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Booking summary</h3>
              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Instructor</span>
                  <span className="text-slate-300">{instructor.name.split(" ")[0]}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Duration</span>
                  <span className="text-slate-300">{durationHours}h</span>
                </div>
                {selectedDay && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Date</span>
                    <span className="text-slate-300">
                      {String(selectedDay).padStart(2, "0")}/{String(month + 1).padStart(2, "0")}/{year}
                    </span>
                  </div>
                )}
                {selectedSlot && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Time</span>
                    <span className="text-slate-300">{formatTime(selectedSlot)}</span>
                  </div>
                )}
                <div className="border-t border-white/8 pt-3 flex justify-between">
                  <span className="text-sm font-semibold text-white">Total</span>
                  <span className="text-lg font-bold text-white">{formatPrice(totalPriceInPence)}</span>
                </div>
              </div>

              <Button
                onClick={handleContinue}
                disabled={!selectedDay || !selectedSlot}
                className="w-full"
              >
                Continue
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
