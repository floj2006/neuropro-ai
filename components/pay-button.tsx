'use client';

import { useState } from 'react';
import { Button } from './ui/button';

interface PayButtonProps {
  itemId: string;
  label?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export default function PayButton({
  itemId,
  label = 'Оплатить',
  className,
  variant = 'primary',
  size = 'md'
}: PayButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error ?? 'Ошибка создания платежа');
      }

      if (data?.confirmationUrl) {
        window.location.href = data.confirmationUrl as string;
      } else {
        throw new Error('Не получен URL подтверждения платежа');
      }
    } catch (error) {
      console.error(error);
      alert('Не удалось создать платеж. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={className}
      variant={variant}
      size={size}
      disabled={loading}
    >
      {loading ? 'Перенаправление...' : label}
    </Button>
  );
}
