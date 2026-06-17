import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Sparkle from "@/components/ui/Sparkle";
import Portrait from "@/components/ui/Portrait";
import { profile } from "@/data/profile";
import {
  DnaIcon,
  FlaskIcon,
  LeafIcon,
  GlobeIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  ArrowIcon,
} from "@/components/ui/icons";

const focusAreas = [
  { icon: DnaIcon, title: "Forensic Genomics" },
  { icon: FlaskIcon, title: "Molecular Biology" },
  { icon: LeafIcon, title: "Plant Pathology" },
  { icon: GlobeIcon, title: "Bioinformatics" },
];

const contactRows = [
  { icon: PinIcon, value: profile.location },
  { icon: MailIcon, value: profile.email, href: `mailto:${profile.email}` },
  { icon: PhoneIcon, value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
];

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 bg-cream py-24 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Left — greeting */}
          <Reveal from="left">
            <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] font-semibold uppercase tracking-ultra text-amber-deep">
              <Sparkle size={14} className="text-ochre" /> About me
            </span>

            <h2 className="mt-5 font-display text-5xl font-semibold leading-[1.02] tracking-tightest text-ink sm:text-6xl">
              Hello, <br />
              I&apos;m {profile.name.split(" ")[0]}{" "}
              <span className="text-gradient">!</span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {profile.summary}
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
              My work bridges the laboratory bench and the command line — from
              culturing pathogens and extracting DNA to assembling genomes on
              high-performance computing systems.
            </p>

            {/* LinkedIn pill (search-bar style) */}
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 inline-flex w-full max-w-md items-center gap-3 rounded-full border border-ink/10 bg-paper px-5 py-3 shadow-sm transition-colors hover:border-ochre"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ochre text-cream">
                <ArrowIcon width={16} height={16} className="-rotate-45" />
              </span>
              <span className="truncate text-sm text-ink-soft">
                linkedin.com/in/saira1997
              </span>
              <span className="ml-auto font-mono text-xs uppercase tracking-widest text-amber-deep">
                Connect
              </span>
            </a>

            {/* Focus area pills */}
            <div className="mt-8 flex flex-wrap gap-2.5">
              {focusAreas.map((area) => {
                const Icon = area.icon;
                return (
                  <span
                    key={area.title}
                    className="inline-flex items-center gap-2 rounded-full border border-forest-200 bg-forest-50 px-4 py-2 text-sm font-medium text-forest-700"
                  >
                    <Icon width={16} height={16} className="text-amber-deep" />
                    {area.title}
                  </span>
                );
              })}
            </div>
          </Reveal>

          {/* Right — portrait + contact card */}
          <Reveal from="right" delay={120} className="flex flex-col gap-5">
            <div className="relative mx-auto w-full max-w-sm">
              <Sparkle
                size={26}
                className="absolute -right-2 -top-3 z-10 text-ochre"
                animate
              />
              <Portrait
                alt={`Portrait of ${profile.name}`}
                badge="MSCA Fellow · 2026"
              />
            </div>

            {/* Contact card */}
            <div className="rounded-[1.75rem] bg-ink p-6 text-cream">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold">Contact</h3>
                <Sparkle size={18} className="text-ochre-soft" />
              </div>
              <ul className="mt-4 space-y-3">
                {contactRows.map((row) => {
                  const Icon = row.icon;
                  const inner = (
                    <span className="flex items-center gap-3 text-sm text-cream/80">
                      <Icon width={16} height={16} className="text-ochre-soft" />
                      <span className="truncate">{row.value}</span>
                    </span>
                  );
                  return (
                    <li key={row.value}>
                      {row.href ? (
                        <a
                          href={row.href}
                          className="transition-colors hover:text-ochre-soft"
                        >
                          {inner}
                        </a>
                      ) : (
                        inner
                      )}
                    </li>
                  );
                })}
              </ul>
              <a
                href="#contact"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ochre px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-ochre-deep"
              >
                Get in touch
                <ArrowIcon width={15} height={15} />
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
