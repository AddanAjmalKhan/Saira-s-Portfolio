import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ResearchMap from "@/components/map/ResearchMap";
import { buildWorldMap } from "@/lib/worldMap";

export default function ResearchMapSection() {
  const geometry = buildWorldMap();

  return (
    <section
      id="journey"
      className="relative overflow-hidden py-16"
    >
      <Container className="relative">
        <SectionHeading
          index="04"
          eyebrow="Research Journey"
          tone="light"
          title="Where the work has taken me."
          description="A geography of study, research and training — from the Andes of San Juan to the peach orchards of central Italy and the forests of Pakistan."
        />
        <div className="mt-14">
          <ResearchMap geometry={geometry} />
        </div>
      </Container>
    </section>
  );
}
