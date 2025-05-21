'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
// Import Image akan digunakan nanti saat menambahkan foto asli
// import Image from 'next/image';

const photos = [
  {
    id: 1,
    src: '/images/photo1.jpg',
    alt: 'Foto Kenangan 1',
    caption: 'Momen spesial pertama kita'
  },
  {
    id: 2,
    src: '/images/photo2.jpg',
    alt: 'Foto Kenangan 2',
    caption: 'Waktu bersama yang menyenangkan'
  },
  {
    id: 3,
    src: '/images/photo3.jpg',
    alt: 'Foto Kenangan 3',
    caption: 'Senyummu yang paling indah'
  },
  {
    id: 4,
    src: '/images/photo4.jpg',
    alt: 'Foto Kenangan 4',
    caption: 'Banyak cerita yang kita buat'
  },
  {
    id: 5,
    src: '/images/photo5.jpg',
    alt: 'Foto Kenangan 5',
    caption: 'Perjalanan cinta kita'
  },
  {
    id: 6,
    src: '/images/photo6.jpg',
    alt: 'Foto Kenangan 6',
    caption: 'Selalu ada untukmu'
  },
];

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative bg-[#fef8e5]">
      {/* Comic Style Frame Border - responsif untuk mobile */}
      <div className="hidden md:block absolute inset-10 border-[10px] border-black rounded-[40px] z-5"></div>
      <div className="hidden md:block absolute inset-[46px] border-[5px] border-white rounded-[30px] opacity-70 z-5"></div>
      
      {/* Frame untuk mobile - lebih tipis dan dengan padding yang lebih kecil */}
      <div className="md:hidden absolute inset-2 border-[5px] border-black rounded-[20px] z-5"></div>
      <div className="md:hidden absolute inset-[13px] border-[2px] border-white rounded-[15px] opacity-70 z-5"></div>
      
      {/* Halftone pattern overlay */}
      <div className="absolute inset-0 bg-repeat opacity-5 mix-blend-multiply z-0" style={{ 
        backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
        backgroundSize: '15px 15px'
      }}></div>
      
      <div className="max-w-4xl w-full px-4 md:px-16 pt-8 pb-4 relative z-10">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-black text-center mb-4 md:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Kenangan Indah Kita
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {photos.map((photo, index) => (
            <motion.div 
              key={photo.id}
              variants={item}
              onClick={() => setSelectedPhoto(index)}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <div className="overflow-hidden cursor-pointer h-24 sm:h-32 relative shadow-md hover:shadow-lg transition-shadow border-4 border-black rounded-lg">
                <div className="relative h-full w-full overflow-hidden">
                  {/* Comic style placeholder dengan pola warna yang lebih sesuai */}
                  <div className={`absolute inset-0 ${index % 3 === 0 ? 'bg-[#FFD8E6]' : index % 3 === 1 ? 'bg-[#FFECB3]' : 'bg-[#C8E6C9]'} flex items-center justify-center`}>
                    <span className="text-black font-bold text-xs sm:text-sm text-center px-2">{photo.alt}</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-1 bg-white border-t-2 border-black">
                  <p className="text-black font-medium text-xs sm:text-sm truncate">{photo.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <AnimatePresence>
          {selectedPhoto !== null && (
            <motion.div 
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
            >
              <motion.div 
                className="relative max-w-lg w-full bg-white rounded-lg overflow-hidden border-4 border-black"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Comic style header */}
                <div className="bg-black py-2 px-4">
                  <h3 className="text-white font-bold">Kenangan</h3>
                </div>
                
                <div className="relative h-64 sm:h-80">
                  <div className={`absolute inset-0 ${selectedPhoto % 3 === 0 ? 'bg-[#FFD8E6]' : selectedPhoto % 3 === 1 ? 'bg-[#FFECB3]' : 'bg-[#C8E6C9]'} flex items-center justify-center`}>
                    <span className="text-black font-bold text-xl">{photos[selectedPhoto].alt}</span>
                  </div>
                </div>
                <div className="p-4 bg-white border-t-4 border-black">
                  <h3 className="text-lg font-bold text-black">{photos[selectedPhoto].alt}</h3>
                  <p className="text-black text-sm">{photos[selectedPhoto].caption}</p>
                </div>
                <button 
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
                  onClick={() => setSelectedPhoto(null)}
                >
                  <X size={16} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PhotoGallery; 