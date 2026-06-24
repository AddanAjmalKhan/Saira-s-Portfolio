import Reveal from "@/components/ui/Reveal";
import { buildWorldMap } from "@/lib/worldMap";
import { getEducation, getMapLocations } from "@/lib/content";
import InteractiveEducationMap from "./InteractiveEducationMap";

export const dynamic = "force-dynamic";

export default async function EducationPage() {
  const [education, locations] = await Promise.all([getEducation(), getMapLocations()]);
  const geometry = buildWorldMap(locations);

  return (
    <main className="min-h-screen w-full bg-[#f6f8fb]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-6 pt-32 pb-20">
        <Reveal from="up">
          <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-mint mb-3">
            <span className="h-px w-6 bg-forest-300" aria-hidden />
            Academic Background
          </span>
          <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Education
          </h1>
        </Reveal>
        
        <InteractiveEducationMap education={education} geometry={geometry} />
      </div>
    </main>
  );
}
