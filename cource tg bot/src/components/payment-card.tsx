import type { PaymentItem } from '../data/payments';
import GlowButton from './glow-button';

interface PaymentCardProps {
  item: PaymentItem;
}

export default function PaymentCard({ item }: PaymentCardProps) {
  const statusStyles =
    item.status === 'Оплачено'
      ? 'text-emerald-300'
      : item.status === 'Ожидает оплаты'
        ? 'text-amber-300'
        : 'text-sky-300';

  return (
    <div className="rounded-2xl border border-white/10 bg-panel/70 p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-white">{item.title}</h3>
        <span className={`text-xs font-semibold ${statusStyles}`}>{item.status}</span>
      </div>
      <p className="mt-2 text-sm text-muted">{item.price}</p>
      <p className="mt-1 text-xs text-muted">{item.due}</p>
      <div className="mt-4 flex gap-2">
        {item.status === 'Оплачено' ? (
          <GlowButton variant="ghost" className="w-full">
            Квитанция
          </GlowButton>
        ) : (
          <GlowButton className="w-full">Оплатить</GlowButton>
        )}
      </div>
    </div>
  );
}
