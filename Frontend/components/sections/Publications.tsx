import Container from "@/components/ui/Container";
import Aurora from "@/components/ui/Aurora";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { publications } from "@/data/publications";
import { ArrowIcon } from "@/components/ui/icons";

export default function Publications() {
  return (
    <section
      id="publications"
      className="relative scroll-mt-24 overflow-hidden bg-white py-24 text-slate-900 sm:py-32"
    >
      <Aurora intensity="subtle" />
      <Container className="relative">
        <SectionHeading
          index="06"
          eyebrow="Publications"
          tone="dark"
          title="Peer-reviewed research."
          description="Co-authored work spanning food science, plant preservation, materials and ecology."
        />

        <ol className="mt-14 space-y-4">
          {publications.map((pub, index) => (
            <Reveal as="li" key={pub.title} from="up" delay={index * 70}>
              <article className="group grid gap-4 rounded-2xl border border-slate-200 bg-[#eef2f7] p-6 transition-colors hover:border-mint/40 sm:grid-cols-[auto_1fr] sm:gap-7 sm:p-8">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-sm text-slate-900/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="inline-flex h-fit items-center rounded-full bg-mint/15 px-2.5 py-0.5 font-mono text-xs font-semibold text-mint">
                    {pub.year}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-xl font-semibold leading-snug text-slate-900 transition-colors group-hover:text-mint">
                    {pub.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">{pub.authors}</p>
                  <p className="mt-1 text-sm italic text-mint">
                    {pub.venue}
                  </p>
                  {pub.doi && (
                    <a
                      href={pub.doi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-mint transition-colors hover:text-mint"
                    >
                      View DOI
                      <ArrowIcon width={14} height={14} />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
