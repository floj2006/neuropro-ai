import Database from 'better-sqlite3';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'data.db');

export const db = new Database(dbPath);

export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      telegram_id TEXT UNIQUE,
      name TEXT,
      cohort TEXT,
      plan TEXT,
      hours_per_week TEXT
    );

    CREATE TABLE IF NOT EXISTS courses (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      progress INTEGER NOT NULL DEFAULT 0,
      next_lesson TEXT NOT NULL,
      mentor TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS payments (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      price TEXT NOT NULL,
      status TEXT NOT NULL,
      due TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS activity (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      time TEXT NOT NULL,
      meta TEXT NOT NULL
    );
  `);
}

export function seedDb() {
  const courseCount = db.prepare('SELECT COUNT(*) as count FROM courses').get().count;
  if (courseCount === 0) {
    const insertCourse = db.prepare(
      'INSERT INTO courses (id, title, category, progress, next_lesson, mentor) VALUES (@id, @title, @category, @progress, @nextLesson, @mentor)'
    );
    const courses = [
      {
        id: 'ai-foundations',
        title: 'Основы ИИ для разработчиков',
        category: 'Начинающий',
        progress: 42,
        nextLesson: 'Промпт-архитектура: этапы и роли',
        mentor: 'Елена Орлова'
      },
      {
        id: 'prompt-engineering-pro',
        title: 'Prompt Engineering Pro',
        category: 'Начинающий',
        progress: 18,
        nextLesson: 'Контекстные окна и контроль качества',
        mentor: 'Анастасия Волкова'
      },
      {
        id: 'automation-ops',
        title: 'Автоматизация бизнес-процессов',
        category: 'Автоматизация',
        progress: 66,
        nextLesson: 'Оркестрация сценариев без кода',
        mentor: 'Максим Петров'
      },
      {
        id: 'ai-analytics',
        title: 'AI-аналитика и решения',
        category: 'Автоматизация',
        progress: 8,
        nextLesson: 'Подготовка датасетов',
        mentor: 'Илья Громов'
      },
      {
        id: 'ai-business-lab',
        title: 'ИИ-бизнес: от идеи до прибыли',
        category: 'AI-бизнес',
        progress: 27,
        nextLesson: 'Unit-экономика AI-проекта',
        mentor: 'Софья Кузнецова'
      },
      {
        id: 'ai-growth-strategy',
        title: 'AI Growth Strategy',
        category: 'AI-бизнес',
        progress: 54,
        nextLesson: 'Эксперименты и ретеншн',
        mentor: 'Никита Серов'
      },
      {
        id: 'advanced-agents',
        title: 'Продвинутые ИИ-агенты',
        category: 'Продвинутый',
        progress: 10,
        nextLesson: 'Память агента и инструменты',
        mentor: 'Егор Назаров'
      },
      {
        id: 'llm-ops-eval',
        title: 'LLM Ops и оценка качества',
        category: 'Продвинутый',
        progress: 3,
        nextLesson: 'Мониторинг и алерты',
        mentor: 'Артём Соловьёв'
      }
    ];
    const insertMany = db.transaction((rows) => {
      rows.forEach((row) => insertCourse.run(row));
    });
    insertMany(courses);
  }

  const paymentCount = db.prepare('SELECT COUNT(*) as count FROM payments').get().count;
  if (paymentCount === 0) {
    const insertPayment = db.prepare(
      'INSERT INTO payments (id, title, price, status, due) VALUES (@id, @title, @price, @status, @due)'
    );
    const payments = [
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
    const insertMany = db.transaction((rows) => {
      rows.forEach((row) => insertPayment.run(row));
    });
    insertMany(payments);
  }

  const activityCount = db.prepare('SELECT COUNT(*) as count FROM activity').get().count;
  if (activityCount === 0) {
    const insertActivity = db.prepare(
      'INSERT INTO activity (id, title, time, meta) VALUES (@id, @title, @time, @meta)'
    );
    const activity = [
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
    const insertMany = db.transaction((rows) => {
      rows.forEach((row) => insertActivity.run(row));
    });
    insertMany(activity);
  }
}
