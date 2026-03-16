import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { tgActivity } from '../../../../lib/tg-data';

async function ensureActivity() {
  const count = await prisma.tgActivity.count();
  if (count > 0) {
    return;
  }
  await prisma.tgActivity.createMany({ data: tgActivity });
}

export async function GET() {
  await ensureActivity();
  const rows = await prisma.tgActivity.findMany({ orderBy: { createdAt: 'asc' } });
  return NextResponse.json(rows);
}
