"use client";

import { useState } from "react";
import type { WorldMapGeometry } from "@/lib/worldMap";
import type { MapLocation } from "@/lib/types";

interface ResearchMapProps {
  geometry: WorldMapGeometry;
  activeId?: string | null;
  onActiveIdChange?: (id: string | null) => void;
  hideInfoPanel?: boolean;
}

export default function ResearchMap({ geometry, activeId: externalActiveId, onActiveIdChange, hideInfoPanel = false }: ResearchMapProps) {
  const { width, height, countries, markers } = geometry;
  const [internalActiveId, setInternalActiveId] = useState<string | null>(null);
  
  const isControlled = externalActiveId !== undefined;
  const activeId = isControlled ? externalActiveId : internalActiveId;
  const setActiveId = (id: string | null) => {
    if (onActiveIdChange) onActiveIdChange(id);
    if (!isControlled) setInternalActiveId(id);
  };

  const active = markers.find((m) => m.id === activeId) ?? null;
  const distinctCountries = new Set(markers.map((m) => m.country)).size;

  return (
    <div className={`grid gap-8 ${hideInfoPanel ? "" : "lg:grid-cols-[1.55fr_1fr] lg:items-center"}`}>
      {/* Map */}
      <div className="relative overflow-hidden rounded-3xl border border-forest-100 bg-white/80 shadow-sm backdrop-blur-sm">
        <div className="bg-dot-grid-dark absolute inset-0 opacity-60" aria-hidden />
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="relative w-full"
          role="img"
          aria-label="World map of research and study locations"
        >
          <g>
            {countries.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="#2a352a"
                stroke="#42513f"
                strokeWidth={0.4}
              />
            ))}
          </g>

          <g>
            {markers.map((loc) => {
              const isActive = loc.id === activeId;
              return (
                <g
                  key={loc.id}
                  transform={`translate(${loc.x}, ${loc.y})`}
                  className="cursor-pointer"
                  onMouseEnter={() => setActiveId(loc.id)}
                  onMouseLeave={() => setActiveId(null)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${loc.city}, ${loc.country} — ${loc.role}`}
                  onFocus={() => setActiveId(loc.id)}
                  onBlur={() => setActiveId(null)}
                >
                  {/* Generous transparent hit-area */}
                  <circle r={12} fill="transparent" />
                  {isActive && (
                    <circle
                      r={6}
                      fill="none"
                      stroke="#d8a463"
                      strokeWidth={1.5}
                      className="animate-pulse-ring"
                      style={{ transformOrigin: "center" }}
                    />
                  )}
                  <circle
                    r={isActive ? 6 : 4}
                    fill={isActive ? "#d8a463" : "#c5863f"}
                    stroke="#212a22"
                    strokeWidth={1.4}
                    style={{ transition: "r 0.2s ease" }}
                  />
                  {isActive && (
                    <text
                      y={-14}
                      textAnchor="middle"
                      className="fill-forest-900 text-[11px] font-semibold"
                      style={{
                        paintOrder: "stroke",
                        stroke: "#ffffff",
                        strokeWidth: 3,
                      }}
                    >
                      {loc.city}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        {/* Legend */}
        <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-forest-100 bg-white/90 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-forest-900 backdrop-blur shadow-sm">
          <span className="h-2.5 w-2.5 rounded-full bg-mint" />
          Research &amp; study sites
        </div>
      </div>

      {/* Info panel */}
      {!hideInfoPanel && (
        <div className="relative min-h-[16rem]">
          {active ? (
            <div className="bg-white/80 backdrop-blur-sm shadow-sm border border-forest-100 animate-fade-up rounded-3xl p-7 transition-all duration-300">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-mint">
                {active.period}
              </span>
              <h3 className="mt-3 font-display text-3xl font-semibold text-forest-900">
                {active.city},{" "}
                <span className="text-mint">{active.country}</span>
              </h3>
              <p className="mt-1 text-sm font-medium text-forest-700">
                {active.role}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                {active.detail}
              </p>
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-forest-200 bg-forest-50 p-7 h-full flex flex-col justify-center">
              <h3 className="font-display text-2xl font-semibold text-forest-900">
                Hover a marker to explore
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Each point marks a place where I have studied, researched or
                trained — across {distinctCountries} countries and two continents.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {markers.map((loc: MapLocation) => (
                  <li key={loc.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveId(loc.id)}
                      onFocus={() => setActiveId(loc.id)}
                      onMouseLeave={() => setActiveId(null)}
                      className="rounded-full border border-forest-200 bg-white px-3 py-1.5 text-xs font-medium text-forest-700 shadow-sm transition-colors hover:border-mint hover:bg-mint hover:text-white"
                    >
                      {loc.city}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
