/**
 * Database Client Factory
 * 
 * For local dev: uses better-sqlite3 (lazy import, never loaded on edge)
 * For production: uses Cloudflare D1 via drizzle-orm/d1
 * 
 * The Hono API routes run on edge runtime, so we CANNOT import
 * Node.js-only modules at the top level. All Node imports are lazy.
 */

import * as schema from './schema';

export function getDb() {
  throw new Error("Local SQLite has been removed to reduce edge bundle size. Please use getD1Db(c.env.DB) for database operations.");
}

/**
 * Get a Drizzle database instance from a Cloudflare D1 binding.
 * Safe to call from edge runtime.
 * 
 * Usage in Hono route:
 *   import { getD1Db } from '@/db/db';
 *   const db = getD1Db(c.env.DB);
 */
export function getD1Db(d1: any) {
  const { drizzle } = require('drizzle-orm/d1');
  return drizzle(d1, { schema });
}

export { schema };
