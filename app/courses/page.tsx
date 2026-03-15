import { Metadata } from 'next';
import { courseCategories, courses, categoryTranslations } from '../../lib/data/courses';
import CourseCard from '../../components/course-card';
import SectionHeading from '../../components/section-heading';

export const metadata: Metadata = {
  title: 'Курсы',
  description: 'Изучите каталог курсов NeuroPro по направлениям: основы, автоматизация, бизнес и продвинутый ИИ.'
};

export default function CoursesPage() {
  return (
    <div className="pb-20">
      <section className="section">
        <SectionHeading
          eyebrow="Курсы"
          title="ИИ-курсы, созданные для реальных результатов"
          description="Изучите каталог NeuroPro и выберите направление, соответствующее вашим целям."
        />
        <div className="mt-8 flex flex-wrap gap-3 text-sm text-[color:var(--muted)]">
          {courseCategories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-white/10 bg-[color:rgba(124,92,255,0.08)] px-4 py-1"
            >
              {categoryTranslations[category]}
            </span>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}
