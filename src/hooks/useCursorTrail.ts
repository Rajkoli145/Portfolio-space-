import { useEffect, useRef } from 'react';

interface CursorTrail {
  x: number;
  y: number;
  opacity: number;
}

export const useCursorTrail = (): void => {
  const trailRef = useRef<CursorTrail[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      trailRef.current.push({
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
      });

      // Limit trail length
      if (trailRef.current.length > 20) {
        trailRef.current.shift();
      }
    };

    const animate = () => {
      // Update existing trail elements
      const existingTrails = document.querySelectorAll('.cursor-trail');
      existingTrails.forEach(trail => trail.remove());

      // Create new trail elements
      trailRef.current.forEach((point, index) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = `${point.x}px`;
        trail.style.top = `${point.y}px`;
        trail.style.opacity = `${point.opacity}`;
        trail.style.transform = `scale(${point.opacity})`;
        document.body.appendChild(trail);

        // Fade out
        point.opacity *= 0.95;
      });

      // Remove faded trails
      trailRef.current = trailRef.current.filter(point => point.opacity > 0.01);

      animationRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      // Clean up trail elements
      const trails = document.querySelectorAll('.cursor-trail');
      trails.forEach(trail => trail.remove());
    };
  }, []);
};

export default useCursorTrail;
