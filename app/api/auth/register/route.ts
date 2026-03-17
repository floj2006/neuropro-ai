import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const DEFAULT_PRIVILEGES = ['Доступ к платформе', 'Личный кабинет'];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, telegramId } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email и пароль обязательны' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Пользователь с таким email уже существует' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'USER'
      }
    });

    await prisma.$executeRaw`
      UPDATE "User"
      SET "privileges" = ${JSON.stringify(DEFAULT_PRIVILEGES)}
      WHERE "id" = ${user.id}
    `;

    if (telegramId) {
      await prisma.tgUser.upsert({
        where: { telegramId: String(telegramId) },
        update: {
          name: name || 'Студент NeuroPro'
        },
        create: {
          telegramId: String(telegramId),
          name: name || 'Студент NeuroPro',
          role: 'Student',
          status: 'Активен'
        }
      });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Ошибка при регистрации' }, { status: 500 });
  }
}
