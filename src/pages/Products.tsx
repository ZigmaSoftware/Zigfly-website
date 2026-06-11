import Reveal from "@/components/animation/Reveal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { useEffect, useState } from "react";
import { CheckCircle, ArrowRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import product1 from "@/assets/Products/goodearth.jpg";
import larva from "@/assets/website/larva.jpeg";
import frassPlus6mm from "@/assets/Products/Frass +6mm.jpeg";
import manure from "@/assets/Products/Manure.jpeg";
import larvae from "@/assets/Products/larvae.jpeg";

const SLOW_EASE = "power2.out";

type Product = {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: string;
  imageHover?: string;
  images?: string[];
  color: string;
  features: string[];
  applications: string[];
  icon: React.ComponentType<any>;
};

const ProductImage: React.FC<{
  image: string;
  imageHover?: string;
  images?: string[];
  alt: string;
}> = ({ image, imageHover, images, alt }) => {
  const imageSet = images?.length ? images : imageHover ? [image, imageHover] : [image];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [autoIndex, setAutoIndex] = useState(0);
  const shouldAutoPlay = hoveredIndex == null && imageSet.length > 1;
  const effectiveIndex = shouldAutoPlay ? autoIndex : hoveredIndex ?? 0;
  const currentImage = imageSet[effectiveIndex] ?? imageSet[0];

  useEffect(() => {
    if (!shouldAutoPlay) return;
    const timer = window.setInterval(() => {
      setAutoIndex((prev) => (prev + 1) % imageSet.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [imageSet.length, shouldAutoPlay]);

  if (imageSet.length === 1) {
    return (
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={imageSet[0]}
          alt={alt}
          className="w-full h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-black">
      <div className="absolute inset-0 transition-opacity duration-500 overflow-hidden">
        <img
          src={currentImage}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${
            effectiveIndex !== 0 ? "scale-105" : ""
          }`}
        />
      </div>

      <div className="relative h-80 lg:h-96 flex z-10">
        {imageSet.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`View image ${index + 1}`}
            className="relative overflow-hidden cursor-pointer transition-all duration-500 ease-out"
            style={{ flex: effectiveIndex === index ? 1.45 : 1 }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {index < imageSet.length - 1 ? (
              <div className="absolute right-0 top-0 h-full w-[1.5px] bg-white/25 z-20" />
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
};

const products: Product[] = [
  // {
  //   id: "refuse-derived-fuel-rdf",
  //   name: "Refuse Derived Fuel (RDF)",
  //   subtitle: "Turning non-recyclable waste into industrial energy",
  //   tagline: "High-Calorific Recovery",
  //   description: "Engineered refuse-derived fuel processed from non-recyclable waste streams for efficient co-processing in industrial kilns and energy recovery systems.",
  //   image: productRdf,
  //   color: "from-orange-600 to-orange-800",
  //   features: [
  //     "Consistent calorific value",
  //     "Moisture-controlled output",
  //     "Reduced landfill dependency",
  //     "Industrial-grade processing"
  //   ],
  //   applications: ["Cement Kilns", "Waste-to-Energy Plants", "Industrial Boilers", "Co-processing Units"],
  //   icon: Recycle
  // },
  // {
  //   id: "inert-soil-and-stones",
  //   name: "Inert Soil and Stones",
  //   subtitle: "Chemically stable materials recovered from waste for construction use",
  //   tagline: "Recovered Aggregates",
  //   description:
  //     "Processed inert soil and stones recovered from waste streams, suitable for construction, land reclamation, and infrastructure projects. Chemically stable and non-reactive, available in bulk for large-scale applications.",
  //   image: product3,
  //   imageHover: product2,
  //   color: "from-amber-600 to-amber-800",
  //   features: [
  //     "Chemically stable and non-reactive",
  //     "Consistent grading and quality",
  //     "Suitable for road construction",
  //     "Bulk availability"
  //   ],
  //   applications: ["Road Construction", "Land Filling & Embankment", "Backfilling", "Building Foundation & Drainage"],
  //   icon: Recycle
  // },
  // {
  //   id: "recyclables",
  //   name: "Recyclables",
  //   subtitle: "Recovered glass, metal and more — sorted, cleaned, and ready for reuse",
  //   tagline: "Circular Material Recovery",
  //   description:
  //     "Sorted and processed recyclable materials including glass scrap and iron scrap recovered from waste streams. Each material is cleaned, graded, and prepared for direct use by manufacturing and industrial partners.",
  //   image: product4,
  //   imageHover: product5,
  //   color: "from-cyan-600 to-cyan-800",
  //   features: [
  //     "Colour-segregated glass scrap",
  //     "Clean, contaminant-free iron scrap",
  //     "High purity levels",
  //     "Multiple size grades available"
  //   ],
  //   applications: ["Glass Manufacturing", "Steel Manufacturing", "Construction & Abrasives", "Industrial Raw Material Supply"],
  //   icon: Recycle
  // },
  // {
  //   id: "bio-earth",
  //   name: "Bio-earth",
  //   subtitle: "Nutrient-rich organic compost for healthier soils and higher yields",
  //   tagline: "Nature's Gift Renewed",
  //   description:
  //     "Nutrient-rich organic compost and soil conditioner produced from processed wet waste, perfect for agriculture, horticulture, and gardening. Chemical-free, FSSAI-compliant, and designed to restore soil health naturally.",
  //   image: product1,
  //   color: "from-green-600 to-green-800",
  //   features: [
  //     "Rich in organic matter",
  //     "Improves soil fertility and microbial activity",
  //     "Chemical-free production",
  //     "FSSAI compliant"
  //   ],
  //   applications: ["Non-Agricultural Crops", "Horticulture & Gardening", "Landscaping", "Urban & Organic Farming"],
  //   icon: Leaf
  // },
  // {
  //   id: "recycled-furniture",
  //   name: "Recycled Furniture",
  //   subtitle: "Durable, stylish furniture crafted from reclaimed materials",
  //   tagline: "From Waste to Wealth, Responsibly",
  //   description:
  //     "Eco-friendly furniture crafted from recycled materials, promoting sustainable living and reducing environmental impact through innovative design. Available in customisable options for home, office, and commercial use.",
  //   image: wpeFurniture1,
  //   imageHover: wpeFurniture2,
  //   images: [ wpeFurniture1, wpeFurniture2, wpePic1, wpePic2],
  //   color: "from-purple-600 to-purple-800",
  //   features: [
  //     "Made from recycled materials",
  //     "Durable and stylish designs",
  //     "Eco-friendly production process",
  //     "Customisable options available"
  //   ],
  //   applications: ["Home Furniture", "Office Furniture", "Outdoor Furniture", "Commercial Spaces"],
  //   icon: Sparkles
  // },
  {
    id: "frass",
    name: "Frass",
    subtitle: "Potent soil amendment from BSF bioconversion",
    tagline: "Biofertiliser",
    description:
      "BSF frass is a nutrient-rich organic output created during Black Soldier Fly processing. It supports soil health, improves microbial activity, and helps return value from organic waste back into productive land.",
    image: frassPlus6mm,
    color: "from-emerald-700 to-emerald-900",
    features: [
      "Improves soil microbial activity",
      "Supports nutrient cycling",
      "Available in multiple grades",
      "Organic farming friendly"
    ],
    applications: ["Agriculture & Field Crops", "Horticulture", "Nursery & Landscaping", "Soil Conditioning"],
    icon: Leaf
  },
  {
    id: "manure",
    name: "Manure",
    subtitle: "Nutrient-rich organic manure for healthier soil",
    tagline: "Organic Fertiliser",
    description:
      "Our organic manure is produced from controlled BSF-based organic waste processing. It adds organic matter to soil, supports root development, and offers a practical circular solution for farms, landscapes, and nurseries.",
    image: manure,
    color: "from-green-700 to-green-900",
    features: [
      "Rich organic matter",
      "Improves soil structure",
      "Supports root development",
      "Eco-friendly waste output"
    ],
    applications: ["Field Crops", "Horticulture & Gardening", "Landscaping", "Organic Soil Improvement"],
    icon: Leaf
  },
 
  {
    id: "live-larvae",
    name: "Live Larvae",
    subtitle: "Active BSF larvae for circular organic waste processing",
    tagline: "Live Bioconversion Biomass",
    description:
      "Live Black Soldier Fly larvae actively convert organic wet waste into valuable biomass. They support high-efficiency waste reduction while creating a usable feed and bioconversion output stream.",
    image: larvae,
    color: "from-lime-700 to-emerald-900",
    features: [
      "Active waste conversion",
      "High fat and protein biomass",
      "Controlled BSF production",
      "Traceable circular output"
    ],
    applications: ["Organic Waste Bioconversion", "Animal Feed", "Research & Demonstration", "Circular Bio-economy"],
    icon: Leaf
  },
   {
    id: "dry-larvae",
    name: "Dry Larvae",
    subtitle: "Shelf-stable protein-rich larvae for feed formulations",
    tagline: "Sustainable Feed Ingredient",
    description:
      "Dry BSF larvae provide a compact, shelf-stable protein and fat source for feed applications. They are produced through controlled bioconversion and can help reduce dependency on conventional feed ingredients.",
    image: larva,
    color: "from-amber-600 to-orange-800",
    features: [
      "High protein content",
      "Longer shelf life",
      "Alternative to fish meal",
      "Suitable for feed blending"
    ],
    applications: ["Poultry Feed", "Aquaculture Feed", "Pet Feed", "Protein Ingredient"],
    icon: Leaf
  }
];

const Products = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="">
        {/* Page Header */}
        <section
          data-header-hero
          className="relative min-h-[100svh] box-border pt-20 flex items-center overflow-hidden scroll-mt-24 lg:scroll-mt-28"
        >
          <div
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${product1})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/28 to-black/18" aria-hidden="true" />

          <div className="container-main relative grid items-center justify-items-center text-center">
            <Reveal
              className="max-w-3xl mx-auto"
              variant="fade-up"
              data-anim-start="top 94%"
              data-anim-duration="1.6"
              data-anim-ease={SLOW_EASE}
            >
              <span className="text-sm md:text-base tracking-[0.35em] uppercase text-white/85 font-medium block">
                Our Products
              </span>
              <h1 className="mt-3 text-5xl md:text-5xl font-bold leading-tight text-white">
                BSFL Products
              </h1>
              <p className="mt-6 text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
                Explore Frass, Manure, Dry Larvae, and Live Larvae - circular outputs created through controlled Black Soldier Fly bioconversion.
              </p>
            </Reveal>

            {/* <div className="grid sm:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-white/30 bg-white/95 p-5 text-center backdrop-blur-sm">
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Recycle className="w-7 h-7 text-slate-700" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">100% Recycled</h3>
                <p className="text-slate-600 text-sm">All products recovered from landfill waste</p>
              </div>
              <div className="rounded-2xl border border-white/30 bg-white/95 p-5 text-center backdrop-blur-sm">
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7 text-slate-700" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Quality Certified</h3>
                <p className="text-slate-600 text-sm">Meets industry standards and specifications</p>
              </div>
              <div className="rounded-2xl border border-white/30 bg-white/95 p-5 text-center backdrop-blur-sm">
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-7 h-7 text-slate-700" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Eco-Friendly</h3>
                <p className="text-slate-600 text-sm">Supporting circular economy principles</p>
              </div>
            </div> */}
          </div>
        </section>

        {/* Products Showcase */}
        <section className="section-padding">
          <div className="container-main">
            <div className="space-y-24">
              {products.map((product, index) => (
                <Reveal
                  key={product.id}
                  id={product.id}
                  data-anim-start="top 90%"
                  data-anim-duration="1.45"
                  data-anim-ease={SLOW_EASE}
                  className={`scroll-mt-28 lg:scroll-mt-32 group grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  {/* Image */}
                  <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    {/* <div className={`absolute inset-0 bg-gradient-to-br ${product.color} rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500`} /> */}
                    <ProductImage
                      image={product.image}
                      imageHover={product.imageHover}
                      images={product.images}
                      alt={product.name}
                    />
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                      {product.tagline}
                    </span>
                    <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground leading-tight">
                      {product.name}
                    </h2>
                    {product.subtitle ? (
                      <p className="mt-2 text-base lg:text-lg font-medium italic text-foreground/80 leading-relaxed">
                        {product.subtitle}
                      </p>
                    ) : null}
                    <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed mb-6">
                      {product.description}
                    </p>

                    {/* Features */}
                    <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Key Capabilities</h4>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {product.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Applications */}
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Applications</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.applications.map((app) => (
                          <span 
                            key={app}
                            className="px-4 py-2 bg-muted rounded-full text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <Button asChild className="group">
                        <Link to="/contact">
                          Enquire Now
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {/* <section
          className="section-padding py-20 relative overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${bg1})` }}
        >
          <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/28 to-black/18" aria-hidden="true" />

          <div className="container-main relative z-10 text-center">
            <Reveal data-anim-start="top 92%" data-anim-duration="1.45" data-anim-ease={SLOW_EASE}>
              <span className="text-sm uppercase tracking-[0.3em] text-primary-foreground/85">
                Let Us Deliver Impact
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight text-primary-foreground">
                Need Bulk Orders?
              </h2>
              <p className="mt-6 text-base lg:text-lg text-primary-foreground/90 leading-relaxed max-w-xl mx-auto mb-8">
                We supply recovered materials in bulk quantities for construction and industrial projects. Get competitive pricing for your requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="hero">
                  <Link to="/contact">Request Quote</Link>
                </Button>
                <Button asChild size="lg" variant="heroOutline">
                  <Link to="/projects">View Projects</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </section> */}
      </main>
      <Footer />
    </div>
  );
};

export default Products;
