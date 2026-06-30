import Reveal from "@/components/ui/Reveal";
import { getProjects, getPageContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const [projects, pages] = await Promise.all([getProjects(), getPageContent()]);
  const block = pages["projects"];

  return (
    <main className="min-h-screen pt-32 pb-20 sm:pt-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {(block?.eyebrow ?? "") && (
          <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-cyan-300 mb-3">
            <span className="h-px w-6 bg-cyan-400/60" aria-hidden />
            {block?.eyebrow}
          </span>
        )}
        <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {block?.heading ? block.heading : (<>My <span className="text-gradient">Projects</span></>)}
        </h1>
        {block?.subheading && (
          <p className="mb-12 max-w-2xl text-lg text-slate-300">{block.subheading}</p>
        )}

        {projects.length === 0 ? (
          <p className="mt-10 text-slate-400">No projects yet.</p>
        ) : (
          <div className="mt-10 space-y-10">
            {projects.map((project, i) => (
              <Reveal key={project.id} delay={i * 80} from="up" as="div">
                <article className="card-modern p-8">
                  <div className="flex items-start gap-4">
                    {project.logoUrl && (
                      <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/95 p-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={project.logoUrl} alt={`${project.name} logo`} className="h-full w-full object-contain" />
                      </span>
                    )}
                    <div className="min-w-0">
                      <h2 className="text-2xl font-bold text-white">{project.name}</h2>
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 hover:text-cyan-200"
                        >
                          Visit project
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10" /></svg>
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="mt-5 whitespace-pre-line leading-relaxed text-slate-300">
                    {project.description}
                  </p>

                  {project.images.length > 0 && (
                    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {project.images.map((src, j) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={j}
                          src={src}
                          alt={`${project.name} ${j + 1}`}
                          loading="lazy"
                          className="aspect-video w-full rounded-xl border border-white/10 object-cover"
                        />
                      ))}
                    </div>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
