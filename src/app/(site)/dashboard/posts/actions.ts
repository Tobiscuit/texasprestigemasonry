'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

export async function createPost(prevState: any, formData: FormData) {
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string || title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const category = formData.get('category') as string;
  const status = formData.get('status') as string;
  const quickNotes = formData.get('quickNotes') as string;
  const publishedAt = formData.get('publishedAt') as string;
  const keywordsString = formData.get('keywords') as string;

  const res = await fetch(`${API_BASE}/api/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title, slug, excerpt, content, category, status,
      quickNotes, publishedAt,
      keywords: keywordsString || null,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    return { error: err.error || 'Failed to create post' };
  }

  revalidatePath('/dashboard/posts');
  revalidatePath('/blog');
  redirect('/dashboard/posts');
}

export async function updatePost(id: string, prevState: any, formData: FormData) {
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const category = formData.get('category') as string;
  const status = formData.get('status') as string;
  const quickNotes = formData.get('quickNotes') as string;
  const publishedAt = formData.get('publishedAt') as string;
  const keywordsString = formData.get('keywords') as string;

  const res = await fetch(`${API_BASE}/api/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title, slug, excerpt, content, category, status,
      quickNotes, publishedAt,
      keywords: keywordsString || null,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    return { error: err.error || 'Failed to update post' };
  }

  revalidatePath('/dashboard/posts');
  redirect('/dashboard/posts');
}

export async function getPostById(id: string) {
  const res = await fetch(`${API_BASE}/api/posts/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export async function getPosts() {
  const res = await fetch(`${API_BASE}/api/posts`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}
