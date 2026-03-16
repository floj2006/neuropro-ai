export type CourseCategory = 'Начинающий' | 'Автоматизация' | 'AI-бизнес' | 'Продвинутый';

export interface CourseItem {
  id: string;
  title: string;
  category: CourseCategory;
  progress: number;
  nextLesson: string;
  mentor: string;
}

export const courses: CourseItem[] = [
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
