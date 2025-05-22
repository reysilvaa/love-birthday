'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './Hero';
import PhotoGallery from './PhotoGallery';
import Timeline from './Timeline';
import { useClientOnly } from '@/hooks/useClientOnly';
import { useClickSound, useBackgroundMusic } from '@/hooks/useAudio';
import Image from 'next/image';
import Letter from './Letter';
import Future from './Future';
import Birthday from './Birthday';
import { FaBook, FaHeart } from 'react-icons/fa';

// Komponen untuk memutar efek suara klik
const AudioPlayer = () => {
  const { audioRef } = useClickSound();
  return <audio ref={audioRef} src="/audio/click.wav" preload="auto" className="hidden" />;
};

// Komponen untuk musik latar belakang
const BackgroundMusic = () => {
  const { musicRef } = useBackgroundMusic();
  return (
    <audio 
      ref={musicRef} 
      src="/audio/bg-music.mp3" 
      loop={true}
      preload="auto" 
      className="hidden" 
    />
  );
};

// Definisi halaman yang tersedia
const pages = [
  { id: 'hero', component: Hero, title: 'Beranda', subtitle: 'Awalnya...', color: 'bg-gradient-radial from-yellow-300 to-orange-400' },
  { id: 'letter', component: Letter, title: 'Pesan', subtitle: 'Coba lihat...', color: 'bg-gradient-radial from-sky-300 to-sky-500' },
  { id: 'photos', component: PhotoGallery, title: 'Galeri', subtitle: 'Kenangan Indah', color: 'bg-gradient-radial from-green-200 to-green-400' },
  { id: 'timeline', component: Timeline, title: 'Ucapan', subtitle: 'Perjalanan Cinta', color: 'bg-gradient-radial from-red-200 to-red-400' },
  { id: 'future', component: Future, title: 'Masa Depan', subtitle: 'Petualangan Kita', color: 'bg-gradient-radial from-purple-200 to-purple-400' },
  { id: 'birthday', component: Birthday, title: 'Ulang Tahun', subtitle: 'Spesial', color: 'bg-gradient-radial from-amber-200 to-amber-400' },
];

// Panel text component untuk bagian atas kiri
interface ComicTextProps {
  text: string;
  position: 'top-left' | 'bottom-right';
  className?: string;
}

const ComicText: React.FC<ComicTextProps> = ({ text, position, className = '' }) => (
  <motion.div 
    className={`absolute comic-text bg-white border-2 border-black px-2 py-1 ${position === 'top-left' ? 'top-2 left-2 -translate-x-1 -translate-y-1' : 'bottom-2 right-2 translate-x-1 translate-y-1'} transform -skew-x-12 ${className} z-20`}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: "spring", delay: 0.3 }}
  >
    {text}
  </motion.div>
);

// Speech bubble component
interface ComicSpeechProps {
  text: string;
  className?: string;
}

const ComicSpeech: React.FC<ComicSpeechProps> = ({ text, className = '' }) => (
  <motion.div 
    className={`relative bg-white border-2 border-black rounded-xl px-4 py-2 speech-bubble ${className} z-20`}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: "spring", delay: 0.3 }}
  >
    {text}
  </motion.div>
);

// Tombol "Baca Kisah" dengan loading bar
const LoadingButton = ({ onStart }: { onStart: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 2;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setTimeout(() => {
            onStart();
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onStart]);

  return (
    <div className="flex flex-col items-center gap-8">
      <motion.div 
        className="relative inline-block cursor-pointer"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={isComplete ? { scale: 1.05 } : {}}
        whileTap={isComplete ? { scale: 0.95 } : {}}
        onClick={isComplete ? onStart : undefined}
        transition={{ type: "spring", delay: 0.2 }}
      >
        <div className={`${isComplete ? 'bg-[#BBDEFB]' : 'bg-[#FFD8E6]'} border-4 border-black px-6 py-3 rounded-lg font-bold text-xl shadow-md transform -rotate-1 flex items-center gap-3 relative overflow-hidden`}>
          <FaBook className="text-black" size={24} />
          <span>{isComplete ? 'Mulai Membaca!' : 'Baca Kisah Kita'}</span>
          <FaHeart className="text-[#FF80AB]" size={20} />
          
          {/* Dekorasi */}
          <div className="absolute top-0 right-0 w-0 h-0 border-t-8 border-r-8 border-t-black border-r-black" />
        </div>
        
        <motion.div 
          className="absolute -top-2 -right-2 w-6 h-6 bg-[#FFECB3] border-2 border-black rounded-full flex items-center justify-center font-bold text-xs z-10"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          !
        </motion.div>
      </motion.div>
      
      {/* Loading bar dengan komik style */}
      {!isComplete && (
        <motion.div 
          className="w-64 h-8 bg-white border-4 border-black rounded-lg overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-[#BBDEFB] via-[#FFD8E6] to-[#FFECB3]"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-bold text-black text-sm">{progress}%</span>
          </div>
          
          {/* Comic style corner */}
          <div className="absolute bottom-0 left-0 w-0 h-0 border-b-6 border-l-6 border-b-black border-l-black" />
          <div className="absolute top-0 right-0 w-0 h-0 border-t-6 border-r-6 border-t-black border-r-black" />
        </motion.div>
      )}
    </div>
  );
};

// Komponen utama Comic Tile
const ComicTile = () => {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);
  const isClient = useClientOnly();

  const handlePanelClick = (pageId: string) => {
    setSelectedPage(pageId);
  };

  const handleBack = () => {
    setSelectedPage(null);
  };

  const handleStart = () => {
    setShowContent(true);
  };

  // Skeleton loader di server-side atau loading screen di client-side
  if (!isClient || !showContent) {
    return (
      <div className="h-screen w-screen overflow-hidden bg-[#fef8e5] flex flex-col items-center justify-center">
        {/* Comic Style Frame Border */}
        <div className="absolute inset-10 border-[10px] border-black rounded-[40px] z-5"></div>
        <div className="absolute inset-[46px] border-[5px] border-white rounded-[30px] opacity-70 z-5"></div>
        
        {/* Halftone pattern overlay */}
        <div className="absolute inset-0 bg-repeat opacity-5 mix-blend-multiply z-0" style={{ 
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: '15px 15px'
        }}></div>
        
        <div className="relative z-10 flex flex-col items-center gap-8">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-black text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="relative inline-block">
              Perjalanan Cinta Kita
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-black"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
            </span>
          </motion.h1>
          
          {isClient && <LoadingButton onStart={handleStart} />}
          
          {!isClient && (
            <div className="bg-white border-4 border-black px-6 py-3 rounded-lg font-bold text-xl shadow-md">
              Memuat...
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative bg-[#fef8e5] flex flex-col items-center justify-center overflow-hidden">
      {/* Comic Style Frame Border - responsif untuk mobile */}
      <div className="hidden md:block absolute inset-10 border-[10px] border-black rounded-[40px] z-5"></div>
      <div className="hidden md:block absolute inset-[46px] border-[5px] border-white rounded-[30px] opacity-70 z-5"></div>
      
      {/* Frame untuk mobile - lebih tipis */}
      <div className="md:hidden absolute inset-2 border-[5px] border-black rounded-[20px] z-5"></div>
      <div className="md:hidden absolute inset-[13px] border-[2px] border-white rounded-[15px] opacity-70 z-5"></div>
      
      {/* Halftone pattern overlay */}
      <div className="absolute inset-0 bg-repeat opacity-5 mix-blend-multiply z-0" style={{ 
        backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
        backgroundSize: '15px 15px'
      }}></div>
      
      {/* Efek Suara */}
      <AudioPlayer />
      
      {/* Background Music */}
      <BackgroundMusic />
      
      <AnimatePresence mode="wait">
        {selectedPage ? (
          // Menampilkan halaman yang dipilih saat panel diklik
          <motion.div
            key="page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30"
          >
            {React.createElement(pages.find(page => page.id === selectedPage)?.component || Hero, {})}
            
            {/* Tombol kembali ke panel komik */}
            <motion.button
              onClick={handleBack}
              className="fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-white border-4 border-black rounded-full px-3 py-1 md:px-4 md:py-2 shadow-md hover:shadow-lg transition-all text-sm md:text-base font-bold flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <FaBook size={18} />
              Kembali ke Panel Komik
            </motion.button>
          </motion.div>
        ) : (
          // Menampilkan grid panel komik
          <motion.div
            key="comic-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-2 md:p-8 w-full max-w-[1400px] mx-auto z-10 overflow-y-auto"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 md:mb-10 mt-10">
              Sebuah Kisah #1
            </h1>
            
            {/* Comic container dengan CSS Grid layout */}
            <div className="grid grid-cols-6 md:grid-cols-12 auto-rows-[minmax(100px,auto)] gap-2 md:gap-6">
              
              {/* Panel 1 - Bigger panel */}
              <div 
                className="col-span-6 md:col-span-8 row-span-2 md:row-span-2 comic-panel border-4 border-black shadow-lg relative overflow-hidden cursor-pointer transform hover:scale-[1.01] transition-transform h-[300px] md:h-[400px]"
                onClick={() => handlePanelClick('hero')}
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/comic-panel/1.png"
                    alt="Panel 1"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>
                <ComicText text="Awalnya..." position="top-left" className="md:text-xl" />
                <ComicText text="...sesuatu yang indah terjadi" position="bottom-right" className="md:text-xl" />
              </div>
              
              {/* Panel 2 */}
              <div 
                className="col-span-3 md:col-span-4 md:col-start-9 row-span-1 comic-panel border-4 border-black shadow-lg relative overflow-hidden cursor-pointer transform hover:scale-[1.01] transition-transform h-[150px] md:h-[190px]"
                onClick={() => handlePanelClick('letter')}
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/comic-panel/2.png"
                    alt="Panel 2"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <ComicText text="Pesan untukmu..." position="top-left" className="md:text-xl" />
                <ComicText text="...penuh cinta" position="bottom-right" className="md:text-xl" />
              </div>
              
              {/* Panel 3 */}
              <div 
                className="col-span-3 md:col-span-4 md:col-start-9 md:row-start-2 row-span-1 comic-panel border-4 border-black shadow-lg relative overflow-hidden cursor-pointer flex items-center justify-center transform hover:scale-[1.01] transition-transform h-[150px] md:h-[190px]"
                onClick={() => handlePanelClick('photos')}
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/comic-panel/3.png"
                    alt="Panel 3"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <ComicSpeech text="Kenangan indah kita" className="mx-auto my-auto md:text-xl" />
              </div>

              {/* Panel 4 - Panel Tengah Kiri */}
              <div 
                className="col-span-3 md:col-span-4 md:col-start-1 md:row-start-3 row-span-1 comic-panel border-4 border-black shadow-lg relative overflow-hidden cursor-pointer transform hover:scale-[1.01] transition-transform h-[150px] md:h-[190px]"
                onClick={() => handlePanelClick('timeline')}
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/comic-panel/4.png"
                    alt="Panel 4"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <ComicText text="Perjalanan cinta kita..." position="bottom-right" className="md:text-xl" />
              </div>

              {/* Panel 5 - Panel Tengah Kanan */}
              <div 
                className="col-span-3 md:col-span-4 md:col-start-5 md:row-start-3 row-span-1 comic-panel border-4 border-black shadow-lg relative overflow-hidden cursor-pointer transform hover:scale-[1.01] transition-transform h-[150px] md:h-[190px]"
                onClick={() => handlePanelClick('future')}
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/comic-panel/5.png"
                    alt="Panel 5"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <ComicText text="Masa depan kita..." position="top-left" className="md:text-xl" />
                <ComicText text="...penuh petualangan" position="bottom-right" className="md:text-xl" />
              </div>
              
              {/* Panel 6 - THE END */}
              <div 
                className="col-span-6 md:col-span-4 md:col-start-9 md:row-start-3 md:row-span-2 row-span-1 comic-panel border-4 border-black shadow-lg relative overflow-hidden cursor-pointer transform hover:scale-[1.01] transition-transform h-[150px] md:h-[400px]"
                onClick={() => handlePanelClick('birthday')}
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/comic-panel/end.png"
                    alt="Panel 6"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <ComicText text="SELAMAT ULANG TAHUN" position="bottom-right" className="text-xl md:text-2xl font-bold" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom scrollbar style */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          border: 2px solid transparent;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default ComicTile;