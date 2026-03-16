'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { courses } from '@/lib/data/courses';

function SuccessContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const course = slug ? courses.find((c) => c.slug === slug) : null;

  return (
    <div className="py-12">
      <Card className="mx-auto max-w-2xl p-8">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
            <svg className="h-10 w-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-white text-center">Оплата успешна!</h1>
        <p className="mt-4 text-center text-[color:var(--muted)]">
          Спасибо за покупку. Доступ к курсу активирован.
        </p>

        {course && (
          <div className="mt-8 border-t border-white/10 pt-6">
            <h2 className="text-lg font-semibold text-white">{course.title}</h2>
            
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">Длительность</p>
                <p className="mt-1 text-white">{course.duration}</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">Модулей</p>
                <p className="mt-1 text-white">{course.detailedModules.length}</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">Программа курса</p>
              <div className="mt-3 space-y-2">
                {course.detailedModules.slice(0, 3).map((module, idx) => (
                  <div key={idx} className="rounded-lg border border-white/10 bg-white/5 p-3">
                    <p className="text-sm font-medium text-white">
                      <span className="text-[color:var(--neon-2)]">{idx + 1}.</span> {module.title}
                    </p>
                    {module.lessons.length > 0 && (
                      <p className="mt-1 text-xs text-[color:var(--muted)]">
                        Уроков: {module.lessons.length}
                      </p>
                    )}
                  </div>
                ))}
                {course.detailedModules.length > 3 && (
                  <p className="text-xs text-[color:var(--muted)]">
                    + ещё {course.detailedModules.length - 3} модулей
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">Что входит</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {course.whatIncluded.slice(0, 4).map((item, idx) => (
                  <span
                    key={idx}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 space-y-4">
          <Button href="/dashboard" className="w-full glow">
            Перейти в личный кабинет
          </Button>
          {course && (
            <>
              <Button href={`/courses/${course.slug}/materials`} variant="outline" className="w-full">
                📚 Открыть материалы курса
              </Button>
              <Button href={`/courses/${course.slug}`} variant="outline" className="w-full">
                Полная версия курса
              </Button>
            </>
          )}
          <Button href="/courses" variant="outline" className="w-full">
            Смотреть другие курсы
          </Button>
        </div>

        <p className="mt-6 text-center text-xs text-[color:var(--muted)]">
          Письмо с доступом отправлено на вашу почту
        </p>
      </Card>
    </div>
  );
}

export default function CourseBuySuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-white">Загрузка...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
