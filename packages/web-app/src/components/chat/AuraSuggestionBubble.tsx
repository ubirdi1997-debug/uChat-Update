import React from 'react';
import { Sparkles, Calendar, Mail, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export interface AuraSuggestionBubbleProps {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}

export const AuraSuggestionBubble: React.FC<AuraSuggestionBubbleProps> = ({
  title, description, actionLabel, onAction
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="flex justify-center my-4 px-4 w-full"
    >
      <div className="flex flex-col items-center gap-3 p-4 rounded-3xl border border-violet-500/30 bg-violet-500/10 text-violet-900 dark:text-violet-100 backdrop-blur-md max-w-sm w-full text-center shadow-sm">
        <div className="p-2 rounded-full bg-white/20 dark:bg-black/20 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-violet-500 dark:text-violet-400" />
        </div>
        <div>
          <h4 className="text-[14px] font-bold tracking-tight mb-1">{title}</h4>
          <p className="text-[12px] opacity-80 leading-relaxed font-medium px-2">{description}</p>
        </div>
        
        <div className="flex gap-2 justify-center w-full mt-2">
           <div className="flex items-center gap-1 text-[10px] bg-white/40 dark:bg-black/40 px-2 py-1 rounded-md font-semibold">
             <Calendar className="w-3 h-3" /> Todos
           </div>
           <div className="flex items-center gap-1 text-[10px] bg-white/40 dark:bg-black/40 px-2 py-1 rounded-md font-semibold">
             <Mail className="w-3 h-3" /> Emails
           </div>
           <div className="flex items-center gap-1 text-[10px] bg-white/40 dark:bg-black/40 px-2 py-1 rounded-md font-semibold">
             <CheckCircle2 className="w-3 h-3" /> Summary
           </div>
        </div>

        <button 
          onClick={onAction}
          className="mt-2 flex items-center gap-1.5 px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-700 transition-colors text-white text-[12px] font-bold tracking-wide shadow-md shadow-violet-900/20"
        >
          {actionLabel} <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};
