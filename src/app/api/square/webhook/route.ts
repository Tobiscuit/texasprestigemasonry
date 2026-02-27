import { NextRequest, NextResponse } from 'next/server';
import { SquareClient as Client, SquareEnvironment as Environment, WebhooksHelper } from 'square';
// import { getPayload } from 'payload';
// import configPromise from '@/payload.config';
import { randomUUID } from 'crypto';

// Initialize Square Client
const squareClient = new Client({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment: process.env.SQUARE_ENVIRONMENT === 'production' ? Environment.Production : Environment.Sandbox,
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('x-square-hmac-sha256');

  if (!signature || !process.env.SQUARE_WEBHOOK_SIGNATURE_KEY) {
    console.error('Missing signature or signature key');
    // In dev, we might want to skip signature verification for testing if key is missing
    if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Missing signature or key' }, { status: 400 });
    }
  }

  try {
    // Verify Signature
    // Only verify if we have the key
    if (process.env.SQUARE_WEBHOOK_SIGNATURE_KEY) {
        const isValid = (WebhooksHelper as any).isValidWebhookEventSignature(
          body,
          signature,
          process.env.SQUARE_WEBHOOK_SIGNATURE_KEY,
          process.env.SQUARE_WEBHOOK_NOTIFICATION_URL || 'http://localhost:3000/api/square/webhook' 
        );

        if (!isValid) {
          console.error('Invalid signature');
          return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
        }
    }

    const event = JSON.parse(body);
    // Mock Payload instantiation and logic for now
    console.log(`Received Square Webhook: ${event.type}`, event.data.id);

    switch (event.type) {
      case 'payment.created':
      case 'payment.updated': {
        console.log(`Webhook handled payment: ${event.data.id}`);
        break;
      }
      case 'invoice.payment_made': {
        console.log(`Webhook handled invoice: ${event.data.id}`);
        break;
      }
      default:
        // Ignore other events
        break;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
