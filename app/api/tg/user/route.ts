import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') ?? 'Студент NeuroPro';

  return NextResponse.json({
    name,
    cohort: 'Весна 2026',
    plan: 'Премиум',
    hoursPerWeek: '5 ч/нед'
  });
}
