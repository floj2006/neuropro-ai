'use client';

import { useState, useMemo, useEffect } from 'react';
import { courses, courseCategories, categoryTranslations } from '@/lib/data/courses';
import CourseCard from '@/components/course-card';
import { Card } from '@/components/ui/card';
import CustomSelect from '@/components/ui/custom-select';

const levelLabels = {
  'Beginner': 'Начинающий',
  'Automation': 'Автоматизация',
  'AI Business': 'AI-бизнес',
  'Advanced': 'Продвинутый'
};

const categoryIcons: Record<string, string> = {
  'all': '📚',
  'Beginner': '🌱',
  'Automation': '⚙️',
  'AI Business': '💼',
  'Advanced': '🚀'
};

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'duration';

export default function CoursesClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayCategory, setDisplayCategory] = useState('all');
  const [iconKey, setIconKey] = useState(0);

  // Анимация при смене категории
  useEffect(() => {
    if (selectedCategory !== displayCategory) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setDisplayCategory(selectedCategory);
        setIconKey((prev) => prev + 1);
        setTimeout(() => setIsAnimating(false), 300);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [selectedCategory, displayCategory]);

  const sortOptions = [
    { value: 'default', label: 'По умолчанию', icon: '📋' },
    { value: 'price-asc', label: 'Сначала дешевле', icon: '💰' },
    { value: 'price-desc', label: 'Сначала дороже', icon: '💎' },
    { value: 'duration', label: 'По длительности', icon: '⏱' }
  ];

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
              <CustomSelect
                options={sortOptions}
                value={sortBy}
                onChange={(value) => setSortBy(value as SortOption)}
                label="Сортировка"
              />
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
                className={`group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-[color:var(--neon)] text-white shadow-lg shadow-[color:var(--neon)]/30'
                    : 'border border-white/10 bg-white/5 text-[color:var(--muted)] hover:border-white/20 hover:bg-white/10'
                }`}
              >
                <span
                  key={`icon-all-${iconKey}`}
                  className={`flex items-center transition-all duration-300 ${
                    isAnimating && selectedCategory === 'all' ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
                  }`}
                >
                  {categoryIcons['all']}
                </span>
                <span>Все</span>
              </button>
              {courseCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-[color:var(--neon)] text-white shadow-lg shadow-[color:var(--neon)]/30'
                      : 'border border-white/10 bg-white/5 text-[color:var(--muted)] hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <span
                    key={`icon-${cat}-${iconKey}`}
                    className={`flex items-center transition-all duration-300 ${
                      isAnimating && selectedCategory === cat ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
                    }`}
                  >
                    {categoryIcons[cat]}
                  </span>
                  <span>{categoryTranslations[cat]}</span>
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
