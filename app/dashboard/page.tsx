import { Metadata } from 'next';
import { auth } from '../../lib/auth';
import { redirect } from 'next/navigation';
import SectionHeading from '../../components/section-heading';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { prisma } from '../../lib/prisma';
import { courses } from '../../lib/data/courses';
import MyCoursesClient from './my-courses-client';

export const metadata: Metadata = {
  title: 'Личный кабинет',
  description: 'Управляйте своими курсами и прогрессом обучения NeuroPro.'
};

const levelLabels = {
  'Beginner': 'Начинающий',
  'Automation': 'Автоматизация',
  'AI Business': 'AI-бизнес',
  'Advanced': 'Продвинутый'
} as const;

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/signup?callbackUrl=/dashboard');
  }

  const purchases = await prisma.purchase.findMany({
    where: { userId: session.user.id, status: 'completed' },
    orderBy: { createdAt: 'desc' }
  });

  const purchasedCourses = purchases
    .map((p) => {
      const course = courses.find((c) => c.slug === p.courseId);
      if (!course) return null;
      return {
        course: {
          slug: course.slug,
          title: course.title,
          description: course.description,
          level: course.level,
          duration: course.duration
        },
        progress: 0,
        completedLessons: 0,
        totalLessons: 0
      };
    })
    .filter(Boolean) as Array<{ course: { slug: string; title: string; description: string; level: string; duration: string; }; progress: number; completedLessons: number; totalLessons: number }>;

  return (
    <div className="pb-20">
      <section className="section">
        <SectionHeading
          eyebrow="Кабинет"
          title="Ваш центр обучения"
          description="Отслеживайте прогресс, возобновляйте занятия и смотрите предстоящие мероприятия."
        />

        <Card className="mt-8 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted)]">Профиль</p>
              <h3 className="mt-2 text-xl font-semibold text-white">
                {session.user.name || 'Пользователь'}
              </h3>
              <p className="text-sm text-[color:var(--muted)]">{session.user.email}</p>
            </div>
            <div className="text-right">
              <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted)]">Роль</p>
              <p className="mt-2 text-sm font-semibold text-[color:var(--neon-2)]">
                {session.user.role === 'ADMIN' ? 'Администратор' : 'Студент'}
              </p>
            </div>
          </div>
        </Card>

        <div className="mt-10">
          <h2 className="text-xl font-semibold text-white">Мои курсы</h2>
          <MyCoursesClient purchasedCourses={purchasedCourses} />
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold text-white">Предстоящие события</h2>
          <Card className="mt-6 flex flex-col justify-between gap-6 p-6 md:flex-row md:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted)]">Вебинар</p>
              <h3 className="text-lg font-semibold text-white">Живая сессия AI‑бизнес лаба</h3>
              <p className="mt-2 text-sm text-[color:var(--muted)]">
                Следующая сессия: 10 апреля 2026 • 10:00 МСК
              </p>
            </div>
            <Button>Присоединиться</Button>
          </Card>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold text-white">Документы</h2>
          <Card className="mt-6 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Мои сертификаты</h3>
                <p className="mt-1 text-sm text-[color:var(--muted)]">
                  Сертификаты о прохождении курсов
                </p>
              </div>
              <Button href="/certificates" variant="outline">
                Посмотреть
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
