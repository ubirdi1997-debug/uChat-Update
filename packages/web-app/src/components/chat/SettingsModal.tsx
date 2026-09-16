import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Lock, Eye, Bell, Monitor, Smartphone, Settings2, ShieldAlert, Key, Globe, EyeOff, FileDigit, SmartphoneNfc, Server, Zap, Compass, Share2, ChevronRight, Calendar, Sparkles } from 'lucide-react';
import { ConnectionModal, BridgePlatform } from './ConnectionModal';
import { DuressModal } from './DuressModal';

export interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  showPreciseTimestamps: boolean;
  setShowPreciseTimestamps: (v: boolean) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, showPreciseTimestamps, setShowPreciseTimestamps }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'privacy' | 'bridges' | 'ai' | 'ulocate'>('profile');
  const [managingBridge, setManagingBridge] = useState<BridgePlatform | null>(null);
  const [showDuressModal, setShowDuressModal] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 dark:bg-black/60 z-50 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.95 }}
        className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[800px] md:h-[600px] bg-white dark:bg-[#121214] rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col md:flex-row border border-zinc-200 dark:border-zinc-800/60"
      >
        {/* Sidebar */}
        <div className="md:w-64 bg-zinc-50 dark:bg-[#09090b] border-r border-zinc-200 dark:border-zinc-800/60 flex flex-col">
          <div className="p-6 pb-2">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Settings</h2>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
            <TabButton active={activeTab === 'profile'} onClick={() => { setActiveTab('profile'); setManagingBridge(null); }} icon={<Globe />} label="Unified Profile" />
            <div className="h-px bg-zinc-200 dark:bg-zinc-800/60 my-2 mx-2" />
            <TabButton active={activeTab === 'security'} onClick={() => { setActiveTab('security'); setManagingBridge(null); }} icon={<ShieldAlert />} label="Account & Security" />
            <TabButton active={activeTab === 'privacy'} onClick={() => { setActiveTab('privacy'); setManagingBridge(null); }} icon={<EyeOff />} label="Privacy & Anti-Tracking" />
            <TabButton active={activeTab === 'bridges'} onClick={() => { setActiveTab('bridges'); setManagingBridge(null); }} icon={<Share2 />} label="Multi-Protocol Bridges" />
            <TabButton active={activeTab === 'ai'} onClick={() => { setActiveTab('ai'); setManagingBridge(null); }} icon={<Zap />} label="Edge AI & Compute" />
            <TabButton active={activeTab === 'ulocate'} onClick={() => { setActiveTab('ulocate'); setManagingBridge(null); }} icon={<Compass />} label="uLocate Telemetry" />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-white dark:bg-[#121214] text-zinc-900 dark:text-zinc-100">
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800/60 flex justify-between items-center shrink-0">
            <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">{getTabTitle(activeTab)}</h3>
            <button onClick={onClose} className="p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {activeTab === 'profile' && <ProfileTab />}
            {activeTab === 'security' && <SecurityTab onConfigureDuress={() => setShowDuressModal(true)} />}
            {activeTab === 'privacy' && <PrivacyTab showPreciseTimestamps={showPreciseTimestamps} setShowPreciseTimestamps={setShowPreciseTimestamps} />}
            {activeTab === 'bridges' && <BridgesTab setManagingBridge={setManagingBridge} />}
            {activeTab === 'ai' && <AITab />}
            {activeTab === 'ulocate' && <ULocateTab />}
          </div>
        </div>
      </motion.div>
      <ConnectionModal isOpen={!!managingBridge} platform={managingBridge} onClose={() => setManagingBridge(null)} />
      <DuressModal isOpen={showDuressModal} onClose={() => setShowDuressModal(false)} />
    </>
  );
};

const TabButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-colors ${
      active 
        ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400' 
        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-100'
    }`}
  >
    {React.cloneElement(icon as React.ReactElement, { className: 'w-4 h-4' })}
    {label}
  </button>
);

const getTabTitle = (tab: string) => {
  switch (tab) {
    case 'profile': return 'Unified Profile Identity (account.usafe.in)';
    case 'security': return 'Account & Security';
    case 'privacy': return 'Privacy & Anti-Tracking';
    case 'bridges': return 'Multi-Protocol Bridges';
    case 'ai': return 'Edge AI & Compute Mesh';
    case 'ulocate': return 'uLocate & Spatial Telemetry';
    default: return 'Settings';
  }
};

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="space-y-4">
    <h4 className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">{title}</h4>
    <div className="space-y-3">
      {children}
    </div>
  </div>
);

const SettingRow = ({ icon, title, description, action }: { icon?: React.ReactNode, title: string, description?: string, action?: React.ReactNode }) => (
  <div className="flex items-start justify-between gap-4 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-[#1a1a1c]/50">
    <div className="flex gap-3">
      {icon && <div className="mt-0.5 text-zinc-500">{React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5' })}</div>}
      <div>
        <div className="font-bold text-[14px] text-zinc-900 dark:text-zinc-100">{title}</div>
        {description && <div className="text-[12px] text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">{description}</div>}
      </div>
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);

const Toggle = ({ active, onClick }: { active: boolean, onClick?: () => void }) => (
  <div onClick={onClick} className={`w-10 h-6 rounded-full p-1 transition-colors cursor-pointer ${active ? 'bg-violet-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}>
    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${active ? 'translate-x-4' : 'translate-x-0'}`} />
  </div>
);

const Button = ({ children, variant = 'secondary', onClick }: { children: React.ReactNode, variant?: 'primary' | 'secondary' | 'danger', onClick?: () => void }) => (
  <button onClick={onClick} className={`px-4 py-2 rounded-full text-xs font-bold transition-transform active:scale-95 ${
    variant === 'primary' ? 'bg-violet-600 text-white hover:bg-violet-700' :
    variant === 'danger' ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 hover:bg-rose-200' :
    'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700'
  }`}>
    {children}
  </button>
);

const ProfileTab = () => (
  <>
    <Section title="Public Identity Persona">
      <SettingRow 
        icon={<Globe />} 
        title="Global ID & Avatar" 
        description="UUIDv7: 018b8...4a2b • usafe.in email tied to identity." 
        action={<Button>Edit</Button>} 
      />
      <SettingRow 
        icon={<FileDigit />} 
        title="Global QR Code (ML-KEM-768)" 
        description="Contains public key for instant P2P pairing." 
        action={<Button>Show QR</Button>} 
      />
    </Section>
    <Section title="Authentication & Passkeys (WebAuthn)">
      <SettingRow 
        icon={<Key />} 
        title="Register Authenticators" 
        description="Add hardware keys (YubiKey) or biometric (TouchID, Windows Hello)." 
        action={<Button variant="primary">Add Key</Button>} 
      />
    </Section>
    <Section title="Active Sessions (Universal SSO)">
      <SettingRow 
        icon={<Monitor />} 
        title="Current Session" 
        description="IP: 192.168.1.1 • Web PWA Client" 
      />
      <SettingRow 
        icon={<Smartphone />} 
        title="Mobile Device" 
        description="IP: 10.0.0.4 • Kite Browser App" 
        action={<Button variant="danger">Revoke</Button>} 
      />
      <SettingRow 
        title="Global Kill Switch" 
        description="Instantly revoke all active refresh tokens globally." 
        action={<Button variant="danger">Kill All</Button>} 
      />
    </Section>
    <Section title="Zero-Knowledge Vault Status">
      <SettingRow 
        icon={<Server />} 
        title="Storage Consumption" 
        description="12.4 MB / 20.0 MB limit used. Encrypted backup." 
        action={<Button>Export WAL</Button>} 
      />
    </Section>
  </>
);

const SecurityTab = ({ onConfigureDuress }: { onConfigureDuress: () => void }) => (
  <>
    <Section title="App Lock">
      <SettingRow title="Biometric / Face ID" description="Require scan after 1 minute of inactivity." action={<Toggle active={true} />} />
    </Section>
    <Section title="Duress SOS System">
      <SettingRow 
        icon={<Lock />} 
        title="Master vs. Decoy PIN" 
        description="Define a secondary PIN that triggers the anti-coercion state." 
        action={<Button onClick={onConfigureDuress}>Configure</Button>} 
      />
      <SettingRow 
        title="Decoy AI Generation" 
        description="Auto-populate inbox with synthetic mundane conversations when Duress PIN is entered." 
        action={<Toggle active={true} />} 
      />
      <SettingRow 
        title="Telemetry Contacts" 
        description="Select trusted public keys for 30s GPS pings and 15m ambient audio in Duress Mode." 
        action={<Button>Select</Button>} 
      />
    </Section>
    <Section title="Security Notifications">
      <SettingRow title="Cryptographic Key Changes" description="Alert when a contact's key changes to prevent Adversary-in-the-Middle attacks." action={<Toggle active={true} />} />
    </Section>
  </>
);

const PrivacyTab = ({ showPreciseTimestamps, setShowPreciseTimestamps }: { showPreciseTimestamps: boolean, setShowPreciseTimestamps: (v: boolean) => void }) => (
  <>
    <Section title="Visibility Controls">
      <SettingRow title="Last Seen & Online Status" description="Currently set to: Nobody." action={<Button>Change</Button>} />
    </Section>
    <Section title="Messaging Privacy">
      <SettingRow title="Read Receipts" description="Toggle outgoing read status. Disabling prevents you from seeing others." action={<Toggle active={false} />} />
      <SettingRow title="Precise Timestamps" description="Show exact timestamps on every single message bubble." action={<Toggle active={showPreciseTimestamps} onClick={() => setShowPreciseTimestamps(!showPreciseTimestamps)} />} />
      <SettingRow title="Screen Security" description="Block OS-level screenshots and obscure app in recent switcher." action={<Toggle active={true} />} />
      <SettingRow title="Protect IP in Calls" description="Route WebRTC calls through uChat relay servers to hide IP." action={<Toggle active={true} />} />
      <SettingRow title="Default Shredder Timer" description="Universal TTL (Burn-on-Read) for new chats." action={<Button>Off</Button>} />
    </Section>
  </>
);

const BridgesTab = ({ setManagingBridge }: { setManagingBridge: (id: BridgePlatform | null) => void }) => {
  return (
    <>
      <Section title="External Protocol Connections">
        <SettingRow icon={<SmartphoneNfc />} title="WhatsApp Bridge" description="Web Linked Device session. Not connected." action={<Button onClick={() => setManagingBridge('whatsapp')}>Sync</Button>} />
        <SettingRow icon={<Shield />} title="Signal Bridge" description="libsignal identity keys. Not connected." action={<Button onClick={() => setManagingBridge('signal')}>Sync</Button>} />
        <SettingRow icon={<Share2 />} title="Telegram Bridge" description="MTProto API. Not connected." action={<Button onClick={() => setManagingBridge('telegram')}>Sync</Button>} />
        <SettingRow icon={<FileDigit />} title="Gmail / Workspace" description="OAuth scopes. Not connected." action={<Button onClick={() => setManagingBridge('gmail')}>Sync</Button>} />
      </Section>
      <div className="mt-8">
        <Section title="Native Ecosystem Bridges">
          <SettingRow icon={<Sparkles className="text-violet-500" />} title="uMail" description="Unified crypto mail client. Seamless integration." action={<Button onClick={() => setManagingBridge('umail')}>Connect</Button>} />
          <SettingRow icon={<Calendar className="text-violet-500" />} title="Slate" description="Notes, Calendar & Tasks. All-in-one organizer." action={<Button onClick={() => setManagingBridge('slate')}>Connect</Button>} />
          <SettingRow icon={<Lock className="text-violet-500" />} title="uVault" description="Zero-knowledge password & secrets manager." action={<Button onClick={() => setManagingBridge('uvault')}>Connect</Button>} />
        </Section>
      </div>
    </>
  );
};

const AITab = () => (
  <>
    <Section title="Local Inference Engine">
      <SettingRow icon={<Settings2 />} title="Model Selection" description="Currently active: MobileLLM-125M (Quantized Int8) for speed." action={<Button>Change</Button>} />
      <SettingRow title="uClaw Assistant" description="Inline Named Entity Recognition (NER) action chipping (e.g., Dates to Calendar)." action={<Toggle active={true} />} />
    </Section>
    <Section title="P2P Compute Sharing">
      <SettingRow icon={<Zap />} title="Donate Idle Compute" description="Participate in WebRTC mesh to help low-end devices." action={<Toggle active={true} />} />
      <SettingRow title="Hardware Guardrails" description="Only trigger when AC charging, unmetered Wi-Fi, and temp < 38°C." action={<Toggle active={true} />} />
    </Section>
  </>
);

const ULocateTab = () => (
  <>
    <Section title="Geofencing">
      <SettingRow icon={<Compass />} title="Geofence Manager" description="Encrypted radius zones (Home, Office) for homomorphic evaluation." action={<Button>Manage</Button>} />
    </Section>
    <Section title="Kinematic Sensors">
      <SettingRow title="Crash/Fall Detection" description="IMU trigger to initiate a cancelable 15-second SOS countdown." action={<Toggle active={true} />} />
    </Section>
    <Section title="Ambient Broadcast">
      <SettingRow title="Dead-Reckoning Sync" description="Default broadcast frequency during transit." action={<Button>Every 5m</Button>} />
    </Section>
  </>
);
