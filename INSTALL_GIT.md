# 📦 Установка Git на Windows

## Способ 1: Через winget (рекомендуется)

Откройте PowerShell от имени администратора:

```powershell
winget install --id Git.Git -e --source winget
```

**Перезапустите терминал после установки!**

---

## Способ 2: Через установщик

1. Скачайте установщик: https://git-scm.com/download/win
2. Запустите `Git-2.x.x-64-bit.exe`
3. Следуйте инструкциям установщика
4. Перезапустите терминал

---

## Способ 3: Через GitHub Desktop

GitHub Desktop включает Git:

1. Скачайте: https://desktop.github.com
2. Установите
3. Git будет доступен из командной строки GitHub Desktop

---

## ✅ Проверка установки

Откройте новый терминал и выполните:

```bash
git --version
```

Должно вывести: `git version 2.x.x.windows.x`

---

## 🔧 Настройка Git

После установки настройте имя и email:

```bash
git config --global user.name "Ваше Имя"
git config --global user.email "your-email@example.com"
```

---

## 🚀 Быстрый старт

После установки Git:

```bash
# Перейдите в папку проекта
cd c:\Users\RobotComp.ru\Desktop\cource

# Запустите скрипт деплоя
.\deploy.ps1
```

Или вручную:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/neuropro-ai.git
git push -u origin main
```

---

## ❓ Частые проблемы

### "git не является внутренней или внешней командой"

**Решение:** Перезапустите терминал после установки Git.

### "Access denied" при установке

**Решение:** Запустите PowerShell от имени администратора.

### Git установлен, но команда не находится

**Решение:** Добавьте Git в PATH вручную:
1. Откройте "Система" → "Дополнительные параметры системы"
2. "Переменные среды"
3. В "Системные переменные" найдите `Path`
4. Добавьте: `C:\Program Files\Git\bin`

---

## 📞 Нужна помощь?

- Документация Git: https://git-scm.com/doc
- GitHub Docs: https://docs.github.com
- Stack Overflow: https://stackoverflow.com/questions/tagged/git
