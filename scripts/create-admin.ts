import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import readline from 'readline';

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
}

async function createAdmin() {
  console.log('\n🔐 Создание администратора NeuroPro\n');

  const email = await askQuestion('Email: ');
  const name = await askQuestion('Имя: ');
  const password = await askQuestion('Пароль: ');

  if (!email || !password) {
    console.log('❌ Email и пароль обязательны');
    process.exit(1);
  }

  // Проверяем, существует ли уже пользователь
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    console.log('❌ Пользователь с таким email уже существует');
    process.exit(1);
  }

  // Хешируем пароль
  const hashedPassword = await bcrypt.hash(password, 10);

  // Создаём администратора
  const admin = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: 'ADMIN'
    }
  });

  console.log('\n✅ Администратор успешно создан!');
  console.log(`   ID: ${admin.id}`);
  console.log(`   Email: ${admin.email}`);
  console.log(`   Роль: ADMIN\n`);

  rl.close();
  await prisma.$disconnect();
}

createAdmin().catch((err) => {
  console.error('Ошибка:', err);
  process.exit(1);
});
