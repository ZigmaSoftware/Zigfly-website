import { useEffect } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const GlassFly = () => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const fly = document.getElementById("glass-fly");
    if (!fly) return;

    let flyTimeline: gsap.core.Timeline | undefined;
    let loadTimeout: number | undefined;
    let resizeTimeout: number | undefined;

    const buildFlyPath = () => {
      if (flyTimeline) {
        flyTimeline.kill();
        ScrollTrigger.getById("flyScroll")?.kill();
      }

      const targets = [
        { selector: '[data-fly-target="hero"]', offsetX: window.innerWidth > 768 ? 300 : 0, offsetY: -100 },
        { selector: '[data-fly-target="vision"]', offsetX: -100, offsetY: 50 },
        { selector: '[data-fly-target="services"]', offsetX: 100, offsetY: 0 },
        { selector: '[data-fly-target="sdg"]', offsetX: 0, offsetY: -50 },
        { selector: '[data-fly-target="footer-logo"]', offsetX: 80, offsetY: -20 },
      ];

      const pathPoints = targets.flatMap((target) => {
        const el = document.querySelector<HTMLElement>(target.selector);
        if (!el) return [];
        const rect = el.getBoundingClientRect();
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const scrollX = window.scrollX || document.documentElement.scrollLeft;
        return {
          x: rect.left + scrollX + rect.width / 2 + target.offsetX,
          y: rect.top + scrollY + rect.height / 2 + target.offsetY,
        };
      });

      if (pathPoints.length < 2) return;

      gsap.set(fly, {
        x: pathPoints[0].x,
        y: pathPoints[0].y,
        opacity: 1,
        xPercent: -50,
        yPercent: -50,
      });

      flyTimeline = gsap.timeline({
        scrollTrigger: {
          id: "flyScroll",
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          onUpdate: (self) => {
            const velocity = Math.abs(self.getVelocity());
            if (velocity > 15) {
              fly.classList.add("is-moving");
              fly.classList.remove("is-resting");
            } else {
              fly.classList.remove("is-moving");
              fly.classList.add("is-resting");
            }
          },
        },
      });

      flyTimeline.to(fly, {
        motionPath: {
          path: pathPoints,
          curviness: 1.5,
          autoRotate: 90,
          alignOrigin: [0.5, 0.5],
        },
        ease: "power1.inOut",
        duration: 1,
      });
    };

    const handleLoad = () => {
      loadTimeout = window.setTimeout(buildFlyPath, 100);
    };

    const handleResize = () => {
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(buildFlyPath, 250);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("resize", handleResize);
      if (loadTimeout) window.clearTimeout(loadTimeout);
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      flyTimeline?.kill();
      ScrollTrigger.getById("flyScroll")?.kill();
    };
  }, []);

  return (
    <div id="glass-fly" className="glass-fly" aria-hidden="true">
      <div className="fly-wing wing-left" />
      <div className="fly-wing wing-right" />
      <div className="fly-body">
        <div className="fly-head" />
        <div className="fly-thorax" />
        <div className="fly-abdomen" />
      </div>
    </div>
  );
};

export default GlassFly;
