import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Floating 3D Tech Icons
const TechIcon: React.FC<{ position: [number, number, number]; color: string; shape: string }> = ({ 
  position, 
  color, 
  shape 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.02;
    }
  });

  const renderShape = () => {
    switch (shape) {
      case 'box':
        return (
          <boxGeometry args={[0.8, 0.8, 0.8]} />
        );
      case 'sphere':
        return (
          <sphereGeometry args={[0.5, 16, 16]} />
        );
      case 'torus':
        return (
          <torusGeometry args={[0.4, 0.2, 8, 16]} />
        );
      case 'octahedron':
        return (
          <octahedronGeometry args={[0.6]} />
        );
      default:
        return <boxGeometry args={[0.8, 0.8, 0.8]} />;
    }
  };

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        {renderShape()}
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

// Background 3D Scene
const AboutScene3D: React.FC = () => {
  const techIcons = [
    { position: [-4, 2, -2] as [number, number, number], color: '#61DAFB', shape: 'sphere' }, // React
    { position: [4, 1, -1] as [number, number, number], color: '#68A063', shape: 'box' }, // Node.js
    { position: [-2, -2, 1] as [number, number, number], color: '#47A248', shape: 'octahedron' }, // MongoDB
    { position: [3, -1, 2] as [number, number, number], color: '#FF6B6B', shape: 'torus' }, // Three.js
    { position: [0, 3, -3] as [number, number, number], color: '#8B5CF6', shape: 'sphere' }, // Purple
    { position: [-3, 0, 3] as [number, number, number], color: '#06B6D4', shape: 'box' }, // Cyan
  ];

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#8B5CF6" />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#06B6D4" />
      
      {techIcons.map((icon, index) => (
        <TechIcon
          key={index}
          position={icon.position}
          color={icon.color}
          shape={icon.shape}
        />
      ))}
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </>
  );
};

const AboutSection: React.FC = () => {
  const skills = [
    { name: 'React', level: 95, color: 'from-blue-400 to-blue-600' },
    { name: 'Three.js', level: 90, color: 'from-red-400 to-red-600' },
    { name: 'Node.js', level: 88, color: 'from-green-400 to-green-600' },
    { name: 'MongoDB', level: 85, color: 'from-green-500 to-green-700' },
    { name: 'TypeScript', level: 92, color: 'from-blue-500 to-blue-700' },
    { name: 'WebGL', level: 80, color: 'from-purple-400 to-purple-600' },
  ];

  const achievements = [
    { number: '50+', label: 'Projects Completed' },
    { number: '3+', label: 'Years Experience' },
    { number: '15+', label: 'Technologies Mastered' },
    { number: '100%', label: 'Client Satisfaction' },
  ];

  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Background 3D Canvas */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <AboutScene3D />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-orbitron text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-pink bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Crafting immersive digital experiences with cutting-edge 3D technology
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Profile Image */}
            <div className="mb-8 flex justify-center lg:justify-start">
              <motion.div
                className="relative w-48 h-48 rounded-full overflow-hidden glass p-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-neon-purple via-neon-cyan to-neon-pink flex items-center justify-center">
                  <div className="w-44 h-44 rounded-full bg-gray-900 flex items-center justify-center">
                    <span className="text-6xl font-bold text-white">R</span>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 animate-pulse" />
              </motion.div>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                Hi, I'm Raj 👋
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
                I'm a passionate full-stack developer specializing in creating interactive 3D web experiences 
                using the MERN stack and Three.js. With over 3 years of experience, I transform complex ideas 
                into stunning, user-friendly applications that push the boundaries of web technology.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                My expertise lies in building modern web applications that combine beautiful design with 
                cutting-edge 3D graphics, creating immersive experiences that captivate users and deliver 
                exceptional performance across all devices.
              </p>

              {/* Tech Stack Icons */}
              <div className="flex flex-wrap gap-4 mt-8">
                {['React', 'Three.js', 'Node.js', 'MongoDB', 'TypeScript', 'WebGL'].map((tech, index) => (
                  <motion.div
                    key={tech}
                    className="glass px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:neon-glow transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills & Stats */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Skills */}
            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-white mb-6">Technical Skills</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-gray-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  className="glass p-6 rounded-xl text-center hover:neon-glow transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-gray-400 text-sm font-medium">
                    {achievement.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.button
                onClick={() => {
                  const contactSection = document.querySelector('#contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-8 py-3 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full font-semibold text-white hover:scale-105 hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Work Together
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
