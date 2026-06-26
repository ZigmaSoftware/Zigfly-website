import Reveal from "@/components/animation/Reveal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { ReactNode } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import preProcessingImg from "@/assets/services/pre-processing.webp";
import bioconversionImg from "@/assets/services/Bioconversion — The BSF Larvae at Work.webp";
import harvestingImg from "@/assets/services/harvesting.webp";
import residualOutputsImg from "@/assets/services/Residual Outputs.webp";
import bsflPic2 from "@/assets/BSFL project pictures/pic 2.jpeg";
import unloadingImg from "@/assets/website/hero/unloading.webp";
import servicesHeroBg from "@/assets/website/hero/services-bg.webp";


const SLOW_EASE = "power2.out";

const EMPHASIS_MAP: Record<string, string[]> = {
  "legacy-waste-reclamation": [
    "state-of-the-art processing machinery",
    "ESG (Environmental, Social, and Governance) and EHS (Environment, Health, and Safety) compliance",
    "reuse, recycling, or circularity pathways",
  ],
  "landfill-management": [
    "environmental monitoring",
    "compliance control",
    "controlled disposal of waste",
    "minimal environmental contamination",
    "space management",
    "leachate treatment systems",
    "methane management",
    "fire management and monitoring",
    "circular landfill mining",
  ],
  "fresh-waste": [
    "daily fresh municipal solid waste (MSW)",
    "state-of-the-art machinery",
    "environmental and ESG (Environmental, Social, and Governance) compliance",
    "leachate management",
    "rejects management",
    "high-value compost",
    "RDF (Refuse Derived Fuel) management",
  ],
  "waste-sourcing": [
    "segregated organic wet waste",
    "municipal households",
    "bulk generators",
    "biodegradable waste",
    "non-biodegradable contaminants",
    "bioconversion process",
  ],
  "pre-processing": [
    "purpose-built machinery",
    "homogenous mass",
    "surface area",
    "18 days",
    "48 days",
    "conventional composting",
  ],
  "bioconversion": [
    "BSF processing beds",
    "20,000 and 35,000 larvae",
    "200 mg of food waste per day",
    "six instar stages",
    "harmful pathogens",
    "toxic substances",
  ],
  "harvesting": [
    "30–40% protein",
    "28–35% oil content",
    "poultry and aquaculture industries",
    "fish meal",
    "soybean meal",
    "biodiesel production",
  ],
  "residual-outputs": [
    "Manure",
    "Frass",
    "natural fertilizer",
    "biofertiliser",
    "soil health benefits",
  ],
  "zero-waste": [
    "larvae, manure, or frass",
    "Nothing is landfilled",
    "Nothing is wasted",
    "closed-loop bioconversion system",
    "greenhouse gas emissions",
  ],
  "machinery-sales-rentals": [
    "state-of-the-art machinery",
    "legacy waste reclamation and municipal solid waste (MSW) processing",
    "in-house research and development (R&D) and specialized fabrication setup",
    "outright sale or on a flexible rental basis",
    "scientific technical support available round-the-clock",
    "high-quality output",
  ],
  "iot-waste-management": [
    "Industrial Internet of Things (IIoT)",
    "smart sensor networks",
    "data-driven optimization",
    "predictive system maintenance",
    "real-time landfill management",
    "door-to-door collection",
    "waste transfer station monitoring",
    "capacity monitoring, process monitoring, and disposal monitoring",
    "grievance redressal mechanism",
  ],
  "integrated-alternative-fuel-solutions": [
    "Refuse Derived Fuel (RDF)",
    "pre-processing facilities",
    "calorific value and moisture content",
    "industrial co-processing",
    "alternative fuel systems",
    "high-quality alternative raw materials",
    "adherence to regulatory norms",
  ],
  "industrial-commercial-waste-solutions": [
    "end-to-end management for hazardous and non-hazardous waste streams",
    "technical preparation of Refuse Derived Fuel (RDF)",
    "shredding and moisture reduction systems",
    "calorific value and blending",
    "strategic technical consultants",
    "specialized knowledge of material specifications and industrial requirements",
    "regular and apt material",
    "stable feedstock supply planning",
  ],
  "epr-extended-producer-responsibility": [
    "Extended Producer Responsibility (EPR)",
    "end-of-life management",
    "plastic waste collection and sorting operations",
    "digital traceability and real-time reporting",
  ],
  "recycled-furniture": [
    "recycled materials",
    "durable and stylish designs",
    "eco-friendly production",
    "customizable options",
    "home furniture",
    "office furniture",
    "outdoor furniture",
    "commercial spaces",
  ],
};

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlightPhrases = (text: string, phrases: string[]): ReactNode => {
  if (!phrases.length) return text;
  const unique = Array.from(new Set(phrases)).sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${unique.map(escapeRegExp).join("|")})`, "g");
  const parts = text.split(pattern);

  return parts;
};

const renderFeatureText = (feature: string): ReactNode => {
  const [head, ...rest] = feature.split(":");
  if (rest.length === 0) return feature;
  return (
    <>
      {head.trim()}: {rest.join(":").trim()}
    </>
  );
};

const services = [
  // {
  //   id: "legacy-waste-reclamation",
  //   title: "Landfill Mining and Remediation",
  //   eyebrow: "Legacy Waste Reclamation",
  //   image: landfillMining,
  //   description: "We execute large-scale legacy waste reclamation projects powered by state-of-the-art processing machinery designed for high-precision material separation. Our operations are strictly governed by ESG (Environmental, Social, and Governance) and EHS (Environment, Health, and Safety) compliance protocols, ensuring that every stage of the recovery process adheres to global environmental, health, and safety standards. Through advanced landfill mining, we extract various resources that are strategically directed toward reuse, recycling, or circularity pathways. This scientific methodology optimizes resource recovery while facilitating the remediation of contaminated land and the systematic reduction of the landfill footprint.",
  //   features: [
  //     " Precision material recovery,systematic land reclamation and rigorous adherence to international compliance frameworks.",
  //   ],
  // },
  // {
  //   id: "landfill-management",
  //   title: "Landfill Management",
  //   eyebrow: "Scientific Landfill Operations",
  //   image: landfillManagement,
  //   description: "We provide end-to-end scientific landfill operations centered on rigorous environmental monitoring and strict compliance control. Our approach prioritizes the controlled disposal of waste to ensure minimal environmental contamination, utilizing sophisticated space management and site development strategies to optimize the lifecycle of the facility. We employ high-tier leachate treatment systems and advanced methane management through integrated gas collection and utilization. To ensure maximum operational safety and sustainability, we implement continuous fire management and monitoring protocols alongside circular landfill mining to extract reusable resources and restore site capacity.",
  //   features: [
  //     "Environmental & Fire Monitoring: Real-time tracking of site conditions to prevent contamination and mitigate fire risks.",
  //     "Leachate & Methane Management: Integrated treatment and gas utilization systems to handle hazardous by-products.",
  //     "Space Optimization: Strategic site design for efficient land use and controlled waste placement.",
  //     "Circular Resource Recovery: Utilizing landfill mining to transition from static storage to active resource reclamation.",
      
  //   ],
  // },
  // {
  //   id: "fresh-waste",
  //   title: "Daily MSW Management and Processing",
  //   eyebrow: "Municipal Solid Waste Processing",
  //   image: wetWaste,
  //   description: "We specialize in the industrial-scale processing of daily fresh municipal solid waste (MSW) utilizing state-of-the-art machinery to maximize material recovery and operational efficiency. Our facilities are designed for full environmental and ESG (Environmental, Social, and Governance) compliance, ensuring that all waste streams are handled according to the highest sustainability standards. We integrate advanced leachate management and systematic rejects management protocols to mitigate environmental impact throughout the processing lifecycle. By isolating the biodegradable fraction, we execute the biological conversion of organic material into high-value compost, while concurrently optimizing RDF (Refuse Derived Fuel) management to transform non-biodegradable components into stable industrial energy sources.",
  //   features: [
  //     "Automated Fresh MSW Sorting: High-throughput processing of daily municipal streams using advanced separation technology",
  //     "Nutrient Recovery: Technical transformation of organic fractions into premium-grade agricultural compost.",
  //     "RDF & Energy Recovery: Strategic management and preparation of Refuse Derived Fuel from non-recyclable rejects.",
  //     "Environmental Safeguarding: Comprehensive leachate treatment and rigorous ESG-compliant operational oversight.",
     
  //   ],
  // },
  {
    id: "waste-sourcing",
    title: "Waste Sourcing",
    eyebrow: "Collection",
    image: unloadingImg,
    description: "The process begins with the collection of segregated organic wet waste from municipal households, bulk generators such as hotels, markets, and wedding halls, and other commercial establishments. Only biodegradable waste enters our facility — free from non-biodegradable contaminants — ensuring the integrity of the bioconversion process from the very first step.",
    features: [
      "Segregated collection from municipal households and bulk generators.",
      "Sources include hotels, markets, wedding halls, and commercial establishments.",
      "Strictly biodegradable waste — zero non-biodegradable contaminants.",
      "Integrity of the bioconversion process maintained from the first step.",
    ],
  },
  {
    id: "pre-processing",
    title: "Pre-Processing",
    eyebrow: "Shredding & Preparation",
    image: preProcessingImg,
    description: "On arrival at the facility, the incoming wet waste is shredded using purpose-built machinery to create a homogenous mass. This shredding is a critical step — it significantly accelerates biodegradation by increasing the surface area available to the larvae. What conventional composting methods take 48 days to achieve, our BSF technology accomplishes in as little as 18 days, using a fraction of the land area required by traditional methods.",
    features: [
      "Purpose-built shredding machinery for homogenous mass preparation.",
      "Increased surface area accelerates larval biodegradation significantly.",
      "18-day processing cycle vs. 48 days for conventional composting.",
      "Fraction of the land area required by traditional methods.",
    ],
  },
  {
    id: "bioconversion",
    title: "Bioconversion — The BSF Larvae at Work",
    eyebrow: "Biological Processing",
    image: bioconversionImg,
    description: [
      "The shredded organic mass is transferred to BSF processing beds where baby larvae, hatched from carefully managed egg batches, are introduced. A single gram of BSF eggs yields between 20,000 and 35,000 larvae. Each larva is capable of consuming up to 200 mg of food waste per day. With their powerful chewing mouthparts, rich intestinal microbiota, and high enzymatic activity, the larvae efficiently metabolize starches, proteins, and lipids present in the waste.",
      "The larvae progress through six instar stages over approximately 14 days, growing from 1.8 mm to 20 mm in size. As consumption rates peak after the third instar, the waste mass reduces rapidly and measurably. The larvae's biological activity also suppresses harmful pathogens and can remove certain toxic substances from the processed material — a distinct advantage over conventional composting and vermicomposting technologies.",
    ],
    features: [
      "1 gram of BSF eggs yields 20,000–35,000 larvae.",
      "Each larva consumes up to 200 mg of food waste per day.",
      "Six instar stages over ~14 days, growing from 1.8 mm to 20 mm.",
      "Suppresses harmful pathogens and removes toxic substances from waste.",
    ],
  },
  {
    id: "harvesting",
    title: "Harvesting",
    eyebrow: "Protein Recovery",
    image: harvestingImg,
    description: "By the fifth instar, the larvae are harvested. The harvested larvae are protein-rich biomass containing 30–40% protein and 28–35% oil content, making them a highly sought-after ingredient for the poultry and aquaculture industries as a sustainable alternative to conventional fish meal. Defatted larvae can achieve protein concentrations comparable to soybean meal, while the extracted oils find application in animal nutrition, chemical industries, and biodiesel production.",
    features: [
      "Harvested at fifth instar for peak protein and oil content.",
      "30–40% protein and 28–35% oil content per larvae biomass.",
      "Sustainable alternative to conventional fish meal for poultry and aquaculture.",
      "Extracted oils used in animal nutrition, chemical industries, and biodiesel.",
    ],
  },
  {
    id: "residual-outputs",
    title: "The Residual Outputs",
    eyebrow: "Manure & Frass",
    image: residualOutputsImg,
    description: "Beyond the larvae, the process generates two additional valuable outputs. Manure — the organic residue from the bioconversion — serves as a nutrient-rich natural fertilizer for agriculture, horticulture, and urban gardening. Frass, the combination of larval excrement and shed skins, functions as a potent biofertiliser with documented soil health benefits.",
    features: [
      "Manure: nutrient-rich natural fertilizer for agriculture and horticulture.",
      "Frass: potent biofertiliser combining larval excrement and shed skins.",
      "Documented soil health benefits from frass application.",
      "Suitable for urban gardening, commercial farming, and horticulture.",
    ],
  },
  {
    id: "zero-waste",
    title: "Zero Waste. Total Value.",
    eyebrow: "Closed-Loop Bioconversion",
    image: bsflPic2,
    description: "The Zigfly process ensures that every tonne of wet waste entering our facility exits as one of three commercially valuable outputs — larvae, manure, or frass. Nothing is landfilled. Nothing is wasted. The result is a closed-loop bioconversion system that reduces landfill burden, cuts greenhouse gas emissions, and delivers measurable agricultural and economic value — all driven by the remarkable biology of the Black Soldier Fly.",
    features: [
      "Every tonne of waste exits as larvae, manure, or frass — zero residue.",
      "Nothing is landfilled. Nothing is wasted.",
      "Reduces landfill burden and cuts greenhouse gas emissions.",
      "Delivers measurable agricultural and economic value at scale.",
    ],
  },
  
];

const Services = () => {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Page Header */}
        <section
          data-header-hero
          className="relative min-h-[100svh] box-border pt-20 flex items-center overflow-hidden scroll-mt-24 lg:scroll-mt-28"
        >
          <img
            src={servicesHeroBg}
            alt=" Services Hero Background"
            aria-hidden="true"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* <div className="absolute inset-0 bg-black/30" aria-hidden="true" /> */}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/28 to-black/18" aria-hidden="true" /> */}

          <div className="container-main relative grid items-center justify-items-center text-center">
            <Reveal
              className="max-w-3xl mx-auto"
              variant="fade-up"
              data-anim-start="top 94%"
              data-anim-duration="1.6"
              data-anim-ease={SLOW_EASE}
            >
              <div className="text-sm md:text-base tracking-[0.35em] uppercase text-white/85 font-medium">
                What We Do
              </div>
              <h1 className="text-5xl md:text-5xl font-bold leading-tight text-white mt-3">
                Our Services
              </h1>
              <p className="mt-6 text-lg text-white/90 leading-relaxed   max-w-3xl mx-auto">
            We specialize in the technical transformation of waste streams into high-value products, bridging the gap between disposal and industrial utility. By leveraging advanced processing methodologies, we produce recovered materials that serve as essential inputs for a circular economy, effectively closing the loop on resource lifecycles.</p>
            </Reveal>
          </div>
        </section>

        {/* Services List */}
        <section className="section-padding">
          <div className="container-main">
            <div className="space-y-24">
              {services.map((service, index) => (
                <Reveal
                  key={service.id}
                  id={service.id}
                  data-anim-start="top 90%"
                  data-anim-duration="1.45"
                  data-anim-ease={SLOW_EASE}
                  className={`scroll-mt-28 lg:scroll-mt-32 grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                >
                  {(() => {
                    const isPinnedExpanded = expandedService === service.id;
                    const isExpanded = isPinnedExpanded;
                    const descriptionParagraphs = Array.isArray(service.description)
                      ? service.description
                      : [service.description];
                    const fullDescription = descriptionParagraphs.join(" ");
                    const shortDescription =
                      fullDescription.length > 140  
                        ? `${fullDescription.slice(0, 140)}...`
                        : fullDescription;

                    return (
                      <>
                        <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                          <div className="overflow-hidden rounded-2xl shadow-xl ">
                            <img
                              src={service.image}
                              alt={service.title}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                        </div>
                        <div className={`${index % 2 === 1 ? "lg:order-1" : ""} flex flex-col`}>
                          <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                            {service.eyebrow}
                          </span>
                          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground leading-tight">
                            {service.title}
                          </h2>
                          {isExpanded ? (
                            <div className="mt-4 space-y-4 text-base lg:text-lg text-muted-foreground leading-relaxed text-justify">
                              {descriptionParagraphs.map((paragraph, paragraphIndex) => (
                                <p key={`${service.id}-paragraph-${paragraphIndex}`}>
                                  {highlightPhrases(paragraph, EMPHASIS_MAP[service.id] ?? [])}
                                </p>
                              ))}
                            </div>
                          ) : (
                            <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed text-justify">
                              {highlightPhrases(shortDescription, EMPHASIS_MAP[service.id] ?? [])}
                            </p>
                          )}
                          <button
                            type="button"
                            className="text-sm pb-2 text-primary font-semibold hover:underline mt-2 text-left"
                            onClick={() =>
                              setExpandedService(isPinnedExpanded ? null : service.id)
                            }
                          >
                            {isPinnedExpanded ? "Show Less" : "Read More"}
                          </button>
                          {isExpanded ? (
                            <ul className="space-y-3 mb-8 mt-6">
                              {service.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-3">
                                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                                  <span className="text-foreground">{renderFeatureText(feature)}</span>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                          <div className="flex flex-wrap items-center gap-3">
                            <Button asChild className="w-28">
                              <Link to="/contact">Enquire Now</Link>
                            </Button>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className=" section-padding">
          <div className="container-main text-center">
            <Reveal data-anim-start="top 92%" data-anim-duration="1.45" data-anim-ease={SLOW_EASE}>
              <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Let Us Deliver Impact
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground leading-tight">
                Ready to Transform Your Waste Management?
              </h2>
              <p className="mt-6 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
                Contact us today to discuss how we can help you achieve your sustainability goals.
              </p>
              <Button size="lg" asChild>
                <Link to="/contact">Contact Us Today</Link>
              </Button>
            </Reveal>
          </div>
        </section>
        {/* <Servicescp/>  */}
      </main>
      <Footer />
    </div>
  );
};

export default Services;


