"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const HOURS = Array.from({ length: 12 }, (_, i) => `${i + 7}:00`);

const BOOKED_SLOTS: Record<string, Record<string, string>> = {
  Monday: { "9:00": "Tom Harrison", "14:00": "Fatima Al-Hassan" },
  Tuesday: { "10:00": "Charlie Browning", "15:00": "Neha Sharma" },
  Wednesday: { "9:00": "Jamie Forsyth" },
  Thursday: { "11:00": "Sophie Clarke", "16:00": "Marcus Reid" },
  Friday: { "9:00": "Lucy Fairweather", "14:00": "Ravi Kumar" },
};

const DEFAULT_AVAILABLE: Record<string, string[]> = {
  Monday: ["9:00", "10:00", "14:00", "15:00", "16:00"],
  Tuesday: ["9:00", "10:00", "14:00", "15:00"],
  Wednesday: ["9:00", "10:00", "11:00", "15:00"],
  Thursday: ["10:00", "11:00", "14:00", "15:00", "16:00"],
  Friday: ["9:00", "10:00", "14:00"],
  Saturday: ["9:00", "10:00", "11:00"],
  Sunday: [],
};

export default function SchedulePage() {
  const [available, setAvailable] = useState(DEFAULT_AVAILABLE);
  const [weekOffset, setWeekOffset] = useState(0);

  const toggleSlot = (day: string, hour: string) => {
    const booked = BOOKED_SLOTS[day]?.[hour];
    if (booked) return;
    setAvailable((prev) => {
      const daySlots = prev[day] || [];
      const exists = daySlots.includes(hour);
      return {
        ...prev,
        [day]: exists ? daySlots.filter((h) => h !== hour) : [...daySlots, hour],
      };
    });
  };

  const getSlotState = (day: string, hour: string) => {
    if (BOOKED_SLOTS[day]?.[hour]) return "booked";
    if (available[day]?.includes(hour)) return "available";
    return "unavailable";
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Schedule</h1>
          <p className="text-slate-400 text-sm">Click slots to toggle availability. Booked slots cannot be changed.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setWeekOffset((o) => o - 1)}
            className="p-2 rounded-lg border border-white/10 hover:bg-white/8 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm text-slate-300 min-w-[80px] text-center">
            {weekOffset === 0 ? "This week" : weekOffset === 1 ? "Next week" : `+${weekOffset}w`}
          </span>
          <button
            onClick={() => setWeekOffset((o) => o + 1)}
            className="p-2 rounded-lg border border-white/10 hover:bg-white/8 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-5 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500/40" />
          Available
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-blue-500/30 border border-blue-500/40" />
          Booked
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-white/5 border border-white/8" />
          Unavailable
        </div>
      </div>

      {/* Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          {/* Day headers */}
          <div className="grid grid-cols-8 gap-1 mb-1">
            <div className="text-xs text-slate-600 p-2 text-right">Time</div>
            {DAYS.map((day) => (
              <div key={day} className="text-xs text-slate-400 font-medium p-2 text-center">{day.slice(0, 3)}</div>
            ))}
          </div>

          {/* Hours */}
          {HOURS.map((hour) => (
            <div key={hour} className="grid grid-cols-8 gap-1 mb-1">
              <div className="text-xs text-slate-600 p-2 text-right flex items-center justify-end">{hour}</div>
              {DAYS.map((day) => {
                const state = getSlotState(day, hour);
                const bookedBy = BOOKED_SLOTS[day]?.[hour];
                return (
                  <button
                    key={day}
                    onClick={() => toggleSlot(day, hour)}
                    disabled={state === "booked"}
                    title={bookedBy ? `Booked: ${bookedBy}` : undefined}
                    className={cn(
                      "rounded-lg p-1.5 text-[10px] font-medium text-center min-h-[36px] transition-all border",
                      state === "booked"
                        ? "bg-blue-500/20 border-blue-500/30 text-blue-300 cursor-default"
                        : state === "available"
                        ? "bg-emerald-500/15 border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/25 cursor-pointer"
                        : "bg-white/3 border-white/6 text-slate-700 hover:bg-white/8 hover:text-slate-500 cursor-pointer"
                    )}
                  >
                    {state === "booked" ? bookedBy?.split(" ")[0] : ""}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
