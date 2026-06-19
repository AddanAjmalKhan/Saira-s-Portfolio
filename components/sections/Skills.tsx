import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Badge from "@/components/ui/Badge";
import { scientificSkills, technicalSkills, languages } from "@/data/skills";
import { FlaskIcon, DnaIcon } from "@/components/ui/icons";

export default function Skills() {
  return (
    <Section id="skills" className="bg-[#eef2f7]">
      <SectionHeading
        index="05"
        eyebrow="Capabilities"
        title="Skills across the bench and the terminal."
        description="A toolkit that spans wet-lab molecular biology, computational genomics and clear scientific communication."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {/* Scientific */}
        <Reveal from="left">
          <div className="h-full rounded-3xl border border-slate-200 bg-white p-7 transition-shadow hover:shadow-[0_24px_60px_-30px_rgba(12,22,17,0.4)]">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint text-slate-900">
                <FlaskIcon />
              </span>
              <h3 className="font-display text-2xl font-semibold text-slate-900">
                {scientificSkills.title}
              </h3>
            </div>
            <ul className="mt-6 space-y-2.5">
              {scientificSkills.items.map((item) => (
                <li
                  key={item}
                  className="relative pl-5 text-sm leading-relaxed text-slate-600"
                >
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-mint-deep" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="flex flex-col gap-6">
          {/* Technical */}
          <Reveal from="right">
            <div className="rounded-3xl border border-slate-200 bg-white p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint text-slate-900">
                  <DnaIcon />
                </span>
                <h3 className="font-display text-2xl font-semibold text-slate-900">
                  {technicalSkills.title}
                </h3>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {technicalSkills.items.map((item) => (
                  <Badge key={item} variant="forest">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Languages */}
          <Reveal from="right" delay={120}>
            <div className="rounded-3xl border border-slate-200 bg-white p-7">
              <h3 className="font-display text-2xl font-semibold text-slate-900">
                Languages
              </h3>
              <div className="mt-6 space-y-4">
                {languages.map((lang) => (
                  <div key={lang.name}>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-medium text-slate-900">
                        {lang.name}
                      </span>
                      <span className="font-mono text-xs text-slate-600">
                        {lang.level}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-mint/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-mint via-mint-deep to-amber"
                        style={{ width: `${lang.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
