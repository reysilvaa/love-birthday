'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X, Play, Pause } from 'lucide-react';
import { FaCamera, FaHeart, FaStar, FaImage, FaVideo } from 'react-icons/fa';
import Image from 'next/image';

// Definisikan tipe untuk konten media
type MediaType = 'image' | 'video';

interface MediaItem {
  id: number;
  src: string;
  type: MediaType;
  alt: string;
  caption: string;
}

// Data media yang akan ditampilkan
const mediaItems: MediaItem[] = [
  {
    id: 1,
    src: '/images/kenangan/1.JPG',
    type: 'image',
    alt: 'Memori 1',
    caption: 'Momen pertama kita bersama di Jengkoang'
  },
  {
    id: 2,
    src: '/images/kenangan/2.mp4',
    type: 'video',
    alt: 'Memori 2',
    caption: 'Waktu bersama pertama sebagai Pasangan di Coban Rondo'
  },
  {
    id: 3,
    src: '/images/kenangan/3.mp4',
    type: 'video',
    alt: 'Memori 3',
    caption: 'Cantikmu yang paling indah di Bioskop'
  },
  {
    id: 4,
    src: '/images/kenangan/4.mp4',
    type: 'video',
    alt: 'Memori 4',
    caption: 'Kita ke CR pertama kali'
  },
  {
    id: 5,
    src: '/images/kenangan/5.JPG',
    type: 'image',
    alt: 'Memori 5',
    caption: 'Foto kita bersama di Rumah Wahyuni'
  },
  {
    id: 6,
    src: '/images/kenangan/6.mp4',
    type: 'video',
    alt: 'Memori 6',
    caption: 'Kamu ijin main Karaoke di Happy Puppy'
  },
  {
    id: 7,
    src: '/images/kenangan/7.JPG',
    type: 'image',
    alt: 'Memori 7',
    caption: 'Kita ke foto di Rumah Mbah'
  },
  {
    id: 8,
    src: '/images/kenangan/8.JPG',
    type: 'image',
    alt: 'Memori 8',
    caption: 'Foto saat kamu pertama kali kerja'
  },
  {
    id: 9,
    src: '/images/kenangan/9.mp4',
    type: 'video',
    alt: 'Memori 9',
    caption: 'Saat kamu di Mall Elpico'
  },
  {
    id: 10,
    src: '/images/kenangan/10.mp4',
    type: 'video',
    alt: 'Memori 10',
    caption: 'Kamu mamam Mixue di MOG hehehe :)'
  },
];

const PhotoGallery = () => {
  const [selectedMedia, setSelectedMedia] = useState<number | null>(null);
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const handleImageError = (index: number) => {
    setImageError(prev => ({ ...prev, [index]: true }));
  };

  const togglePlayPause = () => {
    if (selectedMedia === null) return;
    
    const media = mediaItems[selectedMedia];
    if (media.type !== 'video') return;
    
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handler saat video berakhir
  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  // Handler saat video/audio dimuat
  const handleMediaLoaded = () => {
    // Reset status error ketika media berhasil dimuat
    if (selectedMedia !== null) {
      setImageError(prev => ({ ...prev, [selectedMedia]: false }));
    }
  };

  // Handler untuk memulai pemutaran video otomatis saat modal dibuka
  useEffect(() => {
    if (selectedMedia !== null && mediaItems[selectedMedia]?.type === 'video' && videoRef.current) {
      // Tunggu sebentar untuk memastikan video sudah dimuat
      const timer = setTimeout(() => {
        try {
          if (videoRef.current) {
            videoRef.current.play()
              .then(() => {
                setIsPlaying(true);
              })
              .catch((error) => {
                console.log('Autoplay failed:', error);
                // Autoplay mungkin diblokir browser, tetapi tidak masalah
                setIsPlaying(false);
              });
          }
        } catch (error) {
          console.log('Error playing video:', error);
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [selectedMedia]);

  // Handler saat modal ditutup
  const handleCloseModal = () => {
    // Hentikan video saat modal ditutup
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
    setSelectedMedia(null);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative bg-[#fef8e5] overflow-hidden">
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
      
      <div className="max-w-4xl w-full px-4 md:px-16 pt-8 pb-20 relative z-10 h-full flex flex-col">
        {/* Comic style header with camera and video icons */}
        <motion.div 
          className="flex flex-col items-center justify-center mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative flex items-center justify-center gap-4 mb-2">
            <motion.div
              className="absolute -top-2 -left-10 text-[#FFD700]"
              initial={{ scale: 0, rotate: 25 }}
              animate={{ scale: [0, 1.2, 1], rotate: [25, 15] }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <FaStar size={20} />
            </motion.div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, stiffness: 200 }}
              className="w-14 h-14 bg-[#FFD8E6] rounded-full border-4 border-black flex items-center justify-center shadow-md"
            >
              <FaCamera size={26} className="text-black" />
            </motion.div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
              className="w-14 h-14 bg-[#BBDEFB] rounded-full border-4 border-black flex items-center justify-center shadow-md"
            >
              <FaVideo size={26} className="text-black" />
            </motion.div>
            
            <motion.div
              className="absolute -top-1 -right-8 text-[#FFD700]"
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: [0, 1.2, 1], rotate: [-15, 0] }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <FaStar size={16} />
            </motion.div>
          </div>
          
          <motion.h2 
            className="text-2xl md:text-3xl font-bangers text-black text-center relative"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="relative">
          Kenangan Indah Kita
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-black"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
            </span>
        </motion.h2>
          
          <motion.p 
            className="text-sm md:text-base text-center mt-2 text-black max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Momen-momen berharga yang telah kita lalui bersama
          </motion.p>
        </motion.div>
        
        {/* Bagian galeri dengan scrolling */}
        <div className="flex-1 overflow-y-auto pb-6 gallery-container">
        <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 gap-3 content-start"
          variants={container}
          initial="hidden"
          animate="show"
        >
            {mediaItems.map((mediaItem, index) => (
            <motion.div 
                key={mediaItem.id}
                variants={itemVariant}
                onClick={() => setSelectedMedia(index)}
                whileHover={{ scale: 1.03, rotate: Math.random() < 0.5 ? 1 : -1 }}
              transition={{ duration: 0.3 }}
                className="transform"
                style={{ rotate: `${Math.random() * 3 - 1.5}deg` }}
            >
                <div className="overflow-hidden cursor-pointer h-28 sm:h-40 relative shadow-md hover:shadow-lg transition-shadow border-4 border-black rounded-lg bg-white p-1">
                <div className="relative h-full w-full overflow-hidden">
                    {/* Tampilkan gambar atau thumbnail video */}
                    {!imageError[index] && mediaItem.type === 'image' && (
                      <Image
                        src={mediaItem.src}
                        alt={mediaItem.alt}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="z-10"
                        onError={() => handleImageError(index)}
                        onLoad={handleMediaLoaded}
                      />
                    )}
                    
                    {/* Tampilkan indikator video jika item adalah video */}
                    {mediaItem.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/30">
                        <Play size={24} className="text-white" />
                      </div>
                    )}
                    
                    {/* Fallback kalau gambar tidak ada atau error */}
                    <div className={`absolute inset-0 ${index % 3 === 0 ? 'bg-[#FFD8E6]' : index % 3 === 1 ? 'bg-[#FFECB3]' : 'bg-[#C8E6C9]'} flex items-center justify-center border-2 border-black ${(!imageError[index] && mediaItem.type !== 'video') ? 'z-0' : 'z-10'}`}>
                      {(imageError[index] || mediaItem.type === 'video') ? (
                        <div className="flex flex-col items-center justify-center">
                          {mediaItem.type === 'video' ? (
                            <FaVideo className="text-black opacity-50 mb-1" size={24} />
                          ) : (
                            <FaImage className="text-black opacity-50 mb-1" size={24} />
                          )}
                          <span className="text-black font-bold text-xs sm:text-sm text-center px-2">{mediaItem.alt}</span>
                        </div>
                      ) : (
                        <span className="text-black font-bold text-xs sm:text-sm text-center px-2">{mediaItem.alt}</span>
                      )}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-white border-t-2 border-black z-20">
                    <p className="text-black font-medium text-xs sm:text-sm truncate">{mediaItem.caption}</p>
                  </div>
                  
                  {/* Small decorative corner */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-8 border-r-8 border-t-black border-r-black z-20" />
                  
                  {/* Badge untuk tipe media */}
                  <div className={`absolute top-1 left-1 text-xs px-1.5 py-0.5 z-20 font-bold rounded border-2 border-black ${mediaItem.type === 'video' ? 'bg-[#BBDEFB]' : 'bg-[#FFD8E6]'}`}>
                    {mediaItem.type === 'video' ? 'VIDEO' : 'FOTO'}
                </div>
                </div>
            </motion.div>
          ))}
          </motion.div>
        </div>
        
        {/* Comic style caption */}
        <motion.div
          className="mt-6 mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="inline-block bg-[#FFECB3] border-2 border-black px-4 py-2 rounded font-bangers text-lg shadow-md transform -rotate-1">
            <div className="flex items-center gap-2">
              <FaHeart className="text-[#FF80AB]" />
              <span>Memori yang tak terlupakan!</span>
              <FaHeart className="text-[#FF80AB]" />
            </div>
          </div>
        </motion.div>
        
        {/* Modal popup untuk photo/video yang dipilih */}
        <AnimatePresence>
          {selectedMedia !== null && (
            <motion.div 
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
            >
              <motion.div 
                className="relative max-w-lg w-full bg-white rounded-lg overflow-hidden border-4 border-black m-auto my-4"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Comic style header */}
                <div className="bg-black py-2 px-4 flex justify-between items-center">
                  <h3 className="text-white font-bold font-bangers text-xl">
                    {mediaItems[selectedMedia].type === 'video' ? 'Video' : 'Foto'} #{selectedMedia + 1}
                  </h3>
                  <button 
                    className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors"
                    onClick={handleCloseModal}
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <div className="relative h-64 sm:h-80">
                  {/* Tampilkan gambar atau video berdasarkan tipe */}
                  {mediaItems[selectedMedia].type === 'image' && !imageError[selectedMedia] && (
                    <Image
                      src={mediaItems[selectedMedia].src}
                      alt={mediaItems[selectedMedia].alt}
                      fill
                      style={{ objectFit: 'contain' }}
                      className="z-10"
                      onError={() => handleImageError(selectedMedia)}
                      onLoad={handleMediaLoaded}
                    />
                  )}
                  
                  {/* Tampilkan video jika tipe video */}
                  {mediaItems[selectedMedia].type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <video
                        ref={videoRef}
                        src={mediaItems[selectedMedia].src}
                        className="max-h-full max-w-full"
                        controls={false}
                        autoPlay={false} // Autoplay dihandle oleh useEffect
                        playsInline={true}
                        muted={false}
                        loop={false}
                        onEnded={handleVideoEnded}
                        onError={() => handleImageError(selectedMedia)}
                        onLoadedData={handleMediaLoaded}
                      />
                      
                      {/* Play/Pause Button untuk video */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePlayPause();
                        }}
                        className="absolute z-30 flex items-center justify-center w-16 h-16 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="text-white" size={32} />
                        ) : (
                          <Play className="text-white" size={32} />
                        )}
                      </button>
                    </div>
                  )}
                  
                  {/* Tampilkan placeholder jika tidak ada media atau error */}
                  <div className={`absolute inset-0 ${selectedMedia % 3 === 0 ? 'bg-[#FFD8E6]' : selectedMedia % 3 === 1 ? 'bg-[#FFECB3]' : 'bg-[#C8E6C9]'} flex flex-col items-center justify-center ${!imageError[selectedMedia] ? 'z-0' : 'z-10'}`}>
                    {imageError[selectedMedia] && (
                      <>
                        {mediaItems[selectedMedia].type === 'video' ? (
                          <FaVideo size={48} className="text-black opacity-40 mb-4" />
                        ) : (
                          <FaImage size={48} className="text-black opacity-40 mb-4" />
                        )}
                      </>
                    )}
                    <span className="text-black font-bold text-xl">{mediaItems[selectedMedia].alt}</span>
                  </div>
                </div>
                <div className="p-4 bg-white border-t-4 border-black">
                  <h3 className="text-lg font-bold text-black">{mediaItems[selectedMedia].alt}</h3>
                  <p className="text-black text-sm">{mediaItems[selectedMedia].caption}</p>
                </div>
                
                {/* Comic style sticker */}
                <motion.div
                  className="absolute top-4 right-16 bg-[#FF80AB] text-white px-3 py-1 rounded-lg border-2 border-black transform rotate-12 shadow-md font-bangers"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  <span>Spesial!</span>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Custom scrollbar style */}
      <style jsx global>{`
        .gallery-container::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .gallery-container::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 4px;
        }
        .gallery-container::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          border: 2px solid transparent;
        }
        .gallery-container::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default PhotoGallery; 