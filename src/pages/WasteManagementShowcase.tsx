import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: "Comprehensive Waste Management Solutions",
    subtitle: "Clearing the Past, Securing the Future",
    description: "Zigma Global Pvt. Ltd. offers end-to-end waste management solutions — from collection to disposal — for urban, industrial, commercial, and institutional clients. Our approach ensures environmental compliance, cost-efficiency, and sustainability. Our holistic waste management solutions cater to municipalities, smart cities, townships, and institutions. We help transform the traditional waste chain into a circular economy.",
    image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=1600&q=80",
  },
  {
    id: 2,
    title: "Legacy Waste Remediation",
    subtitle: "Reviving Land, Restoring Balance",
    description: "Old dumpsites are a major environmental hazard. Zigma Global specializes in turning decades-old waste mountains into usable, green spaces. With years of hands-on experience in scientific remediation of legacy waste, we turn hazardous dumpsites into eco-friendly, usable land — safely, efficiently, and sustainably.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&q=80",
  },
  {
    id: 3,
    title: "Fresh Waste Management",
    subtitle: "Efficient Solutions for Everyday Waste",
    description: "Zigma Global Pvt. Ltd. offers end-to-end fresh waste management services, from collection to sorting and disposal. We ensure that waste from households, commercial establishments, and industries is efficiently processed, reducing environmental harm. Whether you are looking for routine collection services or need a customized waste management plan, we provide innovative solutions for each scenario. Our team sorts waste into recyclable, compostable, and landfill categories, contributing to circular economy.",
    image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=1600&q=80",
  },
  {
    id: 4,
    title: "Technology-Driven Collection",
    subtitle: "Smart Waste Collection Systems",
    description: "Leverage our advanced GPS-enabled waste collection vehicles and real-time monitoring systems. Our smart bins with IoT sensors optimize collection routes, reduce fuel consumption, and ensure timely pickup. Perfect for smart cities and modern townships looking to enhance operational efficiency while minimizing environmental impact.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1600&q=80",
  },
  {
    id: 5,
    title: "Industrial Waste Processing",
    subtitle: "Specialized Industrial Solutions",
    description: "Expert handling of industrial waste including hazardous materials, chemical byproducts, and manufacturing residue. Our certified facilities process, treat, and dispose of industrial waste in compliance with environmental regulations. We provide customized solutions for factories, manufacturing units, and industrial parks.",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=1600&q=80",
  },
  {
    id: 6,
    title: "Organic Waste Composting",
    subtitle: "From Waste to Resource",
    description: "Transform organic waste into nutrient-rich compost through our advanced composting facilities. We process kitchen waste, garden waste, and agricultural residue into high-quality organic fertilizer. Our composting solutions help reduce landfill burden while creating valuable resources for agriculture and landscaping.",
    image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=1600&q=80",
  },
  {
    id: 7,
    title: "Plastic Waste Recycling",
    subtitle: "Closing the Plastic Loop",
    description: "State-of-the-art plastic recycling facility that processes various types of plastics into reusable raw materials. We segregate, clean, shred, and pelletize plastic waste, preventing it from polluting our environment. Our recycling solutions support the circular economy and reduce dependency on virgin plastic production.",
    image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=1600&q=80",
  },
  {
    id: 8,
    title: "E-Waste Management",
    subtitle: "Responsible Electronics Disposal",
    description: "Certified e-waste recycling services for computers, mobile phones, appliances, and electronic equipment. We safely extract valuable materials while ensuring hazardous components are disposed of responsibly. Our facility is equipped to handle bulk e-waste from corporate offices, institutions, and households.",
    image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=1600&q=80",
  },
  {
    id: 9,
    title: "Biomedical Waste Disposal",
    subtitle: "Safe Healthcare Waste Management",
    description: "Specialized handling of biomedical waste from hospitals, clinics, laboratories, and healthcare facilities. Our certified processes ensure complete sterilization and safe disposal of infectious waste, sharps, and pharmaceutical residue. We maintain strict compliance with biomedical waste management rules and regulations.",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1600&q=80",
  },
  {
    id: 10,
    title: "Waste-to-Energy Solutions",
    subtitle: "Powering Tomorrow with Today's Waste",
    description: "Convert non-recyclable waste into clean energy through our waste-to-energy plants. Using advanced incineration and gasification technologies, we generate electricity while reducing landfill dependency. Our solutions help cities and industries achieve sustainability goals while creating renewable energy from waste.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1600&q=80",
  },
];

export default function WasteManagementShowcase() {
  const containerRef = useRef(null);
  const slidesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray(".service-slide");
      const totalSlides = slides.length;

      // Create horizontal scroll animation
      gsap.to(slides, {
        xPercent: -100 * (totalSlides - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (totalSlides - 1),
          end: () => `+=${slidesRef.current.offsetWidth}`,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-950 text-white py-24 px-6 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-block px-6 py-2 bg-green-700/40 backdrop-blur-sm border border-green-500/30 rounded-full text-green-200 text-sm font-semibold tracking-wider uppercase">
              Zigma Global Pvt. Ltd.
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Sustainable
            <br />
            <span className="text-green-300">Waste Solutions</span>
          </h1>
          <p className="text-xl md:text-2xl text-green-50/90 font-light max-w-3xl mx-auto mb-12">
            Transforming waste management through innovation, technology, and environmental responsibility
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-green-300"></div>
            <span className="text-green-300 text-sm font-semibold">Scroll to explore</span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-green-300"></div>
          </div>
        </div>
      </section>

      {/* Horizontal Sliding Section */}
      <section ref={containerRef} className="overflow-hidden">
        <div
          ref={slidesRef}
          className="flex"
          style={{ width: `${services.length * 100}vw` }}
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              className="service-slide w-screen h-screen flex items-center justify-center px-6 md:px-12"
            >
              <div className="max-w-7xl mx-auto w-full">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div className={`relative h-96 md:h-auto ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 to-transparent"></div>
                    </div>

                    {/* Content Section */}
                    <div className={`p-8 md:p-12 lg:p-16 flex flex-col justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                      {/* Service Number */}
                      <div className="mb-6">
                        <span className="text-7xl md:text-8xl font-bold text-green-600">
                          {String(service.id).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                        {service.title}
                      </h2>

                      {/* Subtitle */}
                      <div className="mb-6">
                        <span className="inline-block text-green-600 font-semibold text-lg md:text-xl">
                          {service.subtitle}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed mb-8 text-justify">
                        {service.description}
                      </p>

                      {/* CTA Button */}
                      <div>
                        <button className="inline-flex items-center gap-2 px-8 py-4 bg-green-700 hover:bg-green-600 text-white rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                          View Details
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-950 text-white py-20 px-6 min-h-screen flex items-center justify-center">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Ready to Transform Your
            <br />
            <span className="text-green-300">Waste Management?</span>
          </h2>
          <p className="text-xl md:text-2xl text-green-50/90 font-light mb-10 max-w-2xl mx-auto">
            Partner with Zigma Global for sustainable, efficient, and compliant waste solutions
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button className="px-10 py-4 bg-green-600 hover:bg-green-500 text-white rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
              Get Started
            </button>
            <button className="px-10 py-4 bg-white/10 backdrop-blur-sm border-2 border-green-500/50 hover:border-green-400 hover:bg-white/20 text-white rounded-lg text-lg font-semibold transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
        {/* Call Button */}
        <button className="w-14 h-14 bg-green-600 hover:bg-green-500 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </button>
        
        {/* Scroll to Top Button */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-14 h-14 bg-orange-500 hover:bg-orange-400 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

