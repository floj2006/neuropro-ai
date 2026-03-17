import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { randomUUID } from 'crypto';

// GET - получить сертификаты пользователя
export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Необходимо войти в систему' }, { status: 401 });
    }

    const certificates = await prisma.certificate.findMany({
      where: { userId: session.user.id },
      orderBy: { issuedAt: 'desc' }
    });

    return NextResponse.json({ certificates });
  } catch (error) {
    console.error('Certificates GET error:', error);
    return NextResponse.json({ error: 'Ошибка при получении сертификатов' }, { status: 500 });
  }
}

// POST - создать сертификат
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Необходимо войти в систему' }, { status: 401 });
    }

    const body = await req.json();
    const { courseId } = body;

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

    // Проверяем прогресс (должен быть 100%)
    const progress = await prisma.lessonProgress.findMany({
      where: {
        userId: session.user.id,
        courseId
      }
    });

    const totalLessons = progress.length;
    const completedLessons = progress.filter((p: (typeof progress)[number]) => p.completed).length;

    if (totalLessons === 0 || completedLessons < totalLessons) {
      return NextResponse.json({ 
        error: 'Курс ещё не пройден',
        progress: {
          total: totalLessons,
          completed: completedLessons,
          percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
        }
      }, { status: 400 });
    }

    // Проверяем, не был ли уже выдан сертификат
    const existingCertificate = await prisma.certificate.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId
        }
      }
    });

    if (existingCertificate) {
      return NextResponse.json({ 
        certificate: existingCertificate,
        message: 'Сертификат уже был выдан'
      });
    }

    // Получаем название курса
    const course = await prisma.course.findUnique({
      where: { slug: courseId }
    });

    if (!course) {
      return NextResponse.json({ error: 'Курс не найден' }, { status: 404 });
    }

    // Генерируем сертификат
    const certificateId = `CERT-${randomUUID().split('-')[0].toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
    
    const certificate = await prisma.certificate.create({
      data: {
        userId: session.user.id,
        courseId,
        certificateId,
        studentName: session.user.name || session.user.email || 'Студент',
        courseName: course.title
      }
    });

    return NextResponse.json({ 
      success: true,
      certificate,
      message: 'Сертификат успешно создан'
    });
  } catch (error) {
    console.error('Certificate POST error:', error);
    return NextResponse.json({ error: 'Ошибка при создании сертификата' }, { status: 500 });
  }
}
