"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
}

/**
 * Floating glass navbar. Pure CSS mobile menu (peer checkbox) — no client JS.
 */
export default function Navbar({ navItems }: { navItems: NavItem[] }) {
  const pathname = usePathname();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 w-full border-b border-white/10 bg-[#080c18]/70 shadow-lg shadow-black/20 backdrop-blur-xl">
      <div className="pointer-events-auto mx-auto flex max-w-container items-center justify-between gap-4 px-6 py-4">
        {/* Desktop nav — all options inline, centered (Contact lives in the button) */}
        <nav className="hidden items-center justify-center gap-x-6 lg:flex lg:flex-1 xl:gap-x-8">
          {navItems.filter((item) => item.href !== "/contact").map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative whitespace-nowrap text-sm font-bold transition-colors hover:text-cyan-300 ${
                  isActive ? "text-cyan-300" : "text-slate-200"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <a href="/contact" className="btn-grad hidden shrink-0 px-6 py-3 lg:inline-flex">
          Contact us
        </a>

        {/* Mobile toggle */}
        <input type="checkbox" id="nav-toggle" className="peer hidden" />
        <label
          htmlFor="nav-toggle"
          className="ml-auto flex cursor-pointer flex-col gap-1.5 p-2 lg:hidden"
          aria-label="Toggle navigation"
        >
          <span className="h-0.5 w-6 rounded bg-slate-200" />
          <span className="h-0.5 w-6 rounded bg-slate-200" />
          <span className="h-0.5 w-6 rounded bg-slate-200" />
        </label>

        {/* Mobile panel */}
        <div className="absolute inset-x-0 top-16 hidden flex-col gap-1 rounded-b-3xl border border-white/10 bg-[#0b1020]/95 p-6 shadow-2xl backdrop-blur-xl peer-checked:flex lg:hidden">
          {navItems.filter((item) => item.href !== "/contact").map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-4 py-3 text-sm font-bold transition-colors hover:bg-cyan-400/10 hover:text-cyan-300 ${
                  isActive ? "text-cyan-300 bg-cyan-400/10" : "text-slate-200"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a href="/contact" className="btn-grad mt-4 px-5 py-3">
            Contact us
          </a>
        </div>
      </div>
    </header>
  );
}
