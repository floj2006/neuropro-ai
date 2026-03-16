import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET - получить видео для курса
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

    // Получаем все видео для курса
    const videos = await prisma.video.findMany({
      where: { courseId },
      orderBy: [
        { moduleId: 'asc' },
        { lessonId: 'asc' }
      ]
    });

    return NextResponse.json({ videos });
  } catch (error) {
    console.error('Videos GET error:', error);
    return NextResponse.json({ error: 'Ошибка при получении видео' }, { status: 500 });
  }
}

// POST - создать видео (для админов)
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Только для администраторов' }, { status: 403 });
    }

    const body = await req.json();
    const { courseId, moduleId, lessonId, title, videoUrl, provider, duration } = body;

    if (!courseId || moduleId === undefined || lessonId === undefined || !title || !videoUrl) {
      return NextResponse.json({ error: 'Некорректные данные' }, { status: 400 });
    }

    // Извлекаем ID видео из URL
    let videoId = null;
    let finalProvider = provider || 'youtube';

    if (finalProvider === 'youtube') {
      const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
        /youtube\.com\/embed\/([^?&\s]+)/
      ];
      for (const pattern of patterns) {
        const match = videoUrl.match(pattern);
        if (match) {
          videoId = match[1];
          break;
        }
      }
    } else if (finalProvider === 'vimeo') {
      const match = videoUrl.match(/vimeo\.com\/(?:video\/)?(\d+)/);
      if (match) {
        videoId = match[1];
      }
    }

    const video = await prisma.video.upsert({
      where: {
        courseId_moduleId_lessonId: {
          courseId,
          moduleId,
          lessonId
        }
      },
      update: {
        title,
        videoUrl,
        provider: finalProvider,
        videoId,
        duration
      },
      create: {
        courseId,
        moduleId,
        lessonId,
        title,
        videoUrl,
        provider: finalProvider,
        videoId,
        duration
      }
    });

    return NextResponse.json({ success: true, video });
  } catch (error) {
    console.error('Videos POST error:', error);
    return NextResponse.json({ error: 'Ошибка при сохранении видео' }, { status: 500 });
  }
}
