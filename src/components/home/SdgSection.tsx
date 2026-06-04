import { useState, useCallback, useRef } from "react";
import sdgLogo from "@/assets/website/Sustainable-Development-Goals.logo.png";
import sdgBgVideo from "@/assets/website/sdg-bg.mp4";
import sdg03 from "@/assets/website/sdg-icons/sdg-03.png";
import sdg06 from "@/assets/website/sdg-icons/sdg-06.png";
import sdg08 from "@/assets/website/sdg-icons/sdg-08.png";
import sdg09 from "@/assets/website/sdg-icons/sdg-09.png";
import sdg10 from "@/assets/website/sdg-icons/sdg-10.png";
import sdg11 from "@/assets/website/sdg-icons/sdg-11.png";
import sdg12 from "@/assets/website/sdg-icons/sdg-12.png";
import sdg13 from "@/assets/website/sdg-icons/sdg-13.png";
import sdg15 from "@/assets/website/sdg-icons/sdg-15.png";
import sdg17 from "@/assets/website/sdg-icons/sdg-17.png";

// Add styles for wheel rotation animation
const wheelAnimationStyle = `
  @keyframes wheelRotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .sdg-wheel-rotate {
    transform-origin: 250px 250px;
    animation: wheelRotate 20s linear infinite;
  }
  .sdg-wheel-pause {
    animation-play-state: paused;
  }
`;

const GOALS = [
  { id: 3,  name: "Good Health and Well-Being",               color: "#4C9F38", lines: ["GOOD HEALTH", "AND WELL-BEING"],             img: sdg03 },
  { id: 6,  name: "Clean Water and Sanitation",               color: "#26BDE2", lines: ["CLEAN WATER", "AND SANITATION"],             img: sdg06 },
  { id: 8,  name: "Decent Work and Economic Growth",          color: "#A21942", lines: ["DECENT WORK", "AND ECONOMIC GROWTH"],        img: sdg08 },
  { id: 9,  name: "Industry, Innovation and Infrastructure",  color: "#FD6925", lines: ["INDUSTRY, INNOVATION", "& INFRASTRUCTURE"],  img: sdg09 },
  { id: 10, name: "Reduced Inequalities",                     color: "#e11484",  lines: ["REDUCED", "INEQUALITIES"],                  img: sdg10 },
  { id: 11, name: "Sustainable Cities and Communities",       color: "#FD9D24", lines: ["SUSTAINABLE CITIES", "AND COMMUNITIES"],     img: sdg11 },
  { id: 12, name: "Responsible Consumption and Production",   color: "#BF8B2E", lines: ["RESPONSIBLE", "CONSUMPTION & PRODUCTION"],   img: sdg12 },
  { id: 13, name: "Climate Action",                           color: "#3F7E44", lines: ["CLIMATE", "ACTION"],                         img: sdg13 },
  { id: 15, name: "Life on Land",                             color: "#56C02B", lines: ["LIFE", "ON LAND"],                           img: sdg15 },
  { id: 17, name: "Partnerships for the Goals",               color: "#19486A", lines: ["PARTNERSHIPS", "FOR THE GOALS"],             img: sdg17 },
] as const;

const CX = 250, CY = 250, R_IN = 105, R_OUT = 245;
const N = GOALS.length;
const SEG = 360 / N;
const GAP = 5;
const ICON_SIZE = 66;
const ff = "'Franklin Gothic Medium','Arial Narrow',Arial,sans-serif";

function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  const a = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

function segPath(i: number) {
  const a1 = i * SEG + GAP / 2, a2 = (i + 1) * SEG - GAP / 2;
  const [x1, y1] = polar(CX, CY, R_OUT, a1);
  const [x2, y2] = polar(CX, CY, R_OUT, a2);
  const [x3, y3] = polar(CX, CY, R_IN,  a2);
  const [x4, y4] = polar(CX, CY, R_IN,  a1);
  return `M${x1},${y1} A${R_OUT},${R_OUT},0,0,1,${x2},${y2} L${x3},${y3} A${R_IN},${R_IN},0,0,0,${x4},${y4}Z`;
}

function segCenter(i: number): [number, number] {
  return polar(CX, CY, (R_IN + R_OUT) / 2, i * SEG + SEG / 2);
}

function getRotationDeg(el: SVGGraphicsElement): number {
  const transform = getComputedStyle(el).transform;
  if (!transform || transform === "none") return 0;

  const values = transform
    .replace(/^matrix3d\(|^matrix\(|\)$/g, "")
    .split(",")
    .map((v) => Number(v.trim()));

  if (values.length === 6) {
    const [a, b] = values;
    return (Math.atan2(b, a) * 180) / Math.PI;
  }

  if (values.length === 16) {
    const a = values[0];
    const b = values[1];
    return (Math.atan2(b, a) * 180) / Math.PI;
  }

  return 0;
}

/**
 * Returns the segment index clicked, or:
 *  -1  → clicked in the hub (inside R_IN)  → clear active
 *  -2  → clicked outside the wheel (> R_OUT) → clear active
 */
function getClickedSegment(e: React.MouseEvent<SVGSVGElement>, rotationDeg: number): number {
  const svg = e.currentTarget as SVGSVGElement;
  const rect = svg.getBoundingClientRect();
  const x = (e.clientX - rect.left) * (500 / rect.width);
  const y = (e.clientY - rect.top)  * (500 / rect.height);
  const dx = x - CX, dy = y - CY;
  const dist = Math.hypot(dx, dy);

  // Inside hub → dismiss
  if (dist < R_IN) return -1;
  // Outside ring → dismiss
  if (dist > R_OUT) return -2;

  let angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
  if (angle < 0) angle += 360;
  angle = (angle - rotationDeg) % 360;
  if (angle < 0) angle += 360;
  return Math.floor(angle / SEG) % N;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SDG Wheel Section
// ═══════════════════════════════════════════════════════════════════════════════

export default function SDGSection() {
  const half = ICON_SIZE / 2;
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const wheelRef = useRef<SVGGElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleClick = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    const rotationDeg = wheelRef.current ? getRotationDeg(wheelRef.current) : 0;
    const idx = getClickedSegment(e, rotationDeg);

    // -1 or -2 means "outside a segment" → clear selection
    if (idx < 0) {
      setActiveIdx(null);
      return;
    }

    setActiveIdx(idx);
  }, []);

  const active = activeIdx !== null ? GOALS[activeIdx] : null;

  return (
    <section
      className="relative isolate overflow-hidden bg-background"
      onClick={() => setActiveIdx(null)}
    >
      <style>{wheelAnimationStyle}</style>
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src={sdgBgVideo} type="video/mp4" />
      </video>
      {/* Overlay to keep text readable */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-black/30" />
      
      <div className="container-main relative z-10 py-16 md:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 ">
          {/* Left text panel */}
          <div className="w-full ">
            {/* <p className=" md:text-md uppercase text-white">
              UN Sustainable Development Goals
            </p> */}
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
              Our Commitment to the UN Sustainable Development <span className="text-white">Goals</span>
            </h2>
            <p className="text-white text-md md:text-lg leading-relaxed mb-4 text-justify">
              As part of the Blue Planet Group, Zigma embeds sustainability into the very core of
              its mission. By advancing the Triple Bottom Line of People, Planet, and Prosperity,
              we ensure that every initiative delivers enduring value to communities and ecosystems.
            </p>
            <p className="text-white text-md md:text-lg leading-relaxed mb-4 text-justify">
              Guided by the United Nations Sustainable Development Goals, our operations generate
              measurable impact - strengthening public health and well - being through safe and
              scientific waste management, safeguarding clean water and sanitation by protecting
              vital resources, and enabling sustainable cities and communities through circular
              solutions that make urban environments more resilient and future - ready.
            </p>
            <p className="text-white text-md md:text-lg leading-relaxed mb-4 text-justify">
              Zigma contributes to 10 of the 17 UN Sustainable Development Goals, aligning
              innovation with responsibility to achieve a Net Positive Impact - leaving behind
              stronger communities, cleaner environments, and a more sustainable future.
            </p>
          </div>

          {/* Wheel — right side */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="w-full max-w-[400px] aspect-square select-none">
              <svg
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "100%", height: "100%", overflow: "visible", cursor: "pointer" }}
                onClick={handleClick}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <defs>
                  <clipPath id="sdg-hub-clip">
                    <circle cx={CX} cy={CY} r={R_IN - 10} />
                  </clipPath>
                </defs>

                {/* Rotating segments and icons group */}
                <g
                  ref={wheelRef}
                  className={`sdg-wheel-rotate${isPaused ? " sdg-wheel-pause" : ""}`}
                >
                  {/* Segments — colour only, no text */}
                  {GOALS.map((g, i) => (
                    <path
                      key={`seg-${g.id}`}
                      d={segPath(i)}
                      fill={g.color}
                      style={{ opacity: 1, transition: "opacity 0.25s ease" }}
                    />
                  ))}

                  {/* Icons only — no text labels */}
                  {GOALS.map((g, i) => {
                    const [ix, iy] = segCenter(i);
                    return (
                      <image
                        key={`icon-${g.id}`}
                        href={g.img}
                        x={ix - half}
                        y={iy - half}
                        width={ICON_SIZE}
                        height={ICON_SIZE}
                        preserveAspectRatio="xMidYMid meet"
                        style={{
                          pointerEvents: "none",
                          opacity: 1,
                          transition: "opacity 0.25s ease",
                        }}
                      />
                    );
                  })}
                </g>

                {/* Hub fill — active goal colour or white */}
                <circle
                  cx={CX} cy={CY} r={R_IN - 2}
                  fill={active ? active.color : "white"}
                  style={{ transition: "fill 0.3s ease" }}
                />

                {/* Hub content */}
                {active ? (
                  <>
                    {/* Goal number */}
                    <text
                      x={CX} y={CY - 22}
                      textAnchor="middle" dominantBaseline="middle"
                      fill="white" fontSize={54} fontWeight="1000" fontFamily={ff}
                      style={{ userSelect: "none" }}
                    >
                      {active.id}
                    </text>
                    {/* Goal name lines */}
                    {active.lines[1] ? (
                      <>
                        <text x={CX} y={CY + 6} textAnchor="middle" fill="white"
                          fontSize={14} fontWeight="bold" fontFamily={ff}
                          style={{ userSelect: "none" }}>{active.lines[0]}</text>
                        <text x={CX} y={CY + 20} textAnchor="middle" fill="white"
                          fontSize={14} fontWeight="bold" fontFamily={ff}
                          style={{ userSelect: "none" }}>{active.lines[1]}</text>
                      </>
                    ) : (
                      <text x={CX} y={CY + 12} textAnchor="middle" fill="white"
                        fontSize={12} fontWeight="bold" fontFamily={ff}
                        style={{ userSelect: "none" }}>{active.lines[0]}</text>
                    )}
                  </>
                ) : (
                  /* Empty hub — show SDG logo initially */
                  <image
                    href={sdgLogo}
                    x={CX - (R_IN - 12)}
                    y={CY - (R_IN - 12)}
                    width={(R_IN - 12) * 2}
                    height={(R_IN - 12) * 2}
                    preserveAspectRatio="xMidYMid meet"
                    clipPath="url(#sdg-hub-clip)"
                    style={{ userSelect: "none", pointerEvents: "none", opacity: 0.98 }}
                  />
                )}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
