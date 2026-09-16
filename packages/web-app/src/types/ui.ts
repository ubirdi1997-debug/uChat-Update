// packages/web-app/src/types/ui.ts

export type SourcePlatform = 'uchat' | 'whatsapp' | 'signal' | 'telegram' | 'gmail' | 'sms';

export interface ConversationItem {
  id: string;
  contactName: string;
  avatarUrl: string;
  platform: SourcePlatform;
  lastSnippet: string;
  timestamp: string;
  unreadCount: number;
  isPinned: boolean;
  isOnline: boolean;
  isVerified?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  isMe: boolean;
  text: string;
  timestamp: string;
  platform: SourcePlatform;
  status?: 'sent' | 'delivered' | 'read';
  isUnread?: boolean;
  mediaType: 'none' | 'image' | 'audio' | 'gmail_card' | 'security_nudge' | 'duress_setup' | 'sticker' | 'aura_suggestion';
  qrPayload?: QRPayload;
  gmailPayload?: GmailCardData;
  audioWaveformMock?: number[];
  audioDuration?: string;
  transcription?: string;
  isTranscriptionVisible?: boolean;
  stickerUrl?: string;
  detectedLanguage?: string;
  translation?: string;
  quickReplies?: string[];
  nudgeData?: {
    type: 'privacy' | 'security' | 'duress' | 'productivity';
    title: string;
    description: string;
    actionLabel: string;
    isCompleted?: boolean;
  };
  reactions?: string[];
}

export interface GmailCardData {
  senderEmail: string;
  dkimVerified: boolean;
  spfVerified: boolean;
  subject: string;
  aiSummary: string;
  snippet: string;
  detectedOtp?: string;
  threadCount: number;
}

export interface QRPayload {
  type: 'upi' | 'url' | 'wifi' | 'text';
  title: string;
  actionLabel: string;
  rawData: string;
}
