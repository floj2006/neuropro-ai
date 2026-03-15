'use client';

import { useEffect, useMemo, useState } from 'react';
import SectionHeading from './section-heading';
import { Card } from './ui/card';

const testimonials = [
  {
    name: 'Айша Морган',
    role: 'Growth Lead, Cloudward',
    quote:
      'NeuroPro помог мне автоматизировать 40% операционных воркфлоу за шесть недель. Шаблоны — золото.'
  },
  {
    name: 'Лео Zhang',
    role: 'Основатель, Beacon Labs',
    quote:
      'ИИ-бизнес лаб дал мне чёткую GTM и ценовую стратегию. Мы закрыли первую сделку с enterprise-клиентом.'
  },
  {
    name: 'Прия Наир',
    role: 'Product Manager, Flux',
    quote:
      'Программа ощущается как премиальный акселератор. Каждый урок приносил немедленный ROI.'
  }
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const active = useMemo(() => testimonials[index], [index]);

  return (
    <section className="section">
      <SectionHeading
        eyebrow="Истории успеха"
        title="Студенты запускают ИИ-победы за недели"
        description="От автоматизации до дохода — участники NeuroPro быстро достигают результатов."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <Card className="flex flex-col justify-between gap-6">
          <p className="text-lg text-white md:text-xl">"{active.quote}"</p>
          <div>
            <p className="text-sm font-semibold text-white">{active.name}</p>
            <p className="text-xs text-[color:var(--muted)]">{active.role}</p>
          </div>
        </Card>
        <div className="grid gap-4">
          {testimonials.map((item, idx) => (
            <button
              key={item.name}
              onClick={() => setIndex(idx)}
              className={`rounded-2xl border p-4 text-left transition ${
                idx === index
                  ? 'border-[color:var(--neon-2)] bg-[color:rgba(40,215,255,0.08)]'
                  : 'border-white/10 bg-[color:rgba(12,14,26,0.8)]'
              }`}
            >
              <p className="text-sm text-white">{item.name}</p>
              <p className="text-xs text-[color:var(--muted)]">{item.role}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
