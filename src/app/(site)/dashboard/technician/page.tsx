import React from 'react';
// import { getPayload } from 'payload';
// import configPromise from '@/payload.config';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSessionSafe } from '@/lib/get-session-safe';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function TechnicianDashboard() {
  const headerList = await headers();
  const session = await getSessionSafe(headerList);

  if (!session) {
    redirect('/login');
  }

  // Mock data until Hono API is ready
  const user = { id: 'mock', name: session.user?.name || 'Technician', role: 'technician' };
  const assignedJobs: any[] = [];

  return (
    <div className="min-h-screen bg-midnight-slate text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
          <div>
            <div className="text-[#f1c40f] font-mono text-sm uppercase tracking-widest mb-2">Technician Portal</div>
            <h1 className="text-4xl font-black">Field Operations</h1>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-xl font-bold">{user.name}</div>
            <div className="text-gray-400 text-sm">Unit ID: {String(user.id).substring(0, 8)}</div>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid gap-6">
          {assignedJobs.length === 0 ? (
            <div className="bg-white/5 rounded-2xl p-12 text-center border border-white/10">
              <div className="text-2xl font-bold text-gray-400 mb-2">No Active Assignments</div>
              <p className="text-gray-500">You&apos;re currently clear. Stand by for dispatch.</p>
            </div>
          ) : (
            assignedJobs.map((job: any) => (
              <div key={job.id} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-[#f1c40f]/50 transition-colors group">
                <p>{job.issueDescription}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}