import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, User, Wand2, ChevronRight, Check } from 'lucide-react';

export interface AuraConfig {
  name: string;
  gender: 'male' | 'female';
  avatarUrl: string;
}

export interface UserConfig {
  gender: 'male' | 'female';
}

export interface AuraSetupModalProps {
  isOpen: boolean;
  onComplete: (userConfig: UserConfig, auraConfig: AuraConfig) => void;
}

const getAvatarUrl = (name: string, gender: 'male' | 'female') => {
  if (gender === 'female') {
    return `https://api.dicebear.com/7.x/adventurer/svg?seed=${name}&backgroundColor=c0aede`;
  }
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${name}&backgroundColor=b6e3f4`;
};

export const AuraSetupModal: React.FC<AuraSetupModalProps> = ({ isOpen, onComplete }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [userGender, setUserGender] = useState<'male' | 'female' | null>(null);
  
  const [auraName, setAuraName] = useState('Aura');
  const [auraGender, setAuraGender] = useState<'male' | 'female'>('female');

  if (!isOpen) return null;

  const handleAutoSetup = () => {
    if (!userGender) return;
    const oppositeGender = userGender === 'male' ? 'female' : 'male';
    const config: AuraConfig = {
      name: 'Aura',
      gender: oppositeGender,
      avatarUrl: getAvatarUrl('Aura', oppositeGender)
    };
    onComplete({ gender: userGender }, config);
  };

  const handleManualSetup = () => {
    if (!userGender) return;
    const config: AuraConfig = {
      name: auraName || 'Aura',
      gender: auraGender,
      avatarUrl: getAvatarUrl(auraName || 'Aura', auraGender)
    };
    onComplete({ gender: userGender }, config);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-md bg-white dark:bg-[#121214] rounded-[2rem] shadow-2xl overflow-hidden border border-zinc-200/50 dark:border-zinc-800/80 flex flex-col"
      >
        <div className="relative h-32 bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-800 p-6 flex flex-col justify-end overflow-hidden shrink-0">
          <Sparkles className="absolute -top-6 -right-6 w-32 h-32 text-white opacity-10" />
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">Meet Aura AI</h2>
              <p className="text-[12px] font-medium text-indigo-100">Your personal intelligent assistant</p>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-[15px] font-bold text-zinc-900 dark:text-zinc-100">Let's personalize your experience.</h3>
                  <p className="text-[13px] text-zinc-500">To help Aura better understand and assist you, please select your gender.</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setUserGender('male')} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${userGender === 'male' ? 'border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-400' : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-[#1a1a1c]'}`}>
                    <User className="w-6 h-6" />
                    <span className="text-[13px] font-bold">Male</span>
                  </button>
                  <button onClick={() => setUserGender('female')} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${userGender === 'female' ? 'border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-400' : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-[#1a1a1c]'}`}>
                    <User className="w-6 h-6" />
                    <span className="text-[13px] font-bold">Female</span>
                  </button>
                </div>

                <button disabled={!userGender} onClick={() => setStep(2)} className="w-full py-3.5 mt-4 rounded-xl bg-violet-600 text-white font-bold text-[14px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-violet-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25">
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }} className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-[15px] font-bold text-zinc-900 dark:text-zinc-100">Design your Assistant</h3>
                  <p className="text-[13px] text-zinc-500">Customize how your AI looks and what you call them.</p>
                </div>

                {/* Auto Setup Button */}
                <button onClick={handleAutoSetup} className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white transition-all transform hover:scale-[1.02] shadow-lg shadow-violet-500/25 group text-left">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <Wand2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[14px] font-bold">Auto Setup</div>
                    <div className="text-[11px] font-medium text-white/80">I don't have time. Optimize it for me.</div>
                  </div>
                </button>

                <div className="flex items-center gap-4 my-2">
                  <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">OR CUSTOMIZE</span>
                  <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 px-1">Assistant Name</label>
                    <input 
                      type="text" 
                      value={auraName} 
                      onChange={(e) => setAuraName(e.target.value)}
                      className="w-full bg-zinc-100 dark:bg-[#1a1a1c] text-[14px] font-bold text-zinc-900 dark:text-zinc-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500/30 border border-transparent focus:border-violet-500/50 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 px-1">Appearance</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => setAuraGender('male')} className={`p-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${auraGender === 'male' ? 'border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-400' : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-[#1a1a1c]'}`}>
                        <span className="text-[13px] font-bold">Male Sticker</span>
                        {auraGender === 'male' && <Check className="w-4 h-4" />}
                      </button>
                      <button onClick={() => setAuraGender('female')} className={`p-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${auraGender === 'female' ? 'border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-400' : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-[#1a1a1c]'}`}>
                        <span className="text-[13px] font-bold">Female Sticker</span>
                        {auraGender === 'female' && <Check className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <button onClick={handleManualSetup} className="w-full py-3.5 mt-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black font-bold text-[14px] hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2 shadow-lg">
                  Save Customization
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
