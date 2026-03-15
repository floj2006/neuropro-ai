'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError('Произошла ошибка при входе');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

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

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full glow"
        size="lg"
      >
        {isLoading ? 'Вход...' : 'Войти'}
      </Button>
    </form>
  );
}

export default function SignInPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center py-12">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-semibold text-white">Вход в NeuroPro</h1>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          Введите данные для входа в аккаунт
        </p>

        <Suspense fallback={<div className="mt-8 text-center text-[color:var(--muted)]">Загрузка...</div>}>
          <SignInForm />
        </Suspense>

        <div className="mt-6 text-center text-sm text-[color:var(--muted)]">
          Нет аккаунта?{' '}
          <Link href="/auth/signup" className="text-[color:var(--neon-2)]">
            Зарегистрироваться
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
