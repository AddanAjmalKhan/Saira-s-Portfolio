"use client";

import { useState } from "react";
import ResearchMap from "@/components/map/ResearchMap";
import Reveal from "@/components/ui/Reveal";
import type { WorldMapGeometry } from "@/lib/worldMap";

interface InteractiveEducationMapProps {
  education: any[];
  geometry: WorldMapGeometry;
}

function EducationCard({
  item,
  isActive,
  onEnter,
  onLeave,
}: {
  item: any;
  isActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      className={`group rounded-xl border p-6 transition-all duration-300 cursor-pointer ${
        isActive
          ? "bg-slate-900 border-slate-900"
          : "bg-white border-slate-200 hover:bg-slate-900 hover:border-slate-900"
      }`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="flex flex-col gap-3 mb-4">
        <div
          className={`inline-flex items-center self-start rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
            isActive
              ? "bg-white/10 text-white"
              : "bg-mint/10 text-mint group-hover:bg-white/10 group-hover:text-white"
          }`}
        >
          {item.period}
        </div>
        <h3
          className={`text-xl font-bold leading-tight transition-colors ${
            isActive ? "text-white" : "text-slate-900 group-hover:text-white"
          }`}
        >
          {item.degree}
        </h3>
      </div>

      <div
        className={`mb-4 text-sm font-medium flex items-center gap-2 transition-colors ${
          isActive ? "text-slate-300" : "text-slate-800 group-hover:text-slate-300"
        }`}
      >
        <svg
          className={`w-4 h-4 flex-shrink-0 transition-colors ${
            isActive ? "text-mint/70" : "text-mint group-hover:text-mint/70"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
        <span>
          {item.university}
          <span
            className={`font-normal ml-1 transition-colors ${
              isActive ? "text-mint/70" : "text-mint group-hover:text-mint/70"
            }`}
          >
            — {item.location}
          </span>
        </span>
      </div>

      <p
        className={`leading-relaxed text-sm border-t pt-4 transition-colors ${
          isActive
            ? "text-slate-300 border-white/10"
            : "text-slate-600 border-slate-200 group-hover:text-slate-300 group-hover:border-white/10"
        }`}
      >
        {item.description}
      </p>
    </div>
  );
}

export default function InteractiveEducationMap({
  education,
  geometry,
}: InteractiveEducationMapProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const locationToIdMap: Record<string, string> = {
    Argentina: "san-juan",
    Italy: "viterbo",
    Hungary: "godollo",
  };

  const getMapId = (item: any): string | null => {
    const u = (item.university as string).toLowerCase();
    const d = (item.degree as string).toLowerCase();
    if (u.includes("sialkot") || (d.includes("zoology") && item.location === "Pakistan")) return "sialkot";
    if (u.includes("allama") || u.includes("islamabad") || (d.includes("education") && item.location === "Pakistan")) return "islamabad";
    return locationToIdMap[item.location as string] ?? null;
  };

  const educationWithIds = education.map((item) => ({
    item,
    id: getMapId(item),
  }));

  // The card to pin at the top when a map dot is hovered
  const activeEntry = activeId
    ? educationWithIds.find((e) => e.id === activeId) ?? null
    : null;

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] items-start mt-8">
      {/* Left: card list */}
      <div className="space-y-4">
        {/* Pinned active card — animates in at the top when a map dot is hovered */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-out ${
            activeEntry ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {activeEntry && (
            <div className="pb-2">
              <EducationCard
                item={activeEntry.item}
                isActive={true}
                onEnter={() => setActiveId(activeEntry.id)}
                onLeave={() => setActiveId(null)}
              />
            </div>
          )}
        </div>

        {/* Scrollable list — order never changes, no layout shift */}
        <div
          className="space-y-4 lg:max-h-[65vh] lg:overflow-y-auto scrollbar-slim pr-2 sm:pr-4 pb-6 lg:scroll-smooth"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {educationWithIds.map(({ item, id }, index) => (
            <Reveal key={`${id ?? index}-${index}`} delay={index * 80} from="up" as="div">
              <EducationCard
                item={item}
                isActive={activeId === id && id !== null}
                onEnter={() => setActiveId(id)}
                onLeave={() => setActiveId(null)}
              />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Right: sticky map */}
      <div className="lg:sticky lg:top-32 relative z-10 w-full">
        <ResearchMap
          geometry={geometry}
          activeId={activeId}
          onActiveIdChange={setActiveId}
          hideInfoPanel={true}
        />
        <div className="mt-6 text-center pb-2">
          <p className="text-sm font-medium text-mint bg-mint/10 inline-block px-4 py-2 rounded-full">
            Hover over a map point or a card to explore the journey.
          </p>
        </div>
      </div>
    </div>
  );
}
