import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function CourseBuySuccessPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center py-20">
      <Card className="mx-auto max-w-md p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
            <svg className="h-10 w-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-2xl font-semibold text-white">Оплата успешна!</h1>
        <p className="mt-4 text-[color:var(--muted)]">
          Спасибо за покупку. Доступ к курсу активирован.
        </p>
        
        <div className="mt-8 space-y-4">
          <Button href="/dashboard" className="w-full glow">
            Перейти в личный кабинет
          </Button>
          <Button href="/courses" variant="outline" className="w-full">
            Смотреть другие курсы
          </Button>
        </div>
        
        <p className="mt-6 text-xs text-[color:var(--muted)]">
          Письмо с доступом отправлено на вашу почту
        </p>
      </Card>
    </div>
  );
}
