'use client';

import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const timelineEvents = [
  {
    date: 'Januari 2022',
    title: 'Pertemuan',
    description: 'Saat pertama kali kita bertemu.'
  },
  {
    date: 'Februari 2022',
    title: 'Mulai Dekat',
    description: 'Kita mulai lebih sering bersama.'
  },
  {
    date: 'Maret 2022',
    title: 'Kencan',
    description: 'Makan malam romantis pertama kita.'
  },
  {
    date: 'April 2022',
    title: 'Jadian',
    description: 'Hari kita resmi menjadi sepasang kekasih.'
  },
  {
    date: 'Hari Ini',
    title: 'Ultah Kamu',
    description: 'Merayakan hari spesialmu dengan cinta.'
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
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-black text-center mb-4 md:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Perjalanan Cinta Kita
        </motion.h2>
        
        <div className="relative max-h-[60vh] overflow-y-auto pr-2 pb-4 timeline-container">
          {/* Garis Timeline */}
          <div className="absolute left-14 top-0 bottom-0 w-0.5 bg-black" />
          
          {/* Event Timeline */}
          <div className="relative z-10 space-y-3">
            {timelineEvents.map((event, index) => (
              <motion.div 
                key={index}
                className="flex items-start relative pl-14"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="absolute left-0 flex items-center">
                  <div className="w-7 h-7 rounded-full bg-white border-2 border-black flex items-center justify-center z-10 ml-[0.45rem]">
                    <FaHeart className="text-[#FF80AB] text-sm" />
                  </div>
                </div>
                
                <div className="w-full shadow-md hover:shadow-lg transition-all duration-300 border-4 border-black bg-white rounded-lg">
                  <div className="p-3">
                    <div className="flex justify-between items-center mb-1 border-b-2 border-black pb-1">
                      <h3 className="text-base font-bold text-black">{event.title}</h3>
                      <p className="text-xs bg-[#FFECB3] text-black px-1 py-0.5 rounded border-2 border-black">{event.date}</p>
                    </div>
                    <p className="text-black text-xs mt-2">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="mt-4 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-sm text-black font-medium">
            Dan ini hanya awal dari perjalanan cinta kita...
          </p>
          <div className="inline-block mt-2 animate-float">
            <FaHeart className="text-[#FF80AB] mx-auto" size={24} />
          </div>
        </motion.div>
        
        {/* Tombol kembali - yang juga responsif */}
        <motion.div 
          className="mt-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
        </motion.div>
      </div>
    </div>
  );
};

export default Timeline; 