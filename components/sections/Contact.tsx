import Container from "@/components/ui/Container";
import Aurora from "@/components/ui/Aurora";
import Reveal from "@/components/ui/Reveal";
import { profile, references } from "@/data/profile";
import {
  MailIcon,
  PhoneIcon,
  PinIcon,
  LinkedInIcon,
  ResearchGateIcon,
  ArrowIcon,
} from "@/components/ui/icons";

const contactRows = [
  { icon: MailIcon, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: PhoneIcon, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
  { icon: PinIcon, label: "Location", value: profile.location },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-white py-24 text-slate-900 sm:py-32"
    >
      <Aurora />
      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr]">
          {/* Left — CTA */}
          <Reveal from="left">
            <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] font-semibold uppercase tracking-ultra text-mint">
              <span className="h-px w-8 bg-current opacity-50" aria-hidden />
              10 — Get in touch
            </span>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-tightest sm:text-6xl">
              Let&apos;s collaborate on the{" "}
              <span className="text-gradient">science of traces.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-slate-600">
              Open to research collaborations, academic partnerships and
              conversations about forensic genomics, eDNA and plant pathology.
            </p>

            <div className="mt-8 space-y-3">
              {contactRows.map((row) => {
                const Icon = row.icon;
                const content = (
                  <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-[#eef2f7] px-5 py-4 transition-colors hover:border-mint/50">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint/15 text-mint">
                      <Icon />
                    </span>
                    <div>
                      <p className="font-mono text-[0.6rem] uppercase tracking-widest text-slate-500">
                        {row.label}
                      </p>
                      <p className="text-sm font-medium text-slate-900">
                        {row.value}
                      </p>
                    </div>
                  </div>
                );
                return row.href ? (
                  <a key={row.label} href={row.href} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={row.label}>{content}</div>
                );
              })}
            </div>

            <div className="mt-8 flex items-center gap-3">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/5 px-4 py-2 text-sm font-medium text-slate-900 transition duration-300 ease-out hover:border-mint hover:bg-mint/10 hover:text-mint hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/30"
              >
                <LinkedInIcon width={16} height={16} style={{ color: "#0A66C2" }} /> LinkedIn
              </a>
              <a
                href={profile.researchgate}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/5 px-4 py-2 text-sm font-medium text-slate-900 transition duration-300 ease-out hover:border-mint hover:bg-mint/10 hover:text-mint hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/30"
              >
                <ResearchGateIcon width={16} height={16} style={{ color: "#00CCBB" }} /> ResearchGate
              </a>
            </div>
          </Reveal>

          {/* Right — references */}
          <Reveal from="right" delay={120} className="lg:pl-6">
            <h3 className="font-display text-2xl font-semibold text-slate-900">
              References
            </h3>
            <div className="mt-6 space-y-4">
              {references.map((ref) => (
                <div
                  key={ref.email}
                  className="gradient-ring rounded-2xl p-6 [--ring-bg:#070d0a]"
                >
                  <p className="font-display text-lg font-semibold text-slate-900">
                    {ref.name}
                  </p>
                  <p className="mt-1 text-sm font-medium text-mint">
                    {ref.role}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-900/65">
                    {ref.affiliation}
                  </p>
                  <a
                    href={`mailto:${ref.email}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-mint transition-colors hover:text-mint"
                  >
                    {ref.email}
                    <ArrowIcon width={14} height={14} />
                  </a>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
