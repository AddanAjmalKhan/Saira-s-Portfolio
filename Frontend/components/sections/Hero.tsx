import Container from "@/components/ui/Container";
import SocialIcon from "@/components/ui/SocialIcon";
import BioBackground from "@/components/ui/BioBackground";
import Link from "next/link";

interface HeroProfile {
  name: string;
  summary: string;
  profileImageUrl?: string | null;
}

interface SocialLink {
  label: string;
  url: string;
  icon?: string | null;
  iconUrl?: string | null;
}

export default function Hero({ profile, socials }: { profile: HeroProfile; socials: SocialLink[] }) {
  return (
    <section
      id="top"
      className="grain relative w-full overflow-hidden text-white flex flex-1 items-center pt-20 pb-8"
    >
      <div className="bg-dot-grid absolute inset-0 opacity-40" aria-hidden />
      {/* Animated bioinformatics / forensics backdrop */}
      <BioBackground />
      {/* Readability overlay — darkens left (text) side and edges so content stays crisp */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#080c18] via-[#080c18]/70 to-transparent"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#080c18] via-transparent to-[#080c18]/60"
        aria-hidden
      />
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
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-200 transition-all hover:border-cyan-400/40 hover:bg-white/10"
                    >
                      <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                        <SocialIcon icon={s.icon} iconUrl={s.iconUrl} label={s.label} className="w-4 h-4" />
                      </span>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative animate-fade-up [animation-delay:120ms] z-10 order-1 lg:order-2 flex justify-center lg:justify-end w-full">
              <div className="relative mx-auto w-full max-w-[15.5rem] sm:max-w-[18rem] lg:max-w-[20.5rem]">
                {/* Colored block behind (offset, bottom-right) */}
                <div className="absolute -bottom-5 -right-5 z-0 h-32 w-32 rounded-2xl bg-brand-grad opacity-90 shadow-2xl shadow-cyan-500/30" aria-hidden />
                {/* Soft gradient glow */}
                <div className="absolute -inset-3 z-0 rounded-[2.4rem] bg-brand-grad opacity-25 blur-2xl" aria-hidden />
                {/* Image card — cropped from the top so it ends around the green shirt */}
                <div className="relative z-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] shadow-2xl backdrop-blur-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={profile.profileImageUrl || "/profile.jpg"}
                    alt={`Portrait of ${profile.name}`}
                    className="aspect-[4/5] w-full object-cover object-top"
                  />
                </div>
                {/* Outlined corner frame (top-left) */}
                <div className="absolute -left-4 -top-4 z-20 h-24 w-24 rounded-2xl border-2 border-cyan-400/50" aria-hidden />
                {/* Accent dots (right) */}
                <div className="absolute -right-4 top-[40%] z-20 flex flex-col gap-2.5" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-sm bg-cyan-400" />
                  <span className="h-2.5 w-2.5 rounded-sm bg-cyan-400/60" />
                  <span className="h-2.5 w-2.5 rounded-sm bg-cyan-400/30" />
                </div>
                {/* Sparkle */}
                <span className="absolute -top-3 right-8 z-20 text-xl text-cyan-300/80" aria-hidden>✦</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
