import { useCallback, useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import bg from "@/assets/website/hero/Testimonials-bg.jpeg";
import dinesanPhoto from "@/assets/Testimonials/Guests/Dr. Dinesan Cheruvat.webp";
import pradeepPhoto from "@/assets/Testimonials/Guests/Pradeep.webp";
import saleenaPhoto from "@/assets/Testimonials/Guests/saleenaa.webp";
import shameeraPhoto from "@/assets/Testimonials/Guests/shameera.webp";
import jessyPhoto from "@/assets/Testimonials/Guests/Thodupuzha Municipality (Idukki) Councilor  , PROF. JESSY ANTONY.webp";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Testimonial = {
  id: string;
  name: string;
  designation: string;
  quote: string;
  image?: string;
};

const testimonials: Testimonial[] = [
  {
    id: "saleena-vg-nair",
    name: "Saleena V. G. Nair",
    designation: "Additional District Judge, Ernakulam, Keralam",
    quote:
      "Really impressed by the technology adopted by Zigma. Best wishes to the project.",
    image: saleenaPhoto,
  },
  {
    id: "pradeep-kp",
    name: "Dr. Pradeep K. P.",
    designation: "Advocate, High Court of Keralam",
    quote:
      "Scientific approach in the bio waste management is a welcome move. All the best to Zigma.",
    image: pradeepPhoto,
  },
  {
    id: "dinesan-chennat",
    name: "Dr. Dinesan Cheruvat (IAS)",
    designation: "Director (Rural) for LSGD, Keralam",
    quote:
      "Biomining of organic waste seems to be a feasible solution even for bulk waste.",
    image: dinesanPhoto,
  },
  {
    id: "shemeera-kunhu",
    name: "Dr. T. Shemeera Kunhu",
    designation: "Head of Department, Assistant Professor, PTM Government College Perinthalmanna, Keralam",
    quote:
      "Mr. Shiva explained the process well. Very interesting process. The solar drier was a new idea which one learned.",
    image: shameeraPhoto,
  },
  {
    id: "jessy-antony",
    name: "Prof. Jessy Antony",
    designation: "Municipal Councillor, Thodupuzha Municipality, Keralam",
    quote:
      "A team of 24 councillors and 4 staff visited Brahmapuram plant as a part of study tour. We also studied about the process of management of biodegradable waste using Black Soldier Fly.",
    image: jessyPhoto,
  },
];

const SLIDE_DELAY_MS = 6500;
const RESUME_DELAY_MS = 8000;

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartRef = useRef(0);

  const goTo = useCallback((index: number) => {
    setCurrent((index + testimonials.length) % testimonials.length);
  }, []);

  const clearResumeTimeout = useCallback(() => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  }, []);

  const stopAuto = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAuto = useCallback(() => {
    stopAuto();
    intervalRef.current = setInterval(() => {
      setCurrent((value) => (value + 1) % testimonials.length);
    }, SLIDE_DELAY_MS);
  }, [stopAuto]);

  const resumeAuto = useCallback(() => {
    clearResumeTimeout();
    resumeTimeoutRef.current = setTimeout(() => {
      startAuto();
    }, RESUME_DELAY_MS);
  }, [clearResumeTimeout, startAuto]);

  useEffect(() => {
    startAuto();
    return () => {
      stopAuto();
      clearResumeTimeout();
    };
  }, [clearResumeTimeout, startAuto, stopAuto]);

  const handlePrev = () => {
    stopAuto();
    goTo(current - 1);
    resumeAuto();
  };

  const handleNext = () => {
    stopAuto();
    goTo(current + 1);
    resumeAuto();
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartRef.current = event.touches[0]?.clientX ?? 0;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const delta = touchStartRef.current - (event.changedTouches[0]?.clientX ?? 0);
    if (Math.abs(delta) < 50) return;

    stopAuto();
    if (delta > 0) {
      goTo(current + 1);
    } else {
      goTo(current - 1);
    }
    resumeAuto();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-20">
          <img
            src={bg}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/25"
            aria-hidden="true"
          />
          <div className="container-main relative text-center">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-white/85">
              Testimonials
            </p>
            <h1 className="mt-3 text-5xl font-bold leading-tight text-white md:text-6xl">
              Voices From the People Who Saw It Firsthand
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/90">
              Reflections from judges, public leaders, civic representatives, and
              visitors who observed Zigfly&apos;s Black Soldier Fly waste-to-value model
              up close.
            </p>
          </div>
        </section>

        <section className="section-padding relative overflow-hidden">
          <div className="container-main relative">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Featured Testimonials
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                What Our <span className="text-primary">Guests Say</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                A cleaner featured layout based on the reference design, built from
                the actual names, verified designations, and original visitor quotes.
              </p>
            </div>

            <div
              className="relative mt-10 overflow-hidden rounded-2xl"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  aria-hidden={index !== current}
                  className={cn(
                    "transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
                    index === current
                      ? "relative z-20 translate-x-0 scale-100 opacity-100"
                      : "pointer-events-none absolute inset-0 z-10 translate-x-12 scale-[0.985] opacity-0"
                  )}
                >
                  <article
                    className="relative overflow-hidden rounded-[26px] border border-slate-200/80 bg-white p-6 shadow-[0_14px_38px_rgba(15,23,42,0.10)] sm:p-8 md:min-h-[430px] md:p-10"
                    onMouseEnter={stopAuto}
                    onMouseLeave={resumeAuto}
                  >
                    <div className="absolute left-0 top-0 h-full w-[4px] bg-gradient-to-b from-emerald-600 to-emerald-400" />
                    <div className="absolute right-0 top-0 h-full w-full bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.10),_transparent_28%)]" />

                    <div className="relative z-10 grid h-full items-center justify-items-center gap-6 md:grid-cols-[280px_1fr] md:gap-10">
                      <div className="mx-auto w-full max-w-[240px] md:max-w-[280px]">
                        <div className="relative aspect-[4/5] overflow-hidden border border-emerald-200/90 bg-emerald-50 shadow-[0_10px_24px_rgba(16,185,129,0.12)]">
                          {testimonial.image ? (
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="h-full w-full object-cover object-top"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(145deg,#14532d,#854d0e)] text-6xl font-semibold tracking-[0.08em] text-white">
                              {getInitials(testimonial.name)}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid h-full w-full max-w-3xl grid-rows-[1fr_auto] gap-4">
                        <div className="relative w-full self-center pb-8 pt-1">
                          <div className="mb-4 opacity-75">
                            <svg width="30" height="30" viewBox="0 0 48 48" fill="none">
                              <path
                                d="M14 20h-4a6 6 0 0 0-6 6v8a6 6 0 0 0 6 6h4a6 6 0 0 0 6-6v-8a6 6 0 0 0-6-6zM8 20v-4a10 10 0 0 1 10-10"
                                stroke="#10B981"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                              />
                              <path
                                d="M34 20h-4a6 6 0 0 0-6 6v8a6 6 0 0 0 6 6h4a6 6 0 0 0 6-6v-8a6 6 0 0 0-6-6zM28 20v-4a10 10 0 0 1 10-10"
                                stroke="#10B981"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>

                          <p className="max-w-[680px] pl-3 pr-4 text-left text-base italic leading-[1.6] text-slate-500 sm:pl-4 sm:pr-8 md:pl-5 md:text-[20px]">
                            {testimonial.quote}
                          </p>

                          <div className="absolute bottom-0 right-4 w-fit rotate-180 opacity-75 md:right-8">
                            <svg width="30" height="30" viewBox="0 0 48 48" fill="none">
                              <path
                                d="M14 20h-4a6 6 0 0 0-6 6v8a6 6 0 0 0 6 6h4a6 6 0 0 0 6-6v-8a6 6 0 0 0-6-6zM8 20v-4a10 10 0 0 1 10-10"
                                stroke="#10B981"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                              />
                              <path
                                d="M34 20h-4a6 6 0 0 0-6 6v8a6 6 0 0 0 6 6h4a6 6 0 0 0 6-6v-8a6 6 0 0 0-6-6zM28 20v-4a10 10 0 0 1 10-10"
                                stroke="#10B981"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>
                        </div>

                        <div className="w-full pt-1">
                          <div className="flex max-w-[620px] flex-col items-start gap-1 text-left">
                            <strong className="text-xl font-bold text-slate-800 md:text-[20px]">
                              {testimonial.name}
                            </strong>
                            <span className="mt-1 text-sm leading-relaxed text-slate-500 md:text-[16px]">
                              {testimonial.designation}
                            </span>
                            <div className="mt-2 text-base tracking-[0.16em] text-amber-400">
                              {"★★★★★"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              ))}

              <div className="mt-8 flex items-center justify-center gap-5">
                <button
                  onClick={handlePrev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-border bg-white text-muted-foreground transition-all hover:scale-110 hover:border-primary hover:bg-primary/10 hover:text-primary sm:h-12 sm:w-12"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} strokeWidth={3} />
                </button>

                <button
                  onClick={handleNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-border bg-white text-muted-foreground transition-all hover:scale-110 hover:border-primary hover:bg-primary/10 hover:text-primary sm:h-12 sm:w-12"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} strokeWidth={3} />
                </button>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={`${testimonial.id}-dot`}
                    type="button"
                    onClick={() => {
                      stopAuto();
                      goTo(index);
                      resumeAuto();
                    }}
                    aria-label={`Go to testimonial ${index + 1}`}
                    aria-pressed={index === current}
                    className={cn(
                      "h-2.5 rounded-full transition-all duration-300",
                      index === current
                        ? "w-7 bg-primary"
                        : "w-2.5 bg-slate-300 hover:bg-slate-400"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
