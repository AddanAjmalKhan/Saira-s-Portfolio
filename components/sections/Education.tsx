import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Timeline from "@/components/ui/Timeline";
import OutlineStack from "@/components/ui/OutlineStack";
import { education } from "@/data/education";

export default function Education() {
  return (
    <section
      id="education"
      className="relative scroll-mt-24 overflow-hidden bg-cream py-24 sm:py-28"
    >
      {/* Résumé watermark */}
      <div
        className="pointer-events-none absolute -right-6 top-16 hidden text-[8rem] opacity-[0.55] lg:block"
        aria-hidden
      >
        <OutlineStack word="Résumé" echoes={2} tone="ochre" overlap={0.16} />
      </div>

      <Container className="relative">
        <SectionHeading
          index="02"
          eyebrow="Education"
          title="An academic path across three continents."
          description="From zoology in Pakistan to plant biotechnology in Italy and forensic biology in Argentina — each step adding a new layer of scientific depth."
        />
        <div className="mt-14 max-w-3xl">
          <Timeline entries={education} />
        </div>
      </Container>
    </section>
  );
}
