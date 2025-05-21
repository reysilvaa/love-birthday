import { useState, useEffect } from 'react';

// Hook untuk menangani client-side rendering
export const useClientOnly = () => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return isClient;
};

// Hook untuk mendapatkan ukuran window di client-side
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const isClient = useClientOnly();
  
  useEffect(() => {
    if (!isClient) return;
    
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isClient]);
  
  return windowSize;
}; 