import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    // Проверяем авторизацию
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Необходимо войти в систему' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { courseId, amount, courseName } = body;

    if (!courseId || !amount) {
      return NextResponse.json(
        { error: 'Некорректные данные' },
        { status: 400 }
      );
    }

    // Проверяем, не куплен ли уже курс
    const existingPurchase = await prisma.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId
        }
      }
    });

    if (existingPurchase) {
      return NextResponse.json(
        { error: 'Вы уже купили этот курс' },
        { status: 400 }
      );
    }

    // Создаём запись о покупке
    const purchase = await prisma.purchase.create({
      data: {
        userId: session.user.id,
        courseId,
        amount,
        status: 'completed'
      }
    });

    return NextResponse.json({
      success: true,
      purchase: {
        id: purchase.id,
        courseId: purchase.courseId,
        status: purchase.status
      }
    });
  } catch (error) {
    console.error('Purchase error:', error);
    return NextResponse.json(
      { error: 'Ошибка при обработке покупки' },
      { status: 500 }
    );
  }
}
