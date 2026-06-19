import Container from "@/components/ui/Container";
import { navItems, profile } from "@/data/profile";
import { LinkedInIcon, ResearchGateIcon, MailIcon } from "@/components/ui/icons";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <p className="font-display text-2xl font-bold text-white">
                {profile.name}
              </p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
                {profile.tagline}
              </p>
              <div className="mt-5 flex items-center gap-3">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition duration-300 hover:border-mint hover:bg-mint/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/30"
                >
                  <LinkedInIcon width={18} height={18} style={{ color: "#0A66C2" }} />
                </a>
                <a
                  href={profile.researchgate}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="ResearchGate"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition duration-300 hover:border-mint hover:bg-mint/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/30"
                >
                  <ResearchGateIcon width={18} height={18} style={{ color: "#00CCBB" }} />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  aria-label="Email"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition duration-300 hover:border-mint hover:bg-mint/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/30"
                >
                  <MailIcon width={18} height={18} />
                </a>
              </div>
            </div>

            <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm font-medium text-slate-400 transition-colors hover:text-mint"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white">
              Contact
            </p>
            <ul className="mt-4 space-y-2.5 text-sm font-medium text-slate-400">
              <li>{profile.location}</li>
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="break-all transition-colors hover:text-mint"
                >
                  {profile.email}
                </a>
              </li>
              <li>{profile.phone}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row font-medium">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p>Built with Next.js &amp; Tailwind CSS.</p>
        </div>
      </Container>
    </footer>
  );
}
