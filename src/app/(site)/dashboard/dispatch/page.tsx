// import { getPayload } from 'payload';
// import configPromise from '@/payload.config';
import { DispatchClient } from './DispatchClient';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSessionSafe } from '@/lib/get-session-safe';

export default async function DispatchPage() {
    const headersList = await headers();
    const session = await getSessionSafe(headersList);
    // Mock Data for Dispatch
    const serializedJobs: any[] = [];
    const serializedTechs: any[] = [];

    return (
        <div className="container mx-auto">
            <DispatchClient jobs={serializedJobs} technicians={serializedTechs} />
        </div>
    );
}
