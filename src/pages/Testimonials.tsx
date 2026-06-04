import Header from "@/components/Header";
import Footer from "@/components/Footer";
import bg from "@/assets/website/hero/Testimonials-bg.jpeg";

export default function Testimonials() {  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-20">
          <img src={bg} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/20" aria-hidden="true" />
          <div className="container-main relative text-center">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-white/85">Testimonials</p>
            <h1 className="mt-3 text-5xl font-bold leading-tight text-white md:text-6xl">Voices That Validate Our Impact</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/90">
              Hear directly from global leaders, public officials, and partners who have witnessed our waste-to-value transformation.
            </p>
          </div>
        </section>

        {/* Featured Testimonials placeholder */}
        <section className="section-padding">
          <div className="container-main">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Featured Testimonials</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                What Our <span className="text-primary">Clients Say</span>
              </h2>
            </div>
            <div className="mt-8 h-[460px] rounded-2xl bg-slate-200 animate-pulse" />
          </div>
        </section>

        {/* Video Testimonials placeholder */}
        <section className="section-padding">
          <div className="container-main">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Video Stories</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Hear It From <span className="text-primary">Them</span>
              </h2>
            </div>
            <div className="mt-8 h-[420px] rounded-2xl bg-slate-200 animate-pulse" />
          </div>
        </section>

        {/* Site Visits placeholder */}
        <section className="section-padding">
          <div className="container-main">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Site Visits</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Witnessing Change <span className="text-primary">On the Ground</span>
              </h2>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] rounded-xl bg-slate-200 animate-pulse" />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
