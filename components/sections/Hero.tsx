import Container from "@/components/ui/Container";
import OutlineStack from "@/components/ui/OutlineStack";
import Sparkle from "@/components/ui/Sparkle";
import Portrait from "@/components/ui/Portrait";
import { profile } from "@/data/profile";
import { ArrowIcon } from "@/components/ui/icons";
import Link from "next/link";

const socials = [
  { label: "LinkedIn", short: "IN", href: profile.linkedin },
  { label: "ResearchGate", short: "RG", href: profile.researchgate },
  { label: "Email", short: "@", href: `mailto:${profile.email}` },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="grain relative overflow-hidden bg-night text-cream min-h-screen flex flex-col justify-center"
    >
      <div className="bg-dot-grid-dark absolute inset-0 opacity-60" aria-hidden />
      {/* Soft vignette */}
      <div
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,rgba(216,164,99,0.16),transparent_60%)]"
        aria-hidden
      />

      <Container className="relative">
        <div className="pb-16 pt-32 sm:pt-36">

          {/* Photo + intro row */}
          <div className="mt-10 grid items-end gap-10 lg:mt-4 lg:grid-cols-[1fr_0.85fr]">
            
            <div className="animate-fade-up pb-2 [animation-delay:200ms] z-10 order-2 lg:order-1">
              <p className="font-mono text-xs uppercase tracking-ultra text-mint mb-2">
                GET EVERY SINGLE SOLUTIONS.
              </p>
              <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight text-forest-900 sm:text-6xl md:text-[5.5rem] mt-4 mb-6">
                I'm Researcher <br/> {profile.name}
              </h1>
              <p className="max-w-lg text-pretty text-base leading-relaxed text-ink-soft mb-8">
                {profile.summary}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-md bg-mint px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-mint/90 hover:shadow-lg"
                >
                  Contact Me Now
                </Link>
                <Link
                  href="/publications"
                  className="inline-flex items-center gap-2 rounded-md border-2 border-forest-900/10 px-8 py-3 text-sm font-semibold text-forest-900 transition-colors hover:border-mint hover:text-mint"
                >
                  View Publications
                </Link>
              </div>

              {/* Socials */}
              <ul className="mt-10 flex flex-wrap gap-3">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 rounded-full border border-forest-900/10 bg-white px-5 py-2.5 text-sm font-medium text-forest-900 transition-all hover:border-mint hover:bg-mint hover:text-white"
                    >
                      <span className="font-mono text-xs font-bold opacity-70">
                        {s.short}
                      </span>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative animate-fade-up [animation-delay:120ms] z-10 order-1 lg:order-2 flex justify-center lg:justify-end w-full">
              <Portrait src="/profile.jpg" alt={`Portrait of ${profile.name}`} className="w-full max-w-xs sm:max-w-md lg:max-w-lg" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
