import { Metadata } from 'next';
import SectionHeading from '../../components/section-heading';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Свяжитесь с NeuroPro по вопросам обучения, командных программ и поддержки.'
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
              description="Расскажите о целях, и мы подберём оптимальный AI‑трек для вас или команды."
            />
            <div className="space-y-3 text-sm text-[color:var(--muted)]">
              <p>Email: hello@neuropro.ai</p>
              <div className="flex items-center gap-3">
                <a
                  href="https://vk.com"
                  className="inline-flex items-center gap-2 text-[color:var(--neon-2)]"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d="M12.78 16.5c-3.92 0-6.15-2.78-6.26-7.41h2.02c.07 3.44 1.6 4.9 2.82 5.2V9.09h1.9v3.03c1.18-.14 2.41-1.5 2.83-3.03h1.9c-.33 1.95-1.75 3.3-2.8 3.86 1.05.41 2.63 1.63 3.27 3.55h-2.09c-.5-1.5-1.76-2.66-3.11-2.83v2.83h-.48Z" />
                  </svg>
                  ВКонтакте
                </a>
                <a
                  href="https://t.me"
                  className="inline-flex items-center gap-2 text-[color:var(--neon-2)]"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d="M9.58 16.8 9.3 20c.4 0 .58-.17.8-.38l1.94-1.85 4.02 2.95c.74.4 1.27.2 1.46-.68l2.65-12.44h0c.23-1.06-.38-1.48-1.1-1.22L3.9 9.96c-1.02.4-1 1.01-.17 1.27l4.02 1.25 9.35-5.9c.44-.27.84-.12.51.16L9.58 16.8Z" />
                  </svg>
                  Telegram
                </a>
              </div>
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
                  placeholder="Расскажите о цели"
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
