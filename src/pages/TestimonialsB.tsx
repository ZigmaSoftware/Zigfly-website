import React from "react";
import Reveal from "@/components/animation/Reveal";

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
    quote: "Really impressed by the technology adopted by Zigma. Best wishes to the project.",
    rating: 5,
  },
  {
    id: "pradeep-kp",
    name: "Dr. Pradeep K. P.",
    designation: "Advocate, High Court of Keralam",
    quote: "Scientific approach in the bio waste management is a welcome move. All the best to Zigma.",
    rating: 5,
  },
  {
    id: "dinesan-chennat",
    name: "Dr. Dinesan Cheruvat (IAS)",
    designation: "Director (Rural) for LSGD, Keralam",
    quote: "Biomining of organic waste seems to be a feasible solution even for bulk waste.",
    rating: 5,
  },
  {
    id: "shemeera-kunhu",
    name: "Dr. T. Shemeera Kunhu",
    designation: "PTM Government College Perinthalmanna\nAssistant Professor, Keralam",
    quote: "Mr. Shiva explained the process well. Very interesting process. The solar drier was a new idea which one learned.",
    rating: 5,
  },
  {
    id: "jessy-antony",
    name: "Prof. Jessy Antony",
    designation: "Municipal Councillor, Thodupuzha Municipality, Keralam",
    quote: "A team of 24 councillors and 4 staff visited Brahmapuram plant as a part of study tour. We also studied about the process of management of biodegradable waste using Black Soldier Fly.",
    rating: 5,
  },
];

export default function TestimonialsB() {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-slate-50">
      <div className="container-main">
        {/* Section Header */}
        <Reveal
          variant="fade-up"
          data-anim-start="top 92%"
          data-anim-duration="1.4"
          data-anim-ease={SLOW_EASE}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Client Voices
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            What Our Clients <span className="text-primary">Say</span>
          </h2>
        </Reveal>

        {/* 2-Row Horizontal Scroll */}
        <Reveal
          variant="fade-up"
          data-anim-start="top 88%"
          data-anim-duration="1.2"
          data-anim-ease={SLOW_EASE}
          className="relative space-y-6"
        >
          <style>{`
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
              padding: 16px;
              background: white;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
              display: flex;
              flex-direction: column;
              min-h-[200px];
            }

            .scroll-item-content {
              flex: 1;
            }

            .scroll-item-footer {
              display: flex;
              align-items: flex-end;
              justify-content: space-between;
              gap: 16px;
              margin-top: auto;
              padding-top: 12px;
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
          `}</style>

          {/* Row 1 - Scrolls Left */}
          <div className="overflow-hidden">
            <div className="scroll-row">
              {[...testimonials, ...testimonials].map((testimonial, idx) => (
                <div key={`row1-${testimonial.id}-${idx}`} className="scroll-item group">
                  <div className="scroll-item-content">
                    {/* Quote Content */}
                    <p className="text-sm leading-relaxed text-foreground mb-4 line-clamp-3 group-hover:text-foreground/80 transition-colors duration-300">
                      <span className="text-primary">"</span><span className="font-medium">{testimonial.quote}</span><span className="text-primary">"</span>
                    </p>
                  </div>

                  {/* Author & Stars */}
                  <div className="scroll-item-footer">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-xs leading-tight truncate">
                        {testimonial.name}
                      </p>
                      <p className="text-xs font-medium text-slate-600 leading-tight mt-1 line-clamp-2 whitespace-pre-line">
                        {testimonial.designation}
                      </p>
                    </div>
                    {testimonial.rating && (
                      <div className="flex items-center gap-0.5 flex-shrink-0">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <span key={i} className={`star-${i + 1} text-yellow-400 text-sm leading-none`}>★</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Scrolls Right */}
          <div className="overflow-hidden">
            <div className="scroll-row reverse">
              {[...testimonials, ...testimonials].map((testimonial, idx) => (
                <div key={`row2-${testimonial.id}-${idx}`} className="scroll-item group">
                  <div className="scroll-item-content">
                    {/* Quote Content */}
                    <p className="text-sm leading-relaxed text-foreground mb-4 line-clamp-3 group-hover:text-foreground/80 transition-colors duration-300">
                      <span className="text-primary">"</span><span className="font-medium">{testimonial.quote}</span><span className="text-primary">"</span>
                    </p>
                  </div>

                  {/* Author & Stars */}
                  <div className="scroll-item-footer">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-xs leading-tight truncate">
                        {testimonial.name}
                      </p>
                      <p className="text-xs font-medium text-slate-600 leading-tight mt-1 line-clamp-2 whitespace-pre-line">
                        {testimonial.designation}
                      </p>
                    </div>
                    {testimonial.rating && (
                      <div className="flex items-center gap-0.5 flex-shrink-0">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <span key={i} className={`star-${i + 1} text-yellow-400 text-sm leading-none`}>★</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
