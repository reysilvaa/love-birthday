'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { FaHeart, FaGift, FaStar, FaMusic } from 'react-icons/fa';
import { useDecorations } from '@/hooks/useAnimations';
import { useParallaxEffect } from '@/hooks/useParallax';
import { useClientOnly } from '@/hooks/useClientOnly';

const Message = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isClient = useClientOnly();
  const decorations = useDecorations();
  const { containerRef, y1, y2, rotate, scale } = useParallaxEffect();
  
  // Perbarui animasi saat komponen terlihat
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const messages = [
    {
      icon: <FaHeart className="text-[#FF80AB]" />,
      title: 'Cinta Tanpa Batas',
      content: 'Di hari spesialmu ini, aku ingin kau tahu bahwa cintaku padamu tidak memiliki batasan.'
    },
    {
      icon: <FaGift className="text-[#FFECB3]" />,
      title: 'Kado Istimewa',
      content: 'Kau adalah hadiah terindah yang pernah aku dapatkan dalam hidup.'
    },
    {
      icon: <FaStar className="text-[#FFD700]" />,
      title: 'Bintang Kehidupan',
      content: 'Kau adalah bintang yang menerangi hari-hariku. Terima kasih telah hadir dan membawa kebahagiaan.'
    },
    {
      icon: <FaMusic className="text-[#C8E6C9]" />,
      title: 'Melodi Hati',
      content: 'Kau adalah melodi indah yang selalu mengiringi setiap langkahku dalam hidup ini.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, type: "spring", stiffness: 100 }
    }
  };

  // Tampilkan loading placeholder jika masih server-side
  if (!isClient) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center relative">
        <div className="max-w-4xl w-full px-4 text-center">
          <h2 className="text-3xl font-bold text-black text-center mb-3">
            Untukmu, Sayangku
          </h2>
          <p className="text-base text-center text-black mb-6 max-w-2xl mx-auto">
            Beberapa kata yang ingin aku sampaikan di hari spesialmu ini
          </p>
          <div className="grid grid-cols-2 gap-4">
            {messages.map((message, index) => (
              <div key={index} className="bg-white/80 shadow rounded-lg p-4">
                <div className="flex flex-row items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center">
                    {message.icon}
                  </div>
                  <h3 className="text-base font-semibold">{message.title}</h3>
                </div>
                <p className="text-sm text-gray-700">{message.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center relative bg-[#fef8e5]">
      {/* Comic Style Frame Border - responsif untuk mobile */}
      <div className="hidden md:block absolute inset-10 border-[10px] border-black rounded-[40px] z-5"></div>
      <div className="hidden md:block absolute inset-[46px] border-[5px] border-white rounded-[30px] opacity-70 z-5"></div>
      
      {/* Frame untuk mobile - lebih tipis dan dengan padding yang lebih kecil */}
      <div className="md:hidden absolute inset-2 border-[5px] border-black rounded-[20px] z-5"></div>
      <div className="md:hidden absolute inset-[13px] border-[2px] border-white rounded-[15px] opacity-70 z-5"></div>
      
      {/* Latar belakang dekoratif dengan efek parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {decorations.map((decoration) => (
          <motion.div
            key={decoration.id}
            className="absolute opacity-20"
            style={{
              width: decoration.size,
              height: decoration.size,
              opacity: decoration.opacity,
              x: `${decoration.x}%`,
              y: `${decoration.y}%`,
              rotate: decoration.rotate,
              scale: decoration.scale
            }}
            animate={{
              y: [`${decoration.y}%`, `${decoration.y + (Math.random() * 10 - 5)}%`],
              x: [`${decoration.x}%`, `${decoration.x + (Math.random() * 10 - 5)}%`],
              rotate: [decoration.rotate, decoration.rotate + 10, decoration.rotate]
            }}
            transition={{
              duration: decoration.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            {decoration.type === 0 ? (
              <FaHeart className="w-full h-full text-[#FF80AB]" />
            ) : decoration.type === 1 ? (
              <FaGift className="w-full h-full text-[#FFECB3]" />
            ) : (
              <FaStar className="w-full h-full text-[#FFD700]" />
            )}
          </motion.div>
        ))}
      </div>
      
      <div className="max-w-4xl w-full px-4 md:px-16 pt-8 pb-4 relative z-10">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-black text-center mb-4 md:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ opacity: { duration: 0.5 }, y: { duration: 0.5 } }}
          style={{ y: y1, rotate }}
        >
          Untukmu, Sayangku
        </motion.h2>
        
        <motion.p 
          className="text-base text-center text-black mb-6 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ y: y2 }}
        >
          Beberapa kata yang ingin aku sampaikan di hari spesialmu ini
        </motion.p>
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-2 gap-4"
          style={{ scale }}
        >
          {messages.map((message, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -5, 
                scale: 1.02,
                transition: { duration: 0.2 } 
              }}
              style={{ y: index % 2 === 0 ? y1 : y2 }}
            >
              {/* Ubah Card menjadi gaya comic panel */}
              <div className="h-full border-4 border-black bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group rounded-xl">
                <div className="py-3 px-4 flex flex-row items-center gap-2 pb-2 relative border-b-2 border-black">
                  <motion.div 
                    className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center shadow-sm relative overflow-hidden z-10"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 3, 0, -3, 0]
                    }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  >
                    {message.icon}
                  </motion.div>
                  <h3 className="text-base font-bold relative text-black">
                    {message.title}
                  </h3>
                </div>
                <div className="pt-3 px-4 pb-4">
                  <p className="text-sm text-black relative z-10">{message.content}</p>
                </div>
                
                {/* Comic dots pattern overlay */}
                <div className="absolute inset-0 bg-repeat opacity-5 mix-blend-multiply" style={{ 
                  backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
                  backgroundSize: '8px 8px'
                }}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          className="mt-10 text-center relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="flex justify-center items-center gap-1 sm:gap-2">
            {[...Array(5)].map((_, i) => (
              <motion.div 
                key={i}
                animate={{ 
                  y: [0, -10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 1.5, 
                  delay: i * 0.2,
                  repeat: Infinity, 
                  repeatType: "reverse" 
                }}
                className="relative"
              >
                <FaHeart 
                  className="text-[#FF80AB] relative z-10" 
                  size={18 + i * 2}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Message; 