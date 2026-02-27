// import { getPayload } from 'payload';
// import configPromise from '@payload-config';

type SessionUser = {
  email?: string;
  role?: string;
};

type AppRole = 'admin' | 'technician' | 'dispatcher' | 'customer';

export type ProvisionedUser = {
  role: AppRole;
  profileComplete: boolean;
};

export async function provisionUserFromSession(sessionUser?: SessionUser): Promise<ProvisionedUser> {
  const email = String(sessionUser?.email || '').toLowerCase().trim();
  if (!email) {
    return { role: 'customer', profileComplete: true };
  }

  // TODO: Replace with Hono API call to check user + invite status
  console.log('Mock provision user:', email);
  return { role: 'customer', profileComplete: true };
}
