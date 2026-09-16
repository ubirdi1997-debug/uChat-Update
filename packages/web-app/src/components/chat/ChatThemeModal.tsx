import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, X, Check } from 'lucide-react';

export interface ChatThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTheme: (theme: string) => void;
  currentTheme: string;
}

export const ChatThemeModal: React.FC<ChatThemeModalProps> = ({ isOpen, onClose, onSelectTheme, currentTheme }) => {
  if (!isOpen) return null;

  const themes = [
    { id: 'default', name: 'uChat Default', color: 'bg-app-bg', ring: 'ring-zinc-500' },
    { id: 'midnight', name: 'Midnight Blue', color: 'bg-slate-900', ring: 'ring-slate-500' },
    { id: 'forest', name: 'Deep Forest', color: 'bg-emerald-950', ring: 'ring-emerald-500' },
    { id: 'sunset', name: 'Sunset Dim', color: 'bg-orange-950', ring: 'ring-orange-500' },
    { id: 'oled', name: 'OLED Black', color: 'bg-black', ring: 'ring-white/50' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-sm bg-app-bg border border-app-border rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="p-4 border-b border-app-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-violet-500" />
            <h2 className="font-bold text-app-text">Chat Theme</h2>
          </div>
          <button onClick={onClose} className="p-2 text-app-text-muted hover:text-app-text hover:bg-app-surface-hover rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 grid grid-cols-5 gap-3">
          {themes.map(t => (
            <div key={t.id} className="flex flex-col items-center gap-2">
              <button
                onClick={() => onSelectTheme(t.id)}
                className={`w-12 h-12 rounded-full shadow-inner ${t.color} border border-app-border flex items-center justify-center transition-all ${currentTheme === t.id ? `ring-2 ring-offset-2 ring-offset-app-bg ${t.ring}` : 'hover:scale-110'}`}
              >
                {currentTheme === t.id && <Check className="w-5 h-5 text-white mix-blend-difference" />}
              </button>
              <span className="text-[9px] font-bold text-app-text-muted text-center leading-tight">{t.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
