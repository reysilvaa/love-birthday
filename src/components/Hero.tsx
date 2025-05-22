'use client';

import { useEffect, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaStar } from 'react-icons/fa';
import ReactConfetti from 'react-confetti';
import CountdownTimer from '@/components/CountdownTimer';
import { cn } from '@/lib/utils';
import { useParallaxHearts, useFloatingParticles } from '@/hooks/useAnimations';
import { useParallaxEffect } from '@/hooks/useParallax';
import { useClientOnly, useWindowSize } from '@/hooks/useClientOnly';
import { FC } from 'react';

// Tanggal target untuk countdown
const targetDate = new Date('2025-05-24T00:00:00');

// Comic Bubble Props
export interface ComicBubbleProps {
  children: ReactNode;
  className?: string;
  rotate?: number;
}

export const ComicSpeechBubble: FC<ComicBubbleProps> = ({ 
  children, 
  className = "", 
  rotate = 0 
}) => {
  return (
    <motion.div 
      className={`relative max-w-lg mx-auto ${className}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, rotate }}
      transition={{ 
        type: "spring", 
        damping: 12, 
        stiffness: 200, 
        delay: 0.5
      }}
    >
      <div className="speech-bubble bg-white p-6 sm:p-8 rounded-3xl border-4 border-[hsl(var(--primary-800))] mb-10 filter drop-shadow-[3px_5px_2px_rgba(0,0,0,0.4)]">
        {children}
        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-r-4 border-b-4 border-[hsl(var(--primary-800))] rotate-45"></div>
      </div>
    </motion.div>
  );
};

// Comic Text Props
export interface ComicTextProps {
  text: string;
  className?: string;
  rotate?: number;
  scale?: number;
  delay?: number;
  color?: string;
  animate?: boolean;
}

export const ComicText: FC<ComicTextProps> = ({ 
  text, 
  className = "", 
  rotate = 0, 
  scale = 1, 
  delay = 0.2,
  color = "bg-[hsl(var(--comic-yellow))]",
  animate = true
}) => {
  return (
    <motion.div
      className={`absolute starburst ${color} flex items-center justify-center z-20 ${className}`}
      initial={animate ? { scale: 0, opacity: 0, rotate: rotate - 10 } : {}}
      animate={animate ? { scale, opacity: 1, rotate } : {}}
      transition={{ 
        type: "spring", 
        damping: 10, 
        delay,
        duration: 0.5
      }}
    >
      <span className="font-bangers text-xl sm:text-3xl text-white comic-shadow transform -rotate-[inherit]">
        {text}
      </span>
    </motion.div>
  );
};

// Comic Star Props
export interface ComicStarProps {
  className?: string;
  size?: number;
  color?: string;
  delay?: number;
}

export const ComicStar: FC<ComicStarProps> = ({
  className = "",
  size = 6,
  color = "text-[hsl(var(--comic-yellow))]",
  delay = 0.2
}) => {
  return (
    <motion.div
      className={`${color} ${className}`}
      initial={{ scale: 0, rotate: 25 }}
      animate={{ scale: [0, 1.2, 1], rotate: [25, 15] }}
      transition={{ delay, duration: 0.5 }}
    >
      <FaStar size={size} />
    </motion.div>
  );
};

// Comic Page Curl Props
export interface ComicPageCurlProps {
  className?: string;
}

export const ComicPageCurl: FC<ComicPageCurlProps> = ({
  className = ""
}) => {
  return (
    <div className={`absolute bottom-0 right-0 w-0 h-0 ${className}`}>
      <div className="border-solid border-t-0 border-l-0 border-r-[50px] border-b-[50px] border-r-transparent border-b-gray-200 shadow-[-5px_-5px_10px_rgba(0,0,0,0.1)]"></div>
    </div>
  );
};

// Comic Heart Component
export const ComicHeart: FC = () => {
  return (
    <div className="relative mb-5">
      {/* Multi-layered comic heart effect */}
      <motion.div 
        className="relative w-24 h-24 sm:w-32 sm:h-32"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          delay: 0.5 
        }}
      >
        {/* Heart outline */}
        <div className="absolute inset-0 text-[hsl(var(--primary-800))] flex items-center justify-center">
          <FaHeart className="w-full h-full" />
        </div>
        
        {/* Heart fill */}
        <motion.div 
          className="absolute inset-0 text-[hsl(var(--love-dark))] flex items-center justify-center transform scale-95"
          animate={{ scale: [0.95, 1.05, 0.95] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity
          }}
        >
          <FaHeart className="w-full h-full" />
        </motion.div>
      </motion.div>
    </div>
  );
};

// Comic Speech Bubble
interface ComicBubbleComponentProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const ComicBubble = ({ children, delay = 0, className = "" }: ComicBubbleComponentProps) => (
  <motion.div
    className={cn(
      "relative p-4 bg-white rounded-2xl shadow-xl border-4 border-black z-10",
      className
    )}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ 
      type: "spring", 
      damping: 12, 
      stiffness: 200, 
      delay 
    }}
  >
    {/* Bubble pointer */}
    <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-r-4 border-b-4 border-black rotate-45"></div>
    
    {/* Comic style dots overlay */}
    <div className="absolute inset-0 rounded-2xl overflow-hidden mix-blend-soft-light opacity-10">
      <div className="absolute inset-0 bg-repeat" style={{ 
        backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
        backgroundSize: '8px 8px'
      }}></div>
    </div>
    
    {children}
  </motion.div>
);

// Parallax Hearts Component
const ParallaxHearts = () => {
  const hearts = useParallaxHearts(25); // Meningkatkan jumlah heart

  if (hearts.length === 0) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            width: heart.size,
            height: heart.size,
            opacity: heart.opacity
          }}
          initial={{ 
            x: `${heart.x}vw`, 
            y: `${heart.y}vh`,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            y: [`${heart.y}vh`, `${Math.random() * 100}vh`],
            x: [`${heart.x}vw`, `${Math.random() * 100}vw`],
            rotate: [0, 360]
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          {heart.type === 0 ? (
            <FaHeart className="w-full h-full text-love-dark" />
          ) : heart.type === 1 ? (
            <FaHeart className="w-full h-full text-love" />
          ) : (
            <FaHeart className="w-full h-full text-love-light" />
          )}
        </motion.div>
      ))}
    </div>
  );
};


// Floating Particles Component
const FloatingParticles = () => {
  const particles = useFloatingParticles(40); // Meningkatkan jumlah partikel
  
  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${
            particle.type === 0 ? 'bg-love/70' : 
            particle.type === 1 ? 'bg-primary-300/40' : 
            'bg-love-light/30'
          }`}
          style={{ 
            width: particle.size, 
            height: particle.size,
            filter: 'blur(1px)',
          }}
          initial={{ 
            x: `${particle.x}vw`, 
            y: `${particle.y}vh`,
            opacity: particle.opacity
          }}
          animate={{
            y: [`${particle.y}vh`, `${Math.random() * 100}vh`],
            x: [`${particle.x}vw`, `${Math.random() * 100}vw`],
          }}
          transition={{
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Komponen utama Hero
const Hero: FC = () => {
  const windowSize = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);
  const { containerRef, y1, y2, scale, opacity } = useParallaxEffect();
  const isClient = useClientOnly();
  
  useEffect(() => {
    // Konfetti hanya ditampilkan selama 10 detik (lebih lama)
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 10000);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center overflow-hidden relative bg-[#fef8e5]">
      {isClient && showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.05}
          colors={['#ff80ab', '#f472b6', '#ec4899', '#db2777', '#c51162']}
        />
      )}
      
      {/* Background Layers */}
      <div className="absolute inset-0 bg-[#fef8e5] z-0"></div>
      
      {/* Halftone pattern overlay */}
      <div className="absolute inset-0 bg-repeat opacity-5 mix-blend-multiply z-0" style={{ 
        backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
        backgroundSize: '15px 15px'
      }}></div>
      
      {isClient && <ParallaxHearts />}
      {isClient && <FloatingParticles />}
      
      {/* Comic Style Frame Border - responsif untuk mobile */}
      <div className="hidden md:block absolute inset-10 border-[10px] border-black rounded-[40px] z-5"></div>
      <div className="hidden md:block absolute inset-[46px] border-[5px] border-white rounded-[30px] opacity-70 z-5"></div>
      
      {/* Frame untuk mobile - lebih tipis dan dengan padding yang lebih kecil */}
      <div className="md:hidden absolute inset-2 border-[5px] border-black rounded-[20px] z-5"></div>
      <div className="md:hidden absolute inset-[13px] border-[2px] border-white rounded-[15px] opacity-70 z-5"></div>
      
      <div className="relative w-full max-w-xl mx-auto flex flex-col items-center justify-center gap-4 px-4 md:px-6 pt-8 pb-4 z-10">
        {/* Comic-style "POW" burst effect */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10 w-64 h-64"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: [0, 1, 0.9], rotate: [-20, 0] }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M50,0 L55,35 L90,30 L60,50 L95,70 L60,65 L65,100 L50,70 L35,100 L40,65 L5,70 L40,50 L10,30 L45,35 Z" 
              fill="#FFD8E6" stroke="#000000" strokeWidth="3" />
          </svg>
        </motion.div>
        
        {/* Hero Heart Icon */}
        <motion.div
          style={{ scale, y: y1 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            delay: 0.5 
          }}
          className="mb-5 relative"
        >
          {/* Comic-style multi-layered heart */}
          <div className="relative">
            <FaHeart className="heart text-black mx-auto drop-shadow-xl" size={75} />
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FaHeart className="heart text-[#FF80AB]" size={70} />
            </motion.div>
          </div>
        </motion.div>
        
        {/* Comic-style Header */}
        <motion.h1 
          className="text-4xl md:text-6xl font-bangers text-black mb-2 text-center relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{ y: y2, opacity }}
        >
          <motion.span 
            className="inline-block relative"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ backgroundSize: '200% auto' }}
          >
            <span className="relative drop-shadow-[0_2px_0px_rgba(0,0,0,0.3)]">
              Tiba-tiba...
            </span>
            
            {/* Comic-style highlight accent */}
            <motion.div
              className="absolute -top-2 -right-4 text-lg text-[#FFD700]"
              initial={{ scale: 0, rotate: 25 }}
              animate={{ scale: [0, 1.2, 1], rotate: [25, 15] }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <FaStar />
            </motion.div>
          </motion.span>
          
          {/* Comic-style underline */}
          <motion.div
            className="absolute -bottom-2 left-0 right-0 h-1 bg-black"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          />
        </motion.h1>
        
        {/* Comic Speech Bubble Message */}
        <motion.div
          className="w-full mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          <ComicBubble delay={1.4}>
            <motion.p 
              className="text-xl md:text-2xl text-black text-center font-comic relative z-10 font-bangers"
              animate={{ 
                scale: [1, 1.02, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Sesuatu yang indah terjadi!
            </motion.p>
          </ComicBubble>
        </motion.div>
        
        {/* Countdown in Comic Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.7 }}
          className="w-full backdrop-blur-sm bg-white p-4 rounded-2xl shadow-xl border-4 border-black"
          style={{ y: y1 }}
        >
          {/* Comic panel header tab */}
          <motion.div
            className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#FFECB3] text-black px-6 py-1 rounded-t-xl font-bold shadow-lg border-4 border-black border-b-0"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.4 }}
          >
            ULTAH SPESIAL!
          </motion.div>
          
          <CountdownTimer targetDate={targetDate} />
        </motion.div>

        <motion.h2
          className="text-2xl md:text-3xl font-bold text-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.5 }}
        >
          Selamat Ulang Tahun!
        </motion.h2>
        
      </div>
    </div>
  );
};

export default Hero; 