'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

export async function createTestimonial(formData: FormData) {
  const quote = formData.get('quote') as string;
  const author = formData.get('author') as string;
  const location = formData.get('location') as string;
  const rating = parseInt(formData.get('rating') as string, 10) || 5;
  const featured = formData.get('featured') === 'on';

  const res = await fetch(`${API_BASE}/api/testimonials`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quote, author, location, rating, featured }),
  });

  if (!res.ok) {
    const err = await res.json();
    return { error: err.error || 'Failed to create testimonial' };
  }

  revalidatePath('/dashboard/testimonials');
  redirect('/dashboard/testimonials');
}

export async function updateTestimonial(id: string, formData: FormData) {
  const quote = formData.get('quote') as string;
  const author = formData.get('author') as string;
  const location = formData.get('location') as string;
  const rating = parseInt(formData.get('rating') as string, 10) || 5;
  const featured = formData.get('featured') === 'on';

  const res = await fetch(`${API_BASE}/api/testimonials/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quote, author, location, rating, featured }),
  });

  if (!res.ok) {
    const err = await res.json();
    return { error: err.error || 'Failed to update testimonial' };
  }

  revalidatePath('/dashboard/testimonials');
  redirect('/dashboard/testimonials');
}

export async function getTestimonialById(id: string) {
  const res = await fetch(`${API_BASE}/api/testimonials/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export async function getTestimonials() {
  const res = await fetch(`${API_BASE}/api/testimonials`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}
