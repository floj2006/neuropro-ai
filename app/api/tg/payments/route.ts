import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { tgPayments } from '../../../../lib/tg-data';

async function ensurePayments() {
  const count = await prisma.tgPayment.count();
  if (count > 0) {
    return;
  }
  await prisma.tgPayment.createMany({ data: tgPayments });
}

export async function GET() {
  await ensurePayments();
  const rows = await prisma.tgPayment.findMany({ orderBy: { createdAt: 'asc' } });
  return NextResponse.json(rows);
}
