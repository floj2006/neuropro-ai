export default function AboutStats() {
  const stats = [
    { label: 'Выпускников', value: '1 200+', note: 'в 18 странах' },
    { label: 'Эффективность', value: '+25%', note: 'средний рост' },
    { label: 'AI‑проекты', value: '340+', note: 'запущено' }
  ];

  return (
    <div className="mt-10 grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-3xl border border-white/10 bg-[color:rgba(12,14,26,0.8)] p-6"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">{stat.label}</p>
          <p className="mt-3 text-3xl font-semibold text-white">{stat.value}</p>
          <p className="mt-2 text-sm text-[color:var(--muted)]">{stat.note}</p>
        </div>
      ))}
    </div>
  );
}
