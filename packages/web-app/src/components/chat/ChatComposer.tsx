// packages/web-app/src/components/chat/ChatComposer.tsx
import React, { useState } from 'react';
import { Paperclip, Mic, Send, Zap, ChevronUp, Bot, FileText, CheckSquare, Clock, Smile, Sticker, Image as ImageIcon, Camera, File, MapPin, Contact, CreditCard, PlayCircle, Phone, MessageCircle, Mail, Shield, Plus, X } from 'lucide-react';
import { SourcePlatform } from '../../types/ui';
import { VoiceRecorderOverlay } from './VoiceRecorderOverlay';
import { motion, AnimatePresence } from 'motion/react';

export interface ChatComposerProps {
  platform: SourcePlatform;
  onSend: (text: string, platform: SourcePlatform, isSticker?: boolean, stickerUrl?: string) => void;
  onRecordAudio: () => void;
  onSelectSlashCommand: (cmd: string) => void;
  onOpenStickerStudio: () => void;
}

export const ChatComposer: React.FC<ChatComposerProps> = ({
  platform,
  onSend,
  onRecordAudio,
  onSelectSlashCommand,
  onOpenStickerStudio
}) => {
  const [text, setText] = useState('');
  const [showCommands, setShowCommands] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  const [showAttachments, setShowAttachments] = useState(false);
  const [showStickers, setShowStickers] = useState(false);
  const [showRouting, setShowRouting] = useState(false);
  
  // Track local override for the selected platform
  const [currentPlatform, setCurrentPlatform] = React.useState<SourcePlatform>(platform);

  // Sync if parent platform changes
  React.useEffect(() => {
    setCurrentPlatform(platform);
  }, [platform]);

  // Send button position drag state
  const [sendPos, setSendPos] = useState<'right' | 'left'>('right');

  // Aura prompt state
  const [auraPromptMode, setAuraPromptMode] = useState(false);
  const [auraPrompt, setAuraPrompt] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setText(val);
    setShowCommands(val.startsWith('/'));
  };

  const handleSend = (overridePlatform?: SourcePlatform) => {
    if (text.trim()) {
      onSend(text, overridePlatform || currentPlatform);
      setText('');
      setShowCommands(false);
      setShowRouting(false);
    }
  };

  const handleRouteSelect = (selectedPlatform: SourcePlatform) => {
    setCurrentPlatform(selectedPlatform);
    setShowRouting(false);
    if (text.trim()) {
      onSend(text, selectedPlatform);
      setText('');
      setShowCommands(false);
    }
  };

  // Hold send button routing
  let pressTimer: NodeJS.Timeout;
  const handleSendPressStart = () => {
    pressTimer = setTimeout(() => setShowRouting(true), 400);
  };
  const handleSendPressEnd = () => {
    clearTimeout(pressTimer);
  };

  const getPlatformColor = (p: SourcePlatform) => {
    switch (p) {
      case 'whatsapp': return 'bg-emerald-500 hover:bg-emerald-600';
      case 'telegram': return 'bg-sky-500 hover:bg-sky-600';
      case 'signal': return 'bg-blue-500 hover:bg-blue-600';
      case 'gmail': return 'bg-rose-500 hover:bg-rose-600';
      case 'sms': return 'bg-orange-500 hover:bg-orange-600';
      case 'uchat': default: return 'bg-violet-600 hover:bg-violet-700';
    }
  };

  const getPlatformIcon = (p: SourcePlatform) => {
    switch (p) {
      case 'whatsapp': return <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />;
      case 'telegram': return <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />;
      case 'signal': return <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />;
      case 'gmail': return <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />;
      case 'sms': return <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />;
      case 'uchat': default: return <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
    }
  };

  return (
    <div data-component="ChatComposer" className="relative w-full p-2 sm:p-4 bg-transparent pb-4 sm:pb-4 flex flex-col gap-2">
      
      {/* Auto-Reply Suggestion / Aura Chip */}
      <AnimatePresence mode="wait">
        {!text && !isRecording && (
          auraPromptMode ? (
            <motion.div 
              key="prompt"
              initial={{ opacity: 0, y: 10, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="flex justify-center w-full px-4 mb-1"
            >
              <div className="w-full max-w-md flex flex-col gap-2">
                <div className="flex items-center bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-500/30 rounded-full px-4 py-2 shadow-sm">
                  <SparklesIcon className="w-4 h-4 text-violet-500 mr-2 shrink-0" />
                  <input 
                    autoFocus
                    type="text"
                    value={auraPrompt}
                    onChange={e => setAuraPrompt(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        const prompt = auraPrompt.toLowerCase();
                        let generatedText = "Here is a draft based on your request.";
                        if (prompt.includes('recipe')) {
                          generatedText = "Here is the recipe: 1 box pasta, 2 cups tomato sauce, fresh basil. Boil pasta, mix with sauce, and serve! Enjoy 🍝";
                        } else if (prompt.includes('fix')) {
                          generatedText = "To fix this issue, try restarting the device and verifying your connection settings.";
                        } else if (prompt.includes('no') || prompt.includes('decline')) {
                          generatedText = "I won't be able to make it this time, but thanks for asking!";
                        } else if (prompt.includes('how to')) {
                          generatedText = "Here's how to do it: First, download the app. Second, create an account. Finally, click connect.";
                        }
                        setText(generatedText);
                        setAuraPrompt('');
                        setAuraPromptMode(false);
                      }
                    }}
                    placeholder="Ask Aura to write (e.g. 'recipe')..."
                    className="bg-transparent border-none outline-none text-[13px] text-zinc-900 dark:text-zinc-100 font-medium w-full placeholder-violet-300 dark:placeholder-violet-400/50"
                  />
                  <button 
                     onClick={() => setAuraPromptMode(false)}
                     className="ml-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex gap-2 justify-center">
                  <button onClick={() => setAuraPrompt('how to')} className="px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-[10px] font-bold text-violet-600 dark:text-violet-400 rounded-full hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-colors uppercase tracking-wide">How To</button>
                  <button onClick={() => setAuraPrompt('receipt')} className="px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-[10px] font-bold text-violet-600 dark:text-violet-400 rounded-full hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-colors uppercase tracking-wide">Receipt</button>
                  <button onClick={() => setAuraPrompt('decline')} className="px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-[10px] font-bold text-violet-600 dark:text-violet-400 rounded-full hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-colors uppercase tracking-wide">Decline politely</button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="chip"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
              className="flex justify-center mb-1"
            >
              <button 
                onClick={() => setAuraPromptMode(true)}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-violet-100 dark:bg-violet-900/30 border border-violet-200 dark:border-violet-500/20 text-violet-700 dark:text-violet-300 rounded-full text-[11px] font-bold shadow-sm hover:scale-105 transition-transform cursor-text"
              >
                <SparklesIcon className="w-3.5 h-3.5" />
                Aura Suggestion: "Sounds perfect!"
              </button>
            </motion.div>
          )
        )}
      </AnimatePresence>

      {/* Popovers */}
      <AnimatePresence>
        {showAttachments && (
          <PopoverWrapper onClose={() => setShowAttachments(false)}>
            <div className="grid grid-cols-4 gap-4 p-4">
              <AttachmentIcon icon={<ImageIcon />} label="Gallery" color="bg-blue-500" />
              <AttachmentIcon icon={<Camera />} label="Camera" color="bg-rose-500" />
              <AttachmentIcon icon={<File />} label="Document" color="bg-indigo-500" />
              <AttachmentIcon icon={<CreditCard />} label="U-Pay" color="bg-emerald-500" />
              <AttachmentIcon icon={<MapPin />} label="Location" color="bg-green-500" />
              <AttachmentIcon icon={<Contact />} label="Contact" color="bg-sky-500" />
              <AttachmentIcon icon={<PlayCircle />} label="Audio" color="bg-orange-500" />
              <AttachmentIcon icon={<CheckSquare />} label="Poll" color="bg-yellow-500" />
            </div>
          </PopoverWrapper>
        )}
        
        {showStickers && (
          <PopoverWrapper onClose={() => setShowStickers(false)}>
            <div className="p-4 flex flex-col w-[300px] max-h-[350px]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-4 border-b border-zinc-200 dark:border-zinc-800 w-full pb-2">
                   <h4 className="text-[14px] font-bold text-violet-600 dark:text-violet-400 tracking-tight border-b-2 border-violet-600 pb-2 -mb-[9px]">Emoji & Stickers</h4>
                </div>
              </div>
              
              <div className="overflow-y-auto pr-2 pb-2 space-y-4">
                {/* Emojis Section */}
                <div>
                  <h5 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-2">Emojis</h5>
                  <div className="grid grid-cols-5 gap-2">
                    {['😂', '🚀', '🔥', '👀', '💯', '❤️', '✨', '👍', '😊', '🙌'].map((emoji) => (
                      <div 
                        key={emoji}
                        onClick={() => setText(prev => prev + emoji)}
                        className="aspect-square bg-zinc-100 dark:bg-[#1a1a1c] hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer rounded-2xl flex items-center justify-center text-2xl shadow-sm hover:scale-110 active:scale-95 transform"
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stickers Section */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">My Stickers</h5>
                    <button 
                      onClick={() => {
                        setShowStickers(false);
                        onOpenStickerStudio();
                      }}
                      className="text-[10px] font-bold text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/30 hover:bg-violet-200 dark:hover:bg-violet-900/50 px-2 py-1 rounded-md transition-colors flex items-center gap-1"
                    >
                      <Camera className="w-3 h-3" /> Create
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {/* Mock Custom Stickers */}
                    {[
                      'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Beaming%20Face%20with%20Smiling%20Eyes.png',
                      'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Cat%20Face.png',
                      'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Waving%20Hand.png',
                      'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Party%20Popper.png',
                      'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Red%20Heart.png',
                    ].map((url, i) => (
                      <div 
                        key={i}
                        onClick={() => {
                          onSend(`[Sticker: Custom ${i + 1}]`, currentPlatform, true, url);
                          setShowStickers(false);
                        }}
                        className="aspect-square bg-zinc-100 dark:bg-[#1a1a1c] hover:bg-violet-100 dark:hover:bg-violet-900/20 transition-all cursor-pointer rounded-2xl flex items-center justify-center p-2 shadow-sm hover:scale-105 active:scale-95 transform"
                      >
                        <img src={url} alt={`Sticker ${i + 1}`} className="w-full h-full object-contain drop-shadow-md" />
                      </div>
                    ))}
                    
                    {/* Create New Sticker Button */}
                    <div 
                      className="aspect-square border-2 border-dashed border-zinc-200 dark:border-zinc-800 hover:border-violet-500/50 hover:bg-violet-50 dark:hover:bg-violet-900/10 transition-colors cursor-pointer rounded-2xl flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500 gap-1" 
                      onClick={() => { setShowStickers(false); onOpenStickerStudio(); }}
                    >
                      <Plus className="w-5 h-5" />
                      <span className="text-[10px] font-bold">New</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PopoverWrapper>
        )}

        {showRouting && (
          <PopoverWrapper onClose={() => setShowRouting(false)} anchor="right">
            <div className="flex flex-col p-2 min-w-[140px]">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-3 py-1">Set Default</h4>
              <button onClick={() => handleRouteSelect('uchat')} className="flex items-center gap-2 px-3 py-2 text-[13px] font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl">
                <div className="w-2 h-2 rounded-full bg-violet-500" /> uChat
              </button>
              <button onClick={() => handleRouteSelect('whatsapp')} className="flex items-center gap-2 px-3 py-2 text-[13px] font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl">
                <div className="w-2 h-2 rounded-full bg-emerald-500" /> WhatsApp
              </button>
              <button onClick={() => handleRouteSelect('sms')} className="flex items-center gap-2 px-3 py-2 text-[13px] font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl">
                <div className="w-2 h-2 rounded-full bg-orange-500" /> SMS
              </button>
            </div>
          </PopoverWrapper>
        )}
      </AnimatePresence>

      {/* Main Composer Bar */}
      <div className={`flex items-center gap-1.5 sm:gap-2 max-w-5xl mx-auto w-full bg-white dark:bg-[#1a1a1c] border border-zinc-200 dark:border-zinc-800/60 rounded-full p-1 sm:p-1.5 shadow-sm focus-within:ring-2 focus-within:ring-violet-500/20 transition-all ${sendPos === 'left' ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Left Tools */}
        <div className="flex items-center pl-1">
           <button onClick={() => setShowAttachments(true)} className="p-1.5 sm:p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
             <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
           </button>
           <button onClick={() => setShowStickers(true)} className="p-1.5 sm:p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 hidden sm:block" title="Emojis">
             <Smile className="w-4 h-4 sm:w-5 sm:h-5" />
           </button>
           <button onClick={() => setShowStickers(true)} className="p-1.5 sm:p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 hidden sm:block" title="Stickers">
             <Sticker className="w-4 h-4 sm:w-5 sm:h-5" />
           </button>
        </div>

        {/* Input Area */}
        <div className="flex-1 min-w-0 h-10 sm:h-12 flex items-center">
          {isRecording ? (
            <VoiceRecorderOverlay onCancel={() => setIsRecording(false)} onSend={() => setIsRecording(false)} />
          ) : (
            <input
              type="text"
              value={text}
              onChange={handleTextChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="w-full bg-transparent py-2 px-2 text-[13px] sm:text-[14px] font-medium text-zinc-900 dark:text-zinc-100 outline-none placeholder-zinc-400 dark:placeholder-zinc-500"
            />
          )}
        </div>

        {/* Action Button (Draggable) */}
        {!isRecording && (
          <motion.div 
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              if (info.offset.x < -40 && sendPos === 'right') setSendPos('left');
              if (info.offset.x > 40 && sendPos === 'left') setSendPos('right');
            }}
            className="shrink-0 cursor-grab active:cursor-grabbing z-10"
          >
            {text.trim() ? (
              <button 
                onPointerDown={handleSendPressStart}
                onPointerUp={() => { handleSendPressEnd(); handleSend(); }}
                onPointerLeave={handleSendPressEnd}
                className={`relative p-2 sm:p-2.5 m-0.5 sm:m-1 rounded-full text-white transition-all transform hover:scale-105 active:scale-95 shadow-md flex items-center justify-center pointer-events-auto ${getPlatformColor(currentPlatform)}`}
                title="Hold for routing options"
              >
                {getPlatformIcon(currentPlatform)}
                {currentPlatform !== 'uchat' && (
                  <div className="absolute -top-1 -right-1 bg-white dark:bg-[#1a1a1c] rounded-full p-0.5 shadow-md z-10">
                    <Send className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-zinc-900 dark:text-zinc-100" />
                  </div>
                )}
              </button>
            ) : (
              <button 
                onClick={() => setIsRecording(true)}
                className="p-2 sm:p-2.5 m-0.5 sm:m-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 pointer-events-auto"
              >
                <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

const SparklesIcon = (props: any) => <Sparkles {...props} />;
import { Sparkles } from 'lucide-react';

const AttachmentIcon = ({ icon, label, color }: { icon: React.ReactNode, label: string, color: string }) => (
  <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md ${color} transform group-hover:scale-105 transition-transform`}>
      {icon}
    </div>
    <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400">{label}</span>
  </div>
);

const PopoverWrapper = ({ children, onClose, anchor = 'left' }: { children: React.ReactNode, onClose: () => void, anchor?: 'left' | 'right' }) => (
  <>
    <div className="fixed inset-0 z-40" onClick={onClose} />
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className={`absolute bottom-full mb-2 z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xl overflow-hidden ${anchor === 'left' ? 'left-4' : 'right-4'}`}
    >
      {children}
    </motion.div>
  </>
);
