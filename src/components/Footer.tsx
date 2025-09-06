import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 bg-black/60 backdrop-blur-md border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <motion.div
            className="mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <span className="font-orbitron text-2xl font-bold bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-pink bg-clip-text text-transparent">
              RAJ.3D
            </span>
          </motion.div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {['Home', 'Projects', 'About', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-400 hover:text-white transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-8">
            {[
              { name: 'LinkedIn', url: 'https://www.linkedin.com/in/raj-koli-626008318/', icon: '💼' },
              { name: 'GitHub', url: 'https://github.com/Rajkoli145', icon: '💻' },
              { name: 'Twitter', url: 'https://twitter.com/raj', icon: '🐦' },
              { name: 'Email', url: 'mailto:raj@example.com', icon: '📧' }
            ].map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 glass rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:neon-glow transition-all duration-300"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">{social.icon}</span>
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <motion.div
            className="text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p>© {currentYear} Raj | Built with MERN + 3D Magic 🚀</p>
            <p className="mt-2">Crafted with ❤️ using React, Three.js & TailwindCSS</p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
