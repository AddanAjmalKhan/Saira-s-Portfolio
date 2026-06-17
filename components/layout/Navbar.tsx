import { navItems, profile } from "@/data/profile";

/**
 * Floating glass navbar. Pure CSS mobile menu (peer checkbox) — no client JS.
 */
export default function Navbar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 px-4 sm:top-6">
      <div className="pointer-events-auto mx-auto flex max-w-container items-center justify-between gap-4 rounded-full border border-cream/10 bg-night/70 px-3 py-2 pl-5 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        <a
          href="#top"
          className="group flex items-center gap-2.5 font-display text-base font-semibold tracking-tight text-cream"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mint text-sm font-bold text-night transition-transform group-hover:scale-110">
            SA
          </span>
          <span className="hidden sm:inline">Saira&nbsp;Adnan</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-sm font-medium text-cream/70 transition-colors hover:text-mint after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-mint after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={`mailto:${profile.email}`}
          className="hidden rounded-full bg-cream px-4 py-2 text-sm font-semibold text-night transition-colors hover:bg-mint md:inline-block"
        >
          Get in touch
        </a>

        {/* Mobile toggle */}
        <input type="checkbox" id="nav-toggle" className="peer hidden" />
        <label
          htmlFor="nav-toggle"
          className="flex cursor-pointer flex-col gap-1.5 p-2 md:hidden"
          aria-label="Toggle navigation"
        >
          <span className="h-0.5 w-6 rounded bg-cream" />
          <span className="h-0.5 w-6 rounded bg-cream" />
          <span className="h-0.5 w-6 rounded bg-cream" />
        </label>

        {/* Mobile panel */}
        <div className="absolute inset-x-0 top-16 hidden flex-col gap-1 rounded-3xl border border-cream/10 bg-night/95 p-4 shadow-2xl backdrop-blur-xl peer-checked:flex md:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-cream/80 transition-colors hover:bg-cream/5 hover:text-mint"
            >
              {item.label}
            </a>
          ))}
          <a
            href={`mailto:${profile.email}`}
            className="mt-2 rounded-xl bg-mint px-4 py-2.5 text-center text-sm font-semibold text-night"
          >
            Get in touch
          </a>
        </div>
      </div>
    </header>
  );
}
