import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('x-square-hmac-sha256');

  if (!signature || !process.env.SQUARE_WEBHOOK_SIGNATURE_KEY) {
    console.error('Missing signature or signature key');
    if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Missing signature or key' }, { status: 400 });
    }
  }

  try {
    // Note: To re-add rigid signature validation without 11MB Square SDK, use native WebCrypto API
    const event = JSON.parse(body);
    console.log(`Received Square Webhook: ${event.type}`, event?.data?.id);

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
        break;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
