import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ConversationRow } from '../packages/web-app/src/components/inbox/ConversationRow';
import { ComposeOverlay } from '../packages/web-app/src/components/inbox/ComposeOverlay';
import { ChatHeader } from '../packages/web-app/src/components/chat/ChatHeader';
import { MessageBubble } from '../packages/web-app/src/components/chat/MessageBubble';
import { ChatComposer } from '../packages/web-app/src/components/chat/ChatComposer';
import { NewMessagesDivider } from '../packages/web-app/src/components/chat/NewMessagesDivider';
import { Gmail3DCard } from '../packages/web-app/src/components/cards/Gmail3DCard';
import { QRActionPill } from '../packages/web-app/src/components/chat/QRActionPill';
import { MiniProfile } from '../packages/web-app/src/components/chat/MiniProfile';
import { AuraAIModal } from '../packages/web-app/src/components/chat/AuraAIModal';
import { StickerStudio } from '../packages/web-app/src/components/chat/StickerStudio';
import { SnapchatStoriesModal } from '../packages/web-app/src/components/chat/SnapchatStoriesModal';
import { FirstTimeSetupModal } from '../packages/web-app/src/components/chat/FirstTimeSetupModal';
import { SettingsModal } from '../packages/web-app/src/components/chat/SettingsModal';
import { CallModal } from '../packages/web-app/src/components/chat/CallModal';
import { ChatThemeModal } from '../packages/web-app/src/components/chat/ChatThemeModal';
import { DuressModal } from '../packages/web-app/src/components/chat/DuressModal';
import { SlateIntroModal } from '../packages/web-app/src/components/chat/SlateIntroModal';
import { SplashScreen } from '../packages/web-app/src/components/chat/SplashScreen';
import { ConversationItem, ChatMessage, GmailCardData, QRPayload } from '../packages/web-app/src/types/ui';
import { Sun, Moon, Search, Plus, RefreshCw, Check, X, Settings, Infinity } from 'lucide-react';

const MOCK_CONVERSATIONS: ConversationItem[] = [
  {
    id: '1',
    contactName: 'Alice (Design)',
    avatarUrl: 'https://i.pravatar.cc/150?u=1',
    platform: 'uchat',
    lastSnippet: 'Let me know if the designs are ready.',
    timestamp: '10:42 AM',
    unreadCount: 2,
    isPinned: true,
    isOnline: true
  },
  {
    id: '2',
    contactName: 'Bob (Engineering)',
    avatarUrl: 'https://i.pravatar.cc/150?u=2',
    platform: 'telegram',
    lastSnippet: 'Deployed to staging! 🎉',
    timestamp: 'Yesterday',
    unreadCount: 0,
    isPinned: false,
    isOnline: false
  }
];

const MOCK_GMAIL_DATA: GmailCardData = {
  senderEmail: 'security@bank.com',
  dkimVerified: true,
  spfVerified: true,
  subject: 'Your One-Time Passcode for Login',
  aiSummary: 'Critical login OTP code. Do not share it with anyone.',
  snippet: 'Here is your verification code to complete sign in.',
  detectedOtp: '482-991',
  threadCount: 1
};

const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: 'm1', senderId: 'contact1', senderName: 'Alice', isMe: false,
    text: 'Hey! Here is that payment link you asked for.', timestamp: '10:45 AM', platform: 'uchat', mediaType: 'none',
  },
  {
    id: 'm1_qr', senderId: 'contact1', senderName: 'Alice', isMe: false,
    text: '', timestamp: '10:45 AM', platform: 'uchat', mediaType: 'image',
    qrPayload: {
      type: 'upi',
      title: 'UPI Payment Detected',
      actionLabel: 'Pay Alice - $45.00',
      rawData: 'upi://pay?pa=alice@upi&pn=Alice&am=45.00'
    }
  },
  {
    id: 'm2_audio', senderId: 'contact1', senderName: 'Alice', isMe: false,
    text: '', timestamp: '10:46 AM', platform: 'uchat', mediaType: 'audio',
    audioDuration: '0:14',
    transcription: 'Hey! I just sent the link. Let me know once you process the payment so I can confirm it on my end. Thanks!'
  },
  {
    id: 'n1', senderId: 'system', senderName: 'System', isMe: false, text: '', timestamp: '10:46 AM', platform: 'uchat', mediaType: 'security_nudge',
    nudgeData: { type: 'privacy', title: 'Location Visible', description: 'Anybody nearby can see your location. Consider putting your phone on Secure Mode to build trust.', actionLabel: 'Enable Secure Mode' }
  },
  {
    id: 'm3_1', senderId: 'me', senderName: 'Me', isMe: true, text: 'Got it, thanks! Processing now.', timestamp: '10:47 AM', platform: 'uchat', mediaType: 'none', status: 'read'
  },
  {
    id: 'm3_2', senderId: 'me', senderName: 'Me', isMe: true, text: 'Let me know when you receive the transfer.', timestamp: '10:48 AM', platform: 'uchat', mediaType: 'none', status: 'sent'
  },
  {
    id: 'n2', senderId: 'system', senderName: 'System', isMe: false, text: '', timestamp: '10:48 AM', platform: 'uchat', mediaType: 'duress_setup',
    nudgeData: { type: 'duress', title: 'Duress Safety Setup', description: 'Enable your duress pin and select 3 trusted contacts for emergency alerts.', actionLabel: 'Set Up Now' }
  },
  {
    id: 'm4', senderId: 'system', senderName: 'Bank', isMe: false, text: '', timestamp: '10:50 AM', platform: 'gmail', mediaType: 'gmail_card', gmailPayload: MOCK_GMAIL_DATA, isUnread: true
  },
  {
    id: 'm5', senderId: 'contact1', senderName: 'Alice', isMe: false, text: 'Also, come chat with me on uChat for the new stickers! 🌟', timestamp: '10:51 AM', platform: 'whatsapp', mediaType: 'none', isUnread: true
  },
  {
    id: 'm6', senderId: 'contact1', senderName: 'Alice', isMe: false, text: '¿Me puedes pasar la receta de esa pasta, por favor?', timestamp: '10:52 AM', platform: 'whatsapp', mediaType: 'none', isUnread: true, detectedLanguage: 'es',
    quickReplies: ['Yes', 'No', 'Talk later']
  }
];

const SidebarHeaderTitle = () => {
  const [tagline, setTagline] = useState('');
  useEffect(() => {
    // Pick randomly on reload
    setTagline(Math.random() > 0.5 ? 'Beyond Social' : 'Sync Everything');
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1.5">
        <Infinity className="w-6 h-6 text-violet-500" />
        <h1 className="font-extrabold text-xl tracking-tight text-zinc-900 dark:text-zinc-50">uChat</h1>
      </div>
      <motion.div 
        className="h-4 overflow-hidden flex items-center"
      >
        <AnimatePresence>
          {tagline && (
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
              className="flex items-center overflow-hidden whitespace-nowrap"
            >
              <span className="text-[10px] font-medium tracking-[0.1em] text-zinc-500 uppercase">{tagline}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="w-1 h-3 bg-violet-500 ml-1"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [hasCompletedSetup, setHasCompletedSetup] = useState(false);
  const [auraConfig] = useState({ name: 'Aura', gender: 'female', avatarUrl: '' });
  const [userConfig] = useState({ gender: 'male' });

  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES);
  
  const [selectedChat, setSelectedChat] = useState('aura-ai');
  const [isDark, setIsDark] = useState(true);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [isChatSearchActive, setIsChatSearchActive] = useState(false);
  const [chatSearchQuery, setChatSearchQuery] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      Notification.requestPermission();
    }
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'PWA_UPDATE') {
          if (Notification.permission === 'granted') {
            new Notification('uSafe', {
              body: 'A new version of the app is available and will update automatically.',
              icon: '/icon.svg'
            });
          }
        }
      });
    }
  }, []);
  
  const [showMiniProfile, setShowMiniProfile] = useState(false);
  const [showAuraModal, setShowAuraModal] = useState(false);
  const [showStickerStudio, setShowStickerStudio] = useState(false);
  const [showSnapchatStories, setShowSnapchatStories] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showDuressModal, setShowDuressModal] = useState(false);
  const [showSlateIntroModal, setShowSlateIntroModal] = useState(false);
  const [showComposeMenu, setShowComposeMenu] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [chatTheme, setChatTheme] = useState('default');
  const [callModalConfig, setCallModalConfig] = useState<{isOpen: boolean, type: 'audio' | 'video'}>({ isOpen: false, type: 'audio' });
  const [smsSynced, setSmsSynced] = useState(false);
  
  const [chatWallpaper, setChatWallpaper] = useState<'default' | 'dots' | 'grid'>('default');
  const [activeSideThreadId, setActiveSideThreadId] = useState<string | null>(null);
  const [contactIsTyping, setContactIsTyping] = useState(false);
  const [showPreciseTimestamps, setShowPreciseTimestamps] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedChat]);

  // Simulate contact typing after user sends a message
  useEffect(() => {
    if (messages.length > MOCK_MESSAGES.length && messages[messages.length - 1].isMe) {
      const initialDelay = setTimeout(() => {
        setContactIsTyping(true);
        const typingDuration = setTimeout(() => {
          setContactIsTyping(false);
        }, 3000); // Simulate typing for 3 seconds
      }, 500); // Wait 500ms before showing typing
      return () => clearTimeout(initialDelay);
    }
  }, [messages]);

  const [isSyncingContacts, setIsSyncingContacts] = useState(false);
  const [contactsSynced, setContactsSynced] = useState(false);

  // Security Monitoring Hook Simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages(prev => {
        if (prev.some(m => m.id === 'security-alert-1')) return prev;
        
        return [...prev, {
          id: 'security-alert-1',
          senderId: 'aura-ai',
          senderName: 'Aura System',
          isMe: false,
          text: '',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          platform: 'uchat',
          mediaType: 'security_nudge',
          nudgeData: {
            type: 'security',
            title: 'Unsecured Network Detected',
            description: 'Aura has detected that you recently connected to a public Wi-Fi network. Would you like to enable Secure Mode?',
            actionLabel: 'Enable Secure Mode',
            actionText: 'Enable Secure Mode'
          } as any
        }];
      });
    }, 8000); // Triggers after 8 seconds

    return () => clearTimeout(timer);
  }, []);

  // Aura AI Productivity Suggestion Hook Simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages(prev => {
        if (prev.some(m => m.id === 'aura-suggestion-1')) return prev;
        
        return [...prev, {
          id: 'aura-suggestion-1',
          senderId: 'aura-ai',
          senderName: 'Aura System',
          isMe: false,
          text: '',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          platform: 'uchat',
          mediaType: 'aura_suggestion',
          nudgeData: {
            type: 'productivity',
            title: 'uSafe Slate Setup',
            description: 'Connect your Todos, Calendar, and Notes into a unified Daily Digest powered by Aura.',
            actionLabel: 'Enable Slate',
            actionText: 'Enable Slate'
          } as any
        }];
      });
    }, 15000); // Triggers after 15 seconds for prototype

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const handleSelectChat = (id: string) => {
    setSelectedChat(id);
    setShowMobileChat(true);
  };

  const handleSetupComplete = () => {
    setHasCompletedSetup(true);
  };

  const activeConversations: ConversationItem[] = [
    {
      id: 'aura-ai',
      contactName: auraConfig.name,
      avatarUrl: auraConfig.avatarUrl || 'https://api.dicebear.com/7.x/adventurer/svg?seed=Aura&backgroundColor=c0aede',
      platform: 'uchat',
      lastSnippet: 'I am here to assist you.',
      timestamp: 'Now',
      unreadCount: 0,
      isPinned: true,
      isOnline: true
    },
    ...MOCK_CONVERSATIONS
  ];

  const activeConversation = activeConversations.find(c => c.id === selectedChat) || activeConversations[0];

  const handleSend = (text: string, platform: string, isSticker: boolean = false, stickerUrl?: string) => {
    if (!text.trim() && !isSticker) return;

    const messageId = Date.now().toString();
    const newMsg: ChatMessage = {
      id: messageId,
      senderId: 'me',
      senderName: 'Me',
      isMe: true,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      platform: platform as any,
      mediaType: isSticker ? 'sticker' : 'none',
      stickerUrl,
      status: 'sent'
    };

    setMessages(prev => [...prev, newMsg]);

    // Simulate network delay for delivery and read receipts
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === messageId ? { ...m, status: 'delivered' } : m));
      setTimeout(() => {
        setMessages(prev => prev.map(m => m.id === messageId ? { ...m, status: 'read' } : m));
      }, 1500);
    }, 1000);

    // Simulated Aura AI Response
    if (activeConversation.id === 'aura-ai') {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          senderId: 'aura-ai',
          senderName: auraConfig.name,
          isMe: false,
          text: isSticker ? 'I love that sticker! 😍' : `I've received your request: "${text}". I am processing it now.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          platform: 'uchat',
          mediaType: 'none'
        }]);
      }, 1000);
    }
  };

  const handleTranslate = (id: string) => {
    setMessages(prev => prev.map(m => {
      if (m.id === id) {
        let translation = 'Translation not available.';
        if (m.detectedLanguage === 'es') {
          translation = 'Can you send me the recipe for that pasta, please?';
        }
        return { ...m, translation };
      }
      return m;
    }));
  };

  const displayedMessages = messages.filter(msg => {
    if (activeConversation.id === 'aura-ai' && msg.senderId !== 'aura-ai' && msg.senderId !== 'me') return false; // Isolate Aura chat, somewhat mocked
    if (!isChatSearchActive || !chatSearchQuery.trim()) return true;
    return msg.text.toLowerCase().includes(chatSearchQuery.toLowerCase());
  });
  
  const unreadCount = messages.filter(m => m.isUnread).length;
  const firstUnreadIndex = displayedMessages.findIndex(m => m.isUnread);

  const handleToggleWallpaper = () => {
    setChatWallpaper(prev => prev === 'default' ? 'dots' : prev === 'dots' ? 'grid' : 'default');
  };

  const handleSyncContacts = () => {
    setIsSyncingContacts(true);
    setTimeout(() => {
      setIsSyncingContacts(false);
      setContactsSynced(true);
      setTimeout(() => setContactsSynced(false), 3000);
    }, 1500);
  };

  const getWallpaperClass = () => {
    switch (chatWallpaper) {
      case 'dots': return 'bg-zinc-50 dark:bg-[#09090b] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px]';
      case 'grid': return 'bg-zinc-50 dark:bg-[#09090b] bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] [background-size:24px_24px]';
      case 'default': default: return 'bg-zinc-50 dark:bg-[#09090b]';
    }
  };

  return (
    <div className="flex h-[100dvh] font-sans text-app-text bg-app-bg overflow-hidden">
      <SplashScreen />
      <FirstTimeSetupModal isOpen={!hasCompletedSetup} onComplete={handleSetupComplete} />
      <DuressModal isOpen={showDuressModal} onClose={() => setShowDuressModal(false)} />
      <SlateIntroModal isOpen={showSlateIntroModal} onClose={() => {
        setShowSlateIntroModal(false);
        setMessages(prev => prev.map(msg => 
          msg.mediaType === 'aura_suggestion' && msg.nudgeData 
            ? { ...msg, nudgeData: { ...msg.nudgeData, isCompleted: true } }
            : msg
        ));
      }} />
      
      {/* Sidebar */}
      <div className={`${showMobileChat ? 'hidden md:flex' : 'flex'} w-full md:w-[320px] lg:w-[360px] border-r border-zinc-200 dark:border-zinc-800/60 bg-white dark:bg-[#121214] flex-col z-20 shadow-sm flex-shrink-0 h-[100dvh]`}>
        <div className="p-4 sm:p-5 pb-3 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <SidebarHeaderTitle />
            <div className="flex items-center gap-1.5 pt-1">
              <button onClick={() => setShowSettingsModal(true)} className="p-2 rounded-full bg-zinc-100 dark:bg-[#1a1a1c] hover:bg-zinc-200 dark:hover:bg-[#232325] transition-colors" title="Settings">
                <Settings className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
              </button>
              <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full bg-zinc-100 dark:bg-[#1a1a1c] hover:bg-zinc-200 dark:hover:bg-[#232325] transition-colors">
                {isDark ? <Sun className="w-4 h-4 text-zinc-400" /> : <Moon className="w-4 h-4 text-zinc-600" />}
              </button>
              <button onClick={() => setShowComposeMenu(true)} className="p-2 rounded-full bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-500/20 transition-all transform hover:scale-105 active:scale-95">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          {/* Story Circles */}
          <div className="flex gap-3 px-1 mb-2 overflow-x-auto pb-1 no-scrollbar">
            <button onClick={() => setShowSnapchatStories(true)} className="flex flex-col items-center gap-1 shrink-0 group">
              <div className="w-12 h-12 rounded-full p-[2px] bg-yellow-400">
                <img src="https://i.pravatar.cc/150?u=snap1" alt="Snapchat" className="w-full h-full rounded-full border-2 border-app-bg object-cover" />
              </div>
              <span className="text-[9px] font-bold text-zinc-500">Snapchat</span>
            </button>
            <button onClick={() => {}} className="flex flex-col items-center gap-1 shrink-0 group">
              <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500">
                <img src="https://i.pravatar.cc/150?u=ig1" alt="Instagram" className="w-full h-full rounded-full border-2 border-app-bg object-cover" />
              </div>
              <span className="text-[9px] font-bold text-zinc-500">Instagram</span>
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" placeholder="Search..." 
              className="w-full bg-zinc-100 dark:bg-[#1a1a1c] text-[13px] font-medium text-app-text rounded-full py-2.5 pl-9 pr-4 outline-none focus:ring-2 focus:ring-violet-500/30"
            />
          </div>
          
          {/* Sync Utility */}
          <div className="flex justify-between items-center px-1 mt-3">
            <button 
              onClick={handleSyncContacts}
              disabled={isSyncingContacts || contactsSynced}
              className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                contactsSynced 
                  ? 'text-emerald-500' 
                  : isSyncingContacts 
                    ? 'text-violet-500' 
                    : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
              }`}
            >
              {contactsSynced ? (
                <><Check className="w-3 h-3" /> Contacts Synced</>
              ) : isSyncingContacts ? (
                <><RefreshCw className="w-3 h-3 animate-spin" /> Syncing via uAuth...</>
              ) : (
                <><RefreshCw className="w-3 h-3" /> Sync Contacts</>
              )}
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-2 space-y-1 pb-4 relative">
          {activeConversations.map(conv => (
            <ConversationRow key={conv.id} conversation={conv} isSelected={selectedChat === conv.id && showMobileChat === true} onSelect={handleSelectChat} />
          ))}

          {!smsSynced && (
            <div className="mx-2 mt-4 p-4 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700/50 bg-zinc-50 dark:bg-zinc-800/30 flex flex-col items-center text-center gap-2">
              <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-500">
                <Search className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">SMS Sync not completed</p>
              <button 
                onClick={() => setSmsSynced(true)}
                className="px-4 py-1.5 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-xs font-bold rounded-full transition-colors mt-1"
              >
                Sync Now
              </button>
            </div>
          )}

          {/* Compose Menu Overlay -> Renders strictly inside the sidebar list area */}
          <ComposeOverlay isOpen={showComposeMenu} onClose={() => setShowComposeMenu(false)} />
        </div>
      </div>

      {/* Main Chat */}
      <motion.div 
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={{ right: 0.3, left: 0 }}
        onDragEnd={(e, info) => {
          if (info.offset.x > 80 && showMobileChat) {
            setShowMobileChat(false);
          }
        }}
        className={`${showMobileChat ? 'flex' : 'hidden md:flex'} flex-1 flex-col ${getWallpaperClass()} relative overflow-hidden min-w-0 h-[100dvh] touch-pan-y`}
      >
        <ChatHeader 
          contactName={activeConversation.contactName} platform={activeConversation.platform} statusText={activeConversation.isOnline ? 'Online' : 'Offline'} avatarUrl={activeConversation.avatarUrl}
          onOpenProfile={() => setShowMiniProfile(true)}
          onTriggerAudioCall={() => setCallModalConfig({ isOpen: true, type: 'audio' })}
          onTriggerVideoCall={() => setCallModalConfig({ isOpen: true, type: 'video' })}
          onSearch={() => setIsChatSearchActive(true)}
          onBack={() => setShowMobileChat(false)}
          onOpenAura={() => setShowAuraModal(true)}
          onToggleWallpaper={() => setShowThemeModal(true)}
          isTyping={contactIsTyping} isSearchActive={isChatSearchActive} searchQuery={chatSearchQuery} onSearchChange={setChatSearchQuery}
          onCloseSearch={() => { setIsChatSearchActive(false); setChatSearchQuery(''); }}
        />

        <div className="flex-1 overflow-y-auto p-2 sm:p-4 pb-2 flex flex-col gap-1">
          <div className="text-center my-4"><span className="px-3 py-1 bg-zinc-200/50 dark:bg-zinc-800/50 text-[10px] font-bold uppercase tracking-widest rounded-full">Today</span></div>
          {displayedMessages.map((msg, index) => {
            const isLastInGroup = index === displayedMessages.length - 1 || displayedMessages[index + 1].senderId !== msg.senderId;
            return (
              <React.Fragment key={msg.id}>
                {index === firstUnreadIndex && !isChatSearchActive && <NewMessagesDivider count={unreadCount} />}
                <MessageBubble 
                  message={msg} searchQuery={isChatSearchActive ? chatSearchQuery : undefined}
                  onReply={() => {}} onBranchSideThread={(id) => setActiveSideThreadId(id)} onForwardToAssistant={() => {}}
                  onTranslate={handleTranslate}
                  onActionNudge={(type) => {
                    if (type === 'duress_setup') setShowDuressModal(true);
                    if (type === 'aura_suggestion') setShowSlateIntroModal(true);
                  }}
                  showTimestamp={showPreciseTimestamps || isLastInGroup}
                >
                  {msg.gmailPayload && <Gmail3DCard data={msg.gmailPayload} onOpenModal={() => {}} onAutoReply={() => {}} onManualReply={() => {}} onCopyOtp={() => {}} />}
                </MessageBubble>
              </React.Fragment>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className="w-full shrink-0">
          <ChatComposer 
            platform={activeConversation.platform} 
            onSend={handleSend} 
            onRecordAudio={() => {}} 
            onSelectSlashCommand={() => {}} 
            onOpenStickerStudio={() => setShowStickerStudio(true)}
            lastMessageText={messages.slice().reverse().find(m => !m.isMe)?.text}
          />
        </div>
      </motion.div>

      {/* Side Thread Drawer */}
      <AnimatePresence>
        {activeSideThreadId && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 340, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="hidden lg:flex flex-col border-l border-zinc-200 dark:border-zinc-800/60 bg-zinc-50 dark:bg-[#121214] z-30 shadow-lg h-[100dvh] overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800/60 shrink-0">
              <h2 className="font-bold text-[15px] tracking-tight">Thread</h2>
              <button onClick={() => setActiveSideThreadId(null)} className="p-1.5 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="text-[12px] text-zinc-500 mb-2">Original Message:</div>
              <div className="p-3 bg-white dark:bg-[#1a1a1c] border border-zinc-200 dark:border-zinc-800 rounded-xl text-[13px] mb-4 shadow-sm">
                {messages.find(m => m.id === activeSideThreadId)?.text || "Media message branched."}
              </div>
              <div className="text-center my-4">
                <span className="text-[10px] uppercase font-bold text-zinc-400">Isolated Thread Context</span>
              </div>
            </div>
            <div className="p-3 border-t border-zinc-200 dark:border-zinc-800/60 bg-white dark:bg-[#1a1a1c] shrink-0">
              <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 rounded-full p-1.5 pl-3">
                <input type="text" placeholder="Reply in thread..." className="flex-1 bg-transparent text-[13px] outline-none" />
                <button className="p-1.5 bg-violet-500 text-white rounded-full"><Check className="w-3 h-3" /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals via AnimatePresence */}
      <AnimatePresence>
        {showMiniProfile && <MiniProfile isOpen={showMiniProfile} onClose={() => setShowMiniProfile(false)} contactName={activeConversation.contactName} avatarUrl={activeConversation.avatarUrl} platform={activeConversation.platform as any} />}
        {showAuraModal && <AuraAIModal isOpen={showAuraModal} onClose={() => setShowAuraModal(false)} onSnapchatConnected={() => setShowSnapchatStories(true)} />}
        {showStickerStudio && <StickerStudio isOpen={showStickerStudio} onClose={() => setShowStickerStudio(false)} onSave={(url) => { handleSend('[Sticker: Studio]', activeConversation.platform, true, url); setShowStickerStudio(false); }} />}
        {showSnapchatStories && <SnapchatStoriesModal isOpen={showSnapchatStories} onClose={() => setShowSnapchatStories(false)} />}
        {showSettingsModal && <SettingsModal isOpen={showSettingsModal} onClose={() => setShowSettingsModal(false)} showPreciseTimestamps={showPreciseTimestamps} setShowPreciseTimestamps={setShowPreciseTimestamps} />}
      </AnimatePresence>
      <ChatThemeModal 
        isOpen={showThemeModal} 
        onClose={() => setShowThemeModal(false)} 
        currentTheme={chatWallpaper} 
        onSelectTheme={(theme) => { setChatWallpaper(theme as any); setShowThemeModal(false); }} 
      />
      <CallModal 
        isOpen={callModalConfig.isOpen} 
        type={callModalConfig.type}
        contactName={activeConversation.contactName}
        avatarUrl={activeConversation.avatarUrl}
        onClose={() => setCallModalConfig({ ...callModalConfig, isOpen: false })} 
      />
    </div>
  );
}
