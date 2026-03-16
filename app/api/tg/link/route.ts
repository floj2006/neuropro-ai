import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const telegramId = body?.telegramId ? String(body.telegramId) : '';
  const name = body?.name ? String(body.name) : 'Студент NeuroPro';

  if (!telegramId) {
    return NextResponse.json({ ok: false, message: 'telegramId is required' }, { status: 400 });
  }

  const user = await prisma.tgUser.upsert({
    where: { telegramId },
    update: { name },
    create: {
      telegramId,
      name,
      role: 'Student',
      status: 'Активен'
    }
  });

  return NextResponse.json({ ok: true, userId: user.id });
}
