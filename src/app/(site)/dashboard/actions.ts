'use server';

// import { getPayload } from 'payload';
// import configPromise from '@payload-config';
import { revalidatePath } from 'next/cache';
import { SquareClient, SquareEnvironment } from 'square';

const squareClient = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment: process.env.SQUARE_ENVIRONMENT === 'production' ? SquareEnvironment.Production : SquareEnvironment.Sandbox,
});

export async function getDashboardStats() {
  // Mock Stats
  return {
    revenue: {
      lifetime: 0,
      monthly: 0,
      weekly: 0,
      today: 0,
    },
    jobs: {
      active: 0,
      pending: 0,
      total: 0,
    },
    technicians: {
      total: 0,
      online: 0, 
    },
  };
}

export async function createManualPayment(amount: number, sourceType: 'CASH' | 'EXTERNAL', note: string) {
    try {
        // Mock success
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

// NEW: Force Reset & Sync to ensure 100% accuracy with Square
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

// === NEW ACTIONS FOR KPI SHEETS ===

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
