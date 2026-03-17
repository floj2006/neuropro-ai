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

    await prisma.user.update({
      where: { id: params.id },
      data: {
        name: typeof body?.name === 'string' ? body.name : undefined,
        role: role ?? undefined
      }
    });

    if (Array.isArray(body?.privileges)) {
      await prisma.$executeRaw`
        UPDATE "User"
        SET "privileges" = ${JSON.stringify(body.privileges)}
        WHERE "id" = ${params.id}
      `;
    }

    const updated = await prisma.user.findUnique({
      where: { id: params.id }
    });

    if (!updated) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const rawPrivileges = (updated as { privileges?: unknown }).privileges;

    return NextResponse.json({
      id: updated.id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
      privileges: Array.isArray(rawPrivileges)
        ? rawPrivileges.filter((item): item is string => typeof item === 'string')
        : [],
      createdAt: updated.createdAt.toLocaleDateString('ru-RU')
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Не удалось сохранить изменения';
    console.error('Admin user update error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
