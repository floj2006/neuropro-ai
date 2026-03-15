# 🧠 NeuroPro AI - Платформа онлайн-курсов

Современная LMS (Learning Management System) для продажи и прохождения курсов по искусственному интеллекту.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-green?logo=prisma)
![NextAuth](https://img.shields.io/badge/Auth.js-NextAuth-red?logo=auth.js)

---

## ✨ Возможности

- 📚 **Каталог курсов** с детальным описанием
- 🛒 **Покупка курсов** через платёжную систему
- 👤 **Личный кабинет** с историей покупок
- 🔐 **Авторизация** и регистрация
- 🎭 **Ролевая модель** (USER/ADMIN)
- 📱 **Адаптивный дизайн** для мобильных
- 🇷🇺 **Полностью на русском языке**

---

## 🚀 Быстрый старт

### Требования
- Node.js 20+
- npm или yarn

### Установка

```bash
# Клонирование репозитория
git clone https://github.com/YOUR_USERNAME/neuropro-ai.git
cd neuropro-ai

# Установка зависимостей
npm install

# Генерация Prisma клиента
npm run db:generate

# Применение миграций БД
npm run db:push

# Запуск dev-сервера
npm run dev
```

Откройте **http://localhost:3000**

---

## 📁 Структура проекта

```
neuropro-ai/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── auth/             # NextAuth endpoints
│   │   └── purchases/        # Покупки
│   ├── auth/                 # Страницы авторизации
│   ├── courses/              # Страницы курсов
│   │   └── [slug]/           # Динамические маршруты
│   ├── dashboard/            # Личный кабинет
│   └── page.tsx              # Главная
├── components/               # React компоненты
│   ├── ui/                   # UI компоненты
│   └── ...                   # Бизнес-компоненты
├── lib/                      # Утилиты и конфиги
│   ├── auth.ts               # NextAuth конфигурация
│   ├── prisma.ts             # Prisma клиент
│   └── data/                 # Данные курсов
├── prisma/                   # Prisma схема
│   └── schema.prisma
├── scripts/                  # Скрипты
│   └── create-admin.ts       # Создание админа
└── types/                    # TypeScript типы
    └── next-auth.d.ts
```

---

## 🛠 Технологии

| Категория | Технология |
|-----------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Database** | SQLite (Prisma ORM) |
| **Auth** | NextAuth.js (Auth.js) |
| **Styling** | Tailwind CSS v4 |
| **UI** | Custom Components |
| **Validation** | Zod (опционально) |

---

## 📦 Команды

```bash
# Разработка
npm run dev              # Запуск dev-сервера

# Продакшен
npm run build            # Сборка проекта
npm run start            # Запуск production сервера

# База данных
npm run db:generate      # Генерация Prisma клиента
npm run db:push          # Применение миграций
npm run db:studio        # Prisma Studio (GUI)

# Утилиты
npm run create-admin     # Создание администратора
npm run lint             # ESLint проверка
```

---

## 🔐 Создание администратора

```bash
npm run create-admin
```

Введите:
- Email
- Имя
- Пароль

---

## 🗄 База данных

### Модели

**User** - Пользователи
```prisma
- id, email, password, name, role
- accounts[], sessions[], purchases[]
```

**Purchase** - Покупки курсов
```prisma
- id, userId, courseId, amount, status
```

**Session** - Сессии
**Account** - OAuth аккаунты

---

## 🌐 Деплой

### Vercel (рекомендуется)

```bash
# Установите Vercel CLI
npm i -g vercel

# Деплой
vercel --prod
```

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Railway

```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

### Render

1. Подключите GitHub репозиторий
2. Build: `npm run build`
3. Start: `npm run start`

📖 **Подробная инструкция:** [DEPLOY.md](./DEPLOY.md)

---

## 🔒 Переменные окружения

Создайте `.env`:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Production
# DATABASE_URL="postgresql://..."
# NEXTAUTH_URL="https://your-domain.com"
```

---

## 📱 API Endpoints

### POST /api/auth/register
Регистрация нового пользователя.

```json
{
  "name": "Иван Иванов",
  "email": "ivan@example.com",
  "password": "password123"
}
```

### POST /api/purchases
Создание покупки (требуется авторизация).

```json
{
  "courseId": "ai-foundations",
  "amount": 29990,
  "courseName": "Основы ИИ"
}
```

---

## 🎨 Компоненты

### UI Components
- `Button` - Кнопки с вариантами
- `Card` - Карточки
- `Badge` - Бейджи
- `Accordion` - Аккордеоны

### Бизнес-компоненты
- `CourseCard` - Карточка курса
- `Pricing` - Тарифы
- `Testimonials` - Отзывы
- `Faq` - FAQ
- `SectionHeading` - Заголовки секций

---

## 📊 Roadmap

- [ ] Интеграция платёжных систем (ЮKassa)
- [ ] Видео-уроки внутри курсов
- [ ] Домашние задания с проверкой
- [ ] Система сертификатов
- [ ] Отзывы и рейтинги
- [ ] Email-рассылки
- [ ] Админ-панель
- [ ] Геймификация

---

## 🤝 Вклад

Pull requests приветствуются! Для крупных изменений пожалуйста откройте issue сначала.

---

## 📄 Лицензия

MIT License - см. файл [LICENSE](./LICENSE) для деталей.

---

## 👥 Контакты

- **Email:** hello@neuropro.ai
- **Website:** https://neuropro.ai
- **Telegram:** @neuropro_ai

---

## 🙏 Благодарности

- [Next.js](https://nextjs.org/) - React фреймворк
- [Prisma](https://prisma.io/) - ORM
- [Tailwind CSS](https://tailwindcss.com/) - Стилизация
- [NextAuth.js](https://next-auth.js.org/) - Авторизация

---

**Made with ❤️ by NeuroPro Team**
