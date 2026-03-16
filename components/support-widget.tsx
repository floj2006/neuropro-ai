'use client';

import { useState } from 'react';
import { Button } from './ui/button';

export default function SupportWidget() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const close = () => {
    setOpen(false);
    setSent(false);
  };

  return (
    <div>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Поддержка
      </Button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-4 py-6 md:items-center">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[color:rgba(10,12,20,0.9)] p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--neon-2)]">Поддержка</p>
                <h3 className="mt-2 text-xl font-semibold text-white">Мы на связи</h3>
              </div>
              <button
                onClick={close}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-[color:var(--muted)] hover:text-white"
              >
                Закрыть
              </button>
            </div>

            {sent ? (
              <div className="mt-6 space-y-3 text-sm text-[color:var(--muted)]">
                <p>Спасибо! Мы получили ваш запрос и ответим в течение 1 рабочего дня.</p>
                <p>Если нужно срочно — пишите на hello@neuropro.ai</p>
                <Button className="mt-4" onClick={close}>
                  Готово
                </Button>
              </div>
            ) : (
              <form
                className="mt-6 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    Имя
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Как к вам обращаться"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-[color:rgba(10,12,20,0.6)] px-4 py-3 text-sm text-white outline-none focus:border-[color:var(--neon-2)]"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="you@company.com"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-[color:rgba(10,12,20,0.6)] px-4 py-3 text-sm text-white outline-none focus:border-[color:var(--neon-2)]"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    Запрос
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Опишите вопрос или проблему"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-[color:rgba(10,12,20,0.6)] px-4 py-3 text-sm text-white outline-none focus:border-[color:var(--neon-2)]"
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button type="submit">Отправить</Button>
                  <Button variant="outline" type="button" onClick={close}>
                    Отмена
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
