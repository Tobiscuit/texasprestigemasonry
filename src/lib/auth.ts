import { betterAuth } from 'better-auth';
import { memoryAdapter } from 'better-auth/adapters/memory';
import { passkey } from '@better-auth/passkey';
import { magicLink } from 'better-auth/plugins/magic-link';
import { nextCookies } from 'better-auth/next-js';
import { sendEmail } from './email';

/**
 * BetterAuth Configuration
 * 
 * Currently using memory adapter until D1 (SQLite) integration is complete.
 * When D1 is ready, switch to:
 *   import { drizzleAdapter } from 'better-auth/adapters/drizzle';
 *   import { drizzle } from 'drizzle-orm/d1';
 */

const baseURL =
  process.env.BETTER_AUTH_BASE_URL ||
  process.env.NEXT_PUBLIC_SERVER_URL ||
  'http://localhost:3000';
const rpID = new URL(baseURL).hostname;
const authSecret = process.env.BETTER_AUTH_SECRET;

const memoryDB: Record<string, any[]> = {
  user: [],
  session: [],
  account: [],
  verification: [],
  passkey: [],
};
export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_BASE_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET || "fallback_secret_for_build",
  database: memoryAdapter(memoryDB),
  emailAndPassword: {
    enabled: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  plugins: [
    nextCookies(),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
        console.log(`🔑 MAGIC LINK for ${email}:`);
        console.log(url);
        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
        try {
          await sendEmail({
             to: email,
             subject: 'Sign in to Texas Prestige Masonry',
             html: `<p>Click the link below to sign in:</p><a href="${url}">${url}</a><p>If you didn't request this, you can ignore this email.</p>`,
             text: `Click the link below to sign in:\n\n${url}\n\nIf you didn't request this, you can ignore this email.`
          });
        } catch (error) {
          console.error('Failed to send magic link email:', error);
        }
      },
    }),
    passkey({
      rpName: 'Texas Prestige Masonry',
      rpID,
      origin: baseURL,
    }),
  ],
});
