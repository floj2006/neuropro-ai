import Link from 'next/link';
import SectionHeading from '../../../components/section-heading';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';

interface SuccessPageProps {
  searchParams?: { item?: string };
}

export default function PaymentSuccessPage({ searchParams }: SuccessPageProps) {
  const item = searchParams?.item;

  return (
    <div className="pb-20">
      <section className="section">
        <SectionHeading
          eyebrow="Оплата"
          title="Спасибо! Платёж отправлен"
          description="Если оплата прошла успешно, вы получите письмо с доступом и деталями." 
        />
        <Card className="mt-8 space-y-3 text-sm text-[color:var(--muted)]">
          {item ? <p>Заказ: {item}</p> : null}
          <p>Если письмо не пришло в течение 5 минут — напишите в поддержку: hello@neuropro.ai</p>
        </Card>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button href="/dashboard">Перейти в кабинет</Button>
          <Link href="/courses" className="text-sm text-[color:var(--neon-2)]">
            Вернуться к курсам
          </Link>
        </div>
      </section>
    </div>
  );
}
