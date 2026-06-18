import Container from "@/components/ui/Container";
import { navItems, profile } from "@/data/profile";
import { LinkedInIcon, ResearchGateIcon, MailIcon } from "@/components/ui/icons";

export default function Footer() {
  return (
    <footer className="border-t border-forest-100 bg-night text-ink-soft">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-bold text-forest-900">
              {profile.name}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
              {profile.tagline}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-forest-200 text-forest-700 transition-colors hover:border-mint hover:bg-mint hover:text-white"
              >
                <LinkedInIcon width={18} height={18} />
              </a>
              <a
                href={profile.researchgate}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ResearchGate"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-forest-200 text-forest-700 transition-colors hover:border-mint hover:bg-mint hover:text-white"
              >
                <ResearchGateIcon width={18} height={18} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-forest-200 text-forest-700 transition-colors hover:border-mint hover:bg-mint hover:text-white"
              >
                <MailIcon width={18} height={18} />
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-mint">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm font-medium text-forest-700 transition-colors hover:text-mint"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-mint">
              Contact
            </p>
            <ul className="mt-4 space-y-2.5 text-sm font-medium text-forest-700">
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

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-forest-100 pt-6 text-xs text-ink-soft sm:flex-row font-medium">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p>Built with Next.js &amp; Tailwind CSS.</p>
        </div>
      </Container>
    </footer>
  );
}
