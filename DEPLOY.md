# 🚀 Инструкция по деплою на GitHub

## 1. Установка Git (если не установлен)

Скачайте и установите Git: https://git-scm.com/download/win

Или через winget:
```powershell
winget install --id Git.Git
```

**После установки перезапустите терминал!**

---

## 2. Инициализация репозитория

```bash
cd c:\Users\RobotComp.ru\Desktop\cource

# Инициализация git
git init

# Добавление всех файлов
git add .

# Первый коммит
git commit -m "Initial commit: NeuroPro AI LMS"
```

---

## 3. Создание репозитория на GitHub

### Вариант A: Через веб-интерфейс
1. Откройте https://github.com/new
2. Введите имя репозитория (например, `neuropro-ai`)
3. Выберите **Private** или **Public**
4. Нажмите **Create repository**
5. Скопируйте URL репозитория

### Вариант B: Через GitHub CLI
```bash
gh repo create neuropro-ai --public --source=. --remote=origin --push
```

---

## 4. Привязка удалённого репозитория

```bash
# Замените YOUR_USERNAME на ваш логин GitHub
git remote add origin https://github.com/YOUR_USERNAME/neuropro-ai.git

# Проверка
git remote -v

# Отправка кода
git branch -M main
git push -u origin main
```

---

## 5. Обновление кода

После внесения изменений:

```bash
# Проверка изменений
git status

# Добавление изменений
git add .

# Коммит
git commit -m "Описание изменений"

# Отправка на GitHub
git push
```

---

## 🌐 Деплой на Vercel (рекомендуется для Next.js)

### Шаг 1: Подключите репозиторий
1. Откройте https://vercel.com/new
2. Нажмите **Import Git Repository**
3. Выберите ваш репозиторий с GitHub
4. Нажмите **Import**

### Шаг 2: Настройте проект
- **Framework Preset:** Next.js (определится автоматически)
- **Root Directory:** `./` (оставьте по умолчанию)
- **Build Command:** `npm run build`
- **Output Directory:** `.next` (по умолчанию)

### Шаг 3: Добавьте переменные окружения
В настройках Vercel добавьте:
```
DATABASE_URL=file:./dev.db
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-project.vercel.app
```

### Шаг 4: Деплой
Нажмите **Deploy** 🎉

---

## 🌐 Альтернативные платформы

### Railway
```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

### Render
1. Откройте https://render.com
2. **New +** → **Web Service**
3. Подключите GitHub репозиторий
4. Настройки:
   - **Build Command:** `npm run build`
   - **Start Command:** `npm run start`

### Netlify
1. Откройте https://app.netlify.com
2. **Add new site** → **Import an existing project**
3. Выберите GitHub репозиторий
4. Настройки:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`

---

## 📝 Полезные Git команды

```bash
# Посмотреть историю коммитов
git log --oneline

# Откат изменений в файле
git checkout -- filename.tsx

# Отмена последнего коммита (сохраняя изменения)
git reset --soft HEAD~1

# Создание новой ветки
git checkout -b feature-name

# Переключение на ветку
git checkout branch-name

# Слияние веток
git merge branch-name

# Получение изменений из удалённого репозитория
git pull origin main
```

---

## 🔒 Безопасность

**Никогда не коммитьте:**
- ✅ `.env` файлы с секретными ключами
- ✅ Пароли от базы данных
- ✅ API ключи платёжных систем
- ✅ Личные данные пользователей

**Используйте:**
- ✅ Переменные окружения в Vercel/Railway
- ✅ GitHub Secrets для CI/CD

---

## 📊 GitHub Pages (не рекомендуется для Next.js SSR)

Для статических сайтов:

```bash
npm install --save-dev gh-pages

# В package.json добавьте:
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d out"
}

# Запуск
npm run deploy
```

---

## ✅ Чеклист перед деплоем

- [ ] Все изменения закоммичены
- [ ] `.env` файл добавлен в `.gitignore`
- [ ] Проект собирается (`npm run build`)
- [ ] Тесты проходят (если есть)
- [ ] README.md обновлён
- [ ] Лицензия добавлена

---

## 🎯 Быстрый старт

```bash
# 1. Инициализация
git init
git add .
git commit -m "Initial commit"

# 2. Создание на GitHub (через CLI)
gh repo create my-project --public --source=. --remote=origin --push

# 3. Деплой на Vercel
vercel --prod
```

---

**Готово!** 🎉 Ваш проект на GitHub!
