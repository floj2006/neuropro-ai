import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET - получить закладки пользователя
export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Необходимо войти в систему' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');

    const where: { userId: string; courseId?: string } = {
      userId: session.user.id
    };

    if (courseId) {
      where.courseId = courseId;
    }

    const bookmarks = await prisma.bookmark.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ bookmarks });
  } catch (error) {
    console.error('Bookmarks GET error:', error);
    return NextResponse.json({ error: 'Ошибка при получении закладок' }, { status: 500 });
  }
}

// POST - создать закладку
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Необходимо войти в систему' }, { status: 401 });
    }

    const body = await req.json();
    const { courseId, moduleId, lessonId, note } = body;

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

    // Создаём или обновляем закладку
    const bookmark = await prisma.bookmark.upsert({
      where: {
        userId_courseId_moduleId_lessonId: {
          userId: session.user.id,
          courseId,
          moduleId,
          lessonId
        }
      },
      update: {
        note: note || null
      },
      create: {
        userId: session.user.id,
        courseId,
        moduleId,
        lessonId,
        note: note || null
      }
    });

    return NextResponse.json({ success: true, bookmark });
  } catch (error) {
    console.error('Bookmark POST error:', error);
    return NextResponse.json({ error: 'Ошибка при сохранении закладки' }, { status: 500 });
  }
}

// DELETE - удалить закладку
export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Необходимо войти в систему' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Не указан id закладки' }, { status: 400 });
    }

    // Проверяем, принадлежит ли закладка пользователю
    const bookmark = await prisma.bookmark.findUnique({
      where: { id }
    });

    if (!bookmark || bookmark.userId !== session.user.id) {
      return NextResponse.json({ error: 'Закладка не найдена' }, { status: 404 });
    }

    await prisma.bookmark.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Bookmark DELETE error:', error);
    return NextResponse.json({ error: 'Ошибка при удалении закладки' }, { status: 500 });
  }
}
