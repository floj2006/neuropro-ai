export type PaymentItemType = 'plan' | 'course';

export interface PaymentItem {
  id: string;
  type: PaymentItemType;
  title: string;
  description: string;
  amount: {
    value: string;
    currency: 'RUB';
  };
}

const rub = (value: number) => ({
  value: value.toFixed(2),
  currency: 'RUB' as const
});

export const paymentItems: Record<string, PaymentItem> = {
  'plan:starter': {
    id: 'plan:starter',
    type: 'plan',
    title: 'План «Старт»',
    description: 'Доступ к базовым курсам и ежемесячные live-сессии Q&A.',
    amount: rub(3990)
  },
  'plan:pro': {
    id: 'plan:pro',
    type: 'plan',
    title: 'План «Профи»',
    description: 'Полный доступ к каталогу и практикумам по автоматизации.',
    amount: rub(9990)
  },
  'plan:business': {
    id: 'plan:business',
    type: 'plan',
    title: 'План «Бизнес»',
    description: 'Менторство и стратегические сессии для команд.',
    amount: rub(19990)
  },
  'course:ai-foundations': { id: 'course:ai-foundations', type: 'course', title: 'Основы ИИ для разработчиков', description: 'Фундамент ИИ и промпт-инжиниринг.', amount: rub(29990) },
  'course:prompt-engineering-pro': { id: 'course:prompt-engineering-pro', type: 'course', title: 'Prompt Engineering Pro', description: 'Продвинутые техники промптов.', amount: rub(24990) },
  'course:ai-productivity-bootcamp': { id: 'course:ai-productivity-bootcamp', type: 'course', title: 'AI Productivity Bootcamp', description: 'Ускорение продуктивности с ИИ.', amount: rub(19990) },
  'course:ai-literacy': { id: 'course:ai-literacy', type: 'course', title: 'AI Literacy для менеджеров', description: 'Быстрое погружение в ИИ для лидеров.', amount: rub(17990) },
  'course:ai-design-prototyping': { id: 'course:ai-design-prototyping', type: 'course', title: 'AI-дизайн и прототипирование', description: 'Дизайн и прототипы с ИИ.', amount: rub(21990) },
  'course:automation-ops': { id: 'course:automation-ops', type: 'course', title: 'Автоматизация бизнес-процессов с ИИ', description: 'Проектирование AI-автоматизаций.', amount: rub(44990) },
  'course:ai-analytics': { id: 'course:ai-analytics', type: 'course', title: 'AI-аналитика и принятие решений', description: 'Прогнозирование и отчётность.', amount: rub(34990) },
  'course:ai-customer-ops': { id: 'course:ai-customer-ops', type: 'course', title: 'AI Customer Ops', description: 'Автоматизация поддержки с ИИ.', amount: rub(32990) },
  'course:ai-automation-security': { id: 'course:ai-automation-security', type: 'course', title: 'Безопасная AI-автоматизация', description: 'Безопасность и защита данных.', amount: rub(36990) },
  'course:ai-data-pipelines': { id: 'course:ai-data-pipelines', type: 'course', title: 'AI Data Pipelines', description: 'Подготовка данных для AI.', amount: rub(37990) },
  'course:ai-business-lab': { id: 'course:ai-business-lab', type: 'course', title: 'ИИ-бизнес: от идеи до прибыли', description: 'Монетизация и запуск MVP.', amount: rub(59990) },
  'course:ai-product-manager': { id: 'course:ai-product-manager', type: 'course', title: 'AI Product Manager', description: 'Roadmap и запуск AI-фич.', amount: rub(39990) },
  'course:ai-growth-strategy': { id: 'course:ai-growth-strategy', type: 'course', title: 'AI Growth Strategy', description: 'Системный рост AI-продукта.', amount: rub(36990) },
  'course:ai-go-to-market': { id: 'course:ai-go-to-market', type: 'course', title: 'AI Go-To-Market', description: 'Запуск AI-продукта в B2B.', amount: rub(42990) },
  'course:ai-funding': { id: 'course:ai-funding', type: 'course', title: 'AI Funding & Pitching', description: 'Питч и инвестиции.', amount: rub(33990) },
  'course:advanced-agents': { id: 'course:advanced-agents', type: 'course', title: 'Продвинутые ИИ-агенты', description: 'Оркестрация агентов.', amount: rub(74990) },
  'course:llm-ops-eval': { id: 'course:llm-ops-eval', type: 'course', title: 'LLM Ops и оценка качества', description: 'Мониторинг и эксплуатация.', amount: rub(64990) },
  'course:multimodal-systems': { id: 'course:multimodal-systems', type: 'course', title: 'Мультимодальные системы', description: 'Vision + text пайплайны.', amount: rub(69990) },
  'course:ai-safety-governance': { id: 'course:ai-safety-governance', type: 'course', title: 'AI Safety & Governance', description: 'Риски и комплаенс.', amount: rub(58990) },
  'course:agentic-product-lab': { id: 'course:agentic-product-lab', type: 'course', title: 'Agentic Product Lab', description: 'Проектирование агентных продуктов.', amount: rub(72990) }
};

export const planCards = [
  { id: 'plan:starter', name: 'Старт', price: '3 990 ₽', cadence: '/мес', description: 'Доступ к базовым курсам и live-сессии Q&A.', features: ['2 курса в квартал', 'Доступ в сообщество', 'Обновления AI-инструментов'] },
  { id: 'plan:pro', name: 'Профи', price: '9 990 ₽', cadence: '/мес', description: 'Полный доступ к каталогу плюс практикумы.', features: ['Безлимитные курсы', 'Шаблоны автоматизации', 'Еженедельные офисные часы'], highlight: true },
  { id: 'plan:business', name: 'Бизнес', price: '19 990 ₽', cadence: '/мес', description: 'Менторство и стратегические сессии.', features: ['Личное менторство', 'Круглые столы', 'Командные лицензии (3 места)'] }
];

export const coursePaymentIds: Record<string, string> = {
  'ai-foundations': 'course:ai-foundations',
  'prompt-engineering-pro': 'course:prompt-engineering-pro',
  'ai-productivity-bootcamp': 'course:ai-productivity-bootcamp',
  'ai-literacy': 'course:ai-literacy',
  'ai-design-prototyping': 'course:ai-design-prototyping',
  'automation-ops': 'course:automation-ops',
  'ai-analytics': 'course:ai-analytics',
  'ai-customer-ops': 'course:ai-customer-ops',
  'ai-automation-security': 'course:ai-automation-security',
  'ai-data-pipelines': 'course:ai-data-pipelines',
  'ai-business-lab': 'course:ai-business-lab',
  'ai-product-manager': 'course:ai-product-manager',
  'ai-growth-strategy': 'course:ai-growth-strategy',
  'ai-go-to-market': 'course:ai-go-to-market',
  'ai-funding': 'course:ai-funding',
  'advanced-agents': 'course:advanced-agents',
  'llm-ops-eval': 'course:llm-ops-eval',
  'multimodal-systems': 'course:multimodal-systems',
  'ai-safety-governance': 'course:ai-safety-governance',
  'agentic-product-lab': 'course:agentic-product-lab'
};

export const getPaymentItem = (id: string) => paymentItems[id];
