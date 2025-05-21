'use client';

import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';

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
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <div className="max-w-4xl w-full px-4">
        <motion.h2 
          className="text-3xl font-bold text-primary-800 text-center mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Perjalanan Cinta Kita
        </motion.h2>
        
        <div className="relative max-h-[60vh] overflow-y-auto pr-2 pb-4 timeline-container">
          {/* Garis Timeline */}
          <div className="absolute left-14 top-0 bottom-0 w-0.5 bg-primary-200" />
          
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
                  <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center z-10 ml-[0.45rem]">
                    <FaHeart className="text-love-dark text-sm" />
                  </div>
                </div>
                
                <Card className="w-full shadow-sm hover:shadow-md transition-all duration-300 border-primary-200 bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-base font-bold text-primary-700">{event.title}</h3>
                      <p className="text-xs text-primary-500">{event.date}</p>
                    </div>
                    <p className="text-gray-700 text-xs">{event.description}</p>
                  </CardContent>
                </Card>
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
          <p className="text-sm text-primary-600 font-medium">
            Dan ini hanya awal dari perjalanan cinta kita...
          </p>
          <div className="inline-block mt-2 animate-float">
            <FaHeart className="text-love-dark mx-auto" size={24} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Timeline; 