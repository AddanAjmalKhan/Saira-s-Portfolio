import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { honours } from "@/data/achievements";

export default function Honours() {
  return (
    <Section id="honours" className="bg-cream">
      <SectionHeading
        index="08"
        eyebrow="Honours & Awards"
        title="Recognition along the way."
        description="Competitive scholarships and merit awards that have supported each stage of the journey."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {honours.map((honour, i) => (
          <Reveal key={honour.title} from="up" delay={i * 70}>
            <div className="group relative h-full overflow-hidden rounded-3xl border border-ink/[0.08] bg-paper p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-mint/40">
              <span
                className="absolute -right-2 top-1 font-display text-6xl font-semibold text-mint/10 transition-colors group-hover:text-amber/20"
                aria-hidden
              >
                {honour.year}
              </span>
              <div className="relative">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber/15 text-amber-deep transition-colors group-hover:bg-mint/15 group-hover:text-mint-deep">
                  <TrophyMark />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-ink">
                  {honour.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {honour.detail}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function TrophyMark() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
      <path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3M10 15h4M9 20h6M12 13v2" />
    </svg>
  );
}
