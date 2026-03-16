import { redirect } from 'next/navigation';
import { auth } from '../../lib/auth';
import { prisma } from '../../lib/prisma';
import type { User } from '@prisma/client';
import { Card } from '../../components/ui/card';
import AdminUsers from '../../components/admin/admin-users';

function getInitials(name?: string | null, email?: string | null) {
  const source = name || email || 'NP';
  return source
    .split(' ')
    .map((part) => part.trim()[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/signin');
  }

  if (session.user.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const adminPrivileges = [
    'Полный доступ к пользователям',
    'Управление ролями',
    'Просмотр покупок и прогресса',
    'Доступ к аналитике'
  ];

  const usersPayload = users.map((user: User) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    privileges: Array.isArray(user.privileges) ? (user.privileges as string[]) : null,
    createdAt: user.createdAt.toLocaleDateString('ru-RU')
  }));

  return (
    <div className="section pb-16">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--neon-2)]">Admin Console</p>
        <h1 className="text-3xl font-semibold text-white">Панель администратора NeuroPro</h1>
        <p className="text-sm text-[color:var(--muted)]">
          Здесь можно управлять пользователями и просматривать их статусы, роли и доступы.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-white">Ваш профиль администратора</h2>
          <div className="mt-4 grid gap-4 text-sm text-[color:var(--muted)]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(127,92,255,0.6),rgba(40,215,255,0.6))] text-sm font-semibold text-white">
                {getInitials(session.user.name, session.user.email)}
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em]">Имя</p>
                <p className="mt-1 text-white">{session.user.name ?? session.user.email}</p>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em]">Роль</p>
              <p className="mt-1 text-white">Администратор</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em]">Привилегии</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {adminPrivileges.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-white">Сводка</h2>
          <div className="mt-4 grid gap-4 text-sm text-[color:var(--muted)]">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em]">Пользователи</p>
              <p className="mt-2 text-2xl font-semibold text-white">{users.length}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em]">Админы</p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {users.filter((user) => user.role === 'ADMIN').length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <AdminUsers users={usersPayload} />
    </div>
  );
}
