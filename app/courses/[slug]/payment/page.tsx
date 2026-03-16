'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { courses } from '@/lib/data/courses';
import SectionHeading from '@/components/section-heading';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CoursePaymentPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Форма
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inn, setInn] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'sbp' | 'invoice'>('card');

  const slug = params.slug as string;
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-semibold text-white">Курс не найден</h1>
        <p className="mt-4 text-[color:var(--muted)]">Извините, такой курс не существует.</p>
        <Button onClick={() => router.push('/courses')} className="mt-6">
          Вернуться к курсам
        </Button>
      </div>
    );
  }

  const priceValue = parseFloat(course.price.replace(/\s/g, '').replace('₽', ''));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (status === 'unauthenticated') {
      signIn(undefined, { callbackUrl: `/courses/${course.slug}/payment` });
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
          amount: priceValue,
          courseName: course.title,
          fullName,
          email: email || session?.user?.email,
          phone,
          inn: paymentMethod === 'invoice' ? inn : undefined,
          paymentMethod
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка при покупке');
      }

      setSuccess(true);
      
      // Перенаправление на страницу успеха с slug курса
      setTimeout(() => {
        router.push(`/courses/${course.slug}/success?slug=${course.slug}`);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="py-20 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
          <span className="text-4xl">✓</span>
        </div>
        <h1 className="text-2xl font-semibold text-white">Оплата оформлена!</h1>
        <p className="mt-4 text-[color:var(--muted)]">
          Перенаправляем вас на страницу доступа к курсу...
        </p>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <section className="section">
        <SectionHeading
          eyebrow="Оформление заказа"
          title={course.title}
          description="Заполните форму для оплаты курса"
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.6fr]">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-white">Платёжные данные</h2>

            {status === 'authenticated' && (
              <div className="mt-4 rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-400">
                ✓ Вы вошли как {session?.user?.email}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label htmlFor="fullName" className="text-sm text-[color:var(--muted)]">
                  ФИО полностью *
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-[color:var(--muted)] focus:border-[color:var(--neon)] focus:outline-none"
                  placeholder="Иванов Иван Иванович"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-sm text-[color:var(--muted)]">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-[color:var(--muted)] focus:border-[color:var(--neon)] focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="text-sm text-[color:var(--muted)]">
                  Телефон *
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-[color:var(--muted)] focus:border-[color:var(--neon)] focus:outline-none"
                  placeholder="+7 (999) 000-00-00"
                />
              </div>

              {paymentMethod === 'invoice' && (
                <div>
                  <label htmlFor="inn" className="text-sm text-[color:var(--muted)]">
                    ИНН организации *
                  </label>
                  <input
                    id="inn"
                    type="text"
                    value={inn}
                    onChange={(e) => setInn(e.target.value)}
                    required
                    className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-[color:var(--muted)] focus:border-[color:var(--neon)] focus:outline-none"
                    placeholder="1234567890"
                  />
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-white">Способ оплаты</h3>
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`rounded-lg border p-4 text-center text-sm transition ${
                      paymentMethod === 'card'
                        ? 'border-[color:var(--neon)] bg-[color:var(--neon))]/10 text-white'
                        : 'border-white/10 bg-white/5 text-[color:var(--muted)] hover:border-white/20'
                    }`}
                  >
                    <span className="block text-xl">💳</span>
                    <span className="mt-1 block">Карта РФ</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('sbp')}
                    className={`rounded-lg border p-4 text-center text-sm transition ${
                      paymentMethod === 'sbp'
                        ? 'border-[color:var(--neon)] bg-[color:var(--neon))]/10 text-white'
                        : 'border-white/10 bg-white/5 text-[color:var(--muted)] hover:border-white/20'
                    }`}
                  >
                    <span className="block text-xl">🏦</span>
                    <span className="mt-1 block">СБП</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('invoice')}
                    className={`rounded-lg border p-4 text-center text-sm transition ${
                      paymentMethod === 'invoice'
                        ? 'border-[color:var(--neon)] bg-[color:var(--neon))]/10 text-white'
                        : 'border-white/10 bg-white/5 text-[color:var(--muted)] hover:border-white/20'
                    }`}
                  >
                    <span className="block text-xl">📄</span>
                    <span className="mt-1 block">Счёт для юрлиц</span>
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading || (status === 'unauthenticated' && !fullName)}
                className="w-full glow"
                size="lg"
              >
                {isLoading
                  ? 'Обработка...'
                  : status === 'unauthenticated'
                  ? 'Войти и оплатить'
                  : `Оплатить ${course.price}`}
              </Button>

              <p className="text-center text-xs text-[color:var(--muted)]">
                Нажимая кнопку, вы соглашаетесь с{' '}
                <Link href="/terms" className="text-[color:var(--neon-2)]">
                  условиями использования
                </Link>
              </p>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white">Ваш заказ</h3>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[color:var(--muted)]">Курс:</span>
                  <span className="font-medium text-white">{course.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[color:var(--muted)]">Длительность:</span>
                  <span className="font-medium text-white">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[color:var(--muted)]">Формат:</span>
                  <span className="font-medium text-white">Онлайн</span>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <div className="flex justify-between text-base">
                    <span className="font-medium text-white">Итого:</span>
                    <span className="font-semibold text-[color:var(--neon-2)]">{course.price}</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white">Реквизиты для оплаты</h3>
              <div className="mt-4 space-y-2 text-xs text-[color:var(--muted)]">
                <p>
                  <span className="text-white">Получатель:</span> ИП Иванов И.И.
                </p>
                <p>
                  <span className="text-white">ИНН:</span> 123456789012
                </p>
                <p>
                  <span className="text-white">Расчётный счёт:</span> 40802810000000000000
                </p>
                <p>
                  <span className="text-white">Банк:</span> АО «Тинькофф Банк»
                </p>
                <p>
                  <span className="text-white">БИК:</span> 044525974
                </p>
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
