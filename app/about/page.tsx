import { Metadata } from 'next';
import SectionHeading from '../../components/section-heading';
import { Card } from '../../components/ui/card';
import AboutStats from '../../components/about-stats';

export const metadata: Metadata = {
  title: 'О нас',
  description: 'Узнайте о NeuroPro и нашей миссии — помогать людям строить AI‑карьеры.'
};

export default function AboutPage() {
  return (
    <div className="pb-20">
      <section className="section">
        <SectionHeading
          eyebrow="О нас"
          title="Мы помогаем людям осваивать AI‑инструменты и строить AI‑карьеры"
          description="NeuroPro объединяет практиков ИИ, образовательных методистов и продуктовые команды, чтобы дать вам навыки, которые сразу применяются в работе."
        />

        <AboutStats />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold text-white">Наша миссия</h3>
            <p className="mt-3 text-sm text-[color:var(--muted)]">
              Мы верим, что ИИ должен усиливать человеческое творчество и продуктивность. Наша миссия — дать
              специалистам инструменты, методики и стратегию, чтобы они уверенно работали в AI‑экономике.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-white">Почему NeuroPro</h3>
            <p className="mt-3 text-sm text-[color:var(--muted)]">
              Мы учим на реальных кейсах и практикумах. Каждый курс включает шаблоны, воркфлоу и поддержку,
              чтобы вы могли запускать AI‑проекты уже в ходе обучения.
            </p>
          </Card>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Card>
            <h3 className="text-lg font-semibold text-white">Методология</h3>
            <p className="mt-3 text-sm text-[color:var(--muted)]">
              70% практики: живые спринты, разборы и лабораторные задачи. Вы строите решения, а не просто
              слушаете лекции.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-white">Эксперты</h3>
            <p className="mt-3 text-sm text-[color:var(--muted)]">
              Наши наставники — product‑лиды, инженеры и основатели, внедряющие ИИ в продакшене и бизнес‑процессах.
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-white">Поддержка</h3>
            <p className="mt-3 text-sm text-[color:var(--muted)]">
              Личные консультации, офисные часы и разбор ваших проектов. Мы помогаем довести идею до результата.
            </p>
          </Card>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold text-white">Ценности</h3>
            <ul className="mt-3 space-y-2 text-sm text-[color:var(--muted)]">
              <li>• Практичность: каждый урок даёт измеримый результат.</li>
              <li>• Этика: безопасное и ответственное использование ИИ.</li>
              <li>• Рост: системный подход к развитию навыков.</li>
            </ul>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-white">Результаты студентов</h3>
            <ul className="mt-3 space-y-2 text-sm text-[color:var(--muted)]">
              <li>• Средний рост эффективности команд: +25% за 6 недель.</li>
              <li>• Более 1200 выпускников запустили AI‑проекты.</li>
              <li>• 4 из 10 студентов переходят на AI‑роли в течение 3 месяцев.</li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
}
