'use server';

import { revalidatePath } from 'next/cache';

const API_BASE = process.env.NEXT_PUBLIC_SERVER_URL || '';

export async function getSettings() {
  try {
    const res = await fetch(`${API_BASE}/api/settings`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch settings');
    return await res.json();
  } catch (error) {
    console.error('getSettings error:', error);
    // Return defaults if API fails
    return {
      companyName: 'Texas Prestige Masonry',
      phone: '',
      email: '',
      licenseNumber: '',
      insuranceAmount: '',
      bbbRating: '',
      missionStatement: '',
      brandVoice: '',
      brandTone: '',
      brandAvoid: '',
      themePreference: 'candlelight',
    };
  }
}

export async function updateSettings(formData: FormData) {
  const body: Record<string, string> = {};
  formData.forEach((value, key) => {
    body[key] = value as string;
  });

  try {
    const res = await fetch(`${API_BASE}/api/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error('Failed to save settings');

    revalidatePath('/dashboard/settings');
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error('Update Settings Error:', error);
    throw new Error('Failed to update settings');
  }
}
