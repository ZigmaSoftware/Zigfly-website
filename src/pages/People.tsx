import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Reveal from "@/components/animation/Reveal";

// ── Types ──────────────────────────────────────────────────────────────────
type TabId = "office" | "plants" | "beyond";

const TABS: { id: TabId; label: string }[] = [
  { id: "office", label: "Our Office" },
  { id: "plants", label: "Our Plants" },
  { id: "beyond", label: "Zigma beyond work" },
];

// ── YouTube videos (beyond tab) ────────────────────────────────────────────
const YOUTUBE_EMBEDS = [
  "https://www.youtube.com/embed/l-IyVxyO1jw?autoplay=0&rel=0&modestbranding=1&playsinline=1",
  "https://www.youtube.com/embed/W6385dkjsjc?autoplay=0&rel=0&modestbranding=1&playsinline=1",
  "https://www.youtube.com/embed/-zGlQTDRWuc?autoplay=0&rel=0&modestbranding=1&playsinline=1",
];

// ── Placeholder counts per tab ─────────────────────────────────────────────
const PLACEHOLDER_COUNTS: Record<TabId, number> = {
  office: 12,
  plants: 12,
  beyond: 0, // beyond uses YouTube embeds only
};

// ── Sub-components ─────────────────────────────────────────────────────────
const PlaceholderCard = ({ index }: { index: number }) => (
  <div
    className="w-full overflow-hidden rounded-xl bg-muted flex items-center justify-center"
    style={{ aspectRatio: index % 3 === 0 ? "4/5" : "4/3" }}
    aria-hidden="true"
  >
    <svg
      className="h-10 w-10 text-muted-foreground/30"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  </div>
);

const YoutubeCard = ({ src, index }: { src: string; index: number }) => (
  <div className="w-full overflow-hidden rounded-xl bg-slate-100">
    <iframe
      src={src}
      title={`Zigma beyond work ${index + 1}`}
      className="w-full aspect-video"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  </div>
);

// ── Main component ─────────────────────────────────────────────────────────
const People = () => {
  const [activeTab, setActiveTab] = useState<TabId>("office");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollToTop />
      <Header />

      {/* ── Hero ── */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden pt-20">
        {/* gradient background in place of photo */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, hsl(145 63% 20%) 0%, hsl(145 50% 32%) 50%, hsl(38 60% 35%) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

        <div className="container-main relative">
          <Reveal variant="fade-up">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/80">
                Our Team
              </p>
              <h1 className="mt-3 text-4xl font-bold leading-tight text-white md:text-5xl">
                Life at Zigma
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
                Experience a workplace that values innovation, collaboration and
                makes a meaningful impact. Indulge in an intrapreneurial culture
                that enables you to find your own identity.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="section-padding">
        <div className="container-main">

          {/* Tab bar */}
          <div className="mb-8 flex w-full justify-start gap-0 overflow-x-auto md:justify-center">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap border-b-2 px-5 py-3 text-sm font-medium transition-colors md:px-10 md:py-4 md:text-base ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-foreground/70 hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === "beyond" ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {YOUTUBE_EMBEDS.map((src, i) => (
                <YoutubeCard key={src} src={src} index={i} />
              ))}
            </div>
          ) : (
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {Array.from({ length: PLACEHOLDER_COUNTS[activeTab] }).map(
                (_, i) => (
                  <div key={i} className="mb-4 break-inside-avoid">
                    <PlaceholderCard index={i} />
                  </div>
                )
              )}
            </div>
          )}

          {/* Coming soon notice */}
          {activeTab !== "beyond" && (
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Photos coming soon — check back for updates.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default People;
