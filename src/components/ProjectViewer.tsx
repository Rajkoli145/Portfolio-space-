import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Torus, Environment, ContactShadows } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, EyeIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import * as THREE from 'three';

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

interface ProjectViewerProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

// 3D Model Component (placeholder models)
const ProjectModel: React.FC<{ projectId: number }> = ({ projectId }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  // Different models based on project ID
  const renderModel = () => {
    switch (projectId % 3) {
      case 0:
        return (
          <Box ref={meshRef} args={[2, 2, 2]}>
            <meshStandardMaterial color="#8B5CF6" metalness={0.7} roughness={0.3} />
          </Box>
        );
      case 1:
        return (
          <Sphere ref={meshRef} args={[1.5, 32, 32]}>
            <meshStandardMaterial color="#06B6D4" metalness={0.8} roughness={0.2} />
          </Sphere>
        );
      case 2:
        return (
          <Torus ref={meshRef} args={[1.5, 0.5, 16, 100]}>
            <meshStandardMaterial color="#EC4899" metalness={0.6} roughness={0.4} />
          </Torus>
        );
      default:
        return null;
    }
  };

  return (
    <group>
      {renderModel()}
      <ContactShadows opacity={0.4} scale={10} blur={1} far={10} resolution={256} color="#000000" />
    </group>
  );
};

// Lighting Presets
const LightingPreset: React.FC<{ preset: string }> = ({ preset }) => {
  switch (preset) {
    case 'studio':
      return (
        <>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        </>
      );
    case 'dark':
      return (
        <>
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 5, 5]} intensity={0.8} color="#8B5CF6" />
          <pointLight position={[-5, -5, -5]} intensity={0.6} color="#06B6D4" />
        </>
      );
    case 'neon':
      return (
        <>
          <ambientLight intensity={0.1} />
          <pointLight position={[0, 5, 0]} intensity={1.5} color="#EC4899" />
          <pointLight position={[5, 0, 5]} intensity={1.2} color="#8B5CF6" />
          <pointLight position={[-5, 0, -5]} intensity={1.2} color="#06B6D4" />
        </>
      );
    default:
      return null;
  }
};

const ProjectViewer: React.FC<ProjectViewerProps> = ({ project, isOpen, onClose }) => {
  const [lightingPreset, setLightingPreset] = useState('studio');

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-6xl h-full max-h-[90vh] glass rounded-2xl overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="flex h-full">
              {/* 3D Viewer */}
              <div className="flex-1 relative">
                <Canvas
                  camera={{ position: [0, 0, 8], fov: 45 }}
                  className="bg-gradient-to-br from-gray-900 to-black"
                >
                  <LightingPreset preset={lightingPreset} />
                  <ProjectModel projectId={project.id} />
                  <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    enableRotate={true}
                    minDistance={3}
                    maxDistance={15}
                  />
                  <Environment preset="city" />
                </Canvas>

                {/* Lighting Controls */}
                <div className="absolute top-4 left-4 flex space-x-2">
                  {['studio', 'dark', 'neon'].map((preset) => (
                    <motion.button
                      key={preset}
                      onClick={() => setLightingPreset(preset)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        lightingPreset === preset
                          ? 'bg-neon-purple text-white'
                          : 'glass text-gray-300 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {preset.charAt(0).toUpperCase() + preset.slice(1)}
                    </motion.button>
                  ))}
                </div>

                {/* Controls Info */}
                <div className="absolute bottom-4 left-4 glass p-3 rounded-lg">
                  <p className="text-xs text-gray-400">
                    🖱️ Drag to rotate • 🔍 Scroll to zoom • ⌨️ Shift+drag to pan
                  </p>
                </div>
              </div>

              {/* Project Details Panel */}
              <div className="w-96 bg-black/40 backdrop-blur-md border-l border-white/10 p-6 overflow-y-auto">
                {/* Close Button */}
                <motion.button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 glass rounded-lg hover:bg-red-500/20 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <XMarkIcon className="w-5 h-5 text-gray-400 hover:text-white" />
                </motion.button>

                {/* Project Info */}
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-white mb-2">{project.title}</h2>
                  
                  {project.featured && (
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-gradient-to-r from-neon-purple to-neon-pink rounded-full text-white mb-4">
                      Featured Project
                    </span>
                  )}

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-white/10 text-gray-300 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Technologies Used</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {project.techStack.map((tech) => (
                        <div
                          key={tech}
                          className="px-3 py-2 bg-gradient-to-r from-neon-purple/20 to-neon-cyan/20 text-gray-300 rounded border border-white/10 text-sm text-center"
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-lg text-white font-semibold hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <EyeIcon className="w-5 h-5" />
                      🌐 View Live Project
                    </motion.a>

                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 glass border border-white/20 rounded-lg text-gray-300 font-semibold hover:text-white hover:border-neon-purple/50 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <CodeBracketIcon className="w-5 h-5" />
                      View Source Code
                    </motion.a>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <h3 className="text-sm font-semibold text-gray-400 mb-3">Project Highlights</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-neon-purple">•</span>
                        Interactive 3D visualization with smooth animations
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-neon-cyan">•</span>
                        Responsive design optimized for all devices
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-neon-pink">•</span>
                        Modern web technologies and best practices
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectViewer;
