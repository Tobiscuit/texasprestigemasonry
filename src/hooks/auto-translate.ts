/**
 * Auto-translate hook - previously a Payload afterChange hook.
 * Stubbed out during Payload removal. Will be re-implemented
 * as a Hono middleware or Drizzle hook once the new API is ready.
 */

// Removed: import type { CollectionAfterChangeHook } from 'payload';
import { translate, translateLexicalTree, translateArray } from '@/lib/translate-utils';

// Field definitions per collection (preserved for future use)
const COLLECTION_FIELDS: Record<string, {
  textFields?: Array<{ name: string; context: string }>;
  richTextFields?: string[];
  htmlFields?: Array<{ name: string; context: string }>;
  arrayFields?: Array<{ name: string; fieldMap: Record<string, string> }>;
}> = {
  projects: {
    textFields: [
      { name: 'title', context: 'project title' },
      { name: 'client', context: 'client type description' },
    ],
    richTextFields: ['description', 'challenge', 'solution'],
    htmlFields: [
      { name: 'htmlDescription', context: 'project case study HTML content' },
      { name: 'htmlChallenge', context: 'project challenge HTML content' },
      { name: 'htmlSolution', context: 'project solution HTML content' },
    ],
    arrayFields: [
      { name: 'stats', fieldMap: { label: 'metric label', value: 'metric value' } },
    ],
  },
  posts: {
    textFields: [
      { name: 'title', context: 'blog post title' },
      { name: 'excerpt', context: 'blog post excerpt / summary' },
    ],
    richTextFields: ['content'],
    htmlFields: [
      { name: 'htmlContent', context: 'blog article HTML content' },
    ],
  },
  services: {
    textFields: [
      { name: 'title', context: 'service name' },
      { name: 'category', context: 'service category' },
      { name: 'description', context: 'service description' },
    ],
    arrayFields: [
      { name: 'features', fieldMap: { feature: 'service feature bullet point' } },
    ],
  },
  testimonials: {
    textFields: [
      { name: 'quote', context: 'customer testimonial / review' },
      { name: 'location', context: 'location name' },
    ],
  },
};

/**
 * Stub: Auto-translate function that can be called from new API routes.
 * Previously this was a Payload CollectionAfterChangeHook.
 */
export async function autoTranslate(
  doc: any,
  collectionSlug: string,
  targetLocale: string = 'es'
) {
  const fieldConfig = COLLECTION_FIELDS[collectionSlug];
  if (!fieldConfig) return doc;

  console.log(`Mock auto-translate ${collectionSlug}/${doc.id} to ${targetLocale}`);
  // TODO: Re-implement translation logic with Hono API / Drizzle
  return doc;
}
