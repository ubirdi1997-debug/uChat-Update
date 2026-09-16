import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Users, Link2, Mail, Phone, MessageCircle, ChevronLeft, Loader2, CheckCircle2 } from 'lucide-react';

export interface ComposeOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const Confetti = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center z-50">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: 0,
            scale: [1, 1.5, 0.5],
            x: (Math.random() - 0.5) * 500,
            y: (Math.random() - 0.5) * 500 + (Math.random() * 100),
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute w-3 h-3 rounded-full"
          style={{
            backgroundColor: ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 6)]
          }}
        />
      ))}
    </div>
  );
};

export const ComposeOverlay: React.FC<ComposeOverlayProps> = ({ isOpen, onClose }) => {
  const [view, setView] = useState<'main' | 'connect'>('main');
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setView('main');
      setConnectingId(null);
      setShowCelebration(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConnect = (id: string) => {
    setConnectingId(id);
    setTimeout(() => {
      setConnectingId(null);
      setShowCelebration(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1500);
  };

  const apps = [
    { id: 'gmail', name: 'Sync Gmail', icon: <Mail className="w-5 h-5" />, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { id: 'whatsapp', name: 'Sync WhatsApp', icon: <Phone className="w-5 h-5" />, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { id: 'telegram', name: 'Sync Telegram', icon: <MessageCircle className="w-5 h-5" />, color: 'text-sky-500', bg: 'bg-sky-500/10' },
  ];

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute inset-0 z-50 bg-app-bg flex flex-col"
      >
        {showCelebration && <Confetti />}

        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-app-border bg-app-bg/80 backdrop-blur-md z-10 sticky top-0">
          <div className="flex items-center gap-3">
            {view === 'connect' && (
              <button onClick={() => setView('main')} className="p-1.5 -ml-2 rounded-full hover:bg-app-surface-hover text-app-text-muted transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <h2 className="font-extrabold text-lg text-app-text tracking-tight">
              {view === 'main' ? 'Compose' : 'Connect Platform'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-app-surface-hover text-app-text-muted transition-colors bg-app-surface">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 relative">
          <AnimatePresence mode="wait">
            {view === 'main' && (
              <motion.div 
                key="main"
                initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}
                className="space-y-2"
              >
                <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-app-surface-hover border border-transparent hover:border-app-border transition-all text-left group">
                  <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400 group-hover:scale-110 transition-transform">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[15px] font-bold text-app-text">Message Single User</div>
                    <div className="text-[12px] font-medium text-app-text-muted">Start a direct chat</div>
                  </div>
                </button>

                <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-app-surface-hover border border-transparent hover:border-app-border transition-all text-left group">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[15px] font-bold text-app-text">Create Group</div>
                    <div className="text-[12px] font-medium text-app-text-muted">Talk with multiple friends</div>
                  </div>
                </button>

                <div className="my-4 h-px bg-app-border" />

                <button 
                  onClick={() => setView('connect')}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-app-surface-hover border border-transparent hover:border-app-border transition-all text-left group"
                >
                  <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                    <Link2 className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[15px] font-bold text-app-text">Connect to Sync</div>
                    <div className="text-[12px] font-medium text-app-text-muted">Import messages from other apps</div>
                  </div>
                </button>
              </motion.div>
            )}

            {view === 'connect' && (
              <motion.div 
                key="connect"
                initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }}
                className="space-y-3"
              >
                <p className="text-[13px] font-medium text-app-text-muted mb-4 px-2">
                  Select a platform to sync your existing conversations directly into uChat.
                </p>

                {apps.map((app) => (
                  <button 
                    key={app.id}
                    onClick={() => handleConnect(app.id)}
                    disabled={connectingId !== null || showCelebration}
                    className="relative w-full flex items-center gap-4 p-4 rounded-2xl bg-app-surface border border-app-border hover:border-violet-500/50 transition-all text-left group overflow-hidden"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${app.bg} ${app.color}`}>
                      {app.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-[15px] font-bold text-app-text">{app.name}</div>
                    </div>
                    
                    {connectingId === app.id && (
                      <Loader2 className="w-5 h-5 text-violet-500 animate-spin" />
                    )}
                    {showCelebration && connectingId === null && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-emerald-500">
                        <CheckCircle2 className="w-6 h-6" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
