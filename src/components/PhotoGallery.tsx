'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
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
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <div className="max-w-4xl w-full px-4">
        <motion.h2 
          className="text-3xl font-bold text-primary-800 text-center mb-3"
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
              <Card className="overflow-hidden cursor-pointer h-24 sm:h-32 relative shadow-md hover:shadow-lg transition-shadow duration-300 border-primary-200">
                <div className="relative h-full w-full overflow-hidden">
                  {/* Gunakan placeholder sementara - Anda perlu menambahkan foto nyata nanti */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-love to-love-dark opacity-80 flex items-center justify-center">
                    <span className="text-white font-bold text-xs sm:text-sm text-center px-2">{photo.alt}</span>
                  </div>
                  {/* Ketika Anda memiliki foto asli, gunakan berikut:
                  <Image 
                    src={photo.src} 
                    alt={photo.alt} 
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  /> */}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-1 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-white font-medium text-xs sm:text-sm truncate">{photo.caption}</p>
                </div>
              </Card>
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
                className="relative max-w-lg w-full bg-white rounded-lg overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-64 sm:h-80">
                  <div className="absolute inset-0 bg-gradient-to-tr from-love to-love-dark opacity-80 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{photos[selectedPhoto].alt}</span>
                  </div>
                  {/* <Image 
                    src={photos[selectedPhoto].src} 
                    alt={photos[selectedPhoto].alt} 
                    fill
                    className="object-contain"
                  /> */}
                </div>
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-bold text-primary-700">{photos[selectedPhoto].alt}</h3>
                  <p className="text-gray-700 text-sm">{photos[selectedPhoto].caption}</p>
                </div>
                <button 
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
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