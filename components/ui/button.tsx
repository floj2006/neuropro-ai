import Link from 'next/link';
import { cn } from '../../lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--neon-2)] disabled:pointer-events-none disabled:opacity-60';

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-[color:var(--neon)] text-white shadow-[0_0_25px_rgba(127,92,255,0.45)] hover:brightness-110',
  secondary:
    'bg-[color:var(--surface-2)] text-white hover:bg-[color:var(--surface)]',
  outline:
    'border border-white/15 text-white hover:border-[color:var(--neon-2)] hover:text-[color:var(--neon-2)]',
  ghost: 'text-[color:var(--muted)] hover:text-white'
};

const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-9 px-4',
  md: 'h-11 px-6',
  lg: 'h-12 px-8 text-base'
};

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  href,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {props.children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props} />
  );
}
