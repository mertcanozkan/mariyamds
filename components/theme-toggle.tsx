"use client";

import { useEffect, useState } from "react";

function setTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  window.localStorage.setItem("theme", theme);
}

export default function ThemeToggle() {
  const [theme, setThemeState] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = window.localStorage.getItem("theme") as "light" | "dark" | null;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved ?? (systemDark ? "dark" : "light");
    setThemeState(initial);
    setTheme(initial);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setThemeState(next);
    setTheme(next);
  };

  return (
    <div className="force-light-text group fixed right-4 top-1/2 z-40 -translate-y-1/2">
      <button
        type="button"
        onClick={toggle}
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-brand-ink/85 text-brand-accent shadow-glow backdrop-blur transition hover:scale-105 hover:border-brand-accent dark:border-white/20 dark:bg-brand-ink/85"
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {theme === "dark" ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8" aria-hidden>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6M18.7 18.7l-1.6-1.6M6.9 6.9L5.3 5.3" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
            <path d="M20.6 14.8a8.6 8.6 0 1 1-11.4-11A9 9 0 0 0 20.6 14.8z" />
          </svg>
        )}
      </button>
      <span className="pointer-events-none absolute right-14 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/20 bg-brand-ink/90 px-3 py-1 text-xs text-white/85 shadow-card md:group-hover:block">
        {theme === "dark" ? "Light mode" : "Dark mode"}
      </span>
    </div>
  );
}
