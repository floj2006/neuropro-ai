import { cn } from '../../lib/utils';

interface BadgeProps {
  className?: string;
  children: React.ReactNode;
}

export function Badge({ className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-white/10 bg-[color:rgba(124,92,255,0.12)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[color:var(--neon-2)]',
        className
      )}
    >
      {children}
    </span>
  );
}
