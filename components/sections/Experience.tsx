import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Timeline from "@/components/ui/Timeline";
import Sparkle from "@/components/ui/Sparkle";
import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 bg-gray-50 pb-24 sm:pb-28">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-amber-deep via-[#a9712f] to-forest-700 p-8 text-gray-900 shadow-[0_30px_70px_-40px_rgba(33,31,23,0.6)] sm:p-12">
          <div className="bg-dot-grid-dark absolute inset-0 opacity-50" aria-hidden />
          <Sparkle
            size={40}
            animate
            className="absolute right-8 top-8 text-gray-900/40"
          />

          <div className="relative max-w-2xl">
            <span className="font-mono text-xs font-semibold uppercase tracking-ultra text-gray-600">
              03 — Experience
            </span>
            <h2 className="mt-4 font-display text-[2.1rem] font-semibold leading-[1.04] tracking-tightest sm:text-5xl">
              Research &amp; teaching experience.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray-600">
              Hands-on work spanning genome assembly and pathogen diagnostics in
              the lab, and years of teaching that sharpened how I communicate
              complex science.
            </p>
          </div>

          <div className="relative mt-12 max-w-3xl">
            <Timeline entries={experience} tone="dark" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
