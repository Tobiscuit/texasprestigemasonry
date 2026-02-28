'use server';

// import { getPayload } from 'payload';
// import configPromise from '@/payload.config';
import { redirect } from 'next/navigation';
import { squareService } from '@/services/squareService';
import { randomUUID } from 'crypto';
import webpush from 'web-push';

// Configure Web Push (Move to global config if used elsewhere)
try {
    if (process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
        webpush.setVapidDetails(
            'mailto:office@texasprestigemasonry.com',
            process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
            process.env.VAPID_PRIVATE_KEY
        );
    }
} catch (err) {
    console.error('Error configuring Web Push in booking:', err);
}

interface CustomerData {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestAddress: string;
  guestPassword?: string;
}

// 1. Private Helper: Find or Create Customer
async function findOrCreateCustomer(data: CustomerData): Promise<number> {
  // Stub for find/create logic
  return 1;
}

// 2. Main Server Action
export async function createBooking(prevState: any, formData: FormData) {

  const guestName = formData.get('guestName') as string;
  const guestEmail = formData.get('guestEmail') as string;
  const guestPhone = formData.get('guestPhone') as string;
  const guestAddress = formData.get('guestAddress') as string;
  const guestPassword = formData.get('guestPassword') as string;
  const issueDescription = formData.get('issueDescription') as string;
  const urgency = formData.get('urgency') as string;
  const scheduledTime = formData.get('scheduledTime') as string;
  const sourceId = formData.get('sourceId') as string; // Square Token

  let customerId: number | undefined;

  try {
    // A. Customer Logic
    customerId = await findOrCreateCustomer({
      guestName,
      guestEmail,
      guestPhone,
      guestAddress,
      guestPassword
    });

    // B. Payment Logic (Service Layer)
    const tripFee = 9900; // 99.00
    const payment = await squareService.processPayment(
      sourceId,
      tripFee,
      `Trip Fee for ${guestName} (${guestEmail})`
    );

    // C. Service Request Logic (Mocked)
    // Send request to Edge API here

    // Notify Admins & Dispatchers (Mocked)
    
    // D. Payment Logging Logic (Mocked)

  } catch (error: any) {
    console.error('Booking Error:', error);
    let errorMessage = 'Failed to process booking.';
    
    // Check if it's a known error object
    if (error.message) {
      errorMessage = error.message;
    }

    return { error: errorMessage };
  }

  // Success Redirect
  redirect('/portal?success=booked');
}
