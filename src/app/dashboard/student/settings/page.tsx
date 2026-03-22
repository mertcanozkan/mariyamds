"use client";

import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";

export default function StudentSettingsPage() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
        <p className="text-slate-400 text-sm">Manage your account preferences.</p>
      </div>

      <div className="space-y-5">
        {/* Profile */}
        <div className="rounded-xl border border-white/8 bg-[#0f1117] p-5">
          <h2 className="text-base font-semibold text-white mb-4">Profile</h2>
          <div className="flex items-center gap-4 mb-5">
            <Avatar name={user?.name || "User"} size="xl" />
            <Button variant="outline" size="sm">Change photo</Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Full name", value: user?.name || "" },
              { label: "Email address", value: user?.email || "" },
              { label: "Phone number", value: "07123 456789" },
              { label: "Home postcode", value: "SW1A 1AA" },
            ].map((field) => (
              <div key={field.label}>
                <label className="text-xs font-medium text-slate-400 mb-1.5 block">{field.label}</label>
                <input
                  defaultValue={field.value}
                  className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-xl border border-white/8 bg-[#0f1117] p-5">
          <h2 className="text-base font-semibold text-white mb-4">Notifications</h2>
          <div className="space-y-3">
            {[
              "Lesson reminders (24h before)",
              "Booking confirmations",
              "Review reminders",
              "MCO-DS news and updates",
            ].map((item, i) => (
              <label key={item} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-slate-300">{item}</span>
                <div className={`relative w-10 h-5 rounded-full transition-all ${i < 2 ? "bg-blue-600" : "bg-white/10"}`}>
                  <div
                    className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all"
                    style={{ left: i < 2 ? "22px" : "2px" }}
                  />
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Danger zone */}
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
          <h2 className="text-base font-semibold text-red-400 mb-2">Danger zone</h2>
          <p className="text-sm text-slate-500 mb-4">Permanently delete your account and all associated data.</p>
          <Button variant="danger" size="sm">Delete account</Button>
        </div>

        <Button onClick={handleSave} className="w-full" size="lg">
          {saved ? "✓ Changes saved" : "Save changes"}
        </Button>
      </div>
    </div>
  );
}
