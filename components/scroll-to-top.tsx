'use client';

import { useEffect, useState } from 'react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Наверх"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[color:rgba(10,12,24,0.92)] text-white transition-all duration-300 ease-out ${
        isVisible
          ? 'pointer-events-auto translate-y-0 scale-100 opacity-100 shadow-[0_0_25px_rgba(127,92,255,0.45)] hover:-translate-y-1 hover:border-[color:var(--neon-2)] hover:shadow-[0_0_35px_rgba(40,215,255,0.55)]'
          : 'pointer-events-none translate-y-2 scale-95 opacity-0'
      }`}
    >
      <span className="text-xl">↑</span>
    </button>
  );
}
