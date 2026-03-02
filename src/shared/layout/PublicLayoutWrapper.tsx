'use client';

import React, { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/shared/layout/Header';
import Footer from '@/shared/layout/Footer';
import ScrollSaver from '@/shared/layout/ScrollSaver';
import PageTransition from '@/shared/layout/PageTransition';

export default function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Dashboard routes have their own entirely separate layout (Sidebar, Topbar, etc)
    const isDashboard = pathname ? pathname.includes('/dashboard') : false;

    if (isDashboard) {
        return <>{children}</>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-background text-primary">
            <ScrollSaver />
            <Suspense fallback={<div className="h-20 border-b border-white/10 bg-midnight-slate/90" />}>
                <Header />
            </Suspense>
            <main className="flex-grow relative">
                <PageTransition>
                    {children}
                </PageTransition>
            </main>
            <Footer />
        </div>
    );
}
