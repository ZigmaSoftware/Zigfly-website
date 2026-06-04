import { useEffect, useMemo, useRef, useState } from "react";
import { Quote } from "lucide-react";
import visionIcon from "@/assets/icons/rocket1.png";
import visionGif from "@/assets/icons/rocket.gif";
import missionIcon from "@/assets/icons/target1.png";
import missionGif from "@/assets/icons/target.gif";

// Using the same Mission/Vision text but in a narrative format as implied by "message"
// If specific message text is provided later, simply update this const.
const edQuote = `
We deliver technology-driven waste management solutions that protect the environment, 
restore ecosystems, and drive measurable climate impact—advancing a zero-waste future through innovation, 
integrity, and sustainable resource optimization.
`;

const Vision = () => {
  const [isQuoteVisible, setIsQuoteVisible] = useState(false);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const quoteText = useMemo(() => edQuote.replace(/\s+/g, " ").trim(), []);

  useEffect(() => {
    const node = quoteRef.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsQuoteVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsQuoteVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="section-padding bg-muted/30"
      data-anim-start="top 90%"
      data-anim-duration="1.1"
    >
      <div className="container-main">
        {/* <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"> */}
        <div>

          {/* Left Column: Content */}
          <div className=" justify-center">


            <div className="text-center">
              <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-muted-foreground">
                Purpose & Strategic Direction
              </p>

              <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-foreground leading-tight">
                Driving Sustainable <span className="text-primary">Change</span>
              </h2>

            </div>


            <div
              className={`mt-5 max-w-3xl mx-auto relative transition-all duration-700 ease-out ${isQuoteVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-85 translate-y-1"
                }`}
            >
              <p
                ref={quoteRef}
                className="text-lg leading-relaxed text-center relative z-10"
                aria-label={quoteText}
              >
                <span className="inline-flex align-middle mr-2 text-primary/80">
                  <Quote className="w-6 h-6 text-primary/80 rotate-180" />
                </span>

                {quoteText.split("").map((char, index) => (
                  <span
                    key={`${char}-${index}`}
                    className={`inline transition-[color,opacity,filter] duration-900 ease-[cubic-bezier(0.22,1,0.36,1)] ${isQuoteVisible
                        ? "text-foreground/80 opacity-100 blur-0"
                        : "text-muted-foreground/40 opacity-70 blur-[0.5px]"
                      }`}
                    style={
                      isQuoteVisible
                        ? { transitionDelay: `${Math.min(index * 22, 6200)}ms` }
                        : undefined
                    }
                  >
                    {char}
                  </span>
                ))}

                <span className="inline-flex align-middle ml-2 text-primary/80">
                  <Quote className="w-6 h-6 text-primary/80" />
                </span>
              </p>
            </div>





            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
              <article className="group  border border-border rounded-md bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full  text-primary">
                  <img src={visionIcon} alt="vision" className="h-10 w-10 object-contain group-hover:hidden" />
                  <img src={visionGif} alt="vision active" className="hidden h-10 w-10 object-contain group-hover:block" />
                </span>
                <p className="mt-4 text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground">Vision</p>
                <p className="mt-3 text-md text-muted-foreground leading-relaxed">
                  To lead global circular ecosystem transformation by setting the benchmark for a zero-waste future.
                </p>
              </article>

              <article className="group  border border-border rounded-md bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full  text-primary">
                  <img src={missionIcon} alt="mission" className="h-10 w-10 object-contain group-hover:hidden" />
                  <img src={missionGif} alt="mission active" className="hidden h-10 w-10 object-contain group-hover:block" />
                </span>
                <p className="mt-4 text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground">Mission</p>
                <p className="mt-3 text-md text-muted-foreground leading-relaxed">
                  Deliver technology-driven waste management with integrity and safety.
                </p>
              </article>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Vision;
