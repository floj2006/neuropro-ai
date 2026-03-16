import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { getPaymentItem } from '../../../../lib/data/payments';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { itemId } = await request.json();

    if (!itemId || typeof itemId !== 'string') {
      return NextResponse.json({ error: 'Не передан itemId' }, { status: 400 });
    }

    const item = getPaymentItem(itemId);

    if (!item) {
      return NextResponse.json({ error: 'Неизвестный товар' }, { status: 404 });
    }

    const shopId = process.env.YOOKASSA_SHOP_ID;
    const secretKey = process.env.YOOKASSA_SECRET_KEY;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

    if (!shopId || !secretKey) {
      return NextResponse.json(
        { error: 'Не заданы YOOKASSA_SHOP_ID или YOOKASSA_SECRET_KEY' },
        { status: 500 }
      );
    }

    const returnUrl = `${siteUrl}/payments/success?item=${encodeURIComponent(item.id)}`;
    const idempotenceKey = randomUUID();
    const authHeader = Buffer.from(`${shopId}:${secretKey}`).toString('base64');

    const response = await fetch('https://api.yookassa.ru/v3/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotence-Key': idempotenceKey,
        Authorization: `Basic ${authHeader}`
      },
      body: JSON.stringify({
        amount: item.amount,
        capture: true,
        confirmation: {
          type: 'redirect',
          return_url: returnUrl
        },
        description: item.title,
        metadata: {
          itemId: item.id,
          itemType: item.type
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Ошибка YooKassa', details: data },
        { status: 502 }
      );
    }

    const confirmationUrl = data?.confirmation?.confirmation_url;

    if (!confirmationUrl) {
      return NextResponse.json(
        { error: 'YooKassa не вернула confirmation_url', details: data },
        { status: 502 }
      );
    }

    return NextResponse.json({
      confirmationUrl,
      paymentId: data.id
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}
