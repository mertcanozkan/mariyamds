"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Car, ArrowRight, ChevronDown } from "lucide-react";
import { signIn } from "next-auth/react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

const inputClass =
  "w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors";

const selectClass =
  "w-full px-3 py-2.5 rounded-lg border border-white/10 bg-[#0f1117] text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors appearance-none";

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="text-xs font-medium text-slate-400 mb-1.5 block">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={selectClass}
        >
          <option value="" disabled>Select…</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
      </div>
    </div>
  );
}

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = (searchParams.get("role") as "student" | "instructor") || null;

  const [role, setRole] = useState<"student" | "instructor" | null>(defaultRole);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    postcode: "",
    // student
    transmission: "manual",
    // instructor
    adiNumber: "",
    experience: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    vehicleFuelType: "",
    vehicleTransmission: "",
  });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const name = `${form.firstName} ${form.lastName}`.trim();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, name, role }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Registration failed. Please try again.");
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Account created but sign-in failed. Please log in.");
      router.push("/login");
    } else {
      router.push(`/dashboard/${role}`);
      router.refresh();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-sm"
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Create an account</h1>
        <p className="text-slate-400 text-sm">Join MCO-DS UK for free</p>
      </div>

      {/* Role selection */}
      {!role && (
        <div className="space-y-3">
          <p className="text-sm text-slate-400 text-center">I am a…</p>

          <button
            onClick={() => setRole("student")}
            className="w-full rounded-xl border border-white/10 bg-[#0f1117] hover:border-blue-500/40 hover:bg-blue-500/5 p-5 flex items-center gap-4 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center">
              <GraduationCap size={22} className="text-blue-400" />
            </div>
            <div className="text-left">
              <div className="text-base font-semibold text-white">Student</div>
              <div className="text-xs text-slate-500">Find and book driving lessons</div>
            </div>
            <ArrowRight size={16} className="text-slate-600 group-hover:text-blue-400 ml-auto transition-colors" />
          </button>

          <button
            onClick={() => setRole("instructor")}
            className="w-full rounded-xl border border-white/10 bg-[#0f1117] hover:border-violet-500/40 hover:bg-violet-500/5 p-5 flex items-center gap-4 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center">
              <Car size={22} className="text-violet-400" />
            </div>
            <div className="text-left">
              <div className="text-base font-semibold text-white">Driving Instructor</div>
              <div className="text-xs text-slate-500">Grow your business with MCO-DS</div>
            </div>
            <ArrowRight size={16} className="text-slate-600 group-hover:text-violet-400 ml-auto transition-colors" />
          </button>
        </div>
      )}

      {/* Registration form */}
      <AnimatePresence>
        {role && (
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2.5 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Role indicator */}
            <div
              className={cn(
                "flex items-center gap-2 p-3 rounded-lg border",
                role === "student"
                  ? "border-blue-500/25 bg-blue-500/8"
                  : "border-violet-500/25 bg-violet-500/8"
              )}
            >
              {role === "student" ? (
                <GraduationCap size={14} className="text-blue-400" />
              ) : (
                <Car size={14} className="text-violet-400" />
              )}
              <span className={cn("text-sm font-medium capitalize", role === "student" ? "text-blue-300" : "text-violet-300")}>
                Registering as {role}
              </span>
              <button
                type="button"
                onClick={() => setRole(null)}
                className="ml-auto text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                Change
              </button>
            </div>

            {/* Title */}
            <SelectField
              label="Title"
              value={form.title}
              onChange={(v) => setForm((f) => ({ ...f, title: v }))}
              options={[
                { value: "Mr", label: "Mr" },
                { value: "Mrs", label: "Mrs" },
                { value: "Miss", label: "Miss" },
                { value: "Ms", label: "Ms" },
                { value: "Dr", label: "Dr" },
                { value: "Other", label: "Other" },
              ]}
            />

            {/* First & Last name */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-400 mb-1.5 block">First name</label>
                <input type="text" value={form.firstName} onChange={set("firstName")} placeholder="Alex" className={inputClass} />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-400 mb-1.5 block">Last name</label>
                <input type="text" value={form.lastName} onChange={set("lastName")} placeholder="Johnson" className={inputClass} />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1.5 block">Email address</label>
              <input type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" className={inputClass} />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1.5 block">Password</label>
              <input type="password" value={form.password} onChange={set("password")} placeholder="••••••••" className={inputClass} />
            </div>

            {/* Postcode */}
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1.5 block">Home postcode</label>
              <input type="text" value={form.postcode} onChange={set("postcode")} placeholder="SW1A 1AA" className={inputClass} />
            </div>

            {/* Student-only fields */}
            {role === "student" && (
              <div>
                <label className="text-xs font-medium text-slate-400 mb-1.5 block">Transmission preference</label>
                <div className="flex gap-2">
                  {["manual", "automatic"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, transmission: t }))}
                      className={cn(
                        "flex-1 py-2 rounded-lg text-xs font-medium capitalize border transition-all",
                        form.transmission === t
                          ? "bg-blue-600 border-blue-500 text-white"
                          : "border-white/10 bg-white/5 text-slate-400"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Instructor-only fields */}
            {role === "instructor" && (
              <>
                <div>
                  <label className="text-xs font-medium text-slate-400 mb-1.5 block">ADI number</label>
                  <input type="text" value={form.adiNumber} onChange={set("adiNumber")} placeholder="123456" className={inputClass} />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-400 mb-1.5 block">Years of experience</label>
                  <input type="number" value={form.experience} onChange={set("experience")} placeholder="5" className={inputClass} />
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex-1 h-px bg-white/8" />
                  <span className="text-xs text-slate-600">Vehicle details</span>
                  <div className="flex-1 h-px bg-white/8" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-400 mb-1.5 block">Make</label>
                    <input type="text" value={form.vehicleMake} onChange={set("vehicleMake")} placeholder="Ford" className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-400 mb-1.5 block">Model</label>
                    <input type="text" value={form.vehicleModel} onChange={set("vehicleModel")} placeholder="Fiesta" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-400 mb-1.5 block">Year</label>
                  <input type="number" value={form.vehicleYear} onChange={set("vehicleYear")} placeholder="2022" className={inputClass} />
                </div>

                <SelectField
                  label="Fuel type"
                  value={form.vehicleFuelType}
                  onChange={(v) => setForm((f) => ({ ...f, vehicleFuelType: v }))}
                  options={[
                    { value: "petrol", label: "Petrol" },
                    { value: "diesel", label: "Diesel" },
                    { value: "hybrid", label: "Hybrid" },
                    { value: "electric", label: "Electric (EV)" },
                  ]}
                />

                <SelectField
                  label="Transmission"
                  value={form.vehicleTransmission}
                  onChange={(v) => setForm((f) => ({ ...f, vehicleTransmission: v }))}
                  options={[
                    { value: "manual", label: "Manual" },
                    { value: "automatic", label: "Automatic" },
                  ]}
                />
              </>
            )}

            <Button type="submit" loading={loading} className="w-full" size="lg">
              Create account
            </Button>
          </motion.form>
        )}
      </AnimatePresence>

      <p className="text-center text-sm text-slate-500 mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterContent />
    </Suspense>
  );
}
