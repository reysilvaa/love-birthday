'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaHeart, FaGift, FaBirthdayCake, FaMusic, FaStar } from 'react-icons/fa';
import { Cake } from 'lucide-react';
import confetti from 'canvas-confetti';

const Birthday = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentGift, setCurrentGift] = useState<number | null>(null);
  const [wishSent, setWishSent] = useState(false);
  
  const gifts = [
    {
      title: "Kenangan Indah",
      description: "Semua momen berharga yang kita lalui bersama, tersimpan dalam album kenangan yang tak ternilai.",
      icon: <FaHeart className="text-pink-500" size={24} />,
      color: "bg-pink-100",
      image: "/images/comic-panel/2.png"
    },
    {
      title: "Kesetiaan",
      description: "Janjiku untuk selalu setia, mendampingimu dalam suka dan duka, dalam sehat dan sakit.",
      icon: <FaHeart className="text-red-500" size={24} />,
      color: "bg-red-100",
      image: "/images/comic-panel/3.png"
    },
    {
      title: "Dukungan Tanpa Henti",
      description: "Dukunganku untuk semua mimpi dan tujuanmu, tak peduli seberapa tinggi atau jauh.",
      icon: <FaHeart className="text-purple-500" size={24} />,
      color: "bg-purple-100",
      image: "/images/comic-panel/6.png"
    },
    {
      title: "Cinta Yang Tumbuh",
      description: "Cinta yang akan terus bertumbuh dan semakin dalam setiap harinya, tak peduli tantangan apapun.",
      icon: <FaHeart className="text-rose-500" size={24} />,
      color: "bg-rose-100",
      image: "/images/comic-panel/5.png"
    },
  ];
  
  const birthdayWishes = [
    "Semoga di usia barumu ini, kamu semakin bahagia dan sukses dalam segala hal.",
    "Semoga semua impian dan harapanmu dapat terwujud di tahun mendatang.",
    "Semoga cinta kita semakin kuat dan bertumbuh setiap harinya.",
    "Semoga kebahagiaan selalu menyertaimu di setiap langkah.",
    "Semoga selalu diberi kesehatan dan keselamatan dalam menjalani hari-hari.",
    "Semoga kita selalu bersama, sampai usia memisahkan.",
  ];

  // Handle confetti
  useEffect(() => {
    if (showConfetti) {
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  }, [showConfetti]);

  // Trigger confetti when component mounts
  useEffect(() => {
    setShowConfetti(true);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative bg-[#fef8e5] overflow-hidden">
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
      
      {/* Konten - dengan scroll */}
      <div className="max-w-4xl w-full px-4 md:px-16 pt-8 pb-20 relative z-10 h-full flex flex-col overflow-y-auto">
        {/* Comic style header with icons */}
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
              className="w-12 h-12 md:w-14 md:h-14 bg-[#FFD8E6] rounded-full border-4 border-black flex items-center justify-center shadow-md"
            >
              <FaBirthdayCake size={24} className="text-black" />
            </motion.div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
              className="w-12 h-12 md:w-14 md:h-14 bg-[#FFECB3] rounded-full border-4 border-black flex items-center justify-center shadow-md"
            >
              <FaGift size={24} className="text-black" />
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
            className="text-2xl md:text-3xl font-bold text-black text-center relative"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="relative">
              Selamat Ulang Tahun, Sayangkuu!
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-black"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
            </span>
          </motion.h2>
        </motion.div>

        {/* Bagian konten dengan scrolling */}
        <div className="flex-1 overflow-y-auto pb-6 birthday-container">
          {/* Header Banner */}
          <motion.div 
            className="relative h-48 sm:h-64 md:h-80 overflow-hidden rounded-xl border-4 border-black shadow-lg mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src="/images/comic-panel/end.png"
              alt="Selamat Ulang Tahun"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <motion.div 
              className="absolute bottom-4 left-4 bg-white border-2 border-black px-3 py-1 -skew-x-12 shadow-md"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.4 }}
            >
              <span className="text-amber-800 font-bold">Hari spesial...</span>
            </motion.div>
            
            <motion.div 
              className="absolute top-4 right-4 bg-white border-2 border-black px-3 py-1 skew-x-12 shadow-md"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.6 }}
            >
              <span className="text-amber-800 font-bold">...untuk orang spesial</span>
            </motion.div>
          </motion.div>

          {/* Birthday Message */}
          <motion.div
            className="bg-white rounded-2xl p-4 md:p-6 shadow-xl border-4 border-black relative overflow-hidden mb-6 transform"
            style={{ rotate: `${0.5}deg` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="absolute -top-6 -right-6 opacity-20">
              <FaBirthdayCake className="text-amber-400" size={60} />
            </div>
            
            <motion.div
              className="absolute -top-2 -left-2 bg-[#FFECB3] border-2 border-black px-2 py-0.5 transform -rotate-6 shadow-md"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10, delay: 0.8 }}
            >
              <span className="font-bold text-xs md:text-sm">SPESIAL!</span>
            </motion.div>
            
            <h2 className="text-xl md:text-2xl font-bold text-amber-800 mb-3 md:mb-4 text-center relative z-10">
              Untuk Belahan Jiwaku
            </h2>
            
            <div className="space-y-3 relative z-10 text-gray-700 text-sm md:text-base">
              <p>
                Di hari ulang tahunmu yang istimewa ini, aku ingin mengungkapkan betapa bersyukurnya aku 
                memilikimu dalam hidupku. Setiap hari bersamamu adalah anugerah yang tak ternilai.
              </p>
              <p>
                Kamu adalah cahaya yang menerangi hari-hariku, tempat berbagi suka dan duka, 
                dan motivasi terbesarku untuk menjadi lebih baik setiap harinya.
              </p>
              <p>
                Saat kita merayakan hari kelahiranmu, aku berdoa agar Tuhan selalu melimpahkan 
                kesehatan, kebahagiaan, dan kesuksesan dalam hidupmu. Semoga segala impian dan 
                harapanmu dapat terwujud di tahun mendatang.
              </p>
              <p>
                Terima kasih telah hadir dalam hidupku dan memberi warna pada setiap momen yang kita lalui bersama.
              </p>
              <div className="font-bold text-right flex items-center justify-end gap-2">
                <span>Dengan segenap cinta,</span>
                <FaHeart className="text-pink-500" />
              </div>
              <p className="text-right font-bold">
                Kekasihmu, Reynald Silva
              </p>
            </div>
            
            {/* Small decorative corner */}
            <div className="absolute top-0 right-0 w-0 h-0 border-t-8 border-r-8 border-t-black border-r-black z-20" />
          </motion.div>

          {/* Birthday Gifts - Comic Style */}
          <div className="mb-6">
            <motion.div
              className="inline-block bg-[#FFECB3] border-4 border-black px-3 py-1 md:px-4 md:py-2 rounded font-bold text-lg shadow-lg transform -rotate-1 mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10, delay: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <FaGift className="text-amber-700" />
                <span>Hadiah Spesial Untukmu</span>
                <FaGift className="text-amber-700" />
              </div>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {gifts.map((gift, index) => (
                <motion.div
                  key={index}
                  className={`${gift.color} rounded-lg p-3 md:p-4 border-4 border-black shadow-lg cursor-pointer relative overflow-hidden transform`}
                  style={{ rotate: `${Math.random() * 3 - 1.5}deg` }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  onClick={() => setCurrentGift(index)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute -top-2 -right-2 w-0 h-0 border-t-8 border-r-8 border-t-black border-r-black z-20" />
                  
                  <div className="flex justify-center mb-2">
                    <div className="bg-white p-2 rounded-full shadow-md border-2 border-black">
                      {gift.icon}
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-amber-800 text-center mb-1">
                    {gift.title}
                  </h3>
                  <p className="text-amber-700 text-center text-xs">
                    {gift.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Birthday Wishes - Comic Style */}
          <motion.div
            className="bg-white py-6 px-3 md:px-4 rounded-xl border-4 border-black mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="flex items-center justify-center gap-2 mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="h-1 w-10 bg-amber-500"></div>
                <Cake className="text-amber-500 text-2xl" />
                <div className="h-1 w-10 bg-amber-500"></div>
              </motion.div>
              
              <h2 className="text-lg md:text-xl font-bold text-amber-800 text-center mb-4">
                Doa dan Harapan
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {birthdayWishes.map((wish, index) => (
                  <motion.div
                    key={index}
                    className="bg-amber-100 rounded-lg p-3 text-center border-2 border-black shadow-md"
                    style={{ rotate: `${Math.random() * 2 - 1}deg` }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                  >
                    <p className="text-amber-800 text-xs md:text-sm">
                      {wish}
                    </p>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-4 md:mt-6 text-center">
                {!wishSent ? (
                  <motion.button
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-bold shadow-lg flex items-center mx-auto border-2 border-black text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setWishSent(true);
                      setShowConfetti(true);
                    }}
                  >
                    <FaMusic className="mr-2" /> Amiin ya rabbal alamin
                  </motion.button>
                ) : (
                  <motion.div
                    className="text-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 10 }}
                  >
                    <div className="bg-pink-100 rounded-full px-4 py-2 inline-flex items-center border-2 border-black">
                      <FaHeart className="text-pink-500 mr-2" />
                      <span className="text-pink-700 font-bold text-xs md:text-sm">Doa Terkirim dengan Cinta!</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Comic style caption */}
          <motion.div
            className="mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="inline-block bg-[#FFD8E6] border-2 border-black px-4 py-2 rounded font-bold text-sm shadow-md transform -rotate-1">
              <div className="flex items-center gap-2">
                <FaHeart className="text-pink-500" />
                <span className="text-amber-900">Selamat ulang tahun, cintaku! Mari kita buat tahun ini menjadi yang terbaik!</span>
                <FaHeart className="text-pink-500" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal for gift detail */}
      <AnimatePresence>
        {currentGift !== null && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCurrentGift(null)}
          >
            <motion.div
              className="bg-white rounded-xl max-w-lg w-full overflow-hidden border-4 border-black"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Comic style header */}
              <div className="bg-black py-2 px-4 flex justify-between items-center">
                <h3 className="text-white font-bold text-xl">
                  {gifts[currentGift].title}
                </h3>
                <button 
                  className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200"
                  onClick={() => setCurrentGift(null)}
                >
                  <span>✕</span>
                </button>
              </div>
              
              <div className="relative h-48 md:h-64">
                <Image
                  src={gifts[currentGift].image}
                  alt={gifts[currentGift].title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-4 md:p-6 bg-white border-t-4 border-black">
                <div className="flex items-center mb-2">
                  {gifts[currentGift].icon}
                  <h3 className="text-lg font-bold text-amber-800 ml-3">
                    {gifts[currentGift].title}
                  </h3>
                </div>
                <p className="text-gray-700 mb-4 text-sm md:text-base">
                  {gifts[currentGift].description}
                </p>
              </div>
              
              {/* Comic style sticker */}
              <motion.div
                className="absolute top-4 right-16 bg-[#FF80AB] text-white px-2 py-1 rounded-lg border-2 border-black transform rotate-12 shadow-md font-bold text-sm"
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

      {/* Custom scrollbar style */}
      <style jsx global>{`
        .birthday-container::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .birthday-container::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 4px;
        }
        .birthday-container::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          border: 2px solid transparent;
        }
        .birthday-container::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default Birthday; 