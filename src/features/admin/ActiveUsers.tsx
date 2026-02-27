'use client';
import React from 'react';

export default function ActiveUsers() {
  return (
    <div className="bg-[var(--staff-surface)] rounded-xl p-4 border border-[var(--staff-border)]">
      <h3 className="text-sm font-bold text-[var(--staff-muted)] uppercase tracking-wider mb-3">Active Users</h3>
      <p className="text-[var(--staff-muted)] text-sm">No active users</p>
    </div>
  );
}
