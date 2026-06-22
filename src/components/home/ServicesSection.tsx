import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "@/components/animation/Reveal";
import bsflPic1 from "@/assets/BSFL project pictures/pic 1.jpeg";
import bsflPic2 from "@/assets/BSFL project pictures/pic 2.jpeg";
import bioconversionImg from "@/assets/services/Bioconversion — The BSF Larvae at Work.png";
import harvestingImg from "@/assets/services/harvesting.png";
import preProcessingImg from "@/assets/services/pre-processing.png";
import unloadingImg from "@/assets/website/hero/unloading.webp";

const services = [
  {
    id: "waste-sourcing",
    title: "Waste Sourcing",
    description:
      "The process begins with the collection of segregated organic wet waste from municipal households, bulk generators such as hotels, markets, and wedding halls, and other commercial establishments. Only biodegradable waste enters our facility — free from non-biodegradable contaminants — ensuring the integrity of the bioconversion process from the very first step.",
    image: unloadingImg,
  },
  {
    id: "pre-processing",
    title: "Pre-Processing",
    description:
      "On arrival at the facility, the incoming wet waste is shredded using purpose-built machinery to create a homogenous mass. This shredding is a critical step — it significantly accelerates biodegradation by increasing the surface area available to the larvae. What conventional composting methods take 48 days to achieve, our BSF technology accomplishes in as little as 18 days, using a fraction of the land area required by traditional methods.",
    image: preProcessingImg,
  },
  {
    id: "bioconversion",
    title: "Bioconversion — The BSF Larvae at Work",
    description:
      "The shredded organic mass is transferred to BSF processing beds where baby larvae are introduced. A single gram of BSF eggs yields between 20,000 and 35,000 larvae — each capable of consuming up to 200 mg of food waste per day. The larvae progress through six instar stages over approximately 14 days, suppressing harmful pathogens and reducing the waste mass rapidly.",
    image: bioconversionImg,
  },
  {
    id: "harvesting",
    title: "Harvesting",
    description:
      "By the fifth instar, the larvae are harvested. The harvested larvae are protein-rich biomass containing 30–40% protein and 28–35% oil content, making them a highly sought-after ingredient for the poultry and aquaculture industries as a sustainable alternative to conventional fish meal.",
    image: harvestingImg,
  },
  {
    id: "residual-outputs",
    title: "The Residual Outputs",
    description:
      "Beyond the larvae, the process generates two additional valuable outputs. Manure — the organic residue from the bioconversion — serves as a nutrient-rich natural fertilizer for agriculture, horticulture, and urban gardening. Frass functions as a potent biofertiliser with documented soil health benefits.",
    image: bsflPic1,
  },
  {
    id: "zero-waste",
    title: "Zero Waste. Total Value.",
    description:
      "The Zigfly process ensures that every tonne of wet waste entering our facility exits as one of three commercially valuable outputs — larvae, manure, or frass. Nothing is landfilled. Nothing is wasted. The result is a closed-loop bioconversion system that reduces landfill burden and cuts greenhouse gas emissions.",
    image: bsflPic2,
  },
];

const ServicesSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-main relative z-10">

        {/* Heading */}
        <Reveal
          className="text-center"
          variant="fade-up"
          data-anim-start="top 90%"
          data-anim-duration="1.1"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Services
          </span>

          <h2
            data-fly-target="services"
            className="mt-2 text-3xl md:text-4xl font-bold text-foreground"
          >
            BSFL Organic Waste Management <span className="text-primary">Solutions</span>
          </h2>
          <p className="mt-4 max-w-3xl  mx-auto text-muted-foreground text-lg  leading-relaxed">
            At Zigfly, we have engineered a scientifically precise, end-to-end bioconversion process that transforms organic wet waste into high-value protein, manure, and frass — rapidly, efficiently, and with near-zero residue. At the heart of this process is one of nature's most powerful bioconverters: the Black Soldier Fly larva (<em>Hermetia illucens</em>).
          </p>
        </Reveal>

        {/* Services Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative h-80 overflow-hidden rounded-md shadow-lg hover:scale-[1.01] hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={service.image}
                alt={service.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-black/60" />
              <div className="pointer-events-none absolute left-4 top-4 h-px w-0 bg-white/80 transition-all duration-300 group-hover:w-10" />
              <div className="pointer-events-none absolute left-4 top-4 h-0 w-px bg-white/80 transition-all duration-300 group-hover:h-10" />

              <div className="absolute inset-x-0 bottom-0 p-6 text-white transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-3">
                <h3 className="text-xl font-semibold leading-tight">
                  {service.title}
                </h3>
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 translate-y-6 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                <h3 className="text-xl font-semibold leading-tight">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/90 line-clamp-3">
                  {service.description}
                </p>
                <Link
                  to={`/services#${service.id}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white hover:gap-3 transition-all duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  Read More <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
