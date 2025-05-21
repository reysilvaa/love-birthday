import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

// Hook untuk efek parallax dasar
export const useParallaxEffect = (offsetY1 = -100, offsetY2 = 100) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, offsetY1]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, offsetY2]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  return { containerRef, y1, y2, y3, rotate, scale, opacity, scrollYProgress };
}; 