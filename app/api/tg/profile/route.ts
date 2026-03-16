import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { courses as seedCourses } from '../../../../lib/data/courses';

const DEFAULT_PRIVILEGES = ['Доступ к сообществу', 'Личный ментор', 'Еженедельные разборы'];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const telegramId = searchParams.get('telegramId');

  if (!telegramId) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const user = await prisma.tgUser.findUnique({ where: { telegramId } });
  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const purchases = await prisma.tgPurchase.findMany({ where: { tgUserId: user.id } });
  const progress = await prisma.tgCourseProgress.findMany({ where: { tgUserId: user.id } });

  const courseMap = new Map(seedCourses.map((course) => [course.slug, course]));

  return NextResponse.json({
    authenticated: true,
    user: {
      id: user.id,
      name: user.name,
      role: user.role,
      status: user.status,
      privileges: DEFAULT_PRIVILEGES
    },
    purchases: purchases.map((item) => ({
      courseSlug: item.courseSlug,
      title: courseMap.get(item.courseSlug)?.title ?? item.courseSlug,
      price: item.price,
      status: item.status
    })),
    progress: progress.map((item) => ({
      courseSlug: item.courseSlug,
      title: courseMap.get(item.courseSlug)?.title ?? item.courseSlug,
      progress: item.progress,
      nextLesson: item.nextLesson
    }))
  });
}
