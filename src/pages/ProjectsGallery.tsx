import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ProjectGalleryCard } from '@/features/projects/components';

const ProjectsGallery: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-[1400px] mx-auto px-[5%] pb-24 pt-10">
        <ProjectGalleryCard />
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsGallery;
