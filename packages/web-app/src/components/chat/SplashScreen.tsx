import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Infinity } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [tagline, setTagline] = useState('');

  useEffect(() => {
    setTagline(Math.random() > 0.5 ? 'Beyond Social' : 'Sync Everything');

    const subtitleTimer = setTimeout(() => {
      setShowSubtitle(true);
    }, 800);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearTimeout(subtitleTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-app-bg flex flex-col items-center justify-center text-app-text"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1],
                type: "tween" 
              }}
              className="flex items-center gap-3 text-violet-500"
            >
              <Infinity className="w-16 h-16 sm:w-20 sm:h-20 stroke-[2.5]" />
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-app-text">
                uSafe
              </h1>
            </motion.div>

            <motion.div className="h-6 overflow-hidden flex items-center justify-center">
              <AnimatePresence>
                {showSubtitle && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="overflow-hidden whitespace-nowrap flex items-center"
                  >
                    <p className="text-sm sm:text-base font-medium tracking-[0.2em] uppercase text-zinc-500 dark:text-zinc-400">
                      {tagline}
                    </p>
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      className="w-1.5 h-4 sm:h-5 bg-violet-500 ml-2"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
