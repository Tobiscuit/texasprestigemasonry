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

/**
 * Get a Drizzle database instance for local development.
 * Uses a SQLite file at the project root.
 * 
 * ⚠️ Only call this in Node.js environments (e.g., `npm run dev`).
 * Do NOT call from edge runtime.
 */
export function getDb() {
  // Lazy import to avoid breaking edge runtime
  const { drizzle } = require('drizzle-orm/better-sqlite3');
  const Database = require('better-sqlite3');
  const { join } = require('path');

  const dbPath = process.env.LOCAL_DB_PATH || join(process.cwd(), 'local.db');
  const sqlite = new Database(dbPath);
  
  sqlite.pragma('journal_mode = WAL');
  sqlite.pragma('foreign_keys = ON');
  
  return drizzle(sqlite, { schema });
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
