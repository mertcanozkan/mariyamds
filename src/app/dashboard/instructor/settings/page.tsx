"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Check, ChevronDown, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

const inputClass =
  "w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors";

const selectClass =
  "w-full px-3 py-2.5 rounded-lg border border-white/10 bg-[#0f1117] text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors appearance-none";

type Form = {
  name: string; title: string; phone: string; bio: string; postcode: string;
  adiNumber: string; experience: string; transmission: string;
  pricePerHour: string; coverageRadius: string; specialisms: string; languages: string;
  vehicleMake: string; vehicleModel: string; vehicleYear: string;
  vehicleFuelType: string; vehicleTransmission: string;
};

const EMPTY: Form = {
  name: "", title: "", phone: "", bio: "", postcode: "",
  adiNumber: "", experience: "", transmission: "manual",
  pricePerHour: "", coverageRadius: "5", specialisms: "", languages: "English",
  vehicleMake: "", vehicleModel: "", vehicleYear: "",
  vehicleFuelType: "petrol", vehicleTransmission: "manual",
};

export default function InstructorSettingsPage() {
  const { data: session, update: updateSession } = useSession();
  const [form, setForm] = useState<Form>(EMPTY);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = (field: keyof Form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  // Load profile on mount
  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        setForm({
          name: data.name ?? "",
          title: data.title ?? "",
          phone: data.phone ?? "",
          bio: data.bio ?? "",
          postcode: data.postcode ?? "",
          adiNumber: data.adiNumber ?? "",
          experience: data.experience != null ? String(data.experience) : "",
          transmission: data.transmission ?? "manual",
          pricePerHour: data.pricePerHour != null ? String(data.pricePerHour / 100) : "",
          coverageRadius: data.coverageRadius != null ? String(data.coverageRadius) : "5",
          specialisms: data.specialisms ?? "",
          languages: data.languages ?? "English",
          vehicleMake: data.vehicleMake ?? "",
          vehicleModel: data.vehicleModel ?? "",
          vehicleYear: data.vehicleYear != null ? String(data.vehicleYear) : "",
          vehicleFuelType: data.vehicleFuelType ?? "petrol",
          vehicleTransmission: data.vehicleTransmission ?? "manual",
        });
        setAvatarUrl(data.image ?? undefined);
      })
      .finally(() => setLoading(false));
  }, []);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoUploading(true);
    setError("");
    const fd = new FormData();
    fd.append("photo", file);
    const res = await fetch("/api/profile/photo", { method: "POST", body: fd });
    const data = await res.json();
    setPhotoUploading(false);
    if (!res.ok) { setError(data.error ?? "Upload failed"); return; }
    setAvatarUrl(data.url);
    await updateSession(); // refresh session so navbar avatar updates
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        pricePerHour: form.pricePerHour ? Math.round(parseFloat(form.pricePerHour) * 100) : undefined,
        coverageRadius: form.coverageRadius ? parseInt(form.coverageRadius) : undefined,
        experience: form.experience ? parseInt(form.experience) : undefined,
        vehicleYear: form.vehicleYear ? parseInt(form.vehicleYear) : undefined,
      }),
    });
    setSaving(false);
    if (!res.ok) { const d = await res.json(); setError(d.error ?? "Save failed"); return; }
    await updateSession();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-64">
        <Loader2 size={24} className="animate-spin text-slate-500" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="p-6 md:p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Profile settings</h1>
        <p className="text-slate-400 text-sm">Manage your public instructor profile.</p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2.5 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-5">

        {/* ── Photo ───────────────────────────────────────────────── */}
        <div className="rounded-xl border border-white/8 bg-[#0f1117] p-5">
          <h2 className="text-base font-semibold text-white mb-4">Profile photo</h2>
          <div className="flex items-center gap-5">
            <div className="relative">
              <Avatar key={avatarUrl} src={avatarUrl} name={form.name || session?.user?.name || "?"} size="xl" />
              {photoUploading && (
                <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center">
                  <Loader2 size={18} className="animate-spin text-white" />
                </div>
              )}
            </div>
            <div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={photoUploading}
              >
                <Camera size={14} />
                {photoUploading ? "Uploading…" : "Change photo"}
              </Button>
              <p className="text-xs text-slate-600 mt-1.5">JPG, PNG or WebP · max 5 MB</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </div>
        </div>

        {/* ── Personal info ────────────────────────────────────────── */}
        <div className="rounded-xl border border-white/8 bg-[#0f1117] p-5">
          <h2 className="text-base font-semibold text-white mb-4">Personal information</h2>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1.5 block">Title</label>
              <div className="relative">
                <select value={form.title} onChange={set("title")} className={selectClass}>
                  <option value="">—</option>
                  {["Mr","Mrs","Miss","Ms","Dr","Other"].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              </div>
            </div>
            <div className="col-span-2">
              <label className="text-xs font-medium text-slate-400 mb-1.5 block">Full name</label>
              <input type="text" value={form.name} onChange={set("name")} placeholder="Alex Johnson" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1.5 block">Email address</label>
              <input
                type="email"
                value={session?.user?.email ?? ""}
                disabled
                className={cn(inputClass, "opacity-50 cursor-not-allowed")}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1.5 block">Phone number</label>
              <input type="tel" value={form.phone} onChange={set("phone")} placeholder="07700 900000" className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1.5 block">Home postcode</label>
              <input type="text" value={form.postcode} onChange={set("postcode")} placeholder="SW1A 1AA" className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1.5 block">ADI number</label>
              <input type="text" value={form.adiNumber} onChange={set("adiNumber")} placeholder="123456" className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1.5 block">Years of experience</label>
              <input type="number" value={form.experience} onChange={set("experience")} placeholder="5" min="0" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-400 mb-1.5 block">Bio</label>
            <textarea
              value={form.bio}
              onChange={set("bio")}
              rows={4}
              placeholder="Tell students about yourself, your teaching style and experience…"
              className={cn(inputClass, "resize-none")}
            />
          </div>
        </div>

        {/* ── Pricing & reach ─────────────────────────────────────── */}
        <div className="rounded-xl border border-white/8 bg-[#0f1117] p-5">
          <h2 className="text-base font-semibold text-white mb-4">Pricing & reach</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1.5 block">Hourly rate (£)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">£</span>
                <input
                  type="number"
                  value={form.pricePerHour}
                  onChange={set("pricePerHour")}
                  placeholder="38"
                  min="0"
                  step="0.50"
                  className={cn(inputClass, "pl-7")}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1.5 block">Coverage radius (miles)</label>
              <input type="number" value={form.coverageRadius} onChange={set("coverageRadius")} placeholder="5" min="1" max="50" className={inputClass} />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-xs font-medium text-slate-400 mb-1.5 block">Transmission offered</label>
            <div className="flex gap-2">
              {["manual", "automatic", "both"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, transmission: t }))}
                  className={cn(
                    "flex-1 py-2 rounded-lg text-xs font-medium capitalize border transition-all",
                    form.transmission === t
                      ? "bg-blue-600 border-blue-500 text-white"
                      : "border-white/10 bg-white/5 text-slate-400 hover:text-white"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-400 mb-1.5 block">Specialisms (comma-separated)</label>
            <input
              type="text"
              value={form.specialisms}
              onChange={set("specialisms")}
              placeholder="Motorway lessons, Test prep, Nervous pupils"
              className={inputClass}
            />
          </div>
        </div>

        {/* ── Vehicle ──────────────────────────────────────────────── */}
        <div className="rounded-xl border border-white/8 bg-[#0f1117] p-5">
          <h2 className="text-base font-semibold text-white mb-4">Teaching vehicle</h2>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1.5 block">Make</label>
              <input type="text" value={form.vehicleMake} onChange={set("vehicleMake")} placeholder="Ford" className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1.5 block">Model</label>
              <input type="text" value={form.vehicleModel} onChange={set("vehicleModel")} placeholder="Fiesta" className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1.5 block">Year</label>
              <input type="number" value={form.vehicleYear} onChange={set("vehicleYear")} placeholder="2022" className={inputClass} />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1.5 block">Fuel type</label>
              <div className="relative">
                <select value={form.vehicleFuelType} onChange={set("vehicleFuelType")} className={selectClass}>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="electric">Electric (EV)</option>
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              </div>
            </div>
            <div className="col-span-2">
              <label className="text-xs font-medium text-slate-400 mb-1.5 block">Vehicle transmission</label>
              <div className="flex gap-2">
                {["manual", "automatic"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, vehicleTransmission: t }))}
                    className={cn(
                      "flex-1 py-2 rounded-lg text-xs font-medium capitalize border transition-all",
                      form.vehicleTransmission === t
                        ? "bg-blue-600 border-blue-500 text-white"
                        : "border-white/10 bg-white/5 text-slate-400 hover:text-white"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Button type="submit" loading={saving} className="w-full" size="lg">
          {saved ? <><Check size={16} /> Saved</> : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
