'use client';
import React from 'react';

export default function PostForm({ post, action, initialData, buttonLabel, ...props }: any) {
  return (
    <div className="bg-[var(--staff-surface)] rounded-xl p-6 border border-[var(--staff-border)]">
      <p className="text-[var(--staff-muted)]">Post form - stub component (will be connected to Hono API)</p>
    </div>
  );
}
