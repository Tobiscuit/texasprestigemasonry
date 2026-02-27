import React from 'react';
// import { getPayload } from 'payload';
// import configPromise from '@payload-config';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSessionSafe } from '@/lib/get-session-safe';
import TechnicianClient from './TechnicianClient';

export default async function TechnicianPage() {
    const headersList = await headers();
    const session = await getSessionSafe(headersList);

    if (!session) {
        redirect('/login');
    }

    // Mock user until Hono API is ready
    const user = {
        id: session.user?.id || 'mock',
        name: session.user?.name || 'Technician',
        email: session.user?.email || '',
        role: 'technician' as const,
    };

    return <TechnicianClient user={user} />;
}
