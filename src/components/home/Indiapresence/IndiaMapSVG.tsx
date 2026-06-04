import React, { useState, useEffect, useCallback, useMemo } from "react";
import indiaMapData from "@/data/india-map-raw.js";
import { stateData } from "@/data/indiaPresenceData";
import { cn } from "@/lib/utils";

// Map from svg-maps IDs to our stateData IDs (interactive states)
const svgIdToStateId: Record<string, string> = {
  as: "assam",
  ap: "andhra-pradesh",
  ct: "chhattisgarh",
  gj: "gujarat",
  hr: "haryana",
  hp: "himachal-pradesh",
  jh: "jharkhand",
  ka: "karnataka",
  kl: "Keralam",
  mp: "madhya-pradesh",
  mh: "maharashtra",
  or: "odisha",
  pb: "punjab",
  rj: "rajasthan",
  tn: "tamil-nadu",
  up: "uttar-pradesh",
  ut: "uttarakhand",
  wb: "west-bengal",
};

// Reverse mapping
const stateIdToSvgId: Record<string, string> = {};
Object.entries(svgIdToStateId).forEach(([svgId, stateId]) => {
  stateIdToSvgId[stateId] = svgId;
});

// Only states with data get markers
const interactiveStateIds = new Set(Object.keys(stateData));

// Manually defined center coordinates for each state (calibrated to viewBox 0 0 612 696)
const stateCentroids: Record<string, { x: number; y: number }> = {
  "tamil-nadu": { x: 210, y: 610 },
  "Keralam": { x: 165, y: 600 },
  "andhra-pradesh": { x: 250, y: 495 },
  "gujarat": { x: 95, y: 340 },
  "maharashtra": { x: 155, y: 440 },
  "assam": { x: 520, y: 270 },
  "haryana": { x: 170, y: 205 },
  "uttar-pradesh": { x: 250, y: 260 },
};

const standaloneMarkers = [
  {
    id: "puducherry",
    stateId: "puducherry",
    centroid: { x: 240, y: 585 },
    name: "Puducherry",
    districts: ["Puducherry"],
  },
];

interface IndiaMapSVGProps {
  activeState: string | null;
  onStateHover: (stateId: string | null) => void;
  onStateClick: (stateId: string) => void;
}

const IndiaMapSVG: React.FC<IndiaMapSVGProps> = ({
  activeState,
  onStateHover,
  onStateClick,
}) => {
  const locations = indiaMapData.locations as Array<{
    name: string;
    id: string;
    path: string;
  }>;

  // Auto-cycle through markers one at a time
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const handleMarkerEnter = useCallback((stateId: string, index: number) => {
    setHighlightedIndex(index);
    onStateHover(stateId);
  }, [onStateHover]);

  const handleMarkerLeave = useCallback(() => {
    onStateHover(null);
  }, [onStateHover]);

  // Collect marker data for interactive states that have stateData and centroids
  const markerLocations = useMemo(() => {
    const stateMarkerLocations = Object.entries(stateCentroids)
      .filter(([stateId]) => interactiveStateIds.has(stateId))
      .map(([stateId, centroid], index) => {
        const svgId = stateIdToSvgId[stateId] || stateId;
        return {
          stateId,
          centroid,
          index,
          id: svgId,
        };
      });

    return [
      ...stateMarkerLocations,
      ...standaloneMarkers.map((marker, offset) => ({
        id: marker.id,
        stateId: marker.stateId,
        centroid: marker.centroid,
        index: stateMarkerLocations.length + offset,
      })),
    ];
  }, []);

  useEffect(() => {
    if (activeState) return;
    const timer = setInterval(() => {
      setHighlightedIndex((prev) => (prev + 1) % markerLocations.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [activeState, markerLocations.length]);

  const stateIdToMarkerIndex = useMemo(
    () => new Map(markerLocations.map((marker) => [marker.stateId, marker.index])),
    [markerLocations],
  );

  useEffect(() => {
    if (!activeState) return;
    const idx = stateIdToMarkerIndex.get(activeState);
    if (typeof idx === "number") setHighlightedIndex(idx);
  }, [activeState, stateIdToMarkerIndex]);

  // Render highlighted marker last so it appears above others (SVG has no z-index)
  const orderedMarkerLocations = [...markerLocations].sort(
    (a, b) => Number(a.index === highlightedIndex) - Number(b.index === highlightedIndex),
  );

  return (
    <svg
      viewBox={indiaMapData.viewBox}
      className="block h-auto w-full"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Marker/tooltip animation keyframes */}
      <defs>
        <style>{`
          @keyframes marker-pulse {
            0%, 100% { transform: scale(1); opacity: 0.55; }
            50% { transform: scale(1.8); opacity: 0.12; }
          }
          @keyframes marker-ping {
            0% { transform: scale(1); opacity: 0.6; }
            75%, 100% { transform: scale(2.5); opacity: 0; }
          }
          .animate-marker-pulse {
            animation: marker-pulse 1.8s ease-in-out infinite;
            transform-box: fill-box;
            transform-origin: center;
          }
          .animate-marker-ping {
            animation: marker-ping 1.8s ease-in-out infinite;
            transform-box: fill-box;
            transform-origin: center;
          }
        `}</style>
      </defs>

      {/* All state paths */}
      {locations.map((location) => {
        const stateId = svgIdToStateId[location.id];
        const isInteractive = !!stateId && interactiveStateIds.has(stateId);
        const isActive = activeState === stateId;

        return (
          <path
            key={location.id}
            d={location.path}
            className={cn(
              "map-state-path stroke-black transition-colors duration-200",
              !isInteractive
                ? "fill-white cursor-default"
                : isActive
                  ? "fill-emerald-700 cursor-pointer"
                  : "fill-white cursor-pointer"
            )}
            strokeWidth={0.5}
            onMouseEnter={
              isInteractive ? () => onStateHover(stateId) : undefined
            }
            onMouseLeave={
              isInteractive ? () => onStateHover(null) : undefined
            }
            onClick={
              isInteractive ? () => onStateClick(stateId) : undefined
            }
          >
            <title>{location.name}</title>
          </path>
        );
      })}

      {/* MapPin Markers on all interactive states */}
      {orderedMarkerLocations.map(({ stateId, centroid, index, id }) => {
        const isActive = activeState === stateId;
        const pinColor = "hsl(0, 0%, 60%)";

        return (
          <g
            key={`marker-${id}`}
            className="marker-group cursor-pointer"
            onMouseEnter={() => handleMarkerEnter(stateId, index)}
            onMouseLeave={handleMarkerLeave}
            onClick={() => onStateClick(stateId)}
          >
            {/* Pulsing outer ring */}
            <circle
              cx={centroid.x}
              cy={centroid.y}
              r="8"
              fill={pinColor} 
              opacity="0.3"
              className="animate-marker-pulse"
              style={{ animationDelay: `${index * 0.12}s` }}
            />

            {/* Ping ring (active state gets a more prominent ping) */}
            {isActive && (
              <circle
                cx={centroid.x}
                cy={centroid.y}
                r="8"
                fill="none"
                stroke={pinColor}
                strokeWidth="2"
                className="animate-marker-ping"
              />
            )}

            {/* Inner dot (white center) */}
            <circle
              cx={centroid.x}
              cy={centroid.y}
              r="5"
              fill="white"
              stroke={pinColor}
              strokeWidth="1.5"
            />

            {/* MapPin icon - positioned above centroid, scaled for viewBox */}
            <g transform={`translate(${centroid.x - 7}, ${centroid.y - 20}) scale(1.4)`}>
              <path
                d="M5 0C2.24 0 0 2.24 0 5c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 7.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
                fill={pinColor}
                stroke="white"
                strokeWidth="0.8"
                opacity={isActive ? 1 : 0.85}
              />
            </g>

          </g>
        );
      })}
    </svg>
  );
};

export default IndiaMapSVG;
