"use client";

import { useState } from "react";
import { CheckCircle, Clock, Calendar, Car, XCircle } from "lucide-react";
import { MOCK_BOOKINGS } from "@/lib/mock-data/bookings";
import { MOCK_INSTRUCTORS } from "@/lib/mock-data/instructors";
import { formatPrice, formatTime } from "@/lib/utils/formatters";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

const tabs = ["Upcoming", "Past"];

export default function LessonsPage() {
  const [tab, setTab] = useState("Upcoming");

  const upcoming = MOCK_BOOKINGS.filter((b) => b.status === "confirmed" || b.status === "pending");
  const past = MOCK_BOOKINGS.filter((b) => b.status === "completed" || b.status === "cancelled");

  const list = tab === "Upcoming" ? upcoming : past;

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">My Lessons</h1>
        <p className="text-slate-400 text-sm">Manage your driving lesson history and upcoming bookings.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 rounded-xl bg-white/5 border border-white/8 w-fit">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              tab === t ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {list.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <Calendar size={40} className="mx-auto mb-3 opacity-30" />
            <p>No {tab.toLowerCase()} lessons</p>
          </div>
        )}

        {list.map((booking) => {
          const instructor = MOCK_INSTRUCTORS.find((i) => i.id === booking.instructorId);
          return (
            <div
              key={booking.id}
              className="rounded-xl border border-white/8 bg-[#0f1117] p-4 md:p-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-3 flex-1">
                  {booking.status === "completed" ? (
                    <CheckCircle size={18} className="text-emerald-400 flex-shrink-0" />
                  ) : booking.status === "cancelled" ? (
                    <XCircle size={18} className="text-red-400 flex-shrink-0" />
                  ) : (
                    <Clock size={18} className="text-blue-400 flex-shrink-0" />
                  )}

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-sm font-semibold text-white capitalize">
                        {booking.lessonType.replace("-", " ")} lesson
                      </span>
                      <Badge
                        variant={
                          booking.status === "completed" ? "green" :
                          booking.status === "cancelled" ? "red" :
                          "blue"
                        }
                        size="sm"
                      >
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-500 flex flex-wrap gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={10} />
                        {booking.date.split("-").reverse().join("/")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} />
                        {formatTime(booking.startTime)} · {booking.durationHours}h
                      </span>
                      <span className="flex items-center gap-1">
                        <Car size={10} />
                        {instructor?.name}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-between sm:justify-end">
                  <div className="text-base font-bold text-white">{formatPrice(booking.priceInPence)}</div>
                  <div className="flex gap-2">
                    {booking.status === "confirmed" && (
                      <Button variant="danger" size="sm">Cancel</Button>
                    )}
                    {booking.status === "completed" && (
                      <Button variant="outline" size="sm">Leave review</Button>
                    )}
                    <Button variant="ghost" size="sm">Details</Button>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-white/6 flex items-center justify-between text-xs text-slate-600">
                <span>Ref: {booking.bookingRef}</span>
                <span className="capitalize">{booking.transmission} · {booking.transmission}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
