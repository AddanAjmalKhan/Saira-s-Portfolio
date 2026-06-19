import { education } from "@/data/profile";
import Reveal from "@/components/ui/Reveal";
import { buildWorldMap } from "@/lib/worldMap";
import InteractiveEducationMap from "./InteractiveEducationMap";

export default function EducationPage() {
  const geometry = buildWorldMap();
  
  return (
    <main className="min-h-screen bg-[#f6f8fb] pt-32 pb-20 sm:pt-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
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
