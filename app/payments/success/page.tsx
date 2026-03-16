import Link from 'next/link';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';

export default function PaymentSuccessPage() {
  return (
    <div className="section">
      <Card className="mx-auto max-w-xl p-8 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--neon-2)]">Оплата подтверждена</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Спасибо за покупку!</h1>
        <p className="mt-3 text-sm text-[color:var(--muted)]">
          Доступ к курсу активирован. Инструкции отправлены на вашу почту.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href="/dashboard" className="glow">Перейти в кабинет</Button>
          <Button href="/courses" variant="outline">Смотреть другие курсы</Button>
        </div>
        <div className="mt-6 text-xs text-[color:var(--muted)]">
          <Link href="/contact" className="text-[color:var(--neon-2)]">
            Нужна помощь? Напишите в поддержку
          </Link>
        </div>
      </Card>
    </div>
  );
}
