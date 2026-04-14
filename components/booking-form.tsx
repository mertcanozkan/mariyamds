"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type FormData = {
  title: string;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  phone: string;
  licenceType: string;
  experience: string;
  preferredDate: string;
  preferredTime: string;
  duration: string;
  postcode: string;
  consent: boolean;
};

const initial: FormData = {
  title: "",
  firstName: "",
  lastName: "",
  dob: "",
  email: "",
  phone: "",
  licenceType: "",
  experience: "",
  preferredDate: "",
  preferredTime: "",
  duration: "",
  postcode: "",
  consent: false
};

type Errors = Partial<Record<keyof FormData, string>>;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  if (!data.title) errors.title = "Please select a title.";
  if (!data.firstName.trim()) errors.firstName = "First name is required.";
  if (!data.lastName.trim()) errors.lastName = "Last name is required.";
  if (!data.dob) {
    errors.dob = "Date of birth is required.";
  } else {
    const age = (Date.now() - new Date(data.dob).getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    if (age < 16) errors.dob = "You must be at least 16 years old.";
    if (age > 100) errors.dob = "Please enter a valid date of birth.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Enter a valid email address.";
  if (!/^\+?[0-9\s\-()]{8,}$/.test(data.phone)) errors.phone = "Enter a valid phone number.";
  if (!data.licenceType) errors.licenceType = "Please select a licence type.";
  if (!data.experience) errors.experience = "Please select your experience level.";
  if (!data.preferredDate) errors.preferredDate = "Please choose a preferred date.";
  if (!data.preferredTime) errors.preferredTime = "Please choose a preferred time.";
  if (!data.duration) errors.duration = "Please select a lesson duration.";
  if (!/^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$/i.test(data.postcode.trim()))
    errors.postcode = "Enter a valid UK postcode.";
  if (!data.consent) errors.consent = "You must consent before submitting.";
  return errors;
}

const inputClass =
  "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-brand-accent focus:outline-none transition-colors";
const selectClass =
  "w-full rounded-xl border border-white/20 bg-brand-deep px-4 py-3 text-sm text-white focus:border-brand-accent focus:outline-none transition-colors appearance-none";
const labelClass = "mb-1 block text-sm font-semibold text-white/90";
const errorClass = "mt-1 text-xs text-brand-accent";

function Field({ error, children }: { error?: string; children: React.ReactNode }) {
  return (
    <div>
      {children}
      {error ? <p className={errorClass}>{error}</p> : null}
    </div>
  );
}

// Today's date in YYYY-MM-DD for min date constraint
const today = new Date().toISOString().split("T")[0];

export default function BookingForm() {
  const [data, setData] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus("loading");
    setServerError("");

    const payload = {
      title: data.title,
      first_name: data.firstName,
      last_name: data.lastName,
      full_name: `${data.title} ${data.firstName} ${data.lastName}`,
      date_of_birth: data.dob,
      email: data.email,
      phone: data.phone,
      licence_type: data.licenceType,
      experience: data.experience,
      preferred_date: data.preferredDate,
      preferred_time: data.preferredTime,
      duration_hours: data.duration,
      postcode: data.postcode.toUpperCase()
    };

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error((json as { error?: string }).error ?? "Submission failed.");
      }
      setStatus("success");
      setData(initial);
      setErrors({});
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-brand-accent/40 bg-brand-accent/10 p-8 text-center" role="status" aria-live="polite">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-accent/20">
          <svg width="28" height="28" fill="none" stroke="#B4FF00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-heading text-2xl text-white">Booking Request Sent!</h3>
        <p className="mt-2 text-sm text-white/70">
          Thank you. Your lesson request has been received and Mariyam will be in touch shortly to confirm your slot.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full border border-brand-accent/50 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-brand-soft transition hover:border-brand-accent hover:text-brand-accent"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Row 1 — Title + First Name + Last Name */}
      <div className="grid gap-4 sm:grid-cols-[140px_1fr_1fr]">
        <Field error={errors.title}>
          <label htmlFor="title" className={labelClass}>Title</label>
          <select id="title" value={data.title} onChange={(e) => set("title", e.target.value)} className={selectClass}>
            <option value="" disabled className="text-white/40">Select…</option>
            {["Mr.", "Mrs.", "Miss", "Ms.", "Dr.", "Other"].map((t) => (
              <option key={t} value={t} className="text-brand-ink bg-white">{t}</option>
            ))}
          </select>
        </Field>

        <Field error={errors.firstName}>
          <label htmlFor="firstName" className={labelClass}>First Name</label>
          <input
            id="firstName"
            type="text"
            autoComplete="given-name"
            value={data.firstName}
            onChange={(e) => set("firstName", e.target.value)}
            className={inputClass}
            placeholder="Jane"
          />
        </Field>

        <Field error={errors.lastName}>
          <label htmlFor="lastName" className={labelClass}>Last Name</label>
          <input
            id="lastName"
            type="text"
            autoComplete="family-name"
            value={data.lastName}
            onChange={(e) => set("lastName", e.target.value)}
            className={inputClass}
            placeholder="Smith"
          />
        </Field>
      </div>

      {/* Row 2 — Date of Birth */}
      <Field error={errors.dob}>
        <label htmlFor="dob" className={labelClass}>Date of Birth</label>
        <input
          id="dob"
          type="date"
          autoComplete="bday"
          max={new Date(Date.now() - 16 * 365.25 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
          value={data.dob}
          onChange={(e) => set("dob", e.target.value)}
          className={inputClass}
        />
      </Field>

      {/* Row 3 — Email + Phone */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field error={errors.email}>
          <label htmlFor="email" className={labelClass}>Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={data.email}
            onChange={(e) => set("email", e.target.value)}
            className={inputClass}
            placeholder="jane@example.com"
          />
        </Field>

        <Field error={errors.phone}>
          <label htmlFor="phone" className={labelClass}>Phone</label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            value={data.phone}
            onChange={(e) => set("phone", e.target.value)}
            className={inputClass}
            placeholder="+44 7700 900000"
          />
        </Field>
      </div>

      {/* Row 3 — Licence Type + Experience */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field error={errors.licenceType}>
          <label htmlFor="licenceType" className={labelClass}>Licence Type</label>
          <select id="licenceType" value={data.licenceType} onChange={(e) => set("licenceType", e.target.value)} className={selectClass}>
            <option value="" disabled className="text-white/40">Select…</option>
            {["Provisional", "Full UK", "Foreign"].map((l) => (
              <option key={l} value={l} className="text-brand-ink bg-white">{l}</option>
            ))}
          </select>
        </Field>

        <Field error={errors.experience}>
          <label htmlFor="experience" className={labelClass}>Experience</label>
          <select id="experience" value={data.experience} onChange={(e) => set("experience", e.target.value)} className={selectClass}>
            <option value="" disabled className="text-white/40">Select…</option>
            {["Beginner", "Intermediate", "Experienced", "Refresher"].map((x) => (
              <option key={x} value={x} className="text-brand-ink bg-white">{x}</option>
            ))}
          </select>
        </Field>
      </div>

      {/* Row 4 — Preferred Date + Time */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field error={errors.preferredDate}>
          <label htmlFor="preferredDate" className={labelClass}>Preferred Date</label>
          <input
            id="preferredDate"
            type="date"
            min={today}
            value={data.preferredDate}
            onChange={(e) => set("preferredDate", e.target.value)}
            className={inputClass}
          />
        </Field>

        <Field error={errors.preferredTime}>
          <label htmlFor="preferredTime" className={labelClass}>Preferred Time</label>
          <input
            id="preferredTime"
            type="time"
            value={data.preferredTime}
            onChange={(e) => set("preferredTime", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      {/* Row 5 — Duration + Postcode */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field error={errors.duration}>
          <label htmlFor="duration" className={labelClass}>Lesson Duration</label>
          <select id="duration" value={data.duration} onChange={(e) => set("duration", e.target.value)} className={selectClass}>
            <option value="" disabled className="text-white/40">Select…</option>
            <option value="1" className="text-brand-ink bg-white">1 hour</option>
            <option value="1.5" className="text-brand-ink bg-white">1.5 hours</option>
            <option value="2" className="text-brand-ink bg-white">2 hours</option>
          </select>
        </Field>

        <Field error={errors.postcode}>
          <label htmlFor="postcode" className={labelClass}>Postcode</label>
          <input
            id="postcode"
            type="text"
            autoComplete="postal-code"
            value={data.postcode}
            onChange={(e) => set("postcode", e.target.value.toUpperCase())}
            className={inputClass}
            placeholder="N16 0AB"
            maxLength={8}
          />
        </Field>
      </div>

      {/* Consent */}
      <Field error={errors.consent}>
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/20 bg-white/5 p-3 text-xs text-white/80 transition hover:border-white/30">
          <input
            type="checkbox"
            checked={data.consent}
            onChange={(e) => set("consent", e.target.checked)}
            className="mt-0.5 h-4 w-4 flex-shrink-0 accent-brand-accent"
          />
          I consent to Mariyam DS storing my details to respond to this booking enquiry, in accordance with the{" "}
          <Link href="/privacy-policy" className="text-brand-accent underline">Privacy Policy</Link> and UK GDPR.
        </label>
      </Field>

      {serverError ? (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">{serverError}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-brand-accent px-5 py-3 text-sm font-bold text-brand-ink transition hover:bg-brand-coral disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send Booking Request"}
      </button>
    </form>
  );
}
