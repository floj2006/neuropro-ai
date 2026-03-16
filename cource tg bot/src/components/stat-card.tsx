interface StatCardProps {
  label: string;
  value: string;
  helper?: string;
}

export default function StatCard({ label, value, helper }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-panel/70 p-4 shadow-glow">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      {helper ? <p className="mt-1 text-xs text-muted">{helper}</p> : null}
    </div>
  );
}
