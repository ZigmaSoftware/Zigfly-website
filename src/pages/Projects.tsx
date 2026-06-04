import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BSFLorganicwaste from "@/components/projects/BSFLorganicwaste";

const Projects: React.FC = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="max-w-[1400px] mx-auto px-[5%] py-10">
      <BSFLorganicwaste />
    </main>
    <Footer />
  </div>
);

export default Projects;
