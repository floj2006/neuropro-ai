'use client';

import { Suspense, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const telegramId = searchParams.get('telegramId');
  const presetName = searchParams.get('name');

  const [name, setName] = useState(presetName ?? '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (password.length < 6) {
      setError('Пароль должен быть не менее 6 символов');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, telegramId })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка при регистрации');
      }

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="text-sm text-[color:var(--muted)]">
          Имя
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-[color:var(--muted)] focus:border-[color:var(--neon)] focus:outline-none"
          placeholder="Иван Иванов"
        />
      </div>

      <div>
        <label htmlFor="email" className="text-sm text-[color:var(--muted)]">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-[color:var(--muted)] focus:border-[color:var(--neon)] focus:outline-none"
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="text-sm text-[color:var(--muted)]">
          Пароль
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-[color:var(--muted)] focus:border-[color:var(--neon)] focus:outline-none"
          placeholder="••••••••"
          required
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="text-sm text-[color:var(--muted)]">
          Подтвердите пароль
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-[color:var(--muted)] focus:border-[color:var(--neon)] focus:outline-none"
          placeholder="••••••••"
          required
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full glow" size="lg">
        {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
      </Button>
    </form>
  );
}

export default function SignUpPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center py-12">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-semibold text-white">Регистрация в NeuroPro</h1>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          Создайте аккаунт для доступа к курсам
        </p>

        <Suspense fallback={<div className="mt-8 text-sm text-[color:var(--muted)]">Загрузка...</div>}>
          <SignUpForm />
        </Suspense>

        <div className="mt-6 text-center text-sm text-[color:var(--muted)]">
          Уже есть аккаунт?{' '}
          <Link href="/auth/signin" className="text-[color:var(--neon-2)]">
            Войти
          </Link>
        </div>

        <div className="mt-4 text-center text-sm text-[color:var(--muted)]">
          <Link href="/" className="hover:text-white">
            ← На главную
          </Link>
        </div>
      </Card>
    </div>
  );
}
