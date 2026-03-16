import Link from 'next/link';
import { courses, categoryTranslations } from '../lib/data/courses';
import CourseCard from '../components/course-card';
import Pricing from '../components/pricing';
import Testimonials from '../components/testimonials';
import Faq from '../components/faq';
import SectionHeading from '../components/section-heading';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

export default function HomePage() {
  return (
    <div className="pb-20">
      <section className="section">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <Badge>Будущее за вами</Badge>
            <h1 className="text-4xl font-semibold text-white md:text-5xl">
              Освойте ИИ‑навыки с <span className="neon-text">NeuroPro</span>
            </h1>
            <p className="text-lg text-[color:var(--muted)]">
              Изучите AI‑инструменты, системы автоматизации и бизнес‑стратегии, которыми пользуются лучшие
              команды для построения масштабируемого AI‑бизнеса.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/courses" size="lg" className="glow">
                Начать обучение
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Поговорить с менеджером
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.25em] text-[color:var(--muted)]">
              <span>4 направления</span>
              <span>Еженедельные практикумы</span>
              <span>Поддержка карьеры</span>
            </div>
          </div>
          <Card className="glass animate-float">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.25em] text-[color:var(--muted)]">Живой поток</p>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-[color:var(--neon-2)]">
                  Старт: 7 апреля 2026
                </span>
              </div>
              <p className="text-2xl font-semibold text-white">
                Освойте ИИ за 30 дней с guided‑спринтами и экспертными менторами.
              </p>
              <div className="space-y-3 text-sm text-[color:var(--muted)]">
                <p>• Еженедельный коучинг + разбор AI‑бизнеса</p>
                <p>• Шаблоны, плейбуки и стек автоматизации</p>
                <p>• Пожизненный доступ к обновлениям</p>
              </div>
              <Button href="/courses" size="lg">
                Смотреть программу
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <section className="section-tight">
        <SectionHeading
          eyebrow="Почему сейчас"
          title="ИИ — самый большой сдвиг десятилетия"
          description="NeuroPro держит вас в авангарде с тактическим, ориентированным на практику обучением."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Внедрение ИИ ускоряется',
              body: 'Компании ожидают AI‑грамотности от каждой команды. Спрос на специалистов растёт.'
            },
            {
              title: 'Автоматизация увеличивает маржу',
              body: 'Лучшие команды снижают затраты, ускоряют выполнение и радуют клиентов с помощью ИИ.'
            },
            {
              title: 'Новые AI‑бизнес‑модели',
              body: 'Основатели, владеющие AI‑плейбуками, строят быстрорастущие стартапы.'
            }
          ].map((item) => (
            <Card key={item.title} className="animate-fade-up">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm text-[color:var(--muted)]">{item.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Программа"
              title="Чему вы научитесь"
              description="Путь от основ ИИ до продвинутых агентских систем и бизнес‑стратегии."
            />
            <ul className="space-y-4 text-sm text-[color:var(--muted)]">
              <li>• Создаёте AI‑воркфлоу с реальными стеками автоматизации</li>
              <li>• Проектируете AI‑бизнес‑модели и эксперименты</li>
              <li>• Оцениваете модели, надёжность и стратегию данных</li>
              <li>• Запускаете AI‑продукты с уверенностью и скоростью</li>
            </ul>
            <Button href="/courses" variant="outline">
              Смотреть программу
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {courses.slice(0, 4).map((course) => (
              <Card key={course.slug} className="animate-fade-up">
                <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                  {categoryTranslations[course.level]}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-white">{course.title}</h3>
                <p className="mt-2 text-sm text-[color:var(--muted)]">{course.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="section">
        <SectionHeading
          eyebrow="Предпросмотр курсов"
          title="Выберите направление обучения по вашим целям"
          description="Начните с основ или сразу перейдите к автоматизации, AI‑бизнесу или продвинутым агентам."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 6).map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
        <div className="mt-8 text-right">
          <Link href="/courses" className="text-sm text-[color:var(--neon-2)]">
            Смотреть все курсы →
          </Link>
        </div>
      </section>

      <Pricing />
      <Faq />
    </div>
  );
}
