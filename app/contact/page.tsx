import { Metadata } from 'next';
import SectionHeading from '../../components/section-heading';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Свяжитесь с NeuroPro для записи в поток, командных планов и ИИ-стратегии.'
};

export default function ContactPage() {
  return (
    <div className="pb-20">
      <section className="section">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Контакты"
              title="Свяжитесь с NeuroPro"
              description="Расскажите о ваших целях, и мы поможем выбрать лучший путь обучения ИИ."
            />
            <div className="space-y-2 text-sm text-[color:var(--muted)]">
              <p>Email: hello@neuropro.ai</p>
              <a
                href="https://www.linkedin.com/company/neuropro"
                className="block text-[color:var(--neon-2)]"
              >
                LinkedIn
              </a>
              <a href="https://x.com/NeuroProAI" className="block text-[color:var(--neon-2)]">
                X (Twitter)
              </a>
            </div>
          </div>
          <Card>
            <form className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                  Имя
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше имя"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[color:rgba(10,12,20,0.6)] px-4 py-3 text-sm text-white outline-none focus:border-[color:var(--neon-2)]"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[color:rgba(10,12,20,0.6)] px-4 py-3 text-sm text-white outline-none focus:border-[color:var(--neon-2)]"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                  Сообщение
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Расскажите о ваших целях"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[color:rgba(10,12,20,0.6)] px-4 py-3 text-sm text-white outline-none focus:border-[color:var(--neon-2)]"
                />
              </div>
              <Button type="submit" className="w-full">
                Отправить
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
}
