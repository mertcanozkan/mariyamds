import Link from "next/link";
import { Car, Twitter, Instagram, Facebook, Linkedin } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "Find an Instructor", href: "/instructors" },
    { label: "How it Works", href: "/#how-it-works" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Become an Instructor", href: "/register?role=instructor" },
  ],
  Students: [
    { label: "Theory Test Help", href: "/dashboard/student/progress" },
    { label: "Book a Lesson", href: "/instructors" },
    { label: "Student Dashboard", href: "/dashboard/student" },
    { label: "FAQs", href: "#" },
  ],
  Instructors: [
    { label: "Instructor Dashboard", href: "/dashboard/instructor" },
    { label: "ADI Registration", href: "#" },
    { label: "Earnings Calculator", href: "#" },
    { label: "Support", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "DVSA Guidelines", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <Car size={16} className="text-white" />
              </div>
              <span className="font-bold text-lg text-white">
                Drive<span className="text-blue-400">Pass</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              The UK&apos;s leading platform connecting learner drivers with DVSA-approved driving instructors.
            </p>
            <div className="flex items-center gap-3">
              {[Twitter, Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-3">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} MCO-DS UK Ltd. All rights reserved. Registered in England & Wales.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              All systems operational
            </span>
            <span className="text-xs text-slate-600">DVSA Partner Platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
