import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET - получить прогресс пользователя для курса
export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Необходимо войти в систему' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');

    if (!courseId) {
      return NextResponse.json({ error: 'Не указан courseId' }, { status: 400 });
    }

    // Проверяем, куплен ли курс
    const purchase = await prisma.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId
        }
      }
    });

    if (!purchase) {
      return NextResponse.json({ error: 'Курс не куплен' }, { status: 403 });
    }

    // Получаем прогресс
    const progress = await prisma.lessonProgress.findMany({
      where: {
        userId: session.user.id,
        courseId
      }
    });

    // Форматируем прогресс
    const progressMap = progress.reduce((acc: Record<string, boolean>, p: (typeof progress)[number]) => {
      const key = `${p.moduleId}-${p.lessonId}`;
      acc[key] = p.completed;
      return acc;
    }, {} as Record<string, boolean>);

    // Считаем общий процент
    const totalLessons = progress.length;
    const completedLessons = progress.filter((p: (typeof progress)[number]) => p.completed).length;
    const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    return NextResponse.json({
      progress: progressMap,
      percentage,
      totalLessons,
      completedLessons
    });
  } catch (error) {
    console.error('Progress GET error:', error);
    return NextResponse.json({ error: 'Ошибка при получении прогресса' }, { status: 500 });
  }
}

// POST - обновить прогресс (отметить урок как пройденный)
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Необходимо войти в систему' }, { status: 401 });
    }

    const body = await req.json();
    const { courseId, moduleId, lessonId, completed } = body;

    if (!courseId || moduleId === undefined || lessonId === undefined) {
      return NextResponse.json({ error: 'Некорректные данные' }, { status: 400 });
    }

    // Проверяем, куплен ли курс
    const purchase = await prisma.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId
        }
      }
    });

    if (!purchase) {
      return NextResponse.json({ error: 'Курс не куплен' }, { status: 403 });
    }

    // Обновляем или создаём запись о прогрессе
    const progress = await prisma.lessonProgress.upsert({
      where: {
        userId_courseId_moduleId_lessonId: {
          userId: session.user.id,
          courseId,
          moduleId,
          lessonId
        }
      },
      update: {
        completed,
        completedAt: completed ? new Date() : null
      },
      create: {
        userId: session.user.id,
        courseId,
        moduleId,
        lessonId,
        completed,
        completedAt: completed ? new Date() : null
      }
    });

    // Считаем общий прогресс
    const allProgress = await prisma.lessonProgress.findMany({
      where: {
        userId: session.user.id,
        courseId
      }
    });

    const totalLessons = allProgress.length;
    const completedLessons = allProgress.filter((p: (typeof allProgress)[number]) => p.completed).length;
    const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    return NextResponse.json({
      success: true,
      progress: {
        moduleId,
        lessonId,
        completed,
        completedAt: progress.completedAt
      },
      percentage,
      totalLessons,
      completedLessons
    });
  } catch (error) {
    console.error('Progress POST error:', error);
    return NextResponse.json({ error: 'Ошибка при сохранении прогресса' }, { status: 500 });
  }
}
