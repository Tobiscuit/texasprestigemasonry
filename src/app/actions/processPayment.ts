'use server';

import { randomUUID } from 'crypto';

const isProduction = process.env.SQUARE_ENVIRONMENT === 'production';

interface PaymentData {
    sourceId: string;
    amount?: number;
    customerDetails: {
        name: string;
        phone: string;
        email: string;
        address: string;
        issue: string;
        urgency: 'Standard' | 'Emergency';
    }
}

async function squareFetch(endpoint: string, method: string, body?: any) {
    const baseUrl = isProduction ? 'https://connect.squareup.com' : 'https://connect.squareupsandbox.com';
    const res = await fetch(`${baseUrl}/v2/${endpoint}`, {
        method,
        headers: {
            'Square-Version': '2024-01-18',
            'Authorization': `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.errors?.[0]?.detail || data.errors?.[0]?.category || 'Square API Error');
    }
    return data;
}

export async function processPayment({ sourceId, amount = 9900, customerDetails }: PaymentData) {
  try {
    console.log(`[ProcessPayment] Env: ${isProduction ? 'Production' : 'Sandbox'}`);
    
    let squareCustomerId: string | undefined;

    try {
      const searchData = await squareFetch('customers/search', 'POST', {
        query: { filter: { email_address: { exact: customerDetails.email } } }
      });

      if (searchData.customers && searchData.customers.length > 0) {
        squareCustomerId = searchData.customers[0].id;
      } else {
        const createData = await squareFetch('customers', 'POST', {
          given_name: customerDetails.name.split(' ')[0],
          family_name: customerDetails.name.split(' ').slice(1).join(' ') || '',
          email_address: customerDetails.email,
          phone_number: customerDetails.phone,
          address: { address_line_1: customerDetails.address },
          reference_id: customerDetails.email,
          note: 'Created via Dispatch App'
        });
        squareCustomerId = createData.customer?.id;
      }
    } catch (e) {
      console.warn('Failed to sync Square Customer profile:', e);
    }

    const idempotencyKey = randomUUID();
    const paymentData = await squareFetch('payments', 'POST', {
      source_id: sourceId,
      idempotency_key: idempotencyKey,
      amount_money: { amount: amount, currency: 'USD' },
      customer_id: squareCustomerId,
      autocomplete: true,
      note: `Dispatch Fee - ${customerDetails.name}`,
    });

    const payment = paymentData.payment;
    const newTicket = { id: 1, status: 'confirmed' };

    try {
        const { revalidatePath } = await import('next/cache');
        revalidatePath('/dashboard');
    } catch (e) {
        console.warn('Failed to revalidate dashboard path', e);
    }

    return { success: true, payment, ticket: newTicket };
  } catch (error: any) {
    console.error('Payment/Booking Error:', error);
    return { success: false, error: error.message || 'Payment failed' };
  }
}
