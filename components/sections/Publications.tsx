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
      className="grain relative scroll-mt-24 overflow-hidden bg-night-700 py-24 text-cream sm:py-32"
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
              <article className="group grid gap-4 rounded-2xl border border-cream/10 bg-cream/[0.03] p-6 transition-colors hover:border-mint/40 sm:grid-cols-[auto_1fr] sm:gap-7 sm:p-8">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-sm text-cream/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="inline-flex h-fit items-center rounded-full bg-mint/15 px-2.5 py-0.5 font-mono text-xs font-semibold text-mint">
                    {pub.year}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-xl font-semibold leading-snug text-cream transition-colors group-hover:text-mint-soft">
                    {pub.title}
                  </h3>
                  <p className="mt-2 text-sm text-cream/60">{pub.authors}</p>
                  <p className="mt-1 text-sm italic text-amber-soft">
                    {pub.venue}
                  </p>
                  {pub.doi && (
                    <a
                      href={pub.doi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-mint transition-colors hover:text-amber-soft"
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
