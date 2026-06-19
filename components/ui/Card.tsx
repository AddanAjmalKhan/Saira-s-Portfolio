import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-ink/[0.07] bg-white p-6 shadow-[0_1px_2px_rgba(19,32,26,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-200 hover:shadow-[0_18px_40px_-20px_rgba(19,38,29,0.35)] sm:p-7 ${className}`}
    >
      {children}
    </div>
  );
}
