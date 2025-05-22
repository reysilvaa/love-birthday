'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { FaStar, FaHeart, FaCompass, FaHome, FaPlane, FaMapMarkedAlt } from 'react-icons/fa';

const Future = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const goals = [
    {
      title: "Rumah Impian",
      icon: <FaHome className="text-2xl md:text-3xl text-indigo-600" />,
      description: "Rumah nyaman untuk kita berdua, dengan taman kecil dan ruang untuk mimpi-mimpi kita bertumbuh.",
      timeframe: "Masa depan"
    },
    {
      title: "Perjalanan Bersama",
      icon: <FaPlane className="text-2xl md:text-3xl text-amber-500" />,
      description: "Menjelajahi dunia bersamamu, mengumpulkan kenangan di setiap tempat yang kita kunjungi.",
      timeframe: "Setiap tahun"
    },
    {
      title: "Keluarga Kecil",
      icon: <FaHeart className="text-2xl md:text-3xl text-pink-500" />,
      description: "Membangun keluarga kecil yang bahagia dan penuh cinta, tempat kita bisa berbagi segalanya.",
      timeframe: "Masa depan"
    },
    {
      title: "Petualangan Baru",
      icon: <FaMapMarkedAlt className="text-2xl md:text-3xl text-emerald-600" />,
      description: "Selalu mencoba hal-hal baru dan menciptakan petualangan dalam hidup kita.",
      timeframe: "Selamanya"
    }
  ];
  
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
      <div className="max-w-4xl w-full px-4 md:px-16 pt-8 pb-20 relative z-10 h-full flex flex-col">
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
              className="w-12 h-12 md:w-14 md:h-14 bg-[#C8E6C9] rounded-full border-4 border-black flex items-center justify-center shadow-md"
            >
              <FaCompass size={24} className="text-black" />
            </motion.div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
              className="w-12 h-12 md:w-14 md:h-14 bg-[#BBDEFB] rounded-full border-4 border-black flex items-center justify-center shadow-md"
            >
              <FaPlane size={24} className="text-black" />
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
              Masa Depan Kita
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-black"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
            </span>
          </motion.h2>
          
          <p className="text-sm md:text-base text-center mt-2 text-black max-w-md">
            Perjalanan cinta kita akan terus berlanjut ke masa depan yang indah
          </p>
        </motion.div>

        {/* Bagian konten dengan scrolling */}
        <div className="flex-1 overflow-y-auto pb-6 future-container">
          {/* Future Visualization - Comic Style */}
          <motion.div 
            className="relative h-48 sm:h-64 md:h-80 overflow-hidden rounded-xl border-4 border-black shadow-lg mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src="/images/comic-panel/5.png"
              alt="Masa Depan Kita"
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
              <span className="text-indigo-800 font-bold">Masa depan kita...</span>
            </motion.div>
            
            <motion.div 
              className="absolute top-4 right-4 bg-white border-2 border-black px-3 py-1 skew-x-12 shadow-md"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.6 }}
            >
              <span className="text-indigo-800 font-bold">...penuh petualangan</span>
            </motion.div>
          </motion.div>
          
          {/* Subtitle */}
          <motion.div
            className="mb-6 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="inline-block bg-[#BBDEFB] border-4 border-black px-4 py-2 rounded font-bold shadow-lg transform -rotate-1">
              <span className="text-indigo-900">Menggapai Impian Bersama</span>
            </div>
          </motion.div>

          {/* Goals Container */}
          <motion.div
            ref={ref}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            {goals.map((goal, index) => (
              <motion.div
                key={index}
                className="bg-white p-4 md:p-5 rounded-xl shadow-lg border-4 border-black relative overflow-hidden transform"
                style={{ rotate: `${Math.random() * 3 - 1.5}deg` }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
              >
                <div className="absolute -top-2 -right-2 w-0 h-0 border-t-8 border-r-8 border-t-black border-r-black z-20" />
                
                <div className="flex items-start mb-3">
                  <div className="bg-indigo-100 p-2 rounded-full mr-3 border-2 border-black">
                    {goal.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-indigo-800">{goal.title}</h3>
                    <p className="text-indigo-500 text-xs">{goal.timeframe}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{goal.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Love Note */}
          <motion.div
            className="bg-white p-5 rounded-xl shadow-lg text-center relative overflow-hidden border-4 border-black transform -rotate-1 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="absolute -top-4 -right-4">
              <FaHeart className="text-pink-400 opacity-50" size={60} />
            </div>
            
            <motion.div
              className="absolute -top-2 -left-2 bg-pink-300 border-2 border-black px-3 py-1 transform -rotate-6 shadow-md"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10, delay: 0.8 }}
            >
              <span className="font-bold text-xs md:text-sm">SPESIAL!</span>
            </motion.div>
            
            <h3 className="text-xl font-bold text-indigo-900 mb-3 relative z-10">Pesan Untuk Masa Depan</h3>
            
            <p className="text-indigo-900 italic mb-4 relative z-10 text-sm md:text-base">
              &quot;Masa depan kita mungkin tidak selalu pasti, tapi satu hal yang pasti adalah 
              aku akan selalu mencintaimu dan berjuang bersamamu. Apapun yang terjadi, 
              kita akan menghadapinya bersama, Annisa.&quot;
            </p>
            
            <div className="flex justify-center items-center mb-2">
              <FaHeart className="text-pink-500 mr-2" />
              <span className="text-indigo-800 font-semibold text-sm">Selamanya bersamamu</span>
              <FaHeart className="text-pink-500 ml-2" />
            </div>
            
            {/* Comic style stamp */}
            <motion.div
              className="absolute bottom-4 right-4 bg-indigo-500 text-white px-3 py-1 rounded-lg border-2 border-black transform rotate-12 shadow-md"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.9 }}
            >
              <span className="font-bold text-xs md:text-sm">Aku Cinta Kamu</span>
            </motion.div>
          </motion.div>
          
          {/* Comic style caption */}
          <motion.div
            className="mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="inline-block bg-[#C8E6C9] border-2 border-black px-4 py-2 rounded font-bold text-sm shadow-md transform rotate-1">
              <div className="flex items-center gap-2">
                <FaStar className="text-indigo-500" />
                <span className="text-indigo-900">Membangun impian dan harapan bersama di setiap langkah!</span>
                <FaStar className="text-indigo-500" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Custom scrollbar style */}
      <style jsx global>{`
        .future-container::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .future-container::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 4px;
        }
        .future-container::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          border: 2px solid transparent;
        }
        .future-container::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default Future; 