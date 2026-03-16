import { Metadata } from 'next';
import { courseCategories, courses, categoryTranslations } from '../../lib/data/courses';
import CourseCard from '../../components/course-card';
import SectionHeading from '../../components/section-heading';
import CourseCategoryNav from '../../components/course-category-nav';

export const metadata: Metadata = {
  title: 'Курсы',
  description: 'Каталог курсов NeuroPro по направлениям: базовый ИИ, автоматизация, AI-бизнес и advanced.'
};

const toId = (category: string) => `category-${category.replace(/\s+/g, '-').toLowerCase()}`;

export default function CoursesPage() {
  return (
    <div className="pb-20">
      <section className="section">
        <SectionHeading
          eyebrow="Курсы"
          title="AI‑направления с фокусом на результат"
          description="Выберите трек и прокачайте навыки под вашу роль — от основ до продвинутых систем."
        />
        <CourseCategoryNav />
      </section>

      {courseCategories.map((category) => {
        const categoryCourses = courses.filter((course) => course.level === category);

        return (
          <section key={category} id={toId(category)} className="section-tight scroll-mt-24">
            <SectionHeading
              eyebrow={categoryTranslations[category]}
              title={`Курсы: ${categoryTranslations[category]}`}
              description={`Подборка курсов уровня «${categoryTranslations[category]}».`}
            />
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {categoryCourses.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
