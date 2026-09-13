// packages/web-app/src/components/cards/Gmail3DCard.tsx
import React, { useState } from 'react';
import { Mail, Sparkles, ShieldCheck, ShieldAlert, Copy, ExternalLink, MessageSquareReply, Reply } from 'lucide-react';
import { GmailCardData } from '../../types/ui';

export interface Gmail3DCardProps {
  data: GmailCardData;
  onOpenModal: () => void;
  onAutoReply: () => void;
  onManualReply: () => void;
  onCopyOtp: (otp: string) => void;
}

export const Gmail3DCard: React.FC<Gmail3DCardProps> = ({
  data,
  onOpenModal,
  onAutoReply,
  onManualReply,
  onCopyOtp
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div data-component="Gmail3DCard" className="w-full max-w-sm perspective-1000 my-2">
      <div 
        className={`relative w-full transition-transform duration-700 ease-in-out ${isFlipped ? 'rotate-y-180' : ''}`}
        style={{ transformStyle: 'preserve-3d', minHeight: '280px' }}
      >
        {/* Front Face */}
        <div 
          className="absolute inset-0 w-full h-full bg-white dark:bg-[#1a1a1c] border border-zinc-100 dark:border-zinc-800/60 rounded-3xl shadow-sm overflow-hidden flex flex-col"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Header */}
          <div 
            data-action="flip-card"
            onClick={() => setIsFlipped(true)}
            className="flex items-center gap-3 px-5 py-4 bg-zinc-50/50 dark:bg-zinc-900/30 border-b border-zinc-100 dark:border-zinc-800/60 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 dark:bg-rose-500/20 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[15px] font-bold text-zinc-900 dark:text-zinc-100 truncate tracking-tight">
                {data.senderEmail}
              </div>
              <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">
                {data.threadCount > 1 ? `${data.threadCount} messages` : 'Email via Gmail'}
              </div>
            </div>
          </div>

          {/* AI Summary Highlight */}
          <div className="px-5 py-3 bg-gradient-to-r from-amber-500/10 to-transparent border-b border-zinc-100 dark:border-zinc-800/60 shrink-0">
            <div className="flex items-center gap-1.5 mb-1.5 text-amber-600 dark:text-amber-500">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">AI Summary</span>
            </div>
            <p className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300 line-clamp-2 leading-relaxed">
              {data.aiSummary}
            </p>
          </div>

          {/* Body Preview or OTP */}
          <div className="px-5 py-4 flex-1 flex flex-col justify-center">
            <h3 className="text-[15px] font-bold text-zinc-900 dark:text-zinc-100 mb-2 line-clamp-1 tracking-tight">
              {data.subject}
            </h3>
            
            {data.detectedOtp ? (
              <div className="mt-2 flex flex-col items-center p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200/50 dark:border-zinc-800">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-bold mb-2">Detected Code</span>
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-mono tracking-widest font-bold text-zinc-900 dark:text-zinc-100">
                    {data.detectedOtp}
                  </span>
                  <button 
                    data-action="copy-otp"
                    onClick={() => onCopyOtp(data.detectedOtp!)}
                    className="p-2 text-violet-600 hover:text-violet-700 bg-violet-50 hover:bg-violet-100 dark:text-violet-400 dark:bg-violet-500/10 dark:hover:bg-violet-500/20 rounded-xl transition-colors"
                    title="Copy Code"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-[13px] text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                {data.snippet}
              </p>
            )}
          </div>

          {/* Action Tray */}
          <div className="flex items-center p-3 bg-zinc-50/50 dark:bg-zinc-900/30 border-t border-zinc-100 dark:border-zinc-800/60 gap-2 shrink-0">
            <button 
              data-action="open-full-email"
              onClick={onOpenModal}
              className="flex-1 flex justify-center items-center gap-2 py-2 text-[12px] font-bold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 rounded-xl transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View Full
            </button>
            <button 
              data-action="auto-reply"
              onClick={onAutoReply}
              className="flex-1 flex justify-center items-center gap-2 py-2 text-[12px] font-bold text-amber-700 hover:text-amber-800 bg-amber-500/10 hover:bg-amber-500/20 dark:text-amber-400 rounded-xl transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              AI Draft
            </button>
            <button 
              data-action="manual-reply"
              onClick={onManualReply}
              className="flex-1 flex justify-center items-center gap-2 py-2 text-[12px] font-bold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 rounded-xl transition-colors"
            >
              <Reply className="w-4 h-4" />
              Reply
            </button>
          </div>
        </div>

        {/* Back Face */}
        <div 
          className="absolute inset-0 w-full h-full bg-white dark:bg-[#1a1a1c] border border-zinc-100 dark:border-zinc-800/60 rounded-3xl shadow-sm overflow-hidden flex flex-col"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div 
            data-action="flip-card-back"
            onClick={() => setIsFlipped(false)}
            className="flex items-center gap-2 px-5 py-4 bg-zinc-50/50 dark:bg-zinc-900/30 border-b border-zinc-100 dark:border-zinc-800/60 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors shrink-0"
          >
            <MessageSquareReply className="w-5 h-5 text-zinc-400" />
            <span className="text-[15px] font-bold text-zinc-700 dark:text-zinc-300">Back to preview</span>
          </div>
          
          <div className="p-5 flex-1 flex flex-col justify-center">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-6">Security & Details</h4>
            
            <div className="space-y-6">
              <div>
                <div className="text-[12px] font-medium text-zinc-500 mb-1.5">From Address</div>
                <div className="text-[14px] font-bold text-zinc-900 dark:text-zinc-100 break-all">{data.senderEmail}</div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  {data.dkimVerified ? (
                    <div className="p-1.5 bg-emerald-500/10 rounded-lg"><ShieldCheck className="w-5 h-5 text-emerald-500" /></div>
                  ) : (
                    <div className="p-1.5 bg-rose-500/10 rounded-lg"><ShieldAlert className="w-5 h-5 text-rose-500" /></div>
                  )}
                  <span className="text-[14px] font-bold text-zinc-700 dark:text-zinc-300">DKIM</span>
                </div>
                <div className="flex items-center gap-2">
                  {data.spfVerified ? (
                    <div className="p-1.5 bg-emerald-500/10 rounded-lg"><ShieldCheck className="w-5 h-5 text-emerald-500" /></div>
                  ) : (
                    <div className="p-1.5 bg-rose-500/10 rounded-lg"><ShieldAlert className="w-5 h-5 text-rose-500" /></div>
                  )}
                  <span className="text-[14px] font-bold text-zinc-700 dark:text-zinc-300">SPF</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-zinc-50/50 dark:bg-zinc-900/30 border-t border-zinc-100 dark:border-zinc-800/60 shrink-0">
            <button 
              data-action="unsubscribe"
              className="w-full py-3 text-[13px] text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 font-bold transition-colors bg-rose-500/10 hover:bg-rose-500/20 rounded-xl"
            >
              Unsubscribe from sender
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};
