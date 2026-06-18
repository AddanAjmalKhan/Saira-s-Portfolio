import Container from "@/components/ui/Container";
import Aurora from "@/components/ui/Aurora";
import SectionHeading from "@/components/ui/SectionHeading";
import ResearchMap from "@/components/map/ResearchMap";
import { buildWorldMap } from "@/lib/worldMap";

export default function ResearchMapSection() {
  const geometry = buildWorldMap();

  return (
    <section
      id="journey"
      className="relative scroll-mt-24 overflow-hidden bg-white py-24 text-gray-900 sm:py-32"
    >
      <Aurora intensity="subtle" />
      <Container className="relative">
        <SectionHeading
          index="04"
          eyebrow="Research Journey"
          tone="dark"
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
