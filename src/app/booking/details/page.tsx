"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useBookingStore } from "@/lib/store/bookingStore";
import { MOCK_INSTRUCTORS } from "@/lib/mock-data/instructors";
import { formatPrice, formatTime } from "@/lib/utils/formatters";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

interface FormData {
  name: string;
  email: string;
  phone: string;
  postcode: string;
  notes: string;
  acceptPolicy: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  postcode?: string;
  acceptPolicy?: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Full name is required";
  if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = "Valid email required";
  if (!data.phone.match(/^(\+44|0)[0-9]{10}$/)) errors.phone = "Valid UK phone number required (e.g. 07123456789)";
  if (!data.postcode.match(/^[A-Z]{1,2}[0-9][0-9A-Z]?\s*[0-9][A-Z]{2}$/i)) errors.postcode = "Valid UK postcode required";
  if (!data.acceptPolicy) errors.acceptPolicy = "You must accept the cancellation policy";
  return errors;
}

export default function DetailsPage() {
  const router = useRouter();
  const { instructorId, lessonType, transmission, selectedDate, selectedSlot, durationHours, totalPriceInPence, setStudentDetails, setStep } = useBookingStore();

  const instructor = MOCK_INSTRUCTORS.find((i) => i.id === instructorId) || MOCK_INSTRUCTORS[0];

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    postcode: "",
    notes: "",
    acceptPolicy: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (touched[field]) {
      setErrors(validate({ ...form, [field]: value }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.keys(form).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setStudentDetails({
        name: form.name,
        email: form.email,
        phone: form.phone,
        postcode: form.postcode,
        notes: form.notes,
      });
      setStep(4);
      router.push("/booking/confirm");
    }
  };

  const Field = ({
    label,
    field,
    type = "text",
    placeholder,
  }: {
    label: string;
    field: keyof FormData;
    type?: string;
    placeholder?: string;
  }) => (
    <div>
      <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
      <input
        type={type}
        value={form[field] as string}
        onChange={(e) => handleChange(field, e.target.value)}
        onBlur={() => handleBlur(field as string)}
        placeholder={placeholder}
        className={cn(
          "w-full px-3 py-2.5 rounded-lg border bg-white/5 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-colors",
          errors[field as keyof FormErrors] && touched[field as string]
            ? "border-red-500/50 focus:border-red-500"
            : "border-white/10 focus:border-blue-500/50"
        )}
      />
      {errors[field as keyof FormErrors] && touched[field as string] && (
        <p className="text-xs text-red-400 mt-1">{errors[field as keyof FormErrors]}</p>
      )}
    </div>
  );

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
                  step <= 3 ? "bg-blue-600 text-white" : "bg-white/8 text-slate-500"
                )}
              >
                {step < 3 ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : step}
              </div>
              {step < 4 && <div className="w-12 h-px bg-white/10" />}
            </div>
          ))}
          <span className="ml-2 text-sm text-slate-500">Your details</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="rounded-xl border border-white/8 bg-[#0f1117] p-5 space-y-4">
                <h2 className="text-base font-semibold text-white mb-1">Your details</h2>
                <Field label="Full name" field="name" placeholder="Alex Johnson" />
                <Field label="Email address" field="email" type="email" placeholder="alex@example.com" />
                <Field label="Phone number" field="phone" placeholder="07123 456789" />
                <Field label="Home postcode" field="postcode" placeholder="SW1A 1AA" />
              </div>

              <div className="rounded-xl border border-white/8 bg-[#0f1117] p-5">
                <h2 className="text-base font-semibold text-white mb-3">Notes for your instructor</h2>
                <textarea
                  value={form.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  placeholder="Anything your instructor should know? (e.g. previous experience, areas to focus on, accessibility needs)"
                  rows={4}
                  className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                />
              </div>

              <div className="rounded-xl border border-white/8 bg-[#0f1117] p-5">
                <label className="flex items-start gap-3 cursor-pointer">
                  <div
                    className={cn(
                      "mt-0.5 w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-all",
                      form.acceptPolicy ? "bg-blue-600 border-blue-500" : "border-white/20 bg-white/5"
                    )}
                    onClick={() => handleChange("acceptPolicy", !form.acceptPolicy)}
                  >
                    {form.acceptPolicy && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-slate-400">
                    I agree to the <span className="text-blue-400 cursor-pointer hover:text-blue-300">cancellation policy</span>. Lessons cancelled with less than 48 hours notice may be charged in full.
                  </span>
                </label>
                {errors.acceptPolicy && touched.acceptPolicy && (
                  <p className="text-xs text-red-400 mt-2 ml-8">{errors.acceptPolicy}</p>
                )}
              </div>

              <Button type="submit" className="w-full" size="lg">
                Review booking
                <ArrowRight size={16} />
              </Button>
            </form>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-white/8 bg-[#0f1117] p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Booking summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Instructor</span>
                  <span className="text-slate-300">{instructor.name.split(" ")[0]}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Lesson type</span>
                  <span className="text-slate-300 capitalize">{lessonType?.replace("-", " ")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Gearbox</span>
                  <span className="text-slate-300 capitalize">{transmission}</span>
                </div>
                {selectedDate && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Date</span>
                    <span className="text-slate-300">{selectedDate.split("-").reverse().join("/")}</span>
                  </div>
                )}
                {selectedSlot && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Time</span>
                    <span className="text-slate-300">{formatTime(selectedSlot.startTime)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Duration</span>
                  <span className="text-slate-300">{durationHours}h</span>
                </div>
                <div className="border-t border-white/8 pt-3 flex justify-between">
                  <span className="text-sm font-semibold text-white">Total</span>
                  <span className="text-lg font-bold text-white">{formatPrice(totalPriceInPence)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
