import { useState, useEffect } from 'react';

// Interface untuk objek dekorasi
export interface Decoration {
  id: number;
  size: number;
  x: number;
  y: number;
  rotate: number;
  opacity: number;
  scale: number;
  duration: number;
  type: number;
}

// Hook untuk membuat elemen dekoratif
export const useDecorations = (count = 15, types = 3) => {
  const [decorations, setDecorations] = useState<Decoration[]>([]);
  
  useEffect(() => {
    const newDecorations: Decoration[] = Array.from({ length: count }, (_, i) => {
      const size = Math.random() * 30 + 20;
      const initialX = Math.random() * 100;
      const initialY = Math.random() * 100;
      
      return {
        id: i,
        size,
        x: initialX,
        y: initialY,
        rotate: Math.random() * 360,
        opacity: Math.random() * 0.2 + 0.05,
        scale: Math.random() * 0.5 + 0.5,
        duration: Math.random() * 30 + 20,
        type: i % types
      };
    });
    
    setDecorations(newDecorations);
  }, [count, types]);
  
  return decorations;
};

// Hook untuk hearts paralaks
export const useParallaxHearts = (count = 20) => {
  const [hearts, setHearts] = useState<Array<{
    id: number;
    size: number;
    x: number;
    y: number;
    duration: number;
    delay: number;
    opacity: number;
    type: number;
  }>>([]);
  
  useEffect(() => {
    const newHearts = Array.from({ length: count }, (_, i) => {
      const size = Math.random() * 30 + 10;
      const initialX = Math.random() * 100;
      const initialY = Math.random() * 100;
      const duration = Math.random() * 40 + 20;
      const delay = Math.random() * 2;
      const opacity = Math.random() * 0.5 + 0.1;
      
      return {
        id: i,
        size,
        x: initialX,
        y: initialY,
        duration,
        delay,
        opacity,
        type: i % 3
      };
    });
    
    setHearts(newHearts);
  }, [count]);
  
  return hearts;
};

// Hook untuk particle floating
export const useFloatingParticles = (count = 30) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    size: number;
    x: number;
    y: number;
    type: number;
    opacity: number;
  }>>([]);
  
  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => {
      const size = Math.random() * 6 + 2;
      const initialX = Math.random() * 100;
      const initialY = Math.random() * 100;
      
      return {
        id: i,
        size,
        x: initialX,
        y: initialY,
        type: i % 3,
        opacity: Math.random() * 0.5 + 0.2
      };
    });
    
    setParticles(newParticles);
  }, [count]);
  
  return particles;
};

// Hook untuk parallax bubbles
export const useParallaxBubbles = (count = 15) => {
  const [bubbles, setBubbles] = useState<Array<{
    id: number;
    type: number;
    x: number;
    y: number;
    width: number;
    height: number;
    opacity: number;
  }>>([]);
  
  useEffect(() => {
    const newBubbles = Array.from({ length: count }, (_, i) => ({
      id: i,
      type: i % 3,
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: Math.random() * 100 + 50,
      height: Math.random() * 100 + 50,
      opacity: Math.random() * 0.5 + 0.1
    }));
    
    setBubbles(newBubbles);
  }, [count]);
  
  return bubbles;
}; 