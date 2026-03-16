export interface PaymentItem {
  id: string;
  title: string;
  price: string;
  status: 'Оплачено' | 'Ожидает оплаты' | 'Счёт выставлен';
  due: string;
}

export const payments: PaymentItem[] = [
  {
    id: 'invoice-114',
    title: 'LLM Ops и оценка качества',
    price: '64 990 ₽',
    status: 'Ожидает оплаты',
    due: 'до 18 марта'
  },
  {
    id: 'invoice-093',
    title: 'AI Growth Strategy',
    price: '36 990 ₽',
    status: 'Счёт выставлен',
    due: 'до 22 марта'
  },
  {
    id: 'invoice-071',
    title: 'Основы ИИ для разработчиков',
    price: '29 990 ₽',
    status: 'Оплачено',
    due: 'оплата подтверждена'
  }
];
