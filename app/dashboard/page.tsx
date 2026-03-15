import { Metadata } from 'next';
import { auth } from '../../lib/auth';
import { redirect } from 'next/navigation';
import SectionHeading from '../../components/section-heading';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { prisma } from '../../lib/prisma';
import { courses } from '../../lib/data/courses';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Личный кабинет',
  description: 'Управляйте своими курсами и прогрессом обучения NeuroPro.'
};

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/auth/signin');
  }

  // Получаем купленные курсы пользователя
  const purchases = await prisma.purchase.findMany({
    where: { userId: session.user.id, status: 'completed' },
    orderBy: { createdAt: 'desc' }
  });

  const purchasedCourses = purchases.map(p => 
    courses.find(c => c.slug === p.courseId)
  ).filter(Boolean);

  return (
    <div className="pb-20">
      <section className="section">
        <SectionHeading
          eyebrow="Кабинет"
          title="Ваш центр обучения"
          description="Отслеживайте прогресс, возобновляйте занятия и смотрите предстоящие мероприятия."
        />
        
        {/* Информация о пользователе */}
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

        {/* Купленные курсы */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-white">Мои курсы</h2>
          
          {purchasedCourses.length > 0 ? (
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {purchasedCourses.map((course) => (
                <Card key={course!.slug} className="p-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                        {course!.level === 'Beginner' ? 'Начинающий' : course!.level === 'Automation' ? 'Автоматизация' : course!.level === 'AI Business' ? 'ИИ-бизнес' : 'Продвинутый'}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-white">{course!.title}</h3>
                      <p className="mt-2 text-sm text-[color:var(--muted)]">{course!.description}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-[color:var(--muted)]">
                      <span>Длительность: {course!.duration}</span>
                    </div>
                    <div className="flex gap-3">
                      <Button href={`/courses/${course!.slug}`} className="flex-1">
                        К курсу
                      </Button>
                      <Button variant="outline" href={`/courses/${course!.slug}/buy`}>
                        Прогресс
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="mt-6 p-8 text-center">
              <p className="text-lg text-white">У вас пока нет купленных курсов</p>
              <p className="mt-2 text-sm text-[color:var(--muted)]">
                Изучите наш каталог и выберите подходящий курс
              </p>
              <Button href="/courses" className="mt-6">
                Смотреть каталог
              </Button>
            </Card>
          )}
        </div>

        {/* Предстоящие события */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-white">Предстоящие события</h2>
          <Card className="mt-6 flex flex-col justify-between gap-6 p-6 md:flex-row md:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted)]">Вебинар</p>
              <h3 className="text-lg font-semibold text-white">Живая сессия ИИ-бизнес лаба</h3>
              <p className="mt-2 text-sm text-[color:var(--muted)]">
                Следующая сессия: 10 апреля 2026 • 10:00 МСК
              </p>
            </div>
            <Button>Присоединиться</Button>
          </Card>
        </div>
      </section>
    </div>
  );
}
