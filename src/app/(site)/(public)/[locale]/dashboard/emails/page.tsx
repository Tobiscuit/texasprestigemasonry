import React from 'react';
import Link from 'next/link';
import { getEmailThreads } from './actions';
import EmailsTableClient from './EmailsTableClient';

export const dynamic = 'force-dynamic';

export default async function EmailsPage() {
  const threads = await getEmailThreads();

  return (
    <div className="animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/dashboard" className="text-[var(--staff-muted)] hover:text-[#f1c40f] text-sm font-bold uppercase tracking-widest transition-colors">
              Command Center
            </Link>
            <span className="text-[var(--staff-border)]">/</span>
            <span className="text-[#f1c40f] text-sm font-bold uppercase tracking-widest">
              Communication
            </span>
          </div>
          <h1 className="text-4xl font-black text-[var(--staff-text)]">Inbox</h1>
        </div>
      </div>

      {/* DATA TABLE */}
      <EmailsTableClient threads={threads} />
    </div>
  );
}
