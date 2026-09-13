// packages/web-app/src/components/chat/VoiceRecorderOverlay.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { Trash2, Send } from 'lucide-react';

export interface VoiceRecorderOverlayProps {
  onCancel: () => void;
  onSend: () => void;
}

export const VoiceRecorderOverlay: React.FC<VoiceRecorderOverlayProps> = ({ onCancel, onSend }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Pre-calculated wave heights for a consistent, aesthetic waveform
  const waveHeights = useMemo(() => [
    30, 50, 40, 80, 60, 40, 100, 70, 50, 90, 60, 40, 70, 40, 30
  ], []);

  return (
    <div 
      data-component="VoiceRecorderOverlay" 
      className="flex-1 flex items-center justify-between w-full h-full animate-in fade-in slide-in-from-right-4 duration-300 px-1 sm:px-2"
    >
      <button 
        data-action="cancel-recording"
        onClick={onCancel}
        className="p-2 text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors rounded-full hover:bg-rose-500/10 shrink-0"
        title="Cancel Recording"
      >
        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <div className="flex-1 flex items-center justify-center gap-3 sm:gap-6 px-2 min-w-0">
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-[13px] sm:text-[15px] font-bold text-zinc-800 dark:text-zinc-100 font-mono tracking-wider w-12 text-center">
            {formatTime(seconds)}
          </span>
        </div>
        
        {/* Animated Waveform */}
        <div className="hidden sm:flex items-center gap-1 h-6">
          {waveHeights.map((height, i) => (
            <div 
              key={i} 
              className="w-1 bg-violet-500 dark:bg-violet-400 rounded-full animate-waveform"
              style={{ 
                height: `${height}%`,
                animationDelay: `${i * 0.05}s` 
              }} 
            />
          ))}
        </div>
      </div>

      <button 
        data-action="send-recording"
        onClick={onSend}
        className="p-2 sm:p-2.5 rounded-full bg-violet-600 hover:bg-violet-700 text-white shadow-sm shadow-violet-500/20 transition-all transform hover:scale-105 active:scale-95 shrink-0"
        title="Send Audio"
      >
        <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </button>

      <style>{`
        @keyframes waveform {
          0%, 100% { transform: scaleY(0.4); opacity: 0.5; }
          50% { transform: scaleY(1); opacity: 1; }
        }
        .animate-waveform {
          animation: waveform 1.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
