'use client';

import { motion } from 'framer-motion';
import { FaHeart, FaClock, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const timelineEvents = [
  {
    date: 'Januari 2022',
    title: 'Pertemuan',
    description: 'Saat pertama kali kita bertemu. Tidak akan pernah kulupakan senyummu hari itu.',
    icon: <FaMapMarkerAlt className="text-[#FF80AB]" />
  },
  {
    date: 'Februari 2022',
    title: 'Mulai Dekat',
    description: 'Kita mulai lebih sering bersama. Setiap detik bersamamu terasa istimewa.',
    icon: <FaHeart className="text-[#FF80AB]" />
  },
  {
    date: 'Maret 2022',
    title: 'Kencan',
    description: 'Makan malam romantis pertama kita. Lilin, musik, dan tatapan matamu yang tak terlupakan.',
    icon: <FaCalendarAlt className="text-[#FF80AB]" />
  },
  {
    date: 'April 2022',
    title: 'Jadian',
    description: 'Hari kita resmi menjadi sepasang kekasih. Hari yang mengubah seluruh hidupku.',
    icon: <FaHeart className="text-[#FF80AB]" />
  },
  {
    date: 'Hari Ini',
    title: 'Ultah Kamu',
    description: 'Merayakan hari spesialmu dengan cinta. Dan berjanji akan terus mencintaimu tahun demi tahun.',
    icon: <FaClock className="text-[#FF80AB]" />
  }
];

const Timeline = () => {
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
     
      {/* Konten dengan padding yang responsif */}
      <div className="max-w-4xl w-full px-4 md:px-16 pt-8 pb-4 relative z-10">
        {/* Header dengan dekorasi gaya komik */}
        <motion.div 
          className="relative mb-6 text-center"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="mx-auto w-fit px-8 py-2 bg-[#FFD8E6] border-4 border-black rounded-xl shadow-md relative z-10"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.1, 1] }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl md:text-3xl font-bangers text-black">Perjalanan Cinta Kita</h2>
          </motion.div>
          
          {/* Comic style accents */}
          <motion.div
            className="absolute -top-3 -left-2 w-10 h-10 bg-[#FFECB3] border-2 border-black rounded-full -z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          />
          
          <motion.div
            className="absolute -bottom-2 -right-3 w-8 h-8 bg-[#C8E6C9] border-2 border-black rounded-full -z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
          />
        </motion.div>
        
        <div className="relative max-h-[60vh] overflow-y-auto pr-2 pb-4 timeline-container">
          {/* Garis Timeline dengan gaya komik */}
          <motion.div 
            className="absolute left-14 top-0 bottom-0 w-1 bg-black"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Pola dash pada garis timeline */}
            {[...Array(20)].map((_, index) => (
              <motion.div
                key={index}
                className="absolute w-2 h-2 bg-[#FFD8E6] border border-black rounded-full left-1/2 transform -translate-x-1/2"
                style={{ top: `${index * 5}%` }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 * (index % 5) + 0.5 }}
              />
            ))}
          </motion.div>
          
          {/* Event Timeline */}
          <div className="relative z-10 space-y-4">
            {timelineEvents.map((event, index) => (
              <motion.div 
                key={index}
                className="flex items-start relative pl-14 md:pl-20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                whileHover={{ scale: 1.02, x: 4, transition: { duration: 0.2 } }}
              >
                <div className="absolute left-0 flex items-center">
                  <motion.div
                    className="w-7 h-7 rounded-full bg-white border-2 border-black flex items-center justify-center z-10 ml-[0.45rem]"
                    animate={{ 
                      scale: index === timelineEvents.length - 1 ? [1, 1.2, 1] : 1
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: index === timelineEvents.length - 1 ? Infinity : 0,
                      repeatType: "reverse"
                    }}
                  >
                    {event.icon}
                  </motion.div>
                </div>
                
                <div className="w-full shadow-md hover:shadow-lg transition-all duration-300 border-4 border-black bg-white rounded-lg transform"
                    style={{ rotate: `${Math.random() * 1 - 0.5}deg` }}
                >
                  <div className="p-3">
                    <div className="flex justify-between items-center mb-1 border-b-2 border-black pb-1">
                      <h3 className="text-base font-bold text-black font-bangers">{event.title}</h3>
                      <p className="text-xs bg-[#FFECB3] text-black px-1.5 py-0.5 rounded border-2 border-black font-bold">{event.date}</p>
                    </div>
                    <p className="text-black text-xs mt-2">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="inline-block bg-[#FFD8E6] border-3 border-black px-6 py-2 rounded-lg shadow-md transform rotate-2">
            <p className="text-sm md:text-base text-black font-bold relative">
              Dan ini hanya awal dari perjalanan cinta kita...
            </p>
          </div>
          
          <div className="mt-4">
            <motion.div 
              className="inline-block"
              animate={{ 
                y: [0, -10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <FaHeart className="text-[#FF80AB] mx-auto" size={28} />
            </motion.div>
          </div>
        </motion.div>
        
        {/* Comic style caption */}
        <motion.div 
          className="absolute bottom-6 right-8 bg-[#FFECB3] text-black px-4 py-1 border-2 border-black shadow-md transform -rotate-3"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <span className="font-bangers text-lg">Bersambung...</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Timeline; 