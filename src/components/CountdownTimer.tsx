import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaClock } from 'react-icons/fa';

interface CountdownProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = ({ targetDate }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative border-4 border-black bg-white rounded-3xl p-6 shadow-lg transform hover:scale-[1.01] transition-transform">
        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-r-4 border-b-4 border-black rotate-45"></div>
        
        {/* Comic styled stars decorations */}
        <motion.div
          className="absolute -top-3 -right-3 text-[#FFD700] z-10"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FaStar size={24} />
        </motion.div>
        
        <motion.div
          className="absolute -top-2 -left-3 text-[#FF80AB] z-10"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <FaStar size={20} />
        </motion.div>
        
        <h2 className="text-xl sm:text-2xl font-bangers text-center text-black mb-4 flex items-center justify-center gap-2">
          <FaClock className="text-[#333]" />
          <span className="inline-block">Menunggu Hari Spesialmu!</span>
        </h2>
        
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {/* Days */}
          <motion.div 
            className="border-4 border-black bg-[#FFD8E6] p-2 sm:p-4 rounded-xl flex flex-col items-center shadow-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <span className="text-2xl sm:text-4xl font-bangers text-black">
              {timeLeft.days}
            </span>
            <span className="text-xs sm:text-sm font-comic text-black">HARI</span>
          </motion.div>
          
          {/* Hours */}
          <motion.div 
            className="border-4 border-black bg-[#FFECB3] p-2 sm:p-4 rounded-xl flex flex-col items-center shadow-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <span className="text-2xl sm:text-4xl font-bangers text-black">
              {timeLeft.hours}
            </span>
            <span className="text-xs sm:text-sm font-comic text-black">JAM</span>
          </motion.div>
          
          {/* Minutes */}
          <motion.div 
            className="border-4 border-black bg-[#C8E6C9] p-2 sm:p-4 rounded-xl flex flex-col items-center shadow-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <span className="text-2xl sm:text-4xl font-bangers text-black">
              {timeLeft.minutes}
            </span>
            <span className="text-xs sm:text-sm font-comic text-black">MENIT</span>
          </motion.div>
          
          {/* Seconds */}
          <motion.div 
            className="border-4 border-black bg-[#BBDEFB] p-2 sm:p-4 rounded-xl flex flex-col items-center shadow-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <span className="text-2xl sm:text-4xl font-bangers text-black">
              {timeLeft.seconds}
            </span>
            <span className="text-xs sm:text-sm font-comic text-black">DETIK</span>
          </motion.div>
        </div>
        
        {/* Sound effect text - classic comic style */}
        <motion.div
          className="absolute -bottom-10 right-4 transform rotate-12 bg-[#FF80AB] text-white font-bangers px-4 py-1 rounded-lg border-2 border-black"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", delay: 0.5 }}
        >
          <span>Tik! Tok!</span>
        </motion.div>
      </div>
    </div>
  );
};

export default CountdownTimer;
