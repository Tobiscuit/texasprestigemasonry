'use client';
import React from 'react';

export default function SettingsForm({ settings, initialData, ...props }: any) {
  return (
    <div className="bg-[var(--staff-surface)] rounded-xl p-6 border border-[var(--staff-border)]">
      <p className="text-[var(--staff-muted)]">Settings form - stub component (will be connected to Hono API)</p>
    </div>
  );
}
