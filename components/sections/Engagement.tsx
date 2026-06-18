import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { conferences, memberships } from "@/data/achievements";
import { trainings } from "@/data/skills";
import { BookIcon, GlobeIcon } from "@/components/ui/icons";

export default function Engagement() {
  return (
    <Section id="engagement" className="bg-white">
      <SectionHeading
        index="09"
        eyebrow="Community & Professional Development"
        title="Conferences, networks and continued training."
        description="Staying connected to the wider scientific community through events, memberships and specialised courses."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Conferences */}
        <Reveal from="left" className="rounded-3xl border border-gray-200 bg-gray-50 p-8">
          <h3 className="font-display text-xl font-semibold text-gray-900">
            Conferences &amp; Seminars
          </h3>
          <ul className="mt-6 space-y-5">
            {conferences.map((c) => (
              <li key={c.title} className="flex gap-4">
                <span className="mt-1 shrink-0 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-gray-800">
                  {c.date}
                </span>
                <div>
                  <p className="text-sm font-medium leading-snug text-gray-900">
                    {c.title}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-600">{c.organiser}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="flex flex-col gap-6">
          {/* Memberships */}
          <Reveal from="right" className="rounded-3xl border border-gray-200 bg-gray-50 p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-gray-900">
                <GlobeIcon />
              </span>
              <h3 className="font-display text-xl font-semibold text-gray-900">
                Networks &amp; Memberships
              </h3>
            </div>
            <ul className="mt-5 space-y-4">
              {memberships.map((m) => (
                <li key={m.name}>
                  <p className="text-sm font-semibold text-gray-900">{m.name}</p>
                  {m.detail && (
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                      {m.detail}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Trainings */}
          <Reveal from="right" delay={120} className="rounded-3xl border border-gray-200 bg-gray-50 p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-gray-900">
                <BookIcon />
              </span>
              <h3 className="font-display text-xl font-semibold text-gray-900">
                Professional Training
              </h3>
            </div>
            <ul className="mt-5 grid gap-2.5">
              {trainings.map((t) => (
                <li
                  key={t}
                  className="relative pl-5 text-sm leading-relaxed text-gray-600"
                >
                  <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-amber" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
