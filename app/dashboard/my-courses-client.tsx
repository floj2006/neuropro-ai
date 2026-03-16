'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CourseWithProgress {
  course: {
    slug: string;
    title: string;
    description: string;
    level: string;
    duration: string;
  };
  progress: number;
  completedLessons: number;
  totalLessons: number;
}

const levelLabels: Record<string, string> = {
  'Beginner': 'Начинающий',
  'Automation': 'Автоматизация',
  'AI Business': 'AI-бизнес',
  'Advanced': 'Продвинутый'
};

export default function MyCoursesClient({ purchasedCourses }: { purchasedCourses: CourseWithProgress[] }) {
  const [coursesWithProgress, setCoursesWithProgress] = useState<CourseWithProgress[]>(purchasedCourses);

  useEffect(() => {
    // Загружаем прогресс для каждого курса
    Promise.all(
      purchasedCourses.map(async (item) => {
        try {
          const res = await fetch(`/api/progress?courseId=${item.course.slug}`);
          if (!res.ok) return item;
          const data = await res.json();
          return {
            ...item,
            progress: data.percentage || 0,
            completedLessons: data.completedLessons || 0,
            totalLessons: data.totalLessons || 0
          };
        } catch {
          return item;
        }
      })
    ).then(setCoursesWithProgress);
  }, [purchasedCourses]);

  if (coursesWithProgress.length === 0) {
    return (
      <Card className="mt-6 p-8 text-center">
        <p className="text-lg text-white">У вас пока нет купленных курсов</p>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          Изучите каталог и выберите подходящий курс
        </p>
        <Button href="/courses" className="mt-6">
          Смотреть каталог
        </Button>
      </Card>
    );
  }

  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2">
      {coursesWithProgress.map(({ course, progress, completedLessons, totalLessons }) => (
        <Card key={course.slug} className="p-6">
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                {levelLabels[course.level]}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">{course.title}</h3>
              <p className="mt-2 text-sm text-[color:var(--muted)]">{course.description}</p>
            </div>
            
            {/* Прогресс бар */}
            <div>
              <div className="flex items-center justify-between text-xs text-[color:var(--muted)]">
                <span>Прогресс</span>
                <span className="font-semibold text-[color:var(--neon-2)]">{progress}%</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div 
                  className="h-full bg-gradient-to-r from-[color:var(--neon)] to-[color:var(--neon-2)] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {totalLessons > 0 && (
                <p className="mt-1 text-xs text-[color:var(--muted)]">
                  {completedLessons} из {totalLessons} уроков
                </p>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm text-[color:var(--muted)]">
              <span>Длительность: {course.duration}</span>
            </div>

            <div className="flex gap-3">
              <Button href={`/courses/${course.slug}/materials`} className="flex-1">
                К курсу
              </Button>
              <Button variant="outline" href={`/courses/${course.slug}`}>
                Прогресс
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
