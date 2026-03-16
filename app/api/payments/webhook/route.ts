import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    console.log('YooKassa webhook received:', payload);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error', error);
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}
