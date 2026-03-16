import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// POST - пройти тест
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Необходимо войти в систему' }, { status: 401 });
    }

    const body = await req.json();
    const { quizId, answers } = body;

    if (!quizId || !answers) {
      return NextResponse.json({ error: 'Некорректные данные' }, { status: 400 });
    }

    // Получаем тест
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId }
    });

    if (!quiz) {
      return NextResponse.json({ error: 'Тест не найден' }, { status: 404 });
    }

    // Проверяем ответы
    const questions = quiz.questions as Array<{
      question: string;
      options: string[];
      correct: number;
    }>;

    let correctCount = 0;
    answers.forEach((answerIndex: number, questionIndex: number) => {
      if (questions[questionIndex] && answerIndex === questions[questionIndex].correct) {
        correctCount++;
      }
    });

    const score = questions.length > 0 
      ? Math.round((correctCount / questions.length) * 100) 
      : 0;

    // Сохраняем попытку
    const attempt = await prisma.quizAttempt.create({
      data: {
        quizId,
        userId: session.user.id,
        answers,
        score
      }
    });

    // Проверяем, прошёл ли тест (минимум 70%)
    const passed = score >= 70;

    return NextResponse.json({
      success: true,
      attempt: {
        id: attempt.id,
        score: attempt.score,
        correctAnswers: correctCount,
        totalQuestions: questions.length,
        passed
      }
    });
  } catch (error) {
    console.error('Quiz attempt error:', error);
    return NextResponse.json({ error: 'Ошибка при прохождении теста' }, { status: 500 });
  }
}

// GET - получить результат теста
export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Необходимо войти в систему' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const quizId = searchParams.get('quizId');

    if (!quizId) {
      return NextResponse.json({ error: 'Не указан quizId' }, { status: 400 });
    }

    // Получаем лучшую попытку
    const bestAttempt = await prisma.quizAttempt.findFirst({
      where: { quizId, userId: session.user.id },
      orderBy: { score: 'desc' }
    });

    if (!bestAttempt) {
      return NextResponse.json({ attempt: null });
    }

    return NextResponse.json({
      attempt: {
        id: bestAttempt.id,
        score: bestAttempt.score,
        createdAt: bestAttempt.createdAt
      }
    });
  } catch (error) {
    console.error('Quiz result GET error:', error);
    return NextResponse.json({ error: 'Ошибка при получении результата' }, { status: 500 });
  }
}
