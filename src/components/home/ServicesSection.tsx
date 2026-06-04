import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "@/components/animation/Reveal";
import bsflWaste from "@/assets/BSFL project pictures/pic 3.jpeg";
import iotWaste from "@/assets/services/WB.png";
import eprService from "@/assets/services/EPR.webp";

const services = [
  {
    id: "bsfl-organic-waste",
    title: "BSFL Based Organic Waste Management",
    description:
      "High-efficiency organic waste treatment using Black Soldier Fly larvae technology to derive highly enriched manure, frass and BSF larvae as protein supplements.",
    image: bsflWaste,
  },
  {
    id: "iot-waste-management",
    title: "IOT Systems for Waste Management",
    description:
      "Smart monitoring systems delivering real-time waste analytics and optimization.",
    image: iotWaste,
  },
  {
    id: "epr-extended-producer-responsibility",
    title: "EPR (Extended Producer Responsibility)",
    description:
      "Extended Producer Responsibility - Sustainable producer responsibility programs ensuring end-of-life product management and recycling.",
    image: eprService,
  },
];

const cardAnimation = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
  hover: {
    scale: 1.01,
    transition: { type: "spring" as const, stiffness: 220, damping: 20 },
  },
};

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

          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground">
            Waste Management <span className="text-primary">Solutions</span>
          </h2>
        </Reveal>

        {/* Services Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardAnimation}
              initial="hidden"
              animate="show"
              whileHover="hover"
              className="group relative h-80 overflow-hidden rounded-md shadow-lg transition-shadow duration-500 hover:shadow-2xl"
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
                <p className="mt-3 text-sm leading-relaxed text-white/90">
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
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
