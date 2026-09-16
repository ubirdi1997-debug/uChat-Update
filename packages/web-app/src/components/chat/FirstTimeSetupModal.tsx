import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Mail, BrainCircuit, Contact, ChevronRight, Shield, Zap, Sparkles, Database, Check, Smartphone, Share2, SmartphoneNfc, MessageSquareText, Mailbox, Images, Camera, Ghost, Infinity } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SlateIntroModal } from './SlateIntroModal';

export interface FirstTimeSetupModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export const FirstTimeSetupModal: React.FC<FirstTimeSetupModalProps> = ({ isOpen, onComplete }) => {
  const [step, setStep] = useState(0);
  const [syncing, setSyncing] = useState(false);
  const [contactsSynced, setContactsSynced] = useState(false);
  const [showSlateIntro, setShowSlateIntro] = useState(false);
  const [slateEnabled, setSlateEnabled] = useState(false);
  
  // App Sync State
  const [connectingApps, setConnectingApps] = useState<Record<string, boolean>>({});
  const [connectedApps, setConnectedApps] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 6) setStep(step + 1);
    else onComplete();
  };

  const handleSyncContacts = () => {
    setSyncing(true);
    // Mock backend sync
    setTimeout(() => {
      setSyncing(false);
      setContactsSynced(true);
      setTimeout(handleNext, 1000);
    }, 2000);
  };
  
  const handleConnectApp = (appId: string) => {
    if (connectedApps[appId] || connectingApps[appId]) return;
    setConnectingApps(prev => ({ ...prev, [appId]: true }));
    setTimeout(() => {
      setConnectingApps(prev => ({ ...prev, [appId]: false }));
      setConnectedApps(prev => ({ ...prev, [appId]: true }));
    }, 1500);
  };

  const handleConnectAll = (appIds: string[]) => {
    appIds.forEach(appId => {
      if (!connectedApps[appId]) handleConnectApp(appId);
    });
  };

  const chatApps = [
    { id: 'whatsapp', name: 'WhatsApp', icon: <SmartphoneNfc className="w-5 h-5 text-green-500" /> },
    { id: 'telegram', name: 'Telegram', icon: <Share2 className="w-5 h-5 text-blue-500" /> },
    { id: 'uchat', name: 'uChat', icon: <Infinity className="w-5 h-5 text-violet-500" /> },
    { id: 'signal', name: 'Signal', icon: <Shield className="w-5 h-5 text-blue-400" /> },
    { id: 'sms', name: 'SMS', icon: <MessageSquareText className="w-5 h-5 text-orange-500" /> }
  ];

  const emailApps = [
    { id: 'gmail', name: 'Gmail', icon: <Mail className="w-5 h-5 text-red-500" /> },
    { id: 'umail', name: 'uMail', icon: <Mailbox className="w-5 h-5 text-violet-500" />, isNative: true }
  ];

  const storyApps = [
    { id: 'snapchat', name: 'Snapchat', icon: <Ghost className="w-5 h-5 text-yellow-500" /> },
    { id: 'instagram', name: 'Instagram', icon: <Camera className="w-5 h-5 text-pink-500" /> }
  ];

  const steps = [
    {
      title: "Welcome to uChat",
      subtitle: "Your Universal Communication Hub",
      icon: <Sparkles className="w-12 h-12 text-violet-500" />,
      content: (
        <div className="text-center space-y-4">
          <p className="text-sm text-app-text-muted">
            Experience the future of communication. uChat brings all your favorite platforms, emails, and notes into one secure, AI-powered inbox.
          </p>
          <div className="flex justify-center gap-4 py-4">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }} className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-2xl"><MessageCircle className="w-6 h-6 text-violet-600 dark:text-violet-400"/></motion.div>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-2xl"><Mail className="w-6 h-6 text-violet-600 dark:text-violet-400"/></motion.div>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-2xl"><BrainCircuit className="w-6 h-6 text-violet-600 dark:text-violet-400"/></motion.div>
          </div>
        </div>
      )
    },
    {
      title: "Universal Messaging",
      subtitle: "WhatsApp, Telegram, Signal & More",
      icon: <MessageCircle className="w-12 h-12 text-blue-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-app-text-muted text-center">
            Connecting your apps will stream your messages directly here. Reply instantly without switching apps, all processed locally for maximum privacy.
          </p>
          <div className="relative h-32 flex items-center justify-center overflow-hidden rounded-xl bg-app-surface border border-app-border">
             <motion.div 
               animate={{ x: [ -50, 0, 50, 0 ] }} 
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="flex gap-6"
             >
               <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl"><MessageCircle className="w-6 h-6 text-green-600" /></div>
               <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl"><MessageCircle className="w-6 h-6 text-blue-600" /></div>
             </motion.div>
             <div className="absolute inset-0 bg-gradient-to-r from-app-surface via-transparent to-app-surface" />
             <div className="absolute z-10 p-3 bg-app-bg shadow-xl border border-app-border rounded-2xl">
               <Zap className="w-8 h-8 text-violet-500" />
             </div>
          </div>
        </div>
      )
    },
    {
      title: "Bridge Connections",
      subtitle: "Auto-Detected Local Apps",
      icon: <Smartphone className="w-12 h-12 text-indigo-500" />,
      content: (
        <div className="space-y-4">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 px-3 py-2 rounded-lg mb-2">
            <p className="text-[10px] sm:text-xs text-indigo-800 dark:text-indigo-300 flex items-center gap-2">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
              PWA Mode: Simulating local detection. Native app auto-detects installed packages.
            </p>
          </div>
          
          <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
            {chatApps.map(app => (
              <div key={app.id} className="flex items-center justify-between p-3 rounded-xl bg-app-surface border border-app-border">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                    {app.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{app.name}</div>
                    <div className="text-[10px] text-app-text-muted">
                      {connectedApps[app.id] ? 'Bridged & Synced' : 'Ready to connect'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleConnectApp(app.id)}
                  disabled={connectingApps[app.id] || connectedApps[app.id]}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    connectedApps[app.id]
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-900/50'
                  }`}
                >
                  {connectingApps[app.id] ? (
                    <span className="animate-pulse flex items-center gap-1"><Zap className="w-3 h-3" /> Syncing</span>
                  ) : connectedApps[app.id] ? (
                    <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Linked</span>
                  ) : (
                    'Connect'
                  )}
                </button>
              </div>
            ))}
          </div>
          
          {!chatApps.every(app => connectedApps[app.id]) && (
             <button
               onClick={() => handleConnectAll(chatApps.map(a => a.id))}
               className="w-full py-2 rounded-xl text-xs font-bold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
             >
               Connect All Available
             </button>
          )}
        </div>
      )
    },
    {
      title: "Intelligent Inbox",
      subtitle: "Gmail & uMail Integration",
      icon: <Mail className="w-12 h-12 text-rose-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-app-text-muted text-center">
            Treat your emails like chat messages. Give Aura AI access to automatically summarize long threads, highlight action items, and draft replies.
          </p>
          
          <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
            {emailApps.map(app => (
              <div key={app.id} className="flex items-center justify-between p-3 rounded-xl bg-app-surface border border-app-border">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                    {app.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{app.name}</div>
                    <div className="text-[10px] text-app-text-muted">
                      {app.isNative ? 'Native uSafe Product' : connectedApps[app.id] ? 'Connected' : 'Requires Login'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => !app.isNative && handleConnectApp(app.id)}
                  disabled={app.isNative || connectingApps[app.id] || connectedApps[app.id]}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    app.isNative || connectedApps[app.id]
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:hover:bg-rose-900/50'
                  }`}
                >
                  {app.isNative ? (
                    <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Auto-Synced</span>
                  ) : connectingApps[app.id] ? (
                    <span className="animate-pulse flex items-center gap-1"><Zap className="w-3 h-3" /> Syncing</span>
                  ) : connectedApps[app.id] ? (
                    <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Linked</span>
                  ) : (
                    'Connect'
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Unified Stories",
      subtitle: "Social Media Integration",
      icon: <Images className="w-12 h-12 text-pink-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-app-text-muted text-center">
            View and share stories directly from Snapchat and Instagram in a unified, beautiful social feed.
          </p>
          
          <div className="flex justify-center gap-3 py-2">
            {[1, 2, 3].map(i => (
              <motion.div 
                key={i}
                animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }} 
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500"
              >
                <div className="w-full h-full bg-app-surface rounded-full border-2 border-app-bg" />
              </motion.div>
            ))}
          </div>

          <div className="space-y-2">
            {storyApps.map(app => (
              <div key={app.id} className="flex items-center justify-between p-3 rounded-xl bg-app-surface border border-app-border">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                    {app.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{app.name}</div>
                    <div className="text-[10px] text-app-text-muted">
                      {connectedApps[app.id] ? 'Stories Synced' : 'Connect for Stories'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleConnectApp(app.id)}
                  disabled={connectingApps[app.id] || connectedApps[app.id]}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    connectedApps[app.id]
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-pink-100 text-pink-700 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:hover:bg-pink-900/50'
                  }`}
                >
                  {connectingApps[app.id] ? (
                    <span className="animate-pulse flex items-center gap-1"><Zap className="w-3 h-3" /> Syncing</span>
                  ) : connectedApps[app.id] ? (
                    <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Linked</span>
                  ) : (
                    'Connect'
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Contextual Awareness",
      subtitle: "Enable uSafe Slate",
      icon: <BrainCircuit className="w-12 h-12 text-amber-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-app-text-muted text-center">
            Give Aura AI access to your Slate workspace. It will proactively remind you of tasks, schedule events, and recall facts from your private notes.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 bg-app-surface border border-app-border rounded-xl flex flex-col items-center gap-2">
              <Shield className="w-5 h-5 text-amber-500" />
              <span className="text-[10px] font-bold text-center">Local Processing</span>
            </div>
            <div className="p-3 bg-app-surface border border-app-border rounded-xl flex flex-col items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span className="text-[10px] font-bold text-center">Proactive Insights</span>
            </div>
          </div>
          <button
            onClick={() => {
              setSlateEnabled(true);
              confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#8b5cf6', '#d946ef', '#f59e0b']
              });
              setShowSlateIntro(true);
            }}
            disabled={slateEnabled}
            className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              slateEnabled 
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' 
                : 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20'
            }`}
          >
            {slateEnabled ? (
              <><Check className="w-4 h-4" /> Slate Enabled</>
            ) : (
              <><Sparkles className="w-4 h-4" /> Enable Slate</>
            )}
          </button>
        </div>
      )
    },
    {
      title: "Secure Directory",
      subtitle: "Sync Contacts to uSafe",
      icon: <Database className="w-12 h-12 text-emerald-500" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-app-text-muted text-center">
            Syncing your accounts will build your unified contact directory on our secure servers, enabling seamless multi-app messaging in the PWA and mobile app.
          </p>
          
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 p-4 rounded-xl">
             <div className="flex items-start gap-3">
               <Contact className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
               <p className="text-xs text-emerald-800 dark:text-emerald-300">
                 End-to-end encrypted sync ensures your social graph remains completely private.
               </p>
             </div>
          </div>

          <button
            onClick={handleSyncContacts}
            disabled={syncing || contactsSynced}
            className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              contactsSynced 
                ? 'bg-green-500 text-white' 
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20'
            }`}
          >
            {syncing ? (
              <span className="animate-pulse">Syncing to secure servers...</span>
            ) : contactsSynced ? (
              <>
                <Check className="w-4 h-4" /> Contacts Synced
              </>
            ) : (
              'Grant Contacts Access'
            )}
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-app-bg border border-app-border rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header / Progress */}
        <div className="p-6 pb-2">
          <div className="flex gap-2 mb-6">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                  i <= step ? 'bg-violet-500' : 'bg-zinc-200 dark:bg-zinc-800'
                }`} 
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 pt-2 flex-1 relative min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="mb-4">
                {steps[step].icon}
              </div>
              <h2 className="text-xl font-bold text-app-text mb-1 text-center">{steps[step].title}</h2>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-violet-500 mb-6 text-center">
                {steps[step].subtitle}
              </p>
              
              <div className="w-full">
                {steps[step].content}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-6 pt-4 border-t border-app-border bg-app-surface mt-auto">
          {step < 6 ? (
            <button
              onClick={handleNext}
              className="w-full py-3.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20 transition-transform active:scale-95"
            >
              Next Step <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onComplete}
              disabled={!contactsSynced}
              className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform ${
                contactsSynced 
                  ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/20 active:scale-95' 
                  : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
              }`}
            >
              Complete Setup
            </button>
          )}
        </div>
      </motion.div>
      <SlateIntroModal isOpen={showSlateIntro} onClose={() => setShowSlateIntro(false)} />
    </div>
  );
};
