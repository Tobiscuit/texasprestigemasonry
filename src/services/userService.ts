// Removed: import { Payload } from 'payload';

export const userService = {
  getProfile: async (userId: string | number) => {
    // TODO: Replace with Hono API / Drizzle call
    return null;
  },

  updateProfile: async (userId: string | number, data: any) => {
    // TODO: Replace with Hono API / Drizzle call
    console.log('Mock updateProfile:', userId, data);
    return null;
  }
};
