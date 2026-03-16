import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET - получить уведомления пользователя
export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Необходимо войти в систему' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const unreadOnly = searchParams.get('unreadOnly') === 'true';

    const where: { userId: string; read?: boolean } = {
      userId: session.user.id
    };

    if (unreadOnly) {
      where.read = false;
    }

    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 50
    });

    // Считаем количество непрочитанных
    const unreadCount = await prisma.notification.count({
      where: {
        userId: session.user.id,
        read: false
      }
    });

    return NextResponse.json({ 
      notifications,
      unreadCount
    });
  } catch (error) {
    console.error('Notifications GET error:', error);
    return NextResponse.json({ error: 'Ошибка при получении уведомлений' }, { status: 500 });
  }
}

// PATCH - отметить уведомление как прочитанное
export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Необходимо войти в систему' }, { status: 401 });
    }

    const body = await req.json();
    const { id, read } = body;

    if (!id) {
      return NextResponse.json({ error: 'Не указан id уведомления' }, { status: 400 });
    }

    // Проверяем, принадлежит ли уведомление пользователю
    const notification = await prisma.notification.findUnique({
      where: { id }
    });

    if (!notification || notification.userId !== session.user.id) {
      return NextResponse.json({ error: 'Уведомление не найдено' }, { status: 404 });
    }

    const updated = await prisma.notification.update({
      where: { id },
      data: { read: read !== undefined ? read : true }
    });

    return NextResponse.json({ success: true, notification: updated });
  } catch (error) {
    console.error('Notification PATCH error:', error);
    return NextResponse.json({ error: 'Ошибка при обновлении уведомления' }, { status: 500 });
  }
}

// POST - отметить все как прочитанные
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Необходимо войти в систему' }, { status: 401 });
    }

    await prisma.notification.updateMany({
      where: {
        userId: session.user.id,
        read: false
      },
      data: {
        read: true
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Notifications mark all read error:', error);
    return NextResponse.json({ error: 'Ошибка при обновлении уведомлений' }, { status: 500 });
  }
}
