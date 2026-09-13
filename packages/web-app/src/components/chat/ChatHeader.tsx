// packages/web-app/src/components/chat/ChatHeader.tsx
import React from 'react';
import { Phone, Video, Search, MoreHorizontal, ChevronDown, ChevronLeft, Sparkles, Palette } from 'lucide-react';
import { SourcePlatform } from '../../types/ui';
import { TypingIndicator } from './TypingIndicator';
import { motion } from 'motion/react';

export interface ChatHeaderProps {
  contactName: string;
  platform: SourcePlatform;
  statusText: string;
  avatarUrl: string;
  onOpenProfile: () => void;
  onTriggerCall?: () => void;
  onSearch: () => void;
  onBack?: () => void;
  isTyping?: boolean;
  isSearchActive?: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onCloseSearch?: () => void;
  onOpenAura: () => void;
  onToggleWallpaper?: () => void;
}

const getPlatformBadgeStyle = (platform: SourcePlatform) => {
  switch (platform) {
    case 'whatsapp': return 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400';
    case 'signal': return 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400';
    case 'telegram': return 'bg-sky-500/10 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400';
    case 'gmail': return 'bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400';
    case 'sms': return 'bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400';
    case 'uchat': default: return 'bg-violet-500/10 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400';
  }
};

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  contactName,
  platform,
  statusText,
  avatarUrl,
  onOpenProfile,
  onTriggerCall,
  onSearch,
  onBack,
  isTyping,
  isSearchActive,
  searchQuery,
  onSearchChange,
  onCloseSearch,
  onOpenAura,
  onToggleWallpaper
}) => {
  if (isSearchActive) {
    return (
      <div 
        data-component="ChatHeaderSearch"
        className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-800/60 sticky top-0 z-30 h-[56px] sm:h-[64px]"
      >
        <button 
          data-action="close-search" 
          onClick={onCloseSearch} 
          className="p-1.5 -ml-1 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shrink-0"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <div className="flex-1 relative flex items-center">
          <Search className="w-4 h-4 absolute left-3 text-zinc-400" />
          <input
            autoFocus
            type="text"
            value={searchQuery || ''}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search in conversation..."
            className="w-full bg-zinc-100 dark:bg-[#1a1a1c] text-[13px] sm:text-[14px] font-medium text-zinc-900 dark:text-zinc-100 rounded-full py-2 pl-9 pr-4 outline-none focus:ring-2 focus:ring-violet-500/30 transition-all placeholder-zinc-400 dark:placeholder-zinc-500"
          />
        </div>
      </div>
    );
  }

  return (
    <div 
      data-component="ChatHeader"
      className="flex items-center justify-between px-3 sm:px-5 py-2 sm:py-3 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-800/60 sticky top-0 z-30 h-[56px] sm:h-[64px]"
    >
      <div className="flex items-center gap-1 sm:gap-3">
        {onBack && (
          <button 
            data-action="go-back" 
            onClick={onBack} 
            className="md:hidden p-1.5 -ml-1 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        
        <div 
          data-action="open-profile"
          onClick={onOpenProfile}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
        >
          <div className="relative flex-shrink-0">
            <img 
              src={avatarUrl} 
              alt={contactName} 
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover bg-zinc-100 dark:bg-zinc-800"
            />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-[#09090b] rounded-full" />
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5">
              <h2 className="text-[14px] sm:text-[15px] font-bold text-zinc-900 dark:text-zinc-50 tracking-tight group-hover:opacity-80 transition-opacity line-clamp-1">
                {contactName}
              </h2>
              <div className={`hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${getPlatformBadgeStyle(platform)}`}>
                {platform} <ChevronDown className="w-2.5 h-2.5 opacity-70" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isTyping ? (
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] sm:text-[12px] font-bold text-violet-600 dark:text-violet-400 tracking-wide">
                    typing
                  </span>
                  <TypingIndicator />
                </div>
              ) : (
                <span className="text-[11px] sm:text-[12px] font-medium text-zinc-500 dark:text-zinc-400">
                  {statusText}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-0.5 sm:gap-1">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenAura} 
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 bg-violet-500/10 hover:bg-violet-500/20 text-violet-600 dark:text-violet-400 rounded-full transition-colors mr-1"
          title="Aura AI"
        >
          <Sparkles className="w-4 h-4 sm:w-4 sm:h-4" />
        </motion.button>
        {onToggleWallpaper && (
          <button data-action="toggle-wallpaper" onClick={onToggleWallpaper} className="p-2 text-zinc-400 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800" title="Change Wallpaper">
            <Palette className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
        {onTriggerCall && (
          <>
            <button data-action="trigger-audio-call" onClick={onTriggerCall} className="p-2 text-zinc-400 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button data-action="trigger-video-call" onClick={onTriggerCall} className="hidden sm:block p-2 text-zinc-400 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <Video className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </>
        )}
        <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 mx-1 hidden sm:block" />
        <button data-action="search-chat" onClick={onSearch} className="hidden sm:block p-2 text-zinc-400 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
          <Search className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button data-action="more-options" className="p-2 text-zinc-400 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
          <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};
