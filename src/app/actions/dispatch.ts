'use server';

// import { getPayload } from 'payload';
// import configPromise from '@payload-config';
import webpush from 'web-push';

// Configure Web Push (Move to global config if used elsewhere)
try {
    if (process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
        webpush.setVapidDetails(
            'mailto:admin@mobilegaragedoor.com',
            process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
            process.env.VAPID_PRIVATE_KEY
        );
    } else {
        console.warn('VAPID Keys missing - Push Notifications disabled');
    }
} catch (err) {
    console.error('Error configuring Web Push:', err);
}

export async function assignJobToTechnician(jobId: string, technicianId: string) {
    try {
        // Stub: Replace with API request
        console.log(`Job ${jobId} assigned to Tech ${technicianId}. (Mocked)`);

        return { success: true };

    } catch (error) {
        console.error('Error assigning job:', error);
        return { success: false, error: 'Failed to assign job' };
    }
}
