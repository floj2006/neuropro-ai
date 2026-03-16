export type CourseCategory = 'Beginner' | 'Automation' | 'AI Business' | 'Advanced';

export interface CourseModule {
  title: string;
  description: string;
  lessons: string[];
}

export interface Course {
  slug: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  level: CourseCategory;
  modules: string[];
  detailedModules: CourseModule[];
  instructor: {
    name: string;
    role: string;
  };
  outcomes: string[];
  whatIncluded: string[];
}

export const courses: Course[] = [
  {
    slug: 'ai-foundations',
    title: 'Основы ИИ для разработчиков',
    description: 'Фундамент ИИ, промпт-инжиниринг и запуск первых AI-функций в продукте.',
    price: '29 990 ₽',
    duration: '4 недели',
    level: 'Beginner',
    modules: ['Основы и терминология ИИ', 'Системы промпт-инжиниринга', 'Выбор и оценка моделей', 'Первый AI-воркфлоу'],
    detailedModules: [
      { title: 'Модуль 1: Основы ИИ', description: 'Базовые понятия и карта технологий', lessons: ['ИИ и ML', 'Типы сетей', 'Обзор LLM', 'Практикум'] },
      { title: 'Модуль 2: Промпт-системы', description: 'Коммуникация с моделями', lessons: ['Структура промпта', 'Few-shot', 'Системные роли', 'Практикум'] }
    ],
    instructor: { name: 'Д-р Елена Орлова', role: 'AI Product Lead, экс-DeepMind' },
    outcomes: ['Создаёте надёжные промпт-цепочки', 'Выбираете подходящую модель', 'Запускаете воркфлоу'],
    whatIncluded: ['4 видео-модуля', '12 заданий', 'Discord', 'Q&A', 'Шаблоны', 'Сертификат']
  },
  {
    slug: 'prompt-engineering-pro',
    title: 'Prompt Engineering Pro',
    description: 'Продвинутые техники промптов, контроль качества и системные шаблоны для команд.',
    price: '24 990 ₽',
    duration: '3 недели',
    level: 'Beginner',
    modules: ['Продвинутые техники', 'Контроль качества', 'Шаблоны', 'Командные стандарты'],
    detailedModules: [
      { title: 'Модуль 1: Продвинутые техники', description: 'Сложные промпт-структуры', lessons: ['Стабилизация', 'Контекст', 'Self-critique', 'Практикум'] },
      { title: 'Модуль 2: Оценка качества', description: 'Системы контроля', lessons: ['Метрики', 'Эвристики', 'Golden prompts', 'Практикум'] }
    ],
    instructor: { name: 'Анастасия Волкова', role: 'Prompt Engineer, ex-Notion' },
    outcomes: ['Стандартизируете промпты', 'Выстраиваете контроль', 'Снижаете риск ошибок'],
    whatIncluded: ['3 недели практики', 'Готовые шаблоны', 'Система оценки', 'Поддержка']
  },
  {
    slug: 'ai-productivity-bootcamp',
    title: 'AI Productivity Bootcamp',
    description: 'Как ускорить личную и командную продуктивность с помощью ИИ.',
    price: '19 990 ₽',
    duration: '2 недели',
    level: 'Beginner',
    modules: ['Персональные ассистенты', 'Автоматизация рутины', 'ИИ для контента', 'Knowledge-base'],
    detailedModules: [
      { title: 'Модуль 1: AI-ассистент', description: 'Задачи и ответы', lessons: ['Промпты', 'Шаблоны', 'Сводки', 'Практикум'] },
      { title: 'Модуль 2: Автоматизация', description: 'Сценарии без кода', lessons: ['Календарь', 'Репорты', 'Напоминания', 'Практикум'] }
    ],
    instructor: { name: 'Ирина Павлова', role: 'AI Ops Manager, ex-Miro' },
    outcomes: ['Сокращаете рутину', 'Строите личный AI-стек', 'Ускоряете коммуникации'],
    whatIncluded: ['2 недели', 'Шаблоны', 'Чек-листы']
  },
  {
    slug: 'ai-literacy',
    title: 'AI Literacy для менеджеров',
    description: 'Быстрый курс по применению ИИ в бизнесе для нетехнических лидеров.',
    price: '17 990 ₽',
    duration: '2 недели',
    level: 'Beginner',
    modules: ['AI-ландшафт', 'Use-cases', 'Риски и этика', 'Командные роли'],
    detailedModules: [
      { title: 'Модуль 1: AI-ландшафт', description: 'Ключевые понятия', lessons: ['LLM', 'Автоматизация', 'Примеры', 'Практикум'] },
      { title: 'Модуль 2: Бизнес-кейсы', description: 'Где ИИ даёт эффект', lessons: ['Кейсы', 'ROI', 'Риски', 'Практикум'] }
    ],
    instructor: { name: 'Ольга Миронова', role: 'AI Strategy Lead' },
    outcomes: ['Понимаете потенциал ИИ', 'Формируете инициативы', 'Снижаете риски'],
    whatIncluded: ['2 недели', 'Кейсы', 'Чек-листы']
  },
  {
    slug: 'ai-design-prototyping',
    title: 'AI-дизайн и прототипирование',
    description: 'Использование ИИ для быстрого дизайна интерфейсов и прототипов.',
    price: '21 990 ₽',
    duration: '3 недели',
    level: 'Beginner',
    modules: ['AI-генерация дизайна', 'UX-сценарии', 'Прототипы', 'Тестирование'],
    detailedModules: [
      { title: 'Модуль 1: AI-дизайн', description: 'Скорость и креатив', lessons: ['Wireframes', 'Копирайтинг', 'Стиль', 'Практикум'] },
      { title: 'Модуль 2: Прототипы', description: 'Проверка гипотез', lessons: ['Figma+AI', 'Тесты', 'Итерации', 'Практикум'] }
    ],
    instructor: { name: 'Дарья Сергеева', role: 'Product Designer, ex-Яндекс' },
    outcomes: ['Ускоряете прототипы', 'Улучшаёте UX', 'Сокращаете цикл тестов'],
    whatIncluded: ['3 недели', 'AI-шаблоны', 'Разборы']
  },
  {
    slug: 'automation-ops',
    title: 'Автоматизация бизнес-процессов с ИИ',
    description: 'Проектирование AI-автоматизаций для роста эффективности.',
    price: '44 990 ₽',
    duration: '6 недель',
    level: 'Automation',
    modules: ['Картирование воркфлоу', 'No-code + code', 'Контроль качества', 'Масштабирование'],
    detailedModules: [
      { title: 'Модуль 1: Процессы', description: 'Анализ и оптимизация', lessons: ['Задачи', 'Диаграммы', 'ROI', 'Практикум'] },
      { title: 'Модуль 2: No-code', description: 'Быстрые решения', lessons: ['Zapier/Make', 'n8n', 'Триггеры', 'Практикум'] }
    ],
    instructor: { name: 'Максим Петров', role: 'Архитектор автоматизации, экс-Stripe' },
    outcomes: ['Развёртываете ассистентов', 'Строите плейбуки', 'Считаете ROI'],
    whatIncluded: ['6 недель', '20+ заданий', 'Шаблоны']
  },
  {
    slug: 'ai-analytics',
    title: 'AI-аналитика и принятие решений',
    description: 'Как превращать данные в прогнозы и решения.',
    price: '34 990 ₽',
    duration: '5 недель',
    level: 'Automation',
    modules: ['Data readiness', 'Прогнозирование', 'AI-дашборды', 'Отчётность'],
    detailedModules: [
      { title: 'Модуль 1: Data readiness', description: 'Подготовка данных', lessons: ['Сбор', 'Пайплайны', 'Качество', 'Практикум'] },
      { title: 'Модуль 2: Прогнозирование', description: 'Модели и метрики', lessons: ['Сегментации', 'Когорты', 'Прогноз', 'Практикум'] }
    ],
    instructor: { name: 'Илья Громов', role: 'Head of Analytics, ex-Ozon' },
    outcomes: ['Запускаете дашборды', 'Оптимизируете решения', 'Автоматизируете отчёты'],
    whatIncluded: ['5 недель', 'Датасеты', 'Шаблоны']
  },
  {
    slug: 'ai-customer-ops',
    title: 'AI Customer Ops',
    description: 'Автоматизация поддержки и качества с ИИ.',
    price: '32 990 ₽',
    duration: '4 недели',
    level: 'Automation',
    modules: ['AI-чатботы', 'Классификация тикетов', 'QA', 'Интеграции'],
    detailedModules: [
      { title: 'Модуль 1: Чатботы', description: 'Сценарии и контекст', lessons: ['Сценарии', 'Контекст', 'Интеграции', 'Практикум'] },
      { title: 'Модуль 2: Контроль качества', description: 'SLA и стабильность', lessons: ['Классификация', 'Сентимент', 'SLA', 'Практикум'] }
    ],
    instructor: { name: 'Виктория Нечаева', role: 'CX Lead, ex-Tinkoff' },
    outcomes: ['Снижаете нагрузку', 'Ускоряете ответы', 'Повышаете NPS'],
    whatIncluded: ['4 недели', 'Сценарии', 'Шаблоны']
  },
  {
    slug: 'ai-automation-security',
    title: 'Безопасная AI-автоматизация',
    description: 'Как строить безопасные AI‑процессы и защищать данные.',
    price: '36 990 ₽',
    duration: '4 недели',
    level: 'Automation',
    modules: ['Безопасность', 'Политики доступа', 'Audit', 'Инциденты'],
    detailedModules: [
      { title: 'Модуль 1: Политики', description: 'Правила и доступы', lessons: ['RBAC', 'Логи', 'DLP', 'Практикум'] },
      { title: 'Модуль 2: Инциденты', description: 'Реагирование', lessons: ['Сценарии', 'Rollback', 'Метрики', 'Практикум'] }
    ],
    instructor: { name: 'Сергей Лапин', role: 'Security Lead, ex-Kaspersky' },
    outcomes: ['Снижаете риски', 'Защищаете данные', 'Контролируете доступ'],
    whatIncluded: ['4 недели', 'Шаблоны политик', 'Чек-листы']
  },
  {
    slug: 'ai-data-pipelines',
    title: 'AI Data Pipelines',
    description: 'Сбор, обработка и подготовка данных для AI‑моделей.',
    price: '37 990 ₽',
    duration: '5 недель',
    level: 'Automation',
    modules: ['ETL', 'Data quality', 'Streaming', 'Monitoring'],
    detailedModules: [
      { title: 'Модуль 1: ETL', description: 'Сбор и обработка', lessons: ['Источники', 'Очистка', 'Схемы', 'Практикум'] },
      { title: 'Модуль 2: Streaming', description: 'Потоковые данные', lessons: ['Kafka', 'Обновления', 'Latency', 'Практикум'] }
    ],
    instructor: { name: 'Павел Егоров', role: 'Data Engineering Lead' },
    outcomes: ['Строите надёжные пайплайны', 'Снижаете ошибки', 'Ускоряете ML'],
    whatIncluded: ['5 недель', 'Наборы данных', 'Шаблоны']
  },
  {
    slug: 'ai-business-lab',
    title: 'ИИ-бизнес: от идеи до прибыли',
    description: 'Монетизация AI-продуктов, стратегия выхода на рынок и запуск MVP.',
    price: '59 990 ₽',
    duration: '8 недель',
    level: 'AI Business',
    modules: ['AI-бизнес-модели', 'GTM-спринты', 'Ценообразование', 'Инвест-презентация'],
    detailedModules: [
      { title: 'Модуль 1: Бизнес-модели', description: 'Как зарабатывать', lessons: ['Типы бизнесов', 'Конкуренты', 'Unit-экономика', 'Практикум'] },
      { title: 'Модуль 2: GTM', description: 'Выход на рынок', lessons: ['Аудитория', 'Каналы', 'Контент', 'Практикум'] }
    ],
    instructor: { name: 'Софья Кузнецова', role: 'Основатель Neural Launch Studio' },
    outcomes: ['Определяете нишу', 'Запускаете MVP', 'Готовите инвест-историю'],
    whatIncluded: ['8 недель', '25+ шаблонов', 'Разборы', 'Сертификат']
  },
  {
    slug: 'ai-product-manager',
    title: 'AI Product Manager',
    description: 'Запуск AI‑фич, управление roadmap и доказательство ценности.',
    price: '39 990 ₽',
    duration: '5 недель',
    level: 'AI Business',
    modules: ['Discovery', 'AI-экономика', 'Метрики', 'Внедрение'],
    detailedModules: [
      { title: 'Модуль 1: Discovery', description: 'От боли до решения', lessons: ['Интервью', 'Карта ценности', 'Feasibility', 'Практикум'] },
      { title: 'Модуль 2: Экономика', description: 'Окупаемость', lessons: ['Unit-экономика', 'Монетизация', 'Снижение затрат', 'Практикум'] }
    ],
    instructor: { name: 'Екатерина Орлова', role: 'Product Director, ex-Miro' },
    outcomes: ['Формируете roadmap', 'Доказываете ценность', 'Запускаете эксперименты'],
    whatIncluded: ['5 недель', 'Шаблоны PRD', 'Фреймворки']
  },
  {
    slug: 'ai-growth-strategy',
    title: 'AI Growth Strategy',
    description: 'Системный рост AI‑продукта: acquisition, activation, retention и монетизация.',
    price: '36 990 ₽',
    duration: '4 недели',
    level: 'AI Business',
    modules: ['Воронки', 'Эксперименты', 'Pricing', 'B2B масштабирование'],
    detailedModules: [
      { title: 'Модуль 1: Воронки', description: 'Метрики и гипотезы', lessons: ['AAARRR', 'Сегментации', 'Ретеншн', 'Практикум'] },
      { title: 'Модуль 2: Монетизация', description: 'Цены и упаковка', lessons: ['Прайсинг', 'Upsell', 'Enterprise', 'Практикум'] }
    ],
    instructor: { name: 'Никита Серов', role: 'Growth Lead, ex-Skyeng' },
    outcomes: ['Повышаете конверсию', 'Снижаете CAC', 'Усиливаете LTV'],
    whatIncluded: ['4 недели', 'Шаблоны', 'Метрики']
  },
  {
    slug: 'ai-go-to-market',
    title: 'AI Go-To-Market',
    description: 'Запуск AI‑продукта и стратегия продаж на B2B рынках.',
    price: '42 990 ₽',
    duration: '5 недель',
    level: 'AI Business',
    modules: ['Позиционирование', 'Воронки', 'Sales playbooks', 'Партнёрства'],
    detailedModules: [
      { title: 'Модуль 1: Позиционирование', description: 'Ниша и оффер', lessons: ['JTBD', 'ICP', 'Messaging', 'Практикум'] },
      { title: 'Модуль 2: Продажи', description: 'Сделки и пайплайн', lessons: ['Outbound', 'Демо', 'Возражения', 'Практикум'] }
    ],
    instructor: { name: 'Кирилл Орехов', role: 'B2B Growth Lead' },
    outcomes: ['Запускаете GTM', 'Собираете пайплайн', 'Закрываете сделки'],
    whatIncluded: ['5 недель', 'Плейбуки', 'Шаблоны']
  },
  {
    slug: 'ai-funding',
    title: 'AI Funding & Pitching',
    description: 'Как готовить питч и привлекать инвестиции для AI‑продуктов.',
    price: '33 990 ₽',
    duration: '3 недели',
    level: 'AI Business',
    modules: ['Pitch deck', 'Метрики', 'Storytelling', 'Инвест‑процесс'],
    detailedModules: [
      { title: 'Модуль 1: Pitch', description: 'История и структура', lessons: ['Storyline', 'Unit-экономика', 'Тракшн', 'Практикум'] },
      { title: 'Модуль 2: Инвест-процесс', description: 'Сделки', lessons: ['Term sheet', 'Вопросы', 'Подготовка', 'Практикум'] }
    ],
    instructor: { name: 'Анна Синицына', role: 'VC Analyst' },
    outcomes: ['Упаковываете питч', 'Готовитесь к due diligence', 'Понимаете ожидания VC'],
    whatIncluded: ['3 недели', 'Шаблоны deck', 'Разборы']
  },
  {
    slug: 'advanced-agents',
    title: 'Продвинутые ИИ-агенты',
    description: 'Оркестрация агентных систем, оценка качества и надёжные воркфлоу.',
    price: '74 990 ₽',
    duration: '10 недель',
    level: 'Advanced',
    modules: ['Оркестрация агентов', 'Инструменты и память', 'Оценка качества', 'Безопасность'],
    detailedModules: [
      { title: 'Модуль 1: Архитектура агентов', description: 'Базовые паттерны', lessons: ['ReAct', 'AutoGen', 'Коммуникация', 'Практикум'] },
      { title: 'Модуль 2: Надёжность', description: 'Контроль качества', lessons: ['Eval', 'A/B тесты', 'Guardrails', 'Практикум'] }
    ],
    instructor: { name: 'Егор Назаров', role: 'Research Engineer, Open Innovation Lab' },
    outcomes: ['Строите multi-agent системы', 'Оцениваете надёжность', 'Проектируете управление'],
    whatIncluded: ['10 недель', '30+ лабораторных', 'Менторинг']
  },
  {
    slug: 'llm-ops-eval',
    title: 'LLM Ops и оценка качества',
    description: 'Надёжные пайплайны LLM, мониторинг, алерты и эксплуатация.',
    price: '64 990 ₽',
    duration: '7 недель',
    level: 'Advanced',
    modules: ['LLM Ops', 'Мониторинг', 'Безопасность', 'Оптимизация затрат'],
    detailedModules: [
      { title: 'Модуль 1: LLM Ops', description: 'Пайплайны и оркестрация', lessons: ['Deploy', 'Роутинг', 'Кэш', 'Практикум'] },
      { title: 'Модуль 2: Мониторинг', description: 'Стабильность', lessons: ['Latency', 'Alerting', 'Quality drift', 'Практикум'] }
    ],
    instructor: { name: 'Артём Соловьёв', role: 'ML Platform Lead, ex-Avito' },
    outcomes: ['Выстраиваете LLM Ops', 'Контролируете качество', 'Снижаете стоимость'],
    whatIncluded: ['7 недель', 'Чек-листы', 'Шаблоны метрик']
  },
  {
    slug: 'multimodal-systems',
    title: 'Мультимодальные системы',
    description: 'Vision + text: продукты, работающие с изображениями и текстом.',
    price: '69 990 ₽',
    duration: '6 недель',
    level: 'Advanced',
    modules: ['Vision модели', 'Пайплайны', 'Оценка качества', 'Кейсы'],
    detailedModules: [
      { title: 'Модуль 1: Vision модели', description: 'Базовые архитектуры', lessons: ['CLIP', 'ViT', 'Fine-tuning', 'Практикум'] },
      { title: 'Модуль 2: Пайплайны', description: 'Сбор и обработка', lessons: ['Data pipelines', 'Inference', 'Monitoring', 'Практикум'] }
    ],
    instructor: { name: 'Мария Воробьёва', role: 'CV Researcher, ex-Sber AI' },
    outcomes: ['Строите мультимодальные пайплайны', 'Оцениваете качество', 'Запускаете продукты'],
    whatIncluded: ['6 недель', 'Датасеты', 'Методички']
  },
  {
    slug: 'ai-safety-governance',
    title: 'AI Safety & Governance',
    description: 'Управление рисками, комплаенс и ответственность в AI‑проектах.',
    price: '58 990 ₽',
    duration: '6 недель',
    level: 'Advanced',
    modules: ['Риски', 'Комплаенс', 'Политики', 'Аудит'],
    detailedModules: [
      { title: 'Модуль 1: Риски', description: 'Опасности и guardrails', lessons: ['Policy', 'Red teaming', 'Оценки', 'Практикум'] },
      { title: 'Модуль 2: Аудит', description: 'Контроль качества', lessons: ['Audit trail', 'Метрики', 'Документация', 'Практикум'] }
    ],
    instructor: { name: 'Валерий Семёнов', role: 'AI Governance Lead' },
    outcomes: ['Снижаете риски', 'Внедряете политики', 'Проходите аудит'],
    whatIncluded: ['6 недель', 'Чек-листы', 'Шаблоны']
  },
  {
    slug: 'agentic-product-lab',
    title: 'Agentic Product Lab',
    description: 'Проектирование агентных продуктов и мультиагентных команд.',
    price: '72 990 ₽',
    duration: '8 недель',
    level: 'Advanced',
    modules: ['Agent design', 'Оркестрация', 'Инструменты', 'Проверка качества'],
    detailedModules: [
      { title: 'Модуль 1: Agent design', description: 'Паттерны и роли', lessons: ['Roles', 'Memory', 'Tools', 'Практикум'] },
      { title: 'Модуль 2: Оркестрация', description: 'Команды агентов', lessons: ['Coordination', 'State', 'Retries', 'Практикум'] }
    ],
    instructor: { name: 'Антон Власов', role: 'Agentic Systems Lead' },
    outcomes: ['Проектируете агентные продукты', 'Управляете командами', 'Оцениваете качество'],
    whatIncluded: ['8 недель', 'Лаборатории', 'Менторинг']
  }
];

export const courseCategories: CourseCategory[] = ['Beginner', 'Automation', 'AI Business', 'Advanced'];

export const categoryTranslations: Record<CourseCategory, string> = {
  'Beginner': 'Начинающий',
  'Automation': 'Автоматизация',
  'AI Business': 'AI-бизнес',
  'Advanced': 'Продвинутый'
};

