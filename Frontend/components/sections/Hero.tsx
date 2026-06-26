import Container from "@/components/ui/Container";
import { LinkedInIcon, ResearchGateIcon, MailIcon } from "@/components/ui/icons";
import Link from "next/link";

interface HeroProfile {
  name: string;
  summary: string;
  linkedin: string;
  researchgate: string;
  email: string;
  profileImageUrl?: string | null;
}

export default function Hero({ profile }: { profile: HeroProfile }) {
  const socials = [
    { label: "LinkedIn", icon: <LinkedInIcon className="w-4 h-4" />, href: profile.linkedin },
    { label: "ResearchGate", icon: <ResearchGateIcon className="w-4 h-4" />, href: profile.researchgate },
    { label: "Email", icon: <MailIcon className="w-4 h-4" />, href: `mailto:${profile.email}` },
  ];
  return (
    <section
      id="top"
      className="grain relative w-full overflow-hidden text-white min-h-screen lg:h-screen flex items-center pt-16"
    >
      <div className="bg-dot-grid absolute inset-0 opacity-40" aria-hidden />
      {/* Soft vignette */}
      <div
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,rgba(8,145,178,0.18),transparent_60%)]"
        aria-hidden
      />
      {/* Bold decorative gradient blobs */}
      <div className="blob -left-24 top-24 h-72 w-72 opacity-50 animate-float" aria-hidden />
      <div className="blob right-[-4rem] bottom-[-2rem] h-96 w-96 opacity-40" aria-hidden />

      <Container className="relative">
        <div className="w-full py-10">

          {/* Photo + intro row */}
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.8fr]">

            <div className="animate-fade-up pb-2 [animation-delay:200ms] z-10 order-2 lg:order-1">
              <h1 className="font-display text-5xl font-bold leading-[1.04] tracking-tight text-white sm:text-6xl md:text-[5.25rem] mt-4 mb-6">
                Hi, I am <span className="text-gradient">{profile.name}</span>
              </h1>
              <p className="max-w-lg text-pretty text-base leading-relaxed text-slate-300 mb-8">
                {profile.summary}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link href="/contact" className="btn-grad px-8">
                  Contact Me Now
                </Link>
                <Link
                  href="/publications"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/15 bg-white/5 px-8 py-3 text-sm font-semibold text-white transition duration-300 ease-out hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
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
                      className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-200 transition-all hover:border-cyan-400/40 hover:bg-white/10"
                    >
                      <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                        {s.icon}
                      </span>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative animate-fade-up [animation-delay:120ms] z-10 order-1 lg:order-2 flex justify-center lg:justify-end w-full">
              <div className="relative w-full max-w-[20rem] sm:max-w-[24rem] lg:max-w-[30rem]">
                {/* Soft gradient glow behind the card */}
                <div className="absolute -inset-3 rounded-[2.4rem] bg-brand-grad opacity-30 blur-2xl" aria-hidden />
                {/* Image card — cropped from the top so it ends around the green shirt */}
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] shadow-2xl backdrop-blur-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={profile.profileImageUrl || "/profile.jpg"}
                    alt={`Portrait of ${profile.name}`}
                    className="aspect-[4/5] w-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
