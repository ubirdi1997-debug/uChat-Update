import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, SmartphoneNfc, Shield, Share2, FileDigit, Sparkles, Calendar, Lock } from 'lucide-react';

export type BridgePlatform = 'whatsapp' | 'signal' | 'telegram' | 'gmail' | 'umail' | 'slate' | 'uvault';

export interface ConnectionModalProps {
  isOpen: boolean;
  platform: BridgePlatform | null;
  onClose: () => void;
}

export const ConnectionModal: React.FC<ConnectionModalProps> = ({ isOpen, platform, onClose }) => {
  if (!isOpen || !platform) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 dark:bg-black/70 z-[60] backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white dark:bg-[#121214] rounded-3xl shadow-2xl z-[70] overflow-hidden border border-zinc-200 dark:border-zinc-800/60 flex flex-col"
          >
            <div className="flex justify-end p-4 absolute top-0 right-0 w-full z-20 pointer-events-none">
              <button onClick={onClose} className="p-2 rounded-full text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors pointer-events-auto">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 pb-10 flex flex-col items-center justify-center text-center space-y-6 relative">
              {platform === 'whatsapp' && (
                <>
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-2 shadow-sm">
                    <SmartphoneNfc className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">Link WhatsApp</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm leading-relaxed">
                    Use uChat as a companion device. Open WhatsApp on your primary phone, go to Linked Devices, and scan this QR code.
                  </p>
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-zinc-200">
                    <img src="https://api.dicebear.com/7.x/identicon/svg?seed=whatsapp-qr" alt="QR Code Mock" className="w-48 h-48 opacity-90" />
                  </div>
                  <div className="text-xs text-zinc-400 font-bold uppercase tracking-wider mt-4">Or</div>
                  <button className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline transition-all">Link with Phone Number instead</button>
                </>
              )}

              {platform === 'signal' && (
                <>
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-2 shadow-sm">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">Link Signal (libsignal)</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm leading-relaxed">
                    Register your libsignal identity keys to sync chats and make end-to-end encrypted calls natively via uChat.
                  </p>
                  <div className="w-full space-y-3 mt-4">
                    <input type="text" placeholder="Enter signal:// pairing URI" className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-900 dark:text-zinc-100" />
                    <button className="w-full px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all transform hover:scale-[1.02] active:scale-95 shadow-md shadow-blue-900/20">
                      Generate Local Keys
                    </button>
                  </div>
                </>
              )}

              {platform === 'telegram' && (
                <>
                  <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-2xl flex items-center justify-center mb-2 shadow-sm">
                    <Share2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">Link Telegram (MTProto)</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm leading-relaxed">
                    Connect via MTProto API. Large media will be routed securely through your local network.
                  </p>
                  <div className="w-full space-y-3 mt-4">
                    <input type="tel" placeholder="Phone Number (+1 234 567 8900)" className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-sky-500 text-zinc-900 dark:text-zinc-100" />
                    <button className="w-full px-4 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold transition-all transform hover:scale-[1.02] active:scale-95 shadow-md shadow-sky-900/20">
                      Send OTP Code
                    </button>
                  </div>
                </>
              )}

              {platform === 'gmail' && (
                <>
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center mb-2 shadow-sm">
                    <FileDigit className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">Link Gmail</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm leading-relaxed">
                    Enable the 3D Interactive Mail Stream. Requires OAuth granting to read and summarize messages on-device.
                  </p>
                  <button className="w-full mt-4 px-4 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black font-bold transition-all transform hover:scale-[1.02] active:scale-95 shadow-md">
                    Authorize via Google Workspace
                  </button>
                </>
              )}

              {(platform === 'umail' || platform === 'slate' || platform === 'uvault') && (
                <div className="relative w-full flex flex-col items-center">
                  <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                    <div className="w-64 h-64 bg-violet-500 rounded-full blur-[80px]" />
                  </div>
                  
                  <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-2xl flex items-center justify-center mb-4 relative z-10 shadow-sm">
                    {platform === 'umail' && <Sparkles className="w-8 h-8" />}
                    {platform === 'slate' && <Calendar className="w-8 h-8" />}
                    {platform === 'uvault' && <Lock className="w-8 h-8" />}
                  </div>
                  
                  <h3 className="text-2xl font-extrabold relative z-10 text-zinc-900 dark:text-zinc-100 tracking-tight mb-2">
                    Connect {platform === 'umail' ? 'uMail' : platform === 'slate' ? 'Slate' : 'uVault'}
                  </h3>
                  
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm relative z-10 leading-relaxed mb-6">
                    This is a native ecosystem app. You can grant access instantly without traditional passwords using your Aura identity.
                  </p>
                  
                  <button className="relative z-10 w-full px-4 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-violet-900/20">
                    Authorize connection via Aura
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
