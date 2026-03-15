import { cn } from '../../lib/utils';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div className={cn('rounded-3xl border border-white/10 bg-[color:rgba(15,19,32,0.78)] p-6 shadow-[0_20px_60px_rgba(6,8,25,0.45)]', className)}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: CardProps) {
  return <div className={cn('mb-4 space-y-2', className)}>{children}</div>;
}

export function CardTitle({ className, children }: CardProps) {
  return <h3 className={cn('text-xl font-semibold text-white', className)}>{children}</h3>;
}

export function CardDescription({ className, children }: CardProps) {
  return <p className={cn('text-sm text-[color:var(--muted)]', className)}>{children}</p>;
}

export function CardContent({ className, children }: CardProps) {
  return <div className={cn('space-y-3', className)}>{children}</div>;
}

export function CardFooter({ className, children }: CardProps) {
  return <div className={cn('mt-6 flex items-center justify-between', className)}>{children}</div>;
}
