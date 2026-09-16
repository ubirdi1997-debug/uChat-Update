// packages/web-app/src/components/chat/ChatHeader.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Phone, Video, Search, MoreHorizontal, ChevronDown, ChevronLeft, Sparkles, Palette } from 'lucide-react';
import { SourcePlatform } from '../../types/ui';
import { TypingIndicator } from './TypingIndicator';
import { motion, AnimatePresence } from 'motion/react';

export interface ChatHeaderProps {
  contactName: string;
  platform: SourcePlatform;
  statusText: string;
  avatarUrl: string;
  onOpenProfile: () => void;
  onTriggerAudioCall?: () => void;
  onTriggerVideoCall?: () => void;
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
  onTriggerAudioCall,
  onTriggerVideoCall,
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
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isSearchActive) {
    return (
      <div 
        data-component="ChatHeaderSearch"
        className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-app-bg/80 backdrop-blur-xl border-b border-app-border sticky top-0 z-30 h-[56px] sm:h-[64px] shrink-0"
      >
        <button 
          data-action="close-search" 
          onClick={onCloseSearch} 
          className="p-1.5 -ml-1 text-app-text-muted hover:text-app-text rounded-full hover:bg-app-surface-hover transition-colors shrink-0"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <div className="flex-1 relative flex items-center">
          <Search className="w-4 h-4 absolute left-3 text-app-text-muted" />
          <input
            autoFocus
            type="text"
            value={searchQuery || ''}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search in conversation..."
            className="w-full bg-app-surface text-[13px] sm:text-[14px] font-medium text-app-text rounded-full py-2 pl-9 pr-4 outline-none focus:ring-2 focus:ring-violet-500/30 transition-all placeholder-zinc-400 dark:placeholder-zinc-500"
          />
        </div>
      </div>
    );
  }

  return (
    <div 
      data-component="ChatHeader"
      className="flex items-center justify-between px-3 sm:px-5 py-2 sm:py-3 bg-app-bg/80 backdrop-blur-xl border-b border-app-border sticky top-0 z-30 h-[56px] sm:h-[64px] shrink-0"
    >
      <div className="flex items-center gap-1 sm:gap-3">
        {onBack && (
          <button 
            data-action="go-back" 
            onClick={onBack} 
            className="md:hidden p-1.5 -ml-1 text-app-text-muted hover:text-app-text rounded-full hover:bg-app-surface-hover transition-colors"
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
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover bg-app-surface"
            />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-app-bg rounded-full" />
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5">
              <h2 className="text-[14px] sm:text-[15px] font-bold text-app-text tracking-tight group-hover:opacity-80 transition-opacity line-clamp-1">
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
                <span className="text-[11px] sm:text-[12px] font-medium text-app-text-muted">
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
          <button data-action="toggle-wallpaper" onClick={onToggleWallpaper} className="p-2 text-app-text-muted hover:text-app-text transition-colors rounded-full hover:bg-app-surface-hover" title="Change Wallpaper">
            <Palette className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
        {(onTriggerAudioCall || onTriggerVideoCall) && (
          <>
            {onTriggerAudioCall && <button data-action="trigger-audio-call" onClick={onTriggerAudioCall} className="p-2 text-app-text-muted hover:text-app-text transition-colors rounded-full hover:bg-app-surface-hover">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>}
            {onTriggerVideoCall && <button data-action="trigger-video-call" onClick={onTriggerVideoCall} className="hidden sm:block p-2 text-app-text-muted hover:text-app-text transition-colors rounded-full hover:bg-app-surface-hover">
              <Video className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>}
          </>
        )}
        <div className="w-px h-4 bg-app-border mx-1 hidden sm:block" />
        <button data-action="search-chat" onClick={onSearch} className="hidden sm:block p-2 text-app-text-muted hover:text-app-text transition-colors rounded-full hover:bg-app-surface-hover">
          <Search className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <div className="relative" ref={menuRef}>
          <button 
            data-action="more-options" 
            onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
            className="p-2 text-app-text-muted hover:text-app-text transition-colors rounded-full hover:bg-app-surface-hover"
          >
            <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          <AnimatePresence>
            {isMoreMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-[#1a1a1c] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl z-50 overflow-hidden sm:hidden"
              >
                {onTriggerVideoCall && (
                  <button
                    onClick={() => { onTriggerVideoCall(); setIsMoreMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-app-text hover:bg-app-surface-hover transition-colors text-left"
                  >
                    <Video className="w-4 h-4" /> Video Call
                  </button>
                )}
                <button
                  onClick={() => { onSearch(); setIsMoreMenuOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-app-text hover:bg-app-surface-hover transition-colors text-left"
                >
                  <Search className="w-4 h-4" /> Search Chat
                </button>
                <button
                  onClick={() => { onOpenProfile(); setIsMoreMenuOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-app-text hover:bg-app-surface-hover transition-colors text-left border-t border-zinc-100 dark:border-zinc-800"
                >
                  View Contact
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
