// packages/web-app/src/components/chat/QRActionPill.tsx
import React from 'react';
import { QrCode, Wifi, Copy, CreditCard, Shield } from 'lucide-react';
import { QRPayload } from '../../types/ui';

export interface QRActionPillProps {
  qr: QRPayload;
  onExecuteAction: (qr: QRPayload) => void;
  onCopy: (data: string) => void;
}

export const QRActionPill: React.FC<QRActionPillProps> = ({ qr, onExecuteAction, onCopy }) => {
  
  const getIcon = () => {
    switch (qr.type) {
      case 'upi': return <CreditCard className="w-4 h-4" />;
      case 'url': return <Shield className="w-4 h-4" />;
      case 'wifi': return <Wifi className="w-4 h-4" />;
      case 'text': default: return <QrCode className="w-4 h-4" />;
    }
  };

  const getColors = () => {
    switch (qr.type) {
      case 'upi': return 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30';
      case 'url': return 'bg-blue-500/10 text-blue-700 border-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30';
      case 'wifi': return 'bg-amber-500/10 text-amber-700 border-amber-500/20 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30';
      case 'text': default: return 'bg-zinc-500/10 text-zinc-700 border-zinc-500/20 dark:bg-zinc-500/20 dark:text-zinc-300 dark:border-zinc-500/30';
    }
  };

  return (
    <div 
      data-component="QRActionPill"
      className="inline-flex flex-col gap-1.5 items-center w-full"
    >
      <div className={`flex items-center gap-0 overflow-hidden rounded-2xl border shadow-lg backdrop-blur-md ${getColors()} w-full max-w-[240px]`}>
        <button 
          data-action="execute-qr"
          onClick={() => onExecuteAction(qr)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-[12px] sm:text-[13px] font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          {getIcon()}
          <span className="truncate">{qr.actionLabel}</span>
        </button>
        <div className="w-px h-6 bg-current opacity-20" />
        <button 
          data-action="copy-qr-data"
          onClick={() => onCopy(qr.rawData)}
          className="p-2.5 px-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors shrink-0"
          title="Copy raw data"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>
      {qr.title && (
        <span className="text-[10px] sm:text-[11px] bg-black/60 dark:bg-black/80 text-white px-2 py-0.5 rounded-full font-bold tracking-wide shadow-sm">
          {qr.title}
        </span>
      )}
    </div>
  );
};
