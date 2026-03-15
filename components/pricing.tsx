import { Button } from './ui/button';
import { Card } from './ui/card';
import SectionHeading from './section-heading';

const plans = [
  {
    name: 'Старт',
    price: '3 990',
    cadence: '/мес',
    description: 'Доступ к курсам для начинающих и ежемесячные живые Q&A сессии.',
    features: ['2 курса в квартал', 'Доступ в сообщество', 'Обновления ИИ-инструментов']
  },
  {
    name: 'Профи',
    price: '9 990',
    cadence: '/мес',
    description: 'Полный доступ к каталогу плюс шаблоны автоматизации и практикумы.',
    features: ['Безлимитные курсы', 'Шаблоны автоматизации', 'Еженедельные офисные часы'],
    highlight: true
  },
  {
    name: 'Бизнес',
    price: '19 990',
    cadence: '/мес',
    description: 'Персональное менторство и спринты бизнес-стратегии.',
    features: ['Личное менторство', 'Основательские круглые столы', 'Командные лицензии (3 места)']
  }
];

export default function Pricing() {
  return (
    <section className="section">
      <SectionHeading
        eyebrow="Тарифы"
        title="Выберите план, который подходит вам"
        description="Гибкий доступ для соло-разработчиков, команд и основателей, создающих ИИ-продукты."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`flex flex-col gap-6 ${plan.highlight ? 'neon-border glow' : ''}`}
          >
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted)]">
                {plan.name}
              </p>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-4xl font-semibold text-white">{plan.price} ₽</span>
                <span className="text-sm text-[color:var(--muted)]">{plan.cadence}</span>
              </div>
              <p className="mt-3 text-sm text-[color:var(--muted)]">{plan.description}</p>
            </div>
            <ul className="space-y-2 text-sm text-[color:var(--muted)]">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="text-[color:var(--neon-2)]">✅</span>
                  {feature}
                </li>
              ))}
            </ul>
            <Button href="/contact" variant={plan.highlight ? 'primary' : 'outline'}>
              Начать
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
}
