import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const GlassFly = () => {
  const flyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const fly = flyRef.current;
    if (!fly) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let flyTimeline: gsap.core.Timeline | undefined;
    let loadTimeout: number | undefined;
    let resizeTimeout: number | undefined;
    let pathRefreshTimeout: number | undefined;
    let targetObserver: MutationObserver | undefined;
    let resumeOnScroll: (() => void) | undefined;

    const dragState = {
      isDragging: false,
      pointerId: 0,
      startPointerX: 0,
      startPointerY: 0,
      startX: 0,
      startY: 0,
    };

    const cancelScrollResume = () => {
      if (!resumeOnScroll) return;
      window.removeEventListener("scroll", resumeOnScroll);
      resumeOnScroll = undefined;
    };

    const getFlyX = () => Number(gsap.getProperty(fly, "x")) || 0;
    const getFlyY = () => Number(gsap.getProperty(fly, "y")) || 0;

    const pauseAutoPath = () => {
      cancelScrollResume();
      flyTimeline?.pause();
      ScrollTrigger.getById("flyScroll")?.disable(false, false);
    };

    const resumeAutoPath = () => {
      cancelScrollResume();
      ScrollTrigger.getById("flyScroll")?.enable(false, true);
      flyTimeline?.resume();
      ScrollTrigger.update();
    };

    const resumeAutoPathOnNextScroll = () => {
      cancelScrollResume();
      resumeOnScroll = resumeAutoPath;
      window.addEventListener("scroll", resumeOnScroll, { once: true, passive: true });
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;

      dragState.isDragging = true;
      dragState.pointerId = event.pointerId;
      dragState.startPointerX = event.pageX;
      dragState.startPointerY = event.pageY;
      dragState.startX = getFlyX();
      dragState.startY = getFlyY();

      pauseAutoPath();
      fly.setPointerCapture(event.pointerId);
      fly.classList.add("is-dragging", "is-moving");
      fly.classList.remove("is-resting");
      event.preventDefault();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!dragState.isDragging || event.pointerId !== dragState.pointerId) return;

      gsap.set(fly, {
        x: dragState.startX + event.pageX - dragState.startPointerX,
        y: dragState.startY + event.pageY - dragState.startPointerY,
      });
      event.preventDefault();
    };

    const endDrag = (event: PointerEvent) => {
      if (!dragState.isDragging || event.pointerId !== dragState.pointerId) return;

      dragState.isDragging = false;
      if (fly.hasPointerCapture(event.pointerId)) {
        fly.releasePointerCapture(event.pointerId);
      }
      fly.classList.remove("is-dragging", "is-moving");
      fly.classList.add("is-resting");
      resumeAutoPathOnNextScroll();
    };

    fly.addEventListener("pointerdown", handlePointerDown);
    fly.addEventListener("pointermove", handlePointerMove);
    fly.addEventListener("pointerup", endDrag);
    fly.addEventListener("pointercancel", endDrag);

    if (prefersReducedMotion) {
      return () => {
        cancelScrollResume();
        fly.removeEventListener("pointerdown", handlePointerDown);
        fly.removeEventListener("pointermove", handlePointerMove);
        fly.removeEventListener("pointerup", endDrag);
        fly.removeEventListener("pointercancel", endDrag);
      };
    }

    const buildFlyPath = () => {
      if (flyTimeline) {
        flyTimeline.kill();
        ScrollTrigger.getById("flyScroll")?.kill();
      }

      const targets = [
        { selector: '[data-fly-target="hero"]', offsetX: window.innerWidth > 768 ? 300 : 0, offsetY: -100 },
        { selector: '[data-fly-target="stats"]', offsetX: window.innerWidth > 768 ? -220 : 0, offsetY: 24 },
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

    const scheduleFlyPathRefresh = () => {
      if (pathRefreshTimeout) window.clearTimeout(pathRefreshTimeout);
      pathRefreshTimeout = window.setTimeout(buildFlyPath, 140);
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
    targetObserver = new MutationObserver(scheduleFlyPathRefresh);
    targetObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("resize", handleResize);
      cancelScrollResume();
      if (loadTimeout) window.clearTimeout(loadTimeout);
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      if (pathRefreshTimeout) window.clearTimeout(pathRefreshTimeout);
      targetObserver?.disconnect();
      fly.removeEventListener("pointerdown", handlePointerDown);
      fly.removeEventListener("pointermove", handlePointerMove);
      fly.removeEventListener("pointerup", endDrag);
      fly.removeEventListener("pointercancel", endDrag);
      flyTimeline?.kill();
      ScrollTrigger.getById("flyScroll")?.kill();
    };
  }, []);

  return (
    <div ref={flyRef} id="glass-fly" className="glass-fly" aria-hidden="true">
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
