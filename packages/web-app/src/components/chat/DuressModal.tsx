import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldAlert, Lock, Fingerprint, EyeOff, CheckCircle } from 'lucide-react';

export interface DuressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DuressModal: React.FC<DuressModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [masterPin, setMasterPin] = useState('');
  const [decoyPin, setDecoyPin] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setSaving(true);
    // Simulate backend save
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => {
        onClose();
        setStep(1);
        setSaved(false);
        setMasterPin('');
        setDecoyPin('');
      }, 1500);
    }, 1500);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 dark:bg-black/80 backdrop-blur-sm z-[60]" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-white dark:bg-[#121214] rounded-2xl shadow-2xl z-[70] overflow-hidden border border-zinc-200 dark:border-zinc-800"
      >
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            <h2 className="font-bold text-lg">Duress SOS Setup</h2>
          </div>
          <button onClick={onClose} className="p-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center text-red-600 dark:text-red-500">
                    <Lock className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-center font-bold text-xl mb-2">Configure Master PIN</h3>
                <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                  Your Master PIN is your primary unlock code. It decrypts your real unified profile and keys.
                </p>
                <input 
                  type="password" 
                  maxLength={6}
                  placeholder="Enter 6-digit Master PIN"
                  value={masterPin}
                  onChange={(e) => setMasterPin(e.target.value)}
                  className="w-full text-center text-2xl tracking-[0.5em] p-4 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl mb-6 outline-none focus:ring-2 focus:ring-violet-500/50 font-mono"
                />
                <button 
                  disabled={masterPin.length < 4}
                  onClick={() => setStep(2)}
                  className="w-full py-3 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white rounded-xl font-bold transition-all"
                >
                  Next Step
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-500/20 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-500">
                    <EyeOff className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-center font-bold text-xl mb-2">Set Decoy PIN</h3>
                <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                  If coerced, enter this PIN instead. It will open a decoy state, hide secure chats, and ping telemetry contacts silently.
                </p>
                <input 
                  type="password" 
                  maxLength={6}
                  placeholder="Enter 6-digit Decoy PIN"
                  value={decoyPin}
                  onChange={(e) => setDecoyPin(e.target.value)}
                  className="w-full text-center text-2xl tracking-[0.5em] p-4 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl mb-6 outline-none focus:ring-2 focus:ring-orange-500/50 font-mono"
                />
                
                {saved ? (
                  <button disabled className="w-full py-3 bg-green-500 text-white rounded-xl font-bold flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" /> Saved & Active
                  </button>
                ) : (
                  <button 
                    disabled={decoyPin.length < 4 || decoyPin === masterPin || saving}
                    onClick={handleSave}
                    className="w-full py-3 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white rounded-xl font-bold transition-all flex justify-center items-center gap-2"
                  >
                    {saving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Activate Duress Mode'}
                  </button>
                )}
                
                {decoyPin === masterPin && decoyPin.length > 0 && (
                  <p className="text-red-500 text-xs text-center mt-2 font-medium">Decoy PIN cannot match Master PIN.</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};
