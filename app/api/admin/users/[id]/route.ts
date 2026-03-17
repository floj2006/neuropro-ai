import { NextResponse } from 'next/server';
import { auth } from '../../../../../lib/auth';
import { prisma } from '../../../../../lib/prisma';

const ALLOWED_ROLES = ['USER', 'ADMIN'] as const;
type AllowedRole = typeof ALLOWED_ROLES[number];

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await request.json();

    const role = body?.role as AllowedRole | undefined;
    if (role && !ALLOWED_ROLES.includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    const update = await prisma.user.update({
      where: { id: params.id },
      data: {
        name: typeof body?.name === 'string' ? body.name : undefined,
        role: role ?? undefined,
        privileges: Array.isArray(body?.privileges) ? body.privileges : undefined
      }
    });

    return NextResponse.json({
      id: update.id,
      name: update.name,
      email: update.email,
      role: update.role,
      privileges: Array.isArray(update.privileges) ? update.privileges : [],
      createdAt: update.createdAt.toLocaleDateString('ru-RU')
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Не удалось сохранить изменения';
    console.error('Admin user update error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

