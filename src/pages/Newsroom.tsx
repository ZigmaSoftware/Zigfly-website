import { useState } from "react";
import { X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideosCascadeSlider from "@/components/videos/VideosCascadeSlider";
import heroBg from "@/assets/website/hero/news_bg.webp";


// ─── YouTube helpers ──────────────────────────────────────────────────────────
const YT_PATTERNS = [
  /youtu\.be\/([A-Za-z0-9_-]{11})/i,
  /youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/i,
  /youtube\.com\/watch\?(?:.*&)?v=([A-Za-z0-9_-]{11})/i,
  /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/i,
];

const getYouTubeId = (url: string) => {
  for (const p of YT_PATTERNS) {
    const m = url.match(p);
    if (m?.[1]) return m[1];
  }
  return null;
};

const ytThumb = (url: string) => {
  const id = getYouTubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "";
};

const ytEmbed = (url: string) => {
  const id = getYouTubeId(url);
  return id
    ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
    : null;
};

const VIDEO_LINKS = [
  "https://youtu.be/psbedFJNN4w",
  "https://m.youtube.com/watch?v=lJxtoT8ZBzk&pp=iggCQAE%3D"

];



export default function Newsroom() {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);

  const featuredVideos = VIDEO_LINKS.map((url, idx) => ({
    id: String(idx + 1),
    url,
    thumbnail: ytThumb(url),
    title: `Media Coverage ${idx + 1}`,
    label: "News Coverage",
  })).filter((v) => Boolean(v.thumbnail));

  const activeVideo = featuredVideos[featuredIndex] ?? null;
  const embedUrl = activeVideo ? ytEmbed(activeVideo.url) : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-20">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroBg})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/20" aria-hidden="true" />
          <div className="container-main relative text-center">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-white/85">Newsroom</p>
            <h1 className="mt-3 text-5xl font-bold leading-tight text-white md:text-6xl">In The News</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/90">
              Explore media coverage, project stories, and important updates from Zigma Blue Planet.
            </p>
          </div>
        </section>

        {/* ── Featured Videos ───────────────────────────────────────────────── */}
        {featuredVideos.length > 0 && (
          <section className="section-padding bg-white">
            <div className="container-main">
              <div className="text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Featured Coverage</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                  Spotlight <span className="text-primary">Stories</span>
                </h2>
                <p className="mx-auto mt-3 max-w-3xl text-sm text-slate-600 md:text-base">
                  Key media highlights showcasing our projects, partnerships, and sustainability milestones.
                </p>
              </div>
              <div className="mt-8">
                <VideosCascadeSlider
                  slides={featuredVideos.map((v) => ({
                    id: v.id,
                    title: v.title,
                    label: v.label,
                    poster: v.thumbnail,
                    src: v.url,
                  }))}
                  currentIndex={featuredIndex}
                  onIndexChange={setFeaturedIndex}
                  paused={videoOpen}
                  onPlayVideo={(video) => {
                    const idx = featuredVideos.findIndex((v) => v.url === video.src);
                    if (idx !== -1) setFeaturedIndex(idx);
                    setVideoOpen(true);
                  }}
                />
              </div>
            </div>
          </section>
        )}

        {/* ── Video modal ───────────────────────────────────────────────────── */}
        {videoOpen && activeVideo && embedUrl && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm"
            onClick={() => setVideoOpen(false)}
          >
            <div
              className="relative w-11/12 max-w-3xl overflow-hidden rounded-2xl bg-gray-900"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Close video"
              >
                <X size={20} />
              </button>
              <div className="aspect-video w-full bg-black">
                <iframe
                  key={activeVideo.url}
                  src={embedUrl}
                  title={activeVideo.title}
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}


        {/* ── News grid placeholder ─────────────────────────────────────────── */}
        <section className="section-padding bg-slate-50">
          <div className="container-main">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Media Archive</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                In The <span className="text-primary">News</span>
              </h2>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-48 rounded-xl bg-slate-200 animate-pulse" />
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
