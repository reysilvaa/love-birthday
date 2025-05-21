import { useRef, useEffect } from 'react';

// Hook untuk efek suara klik
export const useClickSound = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
    }
  };

  // Menambahkan event listener global untuk semua klik
  useEffect(() => {
    const handleClick = () => {
      playSound();
    };

    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return { audioRef };
};

// Hook untuk musik latar belakang
export const useBackgroundMusic = () => {
  const musicRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = 0.5; // Set volume ke 50%
      musicRef.current.play().catch(error => {
        console.error("Background music playback failed:", error);
        
        // Menambahkan event listener untuk memutar musik setelah interaksi pengguna
        const playMusicAfterInteraction = () => {
          musicRef.current?.play().catch(e => console.error("Still failed:", e));
          document.removeEventListener('click', playMusicAfterInteraction);
        };
        document.addEventListener('click', playMusicAfterInteraction);
      });
    }
    
    return () => {
      if (musicRef.current) {
        musicRef.current.pause();
      }
    };
  }, []);

  return { musicRef };
}; 