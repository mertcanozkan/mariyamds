"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Calendar, Clock, User, MapPin, ArrowRight, Car } from "lucide-react";
import { useBookingStore } from "@/lib/store/bookingStore";
import { MOCK_INSTRUCTORS } from "@/lib/mock-data/instructors";
import { formatPrice, formatTime } from "@/lib/utils/formatters";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";

export default function ConfirmPage() {
  const router = useRouter();
  const store = useBookingStore();
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const instructor = MOCK_INSTRUCTORS.find((i) => i.id === store.instructorId) || MOCK_INSTRUCTORS[0];

  const handleConfirm = async () => {
    setLoading(true);
    const ref = await store.confirmBooking();
    setBookingRef(ref);
    setLoading(false);
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="max-w-md w-full text-center"
        >
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle size={40} className="text-emerald-400" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-3xl font-bold text-white mb-2">Lesson booked!</h1>
            <p className="text-slate-400 mb-6">
              Your lesson has been confirmed. Check your email for details.
            </p>

            <div className="rounded-xl border border-white/8 bg-[#0f1117] p-5 mb-6 text-left">
              <div className="text-xs text-slate-500 mb-1">Booking reference</div>
              <div className="text-xl font-mono font-bold text-blue-400 mb-4">{bookingRef}</div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2.5">
                  <User size={14} className="text-slate-500" />
                  <span className="text-slate-300">{instructor.name}</span>
                </div>
                {store.selectedDate && (
                  <div className="flex items-center gap-2.5">
                    <Calendar size={14} className="text-slate-500" />
                    <span className="text-slate-300">{store.selectedDate.split("-").reverse().join("/")}</span>
                  </div>
                )}
                {store.selectedSlot && (
                  <div className="flex items-center gap-2.5">
                    <Clock size={14} className="text-slate-500" />
                    <span className="text-slate-300">{formatTime(store.selectedSlot.startTime)} · {store.durationHours}h</span>
                  </div>
                )}
                <div className="flex items-center gap-2.5">
                  <MapPin size={14} className="text-slate-500" />
                  <span className="text-slate-300">{instructor.location.city} area</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Car size={14} className="text-slate-500" />
                  <span className="text-slate-300">{instructor.vehicle.make} {instructor.vehicle.model} · {store.transmission}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/8 flex justify-between">
                <span className="text-sm text-slate-500">Total paid</span>
                <span className="text-base font-bold text-white">{formatPrice(store.totalPriceInPence)}</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <Link href="/dashboard/student">
                <Button className="w-full" size="lg">
                  Go to Dashboard
                  <ArrowRight size={16} />
                </Button>
              </Link>
              <Link href="/instructors">
                <Button variant="ghost" className="w-full">
                  Find another instructor
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                  step <= 4 ? "bg-blue-600 text-white" : "bg-white/8 text-slate-500"
                )}
              >
                {step < 4 ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : step}
              </div>
              {step < 4 && <div className="w-12 h-px bg-white/10" />}
            </div>
          ))}
          <span className="ml-2 text-sm text-slate-500">Confirm booking</span>
        </div>

        <div className="space-y-5">
          <div className="rounded-xl border border-white/8 bg-[#0f1117] p-6">
            <h2 className="text-lg font-semibold text-white mb-5">Review your booking</h2>

            {/* Instructor */}
            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-white/8">
              <Avatar src={instructor.avatar} name={instructor.name} size="lg" />
              <div>
                <div className="text-base font-semibold text-white">{instructor.name}</div>
                <div className="text-sm text-slate-500">{instructor.location.city} · ADI #{instructor.adiNumber}</div>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <div className="text-xs text-slate-500 mb-1">Lesson type</div>
                <div className="text-sm font-medium text-white capitalize">{store.lessonType?.replace("-", " ")}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1">Transmission</div>
                <div className="text-sm font-medium text-white capitalize">{store.transmission}</div>
              </div>
              {store.selectedDate && (
                <div>
                  <div className="text-xs text-slate-500 mb-1">Date</div>
                  <div className="text-sm font-medium text-white">{store.selectedDate.split("-").reverse().join("/")}</div>
                </div>
              )}
              {store.selectedSlot && (
                <div>
                  <div className="text-xs text-slate-500 mb-1">Time</div>
                  <div className="text-sm font-medium text-white">{formatTime(store.selectedSlot.startTime)}</div>
                </div>
              )}
              <div>
                <div className="text-xs text-slate-500 mb-1">Duration</div>
                <div className="text-sm font-medium text-white">{store.durationHours} hour{store.durationHours > 1 ? "s" : ""}</div>
              </div>
              {store.studentDetails && (
                <div>
                  <div className="text-xs text-slate-500 mb-1">Student</div>
                  <div className="text-sm font-medium text-white">{store.studentDetails.name}</div>
                </div>
              )}
            </div>

            {/* Price breakdown */}
            <div className="rounded-lg bg-white/3 border border-white/6 p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Lesson fee ({store.durationHours}h × {formatPrice(instructor.pricePerHour)})</span>
                <span className="text-slate-300">{formatPrice(store.totalPriceInPence)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Platform fee</span>
                <span className="text-emerald-400">Free</span>
              </div>
              <div className="border-t border-white/8 pt-2 flex justify-between font-semibold">
                <span className="text-white">Total due today</span>
                <span className="text-xl text-white">{formatPrice(store.totalPriceInPence)}</span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleConfirm}
            loading={loading}
            className="w-full"
            size="lg"
          >
            Confirm Booking · {formatPrice(store.totalPriceInPence)}
          </Button>

          <p className="text-xs text-slate-600 text-center">
            By confirming, you agree to our Terms of Service and Cancellation Policy.
            Free cancellation up to 48 hours before your lesson.
          </p>
        </div>
      </div>
    </div>
  );
}
