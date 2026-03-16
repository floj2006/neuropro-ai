interface ProgressRingProps {
  percent: number;
  label: string;
}

export default function ProgressRing({ percent, label }: ProgressRingProps) {
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-panel/70 p-4">
      <div
        className="glow-ring flex h-16 w-16 items-center justify-center rounded-full text-sm font-semibold"
        style={{
          background: `conic-gradient(#7f5cff ${clamped}%, rgba(255,255,255,0.08) 0%)`
        }}
      >
        {clamped}%
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Прогресс</p>
        <p className="text-sm text-white">{label}</p>
      </div>
    </div>
  );
}
