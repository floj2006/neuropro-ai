'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { courses } from '@/lib/data/courses';
import SectionHeading from '@/components/section-heading';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';

export default function CourseBuyPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const slug = params.slug as string;
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-semibold text-white">Курс не найден</h1>
        <p className="mt-4 text-[color:var(--muted)]">Извините, такой курс не существует.</p>
        <Button href="/courses" className="mt-6">
          Вернуться к курсам
        </Button>
      </div>
    );
  }

  const handlePurchase = async () => {
    if (status === 'unauthenticated') {
      signIn(undefined, { callbackUrl: `/courses/${course.slug}/buy` });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/purchases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: course.slug,
          amount: parseFloat(course.price.replace(/\s/g, '').replace('₽', '')),
          courseName: course.title
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка при покупке');
      }

      router.push(`/courses/${course.slug}/success`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pb-20">
      <section className="section">
        <SectionHeading
          eyebrow="Покупка"
          title={`Запись на курс: ${course.title}`}
          description="Заполните данные для оплаты и начните обучение"
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.7fr]">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-white">Данные для оплаты</h2>
            
            {status === 'authenticated' ? (
              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-sm text-[color:var(--muted)]">Email</label>
                  <p className="mt-1 text-white">{session?.user?.email}</p>
                </div>
                <div>
                  <label className="text-sm text-[color:var(--muted)]">Имя</label>
                  <p className="mt-1 text-white">{session?.user?.name || 'Не указано'}</p>
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-[color:var(--muted)]">
                  Для покупки необходимо войти в систему
                </p>
                <Button onClick={() => signIn(undefined, { callbackUrl: `/courses/${course.slug}/buy` })} className="mt-4">
                  Войти
                </Button>
              </div>
            )}

            {error && (
              <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
                {error}
              </div>
            )}

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white">Способ оплаты</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <button className="rounded-lg border border-white/10 bg-white/5 p-4 text-center text-sm text-[color:var(--muted)] transition hover:border-[color:var(--neon)]">
                  💳 Карта РФ
                </button>
                <button className="rounded-lg border border-white/10 bg-white/5 p-4 text-center text-sm text-[color:var(--muted)] transition hover:border-[color:var(--neon)]">
                  🏦 СБП
                </button>
                <button className="rounded-lg border border-white/10 bg-white/5 p-4 text-center text-sm text-[color:var(--muted)] transition hover:border-[color:var(--neon)]">
                  📄 Счёт для юрлиц
                </button>
              </div>
            </div>

            <Button 
              onClick={handlePurchase} 
              disabled={isLoading || status === 'unauthenticated'}
              className="mt-8 w-full glow"
              size="lg"
            >
              {isLoading ? 'Обработка...' : `Оплатить ${course.price}`}
            </Button>

            <p className="mt-4 text-center text-xs text-[color:var(--muted)]">
              Нажимая кнопку, вы соглашаетесь с{' '}
              <Link href="/terms" className="text-[color:var(--neon-2)]">
                условиями использования
              </Link>
            </p>
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white">О курсе</h3>
              <p className="mt-3 text-sm text-[color:var(--muted)]">{course.description}</p>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-[color:var(--muted)]">Длительность:</span>
                  <span className="font-semibold text-white">{course.duration}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-[color:var(--muted)]">Уровень:</span>
                  <span className="font-semibold text-white">
                    {course.level === 'Beginner' ? 'Начинающий' : course.level === 'Automation' ? 'Автоматизация' : course.level === 'AI Business' ? 'ИИ-бизнес' : 'Продвинутый'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-[color:var(--muted)]">Инструктор:</span>
                  <span className="font-semibold text-white">{course.instructor.name}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white">Что входит</h3>
              <ul className="mt-4 space-y-2 text-sm text-[color:var(--muted)]">
                {course.whatIncluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[color:var(--neon-2)]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
