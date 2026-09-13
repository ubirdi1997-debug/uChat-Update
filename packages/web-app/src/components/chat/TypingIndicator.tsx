// packages/web-app/src/components/chat/TypingIndicator.tsx
import React from 'react';

export const TypingIndicator: React.FC = () => {
  return (
    <div data-component="TypingIndicator" className="flex items-center gap-1 px-1 py-1">
      <div className="w-1.5 h-1.5 bg-violet-500/70 dark:bg-violet-400/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-1.5 h-1.5 bg-violet-500/70 dark:bg-violet-400/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-1.5 h-1.5 bg-violet-500/70 dark:bg-violet-400/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );
};
