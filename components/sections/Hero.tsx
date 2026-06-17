import Container from "@/components/ui/Container";
import OutlineStack from "@/components/ui/OutlineStack";
import Sparkle from "@/components/ui/Sparkle";
import Portrait from "@/components/ui/Portrait";
import { profile } from "@/data/profile";
import { ArrowIcon } from "@/components/ui/icons";

const socials = [
  { label: "LinkedIn", short: "IN", href: profile.linkedin },
  { label: "ResearchGate", short: "RG", href: profile.researchgate },
  { label: "Email", short: "@", href: `mailto:${profile.email}` },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="grain relative overflow-hidden bg-night text-cream"
    >
      <div className="bg-dot-grid-dark absolute inset-0 opacity-60" aria-hidden />
      {/* Soft vignette */}
      <div
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,rgba(216,164,99,0.16),transparent_60%)]"
        aria-hidden
      />

      <Container className="relative">
        <div className="pb-16 pt-32 sm:pt-36">
          {/* Giant outlined wordmark */}
          <div className="relative">
            <Sparkle
              size={34}
              animate
              className="absolute -left-1 -top-4 text-ochre sm:left-2"
            />
            <Sparkle
              size={22}
              className="absolute right-2 top-10 text-ochre-soft sm:right-24"
            />
            <OutlineStack
              word="Portfolio"
              echoes={2}
              tone="cream"
              className="animate-fade-up text-[clamp(2.8rem,13.5vw,11.5rem)]"
            />
          </div>

          {/* Photo + intro row */}
          <div className="mt-10 grid items-end gap-10 lg:mt-4 lg:grid-cols-[0.85fr_1fr]">
            <div className="relative max-w-xs animate-fade-up [animation-delay:120ms]">
              <Portrait alt={`Portrait of ${profile.name}`} badge="Est. 1997" />
            </div>

            <div className="animate-fade-up pb-2 [animation-delay:200ms]">
              <p className="font-mono text-xs uppercase tracking-ultra text-ochre-soft">
                {profile.title}
              </p>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tightest text-cream sm:text-5xl">
                {profile.name}
              </h1>
              <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-cream/70">
                {profile.tagline}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-ochre px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-ochre-deep"
                >
                  Get in touch
                  <ArrowIcon
                    width={16}
                    height={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
                <a
                  href="#journey"
                  className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-6 py-3 text-sm font-medium text-cream transition-colors hover:border-ochre hover:text-ochre-soft"
                >
                  Research journey
                </a>
              </div>

              {/* Socials */}
              <ul className="mt-8 flex flex-wrap gap-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border border-cream/15 bg-cream/[0.04] px-4 py-2 text-sm text-cream/75 transition-colors hover:border-ochre hover:text-ochre-soft"
                    >
                      <span className="font-mono text-xs text-ochre-soft">
                        {s.short}
                      </span>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll cue */}
      <a
        href="#about"
        className="group relative mx-auto mb-10 flex w-fit items-center gap-2 font-mono text-[0.65rem] uppercase tracking-ultra text-cream/50 transition-colors hover:text-ochre-soft"
      >
        <span className="h-8 w-px bg-gradient-to-b from-ochre to-transparent" />
        Scroll
      </a>
    </section>
  );
}
