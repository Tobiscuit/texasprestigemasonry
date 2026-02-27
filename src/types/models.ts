/**
 * Application Model Types
 * 
 * Derived from the Drizzle ORM schema (src/db/schema.ts).
 * These types represent the shape of data returned from the database.
 * 
 * Uses Drizzle's InferSelectModel to ensure types stay in sync with the schema.
 */

import type { InferSelectModel } from 'drizzle-orm';
import {
  users,
  services,
  projects,
  serviceRequests,
  posts,
  testimonials,
  invoices,
  payments,
} from '@/db/schema';

// ─── Core Model Types (derived from Drizzle schema) ──────────────────────

export type User = InferSelectModel<typeof users>;
export type Service = InferSelectModel<typeof services>;
export type Project = InferSelectModel<typeof projects>;
export type ServiceRequest = InferSelectModel<typeof serviceRequests>;
export type Post = InferSelectModel<typeof posts>;
export type Testimonial = InferSelectModel<typeof testimonials>;
export type Invoice = InferSelectModel<typeof invoices>;
export type Payment = InferSelectModel<typeof payments>;

// ─── Parsed JSON Sub-types ──────────────────────────────────────────────
// These describe the shape of JSON-stringified fields in the schema.

export interface ProjectStat {
  label: string;
  value: string;
}

export interface GalleryItem {
  image: string;
  caption?: string;
}

export interface ServiceFeature {
  feature: string;
}

export interface PostKeyword {
  keyword: string;
}

// ─── Hydrated Types (with parsed JSON fields) ───────────────────────────
// Use these when JSON fields have been parsed from their string storage.

export interface HydratedProject extends Omit<Project, 'gallery' | 'tags' | 'stats'> {
  gallery: GalleryItem[];
  tags: string[];
  stats: ProjectStat[];
}

export interface HydratedService extends Omit<Service, 'features'> {
  features: ServiceFeature[];
}

export interface HydratedPost extends Omit<Post, 'keywords'> {
  keywords: PostKeyword[];
}

// ─── Email Types (not in Drizzle yet, will be added later) ──────────────

export interface EmailThread {
  id: string;
  subject: string;
  status: string;
  lastMessageAt: string;
}

export interface EmailMessage {
  id: string;
  from: string;
  to: string;
  bodyRaw: string;
  createdAt: string;
  direction: 'inbound' | 'outbound';
}

export interface ThreadDetail {
  thread: EmailThread;
  messages: EmailMessage[];
}

// ─── Media Type (not in Drizzle yet, will be added later) ───────────────

export interface Media {
  id: string;
  url: string;
  alt: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width?: number;
  height?: number;
  createdAt: string;
  updatedAt: string;
}
