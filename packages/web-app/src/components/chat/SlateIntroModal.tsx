import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, CheckSquare, FileText, Sparkles, ArrowRight, Check } from 'lucide-react';

export interface SlateIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SlateIntroModal: React.FC<SlateIntroModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      onClose();
      // Reset after animation
      setTimeout(() => setStep(0), 500);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-[70] backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-lg bg-white dark:bg-[#121214] rounded-3xl shadow-2xl z-[80] overflow-hidden border border-zinc-200 dark:border-zinc-800"
      >
        <div className="flex justify-between items-center p-4 border-b border-zinc-200 dark:border-zinc-800/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center">
              <CheckSquare className="w-4 h-4 text-white" />
            </div>
            <h2 className="font-bold text-lg tracking-tight">uSafe Slate</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="h-[400px] relative">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center"
              >
                <div className="flex gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-500/20 flex flex-col items-center justify-center text-blue-600 dark:text-blue-400">
                    <CheckSquare className="w-8 h-8 mb-1" />
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-500/20 flex flex-col items-center justify-center text-rose-600 dark:text-rose-400 mt-4">
                    <Calendar className="w-8 h-8 mb-1" />
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-500/20 flex flex-col items-center justify-center text-amber-600 dark:text-amber-400">
                    <FileText className="w-8 h-8 mb-1" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">What is Slate?</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Slate is our native, fully encrypted productivity suite. It combines your <strong>Todos</strong>, <strong>Calendar</strong>, and <strong>Notes</strong> into one seamless, unified environment.
                </p>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-500 flex items-center justify-center text-white mb-6 shadow-lg shadow-violet-500/30">
                  <Sparkles className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">The Daily Digest</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                  Start your day right. Slate compiles your schedule, pending tasks, and recent notes into a smart Daily Digest, giving you perfect clarity before you even read a message.
                </p>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700/50 flex flex-col gap-2">
                  <div className="h-2 w-1/3 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
                  <div className="h-2 w-full bg-zinc-300 dark:bg-zinc-700 rounded-full" />
                  <div className="h-2 w-2/3 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center"
              >
                <div className="relative mb-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center p-1 shadow-xl shadow-purple-500/30">
                    <img src="https://i.pravatar.cc/150?u=aura" alt="Aura" className="w-full h-full rounded-full border-4 border-white dark:border-[#121214] object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white dark:bg-[#121214] p-1 rounded-full">
                    <div className="bg-violet-500 w-8 h-8 rounded-full flex items-center justify-center text-white">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">Supercharged by Aura</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  You can command Slate directly through chat. Say <span className="italic">"Aura, add a reminder to call Mom tomorrow"</span> or <span className="italic">"Summarize my meeting notes"</span>. Aura handles the rest.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800/60 bg-zinc-50 dark:bg-[#09090b] flex justify-between items-center shrink-0">
          <div className="flex gap-2">
            <div className={`w-2 h-2 rounded-full transition-all ${step === 0 ? 'bg-violet-500 w-6' : 'bg-zinc-300 dark:bg-zinc-700'}`} />
            <div className={`w-2 h-2 rounded-full transition-all ${step === 1 ? 'bg-violet-500 w-6' : 'bg-zinc-300 dark:bg-zinc-700'}`} />
            <div className={`w-2 h-2 rounded-full transition-all ${step === 2 ? 'bg-violet-500 w-6' : 'bg-zinc-300 dark:bg-zinc-700'}`} />
          </div>
          <button 
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-full transition-all active:scale-95"
          >
            {step === 2 ? (
              <>Got it <Check className="w-4 h-4" /></>
            ) : (
              <>Next <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </motion.div>
    </>
  );
};
