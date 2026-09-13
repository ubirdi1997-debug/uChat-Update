// packages/web-app/src/components/chat/AuraAIModal.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, Mail, Calendar, Ghost, Users, ArrowRight, Loader2, Check } from 'lucide-react';

export interface AuraAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSnapchatConnected: () => void;
}

export const AuraAIModal: React.FC<AuraAIModalProps> = ({ isOpen, onClose, onSnapchatConnected }) => {
  const [isConnectingSnapchat, setIsConnectingSnapchat] = useState(false);
  const [isSnapchatConnected, setIsSnapchatConnected] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Validate origin to ensure it's from our app
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost') && !origin.includes('0.0.0.0')) {
        return;
      }
      
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS' && event.data?.provider === 'snapchat') {
        setIsConnectingSnapchat(false);
        setIsSnapchatConnected(true);
        // Automatically open the stories feed
        setTimeout(() => {
          onClose();
          onSnapchatConnected();
        }, 1000);
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onClose, onSnapchatConnected]);

  if (!isOpen) return null;

  const handleConnectSnapchat = async () => {
    if (isSnapchatConnected) {
      onClose();
      onSnapchatConnected();
      return;
    }
    
    setIsConnectingSnapchat(true);
    try {
      const response = await fetch('/api/snapchat/auth/url');
      if (!response.ok) throw new Error('Failed to fetch Auth URL');
      const { url } = await response.json();
      
      const authWindow = window.open(url, 'snapchat_oauth', 'width=500,height=600');
      if (!authWindow) {
        alert('Please allow popups to connect Snapchat.');
        setIsConnectingSnapchat(false);
      }
    } catch (e) {
      console.error(e);
      setIsConnectingSnapchat(false);
    }
  };

  const integrations = [
    { id: 'uauth', name: 'uAuth SSO & Contacts', icon: <Users className="w-5 h-5" />, color: 'bg-violet-500', desc: 'Sync contacts securely so they never get deleted.', onClick: () => {} },
    { id: 'gmail', name: 'Gmail Integration', icon: <Mail className="w-5 h-5" />, color: 'bg-rose-500', desc: 'Auto-summarize emails into chat threads.', onClick: () => {} },
    { id: 'calendar', name: 'Calendar Sync', icon: <Calendar className="w-5 h-5" />, color: 'bg-blue-500', desc: 'Aura schedules meetings via chat.', onClick: () => {} },
    { 
      id: 'snapchat', 
      name: 'Snapchat Stories', 
      icon: <Ghost className="w-5 h-5" />, 
      color: 'bg-yellow-400 text-black', 
      desc: 'Enable stories from people around you.', 
      onClick: handleConnectSnapchat,
      status: isConnectingSnapchat ? 'connecting' : isSnapchatConnected ? 'connected' : 'idle'
    }
  ];

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-md bg-white dark:bg-[#121214] rounded-[2rem] shadow-2xl overflow-hidden border border-zinc-200/50 dark:border-zinc-800/80"
      >
        <div className="relative h-32 bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-800 p-6 flex flex-col justify-end overflow-hidden">
          <div className="absolute top-4 right-4 z-10">
            <button onClick={onClose} className="p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors backdrop-blur-sm">
              <X className="w-4 h-4" />
            </button>
          </div>
          <Sparkles className="absolute -top-6 -right-6 w-32 h-32 text-white opacity-10" />
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">Aura AI Hub</h2>
              <p className="text-[12px] font-medium text-indigo-100">Supercharge your messaging experience</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-zinc-50 dark:bg-[#1a1a1c] p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800/60">
            <p className="text-[13px] text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              Aura actively learns from your messaging habits to suggest smart auto-replies. Connect apps below to expand its capabilities.
            </p>
          </div>

          <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mt-6 mb-2 ml-2">Integrations</h3>
          
          <div className="space-y-2">
            {integrations.map((item) => (
              <button 
                key={item.id} 
                onClick={item.onClick}
                className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-[#1a1a1c] border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 transition-all text-left group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md ${item.color}`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="text-[14px] font-bold text-zinc-900 dark:text-zinc-100">{item.name}</div>
                  <div className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 line-clamp-1">{item.desc}</div>
                </div>
                {item.status === 'connecting' ? (
                  <Loader2 className="w-5 h-5 text-violet-500 animate-spin" />
                ) : item.status === 'connected' ? (
                  <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-500">
                    <Check className="w-4 h-4" />
                  </div>
                ) : (
                  <ArrowRight className="w-4 h-4 text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors" />
                )}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
