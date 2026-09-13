// packages/web-app/src/components/chat/MessageBubble.tsx
import React, { useState, useRef } from 'react';
import { Reply, SplitSquareHorizontal, Sparkles, CheckCheck, Check, Copy, Trash2, Flag, Languages, MapPin, Play, Pause, FileAudio } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage } from '../../types/ui';
import { SecurityNudgeBubble } from './SecurityNudgeBubble';
import { QRActionPill } from './QRActionPill';

export interface MessageBubbleProps {
  message: ChatMessage;
  onReply: (id: string) => void;
  onBranchSideThread: (id: string) => void;
  onForwardToAssistant: (id: string) => void;
  onMessageAction?: (action: 'copy' | 'delete' | 'report', id: string) => void;
  onTranslate?: (id: string) => void;
  searchQuery?: string;
  children?: React.ReactNode;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  onReply,
  onBranchSideThread,
  onForwardToAssistant,
  onMessageAction,
  onTranslate,
  searchQuery,
  children
}) => {
  if (message.mediaType === 'security_nudge' || message.mediaType === 'duress_setup') {
    return (
      <SecurityNudgeBubble 
        type={message.nudgeData?.type || 'security'}
        title={message.nudgeData?.title || 'System Alert'}
        description={message.nudgeData?.description || ''}
        actionLabel={message.nudgeData?.actionLabel || 'View'}
        onAction={() => console.log('Action Nudge')}
      />
    );
  }

  const isMe = message.isMe;
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscription, setShowTranscription] = useState(false);
  const pressTimer = useRef<NodeJS.Timeout | null>(null);

  const handlePressStart = () => {
    pressTimer.current = setTimeout(() => {
      setShowContextMenu(true);
      if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(50);
      }
    }, 500);
  };

  const handlePressEnd = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  const handleAction = (action: 'copy' | 'delete' | 'report') => {
    onMessageAction?.(action, message.id);
    setShowContextMenu(false);
  };

  const renderTextWithHighlights = (text: string, query?: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() 
        ? <mark key={i} className="bg-amber-300 dark:bg-amber-500/50 text-inherit rounded-sm px-0.5">{part}</mark> 
        : part
    );
  };

  return (
    <div 
      data-component="MessageBubble" 
      className={`group flex flex-col w-full px-3 sm:px-6 py-1.5 sm:py-2 ${isMe ? 'items-end' : 'items-start'}`}
    >
      <div className={`relative flex items-end gap-2 max-w-[90%] md:max-w-[70%] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Bubble */}
        <motion.div 
          whileTap={{ scale: 0.98 }}
          onTouchStart={handlePressStart}
          onTouchEnd={handlePressEnd}
          onTouchMove={handlePressEnd}
          onMouseDown={handlePressStart}
          onMouseUp={handlePressEnd}
          onMouseLeave={handlePressEnd}
          onContextMenu={(e) => { e.preventDefault(); setShowContextMenu(true); }}
          className={`relative px-4 sm:px-5 py-2.5 sm:py-3.5 text-[14px] sm:text-[15px] leading-relaxed break-words shadow-sm transition-all select-none sm:select-auto ${
            message.mediaType === 'sticker'
              ? 'bg-transparent shadow-none border-none'
              : isMe 
                ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-3xl rounded-br-sm' 
                : 'bg-white dark:bg-[#1a1a1c] text-zinc-800 dark:text-zinc-100 border border-zinc-100 dark:border-zinc-800/60 rounded-3xl rounded-bl-sm'
          }`}
        >
          {/* Action Tray (Hover) */}
          <div className={`absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 flex items-center gap-0.5 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm shadow-md border border-zinc-200 dark:border-zinc-700/50 rounded-full px-1.5 py-1 z-10 transition-all duration-200 ${
            isMe ? 'right-full mr-1 -translate-x-2 group-hover:translate-x-0' : 'left-full ml-1 translate-x-2 group-hover:translate-x-0'
          }`}>
            <button onClick={() => onReply(message.id)} className="p-1 sm:p-1.5 text-zinc-500 hover:text-violet-600 dark:text-zinc-400 dark:hover:text-violet-400 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
              <Reply className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button onClick={() => onBranchSideThread(message.id)} className="p-1 sm:p-1.5 text-zinc-500 hover:text-violet-600 dark:text-zinc-400 dark:hover:text-violet-400 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
              <SplitSquareHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button onClick={() => onForwardToAssistant(message.id)} className="p-1 sm:p-1.5 text-zinc-500 hover:text-amber-500 dark:text-zinc-400 dark:hover:text-amber-400 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {message.mediaType === 'audio' && (
            <div className="flex flex-col gap-2 min-w-[200px] sm:min-w-[240px]">
              <div className="flex items-center gap-3">
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
                  className={`p-2.5 rounded-full flex shrink-0 items-center justify-center transition-colors ${
                    isMe 
                      ? 'bg-white/20 hover:bg-white/30 text-white' 
                      : 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 hover:bg-violet-200 dark:hover:bg-violet-900/50'
                  }`}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>
                <div className="flex-1 flex items-center gap-0.5 h-6">
                  {/* Mock Waveform Generator */}
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-1 rounded-full ${isMe ? 'bg-white/60' : 'bg-zinc-300 dark:bg-zinc-600'}`} 
                      style={{ 
                        height: `${Math.max(20, Math.sin(i * 0.5) * 100)}%`,
                        opacity: isPlaying && i % 3 === 0 ? 0.5 : 1
                      }} 
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className={`text-[11px] font-bold ${isMe ? 'text-white/70' : 'text-zinc-500'}`}>{message.audioDuration || '0:00'}</span>
                {message.transcription && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); setShowTranscription(!showTranscription); }}
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md transition-colors ${
                      isMe 
                        ? 'bg-white/20 hover:bg-white/30 text-white' 
                        : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    {showTranscription ? 'Hide Text' : 'Transcribe'}
                  </button>
                )}
              </div>
              
              <AnimatePresence>
                {showTranscription && message.transcription && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className={`mt-2 pt-2 border-t ${isMe ? 'border-white/20' : 'border-zinc-200 dark:border-zinc-700'} text-[13px] font-medium opacity-90 leading-relaxed`}>
                      <div className={`flex items-center gap-1 text-[10px] font-bold mb-1 uppercase tracking-wider ${isMe ? 'text-white/70' : 'text-violet-600 dark:text-violet-400'}`}>
                        <FileAudio className="w-3 h-3" /> Local NPU Transcription
                      </div>
                      {message.transcription}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {message.text && message.mediaType !== 'sticker' && (
            <div className="prose dark:prose-invert prose-sm max-w-none font-medium">
              {renderTextWithHighlights(message.text, searchQuery)}
            </div>
          )}

          {message.mediaType === 'image' && (
            <div className="relative -mx-2 -my-2 sm:-mx-3 sm:-my-3 overflow-hidden rounded-[14px]">
              <img src={message.stickerUrl || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=400&h=300&auto=format&fit=crop"} alt="Attachment" className="w-full max-w-sm h-auto object-cover" />
              {message.qrPayload && (
                <div className="absolute inset-x-2 bottom-3 flex justify-center z-10 drop-shadow-md">
                  <QRActionPill 
                    qr={message.qrPayload} 
                    onExecuteAction={(qr) => console.log('execute qr', qr)} 
                    onCopy={(data) => console.log('copy', data)} 
                  />
                </div>
              )}
            </div>
          )}
          
          {message.mediaType === 'sticker' && message.stickerUrl && (
            <div className="-mx-2 -my-1">
              <img src={message.stickerUrl} alt="Sticker" className="w-40 h-40 object-contain drop-shadow-xl select-none pointer-events-none" />
            </div>
          )}

          {message.detectedLanguage && !message.translation && (
            <button 
              onClick={(e) => { e.stopPropagation(); onTranslate?.(message.id); }}
              className={`flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors ${
                isMe 
                  ? 'bg-white/20 text-white hover:bg-white/30' 
                  : 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-900/50'
              }`}
            >
              <Languages className="w-3 h-3" /> Live Translate ({message.detectedLanguage.toUpperCase()})
            </button>
          )}

          {message.translation && (
            <div className={`mt-2 pt-2 border-t ${isMe ? 'border-white/20' : 'border-zinc-200 dark:border-zinc-700'} text-[13px] sm:text-[14px] font-medium opacity-90`}>
              <div className={`flex items-center gap-1 text-[10px] font-bold mb-1 uppercase tracking-wider ${isMe ? 'text-white/70' : 'text-violet-600 dark:text-violet-400'}`}>
                <Sparkles className="w-3 h-3" /> Aura Translation
              </div>
              {message.translation}
            </div>
          )}

          {children && (
            <div className={message.text ? 'mt-2 sm:mt-3' : ''}>
              {children}
            </div>
          )}

          {/* Context Menu Overlay */}
          <AnimatePresence>
            {showContextMenu && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40" 
                  onClick={(e) => { e.stopPropagation(); setShowContextMenu(false); }}
                  onTouchStart={(e) => { e.stopPropagation(); setShowContextMenu(false); }}
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  className={`absolute top-full mt-2 z-50 w-40 sm:w-48 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 rounded-2xl shadow-xl overflow-hidden ${isMe ? 'right-0 origin-top-right' : 'left-0 origin-top-left'}`}
                >
                  <button onClick={() => handleAction('copy')} className="w-full flex items-center gap-3 px-3 py-2.5 sm:px-4 sm:py-3 text-[13px] sm:text-[14px] font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors">
                    <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Copy Text
                  </button>
                  <button onClick={() => handleAction('report')} className="w-full flex items-center gap-3 px-3 py-2.5 sm:px-4 sm:py-3 text-[13px] sm:text-[14px] font-bold text-amber-600 dark:text-amber-500 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors">
                    <Flag className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Report Issue
                  </button>
                  <div className="h-px bg-zinc-200 dark:bg-zinc-700/50 mx-2" />
                  <button onClick={() => handleAction('delete')} className="w-full flex items-center gap-3 px-3 py-2.5 sm:px-4 sm:py-3 text-[13px] sm:text-[14px] font-bold text-rose-600 dark:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors">
                    <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Delete
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Floating Metadata */}
        <div className={`flex items-center gap-1 mb-1 text-[10px] sm:text-[11px] font-medium select-none text-zinc-400 dark:text-zinc-500 flex-shrink-0`}>
          <span>{message.timestamp}</span>
          {isMe && (
            <>
              {message.status === 'sent' && <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
              {message.status === 'delivered' && <CheckCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
              {message.status === 'read' && <CheckCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-500 dark:text-blue-400" />}
              {!message.status && <CheckCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-violet-500 dark:text-violet-400" />}
            </>
          )}
        </div>

      </div>
    </div>
  );
};
