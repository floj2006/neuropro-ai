import { NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/prisma';

export async function POST(_request: Request, { params }: { params: { id: string } }) {
  const update = await prisma.tgPayment.update({
    where: { id: params.id },
    data: { status: 'Оплачено' }
  }).catch(() => null);

  if (!update) {
    return NextResponse.json({ ok: false, message: 'Invoice not found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, id: params.id });
}
