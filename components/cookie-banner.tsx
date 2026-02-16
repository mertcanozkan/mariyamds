"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = window.localStorage.getItem("cookie-consent");
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    window.localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="force-light-text fixed bottom-24 left-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 rounded-2xl border border-white/20 bg-brand-ink/90 p-4 shadow-glow backdrop-blur md:bottom-6">
      <p className="text-xs text-white/80 md:text-sm">
        We use essential cookies to improve your browsing experience. Analytics integration is optional and can be configured later.
        See our <Link href="/privacy-policy" className="text-brand-accent underline">Privacy Policy</Link>.
      </p>
      <button
        type="button"
        onClick={accept}
        className="mt-3 rounded-full bg-brand-accent px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-ink"
      >
        Accept
      </button>
    </div>
  );
}
