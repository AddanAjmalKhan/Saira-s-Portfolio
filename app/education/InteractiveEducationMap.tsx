"use client";

import { useState, useRef, useEffect } from "react";
import ResearchMap from "@/components/map/ResearchMap";
import Reveal from "@/components/ui/Reveal";
import type { WorldMapGeometry } from "@/lib/worldMap";

interface InteractiveEducationMapProps {
  education: any[];
  geometry: WorldMapGeometry;
}

export default function InteractiveEducationMap({ education, geometry }: InteractiveEducationMapProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Map the location strings to the map IDs we defined in data/locations.ts
  const locationToIdMap: Record<string, string> = {
    "Argentina": "san-juan",
    "Italy": "viterbo",
    "Hungary": "godollo",
  };
  
  // We can just use a helper function to get ID from degree text or location
  const getMapId = (item: any) => {
    if (item.degree.includes("Zoology")) return "sialkot";
    if (item.degree.includes("Education")) return "islamabad";
    return locationToIdMap[item.location] || null;
  };

  // Scroll card into view when activeId changes (e.g., from hovering the map)
  useEffect(() => {
    if (activeId && cardRefs.current[activeId]) {
      cardRefs.current[activeId]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeId]);

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] items-start mt-8">
      {/* Scrollable Education List */}
      <div className="space-y-6 lg:max-h-[75vh] lg:overflow-y-auto scrollbar-slim pr-2 sm:pr-4 pb-12">
        {education.map((item, index) => {
          const id = getMapId(item);
          const isActive = activeId === id && id !== null;
          
          return (
            <Reveal key={index} delay={index * 100} from="up" as="div">
              <div 
                ref={(el) => {
                  if (id) cardRefs.current[id] = el;
                }}
                className={`group bg-white rounded-xl border p-6 transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? "border-mint shadow-[0_8px_30px_rgb(0,0,0,0.08)] scale-[1.02]" 
                    : "border-forest-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:border-mint/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                }`}
                onMouseEnter={() => setActiveId(id)}
                onMouseLeave={() => setActiveId(null)}
                onClick={() => setActiveId(id)}
              >
                <div className="flex flex-col gap-3 mb-4">
                  <div className="inline-flex items-center self-start rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-700">
                    {item.period}
                  </div>
                  <h3 className={`text-xl font-bold leading-tight transition-colors ${isActive ? "text-mint" : "text-forest-900"}`}>
                    {item.degree}
                  </h3>
                </div>
                
                <div className="mb-4 text-sm font-medium text-forest-800 flex items-center gap-2">
                  <svg className="w-4 h-4 text-forest-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>
                    {item.university}
                    <span className="text-forest-500 font-normal ml-1">— {item.location}</span>
                  </span>
                </div>
                
                <p className="text-ink-soft leading-relaxed text-sm border-t border-forest-50 pt-4">
                  {item.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Sticky Map */}
      <div className="lg:sticky lg:top-32 relative z-10 w-full rounded-3xl p-4 bg-white/50 backdrop-blur border border-forest-100 shadow-xl">
        <ResearchMap 
          geometry={geometry} 
          activeId={activeId} 
          onActiveIdChange={setActiveId}
          hideInfoPanel={true}
        />
        
        <div className="mt-6 text-center pb-2">
          <p className="text-sm font-medium text-forest-600 bg-forest-50 inline-block px-4 py-2 rounded-full">
            Hover over a map point or a card to explore the journey.
          </p>
        </div>
      </div>
    </div>
  );
}
