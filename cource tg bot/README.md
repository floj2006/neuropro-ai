# NeuroPro Telegram Mini App

Мини‑приложение для Telegram с отслеживанием занятий, оплатой и поддержкой в стилистике NeuroPro.

## Запуск

1) В основном проекте (cource) запустить Next.js:

```bash
npm run dev
```

2) В mini app:

```bash
cd "cource tg bot"
npm install
npm run dev
```

Mini app ожидает общий API по адресу `http://localhost:3000/api/tg/*`.

## База данных

Общая база живёт в основном проекте. Сейчас используется SQLite через Prisma.
Перед первым запуском выполните в `cource`:

```bash
npm run db:push
npm run db:seed:courses
```
