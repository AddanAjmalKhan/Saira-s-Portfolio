import type { ReactNode } from "react";
import Container from "./Container";

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Render without the inner Container (for full-bleed content like the map). */
  bleed?: boolean;
}

export default function Section({
  id,
  children,
  className = "",
  bleed = false,
}: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 sm:py-28 ${className}`}>
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}
