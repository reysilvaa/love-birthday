'use client';

import { useRef, useEffect } from 'react';
import { useInView, useAnimation } from 'framer-motion';
import { FaEnvelope, FaHeart, FaStamp } from 'react-icons/fa';

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

  return (
    <div className="w-full min-h-screen py-5 px-3 md:py-10 md:px-4 bg-[#f8f5e9] flex justify-center items-center">
      <div 
        className="max-w-md md:max-w-xl w-full bg-white rounded-sm mx-auto relative border border-gray-300"
        style={{
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.01), rgba(0,0,0,0.01) 1px, transparent 1px, transparent 9px)",
        }}
      >
        {/* Stamp */}
        <div className="absolute top-3 right-3 md:top-4 md:right-4">
          <div className="bg-[#f0f0f0] border border-gray-300 rounded-sm p-1 md:p-2">
            <FaStamp className="text-xl md:text-3xl text-[#881337]" />
          </div>
          
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-gray-400 flex items-center justify-center rotate-[-15deg] text-[10px] md:text-xs font-mono mt-2">
            <div className="text-center text-black">
              <div>POS</div>
              <div>{new Date().getFullYear()}</div>
            </div>
          </div>
        </div>

        {/* Letter Content */}
        <div className="pt-8 pb-6 px-4 md:pt-10 md:px-8 md:pb-8">
          {/* Letter Header */}
          <div className="border-b border-gray-300 pb-4 md:pb-6 mb-6 md:mb-8">
            <div className="text-right mb-6 md:mb-8 text-black text-xs md:text-sm">
              {currentDate}
            </div>
            <h1 className="text-2xl md:text-3xl font-serif text-center mb-2 text-black">Surat Untuk Annisa</h1>
            <div className="flex justify-center">
              <div className="h-px w-12 md:w-16 bg-black my-2"></div>
            </div>
          </div>
          
          {/* Letter Body */}
          <div
            ref={ref}
            className="space-y-6 md:space-y-8 font-serif text-black"
            style={{ 
              lineHeight: "1.7",
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "0.95rem",
              color: "#000000"
            }}
          >
            <p className="mb-6 font-semibold text-black">
              Yang tercinta Annisa,
            </p>
            
            {messages.map((message, index) => (
              <div key={index} className="mb-6 md:mb-8">
                <p 
                  className="text-black"
                  style={{ 
                    paddingLeft: "1.5rem",
                    marginBottom: "1.25rem",
                    fontWeight: "400"
                  }}
                >
                  {message}
                </p>
                {index < messages.length - 1 && (
                  <div className="w-1/5 h-px bg-black mx-auto my-4 md:my-6"></div>
                )}
              </div>
            ))}
            
            <div className="pt-6 md:pt-8 text-sm md:text-base text-black">
              <p>Dengan segenap cinta,</p>
              <p className="mt-5 md:mt-6 font-semibold italic">Kekasihmu</p>
            </div>
          </div>
        </div>

        {/* Decorative Envelope Border */}
        <div className="border-t border-dashed border-gray-500 mt-1">
          <div className="flex justify-center -mt-2 md:-mt-3">
            <div className="bg-white px-4">
              <FaEnvelope className="text-gray-600 text-sm md:text-base" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div 
          className="text-center py-3 md:py-4 text-sm md:text-base text-black"
          style={{
            background: 'linear-gradient(to bottom, #f8f5e9, #f0ead6)'
          }}
        >
          <FaHeart className="inline text-[#881337] mx-1" /> Aku mencintaimu, Annisa! <FaHeart className="inline text-[#881337] mx-1" />
        </div>
      </div>
    </div>
  );
};

export default Letter;
