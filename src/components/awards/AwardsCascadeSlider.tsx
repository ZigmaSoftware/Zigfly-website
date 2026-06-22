// import { useCallback, useEffect, useRef } from "react";

// export interface AwardsCascadeSlide {
//   id: string;
//   title: string;
//   subtitle: string;
//   imageUrl: string;
// }

// type SlidePosition = "now" | "prev" | "next" | "hidden";

// interface AwardsCascadeSliderProps {
//   slides: AwardsCascadeSlide[];
//   currentIndex: number;
//   onIndexChange: (index: number) => void;
//   onViewDetails?: () => void;
//   imageOnly?: boolean;
// }

// function getPosition(index: number, current: number, total: number): SlidePosition {
//   if (index === current) return "now";
//   if (index === (current - 1 + total) % total) return "prev";
//   if (index === (current + 1) % total) return "next";
//   return "hidden";
// }

// const POSITION_CLASSES: Record<SlidePosition, string> = {
//   now:
//     "opacity-100 z-10 [transform:translateY(-50%)_translateX(-50%)_scale(1)]",
//   prev:
//     "hidden md:block opacity-100 z-[1] [transform:translateY(-50%)_translateX(calc(-50%-300px))_scale(0.84)]",
//   next:
//     "hidden md:block opacity-100 z-[1] [transform:translateY(-50%)_translateX(calc(-50%+300px))_scale(0.84)]",
//   hidden:
//     "opacity-0 z-0 pointer-events-none [transform:translateY(-50%)_translateX(-50%)_scale(0.7)]",
// };

// function ChevronLeft() {
//   return (
//     <svg
//       className="h-8 w-8"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth={2.5}
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       aria-hidden="true"
//     >
//       <polyline points="15 18 9 12 15 6" />
//     </svg>
//   );
// }

// function ChevronRight() {
//   return (
//     <svg
//       className="h-8 w-8"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth={2.5}
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       aria-hidden="true"
//     >
//       <polyline points="9 6 15 12 9 18" />
//     </svg>
//   );
// }

// interface SlideCardProps {
//   slide: AwardsCascadeSlide;
//   position: SlidePosition;
//   isActive: boolean;
//   onClick: () => void;
//   onViewDetails?: () => void;
//   imageOnly?: boolean;
// }

// function SlideCard({ slide, position, isActive, onClick, onViewDetails, imageOnly = false }: SlideCardProps) {
//   return (
//     <div
//       className={[
//         `absolute left-1/2 top-1/2 w-[88vw] ${imageOnly ? "max-w-[560px]" : "max-w-[700px]"} transition-[transform,opacity,filter] duration-[1400ms] ease-[cubic-bezier(0.19,1,0.22,1)] will-change-transform`,
//         position === "prev" || position === "next" ? "brightness-[0.9]" : "brightness-100",
//         POSITION_CLASSES[position],
//       ].join(" ")}
//     >
//       <button
//         type="button"
//         onClick={onClick}
//         className="w-full overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[0_24px_60px_rgba(15,23,42,0.16)]"
//       >
//         <div className={imageOnly ? "relative h-[320px] bg-slate-100 p-3 md:h-[360px]" : "grid min-h-[260px] grid-cols-1 md:min-h-[320px] md:grid-cols-2"}>
//           <div className={imageOnly ? "relative h-full" : "relative h-[190px] bg-slate-100 p-3 md:h-full"}>
//             <img
//               src={slide.imageUrl}
//               alt={slide.title}
//               className="h-full w-full object-contain"
//               loading="lazy"
//             />
//           </div>

//           {!imageOnly && (
//             <div className="flex flex-col justify-between p-5 md:p-7">
//             <div>
//               <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
//                 Award Recognition
//               </p>
//               <h3 className="mt-2 text-xl font-bold leading-tight text-foreground md:text-2xl">
//                 {slide.title}
//               </h3>
//               <p className="mt-3 text-sm text-slate-600 md:text-base">{slide.subtitle}</p>
//             </div>

//             {isActive && onViewDetails && (
//               <span
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   onViewDetails();
//                 }}
//                 className="mt-5 inline-flex w-fit items-center rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground"
//               >
//                 View Details
//               </span>
//             )}
//             </div>
//           )}
//         </div>
//       </button>
//     </div>
//   );
// }

// export default function AwardsCascadeSlider({
//   slides,
//   currentIndex,
//   onIndexChange,
//   onViewDetails,
//   imageOnly = false,
// }: AwardsCascadeSliderProps) {
//   const total = slides.length;
//   const currentIndexRef = useRef(currentIndex);

//   useEffect(() => {
//     currentIndexRef.current = currentIndex;
//   }, [currentIndex]);

//   useEffect(() => {
//     if (total <= 1) return;
//     const timer = window.setInterval(() => {
//       onIndexChange((currentIndexRef.current + 1) % total);
//     }, 6200);

//     return () => window.clearInterval(timer);
//   }, [total, onIndexChange]);

//   const go = useCallback(
//     (dir: 1 | -1) => {
//       onIndexChange((currentIndex + dir + total) % total);
//     },
//     [currentIndex, total, onIndexChange],
//   );

//   if (total === 0) return null;

//   return (
//     <section className="relative rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
//       <div className="relative h-[420px] overflow-hidden md:h-[470px]">
//         {slides.map((slide, index) => (
//           <SlideCard
//             key={slide.id}
//             slide={slide}
//             position={getPosition(index, currentIndex, total)}
//             isActive={index === currentIndex}
//             onClick={() => onIndexChange(index)}
//             onViewDetails={onViewDetails}
//             imageOnly={imageOnly}
//           />
//         ))}

//         <button
//           type="button"
//           aria-label="Previous award"
//           onClick={() => go(-1)}
//           className="absolute left-1 top-1/2 z-20 -translate-y-1/2 rounded-full border border-slate-300 bg-white/90 p-2 text-slate-700 shadow-sm transition-colors hover:bg-white md:left-3"
//         >
//           <ChevronLeft />
//         </button>

//         <button
//           type="button"
//           aria-label="Next award"
//           onClick={() => go(1)}
//           className="absolute right-1 top-1/2 z-20 -translate-y-1/2 rounded-full border border-slate-300 bg-white/90 p-2 text-slate-700 shadow-sm transition-colors hover:bg-white md:right-3"
//         >
//           <ChevronRight />
//         </button>
//       </div>

//       <div className="mt-5 flex justify-center gap-2">
//         {slides.map((slide, index) => (
//           <button
//             key={slide.id}
//             type="button"
//             aria-label={`Go to award ${index + 1}`}
//             onClick={() => onIndexChange(index)}
//             className={[
//               "h-3 w-3 rounded-full border border-primary/60 transition-all duration-300",
//               index === currentIndex ? "bg-primary" : "bg-transparent hover:bg-primary/35",
//             ].join(" ")}
//           />
//         ))}
//       </div>

//       <div className="mt-5 overflow-x-auto pb-1">
//         <div className="mx-auto flex w-max min-w-full items-center justify-center gap-2 px-1">
//           {slides.map((slide, index) => (
//             <button
//               key={`${slide.id}-thumb`}
//               type="button"
//               aria-label={`Select ${slide.title}`}
//               onClick={() => onIndexChange(index)}
//               className={[
//                 "group relative h-14 w-16 shrink-0 overflow-hidden rounded-md border bg-white transition-all duration-300 md:h-16 md:w-20",
//                 index === currentIndex
//                   ? "scale-105 border-primary ring-2 ring-primary/30"
//                   : "border-slate-300 hover:border-primary/60",
//               ].join(" ")}
//             >

//               <img
//                 src={slide.imageUrl}
//                 alt={slide.title}
//                 className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
//                 loading="lazy"
//               />
//             </button>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
