import { useCallback, useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import bg from "@/assets/website/hero/bsf visit.webp";
import Reveal from "@/components/animation/Reveal";
import TestimonialsB from "./TestimonialsB";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const SLOW_EASE = "power2.out";

type Testimonial = {
  id: string;
  name: string;
  designation: string;
  quote: string;
  rating?: number;
};

const testimonials: Testimonial[] = [
  {
    id: "saleena-vg-nair",
    name: "Saleena V. G. Nair",
    designation: "Additional District Judge, Ernakulam, Keralam",
    quote:
      "Really impressed by the technology adopted by Zigma. Best wishes to the project.",
    rating: 5,
  },
  {
    id: "pradeep-kp",
    name: "Dr. Pradeep K. P.",
    designation: "Advocate, High Court of Keralam",
    quote:
      "Scientific approach in the bio waste management is a welcome move. All the best to Zigma.",
    rating: 5,
  },
  {
    id: "dinesan-chennat",
    name: "Dr. Dinesan Cheruvat (IAS)",
    designation: "Director (Rural) for LSGD, Keralam",
    quote:
      "Biomining of organic waste seems to be a feasible solution even for bulk waste.",
    rating: 5,
  },
  {
    id: "shemeera-kunhu",
    name: "Dr. T. Shemeera Kunhu",
    designation: "PTM Government College Perinthalmanna, Assistant Professor, Keralam",
    quote:
      "Mr. Shiva explained the process well. Very interesting process. The solar drier was a new idea which one learned.",
    rating: 5,
  },
  {
    id: "jessy-antony",
    name: "Prof. Jessy Antony",
    designation: "Municipal Councillor, Thodupuzha Municipality, Keralam",
    quote:
      "A team of 24 councillors and 4 staff visited Brahmapuram plant as a part of study tour. We also studied about the process of management of biodegradable waste using Black Soldier Fly.",
    rating: 5,
  },
];

const SLIDE_DELAY_MS = 5000;
const RESUME_DELAY_MS = 5000;

export default function Testimonials() {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isHoveredRef = useRef(false);

  const clearAutoSlide = useCallback(() => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
    }
  }, []);

  const startAutoSlide = useCallback(() => {
    clearAutoSlide();
    if (!api || isHoveredRef.current) return;

    autoSlideRef.current = setInterval(() => {
      api.scrollNext();
    }, SLIDE_DELAY_MS);
  }, [api, clearAutoSlide]);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    startAutoSlide();

    return () => {
      api.off("select", onSelect);
      clearAutoSlide();
    };
  }, [api, startAutoSlide, clearAutoSlide]);

  const handlePrev = () => {
    clearAutoSlide();
    api?.scrollPrev();
    setTimeout(startAutoSlide, RESUME_DELAY_MS);
  };

  const handleNext = () => {
    clearAutoSlide();
    api?.scrollNext();
    setTimeout(startAutoSlide, RESUME_DELAY_MS);
  };

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    clearAutoSlide();
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    startAutoSlide();
  };

  return (
    <div className="min-h-screen bg-background">
      <style>{`
        @keyframes cardEntrance {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes starGlow {
          0% {
            transform: scale(1) rotate(0deg);
            filter: drop-shadow(0 0 0 rgba(250, 204, 21, 0));
          }
          50% {
            transform: scale(1.2) rotate(-5deg);
            filter: drop-shadow(0 0 8px rgba(250, 204, 21, 0.6));
          }
          100% {
            transform: scale(1) rotate(0deg);
            filter: drop-shadow(0 0 0 rgba(250, 204, 21, 0));
          }
        }

        @keyframes dotPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(16, 179, 136, 0.4);
          }
          50% {
            box-shadow: 0 0 0 6px rgba(16, 179, 136, 0);
          }
        }

        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-1920px);
          }
        }

        @keyframes scrollRight {
          0% {
            transform: translateX(-1920px);
          }
          100% {
            transform: translateX(0);
          }
        }

        .testimonial-card {
          animation: cardEntrance 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .testimonial-card:hover .star-1 { animation: starGlow 0.6s cubic-bezier(0.36, 0, 0.66, 1) 0s 1; }
        .testimonial-card:hover .star-2 { animation: starGlow 0.6s cubic-bezier(0.36, 0, 0.66, 1) 0.1s 1; }
        .testimonial-card:hover .star-3 { animation: starGlow 0.6s cubic-bezier(0.36, 0, 0.66, 1) 0.2s 1; }
        .testimonial-card:hover .star-4 { animation: starGlow 0.6s cubic-bezier(0.36, 0, 0.66, 1) 0.3s 1; }
        .testimonial-card:hover .star-5 { animation: starGlow 0.6s cubic-bezier(0.36, 0, 0.66, 1) 0.4s 1; }

        .dot-active {
          animation: dotPulse 1.5s infinite;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scroll-row {
          display: flex;
          gap: 64px;
          animation: scrollLeft 60s linear infinite;
        }

        .scroll-row.reverse {
          animation: scrollRight 60s linear infinite;
        }

        .scroll-row:hover {
          animation-play-state: paused;
        }

        .scroll-item {
          flex-shrink: 0;
          width: 320px;
          padding: 16px 0;
        }
      `}</style>
      
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-20">
          <img
            src={bg}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/35"
            aria-hidden="true"
          />

          <div className="container-main relative text-center">
            <Reveal
              className="max-w-4xl mx-auto"
              variant="fade-up"
              data-anim-start="top 94%"
              data-anim-duration="1.6"
              data-anim-ease={SLOW_EASE}
            >
              <p className="text-lg font-medium uppercase tracking-[0.35em] text-white/85">
                Testimonials
              </p>
              <h1 className="mt-3 text-5xl md:text-6xl font-bold leading-tight text-white">
                Voices That Validate Our Impact
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/90">
                Hear directly from industry leaders, government officials, and partners who have witnessed our circular waste-to-value transformation.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Option A: 3-Card Carousel Section */}
        <section className="section-padding bg-white">
          <div className="container-main">
            {/* Section Header */}
            <Reveal
              variant="fade-up"
              data-anim-start="top 92%"
              data-anim-duration="1.4"
              data-anim-ease={SLOW_EASE}
              className="mx-auto max-w-3xl text-center mb-12 md:mb-16"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Featured Testimonials
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                What Our Clients <span className="text-primary">Say</span>
              </h2>
            </Reveal>

            {/* 3-Card Carousel */}
            <Reveal
              variant="fade-up"
              data-anim-start="top 88%"
              data-anim-duration="1.2"
              data-anim-ease={SLOW_EASE}
              className="relative"
            >
              <div className="pt-8 pb-4 overflow-hidden">
                <Carousel
                  setApi={setApi}
                  opts={{
                    align: "start",
                    loop: true,
                    slidesToScroll: 1,
                    duration: 45,
                  }}
                  className="w-full"
                >
                  <CarouselContent
                    className="-ml-6"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {testimonials.map((testimonial) => (
                      <CarouselItem key={testimonial.id} className="basis-full md:basis-1/2 lg:basis-1/3 pl-6">
                        <article className="testimonial-card h-full flex flex-col p-4 sm:p-5 bg-gray-50 border border-gray-200 rounded-lg transition-all duration-300 hover:shadow-[0_16px_32px_rgba(15,23,42,0.15)] hover:-translate-y-3 hover:border-gray-300" style={{ boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)" }}>
                          {/* Quote Icon & Stars */}
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <Quote size={22} className="text-primary/40 flex-shrink-0 mt-0.5" />
                            {testimonial.rating && (
                              <div className="flex items-center gap-0.5">
                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                  <span key={i} className={`star-${i + 1} text-yellow-400 text-lg leading-none inline-block`}>★</span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Quote */}
                          <blockquote className="flex-1 mb-2">
                            <p className="text-sm leading-snug text-foreground">
                              &ldquo;{testimonial.quote}&rdquo;
                            </p>
                          </blockquote>

                          {/* Divider */}
                          <div className="h-px bg-gray-300 my-2" />

                          {/* Author Info */}
                          <div className="pt-1">
                            <p className="font-semibold text-foreground text-xs md:text-sm leading-tight">
                              {testimonial.name}
                            </p>
                            <p className="mt-0.5 text-[10px] md:text-xs text-muted-foreground leading-tight">
                              {testimonial.designation}
                            </p>
                          </div>
                        </article>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={handlePrev}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white border border-gray-300 text-foreground transition-all hover:border-primary hover:text-primary hover:bg-white hover:scale-110 active:scale-95"
                  aria-label="Previous testimonials"
                >
                  <ChevronLeft size={20} strokeWidth={2} />
                </button>

                <button
                  onClick={handleNext}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white border border-gray-300 text-foreground transition-all hover:border-primary hover:text-primary hover:bg-white hover:scale-110 active:scale-95"
                  aria-label="Next testimonials"
                >
                  <ChevronRight size={20} strokeWidth={2} />
                </button>
              </div>

              {/* Dots Indicator */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      index === currentIndex
                        ? "w-8 bg-primary dot-active shadow-[0_4px_8px_rgba(16,179,136,0.3)]"
                        : "w-2 bg-border hover:bg-muted-foreground hover:scale-125"
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                    aria-current={index === currentIndex}
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* TestimonialsB Component */}
        <TestimonialsB />
      </main>
      <Footer />
    </div>
  );
}
