import React, { useState, useEffect, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import NavBar from './components/NavBar';
import Hero3D from './components/Hero3D';
import ProjectsGallery from './components/ProjectsGallery';
import ProjectViewer from './components/ProjectViewer';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import useCursorTrail from './hooks/useCursorTrail';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  liveUrl: string;
  githubUrl: string;
  techStack: string[];
  featured: boolean;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectViewerOpen, setIsProjectViewerOpen] = useState(false);

  // Initialize cursor trail effect
  useCursorTrail();

  // Handle loading completion
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Handle project selection
  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setIsProjectViewerOpen(true);
  };

  // Handle project viewer close
  const handleProjectViewerClose = () => {
    setIsProjectViewerOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
    }, 300);
  };

  // Intersection Observer for active section tracking
  useEffect(() => {
    const sections = ['home', 'projects', 'about', 'contact'];
    const observers: IntersectionObserver[] = [];

    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(sectionId);
            }
          },
          { threshold: 0.3 }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [isLoading]);

  // Prevent scroll when project viewer is open
  useEffect(() => {
    if (isProjectViewerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isProjectViewerOpen]);

  return (
    <div className="App relative">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        ) : (
          <>
            {/* Navigation */}
            <NavBar activeSection={activeSection} />

            {/* Main Content */}
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
              <main className="relative">
                {/* Hero Section */}
                <Hero3D />

                {/* Projects Gallery */}
                <ProjectsGallery onProjectSelect={handleProjectSelect} />

                {/* About Section */}
                <AboutSection />

                {/* Contact Section */}
                <ContactSection />

                {/* Footer */}
                <Footer />
              </main>
            </Suspense>

            {/* Project Viewer Modal */}
            <ProjectViewer
              project={selectedProject}
              isOpen={isProjectViewerOpen}
              onClose={handleProjectViewerClose}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
