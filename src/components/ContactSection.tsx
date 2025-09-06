import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// 3D Animated Mail Icon
const AnimatedMail: React.FC = () => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={meshRef}>
        {/* Mail Body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 1.5, 0.1]} />
          <meshStandardMaterial color="#8B5CF6" metalness={0.7} roughness={0.3} />
        </mesh>
        
        {/* Mail Flap */}
        <mesh position={[0, 0.75, 0.05]} rotation={[Math.PI * 0.1, 0, 0]}>
          <boxGeometry args={[2, 1.5, 0.1]} />
          <meshStandardMaterial color="#06B6D4" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Holographic Effect */}
        <mesh position={[0, 0, 0.2]}>
          <boxGeometry args={[2.2, 1.7, 0.05]} />
          <meshBasicMaterial color="#EC4899" transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  );
};

// Contact 3D Scene
const ContactScene3D: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#8B5CF6" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#06B6D4" />
      <AnimatedMail />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={1}
      />
    </>
  );
};

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }, 2000);
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/raj',
      icon: '💼',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/raj',
      icon: '💻',
      color: 'from-gray-600 to-gray-700'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/raj',
      icon: '🐦',
      color: 'from-blue-400 to-blue-500'
    },
    {
      name: 'Email',
      url: 'mailto:raj@example.com',
      icon: '📧',
      color: 'from-red-500 to-red-600'
    }
  ];

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
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
              Get In Touch
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's create something amazing together
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* 3D Animation & Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* 3D Mail Animation */}
            <div className="h-64 mb-8">
              <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                <ContactScene3D />
              </Canvas>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <motion.div
                className="glass p-6 rounded-xl"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">Let's Connect</h3>
                <p className="text-gray-300 leading-relaxed">
                  I'm always excited to work on new projects and collaborate with creative minds. 
                  Whether you have a specific project in mind or just want to explore possibilities, 
                  I'd love to hear from you.
                </p>
              </motion.div>

              <motion.div
                className="glass p-6 rounded-xl"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-white mb-4">What I Can Help With</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-neon-purple">•</span>
                    3D Web Applications & Visualizations
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-neon-cyan">•</span>
                    Full-Stack MERN Development
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-neon-pink">•</span>
                    Interactive User Experiences
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-neon-purple">•</span>
                    Performance Optimization
                  </li>
                </ul>
              </motion.div>

              {/* Social Links */}
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`glass p-4 rounded-xl text-center hover:neon-glow transition-all duration-300 group`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="text-2xl mb-2">{social.icon}</div>
                    <div className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {social.name}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass p-8 rounded-xl">
              <h3 className="text-2xl font-semibold text-white mb-6">Send Me a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20 transition-all duration-300"
                    placeholder="Enter your name"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20 transition-all duration-300"
                    placeholder="Enter your email"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-pink focus:ring-2 focus:ring-neon-pink/20 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-neon-purple to-neon-cyan hover:scale-105 hover:shadow-xl'
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    'Send Message 🚀'
                  )}
                </motion.button>
              </form>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-center"
                >
                  ✅ Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
