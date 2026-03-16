'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { courses } from '@/lib/data/courses';
import SectionHeading from '@/components/section-heading';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';

const levelLabels = {
  'Beginner': 'Начинающий',
  'Automation': 'Автоматизация',
  'AI Business': 'AI-бизнес',
  'Advanced': 'Продвинутый'
} as const;

export default function CourseMaterialsClient() {
  const params = useParams();
  const slug = params.slug as string;
  const course = courses.find((c) => c.slug === slug);

  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [percentage, setPercentage] = useState(0);
  const [totalLessons, setTotalLessons] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [loading, setLoading] = useState(true);
  const [generatingCert, setGeneratingCert] = useState(false);

  useEffect(() => {
    if (!course) return;

    // Загружаем прогресс
    fetch(`/api/progress?courseId=${course.slug}`)
      .then((res) => {
        if (res.status === 403) {
          // Курс не куплен - редирект на страницу курса
          window.location.href = `/courses/${course.slug}`;
          return null;
        }
        if (!res.ok) throw new Error('Ошибка загрузки');
        return res.json();
      })
      .then((data) => {
        if (data) {
          setProgress(data.progress || {});
          setPercentage(data.percentage || 0);
          setTotalLessons(data.totalLessons || 0);
          setCompletedLessons(data.completedLessons || 0);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [course]);

  const toggleLesson = useCallback(async (moduleId: number, lessonId: number, currentCompleted: boolean) => {
    if (!course) return;

    const newCompleted = !currentCompleted;
    const key = `${moduleId}-${lessonId}`;
    
    // Оптимистичное обновление UI
    setProgress((prev) => ({ ...prev, [key]: newCompleted }));
    
    const newCompletedCount = newCompleted 
      ? completedLessons + 1 
      : completedLessons - 1;
    const newPercentage = totalLessons > 0 
      ? Math.round((newCompletedCount / totalLessons) * 100) 
      : 0;

    setCompletedLessons(newCompletedCount);
    setPercentage(newPercentage);

    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: course.slug,
          moduleId,
          lessonId,
          completed: newCompleted
        })
      });

      const data = await response.json();

      if (!response.ok) {
        // Откат изменений при ошибке
        setProgress((prev) => ({ ...prev, [key]: currentCompleted }));
        setCompletedLessons(completedLessons);
        setPercentage(percentage);
        throw new Error(data.error || 'Ошибка сохранения');
      }

      // Обновляем данными с сервера
      setPercentage(data.percentage);
      setCompletedLessons(data.completedLessons);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }, [course, completedLessons, totalLessons, percentage]);

  const handleGenerateCertificate = async () => {
    if (!course) return;
    
    setGeneratingCert(true);
    try {
      const response = await fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: course.slug })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка при создании сертификата');
      }

      alert('Сертификат успешно создан! Переходим к загрузке...');
      window.location.href = '/certificates';
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert(error instanceof Error ? error.message : 'Ошибка при создании сертификата');
    } finally {
      setGeneratingCert(false);
    }
  };

  if (!course) {
    notFound();
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-white">Загрузка прогресса...</div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {/* Header с прогрессом */}
      <section className="section">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-6">
            <div className="space-y-4">
              <Badge>{levelLabels[course.level]}</Badge>
              <h1 className="text-3xl font-semibold text-white">{course.title}</h1>
              <p className="text-lg text-[color:var(--muted)]">{course.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-[color:var(--muted)]">
                <span>⏱ {course.duration}</span>
                <span>📚 {course.detailedModules.length} модулей</span>
              </div>
            </div>
            <div className="hidden lg:block">
              <Button href="/dashboard" variant="outline">
                ← Назад к dashboard
              </Button>
            </div>
          </div>

          {/* Прогресс бар */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Ваш прогресс</p>
                <p className="mt-1 text-sm text-[color:var(--muted)]">
                  Пройдено {completedLessons} из {totalLessons} уроков
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[color:var(--neon-2)]">{percentage}%</p>
              </div>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div 
                className="h-full bg-gradient-to-r from-[color:var(--neon)] to-[color:var(--neon-2)] transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </Card>
        </div>
      </section>

      {/* Программа курса с чекбоксами */}
      <section id="modules" className="section">
        <SectionHeading
          eyebrow="Программа"
          title="Модули курса"
          description="Отмечайте уроки галочкой по мере прохождения"
        />
        <div className="mt-10 space-y-4">
          {course.detailedModules.map((module, moduleIndex) => (
            <Card key={module.title} className="overflow-hidden">
              <div className="border-b border-white/10 bg-white/5 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--neon-2)]">
                      Модуль {moduleIndex + 1}
                    </p>
                    <h3 className="text-xl font-semibold text-white">{module.title}</h3>
                    <p className="text-sm text-[color:var(--muted)]">{module.description}</p>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[color:var(--neon)] text-lg font-bold text-white">
                    {moduleIndex + 1}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {module.lessons.map((lesson, lessonIndex) => {
                    const key = `${moduleIndex}-${lessonIndex}`;
                    const isCompleted = progress[key] || false;
                    
                    return (
                      <li key={lesson} className="flex items-center gap-3">
                        <button
                          onClick={() => toggleLesson(moduleIndex, lessonIndex, isCompleted)}
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${
                            isCompleted
                              ? 'border-[color:var(--neon-2)] bg-[color:var(--neon-2)] text-white'
                              : 'border-white/30 bg-white/5 hover:border-[color:var(--neon)]'
                          }`}
                          title={isCompleted ? 'Отметить как непройденный' : 'Отметить как пройденный'}
                        >
                          {isCompleted && (
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <span className={`text-sm ${isCompleted ? 'text-[color:var(--muted)] line-through' : 'text-white'}`}>
                          {lesson}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Промпты */}
      <section id="prompts" className="section">
        <SectionHeading
          eyebrow="Промпты"
          title="Готовые промпты для ИИ"
          description="Используйте эти шаблоны для работы с нейросетями"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {course.level === 'Beginner' && (
            <>
              <Card className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-xl">📝</span>
                  <h3 className="font-semibold text-white">Базовый промпт</h3>
                </div>
                <div className="rounded-lg bg-black/30 p-4 font-mono text-xs text-green-400">
                  <p>Ты — опытный [роль]. Помоги мне [задача].</p>
                  <p className="mt-2 text-[color:var(--muted)]">
                    {/* Контекст: ... */}
                  </p>
                  <p className="text-[color:var(--muted)]">
                    {/* Формат ответа: ... */}
                  </p>
                </div>
                <p className="mt-3 text-xs text-[color:var(--muted)]">
                  Замените переменные на свои значения
                </p>
              </Card>

              <Card className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-xl">🎯</span>
                  <h3 className="font-semibold text-white">Промпт для анализа</h3>
                </div>
                <div className="rounded-lg bg-black/30 p-4 font-mono text-xs text-green-400">
                  <p>Проанализируй следующий текст:</p>
                  <p className="mt-2 text-[color:var(--muted)]">"""</p>
                  <p className="text-[color:var(--muted)]">[вставьте текст]</p>
                  <p className="text-[color:var(--muted)]">"""</p>
                  <p className="mt-2">Выдели:</p>
                  <p className="text-[color:var(--muted)]">- Ключевые идеи</p>
                  <p className="text-[color:var(--muted)]">- Основные выводы</p>
                  <p className="text-[color:var(--muted)]">- Рекомендации</p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-xl">💡</span>
                  <h3 className="font-semibold text-white">Генерация идей</h3>
                </div>
                <div className="rounded-lg bg-black/30 p-4 font-mono text-xs text-green-400">
                  <p>Сгенерируй 10 идей для [тема].</p>
                  <p className="mt-2 text-[color:var(--muted)]">
                    {/* Критерии: */}
                  </p>
                  <p className="text-[color:var(--muted)]">- [критерий 1]</p>
                  <p className="text-[color:var(--muted)]">- [критерий 2]</p>
                  <p className="text-[color:var(--muted)]">- [критерий 3]</p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-xl">✍️</span>
                  <h3 className="font-semibold text-white">Написание текста</h3>
                </div>
                <div className="rounded-lg bg-black/30 p-4 font-mono text-xs text-green-400">
                  <p>Напиши [тип текста] на тему [тема].</p>
                  <p className="mt-2 text-[color:var(--muted)]">
                    {/* Целевая аудитория: ... */}
                  </p>
                  <p className="text-[color:var(--muted)]">
                    {/* Тон: ... */}
                  </p>
                  <p className="text-[color:var(--muted)]">
                    {/* Длина: ... слов */}
                  </p>
                </div>
              </Card>
            </>
          )}

          {course.level === 'Automation' && (
            <>
              <Card className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-xl">⚙️</span>
                  <h3 className="font-semibold text-white">Автоматизация процессов</h3>
                </div>
                <div className="rounded-lg bg-black/30 p-4 font-mono text-xs text-green-400">
                  <p>Создай план автоматизации для [процесс].</p>
                  <p className="mt-2 text-[color:var(--muted)]">
                    {/* Текущие шаги: */}
                  </p>
                  <p className="text-[color:var(--muted)]">
                    {/* 1. ... */}
                  </p>
                  <p className="text-[color:var(--muted)]">
                    {/* 2. ... */}
                  </p>
                  <p className="mt-2">Предложи ИИ-инструменты для каждого этапа</p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-xl">🔗</span>
                  <h3 className="font-semibold text-white">Интеграция API</h3>
                </div>
                <div className="rounded-lg bg-black/30 p-4 font-mono text-xs text-green-400">
                  <p>Напиши код для интеграции [сервис] API.</p>
                  <p className="mt-2 text-[color:var(--muted)]">
                    {/* Язык: Python/JavaScript */}
                  </p>
                  <p className="text-[color:var(--muted)]">
                    {/* Задача: ... */}
                  </p>
                  <p className="mt-2">Включи обработку ошибок и логирование</p>
                </div>
              </Card>
            </>
          )}

          {course.level === 'AI Business' && (
            <>
              <Card className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-xl">📊</span>
                  <h3 className="font-semibold text-white">Бизнес-анализ</h3>
                </div>
                <div className="rounded-lg bg-black/30 p-4 font-mono text-xs text-green-400">
                  <p>Проанализируй бизнес-модель [компания].</p>
                  <p className="mt-2 text-[color:var(--muted)]">
                    {/* Используй: */}
                  </p>
                  <p className="text-[color:var(--muted)]">- SWOT анализ</p>
                  <p className="text-[color:var(--muted)]">- Porter's Five Forces</p>
                  <p className="text-[color:var(--muted)]">- Business Model Canvas</p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-xl">🚀</span>
                  <h3 className="font-semibold text-white">Go-to-Market стратегия</h3>
                </div>
                <div className="rounded-lg bg-black/30 p-4 font-mono text-xs text-green-400">
                  <p>Разработай GTM стратегию для [продукт].</p>
                  <p className="mt-2 text-[color:var(--muted)]">
                    {/* Целевой сегмент: ... */}
                  </p>
                  <p className="text-[color:var(--muted)]">
                    {/* Каналы: ... */}
                  </p>
                  <p className="text-[color:var(--muted)]">
                    {/* KPI: ... */}
                  </p>
                </div>
              </Card>
            </>
          )}

          {course.level === 'Advanced' && (
            <>
              <Card className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-xl">🧠</span>
                  <h3 className="font-semibold text-white">Продвинутый промптинг</h3>
                </div>
                <div className="rounded-lg bg-black/30 p-4 font-mono text-xs text-green-400">
                  <p>Используй технику Chain-of-Thought:</p>
                  <p className="mt-2 text-[color:var(--muted)]">1. Разбей задачу на шаги</p>
                  <p className="text-[color:var(--muted)]">2. Для каждого шага создай промпт</p>
                  <p className="text-[color:var(--muted)]">3. Передавай контекст между шагами</p>
                  <p className="mt-2 text-white">Пример:</p>
                  <p className="text-[color:var(--muted)]">"Давай решим эту задачу пошагово...</p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-xl">🔄</span>
                  <h3 className="font-semibold text-white">Итеративный промпт</h3>
                </div>
                <div className="rounded-lg bg-black/30 p-4 font-mono text-xs text-green-400">
                  <p>Сначала создай черновик [результат].</p>
                  <p className="mt-2 text-[color:var(--muted)]">Затем:</p>
                  <p className="text-[color:var(--muted)]">1. Оцени по критериям [...]</p>
                  <p className="text-[color:var(--muted)]">2. Предложи улучшения</p>
                  <p className="text-[color:var(--muted)]">3. Создай финальную версию</p>
                </div>
              </Card>
            </>
          )}

          {/* Универсальные промпты для всех курсов */}
          <Card className="p-6 md:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-xl">🎓</span>
              <h3 className="font-semibold text-white">Промпт для обучения</h3>
            </div>
            <div className="rounded-lg bg-black/30 p-4 font-mono text-xs text-green-400">
              <p>Объясни мне [тему] как [уровень].</p>
              <p className="mt-2 text-[color:var(--muted)]">
                {/* Используй: */}
              </p>
              <p className="text-[color:var(--muted)]">- Простые аналогии</p>
              <p className="text-[color:var(--muted)]">- Практические примеры</p>
              <p className="text-[color:var(--muted)]">- Проверочные вопросы</p>
            </div>
          </Card>
        </div>
      </section>

      {/* Что входит */}
      <section id="resources" className="section">
        <SectionHeading
          eyebrow="Ресурсы"
          title="Что входит в курс"
          description="Все материалы и инструменты для обучения"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {course.whatIncluded.map((item, idx) => (
            <Card key={idx} className="p-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-[color:var(--neon-2)]">✓</span>
                <p className="font-medium text-white">{item}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Результаты */}
      <section className="section">
        <SectionHeading
          eyebrow="Результаты"
          title="Чему вы научитесь"
          description="Практические навыки после прохождения курса"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {course.outcomes.map((outcome, idx) => (
            <Card key={idx} className="p-4">
              <div className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color:var(--neon)]/20 text-sm font-semibold text-[color:var(--neon-2)]">
                  {idx + 1}
                </span>
                <p className="text-sm text-white">{outcome}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <Card className="p-8 text-center neon-border glow">
          <p className="text-sm uppercase tracking-[0.25em] text-[color:var(--neon-2)]">Продолжайте в том же духе</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            {percentage === 0 ? 'Начните обучение прямо сейчас' :
             percentage === 100 ? 'Поздравляем! Курс завершён!' :
             `Вы на полпути! Продолжайте (${percentage}%)`}
          </h3>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            {percentage === 0 ? 'Пройдите первый урок, чтобы начать' :
             percentage === 100 ? 'Вы успешно завершили все уроки курса' :
             `Осталось пройти ${totalLessons - completedLessons} уроков`}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button href="#modules" size="lg">
              {percentage === 0 ? 'Начать обучение' : 'Продолжить'}
            </Button>
            {percentage === 100 ? (
              <Button onClick={handleGenerateCertificate} disabled={generatingCert} className="glow" size="lg">
                {generatingCert ? 'Создание...' : '🎓 Получить сертификат'}
              </Button>
            ) : null}
            <Button href="/dashboard" variant="outline" size="lg">
              В личный кабинет
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
