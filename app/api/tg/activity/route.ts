import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { tgActivity } from '../../../../lib/tg-data';

export const dynamic = 'force-dynamic';

async function ensureActivity() {
  try {
    const count = await prisma.tgActivity.count();
    if (count > 0) {
      return true;
    }

    await prisma.tgActivity.createMany({ data: tgActivity });
    return true;
  } catch {
    return false;
  }
}

export async function GET() {
  const hasDatabaseTable = await ensureActivity();

  if (!hasDatabaseTable) {
    return NextResponse.json(tgActivity);
  }

  const rows = await prisma.tgActivity.findMany({ orderBy: { createdAt: 'asc' } });
  return NextResponse.json(rows);
}
