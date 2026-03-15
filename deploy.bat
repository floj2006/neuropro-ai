@echo off
echo ====================================
echo   NeuroPro AI - GitHub Deploy
echo ====================================
echo.

REM Check if git is available
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git не найден!
    echo.
    echo Установите Git: https://git-scm.com/download/win
    echo Или через winget: winget install Git.Git
    echo.
    pause
    exit /b 1
)

echo [OK] Git найден
echo.

REM Initialize git repo if not exists
if not exist ".git" (
    echo [INFO] Инициализация git репозитория...
    git init
    echo.
)

REM Add all files
echo [INFO] Добавление файлов...
git add .
echo.

REM Commit
echo [INFO] Создание коммита...
git commit -m "Update: %DATE% %TIME%"
echo.

REM Check if remote is set
git remote -v | findstr origin >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] Удаленный репозиторий не настроен!
    echo.
    echo Введите URL вашего GitHub репозитория:
    echo Пример: https://github.com/username/neuropro-ai.git
    echo.
    set /p REPO_URL="URL: "
    git remote add origin %REPO_URL%
    echo.
)

REM Push
echo [INFO] Отправка на GitHub...
git branch -M main 2>nul
git push -u origin main
echo.

if %errorlevel% equ 0 (
    echo ====================================
    echo   [SUCCESS] Успешно отправлено!
    echo ====================================
) else (
    echo ====================================
    echo   [ERROR] Ошибка при отправке!
    echo ====================================
)

echo.
pause
