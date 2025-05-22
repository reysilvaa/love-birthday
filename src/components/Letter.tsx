'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import { FaEnvelope, FaHeart, FaStamp, FaStar } from 'react-icons/fa';

const Letter = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const messages = [
    'Di hari spesialmu ini, aku ingin kau tahu bahwa cintaku padamu semakin dalam setiap harinya. Kau, Annisa, adalah alasan mengapa aku percaya pada keajaiban cinta sejati.',
    'Annisa, kehadiranmu dalam hidupku adalah hadiah terindah yang pernah aku terima. Senyummu, tawamu, bahkan caramu menatapku, semua itu sangat berharga bagiku.',
    'Kau adalah bintang yang menerangi setiap sudut gelap dalam hidupku, Annisa. Bersamamu, aku merasa semua mimpi dan harapanku menjadi mungkin.',
    'Suaramu adalah melodi terindah yang pernah aku dengar, Annisa. Setiap kenangan bersamamu seperti lagu yang terus mengalun dalam hatiku sepanjang waktu.'
  ];

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Definisikan animasi variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="w-full min-h-screen py-2 px-1 md:py-4 md:px-3 bg-[#fef8e5] flex justify-center items-center overflow-hidden">
      {/* Comic Style Frame Border - responsif untuk mobile */}
      <div className="hidden md:block absolute inset-10 border-[8px] border-black rounded-[40px] z-10"></div>
      <div className="hidden md:block absolute inset-[42px] border-[4px] border-white rounded-[30px] opacity-70 z-10"></div>
      
      {/* Frame untuk mobile - lebih tipis dan dengan padding yang lebih kecil */}
      <div className="md:hidden absolute inset-1 border-[4px] border-black rounded-[15px] z-10"></div>
      <div className="md:hidden absolute inset-[9px] border-[2px] border-white rounded-[10px] opacity-70 z-10"></div>
      
      {/* Halftone pattern overlay */}
      <div className="absolute inset-0 bg-repeat opacity-5 mix-blend-multiply z-0" style={{ 
        backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
        backgroundSize: '8px 8px'
      }}></div>

      <motion.div 
        className="max-w-[280px] xs:max-w-[320px] sm:max-w-md md:max-w-lg w-full bg-white rounded-lg mx-auto my-2 relative border-[3px] border-black overflow-hidden z-20"
        style={{
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          transform: "rotate(-1deg)"
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Decorative stars */}
        <motion.div
          className="absolute top-1 left-1 text-[#FFD700] z-30"
          initial={{ scale: 0, rotate: 25 }}
          animate={{ scale: 1, rotate: 15 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <FaStar size={14} className="md:text-base" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-6 right-2 text-[#FFD700] z-30"
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <FaStar size={12} className="md:text-base" />
        </motion.div>

        {/* Stamp */}
        <motion.div 
          className="absolute top-1 right-1 md:top-3 md:right-3 scale-50 md:scale-75 z-30"
          initial={{ opacity: 0, scale: 0.3, rotate: 15 }}
          animate={{ opacity: 1, scale: 0.5, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", damping: 12 }}
        >
          <div className="bg-[#FFECB3] border-2 border-black rounded-sm p-1 md:p-2 shadow-md">
            <FaStamp className="text-base md:text-2xl text-[#881337]" />
          </div>
          
          <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 rounded-full border-2 border-black flex items-center justify-center rotate-[-15deg] text-[5px] sm:text-[6px] md:text-xs font-mono mt-1 md:mt-1.5 bg-[#FFD8E6] shadow-md">
            <div className="text-center text-black">
              <div>POS</div>
              <div>{new Date().getFullYear()}</div>
            </div>
          </div>
        </motion.div>

        {/* Letter Content */}
        <div className="pt-4 pb-3 px-2 sm:pt-5 sm:pb-4 sm:px-3 md:pt-6 md:px-6 md:pb-5">
          {/* Letter Header */}
          <div className="border-b-2 border-black pb-2 sm:pb-3 md:pb-4 mb-2 sm:mb-3 md:mb-4">
            <motion.div 
              className="text-right mb-1 sm:mb-2 md:mb-3 text-[10px] sm:text-xs md:text-sm text-black"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {currentDate}
            </motion.div>
            
            <motion.h1 
              className="text-base sm:text-lg md:text-2xl font-bangers text-center mb-1 text-black"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Surat Untuk Annisa
            </motion.h1>
            
            <div className="flex justify-center">
              <motion.div 
                className="h-1 w-12 sm:w-14 md:w-20 bg-[#FF80AB] my-0.5 sm:my-1"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              ></motion.div>
            </div>
          </div>
          
          {/* Letter Body */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-1.5 sm:space-y-2 md:space-y-3 font-serif text-black text-[10px] sm:text-xs md:text-sm"
            style={{ 
              lineHeight: "1.4",
              fontFamily: "Georgia, 'Times New Roman', serif",
              color: "#000000"
            }}
          >
            <motion.p 
              variants={itemVariants} 
              className="mb-1 sm:mb-1.5 md:mb-2 font-semibold text-black"
            >
              Yang tercinta Annisa,
            </motion.p>
            
            {messages.map((message, index) => (
              <motion.div key={index} className="mb-1.5 sm:mb-2 md:mb-3" variants={itemVariants}>
                <div className={`p-1.5 sm:p-2 md:p-2.5 ${
                  index % 2 === 0 ? 'bg-[#FFD8E6]' : 'bg-[#BBDEFB]'
                } rounded-lg border-2 border-black relative transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}>
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-4 sm:border-t-6 border-r-4 sm:border-r-6 border-t-black border-r-black" />
                
                  <p 
                    className="text-black text-[10px] sm:text-xs md:text-sm"
                    style={{ 
                      fontWeight: "400",
                      position: "relative",
                      zIndex: 1
                    }}
                  >
                    {message}
                  </p>
                </div>
                
                {index < messages.length - 1 && (
                  <div className="w-1/6 h-0.5 bg-black mx-auto my-1.5 sm:my-2 md:my-2.5"></div>
                )}
              </motion.div>
            ))}
            
            <motion.div 
              variants={itemVariants}
              className="pt-1 sm:pt-2 md:pt-3 text-[10px] sm:text-xs md:text-sm text-black"
            >
              <p>Dengan segenap cinta,</p>
              <motion.p 
                className="mt-1 sm:mt-1.5 md:mt-3 font-semibold italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Kekasihmu
              </motion.p>
            </motion.div>
          </motion.div>
        </div>

        {/* Comic style caption */}
        <motion.div
          className="mb-1 sm:mb-2 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="inline-block bg-[#FFECB3] border-2 border-black px-1.5 py-0.5 sm:px-3 sm:py-1 rounded font-bangers text-xs sm:text-sm md:text-base shadow-md transform -rotate-1">
            <div className="flex items-center gap-1">
              <FaHeart className="text-[#FF80AB] text-[8px] sm:text-xs" />
              <span>Selamat Ulang Tahun!</span>
              <FaHeart className="text-[#FF80AB] text-[8px] sm:text-xs" />
            </div>
          </div>
        </motion.div>

        {/* Decorative Envelope Border */}
        <div className="border-t-2 border-dashed border-black">
          <div className="flex justify-center -mt-1.5 sm:-mt-2">
            <div className="bg-white px-1.5 sm:px-3 border-2 border-black rounded-full shadow-md transform translate-y-[-50%]">
              <FaEnvelope className="text-[10px] sm:text-xs md:text-sm text-[#881337]" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <motion.div 
          className="text-center py-1 sm:py-1.5 md:py-2 text-[8px] sm:text-[10px] md:text-xs text-black"
          style={{
            background: 'linear-gradient(to bottom, #FFD8E6, #FFECB3)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <FaHeart className="inline text-[#881337] mx-0.5" size={6} /> <span className="align-middle">Aku mencintaimu, Annisa!</span> <FaHeart className="inline text-[#881337] mx-0.5" size={6} />
        </motion.div>
      </motion.div>

      {/* Custom scrollbar style */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          border: 1px solid transparent;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default Letter;
