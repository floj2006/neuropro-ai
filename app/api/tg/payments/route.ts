import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { tgPayments } from '../../../../lib/tg-data';

export const dynamic = 'force-dynamic';

async function ensurePayments() {
  try {
    const count = await prisma.tgPayment.count();
    if (count > 0) {
      return true;
    }

    await prisma.tgPayment.createMany({ data: tgPayments });
    return true;
  } catch {
    return false;
  }
}

export async function GET() {
  const hasDatabaseTable = await ensurePayments();

  if (!hasDatabaseTable) {
    return NextResponse.json(tgPayments);
  }

  const rows = await prisma.tgPayment.findMany({ orderBy: { createdAt: 'asc' } });
  return NextResponse.json(rows);
}
