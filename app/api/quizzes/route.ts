import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET - получить тесты для курса
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

    // Получаем все тесты для курса
    const quizzes = await prisma.quiz.findMany({
      where: { courseId },
      include: {
        attempts: {
          where: { userId: session.user.id },
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      },
      orderBy: { moduleId: 'asc' }
    });

    return NextResponse.json({ 
      quizzes: quizzes.map(q => ({
        id: q.id,
        courseId: q.courseId,
        moduleId: q.moduleId,
        title: q.title,
        questions: q.questions,
        bestAttempt: q.attempts[0] ? {
          score: q.attempts[0].score,
          createdAt: q.attempts[0].createdAt
        } : null
      }))
    });
  } catch (error) {
    console.error('Quizzes GET error:', error);
    return NextResponse.json({ error: 'Ошибка при получении тестов' }, { status: 500 });
  }
}

// POST - создать тест (для админов)
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Только для администраторов' }, { status: 403 });
    }

    const body = await req.json();
    const { courseId, moduleId, title, questions } = body;

    if (!courseId || moduleId === undefined || !title || !questions) {
      return NextResponse.json({ error: 'Некорректные данные' }, { status: 400 });
    }

    const quiz = await prisma.quiz.create({
      data: {
        courseId,
        moduleId,
        title,
        questions
      }
    });

    return NextResponse.json({ success: true, quiz });
  } catch (error) {
    console.error('Quiz POST error:', error);
    return NextResponse.json({ error: 'Ошибка при создании теста' }, { status: 500 });
  }
}
