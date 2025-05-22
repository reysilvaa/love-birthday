'use client';

import React, { useState } from 'react';
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

// Komponen utama Comic Tile
const ComicTile = () => {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const isClient = useClientOnly();

  const handlePanelClick = (pageId: string) => {
    setSelectedPage(pageId);
  };

  const handleBack = () => {
    setSelectedPage(null);
  };

  // Skeleton loader di server-side
  if (!isClient) {
    return (
      <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-primary-800">Memuat...</div>
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
              className="fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-white border-4 border-black rounded-full px-3 py-1 md:px-4 md:py-2 shadow-md hover:shadow-lg transition-all text-sm md:text-base font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
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
            className="p-4 md:p-6 max-w-7xl mx-auto z-10 overflow-y-auto"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8">
              Perjalanan Cinta Kita
            </h1>
            
            {/* Comic container dengan CSS Grid layout */}
            <div className="grid grid-cols-6 md:grid-cols-12 auto-rows-[minmax(100px,auto)] gap-3 md:gap-3 md:px-1">
              
              {/* Panel 1 - Bigger panel */}
              <div 
                className="col-span-6 md:col-span-6 row-span-2 md:row-span-3 comic-panel border-4 border-black shadow-lg relative overflow-hidden cursor-pointer transform hover:scale-[1.01] transition-transform h-[300px] md:h-auto"
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
                <ComicText text="Awalnya..." position="top-left" />
                <ComicText text="...sesuatu yang indah terjadi" position="bottom-right" />
              </div>
              
              {/* Panel 2 */}
              <div 
                className="col-span-3 md:col-span-6 md:col-start-7 row-span-1 comic-panel border-4 border-black shadow-lg relative overflow-hidden cursor-pointer transform hover:scale-[1.01] transition-transform h-[150px] md:h-[180px]"
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
                <ComicText text="Pesan untukmu..." position="top-left" />
                <ComicText text="...penuh cinta" position="bottom-right" />
              </div>
              
              {/* Panel 3 */}
              <div 
                className="col-span-3 md:col-span-6 md:col-start-7 md:row-start-2 row-span-1 comic-panel border-4 border-black shadow-lg relative overflow-hidden cursor-pointer flex items-center justify-center transform hover:scale-[1.01] transition-transform h-[150px] md:h-[180px]"
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
                <ComicSpeech text="Kenangan indah kita" className="mx-auto my-auto" />
              </div>
              
              {/* Panel 4 */}
              <div 
                className="col-span-3 md:col-span-4 md:col-start-1 md:row-start-4 row-span-1 comic-panel border-4 border-black shadow-lg relative overflow-hidden cursor-pointer transform hover:scale-[1.01] transition-transform h-[150px] md:h-[180px]"
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
                <ComicText text="Perjalanan cinta kita..." position="bottom-right" />
              </div>
              
              {/* Panel 5 */}
              <div 
                className="col-span-3 md:col-span-4 md:col-start-5 md:row-start-4 row-span-1 comic-panel border-4 border-black shadow-lg relative overflow-hidden cursor-pointer transform hover:scale-[1.01] transition-transform h-[150px] md:h-[180px]"
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
                <ComicText text="Masa depan kita..." position="top-left" />
                <ComicText text="...penuh petualangan" position="bottom-right" />
              </div>
              
              {/* Panel 6 - THE END */}
              <div 
                className="col-span-6 md:col-span-4 md:col-start-9 md:row-start-3 md:row-span-2 row-span-1 comic-panel border-4 border-black shadow-lg relative overflow-hidden cursor-pointer transform hover:scale-[1.01] transition-transform h-[150px] md:h-auto"
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
                <ComicText text="SELAMAT ULANG TAHUN" position="bottom-right" className="text-xl font-bold" />
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