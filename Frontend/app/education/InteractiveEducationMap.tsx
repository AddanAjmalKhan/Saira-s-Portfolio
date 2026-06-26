"use client";

import { useState } from "react";
import ResearchMap from "@/components/map/ResearchMap";
import Reveal from "@/components/ui/Reveal";
import type { WorldMapGeometry } from "@/lib/worldMap";

interface InteractiveEducationMapProps {
  education: any[];
  geometry: WorldMapGeometry;
}

// Avoid repeating the place: if the institution name already contains the city,
// show only the country; otherwise show the full "City, Country".
function placeLabel(org: string, location: string): string {
  if (!location) return "";
  const parts = location.split(",").map((s) => s.trim());
  if (parts.length < 2) return location; // e.g. just "Hungary"
  const city = parts[0];
  const country = parts.slice(1).join(", ");
  return org && org.toLowerCase().includes(city.toLowerCase()) ? country : location;
}

export default function InteractiveEducationMap({ education, geometry }: InteractiveEducationMapProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Map the location strings to the map IDs we defined in data/locations.ts
  // Match an education entry to a map marker slug by keywords in its
  // location / institution / degree (robust to "City, Country" strings).
  const getMapId = (item: any) => {
    const hay = `${item.location ?? ""} ${item.organisation ?? ""} ${item.university ?? ""} ${item.degree ?? ""}`.toLowerCase();
    if (hay.includes("san juan")) return "san-juan";
    if (hay.includes("viterbo") || hay.includes("tuscia")) return "viterbo";
    if (hay.includes("hungary") || hay.includes("mate") || hay.includes("gödöllő") || hay.includes("godollo")) return "godollo";
    if (hay.includes("sialkot")) return "sialkot";
    if (hay.includes("islamabad")) return "islamabad";
    return null;
  };

  const educationWithIds = education.map((item) => ({
    item,
    id: getMapId(item),
  }));

  // Keep a stable order (no reshuffle on hover) for smooth scrolling.
  const sortedEducation = educationWithIds;

  // Map each marker slug to its university name (shown on hover over the map dot).
  const markerLabels: Record<string, string> = {};
  for (const { item, id } of educationWithIds) {
    if (id) markerLabels[id] = item.organisation || item.university || "";
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] items-start mt-8">
      {/* Scrollable Education List */}
      <div
        className="space-y-6 lg:max-h-[75vh] lg:overflow-y-auto scrollbar-slim pr-2 sm:pr-4 pb-12 lg:scroll-smooth"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {sortedEducation.map(({ item, id }, index) => {
          const isActive = activeId === id && id !== null;
          
          return (
            <Reveal key={`${id ?? index}-${index}`} delay={index * 100} from="up" as="div">
              <div
                className={`group rounded-xl border p-6 backdrop-blur-sm transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "border-cyan-400/50 bg-cyan-400/10 shadow-[0_18px_50px_-20px_rgba(8,145,178,0.6)]"
                    : "border-white/10 bg-white/[0.04] hover:border-cyan-400/40 hover:bg-white/[0.07]"
                }`}
                onMouseEnter={() => setActiveId(id)}
                onMouseLeave={() => setActiveId(null)}
                onClick={() => setActiveId(id)}
              >
                <div className="flex flex-col gap-3 mb-4">
                  <div className="inline-flex items-center self-start rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                    {item.period}
                  </div>
                  <h3 className={`text-xl font-bold leading-tight transition-colors ${isActive ? "text-cyan-300" : "text-white"}`}>
                    {item.degree}
                  </h3>
                </div>

                <div className="mb-4 text-sm font-medium text-slate-200 flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>
                    {item.organisation || item.university}
                    <span className="text-cyan-300 font-normal ml-1">
                      — {placeLabel(item.organisation || item.university, item.location)}
                    </span>
                  </span>
                </div>

                <p className="text-slate-400 leading-relaxed text-sm border-t border-white/10 pt-4">
                  {item.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Sticky Map */}
      <div className="lg:sticky lg:top-32 relative z-10 w-full rounded-3xl p-4 bg-white/[0.04] border border-white/10 shadow-xl backdrop-blur-sm">
        <ResearchMap 
          geometry={geometry}
          activeId={activeId}
          onActiveIdChange={setActiveId}
          hideInfoPanel={true}
          markerLabels={markerLabels}
        />
        
        <div className="mt-6 text-center pb-2">
          <p className="text-sm font-medium text-cyan-300 bg-cyan-400/10 inline-block px-4 py-2 rounded-full">
            Hover over a map point or a card to explore the journey.
          </p>
        </div>
      </div>
    </div>
  );
}
