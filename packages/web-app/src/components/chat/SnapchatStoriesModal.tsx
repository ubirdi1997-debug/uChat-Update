import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Ghost, MapPin, ChevronRight, ChevronLeft } from 'lucide-react';

export interface SnapchatStoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MOCK_STORIES = [
  { id: '1', name: 'Jake', distance: '0.2 mi away', time: '10m ago', url: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=400&q=80', color: 'bg-orange-500' },
  { id: '2', name: 'Sarah', distance: '1.1 mi away', time: '1h ago', url: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&q=80', color: 'bg-blue-500' },
  { id: '3', name: 'Downtown Fest', distance: '2.5 mi away', time: '3h ago', url: 'https://images.unsplash.com/photo-1533174000273-11c0965d3361?w=400&q=80', color: 'bg-purple-500' },
  { id: '4', name: 'Coffee Shop', distance: '0.5 mi away', time: '5m ago', url: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&q=80', color: 'bg-amber-700' },
];

export const SnapchatStoriesModal: React.FC<SnapchatStoriesModalProps> = ({ isOpen, onClose }) => {
  const [activeStory, setActiveStory] = useState(0);

  // Auto advance stories
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setActiveStory((prev) => (prev + 1 >= MOCK_STORIES.length ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [isOpen, activeStory]);

  if (!isOpen) return null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveStory((prev) => (prev + 1 >= MOCK_STORIES.length ? 0 : prev + 1));
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveStory((prev) => (prev - 1 < 0 ? MOCK_STORIES.length - 1 : prev - 1));
  };

  const story = MOCK_STORIES[activeStory];

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 z-[110] bg-black flex flex-col sm:p-4"
      >
        <div className="relative w-full h-full sm:max-w-md sm:mx-auto sm:rounded-[2rem] overflow-hidden bg-zinc-900 shadow-2xl">
          {/* Progress Bars */}
          <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 p-3 pt-4 sm:pt-6">
            {MOCK_STORIES.map((_, i) => (
              <div key={i} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                {i === activeStory && (
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: '100%' }} 
                    transition={{ duration: 4, ease: 'linear' }}
                    className="h-full bg-white" 
                  />
                )}
                {i < activeStory && <div className="h-full bg-white" />}
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="absolute top-6 left-0 right-0 z-20 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center border-2 border-white shadow-lg">
                <Ghost className="w-5 h-5 text-black" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm drop-shadow-md">{story.name}</h3>
                <p className="text-white/90 text-xs font-medium flex items-center gap-1 drop-shadow-md">
                  <MapPin className="w-3 h-3" /> {story.distance} • {story.time}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 bg-black/40 text-white rounded-full backdrop-blur-md hover:bg-black/60 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Image */}
          <motion.img 
            key={activeStory}
            initial={{ opacity: 0.5, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            src={story.url} 
            alt="Story" 
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 z-10 pointer-events-none" />

          {/* Tap Zones */}
          <div className="absolute inset-0 z-10 flex">
            <div className="w-1/3 h-full cursor-pointer" onClick={handlePrev} />
            <div className="w-2/3 h-full cursor-pointer" onClick={handleNext} />
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-6 left-0 right-0 z-20 px-6 flex flex-col items-center">
            <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-400 text-black font-bold text-sm hover:scale-105 active:scale-95 transition-transform shadow-lg">
              <Ghost className="w-4 h-4" /> Reply to Snap
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
