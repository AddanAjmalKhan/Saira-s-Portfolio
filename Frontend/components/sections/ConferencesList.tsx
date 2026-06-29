import Reveal from "@/components/ui/Reveal";
import ImageRow from "@/components/ui/ImageRow";

interface Conference {
  date: string;
  title: string;
  organiser: string;
  images?: string[] | null;
}

export default function ConferencesList({ items }: { items: Conference[] }) {
  if (!items.length) return null;
  return (
    <section className="mt-24">
      <h2 className="mb-8 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Conferences <span className="text-gradient">&amp; Events</span>
      </h2>
      <div className="space-y-4">
        {items.map((c, i) => (
          <Reveal key={i} delay={i * 60} from="up" as="div">
            <div className="card-modern p-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold text-white">{c.title}</h3>
                <span className="shrink-0 text-sm font-medium text-cyan-300">{c.date}</span>
              </div>
              <p className="mt-1 text-sm text-slate-400">{c.organiser}</p>
              <ImageRow images={c.images} className="mt-4" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
