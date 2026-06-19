import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { summerSchools } from "@/data/achievements";
import { PinIcon } from "@/components/ui/icons";

export default function SummerSchools() {
  return (
    <Section id="summer-schools" className="bg-white">
      <SectionHeading
        index="07"
        eyebrow="International Summer Schools"
        title="Immersive, hands-on learning across Europe."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {summerSchools.map((school, i) => (
          <Reveal key={school.title} from="up" delay={i * 100}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-[#eef2f7] p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-30px_rgba(12,22,17,0.45)]">
              <span
                className="absolute right-5 top-4 font-display text-7xl font-semibold text-mint/10 transition-colors group-hover:text-mint/20"
                aria-hidden
              >
                0{i + 1}
              </span>
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-mint">
                {school.period}
              </span>
              <h3 className="mt-3 font-display text-2xl font-semibold leading-snug text-slate-900">
                {school.title}
              </h3>
              <p className="mt-2 text-sm font-medium text-slate-800">
                {school.host}
              </p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-slate-600">
                <PinIcon width={14} height={14} className="text-mint" />
                {school.location}
              </p>

              <ul className="mt-5 space-y-2 border-t border-slate-200 pt-5">
                {school.highlights.map((h) => (
                  <li
                    key={h}
                    className="relative pl-5 text-sm leading-relaxed text-slate-600"
                  >
                    <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-mint-deep" />
                    {h}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
