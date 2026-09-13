import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Camera, Upload, Wand2, Check, Scissors } from 'lucide-react';

export interface StickerStudioProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (stickerUrl: string) => void;
}

export const StickerStudio: React.FC<StickerStudioProps> = ({ isOpen, onClose, onSave }) => {
  const [step, setStep] = useState<'capture' | 'edit'>('capture');
  const [activeFilter, setActiveFilter] = useState('none');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: '100%' }} 
        animate={{ y: 0 }} 
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-[100] bg-[#09090b] flex flex-col"
      >
         <div className="p-4 flex items-center justify-between border-b border-zinc-800">
           <button onClick={onClose} className="p-2 text-white hover:bg-zinc-800 rounded-full transition-colors">
             <X className="w-6 h-6" />
           </button>
           <h2 className="text-white font-bold text-lg">Sticker Studio</h2>
           <button className="p-2 text-violet-400 font-bold hover:text-violet-300 transition-colors" onClick={onClose}>Done</button>
         </div>
         
         <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-zinc-900/50">
           {/* Placeholder for the camera or image */}
           <div className={`w-full h-full flex items-center justify-center transition-all duration-300 ${
             activeFilter === 'grayscale' ? 'grayscale' : 
             activeFilter === 'sepia' ? 'sepia' : 
             activeFilter === 'contrast' ? 'contrast-150' : 
             activeFilter === 'blur' ? 'blur-sm' : ''
           }`}>
               <div className="w-64 h-64 rounded-[3rem] border-4 border-dashed border-zinc-700/50 flex flex-col items-center justify-center text-zinc-500 bg-zinc-800/20">
                   <Camera className="w-12 h-12 mb-3 text-zinc-600" />
                   <span className="font-bold tracking-tight">Capture or Upload</span>
               </div>
           </div>
           
           {/* AI Cutout outline mock */}
           {step === 'edit' && (
             <motion.div 
               initial={{ opacity: 0, scale: 1.1 }}
               animate={{ opacity: 1, scale: 1 }}
               className="absolute inset-0 pointer-events-none flex items-center justify-center"
             >
                <div className="w-64 h-64 rounded-[3rem] border-4 border-violet-500 shadow-[0_0_30px_rgba(139,92,246,0.3)] animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-36 bg-violet-500 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Scissors className="w-3 h-3" /> Auto-Cutout Applied
                </div>
             </motion.div>
           )}
         </div>
         
         <div className="h-56 bg-zinc-950 p-4 flex flex-col gap-4 border-t border-zinc-800">
           {step === 'capture' ? (
             <div className="flex items-center justify-evenly h-full max-w-md mx-auto w-full">
               <button className="flex flex-col items-center gap-2 text-zinc-400 hover:text-white transition-colors group">
                 <div className="p-4 bg-zinc-800/80 group-hover:bg-zinc-700 rounded-full"><Upload className="w-6 h-6" /></div>
                 <span className="text-[11px] font-bold tracking-wider uppercase">Gallery</span>
               </button>
               <button onClick={() => setStep('edit')} className="p-6 bg-white hover:bg-zinc-200 rounded-full border-4 border-zinc-700 transition-all transform hover:scale-105 active:scale-95 shadow-xl">
                 <Camera className="w-8 h-8 text-black" />
               </button>
               <button className="flex flex-col items-center gap-2 text-zinc-400 hover:text-white transition-colors group">
                 <div className="p-4 bg-zinc-800/80 group-hover:bg-zinc-700 rounded-full"><Wand2 className="w-6 h-6" /></div>
                 <span className="text-[11px] font-bold tracking-wider uppercase">Magic</span>
               </button>
             </div>
           ) : (
             <div className="flex flex-col h-full justify-between max-w-md mx-auto w-full">
               <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                 {['none', 'grayscale', 'sepia', 'contrast', 'blur'].map(f => (
                   <button 
                     key={f} 
                     onClick={() => setActiveFilter(f)}
                     className={`px-4 py-2.5 rounded-2xl text-[12px] font-bold capitalize whitespace-nowrap transition-all ${activeFilter === f ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/20' : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'}`}
                   >
                     {f}
                   </button>
                 ))}
               </div>
               <div className="flex justify-between items-center mt-auto">
                  <button onClick={() => setStep('capture')} className="px-6 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-[13px] transition-colors">Retake</button>
                  <button 
                    onClick={() => {
                      if (onSave) {
                        onSave(`https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Star-Struck.png`);
                      }
                      onClose();
                    }} 
                    className="px-6 py-3.5 rounded-full bg-violet-600 hover:bg-violet-700 flex items-center gap-2 text-white font-bold text-[13px] shadow-lg shadow-violet-900/20 transition-all transform hover:scale-105 active:scale-95"
                  >
                    <Check className="w-4 h-4" /> Save & Send
                  </button>
               </div>
             </div>
           )}
         </div>
      </motion.div>
    </AnimatePresence>
  );
};
