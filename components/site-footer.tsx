import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 lg:flex-row lg:items-start lg:justify-between lg:px-10">
        <div>
          <p className="text-lg font-semibold">
            Neuro<span className="neon-text">Pro</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-[color:var(--muted)]">
            Премиальное ИИ-обучение для разработчиков, операторов и основателей, которые хотят практического мастерства.
          </p>
        </div>
        <div className="flex flex-wrap gap-10 text-sm">
          <div className="space-y-3">
            <p className="font-semibold text-white">Навигация</p>
            <Link href="/courses" className="block text-[color:var(--muted)]">
              Курсы
            </Link>
            <Link href="/about" className="block text-[color:var(--muted)]">
              О нас
            </Link>
            <Link href="/dashboard" className="block text-[color:var(--muted)]">
              Кабинет
            </Link>
          </div>
          <div className="space-y-3">
            <p className="font-semibold text-white">Ресурсы</p>
            <Link href="/contact" className="block text-[color:var(--muted)]">
              Контакты
            </Link>
            <span className="block text-[color:var(--muted)]">Поддержка</span>
            <span className="block text-[color:var(--muted)]">Сообщество</span>
          </div>
        </div>
        <div className="space-y-3 text-sm text-[color:var(--muted)]">
          <p className="font-semibold text-white">Контакты</p>
          <p>hello@neuropro.ai</p>
          <p>Сан-Франциско • Удалённо по всему миру</p>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl px-6 text-xs text-[color:var(--muted)] lg:px-10">
        © 2026 NeuroPro. Все права защищены.
      </div>
    </footer>
  );
}
