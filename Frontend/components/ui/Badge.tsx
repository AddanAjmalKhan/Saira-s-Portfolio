import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "forest" | "amber" | "outline";
}

const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
  forest: "bg-mint/10 text-mint ring-slate-200",
  amber: "bg-amber/10 text-amber-deep ring-amber/30",
  outline: "bg-transparent text-slate-600 ring-slate-200",
};

export default function Badge({ children, variant = "forest" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
