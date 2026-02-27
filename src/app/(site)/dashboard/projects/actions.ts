'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

export async function createProject(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const challenge = formData.get('challenge') as string;
  const solution = formData.get('solution') as string;
  const client = formData.get('client') as string;
  const location = formData.get('location') as string;
  const completionDate = formData.get('completionDate') as string;
  const galleryStr = formData.get('gallery') as string;

  const res = await fetch(`${API_BASE}/api/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title, description, challenge, solution,
      client, location, completionDate,
      gallery: galleryStr || null,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    return { error: err.error || 'Failed to create project' };
  }

  revalidatePath('/dashboard/projects');
  redirect('/dashboard/projects');
}

export async function updateProject(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const challenge = formData.get('challenge') as string;
  const solution = formData.get('solution') as string;
  const client = formData.get('client') as string;
  const location = formData.get('location') as string;
  const completionDate = formData.get('completionDate') as string;
  const galleryStr = formData.get('gallery') as string;

  const res = await fetch(`${API_BASE}/api/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title, description, challenge, solution,
      client, location, completionDate,
      gallery: galleryStr || null,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    return { error: err.error || 'Failed to update project' };
  }

  revalidatePath('/dashboard/projects');
  redirect('/dashboard/projects');
}

export async function getProjectById(id: string) {
  const res = await fetch(`${API_BASE}/api/projects/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export async function getProjects() {
  const res = await fetch(`${API_BASE}/api/projects`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}
