import SectionHeading from './section-heading';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { planCards } from '../lib/data/payments';

export default function Pricing() {
  return (
    <section className="section">
      <SectionHeading
        eyebrow="Тарифы"
        title="Выберите план, который подходит вам"
        description="Гибкий доступ для соло-разработчиков, команд и основателей, создающих AI-продукты."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {planCards.map((plan) => (
          <Card
            key={plan.id}
            className={`flex flex-col gap-6 ${plan.highlight ? 'neon-border glow' : ''}`}
          >
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted)]">
                {plan.name}
              </p>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-4xl font-semibold text-white">{plan.price}</span>
                <span className="text-sm text-[color:var(--muted)]">{plan.cadence}</span>
              </div>
              <p className="mt-3 text-sm text-[color:var(--muted)]">{plan.description}</p>
            </div>
            <ul className="space-y-2 text-sm text-[color:var(--muted)]">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="text-[color:var(--neon-2)]">•</span>
                  {feature}
                </li>
              ))}
            </ul>
            <Button href={`/payment/${plan.id.replace(':', '-')}`} variant={plan.highlight ? 'primary' : 'outline'} className="mt-auto">
              Оплатить
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
}
