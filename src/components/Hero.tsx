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
      <div className="speech-bubble bg-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-[hsl(var(--primary-800))] mb-6 sm:mb-10 filter drop-shadow-[2px_3px_2px_rgba(0,0,0,0.4)] sm:drop-shadow-[3px_5px_2px_rgba(0,0,0,0.4)]">
        {children}
        <div className="absolute -bottom-3 sm:-bottom-5 left-1/2 transform -translate-x-1/2 w-4 h-4 sm:w-6 sm:h-6 bg-white border-r-2 border-b-2 sm:border-r-4 sm:border-b-4 border-[hsl(var(--primary-800))] rotate-45"></div>
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
      <span className="font-bangers text-base xs:text-lg sm:text-xl md:text-3xl text-white comic-shadow transform -rotate-[inherit]">
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
      <div className="border-solid border-t-0 border-l-0 border-r-[30px] sm:border-r-[50px] border-b-[30px] sm:border-b-[50px] border-r-transparent border-b-gray-200 shadow-[-5px_-5px_10px_rgba(0,0,0,0.1)]"></div>
    </div>
  );
};

// Comic Heart Component
export const ComicHeart: FC = () => {
  return (
    <div className="relative mb-3 sm:mb-5">
      {/* Multi-layered comic heart effect */}
      <motion.div 
        className="relative w-14 h-14 xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-32 md:h-32"
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
      "relative p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-xl border-2 sm:border-4 border-black z-10",
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
    <div className="absolute -bottom-3 sm:-bottom-5 left-1/2 transform -translate-x-1/2 w-4 h-4 sm:w-6 sm:h-6 bg-white border-r-2 border-b-2 sm:border-r-4 sm:border-b-4 border-black rotate-45"></div>
    
    {/* Comic style dots overlay */}
    <div className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden mix-blend-soft-light opacity-10">
      <div className="absolute inset-0 bg-repeat" style={{ 
        backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
        backgroundSize: '6px 6px'
      }}></div>
    </div>
    
    {children}
  </motion.div>
);

// Parallax Hearts Component
const ParallaxHearts = () => {
  const hearts = useParallaxHearts(20); // Mengurangi jumlah heart untuk mobile

  if (hearts.length === 0) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            width: heart.size * 0.7, // Mengurangi ukuran untuk mobile
            height: heart.size * 0.7,
            opacity: heart.opacity * 0.8 // Sedikit mengurangi opacity
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
  const particles = useFloatingParticles(25); // Mengurangi jumlah partikel untuk mobile
  
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
            width: particle.size * 0.7, // Mengurangi ukuran untuk mobile
            height: particle.size * 0.7,
            filter: 'blur(1px)',
          }}
          initial={{ 
            x: `${particle.x}vw`, 
            y: `${particle.y}vh`,
            opacity: particle.opacity * 0.8 // Sedikit mengurangi opacity
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
          numberOfPieces={windowSize.width < 640 ? 200 : 500} // Kurangi jumlah confetti di mobile
          gravity={0.05}
          colors={['#ff80ab', '#f472b6', '#ec4899', '#db2777', '#c51162']}
        />
      )}
      
      {/* Background Layers */}
      <div className="absolute inset-0 bg-[#fef8e5] z-0"></div>
      
      {/* Halftone pattern overlay */}
      <div className="absolute inset-0 bg-repeat opacity-5 mix-blend-multiply z-0" style={{ 
        backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
        backgroundSize: '10px 10px' // Ukuran pola lebih kecil di mobile
      }}></div>
      
      {isClient && <ParallaxHearts />}
      {isClient && <FloatingParticles />}
      
      {/* Comic Style Frame Border - responsif untuk mobile */}
      <div className="hidden md:block absolute inset-10 border-[10px] border-black rounded-[40px] z-5"></div>
      <div className="hidden md:block absolute inset-[46px] border-[5px] border-white rounded-[30px] opacity-70 z-5"></div>
      
      {/* Frame untuk mobile - lebih tipis dan dengan padding yang lebih kecil */}
      <div className="md:hidden absolute inset-1 xs:inset-2 border-[3px] xs:border-[5px] border-black rounded-[10px] xs:rounded-[20px] z-5"></div>
      <div className="md:hidden absolute inset-[8px] xs:inset-[13px] border-[1px] xs:border-[2px] border-white rounded-[7px] xs:rounded-[15px] opacity-70 z-5"></div>
      
      <div className="relative w-full max-w-xs xs:max-w-sm sm:max-w-md lg:max-w-xl mx-auto flex flex-col items-center justify-center gap-2 xs:gap-3 sm:gap-4 px-2 xs:px-3 sm:px-4 md:px-6 pt-6 sm:pt-8 pb-3 sm:pb-4 z-10">
        {/* Comic-style "POW" burst effect */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10 w-32 xs:w-40 sm:w-52 md:w-64 h-32 xs:h-40 sm:h-52 md:h-64"
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
          className="mb-2 xs:mb-3 sm:mb-5 relative"
        >
          {/* Comic-style multi-layered heart */}
          <div className="relative">
            <FaHeart className="heart text-black mx-auto drop-shadow-xl" size={45} />
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FaHeart className="heart text-[#FF80AB]" size={40} />
            </motion.div>
          </div>
        </motion.div>
        
        {/* Comic-style Header */}
        <motion.h1 
          className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-bangers text-black mb-1 xs:mb-2 text-center relative"
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
              className="absolute -top-1 xs:-top-2 -right-2 xs:-right-4 text-sm xs:text-lg text-[#FFD700]"
              initial={{ scale: 0, rotate: 25 }}
              animate={{ scale: [0, 1.2, 1], rotate: [25, 15] }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <FaStar />
            </motion.div>
          </motion.span>
          
          {/* Comic-style underline */}
          <motion.div
            className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-[2px] sm:h-1 bg-black"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          />
        </motion.h1>
        
        {/* Comic Speech Bubble Message */}
        <motion.div
          className="w-full mb-3 xs:mb-4 sm:mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          <ComicBubble delay={1.4}>
            <motion.p 
              className="text-base xs:text-xl sm:text-2xl text-black text-center font-comic relative z-10 font-bangers"
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
          className="w-full backdrop-blur-sm bg-white p-2 xs:p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl border-2 sm:border-4 border-black"
          style={{ y: y1 }}
        >
          {/* Comic panel header tab */}
          <motion.div
            className="absolute -top-3 sm:-top-6 left-1/2 transform -translate-x-1/2 bg-[#FFECB3] text-black px-3 sm:px-6 py-[2px] sm:py-1 rounded-t-lg sm:rounded-t-xl font-bold shadow-lg border-2 sm:border-4 border-black border-b-0 text-xs sm:text-base"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.4 }}
          >
            ULTAH SPESIAL!
          </motion.div>
          
          <CountdownTimer targetDate={targetDate} />
        </motion.div>

        <motion.h2
          className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-center mt-2 xs:mt-3 sm:mt-4"
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