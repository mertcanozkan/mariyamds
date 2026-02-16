"use client";

import { FormEvent, useState } from "react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  level: string;
  message: string;
  consent: boolean;
};

const initialData: FormData = {
  name: "",
  email: "",
  phone: "",
  level: "Beginner",
  message: "",
  consent: false
};

export default function BookingForm() {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) nextErrors.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = "Enter a valid email address.";
    if (!/^\+?[0-9\s-]{8,}$/.test(formData.phone)) nextErrors.phone = "Enter a valid phone number.";
    if (!formData.message.trim()) nextErrors.message = "Please share your goals or availability.";
    if (!formData.consent) nextErrors.consent = "You must consent before submitting.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitted(true);
    setFormData(initialData);
    setErrors({});
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-sm text-emerald-100" role="status" aria-live="polite">
        Thank you. Your booking request has been received. We will contact you shortly to confirm your lesson slot.
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-4 inline-flex rounded-full border border-emerald-300/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-100"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-semibold text-white">Name</label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          value={formData.name}
          onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-brand-accent focus:outline-none"
        />
        {errors.name ? <p className="mt-1 text-xs text-red-300">{errors.name}</p> : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-semibold text-white">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-brand-accent focus:outline-none"
          />
          {errors.email ? <p className="mt-1 text-xs text-red-300">{errors.email}</p> : null}
        </div>

        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-semibold text-white">Phone</label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-brand-accent focus:outline-none"
          />
          {errors.phone ? <p className="mt-1 text-xs text-red-300">{errors.phone}</p> : null}
        </div>
      </div>

      <div>
        <label htmlFor="level" className="mb-1 block text-sm font-semibold text-white">Experience Level</label>
        <select
          id="level"
          value={formData.level}
          onChange={(event) => setFormData((prev) => ({ ...prev, level: event.target.value }))}
          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none"
        >
          <option className="text-brand-ink">Beginner</option>
          <option className="text-brand-ink">Some Driving Experience</option>
          <option className="text-brand-ink">Test Preparation</option>
          <option className="text-brand-ink">Refresher Lessons</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-semibold text-white">Message</label>
        <textarea
          id="message"
          rows={4}
          value={formData.message}
          onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-brand-accent focus:outline-none"
          placeholder="Share your availability, confidence level, or goals."
        />
        {errors.message ? <p className="mt-1 text-xs text-red-300">{errors.message}</p> : null}
      </div>

      <label className="flex items-start gap-3 rounded-xl border border-white/20 bg-white/5 p-3 text-xs text-white/80">
        <input
          type="checkbox"
          checked={formData.consent}
          onChange={(event) => setFormData((prev) => ({ ...prev, consent: event.target.checked }))}
          className="mt-0.5 h-4 w-4 rounded border-white/30"
        />
        I consent to Mariyam DS storing my details to respond to this booking enquiry, in line with UK GDPR.
      </label>
      {errors.consent ? <p className="-mt-2 text-xs text-red-300">{errors.consent}</p> : null}

      <button type="submit" className="w-full rounded-full bg-brand-accent px-5 py-3 text-sm font-bold text-brand-ink transition hover:bg-brand-coral">
        Send Booking Request
      </button>
    </form>
  );
}
