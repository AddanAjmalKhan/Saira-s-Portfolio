"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Delay in ms before the reveal animation starts. */
  delay?: number;
  /** Direction the content travels in from. */
  from?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  as?: "div" | "li" | "section" | "span";
}

const offsets: Record<NonNullable<RevealProps["from"]>, string> = {
  up: "translate-y-10",
  down: "-translate-y-10",
  left: "translate-x-10",
  right: "-translate-x-10",
  none: "scale-[0.97]",
};

/**
 * Lightweight scroll-reveal wrapper using IntersectionObserver.
 * The only client-side concern in an otherwise server-rendered tree.
 */
export default function Reveal({
  children,
  delay = 0,
  from = "up",
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Already within (or above) the viewport at mount — reveal immediately
    // so above-the-fold content never flashes and is never left hidden.
    if (node.getBoundingClientRect().top < window.innerHeight) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error — ref type varies with the polymorphic tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out will-change-transform ${
        shown ? "translate-x-0 translate-y-0 scale-100 opacity-100" : `opacity-0 ${offsets[from]}`
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
