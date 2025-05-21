'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useClickSound } from '@/hooks/useAudio';

interface ComicPanelProps {
  title: string;
  color: string;
  onClick: () => void;
  children?: React.ReactNode;
  subtitle?: string;
}

const ComicPanel: React.FC<ComicPanelProps> = ({ 
  title, 
  color, 
  onClick, 
  children, 
  subtitle 
}) => {
  const { audioRef } = useClickSound();
  const [isMounted, setIsMounted] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  
  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
    }
  };

  useEffect(() => {
    setIsMounted(true);
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    
    return () => {
      window.removeEventListener('resize', checkOrientation);
    };
  }, []);

  // Tampilkan peringatan jika di ponsel dalam mode portrait
  if (isMounted && isPortrait) {
    return (
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="bg-white rounded-xl p-6 text-center max-w-sm">
          <motion.div 
            animate={{ rotate: 90 }}
            transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
            className="text-4xl mb-4"
          >
            📱↔️
          </motion.div>
          <h2 className="text-xl font-bold mb-2">Putar Handphone Anda</h2>
          <p className="text-gray-700">Untuk pengalaman terbaik, putar handphone Anda ke mode landscape (horizontal).</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`cursor-pointer relative overflow-hidden rounded-lg shadow-lg ${color} h-full`}
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      onClick={() => {
        playSound();
        onClick();
      }}
      role="button"
      aria-label={`Panel komik ${title}`}
    >
      {/* Pola titik komik di latar belakang */}
      <div className="absolute inset-0 bg-dots opacity-20"></div>
      
      {children}
      
      <div className="absolute bottom-2 left-2 right-2">
        {title && (
          <motion.div 
            className="comic-caption bg-white px-3 py-1.5 rounded-lg shadow-md text-center font-semibold"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.div>
        )}
        
        {subtitle && (
          <motion.div 
            className="comic-subcaption mt-1 text-white bg-black/40 px-2 py-0.5 rounded text-sm text-center"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {subtitle}
          </motion.div>
        )}
      </div>
      
      {/* Efek ujung halaman komik */}
      <div className="absolute bottom-0 right-0 w-0 h-0 border-solid border-t-0 border-l-0 border-r-[20px] border-b-[20px] border-r-transparent border-b-white/30"></div>
    </motion.div>
  );
};

export default ComicPanel; 