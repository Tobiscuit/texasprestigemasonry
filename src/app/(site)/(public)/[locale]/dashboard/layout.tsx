import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSessionSafe } from '@/lib/get-session-safe';
import NativeSignInPrompt from '@/features/auth/NativeSignInPrompt';
import Sidebar from '@/features/admin/Sidebar';
import React from 'react';
import Link from 'next/link';

const ADMIN_ROLES = ['admin', 'technician', 'dispatcher'];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const session = await getSessionSafe(headersList);

  if (!session) {
    redirect('/login');
  }

  // Role-based access control
  const userRole = (session.user as any)?.role;
  if (!userRole || !ADMIN_ROLES.includes(userRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a1a2e] text-white p-6">
        <div className="max-w-md text-center animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-black mb-3">Access Restricted</h1>
          <p className="text-gray-400 mb-8 leading-relaxed">
            This area is reserved for authorized staff. If you believe this is an error,
            contact the site administrator to request access.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f1c40f] text-[#2c3e50] font-bold shadow-[0_4px_20px_rgba(241,196,15,0.3)] hover:shadow-[0_6px_25px_rgba(241,196,15,0.5)] hover:-translate-y-0.5 transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const themePreference: 'candlelight' | 'original' = 'candlelight';
  const isOriginalTheme = themePreference === ('original' as typeof themePreference);

  return (
    <div
      className="min-h-screen font-sans selection:bg-[#f1c40f] selection:text-[#2c3e50]"
      style={{ backgroundColor: 'var(--staff-bg)', color: 'var(--staff-text)' }}
    >
      <NativeSignInPrompt />
      <script
        dangerouslySetInnerHTML={{
          __html:
            `try{var t=localStorage.getItem('app-theme')||'light';document.documentElement.setAttribute('data-app-theme',t);${isOriginalTheme ? "document.documentElement.setAttribute('data-light-theme','original');" : ''}}catch(e){}`,
        }}
      />
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <main className="md:ml-[280px] min-h-screen relative z-0 pb-20 md:pb-0">
        <div className="fixed inset-0 pointer-events-none z-[-1] bg-[radial-gradient(circle_at_top_right,rgba(241,196,15,0.08),transparent_40%)]" />

        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

