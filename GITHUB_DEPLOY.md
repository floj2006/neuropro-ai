# 🎯 Инструкция по деплою NeuroPro AI на GitHub

## 📋 Что нужно сделать

### Шаг 1: Установите Git

Откройте PowerShell и выполните:

```powershell
winget install --id Git.Git -e --source winget
```

**Дождитесь окончания установки и перезапустите терминал!**

Проверьте установку:
```bash
git --version
```

---

### Шаг 2: Создайте репозиторий на GitHub

1. Откройте https://github.com/new
2. Введите имя: `neuropro-ai`
3. Выберите **Public** или **Private**
4. Нажмите **Create repository**
5. **Скопируйте URL** репозитория (например: `https://github.com/username/neuropro-ai.git`)

---

### Шаг 3: Отправьте код на GitHub

#### Вариант A: Через скрипт (просто)

```powershell
# Разрешите выполнение скриптов (один раз)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Запустите скрипт
.\deploy.ps1
```

Скрипт спросит URL репозитория — вставьте скопированный URL.

---

#### Вариант B: Вручную (для опытных)

```bash
# Перейдите в папку проекта
cd c:\Users\RobotComp.ru\Desktop\cource

# Инициализируйте git
git init

# Добавьте все файлы
git add .

# Создайте первый коммит
git commit -m "Initial commit: NeuroPro AI LMS"

# Привяжите удалённый репозиторий
git remote add origin https://github.com/YOUR_USERNAME/neuropro-ai.git

# Отправьте код
git branch -M main
git push -u origin main
```

---

### Шаг 4: Проверьте на GitHub

1. Откройте ваш репозиторий на GitHub
2. Убедитесь, что файлы загрузились
3. README.md отображается на главной странице репозитория

---

## 🌐 Деплой на Vercel (опционально)

После загрузки на GitHub:

1. Откройте https://vercel.com/new
2. Нажмите **Import Git Repository**
3. Выберите ваш репозиторий `neuropro-ai`
4. Нажмите **Import**
5. Добавьте переменные окружения:
   ```
   DATABASE_URL=file:./dev.db
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=https://your-project.vercel.app
   ```
6. Нажмите **Deploy**

Готово! Ваш сайт доступен по URL от Vercel.

---

## 📁 Какие файлы загружаются

✅ **Загружаются:**
- `app/` - Страницы сайта
- `components/` - React компоненты
- `lib/` - Утилиты и данные
- `prisma/` - Схема базы данных
- `scripts/` - Скрипты
- `public/` - Статические файлы
- `package.json` - Зависимости
- `README.md` - Документация
- `.gitignore` - Игнорируемые файлы

❌ **НЕ загружаются:**
- `node_modules/` - Зависимости
- `.next/` - Build файлы
- `.env` - Переменные окружения
- `*.db` - Файлы базы данных

---

## 🔒 Безопасность

Перед деплоем убедитесь, что в `.gitignore` добавлены:

```
.env
node_modules/
.next/
*.db
```

**Никогда не коммитьте:**
- Пароли
- API ключи
- Персональные данные

---

## 📊 Обновление кода

После внесения изменений:

```bash
git add .
git commit -m "Описание изменений"
git push
```

Vercel автоматически обновит сайт!

---

## ✅ Чеклист

- [ ] Git установлен и работает
- [ ] Репозиторий создан на GitHub
- [ ] Код отправлен (`git push`)
- [ ] README.md отображается на GitHub
- [ ] (Опционально) Сайт задеплоен на Vercel

---

## 🎉 Готово!

Ваш проект NeuroPro AI теперь на GitHub!

**Следующие шаги:**
- Пригласите коллег в репозиторий
- Настройте CI/CD пайплайны
- Добавьте GitHub Actions для автотестов

---

**Нужна помощь?** Откройте [INSTALL_GIT.md](./INSTALL_GIT.md) или [DEPLOY.md](./DEPLOY.md)
