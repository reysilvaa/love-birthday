'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './Hero';
import Message from './Message';
import PhotoGallery from './PhotoGallery';
import Timeline from './Timeline';
import { useClientOnly } from '@/hooks/useClientOnly';
import { useClickSound, useBackgroundMusic } from '@/hooks/useAudio';
import Image from 'next/image';

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
  { id: 'hero', component: Hero, title: 'Beranda', subtitle: 'Tiba-tiba...', color: 'bg-gradient-radial from-yellow-300 to-orange-400' },
  { id: 'message', component: Message, title: 'Pesan', subtitle: 'Coba lihat...', color: 'bg-gradient-radial from-sky-300 to-sky-500' },
  { id: 'photos', component: PhotoGallery, title: 'Galeri', subtitle: 'Kenangan Indah', color: 'bg-gradient-radial from-green-200 to-green-400' },
  { id: 'timeline', component: Timeline, title: 'Ucapan', subtitle: 'Perjalanan Cinta', color: 'bg-gradient-radial from-red-200 to-red-400' },
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
    <div className="min-h-screen w-full overflow-hidden relative">
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
            className="p-4 max-w-7xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Perjalanan Cinta Kita
            </h1>
            
            {/* Comic container dengan CSS Grid layout */}
            <div className="comic-layout">
              <style jsx>{`
                .comic-layout {
                  display: grid;
                  grid-template-columns: repeat(12, 1fr);
                  grid-auto-rows: minmax(80px, auto);
                  gap: 8px;
                }
                
                .panel-1 {
                  grid-column: 1 / span 7;
                  grid-row: 1 / span 3;
                }
                
                .panel-2 {
                  grid-column: 8 / span 5;
                  grid-row: 1 / span 2;
                }
                
                .panel-3 {
                  grid-column: 8 / span 5;
                  grid-row: 3 / span 2;
                }
                
                .panel-4 {
                  grid-column: 1 / span 5;
                  grid-row: 4 / span 2;
                }
                
                .panel-5 {
                  grid-column: 6 / span 7;
                  grid-row: 5 / span 2;
                }
                
                .panel-6 {
                  grid-column: 1 / span 5;
                  grid-row: 6 / span 2;
                }
                
                .panel-7 {
                  grid-column: 6 / span 7;
                  grid-row: 7 / span 3;
                }
                
                .panel-8 {
                  grid-column: 1 / span 5;
                  grid-row: 8 / span 2;
                }
                
                .panel-9 {
                  grid-column: 1 / span 12;
                  grid-row: 10 / span 2;
                }
                
                @media (max-width: 768px) {
                  .comic-layout {
                    grid-template-columns: repeat(6, 1fr);
                  }
                  
                  .panel-1 {
                    grid-column: 1 / span 6;
                    grid-row: 1 / span 2;
                  }
                  
                  .panel-2 {
                    grid-column: 1 / span 3;
                    grid-row: 3 / span 1;
                  }
                  
                  .panel-3 {
                    grid-column: 4 / span 3;
                    grid-row: 3 / span 1;
                  }
                  
                  .panel-4 {
                    grid-column: 1 / span 6;
                    grid-row: 4 / span 2;
                  }
                  
                  .panel-5 {
                    grid-column: 1 / span 3;
                    grid-row: 6 / span 1;
                  }
                  
                  .panel-6 {
                    grid-column: 4 / span 3;
                    grid-row: 6 / span 1;
                  }
                  
                  .panel-7 {
                    grid-column: 1 / span 6;
                    grid-row: 7 / span 2;
                  }
                  
                  .panel-8 {
                    grid-column: 1 / span 6;
                    grid-row: 9 / span 1;
                  }
                  
                  .panel-9 {
                    grid-column: 1 / span 6;
                    grid-row: 10 / span 2;
                  }
                }
              `}</style>
              
              {/* Panel 1 - Bigger panel */}
              <div 
                className="comic-panel panel-1 border-4 border-black shadow-lg relative overflow-hidden cursor-pointer transform hover:scale-[1.01] transition-transform"
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
                <ComicText text="Tiba-tiba..." position="top-left" />
                <ComicText text="...sesuatu yang indah terjadi" position="bottom-right" />
              </div>
              
              {/* Panel 2 */}
              <div 
                className="comic-panel panel-2 border-4 border-black shadow-lg relative overflow-hidden cursor-pointer transform hover:scale-[1.01] transition-transform"
                onClick={() => handlePanelClick('message')}
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
                className="comic-panel panel-3 border-4 border-black shadow-lg relative overflow-hidden cursor-pointer flex items-center justify-center transform hover:scale-[1.01] transition-transform"
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
                className="comic-panel panel-4 border-4 border-black shadow-lg relative overflow-hidden cursor-pointer transform hover:scale-[1.01] transition-transform"
                onClick={() => handlePanelClick('timeline')}
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/comic-panel/1.png"
                    alt="Panel 4"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <ComicText text="Perjalanan cinta kita..." position="bottom-right" />
              </div>
              
              {/* Panel 5 */}
              <div 
                className="comic-panel panel-5 border-4 border-black shadow-lg relative overflow-hidden cursor-pointer transform hover:scale-[1.01] transition-transform"
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/comic-panel/2.png"
                    alt="Panel 5"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <ComicText text="Petualangan berikutnya" position="bottom-right" />
              </div>
              
              {/* Panel 6 */}
              <div 
                className="comic-panel panel-6 border-4 border-black shadow-lg relative overflow-hidden cursor-pointer transform hover:scale-[1.01] transition-transform"
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/comic-panel/3.png"
                    alt="Panel 6"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <ComicText text="Selalu bersamamu" position="top-left" />
              </div>
              
              {/* Panel 7 - Bigger panel */}
              <div 
                className="comic-panel panel-7 border-4 border-black shadow-lg relative overflow-hidden cursor-pointer transform hover:scale-[1.01] transition-transform"
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/comic-panel/1.png"
                    alt="Panel 7"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <ComicText text="Setiap detik bersamamu..." position="top-left" />
                <ComicText text="...adalah hadiah terindah" position="bottom-right" />
              </div>
              
              {/* Panel 8 */}
              <div 
                className="comic-panel panel-8 border-4 border-black shadow-lg relative overflow-hidden cursor-pointer transform hover:scale-[1.01] transition-transform"
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/comic-panel/3.png"
                    alt="Panel 8"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <ComicText text="Cinta yang tumbuh" position="top-left" />
              </div>
              
              {/* Panel 9 - THE END */}
              <div 
                className="comic-panel panel-9 border-4 border-black shadow-lg relative overflow-hidden cursor-pointer transform hover:scale-[1.01] transition-transform"
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/comic-panel/end.png"
                    alt="Panel 9"
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
    </div>
  );
};

export default ComicTile; 