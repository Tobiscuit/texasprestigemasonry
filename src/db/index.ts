import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

// This function will connect to the D1 database binding defined in Cloudflare
export function initDB(env: any) {
  // @ts-ignore
  return drizzle(env.DB, { schema });
}
