import type { ButtonHTMLAttributes } from 'react';

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
}

export default function GlowButton({ variant = 'primary', className = '', ...props }: GlowButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-neon2/60';
  const styles =
    variant === 'primary'
      ? 'bg-neon text-white shadow-glow hover:shadow-glowStrong'
      : 'border border-white/10 bg-white/5 text-white hover:border-neon2';

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
