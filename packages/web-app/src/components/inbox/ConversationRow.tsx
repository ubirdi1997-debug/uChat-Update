// packages/web-app/src/components/inbox/ConversationRow.tsx
import React from 'react';
import { Pin, MessageCircle, Mail, Phone, Shield, Star } from 'lucide-react';
import { ConversationItem, SourcePlatform } from '../../types/ui';

export interface ConversationRowProps {
  conversation: ConversationItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const getPlatformColor = (platform: SourcePlatform) => {
  switch (platform) {
    case 'whatsapp': return 'bg-emerald-500';
    case 'signal': return 'bg-blue-500';
    case 'telegram': return 'bg-sky-500';
    case 'gmail': return 'bg-rose-500';
    case 'sms': return 'bg-orange-500';
    case 'uchat': default: return 'bg-violet-600';
  }
};

const getPlatformIcon = (platform: SourcePlatform) => {
  switch (platform) {
    case 'whatsapp': return <Phone className="w-3 h-3 text-white" />;
    case 'signal': return <Shield className="w-3 h-3 text-white" />;
    case 'telegram': return <MessageCircle className="w-3 h-3 text-white" />;
    case 'gmail': return <Mail className="w-3 h-3 text-white" />;
    case 'sms': return <MessageCircle className="w-3 h-3 text-white" />;
    case 'uchat': default: return <MessageCircle className="w-3 h-3 text-white" />;
  }
};

export const ConversationRow: React.FC<ConversationRowProps> = ({
  conversation,
  isSelected,
  onSelect
}) => {
  return (
    <div
      data-component="ConversationRow"
      data-action="select-chat"
      onClick={() => onSelect(conversation.id)}
      className={`group flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-2xl cursor-pointer select-none transition-all duration-200 ${
        isSelected 
          ? 'bg-zinc-100 dark:bg-[#1a1a1c] shadow-sm' 
          : 'hover:bg-zinc-50 dark:hover:bg-[#121214]'
      }`}
    >
      <div className="relative flex-shrink-0">
        <img 
          src={conversation.avatarUrl} 
          alt={conversation.contactName} 
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover bg-zinc-200 dark:bg-zinc-800"
        />
        {conversation.isOnline && (
          <div className={`absolute bottom-0 right-0 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-green-500 border-2 rounded-full ${isSelected ? 'border-zinc-100 dark:border-[#1a1a1c]' : 'border-white dark:border-[#09090b] group-hover:border-zinc-50 dark:group-hover:border-[#121214]'} transition-colors duration-200`} />
        )}
        <div className={`absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full border-2 shadow-sm ${getPlatformColor(conversation.platform)} ${isSelected ? 'border-zinc-100 dark:border-[#1a1a1c]' : 'border-white dark:border-[#09090b] group-hover:border-zinc-50 dark:group-hover:border-[#121214]'} transition-colors duration-200`}>
          {getPlatformIcon(conversation.platform)}
        </div>
      </div>
      
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="font-bold text-[13px] sm:text-[15px] text-zinc-900 dark:text-zinc-100 truncate tracking-tight">
              {conversation.contactName}
            </span>
            {conversation.platform === 'uchat' && (
              <Star className="w-3 h-3 text-amber-500 fill-amber-500 flex-shrink-0" />
            )}
          </div>
          <span className="text-[10px] sm:text-[11px] font-medium text-zinc-400 dark:text-zinc-500 whitespace-nowrap flex-shrink-0 ml-2">
            {conversation.timestamp}
          </span>
        </div>
        <div className="flex justify-between items-center gap-2">
          <p className={`text-[12px] sm:text-[13px] truncate ${conversation.unreadCount > 0 ? 'font-bold text-zinc-800 dark:text-zinc-200' : 'font-medium text-zinc-500 dark:text-zinc-400'}`}>
            {conversation.lastSnippet}
          </p>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {conversation.isPinned && (
              <Pin className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 fill-current" />
            )}
            {conversation.unreadCount > 0 && (
              <span className={`px-1.5 py-0.5 min-w-[18px] text-center text-[9px] sm:text-[10px] font-bold text-white rounded-full ${getPlatformColor(conversation.platform)}`}>
                {conversation.unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
