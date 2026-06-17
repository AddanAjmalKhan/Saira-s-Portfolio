import Container from "@/components/ui/Container";
import { navItems, profile } from "@/data/profile";
import { LinkedInIcon, ResearchGateIcon, MailIcon } from "@/components/ui/icons";

export default function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-night text-cream/80">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-semibold text-cream">
              {profile.name}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/70">
              {profile.tagline}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition-colors hover:border-mint hover:text-mint"
              >
                <LinkedInIcon width={18} height={18} />
              </a>
              <a
                href={profile.researchgate}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ResearchGate"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition-colors hover:border-mint hover:text-mint"
              >
                <ResearchGateIcon width={18} height={18} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition-colors hover:border-mint hover:text-mint"
              >
                <MailIcon width={18} height={18} />
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-soft">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-cream/70 transition-colors hover:text-cream"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-soft">
              Contact
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
              <li>{profile.location}</li>
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="break-all transition-colors hover:text-cream"
                >
                  {profile.email}
                </a>
              </li>
              <li>{profile.phone}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-6 text-xs text-cream/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p>Built with Next.js &amp; Tailwind CSS.</p>
        </div>
      </Container>
    </footer>
  );
}
