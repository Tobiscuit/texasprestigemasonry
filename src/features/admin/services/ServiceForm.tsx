'use client';
import React from 'react';

export default function ServiceForm({ service, initialData, isEdit, ...props }: any) {
  return (
    <div className="bg-[var(--staff-surface)] rounded-xl p-6 border border-[var(--staff-border)]">
      <p className="text-[var(--staff-muted)]">Service form - stub component (will be connected to Hono API)</p>
    </div>
  );
}
