import { useCallback } from 'react';

const items = [
  { id: 'profile', label: 'Профиль' },
  { id: 'dashboard', label: 'Главная' },
  { id: 'courses', label: 'Курсы' },
  { id: 'payments', label: 'Оплата' },
  { id: 'support', label: 'Поддержка' }
];

export default function BottomNav() {
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) {
      return;
    }
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[rgba(10,12,24,0.9)] px-4 pb-4 pt-3 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-between rounded-full border border-white/10 bg-panel/80 px-4 py-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollTo(item.id)}
            className="text-xs font-semibold text-muted transition hover:text-white"
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
