'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { FaEnvelope, FaHeart, FaStamp } from 'react-icons/fa';
import { useClientOnly } from '@/hooks/useClientOnly';

const Message = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isClient = useClientOnly();
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const messages = [
    {
      title: 'Cinta untuk Annisa',
      content: 'Di hari spesialmu ini, aku ingin kau tahu bahwa cintaku padamu semakin dalam setiap harinya. Kau, Annisa, adalah alasan mengapa aku percaya pada keajaiban cinta sejati.'
    },
    {
      title: 'Hadiah Terindah',
      content: 'Annisa, kehadiranmu dalam hidupku adalah hadiah terindah yang pernah aku terima. Senyummu, tawamu, bahkan caramu menatapku, semua itu sangat berharga bagiku.'
    },
    {
      title: 'Bintang Hatiku',
      content: 'Kau adalah bintang yang menerangi setiap sudut gelap dalam hidupku, Annisa. Bersamamu, aku merasa semua mimpi dan harapanku menjadi mungkin.'
    },
    {
      title: 'Melodi Cinta',
      content: 'Suaramu adalah melodi terindah yang pernah aku dengar, Annisa. Setiap kenangan bersamamu seperti lagu yang terus mengalun dalam hatiku sepanjang waktu.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  if (!isClient) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full px-4 text-center">
          <h2 className="text-2xl font-serif text-black text-center mb-3">
            Untukmu, Annisa
          </h2>
        </div>
      </div>
    );
  }

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="w-full min-h-screen py-10 px-4 bg-[#f8f5e9] flex justify-center items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-white rounded-sm shadow-md mx-auto relative"
      >
        {/* Stamp and Postal Elements */}
        <div className="absolute top-4 right-4 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="bg-[#f0f0f0] border border-gray-300 rounded-sm p-2 mb-2"
          >
            <FaStamp className="text-3xl text-[#881337]" />
          </motion.div>
      
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="w-16 h-16 rounded-full border border-gray-400 flex items-center justify-center rotate-[-15deg] text-xs text-gray-500 font-mono opacity-70"
          >
            <div className="text-center">
              <div>POS</div>
              <div>{new Date().getFullYear()}</div>
            </div>
          </motion.div>
        </div>
        
        {/* Letter Content */}
        <div className="pt-8 px-6 pb-6 md:px-10 md:pt-10 md:pb-8">
          {/* Letter Header */}
          <div className="border-b border-gray-200 pb-6 mb-8">
            <div className="text-right mb-8 text-black text-sm font-serif">
              {currentDate}
            </div>
            <h1 className="text-2xl md:text-3xl font-serif text-center mb-2 text-black">Surat Untuk Annisa</h1>
            <div className="flex justify-center">
              <div className="h-px w-16 bg-gray-400 my-2"></div>
            </div>
          </div>
          
          {/* Letter Body */}
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
            className="space-y-6 font-serif text-black tracking-wide"
            style={{ 
              lineHeight: "1.8",
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "1.05rem"
            }}
          >
            <motion.p 
              variants={itemVariants}
              className="mb-6 font-semibold text-black"
              style={{ letterSpacing: "0.5px" }}
            >
              Yang tercinta Annisa,
            </motion.p>
            
            {messages.map((message, index) => (
              <motion.div key={index} variants={itemVariants} className="mb-8">
                <p 
                  className="leading-relaxed text-black"
                  style={{ 
                    paddingLeft: "2rem",
                    marginBottom: "1.5rem",
                    fontWeight: "500"
                  }}
                >
                  {message.content}
                </p>
                {index < messages.length - 1 && (
                  <div className="w-1/3 h-px bg-black mx-auto my-4"></div>
                )}
                  </motion.div>
            ))}
            
            <motion.div variants={itemVariants} className="pt-8 text-base text-black">
              <p>Dengan segenap cinta,</p>
              <p className="mt-6 font-semibold italic">Kekasihmu</p>
            </motion.div>
        </motion.div>
        </div>
        
        {/* Decorative Envelope Border */}
        <div className="border-t border-dashed border-gray-300 mt-2">
          <div className="flex justify-center -mt-3">
        <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white px-4"
            >
              <FaEnvelope className="text-gray-400" />
              </motion.div>
          </div>
          </div>
          
        {/* Footer */}
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center py-3 text-sm text-black"
          >
          <FaHeart className="inline text-[#881337] mx-1" /> Aku mencintaimu, Annisa! <FaHeart className="inline text-[#881337] mx-1" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Message; 