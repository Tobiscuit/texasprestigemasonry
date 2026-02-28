'use server';

// import { getPayload } from 'payload';
// import configPromise from '@payload-config';
import { revalidatePath } from 'next/cache';

export async function getSettings() {
  // TODO: Replace with Hono API call
  return {
    companyName: 'Texas Prestige Masonry',
    phone: '',
    email: '',
    licenseNumber: '',
    insuranceAmount: '',
    bbbRating: '',
    missionStatement: '',
    stats: [],
    values: [],
    brandVoice: '',
    brandTone: '',
    brandAvoid: '',
    themePreference: 'candlelight' as const,
    warranty: {
      enableNotifications: false,
      notificationEmailTemplate: '',
    },
  };
}

export async function updateSettings(formData: FormData) {
  const companyName = formData.get('companyName') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;

  try {
    console.log('Mock update settings:', { companyName, phone, email });
    revalidatePath('/dashboard/settings');
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error('Update Settings Error:', error);
    throw new Error('Failed to update settings');
  }
}
