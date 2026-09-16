import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, PhoneOff, Video, VideoOff, Mic, MicOff, MessageCircle } from 'lucide-react';

export interface CallModalProps {
  isOpen: boolean;
  type: 'audio' | 'video';
  contactName: string;
  avatarUrl: string;
  onClose: () => void;
}

export const CallModal: React.FC<CallModalProps> = ({ isOpen, type, contactName, avatarUrl, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        className="w-full max-w-sm aspect-[9/16] bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col relative border border-white/10"
      >
        {/* Background / Video Feed Mock */}
        {type === 'video' ? (
          <div className="absolute inset-0 bg-zinc-800">
            {/* Mock local video picture-in-picture */}
            <div className="absolute top-4 right-4 w-24 h-36 bg-zinc-700 rounded-xl border-2 border-zinc-600/50 overflow-hidden shadow-lg" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 to-zinc-900" />
        )}

        <div className="relative z-10 flex flex-col items-center justify-center flex-1 pt-12">
          {type === 'audio' && (
            <div className="relative mb-8">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-blue-500 rounded-full blur-xl"
              />
              <img src={avatarUrl} alt={contactName} className="w-32 h-32 rounded-full border-4 border-zinc-800 relative z-10 object-cover shadow-2xl" />
            </div>
          )}
          
          <h2 className="text-2xl font-bold text-white mb-2">{contactName}</h2>
          <p className="text-zinc-400 font-medium">
            {type === 'video' ? 'Calling...' : 'Ringing...'}
          </p>
        </div>

        <div className="relative z-10 pb-12 pt-6 px-8 flex justify-center gap-6 bg-gradient-to-t from-black/80 to-transparent">
          <button className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center text-white transition-colors">
            <MicOff className="w-6 h-6" />
          </button>
          {type === 'video' && (
             <button className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center text-white transition-colors">
               <VideoOff className="w-6 h-6" />
             </button>
          )}
          <button className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center text-white transition-colors">
            <MessageCircle className="w-6 h-6" />
          </button>
          <button onClick={onClose} className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white transition-colors shadow-lg shadow-red-500/20">
            <PhoneOff className="w-6 h-6" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
