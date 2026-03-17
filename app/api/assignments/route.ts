import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const assignmentClient = (prisma as unknown as { assignment: any }).assignment;
const notificationClient = (prisma as unknown as { notification: any }).notification;

// GET - РїРѕР»СѓС‡РёС‚СЊ РґРѕРјР°С€РЅРёРµ Р·Р°РґР°РЅРёСЏ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'РќРµРѕР±С…РѕРґРёРјРѕ РІРѕР№С‚Рё РІ СЃРёСЃС‚РµРјСѓ' }, { status: 401 });
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

    const assignments = await assignmentClient.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ assignments });
  } catch (error) {
    console.error('Assignments GET error:', error);
    return NextResponse.json({ error: 'РћС€РёР±РєР° РїСЂРё РїРѕР»СѓС‡РµРЅРёРё Р·Р°РґР°РЅРёР№' }, { status: 500 });
  }
}

// POST - РѕС‚РїСЂР°РІРёС‚СЊ РґРѕРјР°С€РЅРµРµ Р·Р°РґР°РЅРёРµ
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'РќРµРѕР±С…РѕРґРёРјРѕ РІРѕР№С‚Рё РІ СЃРёСЃС‚РµРјСѓ' }, { status: 401 });
    }

    const body = await req.json();
    const { courseId, moduleId, lessonId, content } = body;

    if (!courseId || moduleId === undefined || lessonId === undefined || !content) {
      return NextResponse.json({ error: 'РќРµРєРѕСЂСЂРµРєС‚РЅС‹Рµ РґР°РЅРЅС‹Рµ' }, { status: 400 });
    }

    // РџСЂРѕРІРµСЂСЏРµРј, РєСѓРїР»РµРЅ Р»Рё РєСѓСЂСЃ
    const purchase = await prisma.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId
        }
      }
    });

    if (!purchase) {
      return NextResponse.json({ error: 'РљСѓСЂСЃ РЅРµ РєСѓРїР»РµРЅ' }, { status: 403 });
    }

    // РЎРѕР·РґР°С‘Рј Р·Р°РґР°РЅРёРµ
    const assignment = await assignmentClient.create({
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

    // РЎРѕР·РґР°С‘Рј СѓРІРµРґРѕРјР»РµРЅРёРµ РґР»СЏ Р°РґРјРёРЅР°
    const admins = await prisma.user.findMany({
      where: { role: 'ADMIN' }
    });

    for (const admin of admins) {
      await notificationClient.create({
        data: {
          userId: admin.id,
          title: 'РќРѕРІРѕРµ РґРѕРјР°С€РЅРµРµ Р·Р°РґР°РЅРёРµ',
          message: `РЎС‚СѓРґРµРЅС‚ РѕС‚РїСЂР°РІРёР» Р”Р— РїРѕ РєСѓСЂСЃСѓ ${courseId}`,
          type: 'assignment'
        }
      });
    }

    return NextResponse.json({ success: true, assignment });
  } catch (error) {
    console.error('Assignment POST error:', error);
    return NextResponse.json({ error: 'РћС€РёР±РєР° РїСЂРё РѕС‚РїСЂР°РІРєРµ Р·Р°РґР°РЅРёСЏ' }, { status: 500 });
  }
}

// PATCH - РѕР±РЅРѕРІРёС‚СЊ СЃС‚Р°С‚СѓСЃ Р·Р°РґР°РЅРёСЏ (РґР»СЏ Р°РґРјРёРЅРѕРІ)
export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'РўРѕР»СЊРєРѕ РґР»СЏ Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂРѕРІ' }, { status: 403 });
    }

    const body = await req.json();
    const { id, status, feedback } = body;

    if (!id) {
      return NextResponse.json({ error: 'РќРµ СѓРєР°Р·Р°РЅ id Р·Р°РґР°РЅРёСЏ' }, { status: 400 });
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

    const assignment = await assignmentClient.update({
      where: { id },
      data: updateData
    });

    // РЎРѕР·РґР°С‘Рј СѓРІРµРґРѕРјР»РµРЅРёРµ РґР»СЏ СЃС‚СѓРґРµРЅС‚Р°
    await notificationClient.create({
      data: {
        userId: assignment.userId,
        title: 'Р”РѕРјР°С€РЅРµРµ Р·Р°РґР°РЅРёРµ РїСЂРѕРІРµСЂРµРЅРѕ',
        message: status === 'reviewed' 
          ? 'Р’Р°С€Рµ Р·Р°РґР°РЅРёРµ РїСЂРёРЅСЏС‚Рѕ!' 
          : 'Р—Р°РґР°РЅРёРµ С‚СЂРµР±СѓРµС‚ РґРѕСЂР°Р±РѕС‚РєРё',
        type: 'assignment'
      }
    });

    return NextResponse.json({ success: true, assignment });
  } catch (error) {
    console.error('Assignment PATCH error:', error);
    return NextResponse.json({ error: 'РћС€РёР±РєР° РїСЂРё РѕР±РЅРѕРІР»РµРЅРёРё Р·Р°РґР°РЅРёСЏ' }, { status: 500 });
  }
}
