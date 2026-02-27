'use client';
import React from 'react';

export function ChatInterface({ threadId, messages, ...props }: any) {
  return (
    <div className="bg-[var(--staff-surface)] rounded-xl p-6 border border-[var(--staff-border)]">
      <p className="text-[var(--staff-muted)]">Chat interface - stub component (will be connected to Hono API)</p>
    </div>
  );
}

export default ChatInterface;
