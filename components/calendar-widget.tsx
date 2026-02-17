"use client";

import { useMemo, useState } from "react";

type CalendarWidgetProps = {
  whatsappNumber: string;
};

const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const timeSlots = ["09:00", "10:30", "12:00", "14:00", "16:00", "17:30"];

function firstDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export default function CalendarWidget({ whatsappNumber }: CalendarWidgetProps) {
  const [visibleMonth, setVisibleMonth] = useState<Date>(firstDayOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const today = useMemo(() => startOfToday(), []);

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        month: "long",
        year: "numeric"
      }).format(visibleMonth),
    [visibleMonth]
  );

  const days = useMemo(() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: Array<Date | null> = [];
    for (let i = 0; i < firstWeekday; i += 1) {
      cells.push(null);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push(new Date(year, month, day));
    }

    return cells;
  }, [visibleMonth]);

  const selectedDateLabel = selectedDate
    ? new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long"
      }).format(selectedDate)
    : "No date selected";

  const selectedSlot = selectedDate && selectedTime ? `${selectedDateLabel} at ${selectedTime}` : null;

  const whatsappMessage = selectedSlot
    ? `Hi Mariyam, I would like to book a lesson on ${selectedSlot}.`
    : "Hi Mariyam, I would like to book a lesson. Can you share available slots?";

  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            const prev = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1);
            setVisibleMonth(prev);
          }}
          className="rounded-full border border-white/30 px-3 py-1 text-xs font-semibold text-white transition hover:border-brand-accent hover:text-brand-accent"
          aria-label="Previous month"
        >
          Prev
        </button>

        <p className="text-sm font-semibold text-white">{monthLabel}</p>

        <button
          type="button"
          onClick={() => {
            const next = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1);
            setVisibleMonth(next);
          }}
          className="rounded-full border border-white/30 px-3 py-1 text-xs font-semibold text-white transition hover:border-brand-accent hover:text-brand-accent"
          aria-label="Next month"
        >
          Next
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] uppercase tracking-[0.08em] text-white/70">
        {weekdayLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1" role="grid" aria-label="Lesson date picker">
        {days.map((day, index) => {
          if (!day) {
            return <span key={`empty-${index}`} className="h-10" />;
          }

          const isPast = day < today;
          const isSunday = day.getDay() === 0;
          const disabled = isPast || isSunday;
          const active = selectedDate ? isSameDay(selectedDate, day) : false;

          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => {
                setSelectedDate(day);
                setSelectedTime(null);
              }}
              className={`h-10 rounded-lg border text-sm transition ${
                active
                  ? "border-brand-accent bg-brand-accent text-brand-ink"
                  : disabled
                    ? "cursor-not-allowed border-white/10 text-white/30"
                    : "border-white/20 text-white hover:border-brand-accent hover:text-brand-accent"
              }`}
              aria-label={`Select ${day.toDateString()}`}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/70">Available Times</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              type="button"
              disabled={!selectedDate}
              onClick={() => setSelectedTime(slot)}
              className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                selectedTime === slot
                  ? "border-brand-accent bg-brand-accent text-brand-ink"
                  : !selectedDate
                    ? "cursor-not-allowed border-white/10 text-white/30"
                    : "border-white/20 text-white hover:border-brand-accent hover:text-brand-accent"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/20 bg-white/10 p-3">
        <p className="text-xs uppercase tracking-[0.12em] text-white/70">Selected Slot</p>
        <p className="mt-1 text-sm text-white">{selectedSlot ?? "Choose a date and time to continue."}</p>
      </div>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="inline-flex w-full items-center justify-center rounded-full bg-brand-accent px-4 py-3 text-sm font-semibold text-brand-ink transition hover:bg-brand-coral"
      >
        Confirm Slot on WhatsApp
      </a>
    </div>
  );
}
