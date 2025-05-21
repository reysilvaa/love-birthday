import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
    <div className="w-full max-w-xl mx-auto mb-8">
      <div className="relative speech-bubble transform bg-white p-6 rounded-3xl border-4 border-primary-800">
        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-r-4 border-b-4 border-primary-800 rotate-45"></div>
        
        <h2 className="text-xl sm:text-2xl font-bangers text-center text-[hsl(var(--primary-600))] mb-4">
          Countdown to Your Day!
        </h2>
        
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {/* Days */}
          <motion.div 
            className="comic-border bg-[hsl(var(--comic-yellow))] p-2 sm:p-4 rounded-xl flex flex-col items-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <span className="text-2xl sm:text-4xl font-bangers text-white comic-shadow">
              {timeLeft.days}
            </span>
            <span className="text-xs sm:text-sm font-comic text-white">DAYS</span>
          </motion.div>
          
          {/* Hours */}
          <motion.div 
            className="comic-border bg-[hsl(var(--love))] p-2 sm:p-4 rounded-xl flex flex-col items-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <span className="text-2xl sm:text-4xl font-bangers text-white comic-shadow">
              {timeLeft.hours}
            </span>
            <span className="text-xs sm:text-sm font-comic text-white">HOURS</span>
          </motion.div>
          
          {/* Minutes */}
          <motion.div 
            className="comic-border bg-[hsl(var(--primary-600))] p-2 sm:p-4 rounded-xl flex flex-col items-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <span className="text-2xl sm:text-4xl font-bangers text-white comic-shadow">
              {timeLeft.minutes}
            </span>
            <span className="text-xs sm:text-sm font-comic text-white">MINS</span>
          </motion.div>
          
          {/* Seconds */}
          <motion.div 
            className="comic-border bg-[hsl(var(--comic-purple))] p-2 sm:p-4 rounded-xl flex flex-col items-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <span className="text-2xl sm:text-4xl font-bangers text-white comic-shadow">
              {timeLeft.seconds}
            </span>
            <span className="text-xs sm:text-sm font-comic text-white">SECS</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
