"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Car, ChevronDown, User, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import { cn } from "@/lib/utils/cn";

const navLinks = [
  { label: "Find an Instructor", href: "/instructors" },
  { label: "Courses", href: "/courses" },
  { label: "How it Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close user menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close user menu on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setUserMenuOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/8 py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="MCO-DS UK home">
            <div
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.4)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] transition-all"
              aria-hidden="true"
            >
              <Car size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg text-white">
              MCO<span className="text-blue-400">-DS</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation">
            <ul className="hidden md:flex items-center gap-1 list-none">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm transition-colors",
                      pathname === link.href
                        ? "text-white bg-white/8"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  aria-expanded={userMenuOpen}
                  aria-haspopup="menu"
                  aria-label={`User menu for ${user.name}`}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
                >
                  <Avatar name={user.name} size="sm" />
                  <span className="text-sm text-slate-200 font-medium">{user.name.split(" ")[0]}</span>
                  <ChevronDown
                    size={14}
                    aria-hidden="true"
                    className={cn("text-slate-400 transition-transform duration-200", userMenuOpen && "rotate-180")}
                  />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      role="menu"
                      aria-label="User account menu"
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-[#161b27] shadow-xl p-1 z-50"
                    >
                      <Link
                        href={`/dashboard/${user.role}`}
                        role="menuitem"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/8 transition-colors"
                      >
                        <LayoutDashboard size={14} aria-hidden="true" />
                        Dashboard
                      </Link>
                      <Link
                        href={`/dashboard/${user.role}/settings`}
                        role="menuitem"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/8 transition-colors"
                      >
                        <User size={14} aria-hidden="true" />
                        Profile
                      </Link>
                      <div className="my-1 border-t border-white/8" role="separator" />
                      <button
                        role="menuitem"
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut size={14} aria-hidden="true" />
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">Log in</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/8 transition-colors"
          >
            {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[60px] left-0 right-0 z-40 bg-[#0f1117] border-b border-white/8 overflow-hidden"
          >
            <nav aria-label="Mobile navigation">
              <ul className="px-4 py-4 space-y-1 list-none">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={pathname === link.href ? "page" : undefined}
                      className="block px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/8 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="px-4 pb-4 border-t border-white/8 pt-3 flex flex-col gap-2">
                {isAuthenticated && user ? (
                  <>
                    <Link href={`/dashboard/${user.role}`}>
                      <Button variant="outline" size="md" className="w-full">Dashboard</Button>
                    </Link>
                    <Button variant="ghost" size="md" onClick={logout} className="w-full text-red-400">
                      Sign out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="outline" size="md" className="w-full">Log in</Button>
                    </Link>
                    <Link href="/register">
                      <Button size="md" className="w-full">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
