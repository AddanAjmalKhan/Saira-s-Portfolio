import Reveal from "@/components/ui/Reveal";
import ImageRow from "@/components/ui/ImageRow";

interface SummerSchool {
  period: string;
  title: string;
  host: string;
  location: string;
  highlights: string[];
  images?: string[] | null;
}

export default function SummerSchoolsList({ items }: { items: SummerSchool[] }) {
  if (!items.length) return null;
  return (
    <section className="mt-24">
      <h2 className="mb-8 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Summer <span className="text-gradient">Schools</span>
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((s, i) => (
          <Reveal key={i} delay={i * 100} from="up" as="div" className="h-full">
            <div className="card-modern flex h-full flex-col p-8">
              <span className="mb-3 inline-flex w-fit items-center rounded-full bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold text-cyan-300">
                {s.period}
              </span>
              <h3 className="mb-1 text-xl font-bold leading-tight text-white">{s.title}</h3>
              <p className="mb-4 text-sm font-semibold text-cyan-300">
                {s.host}
                <span className="ml-1 font-normal text-slate-400">· {s.location}</span>
              </p>
              {s.highlights?.length > 0 && (
                <ul className="mb-4 space-y-2">
                  {s.highlights.map((h, j) => (
                    <li key={j} className="flex gap-2 text-sm leading-relaxed text-slate-300">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
              <ImageRow images={s.images} className="mt-auto pt-2" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
