import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { EyeIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

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

interface ProjectCard3DProps {
  project: Project;
  onClick: (project: Project) => void;
}

const ProjectCard3D: React.FC<ProjectCard3DProps> = ({ project, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(project)}
      className="cursor-pointer group perspective-1000"
      style={{
        rotateY: rotateY,
        rotateX: rotateX,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ z: 50 }}
    >
      <div className="relative glass rounded-xl overflow-hidden border border-white/10 hover:border-neon-purple/50 transition-all duration-300 group-hover:neon-glow">
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-2 py-1 text-xs font-semibold bg-gradient-to-r from-neon-purple to-neon-pink rounded-full text-white">
              Featured
            </span>
          </div>
        )}

        {/* Project Image */}
        <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-neon-purple to-neon-cyan rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-white">{project.title.charAt(0)}</span>
            </div>
          </div>
          
          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-3 bg-neon-purple/80 rounded-full hover:bg-neon-purple transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <EyeIcon className="w-5 h-5 text-white" />
            </motion.a>
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-3 bg-neon-cyan/80 rounded-full hover:bg-neon-cyan transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <CodeBracketIcon className="w-5 h-5 text-white" />
            </motion.a>
          </motion.div>
        </div>

        {/* Project Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-neon-purple transition-colors duration-300">
            {project.title}
          </h3>
          
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-white/10 text-gray-300 rounded-md hover:bg-neon-purple/20 hover:text-neon-purple transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs bg-gradient-to-r from-neon-purple/20 to-neon-cyan/20 text-gray-300 rounded border border-white/10"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="px-2 py-1 text-xs text-gray-400">
                +{project.techStack.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* 3D Effect Layers */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-neon-cyan/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ transform: "translateZ(20px)" }}
        />
      </div>
    </motion.div>
  );
};

export default ProjectCard3D;
