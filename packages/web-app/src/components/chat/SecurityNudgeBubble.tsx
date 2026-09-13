// packages/web-app/src/components/chat/SecurityNudgeBubble.tsx
import React from 'react';
import { ShieldAlert, Lock, AlertTriangle, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export interface SecurityNudgeBubbleProps {
  type: 'privacy' | 'security' | 'duress';
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}

export const SecurityNudgeBubble: React.FC<SecurityNudgeBubbleProps> = ({
  type, title, description, actionLabel, onAction
}) => {
  const getIcon = () => {
    switch (type) {
      case 'privacy': return <Lock className="w-5 h-5 text-indigo-400" />;
      case 'duress': return <AlertTriangle className="w-5 h-5 text-rose-400" />;
      case 'security': default: return <ShieldAlert className="w-5 h-5 text-amber-400" />;
    }
  };

  const getColorClass = () => {
    switch (type) {
      case 'privacy': return 'border-indigo-500/30 bg-indigo-500/10 text-indigo-900 dark:text-indigo-100';
      case 'duress': return 'border-rose-500/30 bg-rose-500/10 text-rose-900 dark:text-rose-100';
      case 'security': default: return 'border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-100';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="flex justify-center my-4 px-4 w-full"
    >
      <div className={`flex flex-col items-center gap-3 p-4 rounded-3xl border backdrop-blur-md max-w-sm w-full text-center shadow-sm ${getColorClass()}`}>
        <div className="p-2 rounded-full bg-white/20 dark:bg-black/20">
          {getIcon()}
        </div>
        <div>
          <h4 className="text-[14px] font-bold tracking-tight mb-1">{title}</h4>
          <p className="text-[12px] opacity-80 leading-relaxed font-medium px-2">{description}</p>
        </div>
        <button 
          onClick={onAction}
          className="mt-1 flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/50 dark:bg-black/30 hover:bg-white/70 dark:hover:bg-black/50 transition-colors text-[12px] font-bold tracking-wide"
        >
          {actionLabel} <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};
