'use server';

// import { getPayload } from 'payload';
// import configPromise from '@payload-config';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function inviteStaff(formData: FormData) {
  const email = String(formData.get('email') || '').toLowerCase().trim();
  const role = String(formData.get('role') || 'technician');
  const firstName = String(formData.get('firstName') || '').trim();
  const lastName = String(formData.get('lastName') || '').trim();

  try {
  } catch (error) {
    console.error('Invite Error:', error);
    throw new Error('Failed to create staff invite');
  }

  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
}

export async function getUsers() {
  return [];
}
