import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { courses } from '../../../lib/data/courses';
import SectionHeading from '../../../components/section-heading';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';

interface CourseDetailsProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export function generateMetadata({ params }: CourseDetailsProps): Metadata {
  const course = courses.find((item) => item.slug === params.slug);

  if (!course) {
    return {};
  }

  return {
    title: course.title,
    description: course.description
  };
}

const levelLabels = {
  'Beginner': 'Начинающий',
  'Automation': 'Автоматизация',
  'AI Business': 'AI-бизнес',
  'Advanced': 'Продвинутый'
} as const;

export default function CourseDetailsPage({ params }: CourseDetailsProps) {
  const course = courses.find((item) => item.slug === params.slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="pb-20">
      <section className="section">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <Badge>{levelLabels[course.level]}</Badge>
            <h1 className="text-4xl font-semibold text-white md:text-5xl">{course.title}</h1>
            <p className="text-lg text-[color:var(--muted)]">{course.description}</p>
            <div className="flex flex-wrap gap-6 text-sm text-[color:var(--muted)]">
              <span>Длительность: {course.duration}</span>
              <span>Цена: {course.price}</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button href={`/courses/${course.slug}/payment`} size="lg" className="glow">
                Оплатить курс
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Узнать больше
              </Button>
            </div>
          </div>
          <Card className="space-y-4 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-[color:var(--muted)]">Результаты</p>
            <ul className="space-y-3 text-sm text-[color:var(--muted)]">
              {course.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-2">
                  <span className="text-[color:var(--neon-2)]">•</span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      <section className="section-tight">
        <SectionHeading
          eyebrow="Включено в курс"
          title="Что вы получите"
          description="Всё необходимое для практики и запуска реальных AI‑проектов."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {course.whatIncluded.map((item) => (
            <Card key={item} className="p-6 neon-border">
              <p className="text-sm font-medium text-white">{item}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Программа"
          title="Детальная программа курса"
          description="Каждый модуль построен вокруг практических задач и разборов."
        />
        <div className="mt-10 space-y-6">
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
                <ul className="space-y-4">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <li key={lesson} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-[color:var(--muted)]">
                        {lessonIndex + 1}
                      </span>
                      <span className="text-sm text-white">{lesson}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-tight">
        <SectionHeading eyebrow="Инструктор" title="Учитесь у практиков ИИ" />
        <Card className="mt-6 flex flex-col gap-6 p-6 md:flex-row md:items-center">
          <div className="h-20 w-20 shrink-0 rounded-full bg-[linear-gradient(135deg,rgba(127,92,255,0.6),rgba(40,215,255,0.6))]" />
          <div className="flex-1">
            <p className="text-lg font-semibold text-white">{course.instructor.name}</p>
            <p className="text-sm text-[color:var(--muted)]">{course.instructor.role}</p>
          </div>
          <Button variant="outline" href="/about">
            Узнать больше об инструкторах
          </Button>
        </Card>
      </section>

      <section className="section-tight">
        <SectionHeading
          eyebrow="Отзывы"
          title="Результаты студентов"
          description="Истории выпускников, которые уже применяют AI на практике."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { quote: '«Автоматизировали три ключевых процесса за две недели.»', author: 'Алексей, Product Manager' },
            { quote: '«Сократили время выхода на рынок вдвое.»', author: 'Мария, Founder' },
            { quote: '«Лучшая AI-программа, которую проходил в этом году.»', author: 'Дмитрий, Tech Lead' }
          ].map((testimonial) => (
            <Card key={testimonial.author} className="p-6">
              <p className="text-sm italic text-[color:var(--muted)]">{testimonial.quote}</p>
              <p className="mt-4 text-xs font-semibold text-white">— {testimonial.author}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="section">
        <Card className="flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between neon-border glow">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[color:var(--neon-2)]">Готовы начать</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Присоединяйтесь к следующему потоку и достигайте результатов
            </h3>
            <p className="mt-2 text-sm text-[color:var(--muted)]">Следующий старт: 7 апреля 2026</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button href={`/courses/${course.slug}/payment`} size="lg">
              Забронировать место
            </Button>
            <Button variant="outline" size="lg" href="/courses">
              Все курсы
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
