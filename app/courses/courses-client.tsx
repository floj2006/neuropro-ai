'use client';

import { useState, useMemo } from 'react';
import { courses, courseCategories, categoryTranslations } from '@/lib/data/courses';
import CourseCard from '@/components/course-card';
import { Card } from '@/components/ui/card';

const levelLabels = {
  'Beginner': 'Начинающий',
  'Automation': 'Автоматизация',
  'AI Business': 'AI-бизнес',
  'Advanced': 'Продвинутый'
};

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'duration';

export default function CoursesClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const filteredCourses = useMemo(() => {
    let result = [...courses];

    // Поиск по названию и описанию
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query)
      );
    }

    // Фильтр по категории
    if (selectedCategory !== 'all') {
      result = result.filter((course) => course.level === selectedCategory);
    }

    // Сортировка
    if (sortBy === 'price-asc') {
      result.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/\s/g, '').replace('₽', ''));
        const priceB = parseFloat(b.price.replace(/\s/g, '').replace('₽', ''));
        return priceA - priceB;
      });
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/\s/g, '').replace('₽', ''));
        const priceB = parseFloat(b.price.replace(/\s/g, '').replace('₽', ''));
        return priceB - priceA;
      });
    } else if (sortBy === 'duration') {
      result.sort((a, b) => {
        const durA = parseInt(a.duration) || 0;
        const durB = parseInt(b.duration) || 0;
        return durA - durB;
      });
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  // Группировка по категориям для отображения
  const groupedCourses = useMemo(() => {
    if (selectedCategory !== 'all') {
      return {
        [selectedCategory]: filteredCourses
      };
    }

    const grouped: Record<string, typeof courses> = {};
    courseCategories.forEach((cat) => {
      const catCourses = filteredCourses.filter((c) => c.level === cat);
      if (catCourses.length > 0) {
        grouped[cat] = catCourses;
      }
    });
    return grouped;
  }, [filteredCourses]);

  return (
    <div className="pb-20">
      {/* Фильтры и поиск */}
      <section className="section">
        <Card className="p-6">
          <div className="grid gap-4 md:grid-cols-3">
            {/* Поиск */}
            <div className="md:col-span-2">
              <label className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                Поиск
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Название или описание курса..."
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-[color:var(--muted)] focus:border-[color:var(--neon)] focus:outline-none"
              />
            </div>

            {/* Сортировка */}
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                Сортировка
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-[color:var(--neon)] focus:outline-none"
              >
                <option value="default">По умолчанию</option>
                <option value="price-asc">Сначала дешевле</option>
                <option value="price-desc">Сначала дороже</option>
                <option value="duration">По длительности</option>
              </select>
            </div>
          </div>

          {/* Категории */}
          <div className="mt-4">
            <label className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
              Категория
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  selectedCategory === 'all'
                    ? 'bg-[color:var(--neon)] text-white'
                    : 'border border-white/10 bg-white/5 text-[color:var(--muted)] hover:border-white/20'
                }`}
              >
                Все
              </button>
              {courseCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    selectedCategory === cat
                      ? 'bg-[color:var(--neon)] text-white'
                      : 'border border-white/10 bg-white/5 text-[color:var(--muted)] hover:border-white/20'
                  }`}
                >
                  {categoryTranslations[cat]}
                </button>
              ))}
            </div>
          </div>

          {/* Результаты */}
          <div className="mt-4 text-sm text-[color:var(--muted)]">
            Найдено курсов: <span className="font-semibold text-white">{filteredCourses.length}</span>
          </div>
        </Card>
      </section>

      {/* Список курсов */}
      {Object.keys(groupedCourses).length === 0 ? (
        <section className="section">
          <div className="py-20 text-center">
            <p className="text-xl text-white">Курсы не найдены</p>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              Попробуйте изменить параметры поиска
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSortBy('default');
              }}
              className="mt-6 text-sm text-[color:var(--neon-2)] hover:underline"
            >
              Сбросить фильтры
            </button>
          </div>
        </section>
      ) : (
        Object.entries(groupedCourses).map(([category, categoryCourses]) => (
          <section key={category} id={`category-${category.toLowerCase()}`} className="section-tight scroll-mt-24">
            <h2 className="text-xl font-semibold text-white">
              {categoryTranslations[category as keyof typeof categoryTranslations]}
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {categoryCourses.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
