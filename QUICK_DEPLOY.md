# 🚀 Быстрый деплой на GitHub

## Способ 1: Через PowerShell скрипт (рекомендуется)

```powershell
# Разрешите выполнение скриптов (один раз)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Запустите скрипт деплоя
.\deploy.ps1
```

Скрипт автоматически:
- ✅ Проверит наличие Git
- ✅ Инициализирует репозиторий
- ✅ Добавит все файлы
- ✅ Создаст коммит
- ✅ Отправит на GitHub

---

## Способ 2: Через BAT файл (для старых систем)

```cmd
deploy.bat
```

---

## Способ 3: Вручную

```bash
# 1. Инициализация (если нужно)
git init

# 2. Добавление файлов
git add .

# 3. Коммит
git commit -m "Update: NeuroPro AI"

# 4. Привязка репозитория
git remote add origin https://github.com/YOUR_USERNAME/neuropro-ai.git

# 5. Отправка
git branch -M main
git push -u origin main
```

---

## 📱 GitHub Mobile

После деплоя можете просматривать код через мобильное приложение GitHub:
- iOS: https://apps.apple.com/app/github/id1477376905
- Android: https://play.google.com/store/apps/details?id=com.github.android

---

## 🔗 Полезные ссылки

- Создать репозиторий: https://github.com/new
- GitHub Desktop: https://desktop.github.com
- Документация: https://docs.github.com
