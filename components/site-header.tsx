'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { useState } from 'react';

const navItems = [
  { label: 'Курсы', href: '/courses' },
  { label: 'О нас', href: '/about' },
  { label: 'Контакты', href: '/contact' },
  { label: 'Кабинет', href: '/dashboard' }
];

export default function SiteHeader() {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[color:rgba(10,12,20,0.7)] backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-10">
        {/* Логотип */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight">
            Neuro<span className="neon-text">Pro</span>
          </span>
          <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
            ИИ Академия
          </span>
        </Link>

        {/* Десктопное меню */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[color:var(--muted)] transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Кнопки справа */}
        <div className="flex items-center gap-3">
          {/* Десктопные кнопки */}
          <div className="hidden items-center gap-3 md:flex">
            {status === 'authenticated' ? (
              <>
                <Link href="/dashboard" className="text-sm text-[color:var(--muted)]">
                  {session.user?.name || 'Кабинет'}
                </Link>
                <Button onClick={() => signOut({ callbackUrl: '/' })} variant="outline" size="sm">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link href="/courses" className="text-sm text-[color:var(--muted)]">
                  Каталог
                </Link>
                <Button href="/auth/signin" className="glow">
                  Войти
                </Button>
              </>
            )}
          </div>

          {/* Мобильная кнопка меню */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center rounded-lg p-2 text-[color:var(--muted)] transition hover:bg-white/5 md:hidden"
            aria-label="Меню"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {mobileMenuOpen && (
        <div className="border-t border-white/5 bg-[color:rgba(10,12,20,0.95)] px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[color:var(--muted)] transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <hr className="border-white/10" />
            {status === 'authenticated' ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold text-white"
                >
                  👤 {session.user?.name || 'Кабинет'}
                </Link>
                <button
                  onClick={() => {
                    signOut({ callbackUrl: '/' });
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-[color:var(--muted)] transition hover:text-white"
                >
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold text-[color:var(--neon-2)]"
                >
                  Войти
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[color:var(--muted)] transition hover:text-white"
                >
                  Регистрация
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
