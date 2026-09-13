// packages/web-app/src/components/chat/NewMessagesDivider.tsx
import React from 'react';

export interface NewMessagesDividerProps {
  count?: number;
}

export const NewMessagesDivider: React.FC<NewMessagesDividerProps> = ({ count }) => {
  return (
    <div data-component="NewMessagesDivider" className="flex items-center gap-3 my-6 px-4">
      <div className="flex-1 h-px bg-violet-500/20 dark:bg-violet-500/30"></div>
      <div className="flex items-center gap-2">
        <span className="px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-500/20 border border-violet-200 dark:border-violet-500/30 text-violet-700 dark:text-violet-400 text-[11px] font-bold uppercase tracking-widest shadow-sm">
          {count ? `${count} New Messages` : 'New Messages'}
        </span>
      </div>
      <div className="flex-1 h-px bg-violet-500/20 dark:bg-violet-500/30"></div>
    </div>
  );
};
