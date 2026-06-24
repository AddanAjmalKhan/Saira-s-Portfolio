import { geoEqualEarth, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { FeatureCollection } from "geojson";
import topology from "@/data/world-110m.json";
import type { MapLocation } from "@/lib/types";

export const MAP_WIDTH = 820;
export const MAP_HEIGHT = 460;

export interface ProjectedMarker extends MapLocation {
  x: number;
  y: number;
}

export interface WorldMapGeometry {
  width: number;
  height: number;
  countries: string[];
  markers: ProjectedMarker[];
}

/**
 * Projects the world topology and research locations to SVG coordinates.
 * Runs entirely on the server at build time — the client receives only
 * ready-to-render path strings and marker positions (no map libraries shipped).
 */
export function buildWorldMap(mapLocations: MapLocation[]): WorldMapGeometry {
  const topo = topology as unknown as Topology;
  const collection = feature(
    topo,
    topo.objects.countries as GeometryCollection
  ) as FeatureCollection;

  const projection = geoEqualEarth()
    .scale(165)
    .center([8, 12])
    .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2]);

  const pathGenerator = geoPath(projection);

  const countries = collection.features
    .map((f) => pathGenerator(f))
    .filter((d): d is string => Boolean(d));

  const markers: ProjectedMarker[] = mapLocations.map((loc) => {
    const point = projection(loc.coordinates);
    return { ...loc, x: point ? point[0] : 0, y: point ? point[1] : 0 };
  });

  return { width: MAP_WIDTH, height: MAP_HEIGHT, countries, markers };
}
