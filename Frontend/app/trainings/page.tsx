import Reveal from "@/components/ui/Reveal";
import Aurora from "@/components/ui/Aurora";
import { GlobeIcon } from "@/components/ui/icons";
import ResearchMapSection from "@/components/sections/ResearchMapSection";
import { getTrainings } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function TrainingsPage() {
  const trainings = await getTrainings();
  return (
    <main className="min-h-screen pt-32 pb-20 sm:pt-40 relative overflow-hidden">
      <Aurora />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 relative z-10">
        <Reveal from="up">
          <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] font-semibold uppercase tracking-ultra text-cyan-300 mb-4">
            <span className="h-px w-8 bg-current opacity-50" aria-hidden />
            Global Experience
          </span>
          <h1 className="mb-16 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            International <span className="text-gradient">Trainings & Courses</span>
          </h1>
        </Reveal>
        
        <div className="grid gap-6 md:grid-cols-2">
          {trainings.map((training, index) => (
            <Reveal key={index} delay={index * 100} from="up" as="div" className="h-full">
              <div className="card-modern group flex h-full flex-col justify-between p-8 hover:-translate-y-1">
                <div>
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold text-cyan-300 transition-colors group-hover:bg-brand-grad group-hover:text-white">
                    <GlobeIcon width={14} height={14} />
                    {training.country}
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-white leading-tight">{training.title}</h3>
                  <p className="mb-5 text-sm font-semibold text-cyan-300">
                    {training.institution}
                  </p>
                  {training.description && (
                    <p className="text-slate-400 text-base leading-relaxed mb-8">{training.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-auto pt-5 border-t border-white/10 text-cyan-300 text-sm font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  {training.duration}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Research Map Section */}
      <div className="relative z-10 mt-24 sm:mt-32 border-t border-white/10">
        <ResearchMapSection />
      </div>
    </main>
  );
}
