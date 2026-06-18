"use client";

import { navItems, profile } from "@/data/profile";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Floating glass navbar. Pure CSS mobile menu (peer checkbox) — no client JS.
 */
export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 sm:top-0 w-full bg-white shadow-sm">
      <div className="pointer-events-auto mx-auto flex max-w-container items-center justify-between gap-4 bg-white px-6 py-4">
        <Link
          href="/"
          className="group flex flex-shrink-0 items-center gap-3 font-display text-xl font-bold tracking-tight text-forest-900"
        >
          <div className="relative h-8 w-8">
             {/* Simple red book/portfolio icon similar to the image */}
             <div className="absolute inset-0 bg-mint rounded-sm transform rotate-12 transition-transform group-hover:rotate-45" />
             <div className="absolute inset-0 bg-forest-900 rounded-sm transform -rotate-12 transition-transform group-hover:rotate-0" />
          </div>
          <span className="hidden sm:inline tracking-wider uppercase">Portfolio</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.slice(0, 5).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative whitespace-nowrap text-sm font-bold transition-colors hover:text-mint ${
                  isActive ? "text-mint" : "text-forest-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="group relative py-2">
            <span className="cursor-pointer text-sm font-bold text-forest-900 transition-colors hover:text-mint">
              More ▾
            </span>
            <div className="pointer-events-none absolute left-1/2 top-full mt-2 flex w-48 -translate-x-1/2 flex-col gap-1 rounded-xl border border-forest-100 bg-white p-2 opacity-0 shadow-xl transition-all group-hover:pointer-events-auto group-hover:opacity-100">
              {navItems.slice(5).map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition-colors hover:bg-forest-50 hover:text-mint ${
                      isActive ? "text-mint bg-forest-50" : "text-forest-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        <a
          href="/contact"
          className="hidden rounded-sm bg-mint px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-mint/90 md:inline-block shadow-sm"
        >
          Get Free Consultant
        </a>

        {/* Mobile toggle */}
        <input type="checkbox" id="nav-toggle" className="peer hidden" />
        <label
          htmlFor="nav-toggle"
          className="flex cursor-pointer flex-col gap-1.5 p-2 md:hidden"
          aria-label="Toggle navigation"
        >
          <span className="h-0.5 w-6 rounded bg-forest-900" />
          <span className="h-0.5 w-6 rounded bg-forest-900" />
          <span className="h-0.5 w-6 rounded bg-forest-900" />
        </label>

        {/* Mobile panel */}
        <div className="absolute inset-x-0 top-16 hidden flex-col gap-1 rounded-b-3xl border border-forest-100 bg-white p-6 shadow-2xl peer-checked:flex md:hidden">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-4 py-3 text-sm font-bold transition-colors hover:bg-forest-50 hover:text-mint ${
                  isActive ? "text-mint bg-forest-50" : "text-forest-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href="/contact"
            className="mt-4 rounded-md bg-mint px-4 py-3 text-center text-sm font-bold text-white shadow-sm"
          >
            Get Free Consultant
          </a>
        </div>
      </div>
    </header>
  );
}
