import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET - получить домашние задания пользователя
export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Необходимо войти в систему' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');
    const status = searchParams.get('status');

    const where: { userId: string; courseId?: string; status?: string } = {
      userId: session.user.id
    };

    if (courseId) {
      where.courseId = courseId;
    }

    if (status) {
      where.status = status;
    }

    const assignments = await prisma.assignment.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ assignments });
  } catch (error) {
    console.error('Assignments GET error:', error);
    return NextResponse.json({ error: 'Ошибка при получении заданий' }, { status: 500 });
  }
}

// POST - отправить домашнее задание
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Необходимо войти в систему' }, { status: 401 });
    }

    const body = await req.json();
    const { courseId, moduleId, lessonId, content } = body;

    if (!courseId || moduleId === undefined || lessonId === undefined || !content) {
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

    // Создаём задание
    const assignment = await prisma.assignment.create({
      data: {
        userId: session.user.id,
        courseId,
        moduleId,
        lessonId,
        content,
        status: 'submitted',
        submittedAt: new Date()
      }
    });

    // Создаём уведомление для админа
    const admins = await prisma.user.findMany({
      where: { role: 'ADMIN' }
    });

    for (const admin of admins) {
      await prisma.notification.create({
        data: {
          userId: admin.id,
          title: 'Новое домашнее задание',
          message: `Студент отправил ДЗ по курсу ${courseId}`,
          type: 'assignment'
        }
      });
    }

    return NextResponse.json({ success: true, assignment });
  } catch (error) {
    console.error('Assignment POST error:', error);
    return NextResponse.json({ error: 'Ошибка при отправке задания' }, { status: 500 });
  }
}

// PATCH - обновить статус задания (для админов)
export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Только для администраторов' }, { status: 403 });
    }

    const body = await req.json();
    const { id, status, feedback } = body;

    if (!id) {
      return NextResponse.json({ error: 'Не указан id задания' }, { status: 400 });
    }

    const updateData: {
      status: string;
      feedback?: string;
      reviewedAt?: Date;
    } = {
      status
    };

    if (feedback) {
      updateData.feedback = feedback;
    }

    if (status === 'reviewed' || status === 'rejected') {
      updateData.reviewedAt = new Date();
    }

    const assignment = await prisma.assignment.update({
      where: { id },
      data: updateData
    });

    // Создаём уведомление для студента
    await prisma.notification.create({
      data: {
        userId: assignment.userId,
        title: 'Домашнее задание проверено',
        message: status === 'reviewed' 
          ? 'Ваше задание принято!' 
          : 'Задание требует доработки',
        type: 'assignment'
      }
    });

    return NextResponse.json({ success: true, assignment });
  } catch (error) {
    console.error('Assignment PATCH error:', error);
    return NextResponse.json({ error: 'Ошибка при обновлении задания' }, { status: 500 });
  }
}
