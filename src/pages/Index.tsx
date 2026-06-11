import { lazy, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import GlassFly from "@/components/home/GlassFly";
import Vision from "@/components/home/Vision";
import StatsSection from "@/components/home/StatsSection";
import SDGSection from "@/components/home/SdgSection";
// import ULBClientsSectioncp from "@/components/home/ULBClientsSectioncp";

const ServicesSection = lazy(() => import("@/components/home/ServicesSection"));
// const ULBClientsSection = lazy(() => import("@/components/home/ULBClientsSection"));
// const PartnersSectioncp = lazy(() => import("@/components/home/PartnersSectioncp"));


const Index = () => {
  const [showDeferredSections, setShowDeferredSections] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;

    const reveal = () => setShowDeferredSections(true);

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
        reveal,
        { timeout: 1200 },
      );
    } else {
      timeoutId = setTimeout(reveal, 450);
    }

    return () => {
      if (idleId !== undefined && typeof window !== "undefined" && "cancelIdleCallback" in window) {
        (
          window as Window & { cancelIdleCallback: (id: number) => void }
        ).cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <GlassFly />
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <Vision />
        <ServicesSection />
        <SDGSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
