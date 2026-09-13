// packages/web-app/src/components/chat/MiniProfile.tsx
import React from 'react';
import { motion } from 'motion/react';
import { X, Clock, Image as ImageIcon, Link2, ShieldCheck, MapPin, Search } from 'lucide-react';

export interface MiniProfileProps {
  isOpen: boolean;
  onClose: () => void;
  contactName: string;
  avatarUrl: string;
  platform: string;
}

export const MiniProfile: React.FC<MiniProfileProps> = ({ isOpen, onClose, contactName, avatarUrl, platform }) => {
  if (!isOpen) return null;

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40"
      />
      <motion.div 
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute right-0 top-0 bottom-0 w-full md:w-[380px] bg-white dark:bg-[#09090b] shadow-2xl z-50 border-l border-zinc-200 dark:border-zinc-800 flex flex-col overflow-y-auto"
      >
        <div className="p-4 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/60 sticky top-0 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-xl z-10">
          <h2 className="text-[15px] font-bold text-zinc-900 dark:text-zinc-50">Contact Info</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        </div>

        <div className="flex flex-col items-center pt-8 pb-6 border-b border-zinc-100 dark:border-zinc-800/60">
          <img src={avatarUrl} alt={contactName} className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white dark:border-zinc-900" />
          <h1 className="mt-4 text-xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">{contactName}</h1>
          <div className="mt-1 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[11px] font-bold uppercase tracking-wider">
            Connected via {platform}
          </div>
        </div>

        <div className="p-4 space-y-2 border-b border-zinc-100 dark:border-zinc-800/60">
          <button className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-[#121214] transition-colors group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400"><Clock className="w-4 h-4" /></div>
              <span className="text-[14px] font-bold text-zinc-700 dark:text-zinc-300">Disappearing Messages</span>
            </div>
            <span className="text-[12px] font-bold text-zinc-400 group-hover:text-blue-500 transition-colors">Off</span>
          </button>
          
          <button className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-[#121214] transition-colors group">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"><ShieldCheck className="w-4 h-4" /></div>
              <span className="text-[14px] font-bold text-zinc-700 dark:text-zinc-300">Encryption Verification</span>
            </div>
          </button>
        </div>

        <div className="p-4 border-b border-zinc-100 dark:border-zinc-800/60">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-[13px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Connected Apps</h3>
          </div>
          <div className="flex gap-3 px-2 overflow-x-auto pb-2">
            <div className="flex flex-col items-center gap-2 min-w-[64px]">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/20 flex items-center justify-center text-[#25D366]"><Link2 className="w-5 h-5" /></div>
              <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400">WhatsApp</span>
            </div>
            <div className="flex flex-col items-center gap-2 min-w-[64px]">
              <div className="w-12 h-12 rounded-2xl bg-[#0088cc]/20 flex items-center justify-center text-[#0088cc]"><Link2 className="w-5 h-5" /></div>
              <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400">Telegram</span>
            </div>
          </div>
        </div>

        <div className="p-4 flex-1">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-[13px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Shared Media</h3>
            <button className="text-[12px] font-bold text-violet-500">See All</button>
          </div>
          <div className="grid grid-cols-3 gap-2 px-2">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="aspect-square rounded-xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-zinc-400 dark:text-zinc-600" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};
