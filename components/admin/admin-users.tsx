'use client';

import { useMemo, useState } from 'react';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

type UserItem = {
  id: string;
  name: string | null;
  email: string;
  role: 'USER' | 'ADMIN';
  status: string;
  privileges: string[] | null;
  createdAt: string;
};

const roleLabels: Record<UserItem['role'], string> = {
  ADMIN: 'Администратор',
  USER: 'Студент'
};

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

export default function AdminUsers({ users }: { users: UserItem[] }) {
  const [items, setItems] = useState<UserItem[]>(users);
  const [editing, setEditing] = useState<UserItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const formatted = useMemo(
    () =>
      items.map((user) => ({
        ...user,
        privileges: Array.isArray(user.privileges) ? user.privileges : []
      })),
    [items]
  );

  const openEdit = (user: UserItem) => {
    setEditing({ ...user, privileges: Array.isArray(user.privileges) ? user.privileges : [] });
    setError('');
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    setError('');
    try {
      const response = await fetch(`/api/admin/users/${editing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editing.name,
          role: editing.role,
          status: editing.status,
          privileges: editing.privileges
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || 'Не удалось сохранить');
      }
      setItems((prev) => prev.map((item) => (item.id === data.id ? data : item)));
      setEditing(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold text-white">Пользователи</h2>
      <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[color:rgba(10,12,20,0.6)]">
        <div className="hidden grid-cols-[1.6fr_0.6fr_0.6fr_0.6fr_0.4fr] gap-4 border-b border-white/10 px-6 py-3 text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] md:grid">
          <span>Пользователь</span>
          <span>Роль</span>
          <span>Статус</span>
          <span>Регистрация</span>
          <span></span>
        </div>
        <div className="divide-y divide-white/5">
          {formatted.map((user) => (
            <div key={user.id} className="px-6 py-4">
              <div className="grid gap-4 md:grid-cols-[1.6fr_0.6fr_0.6fr_0.6fr_0.4fr] md:items-center">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-white">
                    {getInitials(user.name, user.email)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{user.name ?? 'Без имени'}</p>
                    <p className="text-xs text-[color:var(--muted)]">{user.email}</p>
                    <div className="mt-2 flex flex-wrap gap-2 md:hidden">
                      <Badge>{roleLabels[user.role]}</Badge>
                      <Badge variant="outline">{user.status}</Badge>
                    </div>
                  </div>
                </div>
                <div className="hidden items-center gap-2 md:flex">
                  <Badge>{roleLabels[user.role]}</Badge>
                </div>
                <div className="hidden items-center gap-2 md:flex">
                  <Badge variant="outline">{user.status}</Badge>
                </div>
                <div className="text-xs text-[color:var(--muted)]">{user.createdAt}</div>
                <div className="flex justify-start md:justify-end">
                  <Button size="sm" variant="outline" onClick={() => openEdit(user)}>
                    Редактировать
                  </Button>
                </div>
              </div>
              {user.privileges.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {user.privileges.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-5 pb-10 transition-all duration-300 ${
          editing ? 'opacity-100 backdrop-blur-sm' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setEditing(null)}
      >
        <div
          className={`w-full max-w-md rounded-3xl border border-white/10 bg-panel/95 p-6 shadow-glow transition-all duration-300 ${
            editing ? 'translate-y-0 scale-100' : 'translate-y-6 scale-95'
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neon2">Пользователь</p>
              <h2 className="mt-1 text-xl font-semibold text-white">Редактирование профиля</h2>
            </div>
            <button
              type="button"
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted"
              onClick={() => setEditing(null)}
            >
              Закрыть
            </button>
          </div>

          {editing ? (
            <div className="mt-4 space-y-4 text-sm text-[color:var(--muted)]">
              {error ? <p className="text-xs text-amber-300">{error}</p> : null}
              <div>
                <label className="text-xs uppercase tracking-[0.2em]">Имя</label>
                <input
                  value={editing.name ?? ''}
                  onChange={(event) => setEditing({ ...editing, name: event.target.value })}
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em]">Статус</label>
                <input
                  value={editing.status}
                  onChange={(event) => setEditing({ ...editing, status: event.target.value })}
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em]">Роль</label>
                <select
                  value={editing.role}
                  onChange={(event) => setEditing({ ...editing, role: event.target.value as UserItem['role'] })}
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white"
                >
                  <option value="USER">Студент</option>
                  <option value="ADMIN">Администратор</option>
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em]">Привилегии (через запятую)</label>
                <textarea
                  value={editing.privileges?.join(', ') ?? ''}
                  onChange={(event) =>
                    setEditing({
                      ...editing,
                      privileges: event.target.value
                        .split(',')
                        .map((item) => item.trim())
                        .filter(Boolean)
                    })
                  }
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white"
                />
              </div>
              <Button className="w-full" disabled={saving} onClick={handleSave}>
                {saving ? 'Сохраняем…' : 'Сохранить'}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
