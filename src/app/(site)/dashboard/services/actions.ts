'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

export async function createService(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as string;
  const price = parseFloat(formData.get('price') as string);

  const res = await fetch(`${API_BASE}/api/services`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, category, price }),
  });

  if (!res.ok) {
    const err = await res.json();
    return { error: err.error || 'Failed to create service' };
  }

  revalidatePath('/dashboard/services');
  redirect('/dashboard/services');
}

export async function updateService(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as string;
  const price = parseFloat(formData.get('price') as string);

  const res = await fetch(`${API_BASE}/api/services/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, category, price }),
  });

  if (!res.ok) {
    const err = await res.json();
    return { error: err.error || 'Failed to update service' };
  }

  revalidatePath('/dashboard/services');
  redirect('/dashboard/services');
}

export async function getServiceById(id: string) {
  const res = await fetch(`${API_BASE}/api/services/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export async function getServices() {
  const res = await fetch(`${API_BASE}/api/services`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}
