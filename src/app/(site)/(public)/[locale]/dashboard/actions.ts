'use server';

import { revalidatePath } from 'next/cache';

const API_BASE = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

export async function getDashboardStats() {
  // Fetch real counts from the Hono API
  try {
    const [projectsRes, servicesRes, postsRes, testimonialsRes, usersRes] = await Promise.all([
      fetch(`${API_BASE}/api/projects`, { cache: 'no-store' }),
      fetch(`${API_BASE}/api/services`, { cache: 'no-store' }),
      fetch(`${API_BASE}/api/posts`, { cache: 'no-store' }),
      fetch(`${API_BASE}/api/testimonials`, { cache: 'no-store' }),
      fetch(`${API_BASE}/api/users`, { cache: 'no-store' }),
    ]);

    const projects = projectsRes.ok ? await projectsRes.json() : [];
    const services = servicesRes.ok ? await servicesRes.json() : [];
    const posts = postsRes.ok ? await postsRes.json() : [];
    const testimonials = testimonialsRes.ok ? await testimonialsRes.json() : [];
    const users = usersRes.ok ? await usersRes.json() : [];

    const publishedPosts = Array.isArray(posts) ? posts.filter((p: any) => p.status === 'published') : [];
    const featuredTestimonials = Array.isArray(testimonials) ? testimonials.filter((t: any) => t.featured) : [];

    return {
      revenue: {
        lifetime: 0,
        monthly: 0,
        weekly: 0,
        today: 0,
      },
      jobs: {
        active: Array.isArray(projects) ? projects.length : 0,
        pending: Array.isArray(posts) ? posts.filter((p: any) => p.status === 'draft').length : 0,
        total: (Array.isArray(projects) ? projects.length : 0) + (Array.isArray(services) ? services.length : 0),
      },
      technicians: {
        total: Array.isArray(users) ? users.length : 0,
        online: 0,
      },
      // Extended stats for future KPI usage
      content: {
        projects: Array.isArray(projects) ? projects.length : 0,
        services: Array.isArray(services) ? services.length : 0,
        posts: Array.isArray(posts) ? posts.length : 0,
        publishedPosts: publishedPosts.length,
        testimonials: Array.isArray(testimonials) ? testimonials.length : 0,
        featuredTestimonials: featuredTestimonials.length,
      },
    };
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error);
    return {
      revenue: { lifetime: 0, monthly: 0, weekly: 0, today: 0 },
      jobs: { active: 0, pending: 0, total: 0 },
      technicians: { total: 0, online: 0 },
      content: { projects: 0, services: 0, posts: 0, publishedPosts: 0, testimonials: 0, featuredTestimonials: 0 },
    };
  }
}

export async function createManualPayment(amount: number, sourceType: 'CASH' | 'EXTERNAL', note: string) {
  try {
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Manual Payment Error:', error);
    return { success: false, error: 'Failed to record payment' };
  }
}

export async function syncSquarePayments() {
  try {
    revalidatePath('/dashboard');
    return { success: true, count: 0 };
  } catch (error: any) {
    return { success: false, error: 'Failed to sync payments' };
  }
}

export async function resetAndSyncSquarePayments() {
  try {
    revalidatePath('/dashboard');
    return { success: true, count: 0 };
  } catch (error: any) {
    console.error('Reset Sync Error:', error);
    return { success: false, error: error.message };
  }
}

export async function getRecentPayments(limit = 20) {
  return [];
}

export async function getActiveJobsList() {
  try {
    return [];
  } catch (error) {
    console.error('Error fetching active jobs:', error);
    return [];
  }
}

export async function getTechnicianStatusList() {
  try {
    return [];
  } catch (error) {
    console.error('Error fetching technicians:', error);
    return [];
  }
}

export async function getRecentTechnicians(limit = 5) {
  try {
    return [];
  } catch (error) {
    console.error('Error fetching recent technicians:', error);
    return [];
  }
}
