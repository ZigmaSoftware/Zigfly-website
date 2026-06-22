// import { useState } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import ScrollToTop from "@/components/ScrollToTop";

// import Award1 from "@/assets/Awards/award1.jpg";
// import Award2 from "@/assets/Awards/award2.jpg";
// import Award3 from "@/assets/Awards/award3.jpg";
// import Award4 from "@/assets/Awards/award4.jpg";
// import Award5 from "@/assets/Awards/award5.jpg";
// import Award7 from "@/assets/Awards/award7.jpg";
// import Award8 from "@/assets/Awards/award8.jpg";
// import Award9 from "@/assets/Awards/award9.jpg";
// import Award10 from "@/assets/Awards/award10.jpg";
// import Award11 from "@/assets/Awards/award11.png";
// type Award = {
//   id: string;
//   title: string;
//   org: string;
//   year: number;
//   category: "Sustainability" | "Operations" | "Innovation" | "Corporate";
//   img: string;
//   highlight?: boolean;
//   desc: string;
// };

// type Metric = {
//   label: string;
//   value: string;
//   helper: string;
// };

// const awards: Award[] = [
//   {
//     id: "a1",
//     title: "Excellence in Managing Municipal Solid Waste",
//     org: "Confederation of Indian Industry (CII)",
//     year: 2020,
//     category: "Corporate",
//     img: Award1,
//     highlight: true,
//     desc:
//       "Awarded for exemplary performance in municipal solid waste (MSW) management and leadership in sustainable waste solutions.",
//   },
//   {
//     id: "a2",
//     title: "Indian Leadership Award for Industrial Development",
//     org: "All India Achievers Foundation",
//     year: 2017,
//     category: "Innovation",
//     img: Award2,
//     desc:
//       "Presented in recognition of leadership and contribution to industrial development at the National Seminar on Individual Achievements and National Development.",
//   },
//   {
//     id: "a3",
//     title: "Trees for Tigers - Bountiful Tree Recognition",
//     org: "Geocycle",
//     year: 2019,
//     category: "Corporate",
//     img: Award3,
//     desc:
//       "Honoured for environmental conservation contribution through the Trees for Tigers initiative near Sariska Tiger Reserve, Alwar, Rajasthan.",
//   },
//   {
//     id: "a4",
//     title: "India Sustainable Waste Management Technology Innovation Award",
//     org: "Frost & Sullivan",
//     year: 2016,
//     category: "Sustainability",
//     img: Award4,
//     desc:
//       "Presented for pioneering innovation in sustainable waste management technologies and excellence in technology-driven environmental solutions.",
//   },
//   {
//     id: "a5",
//     title: "Award for Excellence",
//     org: "Municipalika & CAPEX",
//     year: 2017,
//     category: "Sustainability",
//     img: Award5,
//     desc:
//       "Awarded for participation in Municipalika and CAPEX 2017, the 14th International Exhibition on Smart and Sustainable City Solutions.",
//   },
//   // {
//   //   id: "a6",
//   //   title: "SKOCH Award - Corporate Silver",
//   //   org: "SKOCH Group",
//   //   year: 2017,
//   //   category: "Operations",
//   //   img: Award6,
//   //   desc:
//   //     "Awarded for excellence in municipal solid waste landfill mining and impactful corporate performance.",
//   // },
//   {
//     id: "a7",
//     title: "Best Practices Award - Sustainable Waste Management Technology Innovation",
//     org: "Frost & Sullivan",
//     year: 2016,
//     category: "Sustainability",
//     img: Award7,
//     desc:
//       "Recognized for innovation and best practices in sustainable waste management through advanced scalable technologies.",
//   },
//   {
//     id: "a8",
//     title: "Indian Leadership Award for Industrial Development",
//     org: "All India Achievers Foundation",
//     year: 2017,
//     category: "Sustainability",
//     img: Award8,
//     desc:
//       "Presented to Nagesh Prabhu C., Director - Zigma Global Environ Solutions Pvt. Ltd., for exemplary leadership and industrial impact.",
//   },
//   {
//     id: "a9",
//     title: "Vijayawada Municipal Corporation - Best Performance Awards",
//     org: "Vijayawada Municipal Corporation",
//     year: 2019,
//     category: "Corporate",
//     img: Award9,
//     desc:
//       "Recognized for outstanding organizational and individual performance in municipal services including project leadership excellence.",
//   },
//   {
//     id: "a10",
//     title: "Memento - Appreciation of Participation",
//     org: "Good Governance India Foundation",
//     year: 2017,
//     category: "Operations",
//     img: Award10,
//     desc:
//       "Presented for participation at the 14th International Conference and Exhibition on Smart and Sustainable City Solutions.",
//   },
//   {
//     id: "a11",
//     title: "Green Innovation Award",
//     org: "Services Export Promotion Council (SEPC)",
//     year: 2025,
//     category: "Operations",
//     img: Award11,
//     desc:
//       "Honoured at the National Conclave on Environmental Services for driving green innovation and sustainability-focused solutions.",
//   },
//   // {
//   //   id: "a12",
//   //   title: "State Level Award",
//   //   org: "Government of Andhra Pradesh (Swachha Andhra Initiative)",
//   //   year: 2025,
//   //   category: "Corporate",
//   //   img: Award12,
//   //   desc:
//   //     "Recognized for outstanding operational performance and service delivery under major municipal solid waste programs.",
//   // },
// ];

// const metrics: Metric[] = [
//   {
//     label: "Total Awards",
//     value: `${awards.length}`,
//     helper: "Across corporate, sustainability, operations, and innovation",
//   },
//   {
//     label: "Years Recognized",
//     value: "2016-2025",
//     helper: "A decade of verified industry recognition",
//   },
//   {
//     label: "Highlighted Wins",
//     value: `${awards.filter((award) => award.highlight).length}`,
//     helper: "Top-tier awards based on peer and program recognition",
//   },
//   {
//     label: "Award Categories",
//     value: "4",
//     helper: "Corporate, sustainability, innovation, and operations",
//   },
// ];

// export default function Awards(): JSX.Element {
//   const [activeAward, setActiveAward] = useState<Award | null>(null);

//   return (
//     <div className="min-h-screen bg-background">
//       <ScrollToTop />
//       <Header />

//       <main className="scroll-pt-24">
//         <section className="relative min-h-[100svh] box-border pt-20 flex items-center overflow-hidden scroll-mt-24 lg:scroll-mt-28">
//           {/* <img
//             className="absolute inset-0 h-full w-full object-cover"
//             src={awdbg}
//             alt="Awards background"
//           /> */}
//           <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
//           <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/28 to-black/18" aria-hidden="true" />

//           <div className="container-main relative grid items-center justify-items-center text-center">
//             <div className="text-lg tracking-[0.35em] uppercase text-white/85 font-medium">Industry Recognition</div>
//             <h1 className="mt-3 text-5xl md:text-5xl font-bold leading-tight text-white">Awards And Honors</h1>
//             <p className="mt-6 text-lg text-white/90 leading-relaxed max-w-2xl text-center">
//               Proven excellence across sustainability, operations, and large-scale environmental projects delivered across India.
//             </p>
//           </div>
//         </section>

//         {/* <section className="section-padding bg-white scroll-mt-24 lg:scroll-mt-28">
//           <div className="container-main">
//             <div>
//               <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Recognition Snapshot</span>
//               <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
//                 Performance Backed By <span className="text-primary">Awards</span>
//               </h2>
//             </div>

//             <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//               {metrics.map((metric) => (
//                 <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//                   <p className="text-sm font-medium text-slate-500">{metric.label}</p>
//                   <p className="mt-2 text-2xl font-semibold text-slate-900">{metric.value}</p>
//                   <p className="mt-2 text-xs text-slate-500">{metric.helper}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section> */}

//         <section className="section-padding bg-gradient-to-br from-slate-50 to-slate-100 scroll-mt-24 lg:scroll-mt-28">
//           <div className="container-main">
//             <div>
//               <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Awards Gallery</span>
//               <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
//                 Certificates And <span className="text-primary">Recognitions</span>
//               </h2>
//             </div>

//             <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
//               {awards.map((award) => (
//                 <article
//                   key={award.id}
//                   className="group flex h-full flex-col border border-slate-200 bg-white shadow-sm"
//                 >
//                   <div className="px-4 pt-4">
//                     <div className="overflow-hidden bg-white p-3">
//                       <img
//                         src={award.img}
//                         alt={`${award.title} certificate`}
//                         className="h-44 w-full object-contain transition-transform duration-300 group-hover:scale-105"
//                         loading="lazy"
//                       />
//                     </div>
//                   </div>
//                   <div className="flex flex-1 flex-col p-4">
//                     <p className="text-md font-semibold text-slate-900">{award.title}</p>
//                     <div className="mt-auto pt-3">
//                       <p className="text-md text-slate-500">{award.org}</p>
//                       <button
//                         type="button"
//                         onClick={() => setActiveAward(award)}
//                         className="mt-3 text-md font-semibold text-primary transition hover:text-primary/80"
//                       >
//                         Read more
//                       </button>
//                     </div>

//                     {/* <button
//                       type="button"
//                       className="mt-4  py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
//                       onClick={() => setActiveAward(award)}
//                     >
//                       View Details
//                     </button> */}
                    
                  
//                   </div>
//                 </article>
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>

//       {activeAward ? (
//         <div
//           className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/70 p-4"
//           role="dialog"
//           aria-modal="true"
//           aria-label={`${activeAward.title} details`}
//           onClick={() => setActiveAward(null)}
//         >
//           <div
//             className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl"
//             onClick={(event) => event.stopPropagation()}
//           >
//             <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
//               <div>
//                 <p className="text-base font-semibold text-slate-900">{activeAward.title}</p>
//                 <p className="text-xs text-slate-600">
//                   {activeAward.org} - {activeAward.year}
//                 </p>
//               </div>
//               <button
//                 type="button"
//                 className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
//                 onClick={() => setActiveAward(null)}
//                 aria-label="Close award details"
//               >
//                 Close
//               </button>
//             </div>
//             <div className="grid gap-6 p-5 lg:grid-cols-[1.2fr_1fr]">
//               <div className="flex items-center justify-center rounded-xl bg-white p-3">
//                 <img
//                   src={activeAward.img}
//                   alt={`${activeAward.title} certificate`}
//                   className="max-h-[70vh] w-full object-contain bg-white"
//                 />
//               </div>
//               <div>
//                 <p className="text-md font-semibold text-slate-900">Description</p>
//                 <p className="mt-2 text-md text-slate-600">{activeAward.desc}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : null}

//       <Footer />
//     </div>
//   );
// }

