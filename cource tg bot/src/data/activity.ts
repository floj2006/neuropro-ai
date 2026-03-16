export interface ActivityItem {
  id: string;
  title: string;
  time: string;
  meta: string;
}

export const activity: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Завершён урок: «Prompt-структуры»',
    time: 'сегодня, 10:40',
    meta: 'Курс: Prompt Engineering Pro'
  },
  {
    id: 'act-2',
    title: 'Новый модуль открыт',
    time: 'вчера, 18:10',
    meta: 'Курс: Автоматизация бизнес-процессов'
  },
  {
    id: 'act-3',
    title: 'Оплата подтверждена',
    time: 'вчера, 09:30',
    meta: 'Курс: Основы ИИ для разработчиков'
  }
];
