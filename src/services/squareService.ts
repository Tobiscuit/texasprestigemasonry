import { randomUUID } from 'crypto';

export const squareService = {
  processPayment: async (sourceId: string, amount: number, note: string) => {
    try {
      const environment = process.env.SQUARE_ENVIRONMENT === 'production' ? 'production' : 'sandbox';
      const baseUrl = environment === 'production' 
        ? 'https://connect.squareup.com' 
        : 'https://connect.squareupsandbox.com';

      const response = await fetch(`${baseUrl}/v2/payments`, {
        method: 'POST',
        headers: {
          'Square-Version': '2024-01-18',
          'Authorization': `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source_id: sourceId,
          idempotency_key: randomUUID(),
          amount_money: {
            amount: amount,
            currency: 'USD',
          },
          note,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.payment || (data.payment.status !== 'COMPLETED' && data.payment.status !== 'APPROVED')) {
          if (data.errors && data.errors.length > 0) {
              throw new Error(data.errors[0].detail || data.errors[0].category || "Payment Failed");
          }
        throw new Error('Payment failed. Status: ' + data.payment?.status);
      }

      return data.payment;
    } catch (error: any) {
      console.error('Square Service Error:', error);
      throw new Error(error.message || 'Unknown Square payment error');
    }
  }
};
