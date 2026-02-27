// Removed: import { Payload } from 'payload';
import { randomUUID } from 'crypto';

interface CustomerData {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestAddress: string;
  guestPassword?: string;
}

export const customerService = {
  findOrCreate: async (data: CustomerData): Promise<string> => {
    // TODO: Replace with Hono API / Drizzle call
    console.log('Mock findOrCreate customer:', data.guestEmail);
    return 'mock-customer-id';
  }
};
